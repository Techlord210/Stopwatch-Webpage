const timeSpan = document.getElementById("time")
const StartStopButton = document.getElementById("start")
const ResetButton = document.getElementById("reset")
const LapButton = document.getElementById("lap")
const table = document.getElementById("table")

let running = false
let stopped = false
let startTime = 0
let lap = 0
let lastrow = null
window.previous = 0

function timer() {
    if (running) {
        let date = new Date()
        let currentTime = date.getTime()
        totalProgress = currentTime - startTime
        window.H = Math.trunc(totalProgress / 1000 / 3600).toLocaleString('en-US', {minimumIntegerDigits: 2})
        window.M = Math.trunc(totalProgress / 1000 / 60).toLocaleString('en-US', {minimumIntegerDigits: 2})
        window.S = Math.trunc(totalProgress / 1000 % 60).toLocaleString('en-US', {minimumIntegerDigits: 2})
        window.MS = Math.trunc(totalProgress % 1000).toLocaleString('en-US', {minimumIntegerDigits: 3})

        // Updates time
        timeSpan.innerHTML = `${H}:${M}:${S}.<span id="milliseconds">${MS}</span>`
    }
}

StartStopButton.onclick = function() {
    // Handle start and stop
    if (running) {
        StartStopButton.textContent = 'Start'
        running = false
        stopped = true
        LapButton.disabled = true
        return
    }
    else {
        StartStopButton.textContent = 'Stop'
        running = true
        ResetButton.disabled = false
        LapButton.disabled = false
    }
    running = true

    // Checks whether watch has been stopped or reseted
    let date = new Date()
    if (!stopped) {
        startTime=date.getTime()
        previousLapTime = startTime
    }
    timer()
}

ResetButton.onclick = function() {
    // set status
    running = false
    stopped = false

    // reset HTML elements
    timeSpan.innerHTML = '00:00:00.<span id="milliseconds">000</span>'
    
    // reset vars
    ResetButton.disabled = true
    LapButton.disabled = true
    StartStopButton.textContent = 'Start'
    table.innerHTML = ''
    lap = 0
    window.previous = 0
}

LapButton.onclick = function() {
    // Create Table heading
    if (!lap) {
        const row = table.appendChild(document.createElement('tr'))
        row.innerHTML = '<th>Laps<div class="bottombar lap"></div></th><th>Time<div class="bottombar time"></div></th><th>Total<div class="bottombar total"></div></th>'
    }
    lap += 1
    // create childs
    const row = table.insertBefore(document.createElement('tr'), table.children[1])
    interval_n = totalProgress - window.previous
    interval = [Math.trunc(interval_n / 1000 / 3600).toLocaleString('en-US', {minimumIntegerDigits: 2}), Math.trunc(interval_n / 1000 / 60).toLocaleString('en-US', {minimumIntegerDigits: 2}), Math.trunc(interval_n / 1000 % 60).toLocaleString('en-US', {minimumIntegerDigits: 2}), Math.trunc(interval_n % 1000).toLocaleString('en-US', {minimumIntegerDigits: 3})]
    row.innerHTML = `<td>${lap}</td><td>${interval[0]}:${interval[1]}:${interval[2]}.${interval[3]}</td><td>${window.H}:${window.M}:${window.S}.${window.MS}</td>`
    window.previous = totalProgress
    if (lastrow) {
        for (var i = 0; i < 3; i++) {
            lastrow.children[i].removeAttribute('class')
        }
    }
    for (var i = 0; i < 3; i++) {
        row.children[i].className = 'top'
    }
    lastrow = row
}

setInterval(timer, 1)