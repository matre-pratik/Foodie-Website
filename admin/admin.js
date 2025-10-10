const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASS = "admin123";

function adminLogin() {
  const email = document.querySelector("#adminEmail").value.trim();
  const password = document.querySelector("#adminPassword").value.trim();

  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    localStorage.setItem("isAdminLoggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid Admin Credentials!");
  }
}
      
      const logout = document.querySelector("li .btn")

      logout.addEventListener("click" , () => {
      localStorage.removeItem("isAdminLoggedIn");
        window.location.href = "admin.html";
      })
