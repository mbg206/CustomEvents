# CustomEvents

A simple way of creating custom events.

## Usage

To create a custom event handler, use the `CustomEvents` constructor.

### Methods

`CustomEvents.on(event, function)`
Adds an event listener on the input event.

`CustomEvents.clear(event)`
Clears all event listeners on the input event.

`CustomEvents.awaitEvent(event)`
Returns a promise that resolves when the event is triggered.

The value that the promise resolves to depends on how many values were passed when the event was dispatched.

If only 1 value was passed, then the promise will resolve to that value.
If more than 1 value was passed, then the promise will resolve to an array of the values.

`CustomEvents.dispatchEvent(event, ...data)`
Triggers an event.

## Example

```javascript
const myEventHandler = new CustomEvents();

myEventHandler.on('alert', (data) => {
    console.log(data);
});

myEventHandler.dispatchEvent('alert', 'testing');
myEventHandler.dispatchEvent('alert', '123');

myEventHandler.clear('alert');

myEventHandler.dispatchEvent('alert', '456');
```

The following will be output to the console:

```
testing
123
```