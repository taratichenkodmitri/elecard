import {Loader} from "./loader";
import {CardViewer} from "./cardViewer";
import {TreeViewer} from "./treeViewer";

export class App {
    constructor(valueForDisplay = 'tree') {
        this.valueForDisplay = valueForDisplay;
        this.loader = new Loader();
        this.viewer = null;
    }

    async init() {
        await this.loader.getJson();

        const display =  document.querySelector(".display");

        display.addEventListener("submit", event => {
            const data = new FormData(display);

            for(const entry of data) {
                this.valueForDisplay = entry[1];
            }
            this.run();
            event.preventDefault();
        })
    }

    run() {
        const content =  document.querySelector(".content");
        content.innerHTML = "";

        switch (this.valueForDisplay) {
            case 'cards':
                const cardContainer = document.createElement("div");
                cardContainer.classList.add("card-container");
                content.appendChild(cardContainer);

                const pagination = document.createElement("div");
                pagination.classList.add("pagination");
                content.appendChild(pagination);

                this.viewer = new CardViewer(this.loader.getDownloadedData());
                this.viewer.init();
                break;
            case 'tree':
                this.viewer = new TreeViewer(this.loader.getDownloadedData(), this.loader.url.length);
                this.viewer.init();
                break;
        }
    }
}