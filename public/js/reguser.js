$("button").attr("disabled", true);

let flag1 = 0;
let flag2 = 0;
let flag3 = 0;
let flag4 = 0;
let flag5 = 0;
let flag6 = 0;
let flag7 = 0;

const updateButtonStatus = () => {
  if (
    flag1 === 1 &&
    flag2 === 1 &&
    flag3 === 1 &&
    flag4 === 1 &&
    flag5 === 1 &&
    flag6 === 1 &&
    flag7 === 1
  ) {
    $("button").attr("disabled", false);
    $("button").removeClass("btn-outline-primary").addClass("btn-primary");
  } else {
    $("button").attr("disabled", true);
    $("button").removeClass("btn-primary").addClass("btn-outline-primary");
  }
};

//setTimeout(updateButtonStatus, 1000);

$("#namee").on("change", function () {
  let dataa = $(this).val();
  if (dataa) {
    flag1 = 1;
  } else {
    flag1 = 0;
  }
  updateButtonStatus();
});

$("#usernamee").on("focus", function () {
  $("#usernametick").addClass("d-none");
  $("#usernamee").removeClass("available");
  $("#usernamee").removeClass("notAvailable");
});

$("#usernamee").on("blur", function () {
  let detaa = $("#usernamee").val();
  if (detaa) {
    let dataa = detaa.trim();
    $.ajax({
      url: "/checkUserName",
      method: "POST",
      dataType: "json",
      data: { username: dataa },
      success: function (response) {
        if (response.msg == "success") {
          //$("#usernametick").html = `<strong>✔️</strong>`;
          document.getElementById(
            "usernametick"
          ).innerHTML = `<strong>✔️</strong>`;
          $("#usernametick").removeClass("d-none");
          $("#usernamee").addClass("available");
          flag2 = 1;
          updateButtonStatus();
        } else {
          document.getElementById(
            "usernametick"
          ).innerHTML = `<strong>⚠️</strong>`;
          $("#usernametick").removeClass("d-none");
          $("#usernamee").addClass("notAvailable");
          flag2 = 0;
          updateButtonStatus();
        }
      },
      error: function (response) {
        console.log(response);
      },
    });
  } else {
    $("#usernametick").addClass("d-none");
    $("#usernamee").removeClass("available");
    $("#usernamee").removeClass("notAvailable");
    flag2 = 0;
    updateButtonStatus();
  }
});

$("#emaill").on("focus", function () {
  $("#emailtick").addClass("d-none");
  $("#emaill").removeClass("available");
  $("#emaill").removeClass("notAvailable");
});

$("#emaill").on("blur", function () {
  let detaa = $("#emaill").val();
  if (detaa) {
    detaa = detaa.toLowerCase();
    let dataa = detaa.trim();
    $.ajax({
      url: "/checkEmail",
      method: "POST",
      dataType: "json",
      data: { email: dataa },
      success: function (response) {
        if (response.msg == "success") {
          document.getElementById(
            "emailtick"
          ).innerHTML = `<strong>✔️</strong>`;
          $("#emailtick").removeClass("d-none");
          $("#emaill").addClass("available");
          flag3 = 1;
          updateButtonStatus();
        } else {
          document.getElementById(
            "emailtick"
          ).innerHTML = `<strong>⚠️</strong>`;
          $("#emailtick").removeClass("d-none");
          $("#emaill").addClass("notAvailable");
          flag3 = 0;
          updateButtonStatus();
        }
      },
      error: function (response) {
        console.log(response);
      },
    });
  } else {
    $("#emailtick").addClass("d-none");
    $("#emaill").removeClass("available");
    $("#emaill").removeClass("notAvailable");
    flag3 = 0;
    updateButtonStatus();
  }
});

$("#passwordd").on("change", function () {
  let dataa = $(this).val();
  if (dataa) {
    flag4 = 1;
  } else {
    flag4 = 0;
  }
  updateButtonStatus();
});

$("#phonee").on("focus", function () {
  $("#phonetick").addClass("d-none");
  $("#phonee").removeClass("available");
  $("#phonee").removeClass("notAvailable");
});

$("#phonee").on("blur", function () {
  let dataa = $("#phonee").val();
  if (dataa) {
    $.ajax({
      url: "/checkPhone",
      method: "POST",
      dataType: "json",
      data: { phone: dataa },
      success: function (response) {
        if (response.msg == "success") {
          document.getElementById(
            "phonetick"
          ).innerHTML = `<strong>✔️</strong>`;
          $("#phonetick").removeClass("d-none");
          $("#phonee").addClass("available");
          flag5 = 1;
          updateButtonStatus();
        } else {
          document.getElementById(
            "phonetick"
          ).innerHTML = `<strong>⚠️</strong>`;
          $("#phonetick").removeClass("d-none");
          $("#phonee").addClass("notAvailable");
          flag5 = 0;
          updateButtonStatus();
        }
      },
      error: function (response) {
        console.log(response);
      },
    });
  } else {
    $("#phonetick").addClass("d-none");
    $("#phonee").removeClass("available");
    $("#phonee").removeClass("notAvailable");
    flag5 = 0;
    updateButtonStatus();
  }
});

$("#dobb").on("change", function () {
  let dataa = $(this).val();
  if (dataa) {
    flag6 = 1;
  } else {
    flag6 = 0;
  }
  updateButtonStatus();
});

$("#sexx").on("change", function () {
  let dataa = $(this).val();
  if (dataa) {
    flag7 = 1;
  } else {
    flag7 = 0;
  }
  updateButtonStatus();
});
