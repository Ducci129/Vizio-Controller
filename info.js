let smartcast = require('vizio-smart-cast');
const tv1IP = process.env['tv2IP']
const tv1AUTH = process.env['tv2AUTH']
let tv = new smartcast(tv1IP, tv1AUTH);

tv.settings.audio.get().then(data => console.log(data));
