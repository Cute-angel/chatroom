import axios from "axios";

async function get(url){
    /*need await*/
    const Co_responce =  axios.get(url)
    return Co_responce

}

async function post(url,body) {
    /*need await*/
    const Co_responce = axios.post(url,body);
    return Co_responce
}


export default {
    get,
    post
}