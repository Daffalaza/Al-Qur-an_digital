function getURL(e){
    const pageURL = window.location.search.substring(1);
    const urlVariable = pageURL.split('&');

    for (let i = 0; i < urlVariable.length; i++) {
        const parameterName = urlVariable[i].split('=');
        if (parameterName[0] == e) {
            return parameterName[1];
        }
    }
}

const nomorsurat = getURL('nomorsurat');

function getSurat() {
    fetch(`https://equran.id/api/surat/${nomorsurat}`)
        .then(response => response.json())
        .then(response => {
            
            const judul = document.querySelector('#surat');
            judul.textContent = `Surat: ${response.nama_latin}`;

            const judulSurat = document.querySelector('.judul-surat');
            const cardJudulSurat = `
            <strong>${response.nama_latin}</strong>
            <p>Jumlah Ayat: ${response.jumlah_ayat}•(${response.arti})</p>
            <button class="btn btn-primary mulai">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
                    <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                </svg>
            </button>
            <button class="btn btn-danger hidden-button pause">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16">
                    <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                </svg>
            </button>
            <audio id="audio-tag" src="${response.audio}"></audio>
            `;
            judulSurat.innerHTML = cardJudulSurat;
            const mulai = document.querySelector('.mulai');
            const lah = document.querySelector('.pause');
            const suara = document.querySelector('#audio-tag');

            mulai.addEventListener('click', function(){
                mulai.classList.add('hidden-button');
                lah.classList.remove('hidden-button');
                suara.play();
            });

            lah.addEventListener('click', function(){
                mulai.classList.remove('hidden-button');
                lah.classList.add('hidden-button');
                suara.pause();
            })

        });
}

function getIsi(){
    fetch(`https://equran.id/api/v2/surat/${nomorsurat}`)
        .then(response => response.json())
        .then(response => {
            const surat = response.data.ayat;
            console.log(surat);
            let isiSurat = '';
            surat.forEach( s => {
                isiSurat += `
                <div class="card mb-3">
                    <div class="card-body">
                        <p>${nomorsurat}:${s.nomorAyat}</p>
                        <h3 class="text-end">${s.teksArab}</h3>
                        <p>${s.teksLatin}</p>
                        <P>${s.teksIndonesia}</P>
                    </div>
                </div>
                `;
            });
            const CardisiSurat = document.querySelector('.isi');
            CardisiSurat.innerHTML = isiSurat;
        });

}

getSurat();
getIsi();