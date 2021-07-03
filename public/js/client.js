const socket = io("/");

//console.log(roomId);
//console.log(room);
//console.log(admin);
//console.log(activeUsers);

let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");
let sendBtn = document.querySelector("#sendMsg");
let list = document.getElementById("actu");
let leaveBtn = document.getElementById("leaveRoomBtn");

const appendMsg = (mesg, type) => {
  let maindiv = document.createElement("div");
  let className = type;
  maindiv.classList.add(className, "message");

  let markup = `
          <h4>${mesg.user}</h4>
          <p>${mesg.message}</p>
      `;

  maindiv.innerHTML = markup;
  messageArea.appendChild(maindiv);
  messageArea.scrollTop = messageArea.scrollHeight;
};

const sendMessage = (msg) => {
  let mesg = {
    user: user,
    message: msg.trim(),
  };
  appendMsg(mesg, "outgoing");
  textarea.value = "";
  textarea.autofocus = true;
  socket.emit("message", mesg);
};

socket.emit("join-room", user, roomId, room, admin);

textarea.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendMessage(event.target.value);
  }
});

sendBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let msgg = textarea.value;
  if (msgg) {
    sendMessage(msgg);
  }
});

socket.on("greet-user", (msg) => {
  appendMsg(msg, "incoming");
});

socket.on("new-user-joined", (msg) => {
  appendMsg(msg, "incoming");
  $.ajax({
    url: "/updateActiveUsersList",
    method: "POST",
    dataType: "json",
    data: {
      roomId: roomId,
      room: room,
      admin: admin,
    },
    success: function (response) {
      activeUsers = response.dataa;
      //removeAllChildren();
      list.querySelectorAll("*").forEach((n) => n.remove());
      activeUsers.map((element, index) => {
        let lii = document.createElement("li");
        lii.style.fontSize = "20px";
        lii.innerText = element;
        list.appendChild(lii);
      });
    },
    error: function (response) {
      alert(response.dataa);
    },
  });
});

socket.on("message", (msg) => {
  appendMsg(msg, "incoming");
});

socket.on("user-left-message", (msg) => {
  appendMsg(msg, "incoming");
  $.ajax({
    url: "/updateActiveUsersList",
    method: "POST",
    dataType: "json",
    data: {
      roomId: roomId,
      room: room,
      admin: admin,
    },
    success: function (response) {
      activeUsers = response.dataa;
      list.querySelectorAll("*").forEach((n) => n.remove());
      activeUsers.map((element, index) => {
        let lii = document.createElement("li");
        lii.style.fontSize = "20px";
        lii.innerText = element;
        list.appendChild(lii);
      });
    },
    error: function (response) {
      alert(response.dataa);
    },
  });
});

function scrolltoBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}

document.getElementById("leaveRoomAfter").onsubmit = function () {
  socket.disconnect();
};

document.getElementById("callDeleteRoom").onsubmit = function () {
  socket.emit("tellAlltoLeaveRoom", roomId);
};

socket.on("adminDeleteRoom", (roomIdd) => {
  document.getElementById("leaveRoomBtn").click();
});

//socket.on("disconnected", () => {
//  $.ajax({
//    url: "/removeUserFromActiveList",
//    method: "POST",
//    dataType: "json",
//   data: {
//      user: user,
//      room: room,
//      admin: admin,
//   },
//   success: function (response) {
//      console.log(response.message);
//    },
//    error: function (response) {
//      console.log(response.message);
//    },
//  });
//});
