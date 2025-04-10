import "./components/animeCard/animeCard";
import "./services/getDataService";
import getData from "./services/getDataService";

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    };

    connectedCallback() {
        this.render();
    }

    async render() {
        this.shadowRoot!.innerHTML = `
            <h1>Anime List!</h1>
            <section id="app" style="display: flex; justify-content: center;">
                <ul id="anime-list" style="display: flex; flex-wrap: wrap; max-width: 65vw;"></ul>
                <div id="anime-description" style="width: 35vw"></div>
            </section>
        `;

        const data = await getData("https://api.jikan.moe/v4/anime?limit=15&status=complete");
        const animeData = data.data;

        const animeList = this.shadowRoot!.getElementById("anime-list");

        animeData.forEach((anime: any) => {
            const anicard = document.createElement("anime-card");

            anicard.setAttribute("anititle", anime.title);
            anicard.setAttribute("image", anime.images.jpg.image_url);
            
            anicard.addEventListener("click", () => {
                const animeDescription = this.shadowRoot!.getElementById("anime-description");

                animeDescription!.innerHTML = `
                    <h2>${anime.title}</h2>
                    <h4>${anime.score}</h4>
                    <p>${anime.synopsis}</p>
                    <div id="genres"></div>
                    <h3>Episodes: ${anime.episodes!}</h3>
                    <div>
                        <h3>Year: ${anime.year}, Season: ${anime.season}</h3>
                    </div>
                `;

                const genres = animeDescription?.querySelector("#genres");
                anime.genres.forEach((genre: any) => {
                    const genreElement = document.createElement("p");
                    genreElement.innerText = genre.name;

                    genres?.appendChild(genreElement);
                })
            });

            animeList!.appendChild(anicard);
        });
    }
}

customElements.define("app-container",AppContainer);