// "Mod Değiştir" butonunu seç
const toggleModeButton = document.querySelector("#toggleMode");

// Varsayılan mod başlangıcı
if (localStorage.getItem("mode") === "light") {
    document.body.classList.add("light-mode");
    toggleModeButton.textContent = "Karanlık Moda Geç";
} else {
    document.body.classList.remove("light-mode");
    toggleModeButton.textContent = "Aydınlık Moda Geç";
}

// Butona tıklama olayını dinle
toggleModeButton.addEventListener("click", () => {
    // Body'ye "light-mode" sınıfını ekle/kaldır
    document.body.classList.toggle("light-mode");

    // Mod durumunu kaydet
    if (document.body.classList.contains("light-mode")) {
        toggleModeButton.textContent = "Karanlık Moda Geç";
        localStorage.setItem("mode", "light");
    } else {
        toggleModeButton.textContent = "Aydınlık Moda Geç";
        localStorage.setItem("mode", "dark");
    }
});
// Şarkı çalar ve liste
const audioPlayer = document.getElementById("audio-player");
const songList = document.getElementById("song-list");
const currentSong = document.getElementById("current-song");
const playButton = document.getElementById("play-song");
const pauseButton = document.getElementById("pause-song");

// Şarkı seçildiğinde çalar
songList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        const songSrc = e.target.getAttribute("data-src");
        const songName = e.target.textContent;

        document.getElementById("audio-source").src = songSrc;
        audioPlayer.load();
        currentSong.textContent = songName;
        audioPlayer.play();
    }
});

// Çal ve duraklat düğmeleri
playButton.addEventListener("click", () => audioPlayer.play());
pauseButton.addEventListener("click", () => audioPlayer.pause());
document.addEventListener("DOMContentLoaded", function() {
    const playButton = document.getElementById("play-song");
    const pauseButton = document.getElementById("pause-song");
    const audioPlayer = document.getElementById("audio-player");
    const fileInput = document.getElementById("file-input");
    const currentSong = document.getElementById("current-song");
    const audioSource = document.getElementById("audio-source");

    // Dosya seçildiğinde şarkıyı yükle ve çalmaya başla
    fileInput.addEventListener("change", function(e) {
        const file = e.target.files[0]; // Seçilen dosyayı al
        if (file) {
            const fileURL = URL.createObjectURL(file); // Dosya için geçici bir URL oluştur
            audioSource.src = fileURL; // Audio kaynağını güncelle
            audioPlayer.load(); // Yeni şarkıyı yükle
            audioPlayer.play(); // Şarkıyı çalmaya başla
            currentSong.textContent = file.name; // Şarkı ismini göster
        }
    });

    // Çal butonuna tıklanıldığında şarkıyı çal
    playButton.addEventListener("click", function() {
        audioPlayer.play();
    });

    // Duraklat butonuna tıklanıldığında şarkıyı duraklat
    pauseButton.addEventListener("click", function() {
        audioPlayer.pause();
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const playButton = document.getElementById("play-song");
    const pauseButton = document.getElementById("pause-song");
    const audioPlayer = document.getElementById("audio-player");
    const fileInput = document.getElementById("file-input");
    const currentSong = document.getElementById("current-song");
    const audioSource = document.getElementById("audio-source");
    const songList = document.getElementById("song-list");

    // Şarkı listesine tıklanıldığında şarkıyı çalmak için
    songList.addEventListener("click", function(event) {
        const clickedItem = event.target;
        if (clickedItem.tagName === "LI") {
            const songUrl = clickedItem.getAttribute("data-src");
            audioSource.src = songUrl;
            audioPlayer.load();
            audioPlayer.play();
            currentSong.textContent = clickedItem.textContent; // Şu an çalan şarkı adı
        }
    });

    // Çal butonuna tıklanıldığında şarkıyı çal
    playButton.addEventListener("click", function() {
        if (audioPlayer.src) {
            audioPlayer.play();
        }
    });

    // Duraklat butonuna tıklanıldığında şarkıyı duraklat
    pauseButton.addEventListener("click", function() {
        audioPlayer.pause();
    });

    // Dosya yükleme işlemi
    fileInput.addEventListener("change", function(e) {
        const file = e.target.files[0]; // Seçilen dosyayı al
        if (file) {
            const fileURL = URL.createObjectURL(file); // Dosya için geçici bir URL oluştur
            const listItem = document.createElement("li");
            listItem.textContent = file.name; // Dosyanın adını liste elemanı olarak ekle
            listItem.setAttribute("data-src", fileURL); // URL'yi li elementine ekle

            // Şarkıya tıklanıldığında çalmayı başlat
            listItem.addEventListener("click", function() {
                audioSource.src = fileURL;
                audioPlayer.load();
                audioPlayer.play();
                currentSong.textContent = file.name;
            });

            songList.appendChild(listItem); // Yeni şarkıyı listeye ekle
        }
    });
});
const fileInput = document.getElementById("file-input");
const audioPlayer = document.getElementById("audio-player");

fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const fileData = e.target.result;

            // Yüklenen dosyayı tarayıcı belleğine kaydet
            localStorage.setItem("uploadedFile", fileData);
            localStorage.setItem("uploadedFileName", file.name);

            // Çalmak için src'yi ayarla
            audioPlayer.src = fileData;
            audioPlayer.play();
        };
        reader.readAsDataURL(file);
    }
});

// Sayfa yüklendiğinde kontrol et
document.addEventListener("DOMContentLoaded", () => {
    const storedFile = localStorage.getItem("uploadedFile");
    const storedFileName = localStorage.getItem("uploadedFileName");
    if (storedFile) {
        document.getElementById("current-song").textContent = storedFileName;
        audioPlayer.src = storedFile;
    }
});

