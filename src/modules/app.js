import { Loader } from "./loader";
import { CardViewer } from "./cardViewer";
import { TreeViewer } from "./treeViewer";
import { Storage } from "./storage";

export class App {
    constructor(valueForDisplay = 'cards') {
        this.valueForDisplay = valueForDisplay;
        this.loader = new Loader();
        this.viewer = null;
        this.storage = new Storage();
        this.toggleFlag = true;
    }

    async init() {
        await this.loader.getJson();
        this.refreshControl();

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

    refreshControl() {
        const refresh = document.querySelector('.refresh-button');
        refresh.classList.add('hidden');

        refresh.addEventListener('click', event => {
            this.storage.deleteData();
            this.run();
        })
    }

    toggleRefreshControl() {
        const refresh = document.querySelector('.refresh-button');
        refresh.classList.toggle('hidden');
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

                const data = this.storage.getData() || this.loader.getDownloadedData();

                this.viewer = new CardViewer(data);
                this.viewer.init();
                if (this.toggleFlag) {
                    this.toggleRefreshControl();
                    this.toggleFlag = false;
                }

                break;
            case 'tree':
                this.viewer.destroy();
                this.viewer = new TreeViewer(this.loader.getDownloadedData(), this.loader.url.length);
                this.viewer.init();
                this.toggleRefreshControl();
                this.toggleFlag = true;
                break;
        }
    }
}