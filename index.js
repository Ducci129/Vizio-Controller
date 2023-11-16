const express = require('express');
const bodyParser = require('body-parser');
const smartcast = require('vizio-smart-cast');

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
let isVPressed = false;

app.post('/keypress', (req, res) => {
    const pressedKey = req.body.key;
    const clientIsVPressed = req.body.isVPressed;

    if (pressedKey === 'v_pressed' && !isVPressed) {
        // Send a log entry only if 'v_pressed' event is received and isVPressed is false
        isVPressed = true;
        const logEntry = `Key: ${pressedKey}, Interaction: V key is being held down`;
        res.json({ success: true, logEntry });
    } else if (pressedKey === 'v_released') {
        // Handle 'v_released' event
        isVPressed = false;
        const logEntry = `Key: ${pressedKey}, Interaction: V key is released`;
        res.json({ success: true, logEntry });
    } else {
        // Handle other key events using the keymap or custom logic
        const logEntry = handleKeyPress(pressedKey, clientIsVPressed);
        res.json({ success: true, logEntry });
    }

    // ... (rest of the server-side code)
});

function handleKeyPress(pressedKey, isVPressed) {
    const selectedTV = (tv === 1) ? tv1 : tv2;
    let logEntry = `Key: ${pressedKey}, Interaction: `;

    if (isVPressed) {
      // Handle volume adjustment based on 'V' key being held
      switch(pressedKey) {
        case 'up':
          selectedTV.control.volume.up();
          logEntry += `Volume Increased for TV ${tv};`
          break;
        case 'down':
          selectedTV.control.volume.down();
          logEntry += `Volume Decreased for TV ${tv};`
          break;
        case 'arrowup':
          selectedTV.control.volume.up();
          logEntry += `Volume Increased for TV ${tv};`
          break;
        case 'arrowdown':
          selectedTV.control.volume.down();
          logEntry += `Volume Decreased for TV ${tv};`
          break;
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
            case 'up', 'arrowup':
                // Handle other navigation commands, e.g., ArrowUp
                selectedTV.control.navigate.up();
                logEntry += `Navigated Up for TV ${tv}`;
                break;
            case 'down', 'arrowdown':
                // Handle other navigation commands, e.g., ArrowDown
                selectedTV.control.navigate.down();
                logEntry += `Navigated Down for TV ${tv}`;
                break;
            case 'left', 'arrowleft':
                // Handle other navigation commands, e.g., ArrowLeft
                selectedTV.control.navigate.left();
                logEntry += `Navigated Left for TV ${tv}`;
                break;
            case 'right', 'arrowright':
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
