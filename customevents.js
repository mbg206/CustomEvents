const CustomEvents = function() {
    this.handlers = {};
}

CustomEvents.prototype.on = function(event, callback, options = {}) {
    if (typeof event !== 'string') throw 'Event needs to be a string!';
    if (typeof callback !== 'function') throw 'Callback needs to be a function!';
    if (typeof options !== 'object') throw 'Options needs to be an object!';

    if (!this.handlers.hasOwnProperty(event)) this.handlers[event] = [];

    let opt = Object.assign({
        'once': false
    }, options);

    this.handlers[event].push([callback, opt]);
}
CustomEvents.prototype.clear = function(event) {
    if (typeof event !== 'string') throw 'Event needs to be a string!';
    this.handlers[event] = [];
}

CustomEvents.prototype.awaitEvent = function(event) {return new Promise(res => {
    this.on(event, (...data) => res(data), {once: true});
})}

CustomEvents.prototype.dispatchEvent = function(event, ...data) {
    if (typeof event !== 'string') throw 'Event needs to be a string!';

    let handlers = this.handlers[event];
    if (!handlers) return;

    for (let i = 0; i < handlers.length;) {
        handlers[i][0](...data);

        if (handlers[i][1].once === true) handlers.splice(i, 1);
        else i++
    }
}

if (typeof exports === 'object' && typeof module !== 'undefined') module.exports = CustomEvents;