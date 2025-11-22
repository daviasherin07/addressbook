document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const list = document.getElementById("contactList");
  const search = document.getElementById("searchInput");
  const filters = document.querySelectorAll(".filter-btn");

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  let editingIndex = null;
  let activeFilter = "Semua";

  function saveLocal() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }


  function badgeColor(cat) {
    switch (cat) {
      case "Personal": return "bg-blue-100 text-blue-700";
      case "Kerja": return "bg-green-100 text-green-700";
      case "Keluarga": return "bg-purple-100 text-purple-700";
      case "Spam": return "bg-red-100 text-red-700";
      default: return "bg-gray-100";
    }
  }

  // TIDAK ADA DATA
  function render() {
    list.innerHTML = "";

    const filtered = contacts.filter(c =>
      (activeFilter === "Semua" || c.category === activeFilter) &&
      c.name.toLowerCase().includes(search.value.toLowerCase())
    );

    if (filtered.length === 0) {
      list.innerHTML = `<p class="text-gray-500 italic">Tidak ada kontak ditemukan</p>`;
      return;
    }

    filtered.forEach((c, i) => {
      const card = document.createElement("div");
      card.className =
        card.className =
        "bg-white rounded-xl p-5 border shadow transition transform hover:-translate-y-1 hover:shadow-lg";


      card.innerHTML = `
        <div class="flex justify-between">
          <div>
            <p class="font-bold text-lg">${c.name}</p>
            <p class="text-sm">📞 ${c.phone}</p>
            <p class="text-sm">📧 ${c.email}</p>
            <p class="text-sm">📍 ${c.address}</p>
            <span class="text-xs px-3 py-1 rounded-full ${badgeColor(c.category)}">${c.category}</span>
          </div>


          <div class="text-right text-sm">
            <button class="text-blue-600 editBtn">✎ Edit</button><br>
            <button class="text-red-600 deleteBtn mt-1">❌ Hapus</button>
          </div>
        </div>
      `;
      

      // EDIT DATA
      card.querySelector(".editBtn").onclick = () => {
        document.getElementById("name").value = c.name;
        document.getElementById("phone").value = c.phone;
        document.getElementById("email").value = c.email;
        document.getElementById("address").value = c.address;
        document.getElementById("category").value = c.category;
        editingIndex = i;
      };

      // HAPUS DATA
      card.querySelector(".deleteBtn").onclick = () => {
         if (!confirm("Yakin mau dihapus?")) return;
  contacts.splice(i, 1);
        saveLocal();
        render();
      };

      list.appendChild(card);
    });
  }

  // BUTTON SIMPAN
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      category: document.getElementById("category").value
    };

    if (editingIndex !== null) {
      contacts[editingIndex] = data;
      editingIndex = null;
    } else {
      contacts.push(data);
    }

    saveLocal();
    render();
    form.reset();
  });

  // CARI
  search.addEventListener("input", render);

  // BUTTON KATEGORI
  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter;

      filters.forEach(b => b.classList.remove("filter-active"));
      btn.classList.add("filter-active");

      render();
    });
  });

  render();
});
