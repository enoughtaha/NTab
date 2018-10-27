var userLocation;
var sunRiseTime;
var sunSetTime;

var sunUpdatePause = 2000;

function getUserLoc() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getSunRise);
    }
}

function getSunRise(position) {
    console.log(position);
}

//getSunRise(getUserLoc());
getUserLoc();
