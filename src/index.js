const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(server);
require("./db/connection");
const Room = require("./models/rooms");
const hbs = require("hbs");
const loginRouter = require("./routers/login");
const registerRouter = require("./routers/register");
const roomRouter = require("./routers/room");

const PORT = process.env.PORT || 8000;

const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
const publicPath = path.join(__dirname, "../public");

const updateSockets = async (room, admin, user, id) => {
  try {
    let dataa = await Room.find({ name: room, admin: admin });
    if (dataa.length !== 0) {
      let results = await Room.updateOne(
        { name: room, admin: admin },
        {
          $push: {
            usersIds: id,
          },
        }
      );
      if (dataa[0].activeUsers.indexOf(user) === -1) {
        let results = await Room.updateOne(
          { name: room, admin: admin },
          {
            $push: {
              activeUsers: user,
            },
          }
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const findUser = async (id) => {
  try {
    let dataa = await Room.find({ usersIds: id });
    let uuser = dataa[0].usersIds.indexOf(id);
    let userr = dataa[0].activeUsers[uuser];
    let resultss = await Room.updateOne(
      { usersIds: id },
      {
        $pullAll: {
          usersIds: [id],
        },
      }
    );
    let results = await Room.updateOne(
      { activeUsers: userr },
      {
        $pullAll: {
          activeUsers: [userr],
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

app.use(express.static(publicPath));
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loginRouter);
app.use(registerRouter);
app.use(roomRouter);

app.get("/", (req, res) => {
  res.render("index", { wrongLoginCredentials: false });
});

app.get("/registrations", (req, res) => {
  res.render("userreg");
});

io.on("connection", (socket) => {
  socket.on("join-room", (user, ROOM_ID, room, admin) => {
    socket.join(ROOM_ID);
    updateSockets(room, admin, user, socket.id);
    let greetMsg = {
      user: admin,
      message: `Welcome to the ${room}`,
    };
    let alertUsersMsg = {
      user: admin,
      message: `${user} has joined the room!`,
    };
    io.to(socket.id).emit("greet-user", greetMsg);
    //io.in(ROOM_ID).emit("new-user-joined", alertUsersMsg);
    socket.broadcast.to(ROOM_ID).emit("new-user-joined", alertUsersMsg);
    socket.on("message", (msg) => {
      socket.broadcast.to(ROOM_ID).emit("message", msg);
    });
    socket.on("tellAlltoLeaveRoom" , (roomId) => {
      socket.broadcast.to(ROOM_ID).emit("adminDeleteRoom", roomId);
    });
    let leftMsg = {
      user: admin,
      message: `${user} left the room!`,
    };
    socket.on("disconnect", async () => {
      await findUser(socket.id);
      socket.broadcast.to(ROOM_ID).emit("user-left-message", leftMsg);
    });
  });
});

server.listen(PORT);
