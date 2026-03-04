const test = require('node:test');
const assert = require('node:assert');
const BetterDate = require("./index");

// Instantiation
test('now() => new BetterDate object', () => {
    const now = new BetterDate().now();
    assert.ok(now instanceof BetterDate, "Should be an instance of BetterDate");
})
test('from() => new BetterDate object', () => {
    const now = new BetterDate().now();
    const derived = new BetterDate().from(now.subtract({days: 1}))
    assert.ok(derived instanceof BetterDate, "Should be an instance of BetterDate");
})

// Formatting
test('format() => formatted string', () => {
    const now = new BetterDate().now();
    assert.equal(now.format("YYYY/MM/DD HH.mm.ss").replace(/\d/g, ""), "2026/01/31 12.45.05".replace(/\d/g, ""), "Should be a formatted string");
})
test('toString() => formatted string', () => {
    const now = new BetterDate().now();
    assert.strictEqual(typeof now.toString(), "string", "Should be a string timestamp");
    assert.ok(!now.toString().includes("Z"), "Should be a string timestamp");
})
test('toISOString() => formatted string', () => {
    const now = new BetterDate().now();
    assert.strictEqual(typeof now.toISOString(), "string", "Should be a string ISO timestamp");
    assert.ok(now.toISOString().includes("T") && now.toISOString().includes("Z"), "Should be a string ISO timestamp");
})
test('toUTCString() => formatted string', () => {
    const now = new BetterDate().now();
    assert.strictEqual(typeof now.toUTCString(), "string", "Should be a string UTC timestamp");
    assert.ok(now.toUTCString().includes("GMT") && !now.toUTCString().includes("Z"), "Should be a string UTC timestamp");
})
test('epoch() => number', () => {
    const now = new BetterDate().now();
    assert.strictEqual(typeof now.epoch(), "number", "Should be a number in milliseconds since epoch");
})
test('value() => new Date object', () => {
    const now = new BetterDate().now();
    assert.ok(now.value() instanceof Date, "Should be a Date object");
})

// Arithmetic
test('add() => new BetterDate object', () => {
    const now = new BetterDate().now();
    const tomorrow = now.add({ days: 1 });
    assert.notStrictEqual(now.epoch(), tomorrow.epoch(), "Should not be the same date");
    assert.strictEqual(now.add({ days: 1 }).epoch(), tomorrow.epoch(), "Should be the same date");
    assert.ok(tomorrow instanceof BetterDate, "Should be a BetterDate object");
})
test('subtract() => new BetterDate object', () => {
    const now = new BetterDate().now();
    const yesterday = now.subtract({ days: 1 });
    assert.notStrictEqual(now.epoch(), yesterday.epoch(), "Should not be the same date");
    assert.strictEqual(now.subtract({ days: 1 }).epoch(), yesterday.epoch(), "Should be the same date");
    assert.ok(yesterday instanceof BetterDate, "Should be a BetterDate object");
})

// Comparison
test('isAfter() => boolean', () => {
    const now = new BetterDate().now();
    const tomorrow = now.add({ days: 1 });
    assert.ok(tomorrow.isAfter(now), "Should be true");
    assert.ok(!now.isAfter(tomorrow), "Should be false");
    assert.strictEqual(typeof tomorrow.isAfter(now), "boolean", "Should be a boolean");
})
test('isBefore() => boolean', () => {
    const now = new BetterDate().now();
    const yesterday = now.subtract({ days: 1 });
    assert.ok(yesterday.isBefore(now), "Should be true");
    assert.ok(!now.isBefore(yesterday), "Should be false");
    assert.strictEqual(typeof yesterday.isBefore(now), "boolean", "Should be a boolean");
})
test('isEqual() => boolean', () => {
    const now = new BetterDate().now();
    const tomorrow = now.add({ days: 1 });
    const yesterday = now.subtract({ days: 1 });
    assert.ok(new BetterDate().now().isEqual(new Date()), "Should be true");
    assert.ok(!tomorrow.isEqual(yesterday), "Should be false");
    assert.strictEqual(typeof new BetterDate().now().isEqual(new Date()), "boolean", "Should be a boolean");
})

// Difference
test('diff() => object', () => {
    const now = new BetterDate().now();
    const tomorrow = now.add({ days: 1 });
    assert.strictEqual(typeof tomorrow.diff(now).days, "number", "Should be a number");
    assert.strictEqual(typeof tomorrow.diff(now).hours, "number", "Should be a number");
    assert.strictEqual(typeof tomorrow.diff(now), "object", "Should be an object");
})
test('diff() => object', () => {
    const now = new BetterDate().now();
    const tomorrow = now.add({ days: 1 });
    assert.strictEqual(typeof tomorrow.diff(now, "days").value, "number", "Should be a number");
    assert.strictEqual(typeof tomorrow.diff(now, "hours").value, "number", "Should be a number");
    assert.strictEqual(typeof tomorrow.diff(now, "days"), "object", "Should be an object");
})

// Cloning
test('clone() => new BetterDate object', () => {
    const now = new BetterDate().now();
    const clone = now.clone();
    assert.ok(now instanceof BetterDate && clone instanceof BetterDate, "Should be an instance of BetterDate");
})