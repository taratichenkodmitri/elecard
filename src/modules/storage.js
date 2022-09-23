export class Storage {
    constructor() {
    }

    deleteData() {
        localStorage.removeItem('data');
    }

    getData() {
        return JSON.parse(localStorage.getItem('data'));
    }

    static setData(data) {
        localStorage.setItem('data', JSON.stringify(data));
    }
}