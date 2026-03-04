# BetterDate

Tiny, immutable, fluent Date wrapper for Node.js & browsers (zero dependencies).  
Provides flexible formatting, comparison, arithmetic, and diffing.

## Installation

```bash
npm install @wgodious/better-date
```
```bash
yarn add @wgodious/better-date
```

## Usage
```javascript
// CommonJS
const BetterDate = require("@wgodious/better-date");

// ES Module
// import BetterDate from "better-date";

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
const diff = tomorrow.diff(now);  // {object} years, months, days, hours, minutes, seconds, milliseconds
console.log("Difference in days:", diff.days); // {float} 1.0x
console.log("Difference in hours:", diff.hours); // {float} 24.0x

// Difference in specific unit
console.log("Difference in minutes:", tomorrow.diff(now, "days").value); // {float} 1.0x
console.log("Difference in hours:", tomorrow.diff(now, "hours").value); // {float} 24.0x

// Cloning
const clone = now.clone();
console.log("Clone:", clone.format()); // {string} "2026-01-31 12:45:05"
```

## Method Reference

### constructor(input: *Date*): *BetterDate*
Initialize a new `BetterDate()` object

### .now(): *BetterDate*
Returns a new `BetterDate()` object

### .from(input: *Date*): *BetterDate*
Returns a new `BetterDate()` object from a `Date()` object

### .value(): *Date*
Returns a new `Date()` object from a `BetterDate()` object's date


### .epoch(): *number*
Returns the time since EPOCH in millis from a `BetterDate()` object's date

### .toISOString(): *string*
Returns the timestamp from a `BetterDate()` object's date

### .toUTCString(): *string*
Returns the UTC timestamp from a `BetterDate()` object's date

### .toString(): *string*
Returns the formatted timestamp from a `BetterDate()` object's date

### .clone(): *BetterDate*
Returns a new `BetterDate()` object from an intanciated `BetterDate()` object's date

### .format(pattern: *string*): *string*
Returns the given formatted timestamp from a `BetterDate()` object's date

Example: pattern = "YYYY-MM-DD HH:mm:ss"

### .add(options: *object*): *BetterDate*
Returns a new `BetterDate()` object after addition

`options` = `{years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0}`

### .subtract(options: *object*): *BetterDate*
Returns a new `BetterDate()` object after subtraction

`options` = `{years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0}`

### .isBefore(value: *Date*): *boolean*
Returns `true|false` based on *this* < *value*

### .isAfter(value: *Date*): *boolean*
Returns `true|false` based on *this* > *value*

### .isEqual(value: *Date*): *boolean*
Returns `true|false` based on *this* === *value*

### .diff(value: *Date*, unit?: *string*): *object*
Returns an *object* with the difference between `*this*.epoch() - *this*.from(*value*).epoch()`

The return changes conditionally on *unit* being *NOT NULL*

Example 1\* (unit: NULL): `{years: 0, months: 0, days: 1.0x, hours: 12.0x, minutes: 30.0x, seconds: 10.0x, milliseconds: 10.0x}`

Example 2\* (unit: "days"): `{value: 1.0x}`

**Note: The difference between 1\* and 2\* is the computational strain to provide all of the diffs vs the specified unit. There may be slight delays in response for 1\*.**