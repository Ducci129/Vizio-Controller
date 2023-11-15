const smartcast = require('vizio-smart-cast');
const keypress = require('keypress');
const tv1IP = process.env['tv1IP'];
const tv1AUTH = process.env['tv1AUTH'];
const tv2IP = process.env['tv2IP'];
const tv2AUTH = process.env['tv2AUTH'];
const tv1 = new smartcast(tv1IP, tv1AUTH);
const tv2 = new smartcast(tv2IP, tv2AUTH);
let tv = 1;
let isVPressed = false;

// Initialize the keypress library
keypress(process.stdin);

// Ensure the terminal is in raw mode
process.stdin.setRawMode(true);

// Set up event listener for keypress on stdin
process.stdin.on('keypress', function (ch, key) {
  if (key.name === 't' && tv === 1) {
    tv = 2;
    console.log('TV 2 is now selected');
  } else if (key.name === 't' && tv === 2) {
    tv = 1;
    console.log('TV 1 is now selected');
  } else if (key.name === 'p') {
    if (tv === 1) {
      tv1.control.power.toggle();
      console.log('Power Toggled for TV 1');
    } else if (tv === 2) {
      tv2.control.power.toggle();
      console.log('Power Toggled for TV 2');
    }
  } else if (key.name === 'm') {
    if (tv === 1) {
      tv1.control.volume.toggleMute();
      console.log('Mute Toggled for TV 1');
    } else if (tv === 2) {
      tv2.control.volume.toggleMute();
      console.log('Mute Toggled for TV 2');
    }
  } else if (key.name === 'up' && !isVPressed) {
    if (tv === 1) {
      tv1.control.navigate.up();
      console.log('Navigated Up for TV 1');
    } else if (tv === 2) {
      tv2.control.navigate.up();
      console.log('Navigated Up for TV 2');
    }
  } else if (key.name === 'down' && !isVPressed) {
    if (tv === 1) {
      tv1.control.navigate.down();
      console.log('Navigated Down for TV 1');
    } else if (tv === 2) {
      tv2.control.navigate.down();
      console.log('Navigated Down for TV 2');
    }
  } else if (key.name === 'left') {
    if (tv === 1) {
      tv1.control.navigate.left();
      console.log('Navigated Left for TV 1');
    } else if (tv === 2) {
      tv2.control.navigate.left();
      console.log('Navigated Left for TV 2');
    }
  } else if (key.name === 'right') {
    if (tv === 1) {
      tv1.control.navigate.right();
      console.log('Navigated Right for TV 1');
    } else if (tv === 2) {
      tv2.control.navigate.right();
      console.log('Navigated Right for TV 2');
    }
  } else if (key.name === 'return') {
    if (tv === 1) {
      tv1.control.navigate.ok();
      console.log('Selected Ok for TV 1');
    } else if (tv === 2) {
      tv2.control.navigate.ok();
      console.log('Selected Ok for TV 2');
    }
  } else if (key.name === 'backspace') {
    if (tv === 1) {
      tv1.control.navigate.back();
      console.log('Navigated Back for TV 1');
    } else if (tv === 2) {
      tv2.control.navigate.back();
      console.log('Navigated Back for TV 2');
    }
  } else if (key.name === 'v') {
    isVPressed = true;
  } else if (isVPressed) {
    if (tv === 1) {
      if (key.name === 'up') {
        tv1.control.volume.up();
        console.log('Increased Volume for TV 1')
        isVPressed = false;
      } else if (key.name === 'down') {
        tv1.control.volume.down();
        console.log('Decreased Volume for TV 1')
        isVPressed = false;
      };
    } else if (tv === 2) {
      if (key.name === 'up') {
        tv2.control.volume.up();
        console.log('Increased Volume for TV 2')
        isVPressed = false;
      } else if (key.name === 'down') {
        tv2.control.volume.down();
        console.log('Decreased Volume for TV 2')
        isVPressed = false;
      };
    };
  };
});

process.stdin.resume();
