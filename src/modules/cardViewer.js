import { Pagination } from "./Pagination";
import { Filter } from "./filter";
import { Storage } from "./storage";
import {DateConverter} from "./dateConverter";

export class CardViewer {
    constructor(cards) {
        this.modifyCards = cards;
        this.pagination = new Pagination(cards, 1);
        this.filter = new Filter(cards);
    }

    init() {
       this.pagination.init();
       this.pagination.registerObserver(this);

       this.filter.init();
       this.filter.registerObserver(this);
       this.filter.notifyObservers();

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
            p.innerHTML = `category: ${item.category}; size: ${item.filesize}; date: ${DateConverter.convertTimestamp(item.timestamp)}`;
            card.appendChild(p);

            container.appendChild(card);
        })
    }

    filterData(cards) {
        this.modifyCards = cards;

        this.rebuildPagination();
        this.render();
    }

    addButtonListener(button) {
        button.addEventListener('click', event => {
            const delElem = event.currentTarget.parentNode;

            this.modifyCards = this.modifyCards.filter(item => item.id != delElem.id);
            Storage.setData(this.modifyCards);
            delElem.parentNode.removeChild(delElem);
            this.rebuildFilter();
            this.rebuildPagination();
        });
    }

    rebuildPagination() {
        let currentPage = this.pagination.currentPage;
        this.pagination = new Pagination(this.modifyCards, currentPage);
        this.pagination.init();
        this.pagination.registerObserver(this);
        this.pagination.notifyObservers();
    }

    rebuildFilter() {
        let currentFilterCondition = this.filter.valueForSort;
        this.filter = new Filter(this.modifyCards, currentFilterCondition);
        this.filter.init();
        this.filter.registerObserver(this);
        this.filter.notifyObservers();
    }

    destroy() {
        this.filter.hidden();
    }
}