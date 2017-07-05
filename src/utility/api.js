import axios from 'axios';

export default {
    fetchRepo: function (language) {
        let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

        return axios.get(encodedURI)
            .then((response) => {
                console.log(response);
                return response.data.items;
            })
    }
}

