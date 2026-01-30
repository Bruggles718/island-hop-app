function closedFormIterations(s0, target, stick) {
    let num = (target - 30*stick);
    let den = (s0 - 30*stick);

    if (den == 0) {
        return 0;
    }

    let ratio = num / den;
    if (ratio <= 0) {
        return 0;
    }

    return Math.log10(ratio) / Math.log10(1.2);
}

function calcSeconds(s0, target, stick, frameRate) {
    return ((closedFormIterations(s0, target, stick) + 6) / frameRate);
}

function calcBPM(seconds, beats) {
    return 60.0 / (seconds / beats);
}

function calcBPMsInRange(seconds, low, high) {
    let beats = 1;
    let result = [];

    while (true) {
        let bpm = calcBPM(seconds, beats);
        if (bpm > high) {
            break;
        }
        if (bpm >= low) {
            result.push({bpm: Math.round(bpm), beats: beats});
        }
        beats += 1;
    }

    return result;
}

function calculateButtonCallback() {
    let s0 = document.getElementById("start-speed").value;
    let target = document.getElementById("target-speed").value;
    let stick = document.getElementById("ess").value;
    let outputElement = document.getElementById("output");

    let frameRate = 30;

    let sec = calcSeconds(s0, target, stick, frameRate);
    let bpms = calcBPMsInRange(sec, 60, 180);
    let output = JSON.stringify(bpms, null, 2);
    outputElement.textContent = output;
}

window.onload = (event) => {
    let calculateButton = document.getElementById("calculate-button");
    calculateButton.onclick = calculateButtonCallback;
}