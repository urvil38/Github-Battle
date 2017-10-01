import axios from 'axios';
import config from '../config/config.json';
const params = '?clinet_id=' + config.clientId + '&client_secret=' + config.clientSecret; 

function getProfile(username){
    return axios.get('https://api.github.com/users/' + username + params)
        .then((user) => {
            return user.data
        })
}

function getRepos(username){
    return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
}

function getStars(repos){
    return repos.data.reduce((count,repo) => {
        return count + repo.stargazers_count;
    },0)
}

function calculateWinner(profile,repos){
    let followers = profile.followers;
    let totalStars = getStars(repos);
    return followers + (totalStars * 3);
}

function handleError(error){
    console.warn(error);
    return null;
}

function getUserData(player){
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then((data) => {
        let profile = data[0];
        let repos = data[1];
        let totalStars = getStars(repos);
        return {
            profile : profile,
            score : calculateWinner(profile,repos),
            totalStars : totalStars
        }
    })
}

function sortPlayer(players){
    return players.sort((a,b) => {
        return b.score - a.score;
    });
}

export default {

    battle : function(players){
        return axios.all(players.map(getUserData))
                .then(sortPlayer)
                .catch(handleError)
    },

    fetchRepo: function (language) {
        let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories' + params);
        return axios.get(encodedURI)
            .then((response) => {
                return response.data.items;
        })
    }
}

