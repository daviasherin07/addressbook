const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let activeCategory = "Semua";
let editingIndex = null;

function renderContacts() {
  contactList.innerHTML = "";
  const searchQuery = searchInput.value.toLowerCase();

  const filtered = contacts.filter(c => {
    const matchesCat = activeCategory === "Semua" || c.category === activeCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery) ||
      c.phone.toLowerCase().includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery) ||
      c.address.toLowerCase().includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    contactList.innerHTML = `<li class="text-gray-300 text-center italic">Tidak ada kontak ditemukan</li>`;
    return;
  }

  filtered.forEach((c, i) => {
    let badgeColor =
      c.category === "Personal" ? "bg-blue-400/20 text-blue-200" :
      c.category === "Kerja" ? "bg-green-400/20 text-green-200" :
      c.category === "Keluarga" ? "bg-purple-400/20 text-purple-200" :
      c.category === "Spam" ? "bg-red-400/20 text-red-200" :
      "bg-gray-400/20 text-gray-200";

    const li = document.createElement("li");
    li.className = `
      border border-white/10 rounded-xl p-5 
      bg-white/10 backdrop-blur-md
      shadow-[0_0_20px_rgba(255,255,255,0.05)]
      hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]
      transition-all duration-200 hover:-translate-y-1 
      text-gray-200
    `;

    li.innerHTML = `
      <div class="flex justify-between items-start">
        <div class="flex flex-col space-y-1">
          <p class="text-lg font-semibold text-white flex items-center gap-2">👤 ${c.name}</p>
          <p class="text-sm text-gray-300 flex items-center gap-2">📞 ${c.phone}</p>
          <p class="text-sm text-gray-300 flex items-center gap-2">✉ ${c.email}</p>
          <p class="text-sm text-gray-300 flex items-center gap-2">📍 ${c.address || '-'}</p>

          <span class="mt-2 inline-block text-xs px-2 py-1 rounded-full ${badgeColor} font-medium">
            ${c.category}
          </span>
        </div>

        <div class="flex flex-col gap-2 items-end text-sm font-semibold mt-1">
          <button onclick="editContact(${i})"
            class="text-blue-300 hover:text-blue-100 transition-colors">✎ Edit</button>
          <button onclick="deleteContact(${i})"
            class="text-red-300 hover:text-red-100 transition-colors">⌦ Hapus</button>
        </div>
      </div>
    `;
    contactList.appendChild(li);
  });
}

contactForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const category = document.getElementById("category").value;

  if (!name || !phone || !email) return;

  const contact = { name, phone, email, address, category };

  if (editingIndex !== null) {
    contacts[editingIndex] = contact;
    editingIndex = null;
  } else {
    contacts.push(contact);
  }

  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
  contactForm.reset();
});

function editContact(index) {
  const c = contacts[index];
  document.getElementById("name").value = c.name;
  document.getElementById("phone").value = c.phone;
  document.getElementById("email").value = c.email;
  document.getElementById("address").value = c.address;
  document.getElementById("category").value = c.category;
  editingIndex = index;
}

function deleteContact(index) {
  if (confirm("Yakin mau hapus kontak ini?")) {
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    renderContacts();
  }
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    activeCategory = btn.dataset.category;

    filterButtons.forEach(b => 
      b.classList.remove("bg-pink-500", "text-white")
    );

    btn.classList.add("bg-pink-500", "text-white");
    renderContacts();
  });
});

searchInput.addEventListener("input", renderContacts);
renderContacts();
