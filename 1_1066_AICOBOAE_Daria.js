//initializam variabile, luand elementul din document dupa ID
var canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var incarcaFisier = document.getElementById('fisierIntrare');
var sound = new Audio("media/clicksound.wav");

//buton de download
butonDownload = document.getElementById('butonDownload');
//fisier de input
incarcaFisier = document.getElementById('fisierIntrare');
//buton de reset
butonReset = document.getElementById('butonReset');

//initializam o variabila image de tip Image
let image = new Image();

//animatie
document.querySelector(".animatie").classList.toggle("rotatie");


//functie de incarcare a pozei
incarcaFisier.addEventListener('change', (e) => {
    //getter pt file
    const fisier = document.getElementById('fisierIntrare').files[0];
    //init filereader
    const citire = new FileReader();
    if (fisier) {
        //setam numele fisierului
        fileName = fisier.name;
        //read data ca url
        citire.readAsDataURL(fisier);
    }
    citire.addEventListener('load', () => {
        image = new Image();
        image.src = citire.result;
        image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
            canvas.removeAttribute('data-caman-id');
        };
    }, false);
});

//filtre si efecte
//la click pe buton, efectele isi vor mari intensitatea iar filtrele vor fi aplicate
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('adaugaLuminozitate')) {
        Caman("#canvas", image, function() {
            this.brightness(5).render();
        });
    } else if (e.target.classList.contains("scadeLuminozitate")) {
        Caman("#canvas", image, function() {
            this.brightness(-5).render();
        });
    } else if (e.target.classList.contains("adaugaContrast")) {
        Caman("#canvas", image, function() {
            this.contrast(5).render();
        });
    } else if (e.target.classList.contains("scadeContrast")) {
        Caman("#canvas", image, function() {
            this.contrast(-5).render();
        });
    } else if (e.target.classList.contains("adaugaSaturatie")) {
        Caman("#canvas", image, function() {
            this.saturation(5).render();
        });
    } else if (e.target.classList.contains("scadeSaturatie")) {
        Caman("#canvas", image, function() {
            this.saturation(-5).render();
        });
    } else if (e.target.classList.contains("adaugaVintage")) {
        Caman("#canvas", image, function() {
            this.vintage().render();
        });
    } else if (e.target.classList.contains("adaugaOrangePeel")) {
        Caman("#canvas", image, function() {
            this.orangePeel().render();
        });
    } else if (e.target.classList.contains("adaugaSinCity")) {
        Caman("#canvas", image, function() {
            this.sinCity().render();
        });
    }
});

//Stergere filtru si efect
butonReset.addEventListener('click', (eveniment) => {
    sound.play();
    sound.currentTime = 0;
    Caman("#canvas", image, function() {
        this.revert(true);
    });
});

//Download
butonDownload.addEventListener('click', (eveniment) => {
    sound.play();
    sound.currentTime = 0;
    let numeNou;
    numeNou = 'edited_photo.jpg';
    //apel download
    download(canvas, numeNou);
});

//functie download
function download(canvas, numeFisier) {
    let event; //eveniment - event
    link = document.createElement('a');

    link.download = numeFisier;
    link.href = canvas.toDataURL('image/jpeg', 0.8); //1 -> calitate de 100%

    event = new MouseEvent('click');
    link.dispatchEvent(event);
}