const elementById = (id) => {
    return document.getElementById(id);
};

const handleSearch = () => {
    const keyword = elementById("keyword");
    const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => showArtists(data));
    keyword.value = "";
};

const showArtists = ({ artists }) => {
    console.log(artists);
    if (artists === null) {
        return alert("Input the valid Artist!");
    }
    const artistContainer = elementById("artists");
    artists?.forEach((artist) => {
        const div = document.createElement("div");
        div.classList.add("artist-card");
        div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${
            artist.strArtistThumb
                ? artist.strArtistThumb
                : "https://nordicplacebranding.com/wp-content/uploads/2017/09/dummy-person-image.jpg"
        }"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist ? artist.strArtist : "No updated"}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry : "NO updated"}</p>
    <p>Style: ${artist.strGenre ? artist.strGenre : "NO updated"}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${
        artist.idArtist
    }')" class="button-title">Albums</p>
  </button>`;
        artistContainer.appendChild(div);
    });
    const albumContainer = elementById("albums");
    albumContainer.innerHTML = "";
};

const fetchAlbums = (id) => {
    const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => showAlbum(data));
    const artistContainer = elementById("artists");
    artistContainer.innerHTML = "";
    const albumContainer = elementById("albums");
    albumContainer.innerHTML = "";
};

const showAlbum = ({ album }) => {
    const albumContainer = elementById("albums");
    albumContainer.innerHTML = "";
    album.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("album");
        div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${
                item.strAlbumThumb
                    ? item.strAlbumThumb
                    : "https://nordicplacebranding.com/wp-content/uploads/2017/09/dummy-person-image.jpg"
            }"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${item.strAlbum ? item.strAlbum : "NO updeated"}</h3>
        </div>
      `;

        albumContainer.appendChild(div);
    });
};
