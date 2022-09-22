export class DateConverter {
    constructor() {
    }

    static convertTimestamp(timestamp) {
        let date = new Date(timestamp);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}::${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
}