// State Keranjang Belanja
let cart = [];

// Fungsi Switch Tab Navigation
function switchTab(tabId) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.add('hidden'));

    const activePage = document.getElementById(`page-${tabId}`);
    if (activePage) {
        activePage.classList.remove('hidden');
    }

    // Update style Nav Button aktif
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('text-cyan-400', 'border-b-2', 'border-cyan-400');
        btn.classList.add('text-gray-300');
    });

    const activeNav = document.getElementById(`nav-${tabId}`);
    if (activeNav) {
        activeNav.classList.add('text-cyan-400', 'border-b-2', 'border-cyan-400');
        activeNav.classList.remove('text-gray-300');
    }
}

// Tambah Makanan ke Keranjang
function addToCart(nama, harga) {
    const existing = cart.find(item => item.nama === nama);
    if (existing) {
        existing.jumlah += 1;
    } else {
        cart.push({ nama, harga, jumlah: 1 });
    }
    updateCartUI();
    toggleCartModal(); // Tampilkan keranjang setelah klik pesan
}

// Tambah/Kurang Jumlah di Keranjang
function changeQty(index, change) {
    cart[index].jumlah += change;
    if (cart[index].jumlah <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

// Update Tampilan Keranjang
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    let totalItem = 0;
    let totalPrice = 0;

    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="text-gray-500 text-center py-4">Keranjang masih kosong.</p>`;
    } else {
        cart.forEach((item, index) => {
            totalItem += item.jumlah;
            totalPrice += item.harga * item.jumlah;

            cartItems.innerHTML += `
                <div class="flex justify-between items-center py-2">
                    <div>
                        <h4 class="font-bold text-white text-sm">${item.nama}</h4>
                        <p class="text-xs text-amber-400">Rp${(item.harga * item.jumlah).toLocaleString('id-ID')}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="changeQty(${index}, -1)" class="w-6 h-6 bg-gray-800 hover:bg-gray-700 text-white rounded text-xs">-</button>
                        <span class="text-sm font-bold w-4 text-center">${item.jumlah}</span>
                        <button onclick="changeQty(${index}, 1)" class="w-6 h-6 bg-gray-800 hover:bg-gray-700 text-white rounded text-xs">+</button>
                    </div>
                </div>
            `;
        });
    }

    cartCount.innerText = totalItem;
    cartTotal.innerText = `Rp${totalPrice.toLocaleString('id-ID')}`;
}

// Modal Toggle
function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
}

// Checkout Makanan Ke WhatsApp
function checkoutMakanan() {
    const nama = document.getElementById('nama-pemesan-makanan').value;
    if (!nama) {
        alert('Silakan masukkan nama pemesan terlebih dahulu!');
        return;
    }

    if (cart.length === 0) {
        alert('Keranjang belanja Anda masih kosong!');
        return;
    }

    let pesan = `Halo RM Padang Chimpago, saya *${nama}* ingin memesan makanan:\n\n`;
    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.harga * item.jumlah;
        total += subtotal;
        pesan += `${index + 1}. *${item.nama}* x${item.jumlah} = Rp${subtotal.toLocaleString('id-ID')}\n`;
    });

    pesan += `\n*Total Bayar:* Rp${total.toLocaleString('id-ID')}`;
    pesan += `\nMohon konfirmasinya ya, terima kasih!`;

    const noWA = "6287893148464"; // Nomor RM Chimpago
    window.open(`https://wa.me/${noWA}?text=${encodeURIComponent(pesan)}`, '_blank');
}

// Reservasi Tempat Ke WhatsApp
function kirimKeWA() {
    const nama = document.getElementById('nama').value;
    const jumlah = document.getElementById('jumlah').value;
    const jam = document.getElementById('jam').value;

    if (!nama || !jumlah || !jam) {
        alert('Harap isi semua data formulir!');
        return;
    }

    const pesan = `Halo RM Padang Chimpago, saya ingin reservasi tempat:\n\n` +
                  `Nama: *${nama}*\n` +
                  `Jumlah Orang: *${jumlah} orang*\n` +
                  `Jam Kedatangan: *${jam} WIB*`;

    const noWA = "6287893148464";
    window.open(`https://wa.me/${noWA}?text=${encodeURIComponent(pesan)}`, '_blank');
}
