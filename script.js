let contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
let editingIndex = null;

const listEl = document.getElementById("contactList");
const searchInput = document.getElementById("searchInput");

function renderContacts(filter = "Semua") {
  listEl.innerHTML = "";

  contacts
    .filter(c => 
      (filter === "Semua" || c.category === filter) &&
      (c.name.toLowerCase().includes(searchInput.value.toLowerCase()))
    )
    .forEach((c, i) => {
      const card = document.createElement("div");
      card.className =
        "contact-card bg-white border border-[#D9CDBE] rounded-xl p-4 shadow-sm";

      card.innerHTML = `
        <div class="flex justify-between items-start">
          <div>
            <div class="font-semibold text-lg flex items-center gap-2">
              👤 ${c.name}
            </div>
            <div class="text-[14px] mt-1">
              <div>📞 ${c.phone}</div>
              <div>📧 ${c.email}</div>
              <div>📍 ${c.address}</div>
            </div>
            <div class="mt-2 inline-block bg-[#E8E3DA] px-3 py-1 rounded-full text-sm">
              ${c.category}
            </div>
          </div>

          <div class="flex flex-col gap-2 text-sm">
            <button onclick="editContact(${i})" class='text-blue-600 hover:underline'>✏️ Edit</button>
            <button onclick="deleteContact(${i})" class='text-red-600 hover:underline'>🗑 Hapus</button>
          </div>
        </div>
      `;

      listEl.appendChild(card);
    });
}

document.getElementById("saveBtn").addEventListener("click", () => {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();
  const address = addressInput.value.trim();
  const category = categoryInput.value;

  if (!name) return alert("Isi nama dulu!");

  const data = { name, phone, email, address, category };

  if (editingIndex !== null) {
    contacts[editingIndex] = data;
    editingIndex = null;
  } else {
    contacts.push(data);
  }

  localStorage.setItem("contacts", JSON.stringify(contacts));

  nameInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";
  addressInput.value = "";

  renderContacts();
});

function deleteContact(i) {
  if (!confirm("Hapus kontak?")) return;
  contacts.splice(i, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
}

function editContact(i) {
  const c = contacts[i];
  nameInput.value = c.name;
  phoneInput.value = c.phone;
  emailInput.value = c.email;
  addressInput.value = c.address;
  categoryInput.value = c.category;
  editingIndex = i;
}

document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    renderContacts(btn.dataset.cat);
    document.querySelectorAll(".cat-btn").forEach(b => 
      b.classList.remove("bg-[var(--accent)]","text-white")
    );
    btn.classList.add("bg-[var(--accent)]","text-white");
  });
});

searchInput.addEventListener("input", () => renderContacts());

renderContacts();
