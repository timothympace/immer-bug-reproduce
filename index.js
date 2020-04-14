// Nuke the built in Symbol because core-js doesn't return a
// polyfill if the native is still there.
global.Symbol = undefined;
global.Symbol = require('core-js-pure/stable/symbol');
const Immer = require('immer');

const test1 = () => {
  const TEST_SYMBOL = Symbol("immer-state");

  const obj = {};
  Object.defineProperty(obj, TEST_SYMBOL, {
    value: "this is a test",
    enumerable: false
  });

  const keys = Reflect.ownKeys(obj);

  if (keys[0] === TEST_SYMBOL) {
    console.log("[PASS]: Strict equality is working as expected with Symbol polyfill and object/array keys\n");
  } else {
    console.error("[FAIL]: Strict equality does not work with Symbol polyfill and object/array keys\n");
  }
}

const test2 = () => {
  Immer.enableES5();
  Immer.setUseProxies(false);

  const baseState = {items: []};
  const nextState = Immer.produce(baseState, (draftState) => {
    draftState.items.push({id: "ID"});
  });
}

test1();
test2();
