const Users = [
  { username: "adminprofile", password: "adminpassword", email: "admin@gmail.com" },
  { username: "userprofile", password: "userpassword", email: "user@gmail.com"  },
  { username: "guestprofile", password: "guestpassword", email: "guest@gmail.com"  },
];//default users

const loadFunction = () => {
    if (localStorage.getItem("Users") === null) {
        console.log("Felhasználói tárhely inicializálása az alapértelmezett felhasználókkal.");
        localStorage.setItem('Users', JSON.stringify(Users));
    }
}

const CheckLogin = () => {
const tempusers = JSON.parse(localStorage.getItem("Users"));
  const usern = document.getElementById("usern").value;
  const passw = document.getElementById("passw").value;
  if (usern === "" || passw === "") {
    alert("Kérlek töltsd ki az összes mezőt!");
    return false;
  } else if (usern.length < 10 || passw.length < 10) {
    alert("A felhasználónév és a jelszó minimum 10 karakter hosszú kell legyen!");
    return false;
  }

  for (let i = 0; i < tempusers.length; i++) {
    if (tempusers[i].username === usern && tempusers[i].password === passw) {
      alert("Sikeres bejelentkezés!");
      localStorage.setItem("currentUser", JSON.stringify(tempusers[i]));
      window.location.href = "index.html";
      return true;
    }
    
  }
    alert("Hibás felhasználónév vagy jelszó!");
    return false;
};

const Registration = () => {
  const tempusers = JSON.parse(localStorage.getItem("Users"));
  const usern = document.getElementById("usern").value;
  const passw = document.getElementById("passw").value;
  const email = document.getElementById("email").value;
  const passw2 = document.getElementById("passwagain").value;
  const check = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (usern === "" || passw === "" || email === "" || passw2 === "") {
    alert("Kérlek töltsd ki az összes mezőt!");
    return false;
  } else if (usern.length < 10 || passw.length < 10 || email.length < 10 || passw2.length < 10) {
    alert("A felhasználónév és a jelszó és minimum 10 karakter hosszú kell legyen!");
    return false;
  }else if(!email.match(check)){
    alert("Hibás email cím formátum!");
    return false;
  } else if(passw !== passw2){
    alert("A jelszavak nem egyeznek!");
    return false;
  } 
  for (let i = 0; i < tempusers.length; i++) {
    if (tempusers[i].username === usern) {
      alert("Ez a felhasználónév már foglalt!");
      return false;
    } else if (tempusers[i].email === email) {
      alert("Ez az email cím már foglalt!");
      return false;
    }
  }
  
  tempusers.push({ username: usern, password: passw, email: email });
  localStorage.setItem("Users", JSON.stringify(tempusers));
  localStorage.setItem("currentUser", JSON.stringify({ username: usern, password: passw, email: email }));
  window.location.href = "index.html";
  alert("Sikeres regisztráció!");
}

const showPassword = (e, eye) => {
  e.preventDefault(); // Prevent any default behavior
  const passwordInput = document.getElementById("passw");
  const eyeIcon = document.getElementById("eye");
  const eyeIcon2 = document.getElementById("eyeagain");
  const passwordInput2 = document.getElementById("passwagain");
  console.log(passwordInput2);
  if (passwordInput.type === "password" && eye === "eye") {
    passwordInput.type = "text";
    eyeIcon.classList.remove("bi-eye-slash");
    eyeIcon.classList.add("bi-eye");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.remove("bi-eye");
    eyeIcon.classList.add("bi-eye-slash");
  }
  if (passwordInput2 !== null){
    if (passwordInput2.type === "password" && eye === "eye2") {
      passwordInput2.type = "text";
      eyeIcon2.classList.remove("bi-eye-slash");
      eyeIcon2.classList.add("bi-eye");
    } else {
      passwordInput2.type = "password";
      eyeIcon2.classList.remove("bi-eye");
      eyeIcon2.classList.add("bi-eye-slash");
    }
  }
  
};