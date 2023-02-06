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
            `;
            judulSurat.innerHTML = cardJudulSurat;

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