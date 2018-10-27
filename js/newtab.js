var userLocation;
var userName = "John 2 Doe";
var userFont = "";
var sunRiseTime;
var sunSetTime;

var lastUse;

var quoteBoolean = 0;
var sunUpdatePause = 2000;

// Variables representing elements on webpage

// Functions to grab and save user data
// via cookies
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}

function readSave(onComplete) {
    userName = getCookie("username");
    userFont = getCookie("userFont");

    if (getCookie("quoteBoolean") == 0) {
        quoteBoolean = true;
    } else {
        quoteBoolean = false;
    }

    onComplete();
}

function newSave() {
    setCookie("username", userName, 100000);
    setCookie("quoteBoolean", quoteBoolean, 100000);
    setCookie("userFont", userFont, 100000);
}

function parseUserName(location) {
    var nameSplit = userName.split(" ");

    if (location == "first") {
        return nameSplit[0];
    } else if (location == "middle") {
        if (nameSplit[1] == "2") {
            return null;
        } else {
            return nameSplit[1];
        }
    } else if (location == "last") {
        if (nameSplit[1] == "2") {
            return nameSplit[2];
        } else {
            return nameSplit[1];
        }
    }
}

// Function to find the user location from browser GPS capabilities
function getUserLoc() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getSunRise);
    }
}

function getSunRise(position) {
    userLocation = position.coords.latitude + "," + position.coords.longitude;
    console.log(userLocation);
}

// Function to generate varied greeting message
function createGreeting(type) {
    if (type == "morning") {
        return "Good morning, " + parseUserName("first") + ", have a great day!";
    } else if (type == "casual") {
        return "Hey, " + parseUserName("first") + ", have a great day!";
    } else if (type == "evening") {
        return "Good evening, " + parseUserName("first") + ".";
    } else if (type == "late") {
        return "It's getting pretty dark out here...wouldn't you say so " + parseUserName("first") + "?";
    }
}

// Functions to adhere webpage to data given

function resumeUser() {
    document.getElementById("userGreeting").innerHTML = createGreeting("evening");

}

function finalizeData() {
    getUserLoc();
}

newSave();
readSave(finalizeData);
