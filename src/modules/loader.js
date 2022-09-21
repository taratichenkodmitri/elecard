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
        let id = 0;
        this.data.map(item => {
           item.image = this.url + item.image;
           item.id = `${id}`;
           id++;
        });
    }

    getDownloadedData() {
        return this.data;
    }
}