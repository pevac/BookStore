export default  class Api {
    static rootUrl = `http://localhost:3001/api`;
    static colletionsUrl = `/collections`;
    static booksUrl = `/books`;

    static combineUrl(url, id){
        return id ? `${Api.rootUrl}/${url}/${id}` :  `${Api.rootUrl}/${url}`
    }

    static getAllRecords(url) {
        const sourceUrl = Api.combineUrl(url);
        const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8'});
        const initFetch = { method: 'GET', headers: headers };
        return fetch(sourceUrl, initFetch)
            .then((response) => { 
                if (!response.ok) {
                    return false;
                }
                return response.json();
            })
            .catch(error => { throw(error); })
    }

    static getRecord(url, id) {
        const sourceUrl = Api.combineUrl(url, id);
        const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8'});
        const initFetch = { method: 'GET', headers: headers };
        
        return fetch(sourceUrl, initFetch)
            .then((response) => { 
                if (!response.ok) {
                    return false;
                }
                return response.json();
            })
            .catch(error => { throw(error); })
    }

    static saveRecord(url, value) {
        const sourceUrl = Api.combineUrl(url, value._id);
        const method = value._id ? 'PUT' : 'POST';
        const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8'});
        const initFetch = { method: method, body: JSON.stringify(value), headers: headers };
        
        return fetch(sourceUrl, initFetch)
            .then((response) => { 
                if (response.ok) {
                    return response.json();
                }
                return false;
            })
            .catch(error => { throw(error); })
    }

    static deleteRecord(url,  id) {
        const sourceUrl = Api.combineUrl(url, id);
        const initFetch = { method: 'DELETE' };
        
        return fetch(sourceUrl, initFetch)
            .then((response) => { 
                if (response.ok) {
                    return true;
                }
                return false;
            })
            .catch(error => { throw(error); })
    }
}