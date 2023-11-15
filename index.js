const smartcast = require('vizio-smart-cast');
const keypress = require('keypress');
const readline = require('readline'); // user input via cmd line
const tv1IP = process.env['tv1IP']
const tv1AUTH = process.env['tv1AUTH']
const tv2IP = process.env['tv2IP']
const tv2AUTH = process.env['tv2AUTH']
const tv1 = new smartcast(tv1IP, tv1AUTH);
const tv2 = new smartcast(tv2IP, tv2AUTH);

