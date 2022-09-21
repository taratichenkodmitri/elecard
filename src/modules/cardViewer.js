import { Pagination } from "./Pagination";

export class CardViewer {
    constructor(cards) {
        this.defualtCards = cards;
        this.modifyCards = cards;
        this.pagination = new Pagination(cards, 1);
    }

    init() {
       this.pagination.init();
       this.pagination.registerObserver(this);

       this.render();
    }

    render() {
        const container =  document.querySelector(".card-container");
        container.innerHTML = "";

        this.pagination.currentCards.map(item => {
            const card = document.createElement("div");
            card.id = item.id;
            card.classList.add("card");

            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");
            card.appendChild(imageContainer);

            const img = document.createElement("img");
            img.src = item.image;
            imageContainer.appendChild(img);

            const button = document.createElement("button");
            button.classList.add("close-button");
            this.addButtonListener(button);
            card.appendChild(button);

            const icon = document.createElement("span");
            icon.classList.add("close-icon");
            button.appendChild(icon);

            const p = document.createElement("p");
            p.innerHTML = `category: ${item.category}; size: ${item.filesize}`;
            card.appendChild(p);

            container.appendChild(card);
        })
    }

    addButtonListener(button) {
        button.addEventListener('click', event => {
            const delElem = event.currentTarget.parentNode;

            this.modifyCards = this.modifyCards.filter(item => item.id != delElem.id);
            delElem.parentNode.removeChild(delElem);

            let currentPage = this.pagination.currentPage;
            this.pagination = new Pagination(this.modifyCards, currentPage);
            this.pagination.init();
            this.pagination.registerObserver(this);
            this.pagination.notifyObservers();

        });
    }
}