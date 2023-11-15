const express = require('express');
const bodyParser = require('body-parser');
const smartcast = require('vizio-smart-cast');
const keypress = require('keypress');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize Vizio SmartCast TVs
const tv1IP = process.env['tv1IP'];
const tv1AUTH = process.env['tv1AUTH'];
const tv2IP = process.env['tv2IP'];
const tv2AUTH = process.env['tv2AUTH'];
const tv1 = new smartcast(tv1IP, tv1AUTH);
const tv2 = new smartcast(tv2IP, tv2AUTH);
let tv = 1;

// Initialize the keypress library
keypress(process.stdin);

// Ensure the terminal is in raw mode
process.stdin.setRawMode(true);

// Set up event listener for keypress on stdin
process.stdin.on('keypress', function (ch, key) {
  // Handle keypress events on the server
  if (key) {
    const logEntry = handleKeyPress(key.name, false);
    console.log(logEntry);
  }
});

// Handle keypress events on the server
app.post('/keypress', (req, res) => {
    const pressedKey = req.body.key;
    const isVPressed = req.body.isVPressed;
    const logEntry = handleKeyPress(pressedKey, isVPressed);
    res.json({ success: true, logEntry });
});

function handleKeyPress(pressedKey, isVPressed) {
    const selectedTV = (tv === 1) ? tv1 : tv2;
    let logEntry = `Key: ${pressedKey}, Interaction: `;

    if (isVPressed) {
        // Handle volume adjustment based on 'V' key being held
        if (pressedKey === 'up') {
            selectedTV.control.volume.up();
            logEntry += `Increased volume for TV ${tv}`;
        } else if (pressedKey === 'down') {
            selectedTV.control.volume.down();
            logEntry += `Decreased volume for TV ${tv}`;
        }
    } else {
        // Handle navigation commands when 'V' key is not held
        switch (pressedKey) {
            case 't':
                // Toggle between TVs
                tv = (tv === 1) ? 2 : 1;
                logEntry += `Switched to TV ${tv}`;
                break;
            case 'p':
                // Toggle power
                selectedTV.control.power.toggle();
                logEntry += `Toggled power for TV ${tv}`;
                break;
            case 'm':
                // Toggle mute
                selectedTV.control.volume.toggleMute();
                logEntry += `Toggled mute for TV ${tv}`;
                break;
            case 'up':
                // Handle other navigation commands, e.g., ArrowUp
                selectedTV.control.navigate.up();
                logEntry += `Navigated Up for TV ${tv}`;
                break;
            case 'down':
                // Handle other navigation commands, e.g., ArrowDown
                selectedTV.control.navigate.down();
                logEntry += `Navigated Down for TV ${tv}`;
                break;
            case 'left':
                // Handle other navigation commands, e.g., ArrowLeft
                selectedTV.control.navigate.left();
                logEntry += `Navigated Left for TV ${tv}`;
                break;
            case 'right':
                // Handle other navigation commands, e.g., ArrowRight
                selectedTV.control.navigate.right();
                logEntry += `Navigated Right for TV ${tv}`;
                break;
            // Add additional cases for other keys as needed
        }
    }

    return logEntry;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
