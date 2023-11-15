let smartcast = require('vizio-smart-cast');
const tv1IP = process.env['tv1IP']
const tv1AUTH = process.env['tv1IP']
let tv = new smartcast('tv1IP', 'tv1AUTH');

tv.settings.picture.mode.get().then(data => console.log(data));
tv.settings.audio.get().then(data => console.log(data));
tv.settings.network.get().then(data => console.log(data));
tv.settings.channels.get().then(data => console.log(data));