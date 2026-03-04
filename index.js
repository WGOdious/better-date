/**
 * BetterDate
 * Tiny immutable fluent Date wrapper (zero deps)
 */
class BetterDate {
    #d;

    /**
     * @param {Date | number | string} [input]
     */
    constructor(input = new Date()) {
        this.#d = input instanceof Date ? new Date(input) : new Date(input);
    }

    // ---------- Static ----------

    now() {
        return new BetterDate();
    }

    from(input) {
        return new BetterDate(input);
    }

    // ---------- Core ----------

    value() {
        return new Date(this.#d);
    }

    epoch() {
        return this.#d.getTime();
    }

    toISOString() {
        return this.#d.toISOString();
    }

    toUTCString() {
        return this.#d.toUTCString();
    }

    toString() {
        return this.format("YYYY-MM-DD HH:mm:ss");
    }

    clone() {
        return new BetterDate(this.#d);
    }

    // ---------- Formatting ----------

    format(pattern = "YYYY-MM-DD HH:mm:ss") {
        const d = this.#d;

        const map = {
            YYYY: d.getFullYear(),
            YY: String(d.getFullYear()).slice(-2),
            MM: String(d.getMonth() + 1).padStart(2, "0"),
            M: d.getMonth() + 1,
            DD: String(d.getDate()).padStart(2, "0"),
            D: d.getDate(),
            HH: String(d.getHours()).padStart(2, "0"),
            H: d.getHours(),
            mm: String(d.getMinutes()).padStart(2, "0"),
            m: d.getMinutes(),
            ss: String(d.getSeconds()).padStart(2, "0"),
            s: d.getSeconds(),
            SSS: String(d.getMilliseconds()).padStart(3, "0"),
        };

        return pattern.replace(
            /YYYY|YY|MM|M|DD|D|HH|H|mm|m|ss|s|SSS/g,
            token => map[token]
        );
    }

    // ---------- Immutable Add/Subtract ----------

    add({
        years = 0,
        months = 0,
        days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0,
        milliseconds = 0
    } = {}) {
        const d = new Date(this.#d);

        d.setFullYear(d.getFullYear() + years);
        d.setMonth(d.getMonth() + months);
        d.setDate(d.getDate() + days);
        d.setHours(d.getHours() + hours);
        d.setMinutes(d.getMinutes() + minutes);
        d.setSeconds(d.getSeconds() + seconds);
        d.setMilliseconds(d.getMilliseconds() + milliseconds);

        return new BetterDate(d);
    }

    subtract(options = {}) {
        return this.add(
            Object.fromEntries(
                Object.entries(options).map(([k, v]) => [k, -v])
            )
        );
    }

    // ---------- Comparison ----------

    isBefore(value) {
        return this.epoch() < this.from(value).epoch();
    }

    isAfter(value) {
        return this.epoch() > this.from(value).epoch();
    }

    isEqual(value) {
        return this.epoch() === this.from(value).epoch();
    }

    // ---------- Honest Diff ----------

    diff(value, unit = null) {
        const diff = this.epoch() - this.from(value).epoch();
        if(unit){
            const units = {
                weeks: 604800000,
                days: 86400000,
                hours: 3600000,
                minutes: 60000,
                seconds: 1000,
                milliseconds: 1
            };
            if (!units[unit]) {
                throw new Error(`Invalid diff unit: ${unit}. Unit must be one of: ${Object.keys(units).join(", ")}`);
            }
            return {value: diff / units[unit]};
        }
        return {
            weeks: diff / 604800000,
            days: diff / 86400000,
            hours: diff / 3600000,
            minutes: diff / 60000,
            seconds: diff / 1000,
            milliseconds: diff
        }
    }
}

module.exports = BetterDate;
module.exports.default = BetterDate;