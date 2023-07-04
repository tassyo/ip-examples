const axios = require("axios");
const getIP = async ()=>{
    try {
        let result = await axios.get(`https://api.ipify.org?format=json`);
        return result.data.ip;
    } catch (ex) {
        return '';
    }
};
module.exports = {getIP}