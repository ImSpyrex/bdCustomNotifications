//META{"name":"CustomNotifications"}*//

var customSound = {
    message: {sound: ""},
    deafen: {sound: ""},
    undeafen: {sound: ""},
    mute: {sound: ""},
    unmute: {sound: ""},
    voiceDisconnected: {sound: ""},
    pttActivate: {sound: ""},
    pttDeactivate: {sound: ""},
    userJoin: {sound: ""},
    userLeave: {sound: ""},
    outgoingRing: {sound: ""},
    incomingRing: {sound: ""}
};
customSound["dd920c06a01e5bb8b09678581e29d56f.mp3"] = customSound.message;
customSound["e4d539271704b87764dc465b1a061abd.mp3"] = customSound.deafen;
customSound["5a000a0d4dff083d12a1d4fc2c7cbf66.mp3"] = customSound.undeafen;
customSound["429d09ee3b86e81a75b5e06d3fb482be.mp3"] = customSound.mute;
customSound["43805b9dd757ac4f6b9b58c1a8ee5f0d.mp3"] = customSound.unmute;
customSound["7e125dc075ec6e5ae796e4c3ab83abb3.mp3"] = customSound.voiceDisconnected;
customSound["8b63833c8d252fedba6b9c4f2517c705.mp3"] = customSound.pttActivate;
customSound["74ab980d6890a0fa6aa0336182f9f620.mp3"] = customSound.pttDeactivate;
customSound["5dd43c946894005258d85770f0d10cff.mp3"] = customSound.userJoin;
customSound["4fcfeb2cba26459c4750e60f626cebdc.mp3"] = customSound.userLeave;
customSound["c6e92752668dde4eee5923d70441579f.mp3"] = customSound.outgoingRing;
customSound["84a1b4e11d634dbfa1e5dd97a96de3ad.mp3"] = customSound.incomingRing;

Audio.prototype._load = Audio.prototype.load;

var CustomNotifications = function () {};

CustomNotifications.prototype.start = function () {
    Audio.prototype.load = function () 
    {
        var fileName = this.src.substr(this.src.lastIndexOf("/")+1);
        if(customSound[fileName] && customSound[fileName].sound)
        {
            this.src = customSound[fileName].sound;
        }
        this._load();
    }
};

CustomNotifications.prototype.load = function () {
    var customSounds = bdPluginStorage.get("CustomNotifications", "customSounds");
    if(customSounds)
    {
        customSound.message.sound = customSounds.message;
        customSound.deafen.sound = customSounds.deafen;
        customSound.undeafen.sound = customSounds.undeafen;
        customSound.mute.sound = customSounds.mute;
        customSound.unmute.sound = customSounds.unmute;
        customSound.voiceDisconnected.sound = customSounds.voiceDisconnected;
        customSound.pttActivate.sound = customSounds.pttActivate;
        customSound.pttDeactivate.sound = customSounds.pttDeactivate;
        customSound.userJoin.sound = customSounds.userJoin;
        customSound.userLeave.sound = customSounds.userLeave;
        customSound.outgoingRing.sound = customSounds.outgoingRing;
        customSound.incomingRing.sound = customSounds.incomingRing;
    }
};

CustomNotifications.prototype.unload = function () {
};

CustomNotifications.prototype.stop = function () {
    Audio.prototype.load = Audio.prototype._load;
};

CustomNotifications.prototype.onMessage = function () {
    //called when a message is received
};

CustomNotifications.prototype.onSwitch = function () {
    //called when a server or channel is switched
};

CustomNotifications.prototype.observer = function (e) {
    //raw MutationObserver event for each mutation
};

CustomNotifications.SettingsChanged = function (e) {
    var id = e.id.substring(3);
    customSound[id].sound = e.value;
    var customSounds = {
        message: customSound.message.sound,
        deafen: customSound.deafen.sound,
        undeafen: customSound.undeafen.sound,
        mute: customSound.mute.sound,
        unmute: customSound.unmute.sound,
        voiceDisconnected: customSound.voiceDisconnected.sound,
        pttActivate: customSound.pttActivate.sound,
        pttDeactivate: customSound.pttDeactivate.sound,
        userJoin: customSound.userJoin.sound,
        userLeave: customSound.userLeave.sound,
        outgoingRing: customSound.outgoingRing.sound,
        incomingRing: customSound.incomingRing.sound
    };
    bdPluginStorage.set("CustomNotifications", "customSounds", customSounds);
};

CustomNotifications.prototype.getSettingsPanel = function () {
    var html = "<h1><b>Settings Panel</b></h1><p><i>Url's to the audio files have to use https.</i></p><div style='float: left; width: 49%;'>\
    <p>Message:</p><input type='input' style='width: 100%' id='cN.message' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='%message%'></input>\
    <p>Deafen:</p><input type='input' style='width: 100%' id='cN.deafen' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='%deafen%'></input>\
    <p>Undeafen:</p><input type='input' style='width: 100%' id='cN.undeafen' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='%undeafen%'></input>\
    <p>Mute:</p><input type='input' style='width: 100%' id='cN.mute' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='%mute%'></input>\
    <p>Unmute:</p><input type='input' style='width: 100%' id='cN.unmute' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='%unmute%'></input>\
    <p>Voice Disconnected:</p><input type='input' style='width: 100%' id='cN.voiceDisconnected' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='%voiceDisconnected%'></input></div>\
    <div style='float: right; width: 49%;'>\
    <p>PTT Activate:</p><input type='input' style='width: 100%' id='cN.pttActivate' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='%pttActivate%'></input>\
    <p>PTT Deactivate:</p><input type='input' style='width: 100%' id='cN.pttDeactivate' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='%pttDeactivate%'></input>\
    <p>User Join:</p><input type='input' style='width: 100%' id='cN.userJoin' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='%userJoin%'></input>\
    <p>User Leave:</p><input type='input' style='width: 100%' id='cN.userLeave' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='%userLeave%'></input>\
    <p>Outgoing Ring:</p><input type='input' style='width: 100%' id='cN.outgoingRing' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='%outgoingRing%'></input>\
    <p>Incoming Ring:</p><input type='input' style='width: 100%' id='cN.incomingRing' onchange='CustomNotifications.SettingsChanged(this)' placeholder='(https://....mp3)' value='%incomingRing%'></input></div>";
    html = html.replace("%message%", customSound.message.sound);
    html = html.replace("%deafen%", customSound.deafen.sound);
    html = html.replace("%undeafen%", customSound.undeafen.sound);
    html = html.replace("%mute%", customSound.mute.sound);
    html = html.replace("%unmute%", customSound.unmute.sound);
    html = html.replace("%voiceDisconnected%", customSound.voiceDisconnected.sound);
    html = html.replace("%pttActivate%", customSound.pttActivate.sound);
    html = html.replace("%pttDeactivate%", customSound.pttDeactivate.sound);
    html = html.replace("%userJoin%", customSound.userJoin.sound);
    html = html.replace("%userLeave%", customSound.userLeave.sound);
    html = html.replace("%outgoingRing%", customSound.outgoingRing.sound);
    html = html.replace("%incomingRing%", customSound.incomingRing.sound);
    return html;
};

CustomNotifications.prototype.getName = function () {
    return "Custom Notifications";
};

CustomNotifications.prototype.getDescription = function () {
    return "Allows you to change the sounds for the notifications.";
};

CustomNotifications.prototype.getVersion = function () {
    return "1.0";
};

CustomNotifications.prototype.getAuthor = function () {
    return "Yoshivb";
};