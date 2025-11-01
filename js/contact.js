let editingFormId = null;
function fetchForms() {
    fetch("http://localhost:3000/contacts")
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("form");
        list.innerHTML = '';
        data.forEach(form => {
            const div = document.createElement("div");
            div.className = "form-item";
            div.innerHTML = `
            <strong>ID: ${form.id}</strong><br>
            Name: ${form.name}<br>
            Email: ${form.email} <br>
            Message: ${form.comment}<br>
            <button class="delete" onclick="deleteForm('${form.id}')">Delete</button>
            `;
            list.appendChild(div);
        });
    });
}

 // Delete sform
    function deleteForm(id) {
    
      fetch(`${"http://localhost:3000/contacts"}/${id}`, {
        method: "DELETE"
      })
      .then(() => fetchForms());
    }

const form = document.querySelector(".contactForm");
if (form) { 
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const comment = document.querySelector("#comment").value.trim();

    if (!name || !email || !comment) return;

    const contactData = { name, email, comment };

    fetch("http://localhost:3000/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("saved", data);
        form.reset();
        alert("I will contact you soon...");
        fetchForms(); 
      })
      .catch((err) => console.error("Error saving data:", err));
  });
}

fetchForms();