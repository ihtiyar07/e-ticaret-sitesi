const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

function sendUser() {
  let name = document.querySelector(".input-name").value;
  let surname = document.querySelector(".input-surname").value;
  let mail = document.querySelector(".input-email").value;
  let password = document.querySelector(".input-password").value;

  const data = {
    name: name,
    surname: surname,
    mail: mail,
    password: password,
  };

  fetch("http://localhost:5000/users/create_user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function verifyUser() {
  try {
    let email = document.querySelector(".sign-email");
    let password = document.querySelector(".sign-password");

    const data = {
      mail: email.value,
      password: password.value,
    };

    const response = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Authentication failed.");
    }

    const responseData = await response.json();

    localStorage.setItem("userID", responseData.userId);
    localStorage.setItem("userName", responseData.userName);

    console.log(responseData.userId);
    if ((responseData.qualifation === "admin")) {
      window.location.href = "http://127.0.0.1:5500/view/index.html";
    } else {
      window.location.href = "http://127.0.0.1:5500/view/home.html";
    }
  } catch (error) {
    console.error("Error", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sign-in").addEventListener("click", verifyUser);
});
