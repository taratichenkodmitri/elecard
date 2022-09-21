export class Loader {
    url = "http://contest.elecard.ru/frontend_data/";
    constructor() {
    }

    async getJson() {
        await fetch(
            this.url + 'catalog.json',
            { method: 'GET' }
        )
            .then(response => response.json())
            .then(json => {
                this.data = json;
            })
            .catch(error => console.error('error:', error));

        this.makeImagesUrl();
    }

    makeImagesUrl() {
       this.data.map(item => {
           item.image = this.url + item.image;
       })
    }

    getDownloadedData() {
        return this.data;
    }
}