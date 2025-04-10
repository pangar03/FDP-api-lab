enum AnimeCardProps{
    "anititle" = "anititle",
    "image" = "image",
};

class AnimeCard extends HTMLElement {
    anititle?: string;
    image?: string;
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return Object.values(AnimeCardProps);
    }

    connectedCallback() {
        this.render();
    }
    render() {
        this.shadowRoot!.innerHTML = `
            <style>
                #anime-card {
                    display: flex;
                    max-width: 60vw;
                    height: 300px;
                    border-radius: 10px;
                    border: 1px solid #444;
                    background-color: #eee;
                    margin: 10px;
                    padding: 10px;
                    cursor: pointer;
                }
                    
            </style>
            <div id="anime-card">
                <img src="${this.getAttribute("image")}" alt="${this.getAttribute("anititle")}">
                <div>
                    <h2>${this.getAttribute("anititle")}</h2>
                </div>
            </div>
        `;
    }
}

customElements.define("anime-card", AnimeCard);
export default AnimeCard;