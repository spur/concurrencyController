import { EventEmitter } from 'events';
import { tapEvents, getTap } from 'spur-taps';

let handle, isStillTapping;
let handler = new EventEmitter();

document.body.addEventListener(tapEvents.start, function () {
  if (isStillTapping) { return; }
  isStillTapping = true;
  handle = null;
}, true);

document.body.addEventListener(tapEvents.start, function () {
  if (handle) {
    handler.emit('handleTaken', handle);
  }
}, false);


document.body.addEventListener(tapEvents.end, function (event) {
  if (getTap(event).count === 0) {
    handle = null;
    isStillTapping = false;
  }
});

handler.isHandleFree = function () {
  return handle === null;
};

handler.hasHandle = function (element) {
  return handle === element;
};

handler.requestHandle = function (element) {
  if (handle) { return handle === element; }
  handle = element;
  handler.emit('handleTaken', handle);
  return true;
};

export default handler;
