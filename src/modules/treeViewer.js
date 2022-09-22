import {DateConverter} from "./dateConverter";

export class TreeViewer {
    constructor(cards, urlSize) {
        this.defualtCards = cards.sort((a, b) => {
                let categoryA = a.category, categoryB = b.category;
                if (categoryA > categoryB) {
                    return 1;
                }
                if (categoryA < categoryB) {
                    return -1;
                }
                return 0;
        });
        this.urlSize = urlSize;
    }

    init() {
        const content =  document.querySelector(".content");

        const list = document.createElement("ul");
        const root = this.createNode('category');
        const categories = this.createChildren(root);

        let prevItem = {};
        let newNode = {};
        let leaf = {};
        let children = {};
        this.defualtCards.map(item => {
            if (item.category !== prevItem.category) {
                newNode = this.createNode(item.category);
                children = this.createChildren(newNode);
                categories.appendChild(newNode);
            }
            leaf = this.createLeaf(item);
            children.appendChild(leaf);
            prevItem = item;
        });

        list.appendChild(root);
        content.appendChild(list);
        this.addOpenListeners();
    }

    createNode(value) {
        const node = document.createElement("li");
        const span = document.createElement("span");
        span.classList.add("caret");
        node.appendChild(span);
        node.innerHTML += value;
        return node;
    }

    createChildren(parent) {
        const children = document.createElement("ul");
        children.classList.add('hidden');
        parent.appendChild(children);
        return children;
    }

    createLeaf(data) {
        const leaf = document.createElement("li");
        leaf.innerHTML = `image: <a href="${data.image}">${data.image.slice(this.urlSize, data.image.length)}</a>; ` +
                        `filesize: ${data.filesize}; data: ${DateConverter.convertTimestamp(data.timestamp)}`
        return leaf;
    }

    addOpenListeners() {
        let openButton = document.querySelectorAll(".caret");

        openButton.forEach(item => {
            item.addEventListener("click", function () {
                this.parentElement.querySelector(".hidden").classList.toggle("active");
                this.classList.toggle("caret-down");
            })
        });
    }
}