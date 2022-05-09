import config from './config';

export default class Data {
    api(path, method, body) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            redirect: 'follow'
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        return fetch(url, options);
    }

    async createNewsletter(newsletter) {
        const response = await this.api('/newsletter', 'POST', newsletter);
        console.log(response);
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }
}
