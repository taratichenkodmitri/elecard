export class Pagination {
    constructor(cards, currentPage) {
        this.amountCards = 24;
        this.currentPage = currentPage;
        this.observers = [];
        this.cards = cards;
        this.currentCards = this.cards.filter((item, index) => {
            return ((this.amountCards * (this.currentPage - 1)) <= index) && (this.amountCards * (this.currentPage) > index);
        })
    }

    init() {
        let amountPages = Math.ceil(this.cards.length / this.amountCards);

        const pagination =  document.querySelector(".pagination");
        pagination.innerHTML = '';

        const select = document.createElement("select");
        select.classList.add('navigation-selector');

        for(let i = 1; i <= amountPages; i++) {
            const option = document.createElement("option");
            option.value = `${i}`;
            option.text = `page ${i}`;
            select.appendChild(option);
        }

        const options = Array.from(select.options);
        const optionToSelect = options.find(item => item.value == this.currentPage);
        optionToSelect.selected = true;

        select.addEventListener('change', event => {
            this.currentPage = +event.target.value;
            this.currentCards = this.cards.filter((item, index) => {
                return ((this.amountCards * (this.currentPage - 1)) <= index) && (this.amountCards * (this.currentPage) > index);
            })
            this.notifyObservers();
        });

        pagination.appendChild(select);
    }

    registerObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.observers.map(item => {
            item.render();
        });
    }
}