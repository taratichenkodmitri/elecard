export class CardViewer {
    constructor(cards) {
        this.cards = cards;
        console.log(cards)
    }

    render() {
        const container =  document.querySelector(".container");
        container.innerHTML = "";

        this.cards.map(item => {
            const card = document.createElement("div");
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
            delElem.parentNode.removeChild(delElem);
        })
    }
}