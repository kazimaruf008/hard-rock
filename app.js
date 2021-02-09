const search = () =>{
    const searchText = document.getElementById('serch-fild').value
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
    .then(Response => Response.json())
    .then(data => displaySong(data.data))
    .catch(error=> displayError('some thing wrong!! please try agin letter!'))
}

// coll of the async

// const search = async () =>{
//     const searchText = document.getElementById('serch-fild').value
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`
//     const Response = await fetch(url)
//     const data = await Response.json()
//     displaySong(data.data)
// }

const displaySong = songs => {
    const songContainer = document.getElementById('song-container')
    songContainer.innerHTML= ""
    songs.forEach( song => {
        const songDiv = document.createElement('div')
        songDiv.className= "single-result row align-items-center my-3 p-3"
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/ogg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center,">
                <button onclick="getLyric('${song.title}', '${song.artist.name}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songContainer.appendChild(songDiv)
    })
}
const getLyric = (title, artist) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLyrics(data.lyrics))
}
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}
const displayError = error => {
    document.getElementById("error-massage").innerText = error
}