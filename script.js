// ==================== 1. LOGIKA PERPINDAHAN HALAMAN (TAB) ====================
function switchTab(pageName) {
    // Sembunyikan semua section page
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.add('hidden'));

    // Tampilkan page yang dipilih
    const activePage = document.getElementById(`page-${pageName}`);
    if (activePage) {
        activePage.classList.remove('hidden');
    }

    // Reset gaya tombol navigasi
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('text-cyan-400', 'border-b-2', 'border-cyan-400', 'pb-1');
        btn.classList.add('text-gray-300');
    });

    // Berikan garis bawah cyan pada tombol yang aktif (selain tombol Pesan Tempat)
    const activeBtn = document.getElementById(`nav-${pageName}`);
    if (activeBtn) {
        activeBtn.classList.remove('text-gray-300');
        activeBtn.classList.add('text-cyan-400', 'border-b-2', 'border-cyan-400', 'pb-1');
    }

    // Scroll otomatis ke atas saat berpindah tab
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== 2. LOGIKA CAROUSEL / SLIDER (HOME) ===================
const slides = document.querySelectorAll('.slide-item');
const dots = document.querySelectorAll('.dot');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
let currentIndex = 0;
let slideInterval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.remove('hidden');
        } else {
            slide.classList.add('hidden');
        }
    });

    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.remove('w-3', 'bg-gray-600');
            dot.classList.add('w-8', 'bg-amber-400');
        } else {
            dot.classList.remove('w-8', 'bg-amber-400');
            dot.classList.add('w-3', 'bg-gray-600');
        }
    });

    currentIndex = index;
}

function nextSlide() {
    let nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
}

function prevSlide() {
    let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 3500);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
}

// ==================== 3. LOGIKA KIRIM RESERVASI KE WHATSAPP ====================
function kirimKeWA() {
    // GANTI DENGAN NOMOR WHATSAPP KAMU (Gunakan format 62, contoh: 6281234567890)
    const nomorWA = "6283898555502"; 

    // Ambil nilai input dari form
    const nama = document.getElementById('nama').value;
    const jumlah = document.getElementById('jumlah').value;
    const jam = document.getElementById('jam').value;

    // Validasi input sederhana
    if (nama === "" || jumlah === "" || jam === "") {
        alert("Mohon lengkapi semua data sebelum memesan!");
        return;
    }

    // Format pesan WhatsApp
    const pesan = `Halo RM Padang Chimpago, saya ingin melakukan reservasi tempat:\n\n` +
                  `• Nama: ${nama}\n` +
                  `• Jumlah Orang: ${jumlah} Orang\n` +
                  `• Jam Kedatangan: ${jam} WIB\n\n` +
                  `Mohon konfirmasinya, terima kasih!`;

    // Encode format teks pesan agar aman di URL
    const urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

    // Buka tautan WhatsApp di tab baru
    window.open(urlWA, '_blank');
}

// Jalankan slider otomatis saat halaman pertama kali dibuka
startAutoSlide();