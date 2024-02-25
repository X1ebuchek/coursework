import axios from 'axios';

const loginInstance = axios.create({
    baseURL: 'http://localhost:42069/auth/'
});

const humanInstance = axios.create({
    baseURL: 'http://localhost:42069/api/human/'
})

const abbeyInstance = axios.create({
    baseURL: 'http://localhost:42069/api/abbey/'
})

const outsiderInstance = axios.create({
    baseURL: 'http://localhost:42069/api/outsider'
})

const headers = {
    'Content-Type': 'application/json'
}

const headers_with_token = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '
}


const authAPI = {
    async login(data) {
        return loginInstance.post('login', data, {headers: headers});
    },

    async register(data) {
        return loginInstance.post('register', data, {headers: headers});
    },

    async login_by_token(data) {
        return loginInstance.post('bytoken', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(data).token
            }
        });
    },

    async get_altar(data) {
        return humanInstance.get('isAltarExist', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(data).token
            }
        });
    },

    async altar(data) {
        return humanInstance.post('altar', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(data).token
            }
        });
    },

    async good_action(token) {
        return humanInstance.post('good_action', token,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        });
    },

    async bad_action(token) {
        return humanInstance.post('bad_action', token, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        });
    },

    async get_instr(token){
        return abbeyInstance.get('all_instr', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        });
    },

    async get_humans(token){
        return humanInstance.get('withRatings', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        });
    },

    async all_ability(token){
        return humanInstance.get('all_ability', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        });
    },

    async rune_count(token){
        return humanInstance.get('rune_count', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        });
    },

    async elected_ability(token){
        return humanInstance.get('elected_ability', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        });
    },

    async buy_ability(data, token){
        return humanInstance.post('buy_ability', data,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        });
    },

    async get_electedHumans(token){
        return outsiderInstance.get('my_humans', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        });
    },

    async make_elected(data, token){
        return outsiderInstance.post('make_elected', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        });
    },

    async make_unelected(data, token){
        return outsiderInstance.post('make_unelected', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        });
    },

    async add_instr(data, token){
        return abbeyInstance.post('add_instr', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        });
    },

    async make_members(data, token){
        return abbeyInstance.post('make_members', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        });
    },

    async all_members(token){
        return abbeyInstance.get('all_members', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        });
    },

    async sacrifice(data, token){
        return abbeyInstance.post('sacrifice', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        });
    },
}

export default authAPI;