document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const addressInput = document.getElementById("address");
    const categoryInput = document.getElementById("category");
    const searchInput = document.getElementById("searchInput");
    const contactList = document.getElementById("contactList");

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let editIndex = null;
    let activeFilter = "Semua";

    function saveToLocal() {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }

    function clearForm() {
        form.reset();
        editIndex = null;
    }

    function renderContacts() {
        contactList.innerHTML = "";

        let filteredContacts = contacts.filter(c => {
            let matchFilter = activeFilter === "Semua" || c.category === activeFilter;
            let matchSearch =
                c.name.toLowerCase().includes(searchInput.value.toLowerCase());
            return matchFilter && matchSearch;
        });

        if (filteredContacts.length === 0) {
            contactList.innerHTML = `<p class="text-gray-500 italic">Tidak ada kontak ditemukan</p>`;
            return;
        }

        filteredContacts.forEach((contact, index) => {
            let card = document.createElement("div");
            card.className =
                "bg-white shadow-md p-4 rounded-xl mb-4 border border-gray-200 " +
                "hover:scale-[1.02] transition-all duration-200 cursor-pointer"; // <<— ANIMASI KEDUT

            card.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-semibold text-lg flex items-center gap-2">
                            <span>👤</span> ${contact.name}
                        </p>
                        <p class="text-sm mt-1">📞 ${contact.phone}</p>
                        <p class="text-sm">📧 ${contact.email}</p>
                        <p class="text-sm">📍 ${contact.address}</p>
                        <span class="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-blue-100">
                            ${contact.category}
                        </span>
                    </div>

                    <div class="text-right">
                        <button class="text-blue-600 font-medium editBtn">✏️ Edit</button><br>
                        <button class="text-red-600 font-medium deleteBtn mt-1">❌ Hapus</button>
                    </div>
                </div>
            `;

            // Edit
            card.querySelector(".editBtn").onclick = () => {
                nameInput.value = contact.name;
                phoneInput.value = contact.phone;
                emailInput.value = contact.email;
                addressInput.value = contact.address;
                categoryInput.value = contact.category;
                editIndex = index;
            };

            // Delete
            card.querySelector(".deleteBtn").onclick = () => {
                contacts.splice(index, 1);
                saveToLocal();
                renderContacts();
            };

            contactList.appendChild(card);
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let newContact = {
            name: nameInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            address: addressInput.value,
            category: categoryInput.value
        };

        if (editIndex !== null) {
            contacts[editIndex] = newContact;
        } else {
            contacts.push(newContact);
        }

        saveToLocal();
        renderContacts();
        clearForm();
    });

    searchInput.addEventListener("input", renderContacts);

    document.querySelectorAll("[data-filter]").forEach(btn => {
        btn.addEventListener("click", () => {
            activeFilter = btn.dataset.filter;
            renderContacts();
        });
    });

    renderContacts();
});
