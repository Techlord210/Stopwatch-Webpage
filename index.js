let hoursSpan = document.getElementById("hours")
let minutesSpan = document.getElementById("minutes")
let secondsSpan = document.getElementById("seconds")
let millisecondsSpawn = document.getElementById("milliseconds")
let StartStopButton = document.getElementById("start")
let resetButton = document.getElementById("reset")

let running = false
let stopped = false
let startTime = 0

function timer()
{
    if (running) {
        let date = new Date()
        let currentTime = date.getTime()
        progress = currentTime - startTime
        
        // Updates elements
        millisecondsSpawn.textContent = Math.trunc(progress % 1000).toLocaleString('en-US', {minimumIntegerDigits: 3})
        secondsSpan.textContent = Math.trunc(progress / 1000 % 60).toLocaleString('en-US', {minimumIntegerDigits: 2})
        minutesSpan.textContent = Math.trunc(progress / 1000 / 60).toLocaleString('en-US', {minimumIntegerDigits: 2})
        hoursSpan.textContent = Math.trunc(progress / 1000 /3600).toLocaleString('en-US', {minimumIntegerDigits: 2})
    }
}

StartStopButton.onclick = function()
{
    if (running) {
        StartStopButton.textContent = 'Start'
        running = false
        stopped = true
        return
    }
    else {
        StartStopButton.textContent = 'Stop'
        running = true
        resetButton.disabled = false
    }
    running = true
    // Checks whether watch has been stopped or reseted
    let date = new Date()
    if (!stopped) {
        startTime=date.getTime()
    }

    timer()
}

resetButton.onclick = function()
{
    running = false
    stopped = false

    // Resets elements
    hoursSpan.textContent = "00"
    minutesSpan.textContent = "00"
    secondsSpan.textContent = "00"
    millisecondsSpawn.textContent = "000"

    resetButton.disabled = true
    StartStopButton.textContent = 'Start'
}

setInterval(timer, 1)