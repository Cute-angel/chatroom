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



export  function getCurrentTime() {
    const date = new Date();
    let hours = date.getHours();
    let  minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // 将小时转换为12小时制
    hours = hours % 12;
    hours = hours ? hours : 12; // 小时为0时显示为12
    const strMinutes = minutes < 10 ? '0' + minutes : minutes; // 确保分钟是两位数
    
    return `${hours}:${strMinutes} ${ampm}`; // 返回格式化的时间字符串
    };

export function print (){
    console.log("Test")
}