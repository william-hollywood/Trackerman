import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// Converts numeric degrees to radians
function toRad(value: number) {
    return value * Math.PI / 180;
}

function calcCrow(lat1: any, lon1: any, lat2: any, lon2: any) {
    let R = 6371; // km
    let dLat = toRad(lat2 - lat1);
    let dLon = toRad(lon2 - lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

function gpsSuccess(position: GeolocationPosition) {
    if (position.timestamp >= Model.lastGps + Model.gpsDelay) {
        Model.lastGps = position.timestamp;
        Model.route.push({ timestamp: Date.now(), coords: { latitude: position.coords.latitude, longitude: position.coords.longitude } });
    }
}

function gpsError(error: GeolocationPositionError) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

export class Model {

    static uname = "";
    static passhash = "";
    static walkspeed = 5;
    static valid = false;
    static gpsID: number;
    static route: any[] = [];

    static gpsDelay: any;
    static lastGps: any;

    static options: any = {
        maximumAge: 3600000,
        timeout: 3000,
        enableHighAccuracy: true,
    }

    static startGPS() {
        Model.gpsID = navigator.geolocation.watchPosition(gpsSuccess, gpsError, Model.options)
    }

    static stopGPS() {
        navigator.geolocation.clearWatch(Model.gpsID);
    }

    static saveRouteToFirebase() {
        // iterate over the route, extract the useful info
        let startTime = Model.route[0].timestamp;
        let length = Model.route[Model.route.length - 1].timestamp - startTime;
        let points = []
        let dist = 0;
        for (let i = 0; i < Model.route.length; i++) {
            let pos = Model.route[i];
            points.push([pos.coords.latitude, pos.coords.longitude])
            if (i != 0) {
                dist += calcCrow(points[i - 1][0], points[i - 1][1], points[i][0], points[i][1]);
            }
        }
        let route = { duration: length, distance: dist, route: points }
        Model.firebaseSet("routes/" + Model.uname + "/" + startTime, route);
        Model.route = []
    }

    static firebaseGet(path){
        return firebase.database().ref(path).get();
    }

    static firebaseSet(path, val){
        return firebase.database().ref(path).set(val);
    }
}