let startTime,
  updatedTime,
  elapsedTime = 0;
let running = false,
  interval;
const startPauseBtn = document.getElementById("startPause");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const timeDisplay = document.querySelector(".digital-time");
const lapsList = document.getElementById("laps");

// Update time function
function updateTime() {
  updatedTime = Date.now() - startTime + elapsedTime;
  let millis = ("00" + (updatedTime % 1000)).slice(-3);
  let seconds = Math.floor((updatedTime / 1000) % 60);
  let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
  let hours = Math.floor(updatedTime / (1000 * 60 * 60));

  timeDisplay.textContent = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${millis.slice(
    0,
    2
  )}`;
}

// Start/Pause Stopwatch
startPauseBtn.addEventListener("click", () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTime, 10);
    startPauseBtn.textContent = "Pause";
  } else {
    clearInterval(interval);
    elapsedTime = updatedTime;
    startPauseBtn.textContent = "Start";
  }
  running = !running;
});

// Lap Function with Bounce Effect
lapBtn.addEventListener("click", () => {
  if (running) {
    const lapTime = document.createElement("li");
    lapTime.textContent = timeDisplay.textContent;
    lapTime.classList.add("bouncing"); // Bounce effect
    lapsList.appendChild(lapTime);

    setTimeout(() => {
      lapTime.style.opacity = "1";
      lapTime.style.transform = "translateY(0)";
    }, 50);
  }
});

// Reset Function
resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00.00";
  startPauseBtn.textContent = "Start";
  running = false;
  lapsList.innerHTML = "";
});
