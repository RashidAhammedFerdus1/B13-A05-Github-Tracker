document.getElementById("sign-btn").addEventListener("click", function () {
  console.log("click");
  const inputName = document.getElementById("inputName");
  const inputPass = document.getElementById("inputPass");
  if (inputName.value === "admin" && inputPass.value === "admin123") {
    window.location.assign("api.html");
  } else {
    alert("Your correct username is : admin and password is : admin123");
    return;
  }
});