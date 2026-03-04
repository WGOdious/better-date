const BetterDate = require("better-date");

// Instantiation
const now = new BetterDate().now();
const derived = new BetterDate().from(now.subtract({days: 1}))

console.log("Now:", now.format()) // {string} "2026-01-31 12:45:05"
console.log("Derived", derived.format()) // {string} "2026-01-30 12:45:05"

// Formatting
console.log("Formatted:", now.format("YYYY/MM/DD HH.mm.ss")); // {string} "2026/01/31 12.45.05"
console.log("Timestamp:", now.toString());  // {string} "2026-01-31T12:45:05"
console.log("ISO timestamp:", now.toISOString());  // {string} "2026-01-31T12:45:05.828Z"
console.log("UTC timestamp:", now.toUTCString());  // {string} "Thu, 31 Jan 2026 12:45:05 GMT"
console.log("Milliseconds since epoch:", now.epoch()); // {number} 1769863505000
console.log("Date object:", now.value()); // {object} 2026-03-04T02:44:25.187Z

// Arithmetic
const tomorrow = now.add({ days: 1 });
const yesterday = now.subtract({ days: 1 });

console.log("Tomorrow:", tomorrow.format()) // {string} "2026-02-01 12:45:05"
console.log("Yesterday", yesterday.format()) // {string} "2026-01-30 12:45:05"

// Comparison
console.log("Is tomorrow after now?", tomorrow.isAfter(now)); // {boolean} true
console.log("Is now after tomorrow?", now.isAfter(tomorrow)); // {boolean} false
console.log("Is yesterday before now?", yesterday.isBefore(now)); // {boolean} true
console.log("Is now before yesterday?", now.isBefore(yesterday)); // {boolean} false
console.log("Is now equal to now?", new BetterDate().now().isEqual(new Date())); // {boolean} true
console.log("Is now tomorrow to yesterday?", tomorrow.isEqual(yesterday)); // {boolean} false

// Difference
const diff = tomorrow.diff(now); // {object} years, months, days, hours, minutes, seconds, milliseconds
console.log("Difference in days:", diff.days); // {float} 1.0x
console.log("Difference in hours:", diff.hours); // {float} 24.0x

// Difference in specific unit
console.log("Difference in minutes:", tomorrow.diff(now, "days").value); // {float} 1.0x
console.log("Difference in hours:", tomorrow.diff(now, "hours").value); // {float} 24.0x

// Cloning
const clone = now.clone();
console.log("Clone:", clone.format()); // {string} "2026-01-31 12:45:05"