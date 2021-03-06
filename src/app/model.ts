import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// Converts numeric degrees to radians
function toRad(value: number) {
    return value * Math.PI / 180;
}

/**
 * calculate distance between 2 points
 * @param lat1 lat1
 * @param lon1 lon1
 * @param lat2 lat2
 * @param lon2 lon2
 * @returns 
 */
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

/**
 * callback for gps success
 * @param position geolocationposition object
 */
function gpsSuccess(position: GeolocationPosition) {
    if (position.timestamp >= Model.lastGps + Model.gpsDelay) {
        Model.lastGps = position.timestamp;
        Model.route.push({ timestamp: Date.now(), coords: { latitude: position.coords.latitude, longitude: position.coords.longitude } });
    }
}

/**
 * callback for gps errors
 * @param error geolocationpositionerror object
 */
function gpsError(error: GeolocationPositionError) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

export class Model {

    // all persistant data required for the app
    static tapTimings = []
    static tapTimeLen = 5;
    static uname = "";
    static passhash = "";
    static walkspeed = 5;
    static valid = false;
    static gpsID: number;
    static route: any[] = [];
    static routes: firebase.database.DataSnapshot;

    // last gps time
    static gpsDelay = 2;
    static lastGps = 0;

    // gps options
    static options: any = {
        maximumAge: 3600000,
        timeout: 3000,
        enableHighAccuracy: true,
    }

    /**
     * called to start the gps tracking
     */
    static startGPS() {
        Model.gpsID = navigator.geolocation.watchPosition(gpsSuccess, gpsError, Model.options)
    }

    /**
     * called to stop the gps tracking
     */
    static stopGPS() {
        navigator.geolocation.clearWatch(Model.gpsID);
    }

    /**
     * called to save the current route to firebase under the user
     */
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
        Model.firebaseGetRoutes();
        Model.route = []
    }

    /**
     * firebase get helper method
     * @param path path to get
     * @returns promise
     */
    static firebaseGet(path) {
        return firebase.database().ref(path).get();
    }

    /**
     * get all the routes of a user in firebase
     */
    static async firebaseGetRoutes() {
        await firebase.database().ref("routes/" + Model.uname).get().then((val) => { Model.routes = val });
    }

    /**
     * firebase set helper method
     * @param path path to set
     * @param val value to set
     * @returns promise
     */
    static firebaseSet(path, val) {
        return firebase.database().ref(path).set(val);
    }

    /**
     * get all the points of an id in a string
     * @param id id of the route to get
     * @returns string of points
     */
    static getPointsFromRoute(id) {
        let str = "";
        let route = Model.routes.child(id).child('route');
        for (let i = 0; i < route.numChildren(); i++) {
            let lat = route.child(i.toString()).child("0");
            let long = route.child(i.toString()).child("1");
            str += "|" + lat.val() + "," + long.val();
        }
        return str
    }

    /**
     * congregate all of the data from the past week into usable information for the chart
     * @returns arr(arr(7),arr(7))
     */
    static getChartData() {
        let now = Date.now();
        let time = now - 604800000 + 86400000;
        let labelData = [] // array strings, of day starting from 6 days ago until today
        for (let i = 0; i < 7; i++) {
            let d = new Date(time);
            let str = d.toLocaleDateString();
            labelData.push(str.substr(0, str.length - 5))
            time += 86400000;
        }
        let pastData = [0, 0, 0, 0, 0, 0, 0]; // array numbers, total on each day of past week.

        let val = Model.routes;
        if (val.toJSON() != null) {
            val.forEach((route) => {
                if (parseInt(route.key) > now - 604800000) {
                    let d = new Date(parseInt(route.key));
                    let str = d.toLocaleDateString();
                    str = str.substr(0, str.length - 5)
                    for (let i = 0; i < 7; i++) {
                        if (str == labelData[i]) {
                            pastData[i] += route.child("distance").val();
                        }
                    }
                }
            });
        }
        return [labelData, pastData]
    }
}