const CustomEvents = function() {
    this.handlers = {};
}

CustomEvents.prototype.on = function(event, listener, options = {}) {
    if (typeof event !== 'string') throw 'Event needs to be a string!';
    if (typeof listener !== 'function') throw 'Listener needs to be a function!';
    if (typeof event !== 'object') throw 'Options needs to be an object!';

    if (!this.handlers.hasOwnProperty(event)) this.handlers[event] = [];

    let opt = Object.assign({
        'once': false
    }, options);

    this.handlers[event].push([listener, opt]);
}
CustomEvents.prototype.clear = function(event) {
    if (typeof event !== 'string') throw 'Event needs to be a string!';
    this.handlers[event] = [];
}

CustomEvents.prototype.dispatchEvent = function(event, ...data) {
    if (typeof event !== 'string') throw 'Event needs to be a string!';

    let handlers = this.handlers[event];
    for (let i = 0; i < handlers.length;) {
        handlers[i][0](...data);

        if (handlers[i][1].once === true) handlers.splice(i, 1);
        else i++
    }
}

if (module && exports) module.exports = CustomEvents;