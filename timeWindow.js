
function setTimeWindow(time, requestCounts) {
  // Empties requestCounts at the end of time window
  setInterval(
    function() {
      requestCounts.clear();
    },
    // Time interval, from seconds to milliseconds
    time * 1000
  )
}

module.exports = setTimeWindow;
