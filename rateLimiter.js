// Using Bucket.js dictionary
const buckets = require('buckets-js')
var requestCounts = new buckets.Dictionary()

// For default options
const defaults = require('defaults')

var setTimeWindow = require('./timeWindow.js')

/* Rate limiter */
function rateLimiter(options) {
  var handle = function(options, next) {
    options = defaults(options, {
      // Default options
      maxRequests: 3,
      timeWindow: 5 // seconds
    })
  }

  setTimeWindow(options.timeWindow, requestCounts);

  /* Function that actually does the limiting */
  function Limit(req, res, next) {
    // Defaults to unknown ip if IP not in request
    var ipAddress = 'unknown_ip';
    if (req.ip) {
      ipAddress = req.ip;
    }

    increment(ipAddress);

    var requests = requestCounts.get(ipAddress);

    if (requests <= options.maxRequests) {
      next();
    }
    else {
      var message = 'Too many requests, please try again later.';
      res.status(429).send(message);
    }
  };

  return Limit;
}

function increment(ip) {
  // Increments by one if key exists
  if (requestCounts.containsKey(ip)) {
    var oldValue = requestCounts.get(ip);
    var newValue = oldValue + 1;
    requestCounts.set(ip, newValue);
  }
  else {
    // Initial value 1
    requestCounts.set(ip, 1);
  }
};

module.exports = rateLimiter;
