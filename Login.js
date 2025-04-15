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
