const token ='BQCA5Kv74Fo_Vb3Xo5dhqk5nShR9HC7L0ympEK1EBU7C8fB2Bscuh2aP5WDUyjBgREbRV1IeIBBCk4ywX-vPf9uqkxTCyntD67ehIXS6_vgiXDPEyYIPf9rXadtP-fnW1B_DC_oxH2I5WQz1TXrV-OJT-WdYqfAJfwMvyp5slFqrI6MEcUzqb-BK6FfBak6BuA2vJiVG1KfRB9d92N1aOahxDug3wyi78ayGMRdMKgpWr4wcaSn00ct1B_Mzs7ZjQE9yNpMc6nrfJwXwfQCylEWN';
const artistIds = [
    "5VVN3xZw1i2qihfITZlvCZ",
    "2ae6PxICSOZHvjqiCcgon8",
    "2wPsNCwhEGb0KvChZ5DD52",
    "2IUtwMti1OiT3lkW6RubgH",
    "1mYsTxnqsietFxj1OgoGbG",
    "74S8YRi4XQ5yf9ToSzuY80",
    "0oOet2f43PA68X5RxKobEy",
    "4xVrxpa8IgoLneQbdPnSsk",
    "5qhGpFQDS0CHw4cKeCzaai",
    "4iA6bUhiZyvRKJf4FNVX39"
];

const url = `https://api.spotify.com/v1/artists?ids=${artistIds.join("%2C")}&include_groups=album,single`; 
async function fetchArtistData() {
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
        }

        const { artists } = await response.json();
        const artistList = document.getElementById("artist-list");

        artists.forEach((artist) => {
            const artistCard = createArtistCard(artist);
            artistList.appendChild(artistCard);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function createArtistCard(artist) {
    const artistCard = document.createElement("div");
    artistCard.classList.add("artist-card");

    const artistImage = document.createElement("img");
    artistImage.classList.add("artist-image");
    artistImage.src = artist.images[0].url;

    const artistDetails = document.createElement("div");
    artistDetails.classList.add("artist-details");

    const artistName = document.createElement("div");
    artistName.classList.add("artist-name");
    artistName.textContent = artist.name;

    const artistGenres = document.createElement("div");
    artistGenres.classList.add("artist-genres");
    artistGenres.textContent = artist.genres.join(", ");

    const artistAlbums = document.createElement("div");
    artistAlbums.classList.add("artist-albums");

   
    fetchArtistAlbums(artist.id, artistAlbums);

    artistDetails.appendChild(artistName);
    artistDetails.appendChild(artistGenres);
    artistDetails.appendChild(artistAlbums);

    artistCard.appendChild(artistImage);
    artistCard.appendChild(artistDetails);

    return artistCard;
}

async function fetchArtistAlbums(artistId, artistAlbums) {
    try {
        const albumsResponse = await fetch(
            `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (albumsResponse.ok) {
            const albumsData = await albumsResponse.json();
            const albums = albumsData.items;

            albums.forEach((album) => {
                const albumName = document.createElement("div");
                albumName.textContent = album.name;
                artistAlbums.appendChild(albumName);
            });
        } else {
            console.error(`Error fetching albums for artist ${artistId}: ${albumsResponse.statusText}`);
        }
    } catch (error) {
        console.error('Error fetching albums:', error);
    }
}

fetchArtistData();