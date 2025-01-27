// Elements for displaying minutes, seconds, and milliseconds
const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

// Control buttons for the stopwatch
const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');

// Element to store lap times
const lapList = document.getElementById('laplist');

// Variables to track time
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval; // Holds the interval ID for the timer

// Event listeners for buttons
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);  
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

/* Starts the timer by incrementing time every 10ms.*/
function startTimer() {
    interval = setInterval(updateTimer, 10);
    startButton.disabled = true; // Disable the start button while the timer is running
}

/* Stops the timer, saves the current lap time, and resets the timer data.*/
function stopTimer() {
    clearInterval(interval); // Stop the timer
    addToLapList();          // Save the lap time to the list
    resetTimerData();        // Reset time to 0
    startButton.disabled = false; // Re-enable the start button
}

/* Pauses the timer without resetting it.*/
function pauseTimer() {
    clearInterval(interval); // Stop the timer
    pauseButton.disabled = true; // Disable the pause button while paused
}

/*Resets the timer to its initial state (00:00:00) */
function resetTimer() {
    clearInterval(interval); // Stop the timer
    resetTimerData();        // Reset time to 0
    startButton.disabled = false; // Re-enable the start button
}

/*Updates the timer values for milliseconds, seconds, and minutes.
 * Called every 10ms by the setInterval function.*/
function updateTimer() {
    milliseconds++; // Increment milliseconds
    if (milliseconds === 10) { // Convert to seconds after 1000ms
        milliseconds = 0;
        seconds++;
        if (seconds === 60) { // Convert to minutes after 60 seconds
            seconds = 0;
            minutes++;
        }
    }
    displayTimer(); // Update the displayed timer values
}

/* Updates the HTML content of the timer elements to reflect the current time.*/
function displayTimer() {
    millisecondsLabel.textContent = padTime(milliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);
}

/**
 * Pads a single-digit number with a leading zero for consistent formatting.
 * @param {number} time - The number to pad.
 * @returns {string} The padded string representation of the number.
 */
function padTime(time) {
    return time.toString().padStart(2, '0');
}

/*Resets the timer data (minutes, seconds, and milliseconds) to 0.*/
function resetTimerData() {
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayTimer(); // Update the display to show 00:00:00
}

/**
 * Adds the current lap time to the list of laps.
 */
function addToLapList() {
    console.log(`Lap Time: ${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`);
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`; // Format the lap time
    const listItem = document.createElement('li'); // Create a new list item
    listItem.innerHTML = `<span>Lap ${lapList.childElementCount + 1}: </span> ${lapTime}`; // Add lap number and time
    lapList.appendChild(listItem); // Append the list item to the lap list
}
