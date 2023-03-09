let hoursSpan = document.getElementById("hours")
let minutesSpan = document.getElementById("minutes")
let secondsSpan = document.getElementById("seconds")
let millisecondsSpawn = document.getElementById("milliseconds")
let startButton = document.getElementById("start")
let stopButton = document.getElementById("stop")
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

startButton.onclick = function ()
{   
    if (running){return}
    
    // Checks whether watch has been stopped or reseted
    let date = new Date()
    if (!stopped){startTime=date.getTime()}

    running = true
    timer()
}

stopButton.onclick = function ()
{
    running = false
    stopped = true
}

resetButton.onclick = function ()
{
    running = false
    stopped = false

    // Resets elements
    hoursSpan.textContent = "00"
    minutesSpan.textContent = "00"
    secondsSpan.textContent = "00"
    millisecondsSpawn.textContent = "000"
}

setInterval(timer, 1)