//util para frontend
const getPosition = () => {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
};
//util para frontend
const getLocation = async () => {
    try {
        const position = await getPosition();
        const altitude = position.coords.altitude || 0;
        const locale =
            'Timestamp: ' +
            position.timestamp +
            ' - Accuracy: ' +
            position.coords.accuracy +
            ' - Altitude: ' +
            altitude +
            ' - Latitude: ' +
            position.coords.latitude.toFixed(6) +
            ' - Longitude: ' +
            position.coords.longitude.toFixed(6);
        return locale;
    } catch (er) {
        console.error('ERRO LOCALE ', er);
        return;
    }
};

//util para frontend
const getGeolocation = () => {
    const coordinates = { latitude: 0, longitude: 0 };
    try {
        const { geolocation } = window.navigator;
        geolocation.getCurrentPosition(async function ({ coords }) {
            const { latitude, longitude } = coords;

            coordinates.latitude = latitude;
            coordinates.longitude = longitude;
        });
    } catch (err) {
        console.log(err);
    }
    return coordinates;
}
const getGeolocationByIp = (ip) =>{
    const geoip = require('geoip-lite');
    return geoip.lookup(ip);
}

module.exports = {getLocation, getGeolocation, getGeolocationByIp}