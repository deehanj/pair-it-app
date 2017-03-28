'use strict';
const events = require('events')

const eventEmitter = new events.EventEmitter();
const _ = require('lodash');

const subscribed = {};

function subscribe (fnName, fn, originModule){
  //Avoid various suscriptions with the same origin
    if (!subscribed[fnName]){
        subscribed[fnName] = {};
        subscribed[fnName][originModule] = fn;
    } else if (!subscribed[fnName][originModule]){
        subscribed[fnName][originModule] = fn;
    } else {
      //See if ignore the new suscription or replace the old one
      return;
    }
    eventEmitter.on(fnName, fn);
}

function unSubscribe (fnName){
  subscribed[fnName] = null;
  eventEmitter.removeAllListeners(fnName);
}

function trigger(fnName, args){
    eventEmitter.emit(fnName, args);
}

module.exports = {
    subscribe : subscribe,
    unSubscribe: unSubscribe,
    trigger: trigger
}
