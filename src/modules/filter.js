export class Filter {
    constructor(cards, valueForSort = 'size') {
        this.observers = [];
        this.cards = cards;
        this.valueForSort = valueForSort;
    }

    init() {
        const filter =  document.querySelector(".filter");
        filter.classList.remove('hidden');

        filter.addEventListener("submit", event => {
            const data = new FormData(filter);

            for(const entry of data) {
                this.valueForSort = entry[1];
            }
            this.notifyObservers();
            event.preventDefault();
        })
    }

    hidden() {
        const filter =  document.querySelector(".filter");
        filter.classList.add('hidden');
    }

    sortData() {
        switch (this.valueForSort) {
            case 'size':
                this.cards.sort((a, b) => a.filesize - b.filesize);
                break;
            case 'category':
                this.cards.sort((a, b) => {
                    let categoryA = a.category, categoryB = b.category;
                    if (categoryA > categoryB) {
                        return 1;
                    }
                    if (categoryA < categoryB) {
                        return -1;
                    }
                    return 0;
                });
            case 'date':
                this.cards.sort((a, b) => a.timestamp - b.timestamp);
                break;
        }

    }

    registerObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.sortData();
        this.observers.map(item => {
            item.filterData(this.cards);
        });
    }
}