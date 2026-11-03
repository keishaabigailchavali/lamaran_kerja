
var gaya = "formal";

var ids = [
    "nama",
    "kota",
    "perusahaan",
    "posisi",
    "pendidikan",
    "keahlian",
    "hp",
    "email"
];

var $ = function (id) {
    return document.getElementById(id);
};

// Mengamankan teks dari HTML
function esc(s) {
    return s.replace(/[&<>"']/g, function (c) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[c];
    });
}

// Menampilkan isian kosong
function v(id, label) {
    var x = $(id).value.trim();

    return x
        ? esc(x)
        : '<span class="kosong">[' + label + "]</span>";
}

// Tanggal otomatis
function tanggal() {
    return new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

// Mengubah daftar keahlian
function daftar(teks) {
    var a = teks.split(",")
        .map(function (s) {
            return s.trim();
        })
        .filter(Boolean)
        .map(esc);

    if (a.length === 0) {
        return '<span class="kosong">[keahlian]</span>';
    }

    if (a.length === 1) {
        return a[0];
    }

    return a.slice(0, -1).join(", ") +
        " dan " + a[a.length - 1];
}

// Bagian kepala surat
function kepala() {
    var kota = $("kota").value.trim();

    return '<p class="kanan">' +
        (kota ? esc(kota) + ", " : "") +
        tanggal() +
        "</p>" +

        '<p class="kiri">Yth. Bapak/Ibu HRD<br>' +
        v("perusahaan", "perusahaan") +
        "<br>di Tempat</p>";
}

// Bagian penutup surat
function kaki() {
    return '<p class="kiri">Hormat saya,</p>' +
        '<div class="ttd"></div>' +
        '<p class="kiri"><b>' +
        v("nama", "nama") +
        "</b><br>" +
        v("hp", "no. HP") +
        "<br>" +
        v("email", "email") +
        "</p>";
}

// Template surat
var TEMPLATE = {

    // Gaya formal
    formal: function () {
        return kepala() +
            "<p>Dengan hormat,</p>" +

            "<p>Saya yang bertanda tangan di bawah ini, " +
            v("nama", "nama") +
            ", lulusan " +
            v("pendidikan", "pendidikan") +
            ", bermaksud mengajukan lamaran pekerjaan pada posisi <b>" +
            v("posisi", "posisi") +
            "</b> di " +
            v("perusahaan", "perusahaan") +
            ".</p>" +

            "<p>Saya memiliki kemampuan di bidang " +
            daftar($("keahlian").value) +
            ", serta semangat belajar dan kemampuan bekerja sama yang baik. Bersama surat ini saya lampirkan Curriculum Vitae (CV) dan berkas pendukung lainnya.</p>" +

            "<p>Demikian surat ini saya buat dengan sebenarnya. Atas perhatian dan kesempatan yang Bapak/Ibu berikan, saya ucapkan terima kasih.</p>" +

            kaki();
    },

    // Gaya singkat
    singkat: function () {
        return kepala() +
            "<p>Dengan hormat,</p>" +

            "<p>Saya " +
            v("nama", "nama") +
            ", ingin melamar posisi <b>" +
            v("posisi", "posisi") +
            "</b> di " +
            v("perusahaan", "perusahaan") +
            ". CV saya terlampir bersama surat ini.</p>" +

            "<p>Saya siap mengikuti proses seleksi dan dapat dihubungi melalui nomor dan email di bawah. Terima kasih atas perhatiannya.</p>" +

            kaki();
    },

    // Gaya keahlian
    keahlian: function () {
        return kepala() +
            "<p>Dengan hormat,</p>" +

            "<p>Saya tertarik mengisi posisi <b>" +
            v("posisi", "posisi") +
            "</b> di " +
            v("perusahaan", "perusahaan") +
            ". Dengan latar belakang " +
            v("pendidikan", "pendidikan") +
            ", saya membawa keahlian pada " +
            daftar($("keahlian").value) +
            " yang saya yakini sesuai dengan kebutuhan posisi ini.</p>" +

            "<p>Saya terbiasa belajar dengan cepat, bekerja sesuai tenggat waktu, dan menjaga kerja sama tim. Saya berharap dapat berkontribusi bagi " +
            v("perusahaan", "perusahaan") +
            " dan diberi kesempatan untuk wawancara.</p>" +

            "<p>CV dan berkas pendukung saya lampirkan bersama surat ini. Terima kasih atas waktu dan pertimbangan Bapak/Ibu.</p>" +

            kaki();
    }
};

// Menampilkan surat
function render() {
    $("kertas").innerHTML = TEMPLATE[gaya]();
}

// Update otomatis ketika input berubah
document.addEventListener("input", render);

// Memilih gaya surat
$("gaya").addEventListener("click", function (e) {
    var g = e.target.getAttribute("data-g");

    if (!g) return;

    gaya = g;

    document.querySelectorAll("#gaya button")
        .forEach(function (b) {
            b.classList.toggle("on", b === e.target);
        });

    render();
});

// Cetak atau simpan PDF
$("cetak").onclick = function () {
    window.print();
};

// Menampilkan tampilan awal
render();
