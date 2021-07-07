'use strict';

var require$$1 = require('os');
var require$$0$2 = require('fs');
var require$$0$3 = require('path');
var http$1 = require('http');
var require$$3$1 = require('https');
require('net');
var require$$1$1 = require('tls');
var require$$4 = require('events');
var require$$6$1 = require('assert');
var require$$6 = require('util');
var Stream = require('stream');
var Url = require('url');
var zlib = require('zlib');
var require$$0$4 = require('string_decoder');
var require$$1$2 = require('child_process');
var require$$6$2 = require('timers');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$3);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http$1);
var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3$1);
var require$$1__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$1$1);
var require$$4__default = /*#__PURE__*/_interopDefaultLegacy(require$$4);
var require$$6__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$6$1);
var require$$6__default = /*#__PURE__*/_interopDefaultLegacy(require$$6);
var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream);
var Url__default = /*#__PURE__*/_interopDefaultLegacy(Url);
var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);
var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$4);
var require$$1__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$1$2);
var require$$6__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$6$2);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function commonjsRequire (path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var runtime = {exports: {}};

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (module) {
var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
}(runtime));

var regenerator = runtime.exports;

var core$2 = {};

var command = {};

var utils$2 = {};

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(utils$2, "__esModule", { value: true });
utils$2.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
utils$2.toCommandValue = toCommandValue;

var __createBinding$7 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$7 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$7 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$7(result, mod, k);
    __setModuleDefault$7(result, mod);
    return result;
};
Object.defineProperty(command, "__esModule", { value: true });
command.issue = command.issueCommand = void 0;
const os$2 = __importStar$7(require$$1__default['default']);
const utils_1$2 = utils$2;
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand$1(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os$2.EOL);
}
command.issueCommand = issueCommand$1;
function issue(name, message = '') {
    issueCommand$1(name, {}, message);
}
command.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1$2.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1$2.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}

var fileCommand = {};

// For internal use, subject to change.
var __createBinding$6 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$6 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$6 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$6(result, mod, k);
    __setModuleDefault$6(result, mod);
    return result;
};
Object.defineProperty(fileCommand, "__esModule", { value: true });
fileCommand.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs$4 = __importStar$6(require$$0__default['default']);
const os$1 = __importStar$6(require$$1__default['default']);
const utils_1$1 = utils$2;
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs$4.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs$4.appendFileSync(filePath, `${utils_1$1.toCommandValue(message)}${os$1.EOL}`, {
        encoding: 'utf8'
    });
}
fileCommand.issueCommand = issueCommand;

(function (exports) {
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = command;
const file_command_1 = fileCommand;
const utils_1 = utils$2;
const os = __importStar(require$$1__default['default']);
const path = __importStar(require$$0__default$1['default']);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;

}(core$2));

var core$1 = /*@__PURE__*/getDefaultExportFromCjs(core$2);

var github = {};

var context = {};

Object.defineProperty(context, "__esModule", { value: true });
context.Context = void 0;
const fs_1 = require$$0__default['default'];
const os_1 = require$$1__default['default'];
class Context$2 {
    /**
     * Hydrate the context from the environment
     */
    constructor() {
        var _a, _b, _c;
        this.payload = {};
        if (process.env.GITHUB_EVENT_PATH) {
            if (fs_1.existsSync(process.env.GITHUB_EVENT_PATH)) {
                this.payload = JSON.parse(fs_1.readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: 'utf8' }));
            }
            else {
                const path = process.env.GITHUB_EVENT_PATH;
                process.stdout.write(`GITHUB_EVENT_PATH ${path} does not exist${os_1.EOL}`);
            }
        }
        this.eventName = process.env.GITHUB_EVENT_NAME;
        this.sha = process.env.GITHUB_SHA;
        this.ref = process.env.GITHUB_REF;
        this.workflow = process.env.GITHUB_WORKFLOW;
        this.action = process.env.GITHUB_ACTION;
        this.actor = process.env.GITHUB_ACTOR;
        this.job = process.env.GITHUB_JOB;
        this.runNumber = parseInt(process.env.GITHUB_RUN_NUMBER, 10);
        this.runId = parseInt(process.env.GITHUB_RUN_ID, 10);
        this.apiUrl = (_a = process.env.GITHUB_API_URL) !== null && _a !== void 0 ? _a : `https://api.github.com`;
        this.serverUrl = (_b = process.env.GITHUB_SERVER_URL) !== null && _b !== void 0 ? _b : `https://github.com`;
        this.graphqlUrl = (_c = process.env.GITHUB_GRAPHQL_URL) !== null && _c !== void 0 ? _c : `https://api.github.com/graphql`;
    }
    get issue() {
        const payload = this.payload;
        return Object.assign(Object.assign({}, this.repo), { number: (payload.issue || payload.pull_request || payload).number });
    }
    get repo() {
        if (process.env.GITHUB_REPOSITORY) {
            const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
            return { owner, repo };
        }
        if (this.payload.repository) {
            return {
                owner: this.payload.repository.owner.login,
                repo: this.payload.repository.name
            };
        }
        throw new Error("context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'");
    }
}
context.Context = Context$2;

var utils$1 = {};

var utils = {};

var httpClient$1 = {};

var proxy = {};

Object.defineProperty(proxy, "__esModule", { value: true });
function getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === 'https:';
    let proxyUrl;
    if (checkBypass(reqUrl)) {
        return proxyUrl;
    }
    let proxyVar;
    if (usingSsl) {
        proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
    }
    else {
        proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
    }
    if (proxyVar) {
        proxyUrl = new URL(proxyVar);
    }
    return proxyUrl;
}
proxy.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    let upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (let upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
proxy.checkBypass = checkBypass;

var tunnel$1 = {};

var tls = require$$1__default$1['default'];
var http = http__default['default'];
var https = require$$3__default['default'];
var events$1 = require$$4__default['default'];
var util$1 = require$$6__default['default'];


tunnel$1.httpOverHttp = httpOverHttp;
tunnel$1.httpsOverHttp = httpsOverHttp;
tunnel$1.httpOverHttps = httpOverHttps;
tunnel$1.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util$1.inherits(TunnelingAgent, events$1.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket);
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  };
} else {
  debug = function() {};
}
tunnel$1.debug = debug; // for test

var tunnel = tunnel$1;

(function (exports) {
Object.defineProperty(exports, "__esModule", { value: true });
const http = http__default['default'];
const https = require$$3__default['default'];
const pm = proxy;
let tunnel$1;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise(async (resolve, reject) => {
            let output = Buffer.alloc(0);
            this.message.on('data', (chunk) => {
                output = Buffer.concat([output, chunk]);
            });
            this.message.on('end', () => {
                resolve(output.toString());
            });
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
            throw new Error('Client has already been disposed.');
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        // Only perform retries on reads since writes may not be idempotent.
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1
            ? this._maxRetries + 1
            : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
            response = await this.requestRaw(info, data);
            // Check if it's an authentication challenge
            if (response &&
                response.message &&
                response.message.statusCode === HttpCodes.Unauthorized) {
                let authenticationHandler;
                for (let i = 0; i < this.handlers.length; i++) {
                    if (this.handlers[i].canHandleAuthentication(response)) {
                        authenticationHandler = this.handlers[i];
                        break;
                    }
                }
                if (authenticationHandler) {
                    return authenticationHandler.handleAuthentication(this, info, data);
                }
                else {
                    // We have received an unauthorized response but have no handlers to handle it.
                    // Let the response return to the caller.
                    return response;
                }
            }
            let redirectsRemaining = this._maxRedirects;
            while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 &&
                this._allowRedirects &&
                redirectsRemaining > 0) {
                const redirectUrl = response.message.headers['location'];
                if (!redirectUrl) {
                    // if there's no location to redirect to, we won't
                    break;
                }
                let parsedRedirectUrl = new URL(redirectUrl);
                if (parsedUrl.protocol == 'https:' &&
                    parsedUrl.protocol != parsedRedirectUrl.protocol &&
                    !this._allowRedirectDowngrade) {
                    throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                }
                // we need to finish reading the response before reassigning response
                // which will leak the open socket.
                await response.readBody();
                // strip authorization header if redirected to a different hostname
                if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                    for (let header in headers) {
                        // header names are case insensitive
                        if (header.toLowerCase() === 'authorization') {
                            delete headers[header];
                        }
                    }
                }
                // let's make the request with the new redirectUrl
                info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                response = await this.requestRaw(info, data);
                redirectsRemaining--;
            }
            if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                // If not a retry code, return immediately instead of retrying
                return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
                await response.readBody();
                await this._performExponentialBackoff(numTries);
            }
        }
        return response;
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === 'string') {
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            this.handlers.forEach(handler => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel$1) {
                tunnel$1 = tunnel;
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    ...((proxyUrl.username || proxyUrl.password) && {
                        proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                    }),
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                }
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel$1.httpsOverHttps : tunnel$1.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel$1.httpOverHttps : tunnel$1.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
            let a = new Date(value);
            if (!isNaN(a.valueOf())) {
                return a;
            }
        }
        return value;
    }
    async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
            const statusCode = res.message.statusCode;
            const response = {
                statusCode: statusCode,
                result: null,
                headers: {}
            };
            // not found leads to null obj returned
            if (statusCode == HttpCodes.NotFound) {
                resolve(response);
            }
            let obj;
            let contents;
            // get the result from the body
            try {
                contents = await res.readBody();
                if (contents && contents.length > 0) {
                    if (options && options.deserializeDates) {
                        obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
                    }
                    else {
                        obj = JSON.parse(contents);
                    }
                    response.result = obj;
                }
                response.headers = res.message.headers;
            }
            catch (err) {
                // Invalid resource (contents not json);  leaving result obj null
            }
            // note that 3xx redirects are handled by the http layer.
            if (statusCode > 299) {
                let msg;
                // if exception/error in body, attempt to get better error
                if (obj && obj.message) {
                    msg = obj.message;
                }
                else if (contents && contents.length > 0) {
                    // it may be the case that the exception is in the body message as string
                    msg = contents;
                }
                else {
                    msg = 'Failed request: (' + statusCode + ')';
                }
                let err = new HttpClientError(msg, statusCode);
                err.result = response.result;
                reject(err);
            }
            else {
                resolve(response);
            }
        });
    }
}
exports.HttpClient = HttpClient;
}(httpClient$1));

var __createBinding$5 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$5 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$5 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$5(result, mod, k);
    __setModuleDefault$5(result, mod);
    return result;
};
Object.defineProperty(utils, "__esModule", { value: true });
utils.getApiBaseUrl = utils.getProxyAgent = utils.getAuthString = void 0;
const httpClient = __importStar$5(httpClient$1);
function getAuthString(token, options) {
    if (!token && !options.auth) {
        throw new Error('Parameter token or opts.auth is required');
    }
    else if (token && options.auth) {
        throw new Error('Parameters token and opts.auth may not both be specified');
    }
    return typeof options.auth === 'string' ? options.auth : `token ${token}`;
}
utils.getAuthString = getAuthString;
function getProxyAgent(destinationUrl) {
    const hc = new httpClient.HttpClient();
    return hc.getAgent(destinationUrl);
}
utils.getProxyAgent = getProxyAgent;
function getApiBaseUrl() {
    return process.env['GITHUB_API_URL'] || 'https://api.github.com';
}
utils.getApiBaseUrl = getApiBaseUrl;

var distNode$9 = {};

var distNode$8 = {};

Object.defineProperty(distNode$8, '__esModule', { value: true });

function getUserAgent() {
  if (typeof navigator === "object" && "userAgent" in navigator) {
    return navigator.userAgent;
  }

  if (typeof process === "object" && "version" in process) {
    return `Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})`;
  }

  return "<environment undetectable>";
}

distNode$8.getUserAgent = getUserAgent;

var beforeAfterHook$1 = {exports: {}};

var register_1 = register$1;

function register$1(state, name, method, options) {
  if (typeof method !== "function") {
    throw new Error("method for before hook must be a function");
  }

  if (!options) {
    options = {};
  }

  if (Array.isArray(name)) {
    return name.reverse().reduce(function (callback, name) {
      return register$1.bind(null, state, name, callback, options);
    }, method)();
  }

  return Promise.resolve().then(function () {
    if (!state.registry[name]) {
      return method(options);
    }

    return state.registry[name].reduce(function (method, registered) {
      return registered.hook.bind(null, method, options);
    }, method)();
  });
}

var add = addHook$1;

function addHook$1(state, kind, name, hook) {
  var orig = hook;
  if (!state.registry[name]) {
    state.registry[name] = [];
  }

  if (kind === "before") {
    hook = function (method, options) {
      return Promise.resolve()
        .then(orig.bind(null, options))
        .then(method.bind(null, options));
    };
  }

  if (kind === "after") {
    hook = function (method, options) {
      var result;
      return Promise.resolve()
        .then(method.bind(null, options))
        .then(function (result_) {
          result = result_;
          return orig(result, options);
        })
        .then(function () {
          return result;
        });
    };
  }

  if (kind === "error") {
    hook = function (method, options) {
      return Promise.resolve()
        .then(method.bind(null, options))
        .catch(function (error) {
          return orig(error, options);
        });
    };
  }

  state.registry[name].push({
    hook: hook,
    orig: orig,
  });
}

var remove = removeHook$1;

function removeHook$1(state, name, method) {
  if (!state.registry[name]) {
    return;
  }

  var index = state.registry[name]
    .map(function (registered) {
      return registered.orig;
    })
    .indexOf(method);

  if (index === -1) {
    return;
  }

  state.registry[name].splice(index, 1);
}

var register = register_1;
var addHook = add;
var removeHook = remove;

// bind with array of arguments: https://stackoverflow.com/a/21792913
var bind = Function.bind;
var bindable = bind.bind(bind);

function bindApi (hook, state, name) {
  var removeHookRef = bindable(removeHook, null).apply(null, name ? [state, name] : [state]);
  hook.api = { remove: removeHookRef };
  hook.remove = removeHookRef

  ;['before', 'error', 'after', 'wrap'].forEach(function (kind) {
    var args = name ? [state, kind, name] : [state, kind];
    hook[kind] = hook.api[kind] = bindable(addHook, null).apply(null, args);
  });
}

function HookSingular () {
  var singularHookName = 'h';
  var singularHookState = {
    registry: {}
  };
  var singularHook = register.bind(null, singularHookState, singularHookName);
  bindApi(singularHook, singularHookState, singularHookName);
  return singularHook
}

function HookCollection () {
  var state = {
    registry: {}
  };

  var hook = register.bind(null, state);
  bindApi(hook, state);

  return hook
}

var collectionHookDeprecationMessageDisplayed = false;
function Hook () {
  if (!collectionHookDeprecationMessageDisplayed) {
    console.warn('[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4');
    collectionHookDeprecationMessageDisplayed = true;
  }
  return HookCollection()
}

Hook.Singular = HookSingular.bind();
Hook.Collection = HookCollection.bind();

beforeAfterHook$1.exports = Hook;
// expose constructors as a named property for TypeScript
beforeAfterHook$1.exports.Hook = Hook;
beforeAfterHook$1.exports.Singular = Hook.Singular;
beforeAfterHook$1.exports.Collection = Hook.Collection;

var distNode$7 = {};

var distNode$6 = {};

var isPlainObject$4 = {};

Object.defineProperty(isPlainObject$4, '__esModule', { value: true });

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject$3(o) {
  var ctor,prot;

  if (isObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

isPlainObject$4.isPlainObject = isPlainObject$3;

Object.defineProperty(distNode$6, '__esModule', { value: true });

var isPlainObject$2 = isPlainObject$4;
var universalUserAgent$3 = distNode$8;

function lowercaseKeys(object) {
  if (!object) {
    return {};
  }

  return Object.keys(object).reduce((newObj, key) => {
    newObj[key.toLowerCase()] = object[key];
    return newObj;
  }, {});
}

function mergeDeep(defaults, options) {
  const result = Object.assign({}, defaults);
  Object.keys(options).forEach(key => {
    if (isPlainObject$2.isPlainObject(options[key])) {
      if (!(key in defaults)) Object.assign(result, {
        [key]: options[key]
      });else result[key] = mergeDeep(defaults[key], options[key]);
    } else {
      Object.assign(result, {
        [key]: options[key]
      });
    }
  });
  return result;
}

function removeUndefinedProperties(obj) {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }

  return obj;
}

function merge(defaults, route, options) {
  if (typeof route === "string") {
    let [method, url] = route.split(" ");
    options = Object.assign(url ? {
      method,
      url
    } : {
      url: method
    }, options);
  } else {
    options = Object.assign({}, route);
  } // lowercase header names before merging with defaults to avoid duplicates


  options.headers = lowercaseKeys(options.headers); // remove properties with undefined values before merging

  removeUndefinedProperties(options);
  removeUndefinedProperties(options.headers);
  const mergedOptions = mergeDeep(defaults || {}, options); // mediaType.previews arrays are merged, instead of overwritten

  if (defaults && defaults.mediaType.previews.length) {
    mergedOptions.mediaType.previews = defaults.mediaType.previews.filter(preview => !mergedOptions.mediaType.previews.includes(preview)).concat(mergedOptions.mediaType.previews);
  }

  mergedOptions.mediaType.previews = mergedOptions.mediaType.previews.map(preview => preview.replace(/-preview/, ""));
  return mergedOptions;
}

function addQueryParameters(url, parameters) {
  const separator = /\?/.test(url) ? "&" : "?";
  const names = Object.keys(parameters);

  if (names.length === 0) {
    return url;
  }

  return url + separator + names.map(name => {
    if (name === "q") {
      return "q=" + parameters.q.split("+").map(encodeURIComponent).join("+");
    }

    return `${name}=${encodeURIComponent(parameters[name])}`;
  }).join("&");
}

const urlVariableRegex = /\{[^}]+\}/g;

function removeNonChars(variableName) {
  return variableName.replace(/^\W+|\W+$/g, "").split(/,/);
}

function extractUrlVariableNames(url) {
  const matches = url.match(urlVariableRegex);

  if (!matches) {
    return [];
  }

  return matches.map(removeNonChars).reduce((a, b) => a.concat(b), []);
}

function omit(object, keysToOmit) {
  return Object.keys(object).filter(option => !keysToOmit.includes(option)).reduce((obj, key) => {
    obj[key] = object[key];
    return obj;
  }, {});
}

// Based on https://github.com/bramstein/url-template, licensed under BSD
// TODO: create separate package.
//
// Copyright (c) 2012-2014, Bram Stein
// All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//  1. Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in the
//     documentation and/or other materials provided with the distribution.
//  3. The name of the author may not be used to endorse or promote products
//     derived from this software without specific prior written permission.
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
// EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/* istanbul ignore file */
function encodeReserved(str) {
  return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
    if (!/%[0-9A-Fa-f]/.test(part)) {
      part = encodeURI(part).replace(/%5B/g, "[").replace(/%5D/g, "]");
    }

    return part;
  }).join("");
}

function encodeUnreserved(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

function encodeValue(operator, value, key) {
  value = operator === "+" || operator === "#" ? encodeReserved(value) : encodeUnreserved(value);

  if (key) {
    return encodeUnreserved(key) + "=" + value;
  } else {
    return value;
  }
}

function isDefined(value) {
  return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
  return operator === ";" || operator === "&" || operator === "?";
}

function getValues(context, operator, key, modifier) {
  var value = context[key],
      result = [];

  if (isDefined(value) && value !== "") {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      value = value.toString();

      if (modifier && modifier !== "*") {
        value = value.substring(0, parseInt(modifier, 10));
      }

      result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
    } else {
      if (modifier === "*") {
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function (value) {
            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
          });
        } else {
          Object.keys(value).forEach(function (k) {
            if (isDefined(value[k])) {
              result.push(encodeValue(operator, value[k], k));
            }
          });
        }
      } else {
        const tmp = [];

        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function (value) {
            tmp.push(encodeValue(operator, value));
          });
        } else {
          Object.keys(value).forEach(function (k) {
            if (isDefined(value[k])) {
              tmp.push(encodeUnreserved(k));
              tmp.push(encodeValue(operator, value[k].toString()));
            }
          });
        }

        if (isKeyOperator(operator)) {
          result.push(encodeUnreserved(key) + "=" + tmp.join(","));
        } else if (tmp.length !== 0) {
          result.push(tmp.join(","));
        }
      }
    }
  } else {
    if (operator === ";") {
      if (isDefined(value)) {
        result.push(encodeUnreserved(key));
      }
    } else if (value === "" && (operator === "&" || operator === "?")) {
      result.push(encodeUnreserved(key) + "=");
    } else if (value === "") {
      result.push("");
    }
  }

  return result;
}

function parseUrl(template) {
  return {
    expand: expand$2.bind(null, template)
  };
}

function expand$2(template, context) {
  var operators = ["+", "#", ".", "/", ";", "?", "&"];
  return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
    if (expression) {
      let operator = "";
      const values = [];

      if (operators.indexOf(expression.charAt(0)) !== -1) {
        operator = expression.charAt(0);
        expression = expression.substr(1);
      }

      expression.split(/,/g).forEach(function (variable) {
        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
        values.push(getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
      });

      if (operator && operator !== "+") {
        var separator = ",";

        if (operator === "?") {
          separator = "&";
        } else if (operator !== "#") {
          separator = operator;
        }

        return (values.length !== 0 ? operator : "") + values.join(separator);
      } else {
        return values.join(",");
      }
    } else {
      return encodeReserved(literal);
    }
  });
}

function parse$4(options) {
  // https://fetch.spec.whatwg.org/#methods
  let method = options.method.toUpperCase(); // replace :varname with {varname} to make it RFC 6570 compatible

  let url = (options.url || "/").replace(/:([a-z]\w+)/g, "{$1}");
  let headers = Object.assign({}, options.headers);
  let body;
  let parameters = omit(options, ["method", "baseUrl", "url", "headers", "request", "mediaType"]); // extract variable names from URL to calculate remaining variables later

  const urlVariableNames = extractUrlVariableNames(url);
  url = parseUrl(url).expand(parameters);

  if (!/^http/.test(url)) {
    url = options.baseUrl + url;
  }

  const omittedParameters = Object.keys(options).filter(option => urlVariableNames.includes(option)).concat("baseUrl");
  const remainingParameters = omit(parameters, omittedParameters);
  const isBinaryRequest = /application\/octet-stream/i.test(headers.accept);

  if (!isBinaryRequest) {
    if (options.mediaType.format) {
      // e.g. application/vnd.github.v3+json => application/vnd.github.v3.raw
      headers.accept = headers.accept.split(/,/).map(preview => preview.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/, `application/vnd$1$2.${options.mediaType.format}`)).join(",");
    }

    if (options.mediaType.previews.length) {
      const previewsFromAcceptHeader = headers.accept.match(/[\w-]+(?=-preview)/g) || [];
      headers.accept = previewsFromAcceptHeader.concat(options.mediaType.previews).map(preview => {
        const format = options.mediaType.format ? `.${options.mediaType.format}` : "+json";
        return `application/vnd.github.${preview}-preview${format}`;
      }).join(",");
    }
  } // for GET/HEAD requests, set URL query parameters from remaining parameters
  // for PATCH/POST/PUT/DELETE requests, set request body from remaining parameters


  if (["GET", "HEAD"].includes(method)) {
    url = addQueryParameters(url, remainingParameters);
  } else {
    if ("data" in remainingParameters) {
      body = remainingParameters.data;
    } else {
      if (Object.keys(remainingParameters).length) {
        body = remainingParameters;
      } else {
        headers["content-length"] = 0;
      }
    }
  } // default content-type for JSON if body is set


  if (!headers["content-type"] && typeof body !== "undefined") {
    headers["content-type"] = "application/json; charset=utf-8";
  } // GitHub expects 'content-length: 0' header for PUT/PATCH requests without body.
  // fetch does not allow to set `content-length` header, but we can set body to an empty string


  if (["PATCH", "PUT"].includes(method) && typeof body === "undefined") {
    body = "";
  } // Only return body/request keys if present


  return Object.assign({
    method,
    url,
    headers
  }, typeof body !== "undefined" ? {
    body
  } : null, options.request ? {
    request: options.request
  } : null);
}

function endpointWithDefaults(defaults, route, options) {
  return parse$4(merge(defaults, route, options));
}

function withDefaults$2(oldDefaults, newDefaults) {
  const DEFAULTS = merge(oldDefaults, newDefaults);
  const endpoint = endpointWithDefaults.bind(null, DEFAULTS);
  return Object.assign(endpoint, {
    DEFAULTS,
    defaults: withDefaults$2.bind(null, DEFAULTS),
    merge: merge.bind(null, DEFAULTS),
    parse: parse$4
  });
}

const VERSION$5 = "6.0.12";

const userAgent = `octokit-endpoint.js/${VERSION$5} ${universalUserAgent$3.getUserAgent()}`; // DEFAULTS has all properties set that EndpointOptions has, except url.
// So we use RequestParameters and add method as additional required property.

const DEFAULTS = {
  method: "GET",
  baseUrl: "https://api.github.com",
  headers: {
    accept: "application/vnd.github.v3+json",
    "user-agent": userAgent
  },
  mediaType: {
    format: "",
    previews: []
  }
};

const endpoint$1 = withDefaults$2(null, DEFAULTS);

distNode$6.endpoint = endpoint$1;

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream__default['default'].Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert$2;
try {
	convert$2 = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream__default['default'].PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream__default['default']) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream__default['default']) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream__default['default'])) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert$2 !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
		if (!res) {
			res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
			if (res) {
				res.pop(); // drop last quote
			}
		}

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert$2(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream__default['default'] && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream__default['default']) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http__default['default'].STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url__default['default'].parse;
const format_url = Url__default['default'].format;

const streamDestructionSupported = 'destroy' in Stream__default['default'].Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream__default['default'].Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream__default['default'].PassThrough;
const resolve_url = Url__default['default'].resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? require$$3__default['default'] : http__default['default']).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream__default['default'].Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout,
							size: request.size
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib__default['default'].Z_SYNC_FLUSH,
				finishFlush: zlib__default['default'].Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib__default['default'].createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib__default['default'].createInflate());
					} else {
						body = body.pipe(zlib__default['default'].createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib__default['default'].createBrotliDecompress === 'function') {
				body = body.pipe(zlib__default['default'].createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

var lib$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': fetch,
  Headers: Headers,
  Request: Request,
  Response: Response,
  FetchError: FetchError
});

var require$$3 = /*@__PURE__*/getAugmentedNamespace(lib$2);

var distNode$5 = {};

var distNode$4 = {};

Object.defineProperty(distNode$4, '__esModule', { value: true });

class Deprecation extends Error {
  constructor(message) {
    super(message); // Maintains proper stack trace (only available on V8)

    /* istanbul ignore next */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = 'Deprecation';
  }

}

distNode$4.Deprecation = Deprecation;

var once$4 = {exports: {}};

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
var wrappy_1 = wrappy$2;
function wrappy$2 (fn, cb) {
  if (fn && cb) return wrappy$2(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k];
  });

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    var ret = fn.apply(this, args);
    var cb = args[args.length-1];
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k];
      });
    }
    return ret
  }
}

var wrappy$1 = wrappy_1;
once$4.exports = wrappy$1(once$3);
once$4.exports.strict = wrappy$1(onceStrict);

once$3.proto = once$3(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once$3(this)
    },
    configurable: true
  });

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  });
});

function once$3 (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true;
    return f.value = fn.apply(this, arguments)
  };
  f.called = false;
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true;
    return f.value = fn.apply(this, arguments)
  };
  var name = fn.name || 'Function wrapped with `once`';
  f.onceError = name + " shouldn't be called more than once";
  f.called = false;
  return f
}

Object.defineProperty(distNode$5, '__esModule', { value: true });

function _interopDefault$2 (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var deprecation = distNode$4;
var once$2 = _interopDefault$2(once$4.exports);

const logOnceCode = once$2(deprecation => console.warn(deprecation));
const logOnceHeaders = once$2(deprecation => console.warn(deprecation));
/**
 * Error with extra properties to help with debugging
 */

class RequestError extends Error {
  constructor(message, statusCode, options) {
    super(message); // Maintains proper stack trace (only available on V8)

    /* istanbul ignore next */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = "HttpError";
    this.status = statusCode;
    let headers;

    if ("headers" in options && typeof options.headers !== "undefined") {
      headers = options.headers;
    }

    if ("response" in options) {
      this.response = options.response;
      headers = options.response.headers;
    } // redact request credentials without mutating original request options


    const requestCopy = Object.assign({}, options.request);

    if (options.request.headers.authorization) {
      requestCopy.headers = Object.assign({}, options.request.headers, {
        authorization: options.request.headers.authorization.replace(/ .*$/, " [REDACTED]")
      });
    }

    requestCopy.url = requestCopy.url // client_id & client_secret can be passed as URL query parameters to increase rate limit
    // see https://developer.github.com/v3/#increasing-the-unauthenticated-rate-limit-for-oauth-applications
    .replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]") // OAuth tokens can be passed as URL query parameters, although it is not recommended
    // see https://developer.github.com/v3/#oauth2-token-sent-in-a-header
    .replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
    this.request = requestCopy; // deprecations

    Object.defineProperty(this, "code", {
      get() {
        logOnceCode(new deprecation.Deprecation("[@octokit/request-error] `error.code` is deprecated, use `error.status`."));
        return statusCode;
      }

    });
    Object.defineProperty(this, "headers", {
      get() {
        logOnceHeaders(new deprecation.Deprecation("[@octokit/request-error] `error.headers` is deprecated, use `error.response.headers`."));
        return headers || {};
      }

    });
  }

}

distNode$5.RequestError = RequestError;

Object.defineProperty(distNode$7, '__esModule', { value: true });

function _interopDefault$1 (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var endpoint = distNode$6;
var universalUserAgent$2 = distNode$8;
var isPlainObject$1 = isPlainObject$4;
var nodeFetch = _interopDefault$1(require$$3);
var requestError = distNode$5;

const VERSION$4 = "5.6.0";

function getBufferResponse(response) {
  return response.arrayBuffer();
}

function fetchWrapper(requestOptions) {
  const log = requestOptions.request && requestOptions.request.log ? requestOptions.request.log : console;

  if (isPlainObject$1.isPlainObject(requestOptions.body) || Array.isArray(requestOptions.body)) {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }

  let headers = {};
  let status;
  let url;
  const fetch = requestOptions.request && requestOptions.request.fetch || nodeFetch;
  return fetch(requestOptions.url, Object.assign({
    method: requestOptions.method,
    body: requestOptions.body,
    headers: requestOptions.headers,
    redirect: requestOptions.redirect
  }, // `requestOptions.request.agent` type is incompatible
  // see https://github.com/octokit/types.ts/pull/264
  requestOptions.request)).then(async response => {
    url = response.url;
    status = response.status;

    for (const keyAndValue of response.headers) {
      headers[keyAndValue[0]] = keyAndValue[1];
    }

    if ("deprecation" in headers) {
      const matches = headers.link && headers.link.match(/<([^>]+)>; rel="deprecation"/);
      const deprecationLink = matches && matches.pop();
      log.warn(`[@octokit/request] "${requestOptions.method} ${requestOptions.url}" is deprecated. It is scheduled to be removed on ${headers.sunset}${deprecationLink ? `. See ${deprecationLink}` : ""}`);
    }

    if (status === 204 || status === 205) {
      return;
    } // GitHub API returns 200 for HEAD requests


    if (requestOptions.method === "HEAD") {
      if (status < 400) {
        return;
      }

      throw new requestError.RequestError(response.statusText, status, {
        response: {
          url,
          status,
          headers,
          data: undefined
        },
        request: requestOptions
      });
    }

    if (status === 304) {
      throw new requestError.RequestError("Not modified", status, {
        response: {
          url,
          status,
          headers,
          data: await getResponseData(response)
        },
        request: requestOptions
      });
    }

    if (status >= 400) {
      const data = await getResponseData(response);
      const error = new requestError.RequestError(toErrorMessage(data), status, {
        response: {
          url,
          status,
          headers,
          data
        },
        request: requestOptions
      });
      throw error;
    }

    return getResponseData(response);
  }).then(data => {
    return {
      status,
      url,
      headers,
      data
    };
  }).catch(error => {
    if (error instanceof requestError.RequestError) throw error;
    throw new requestError.RequestError(error.message, 500, {
      request: requestOptions
    });
  });
}

async function getResponseData(response) {
  const contentType = response.headers.get("content-type");

  if (/application\/json/.test(contentType)) {
    return response.json();
  }

  if (!contentType || /^text\/|charset=utf-8$/.test(contentType)) {
    return response.text();
  }

  return getBufferResponse(response);
}

function toErrorMessage(data) {
  if (typeof data === "string") return data; // istanbul ignore else - just in case

  if ("message" in data) {
    if (Array.isArray(data.errors)) {
      return `${data.message}: ${data.errors.map(JSON.stringify).join(", ")}`;
    }

    return data.message;
  } // istanbul ignore next - just in case


  return `Unknown error: ${JSON.stringify(data)}`;
}

function withDefaults$1(oldEndpoint, newDefaults) {
  const endpoint = oldEndpoint.defaults(newDefaults);

  const newApi = function (route, parameters) {
    const endpointOptions = endpoint.merge(route, parameters);

    if (!endpointOptions.request || !endpointOptions.request.hook) {
      return fetchWrapper(endpoint.parse(endpointOptions));
    }

    const request = (route, parameters) => {
      return fetchWrapper(endpoint.parse(endpoint.merge(route, parameters)));
    };

    Object.assign(request, {
      endpoint,
      defaults: withDefaults$1.bind(null, endpoint)
    });
    return endpointOptions.request.hook(request, endpointOptions);
  };

  return Object.assign(newApi, {
    endpoint,
    defaults: withDefaults$1.bind(null, endpoint)
  });
}

const request$2 = withDefaults$1(endpoint.endpoint, {
  headers: {
    "user-agent": `octokit-request.js/${VERSION$4} ${universalUserAgent$2.getUserAgent()}`
  }
});

distNode$7.request = request$2;

var distNode$3 = {};

Object.defineProperty(distNode$3, '__esModule', { value: true });

var request$1 = distNode$7;
var universalUserAgent$1 = distNode$8;

const VERSION$3 = "4.6.4";

class GraphqlError extends Error {
  constructor(request, response) {
    const message = response.data.errors[0].message;
    super(message);
    Object.assign(this, response.data);
    Object.assign(this, {
      headers: response.headers
    });
    this.name = "GraphqlError";
    this.request = request; // Maintains proper stack trace (only available on V8)

    /* istanbul ignore next */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

}

const NON_VARIABLE_OPTIONS = ["method", "baseUrl", "url", "headers", "request", "query", "mediaType"];
const FORBIDDEN_VARIABLE_OPTIONS = ["query", "method", "url"];
const GHES_V3_SUFFIX_REGEX = /\/api\/v3\/?$/;
function graphql$1(request, query, options) {
  if (options) {
    if (typeof query === "string" && "query" in options) {
      return Promise.reject(new Error(`[@octokit/graphql] "query" cannot be used as variable name`));
    }

    for (const key in options) {
      if (!FORBIDDEN_VARIABLE_OPTIONS.includes(key)) continue;
      return Promise.reject(new Error(`[@octokit/graphql] "${key}" cannot be used as variable name`));
    }
  }

  const parsedOptions = typeof query === "string" ? Object.assign({
    query
  }, options) : query;
  const requestOptions = Object.keys(parsedOptions).reduce((result, key) => {
    if (NON_VARIABLE_OPTIONS.includes(key)) {
      result[key] = parsedOptions[key];
      return result;
    }

    if (!result.variables) {
      result.variables = {};
    }

    result.variables[key] = parsedOptions[key];
    return result;
  }, {}); // workaround for GitHub Enterprise baseUrl set with /api/v3 suffix
  // https://github.com/octokit/auth-app.js/issues/111#issuecomment-657610451

  const baseUrl = parsedOptions.baseUrl || request.endpoint.DEFAULTS.baseUrl;

  if (GHES_V3_SUFFIX_REGEX.test(baseUrl)) {
    requestOptions.url = baseUrl.replace(GHES_V3_SUFFIX_REGEX, "/api/graphql");
  }

  return request(requestOptions).then(response => {
    if (response.data.errors) {
      const headers = {};

      for (const key of Object.keys(response.headers)) {
        headers[key] = response.headers[key];
      }

      throw new GraphqlError(requestOptions, {
        headers,
        data: response.data
      });
    }

    return response.data.data;
  });
}

function withDefaults(request$1$1, newDefaults) {
  const newRequest = request$1$1.defaults(newDefaults);

  const newApi = (query, options) => {
    return graphql$1(newRequest, query, options);
  };

  return Object.assign(newApi, {
    defaults: withDefaults.bind(null, newRequest),
    endpoint: request$1.request.endpoint
  });
}

const graphql$1$1 = withDefaults(request$1.request, {
  headers: {
    "user-agent": `octokit-graphql.js/${VERSION$3} ${universalUserAgent$1.getUserAgent()}`
  },
  method: "POST",
  url: "/graphql"
});
function withCustomRequest(customRequest) {
  return withDefaults(customRequest, {
    method: "POST",
    url: "/graphql"
  });
}

distNode$3.graphql = graphql$1$1;
distNode$3.withCustomRequest = withCustomRequest;

var distNode$2 = {};

Object.defineProperty(distNode$2, '__esModule', { value: true });

async function auth(token) {
  const tokenType = token.split(/\./).length === 3 ? "app" : /^v\d+\./.test(token) ? "installation" : "oauth";
  return {
    type: "token",
    token: token,
    tokenType
  };
}

/**
 * Prefix token for usage in the Authorization header
 *
 * @param token OAuth token or JSON Web Token
 */
function withAuthorizationPrefix(token) {
  if (token.split(/\./).length === 3) {
    return `bearer ${token}`;
  }

  return `token ${token}`;
}

async function hook(token, request, route, parameters) {
  const endpoint = request.endpoint.merge(route, parameters);
  endpoint.headers.authorization = withAuthorizationPrefix(token);
  return request(endpoint);
}

const createTokenAuth = function createTokenAuth(token) {
  if (!token) {
    throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
  }

  if (typeof token !== "string") {
    throw new Error("[@octokit/auth-token] Token passed to createTokenAuth is not a string");
  }

  token = token.replace(/^(token|bearer) +/i, "");
  return Object.assign(auth.bind(null, token), {
    hook: hook.bind(null, token)
  });
};

distNode$2.createTokenAuth = createTokenAuth;

Object.defineProperty(distNode$9, '__esModule', { value: true });

var universalUserAgent = distNode$8;
var beforeAfterHook = beforeAfterHook$1.exports;
var request = distNode$7;
var graphql = distNode$3;
var authToken = distNode$2;

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

const VERSION$2 = "3.5.1";

const _excluded = ["authStrategy"];
class Octokit {
  constructor(options = {}) {
    const hook = new beforeAfterHook.Collection();
    const requestDefaults = {
      baseUrl: request.request.endpoint.DEFAULTS.baseUrl,
      headers: {},
      request: Object.assign({}, options.request, {
        // @ts-ignore internal usage only, no need to type
        hook: hook.bind(null, "request")
      }),
      mediaType: {
        previews: [],
        format: ""
      }
    }; // prepend default user agent with `options.userAgent` if set

    requestDefaults.headers["user-agent"] = [options.userAgent, `octokit-core.js/${VERSION$2} ${universalUserAgent.getUserAgent()}`].filter(Boolean).join(" ");

    if (options.baseUrl) {
      requestDefaults.baseUrl = options.baseUrl;
    }

    if (options.previews) {
      requestDefaults.mediaType.previews = options.previews;
    }

    if (options.timeZone) {
      requestDefaults.headers["time-zone"] = options.timeZone;
    }

    this.request = request.request.defaults(requestDefaults);
    this.graphql = graphql.withCustomRequest(this.request).defaults(requestDefaults);
    this.log = Object.assign({
      debug: () => {},
      info: () => {},
      warn: console.warn.bind(console),
      error: console.error.bind(console)
    }, options.log);
    this.hook = hook; // (1) If neither `options.authStrategy` nor `options.auth` are set, the `octokit` instance
    //     is unauthenticated. The `this.auth()` method is a no-op and no request hook is registered.
    // (2) If only `options.auth` is set, use the default token authentication strategy.
    // (3) If `options.authStrategy` is set then use it and pass in `options.auth`. Always pass own request as many strategies accept a custom request instance.
    // TODO: type `options.auth` based on `options.authStrategy`.

    if (!options.authStrategy) {
      if (!options.auth) {
        // (1)
        this.auth = async () => ({
          type: "unauthenticated"
        });
      } else {
        // (2)
        const auth = authToken.createTokenAuth(options.auth); // @ts-ignore  ¯\_(ツ)_/¯

        hook.wrap("request", auth.hook);
        this.auth = auth;
      }
    } else {
      const {
        authStrategy
      } = options,
            otherOptions = _objectWithoutProperties(options, _excluded);

      const auth = authStrategy(Object.assign({
        request: this.request,
        log: this.log,
        // we pass the current octokit instance as well as its constructor options
        // to allow for authentication strategies that return a new octokit instance
        // that shares the same internal state as the current one. The original
        // requirement for this was the "event-octokit" authentication strategy
        // of https://github.com/probot/octokit-auth-probot.
        octokit: this,
        octokitOptions: otherOptions
      }, options.auth)); // @ts-ignore  ¯\_(ツ)_/¯

      hook.wrap("request", auth.hook);
      this.auth = auth;
    } // apply plugins
    // https://stackoverflow.com/a/16345172


    const classConstructor = this.constructor;
    classConstructor.plugins.forEach(plugin => {
      Object.assign(this, plugin(this, options));
    });
  }

  static defaults(defaults) {
    const OctokitWithDefaults = class extends this {
      constructor(...args) {
        const options = args[0] || {};

        if (typeof defaults === "function") {
          super(defaults(options));
          return;
        }

        super(Object.assign({}, defaults, options, options.userAgent && defaults.userAgent ? {
          userAgent: `${options.userAgent} ${defaults.userAgent}`
        } : null));
      }

    };
    return OctokitWithDefaults;
  }
  /**
   * Attach a plugin (or many) to your Octokit instance.
   *
   * @example
   * const API = Octokit.plugin(plugin1, plugin2, plugin3, ...)
   */


  static plugin(...newPlugins) {
    var _a;

    const currentPlugins = this.plugins;
    const NewOctokit = (_a = class extends this {}, _a.plugins = currentPlugins.concat(newPlugins.filter(plugin => !currentPlugins.includes(plugin))), _a);
    return NewOctokit;
  }

}
Octokit.VERSION = VERSION$2;
Octokit.plugins = [];

distNode$9.Octokit = Octokit;

var distNode$1 = {};

Object.defineProperty(distNode$1, '__esModule', { value: true });

function ownKeys$3(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$3(Object(source), true).forEach(function (key) {
        _defineProperty$2(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$3(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

const Endpoints = {
  actions: {
    addSelectedRepoToOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
    approveWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/approve"],
    cancelWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel"],
    createOrUpdateEnvironmentSecret: ["PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
    createOrUpdateOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}"],
    createOrUpdateRepoSecret: ["PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    createRegistrationTokenForOrg: ["POST /orgs/{org}/actions/runners/registration-token"],
    createRegistrationTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/registration-token"],
    createRemoveTokenForOrg: ["POST /orgs/{org}/actions/runners/remove-token"],
    createRemoveTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/remove-token"],
    createWorkflowDispatch: ["POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches"],
    deleteArtifact: ["DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
    deleteEnvironmentSecret: ["DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
    deleteOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}"],
    deleteRepoSecret: ["DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    deleteSelfHostedRunnerFromOrg: ["DELETE /orgs/{org}/actions/runners/{runner_id}"],
    deleteSelfHostedRunnerFromRepo: ["DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}"],
    deleteWorkflowRun: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}"],
    deleteWorkflowRunLogs: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
    disableSelectedRepositoryGithubActionsOrganization: ["DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}"],
    disableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable"],
    downloadArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}"],
    downloadJobLogsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs"],
    downloadWorkflowRunLogs: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
    enableSelectedRepositoryGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories/{repository_id}"],
    enableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable"],
    getAllowedActionsOrganization: ["GET /orgs/{org}/actions/permissions/selected-actions"],
    getAllowedActionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions/selected-actions"],
    getArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
    getEnvironmentPublicKey: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key"],
    getEnvironmentSecret: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
    getGithubActionsPermissionsOrganization: ["GET /orgs/{org}/actions/permissions"],
    getGithubActionsPermissionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions"],
    getJobForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}"],
    getOrgPublicKey: ["GET /orgs/{org}/actions/secrets/public-key"],
    getOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}"],
    getPendingDeploymentsForRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"],
    getRepoPermissions: ["GET /repos/{owner}/{repo}/actions/permissions", {}, {
      renamed: ["actions", "getGithubActionsPermissionsRepository"]
    }],
    getRepoPublicKey: ["GET /repos/{owner}/{repo}/actions/secrets/public-key"],
    getRepoSecret: ["GET /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    getReviewsForRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals"],
    getSelfHostedRunnerForOrg: ["GET /orgs/{org}/actions/runners/{runner_id}"],
    getSelfHostedRunnerForRepo: ["GET /repos/{owner}/{repo}/actions/runners/{runner_id}"],
    getWorkflow: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}"],
    getWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}"],
    getWorkflowRunUsage: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing"],
    getWorkflowUsage: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing"],
    listArtifactsForRepo: ["GET /repos/{owner}/{repo}/actions/artifacts"],
    listEnvironmentSecrets: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets"],
    listJobsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs"],
    listOrgSecrets: ["GET /orgs/{org}/actions/secrets"],
    listRepoSecrets: ["GET /repos/{owner}/{repo}/actions/secrets"],
    listRepoWorkflows: ["GET /repos/{owner}/{repo}/actions/workflows"],
    listRunnerApplicationsForOrg: ["GET /orgs/{org}/actions/runners/downloads"],
    listRunnerApplicationsForRepo: ["GET /repos/{owner}/{repo}/actions/runners/downloads"],
    listSelectedReposForOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}/repositories"],
    listSelectedRepositoriesEnabledGithubActionsOrganization: ["GET /orgs/{org}/actions/permissions/repositories"],
    listSelfHostedRunnersForOrg: ["GET /orgs/{org}/actions/runners"],
    listSelfHostedRunnersForRepo: ["GET /repos/{owner}/{repo}/actions/runners"],
    listWorkflowRunArtifacts: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts"],
    listWorkflowRuns: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs"],
    listWorkflowRunsForRepo: ["GET /repos/{owner}/{repo}/actions/runs"],
    reRunWorkflow: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun"],
    removeSelectedRepoFromOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
    reviewPendingDeploymentsForRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"],
    setAllowedActionsOrganization: ["PUT /orgs/{org}/actions/permissions/selected-actions"],
    setAllowedActionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions/selected-actions"],
    setGithubActionsPermissionsOrganization: ["PUT /orgs/{org}/actions/permissions"],
    setGithubActionsPermissionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions"],
    setSelectedReposForOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories"],
    setSelectedRepositoriesEnabledGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories"]
  },
  activity: {
    checkRepoIsStarredByAuthenticatedUser: ["GET /user/starred/{owner}/{repo}"],
    deleteRepoSubscription: ["DELETE /repos/{owner}/{repo}/subscription"],
    deleteThreadSubscription: ["DELETE /notifications/threads/{thread_id}/subscription"],
    getFeeds: ["GET /feeds"],
    getRepoSubscription: ["GET /repos/{owner}/{repo}/subscription"],
    getThread: ["GET /notifications/threads/{thread_id}"],
    getThreadSubscriptionForAuthenticatedUser: ["GET /notifications/threads/{thread_id}/subscription"],
    listEventsForAuthenticatedUser: ["GET /users/{username}/events"],
    listNotificationsForAuthenticatedUser: ["GET /notifications"],
    listOrgEventsForAuthenticatedUser: ["GET /users/{username}/events/orgs/{org}"],
    listPublicEvents: ["GET /events"],
    listPublicEventsForRepoNetwork: ["GET /networks/{owner}/{repo}/events"],
    listPublicEventsForUser: ["GET /users/{username}/events/public"],
    listPublicOrgEvents: ["GET /orgs/{org}/events"],
    listReceivedEventsForUser: ["GET /users/{username}/received_events"],
    listReceivedPublicEventsForUser: ["GET /users/{username}/received_events/public"],
    listRepoEvents: ["GET /repos/{owner}/{repo}/events"],
    listRepoNotificationsForAuthenticatedUser: ["GET /repos/{owner}/{repo}/notifications"],
    listReposStarredByAuthenticatedUser: ["GET /user/starred"],
    listReposStarredByUser: ["GET /users/{username}/starred"],
    listReposWatchedByUser: ["GET /users/{username}/subscriptions"],
    listStargazersForRepo: ["GET /repos/{owner}/{repo}/stargazers"],
    listWatchedReposForAuthenticatedUser: ["GET /user/subscriptions"],
    listWatchersForRepo: ["GET /repos/{owner}/{repo}/subscribers"],
    markNotificationsAsRead: ["PUT /notifications"],
    markRepoNotificationsAsRead: ["PUT /repos/{owner}/{repo}/notifications"],
    markThreadAsRead: ["PATCH /notifications/threads/{thread_id}"],
    setRepoSubscription: ["PUT /repos/{owner}/{repo}/subscription"],
    setThreadSubscription: ["PUT /notifications/threads/{thread_id}/subscription"],
    starRepoForAuthenticatedUser: ["PUT /user/starred/{owner}/{repo}"],
    unstarRepoForAuthenticatedUser: ["DELETE /user/starred/{owner}/{repo}"]
  },
  apps: {
    addRepoToInstallation: ["PUT /user/installations/{installation_id}/repositories/{repository_id}"],
    checkToken: ["POST /applications/{client_id}/token"],
    createContentAttachment: ["POST /content_references/{content_reference_id}/attachments", {
      mediaType: {
        previews: ["corsair"]
      }
    }],
    createContentAttachmentForRepo: ["POST /repos/{owner}/{repo}/content_references/{content_reference_id}/attachments", {
      mediaType: {
        previews: ["corsair"]
      }
    }],
    createFromManifest: ["POST /app-manifests/{code}/conversions"],
    createInstallationAccessToken: ["POST /app/installations/{installation_id}/access_tokens"],
    deleteAuthorization: ["DELETE /applications/{client_id}/grant"],
    deleteInstallation: ["DELETE /app/installations/{installation_id}"],
    deleteToken: ["DELETE /applications/{client_id}/token"],
    getAuthenticated: ["GET /app"],
    getBySlug: ["GET /apps/{app_slug}"],
    getInstallation: ["GET /app/installations/{installation_id}"],
    getOrgInstallation: ["GET /orgs/{org}/installation"],
    getRepoInstallation: ["GET /repos/{owner}/{repo}/installation"],
    getSubscriptionPlanForAccount: ["GET /marketplace_listing/accounts/{account_id}"],
    getSubscriptionPlanForAccountStubbed: ["GET /marketplace_listing/stubbed/accounts/{account_id}"],
    getUserInstallation: ["GET /users/{username}/installation"],
    getWebhookConfigForApp: ["GET /app/hook/config"],
    listAccountsForPlan: ["GET /marketplace_listing/plans/{plan_id}/accounts"],
    listAccountsForPlanStubbed: ["GET /marketplace_listing/stubbed/plans/{plan_id}/accounts"],
    listInstallationReposForAuthenticatedUser: ["GET /user/installations/{installation_id}/repositories"],
    listInstallations: ["GET /app/installations"],
    listInstallationsForAuthenticatedUser: ["GET /user/installations"],
    listPlans: ["GET /marketplace_listing/plans"],
    listPlansStubbed: ["GET /marketplace_listing/stubbed/plans"],
    listReposAccessibleToInstallation: ["GET /installation/repositories"],
    listSubscriptionsForAuthenticatedUser: ["GET /user/marketplace_purchases"],
    listSubscriptionsForAuthenticatedUserStubbed: ["GET /user/marketplace_purchases/stubbed"],
    removeRepoFromInstallation: ["DELETE /user/installations/{installation_id}/repositories/{repository_id}"],
    resetToken: ["PATCH /applications/{client_id}/token"],
    revokeInstallationAccessToken: ["DELETE /installation/token"],
    scopeToken: ["POST /applications/{client_id}/token/scoped"],
    suspendInstallation: ["PUT /app/installations/{installation_id}/suspended"],
    unsuspendInstallation: ["DELETE /app/installations/{installation_id}/suspended"],
    updateWebhookConfigForApp: ["PATCH /app/hook/config"]
  },
  billing: {
    getGithubActionsBillingOrg: ["GET /orgs/{org}/settings/billing/actions"],
    getGithubActionsBillingUser: ["GET /users/{username}/settings/billing/actions"],
    getGithubPackagesBillingOrg: ["GET /orgs/{org}/settings/billing/packages"],
    getGithubPackagesBillingUser: ["GET /users/{username}/settings/billing/packages"],
    getSharedStorageBillingOrg: ["GET /orgs/{org}/settings/billing/shared-storage"],
    getSharedStorageBillingUser: ["GET /users/{username}/settings/billing/shared-storage"]
  },
  checks: {
    create: ["POST /repos/{owner}/{repo}/check-runs"],
    createSuite: ["POST /repos/{owner}/{repo}/check-suites"],
    get: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}"],
    getSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}"],
    listAnnotations: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations"],
    listForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-runs"],
    listForSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs"],
    listSuitesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-suites"],
    rerequestSuite: ["POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest"],
    setSuitesPreferences: ["PATCH /repos/{owner}/{repo}/check-suites/preferences"],
    update: ["PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}"]
  },
  codeScanning: {
    deleteAnalysis: ["DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}{?confirm_delete}"],
    getAlert: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}", {}, {
      renamedParameters: {
        alert_id: "alert_number"
      }
    }],
    getAnalysis: ["GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}"],
    getSarif: ["GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}"],
    listAlertInstances: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/code-scanning/alerts"],
    listAlertsInstances: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances", {}, {
      renamed: ["codeScanning", "listAlertInstances"]
    }],
    listRecentAnalyses: ["GET /repos/{owner}/{repo}/code-scanning/analyses"],
    updateAlert: ["PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}"],
    uploadSarif: ["POST /repos/{owner}/{repo}/code-scanning/sarifs"]
  },
  codesOfConduct: {
    getAllCodesOfConduct: ["GET /codes_of_conduct", {
      mediaType: {
        previews: ["scarlet-witch"]
      }
    }],
    getConductCode: ["GET /codes_of_conduct/{key}", {
      mediaType: {
        previews: ["scarlet-witch"]
      }
    }],
    getForRepo: ["GET /repos/{owner}/{repo}/community/code_of_conduct", {
      mediaType: {
        previews: ["scarlet-witch"]
      }
    }]
  },
  emojis: {
    get: ["GET /emojis"]
  },
  enterpriseAdmin: {
    disableSelectedOrganizationGithubActionsEnterprise: ["DELETE /enterprises/{enterprise}/actions/permissions/organizations/{org_id}"],
    enableSelectedOrganizationGithubActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/organizations/{org_id}"],
    getAllowedActionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions/selected-actions"],
    getGithubActionsPermissionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions"],
    listSelectedOrganizationsEnabledGithubActionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions/organizations"],
    setAllowedActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/selected-actions"],
    setGithubActionsPermissionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions"],
    setSelectedOrganizationsEnabledGithubActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/organizations"]
  },
  gists: {
    checkIsStarred: ["GET /gists/{gist_id}/star"],
    create: ["POST /gists"],
    createComment: ["POST /gists/{gist_id}/comments"],
    delete: ["DELETE /gists/{gist_id}"],
    deleteComment: ["DELETE /gists/{gist_id}/comments/{comment_id}"],
    fork: ["POST /gists/{gist_id}/forks"],
    get: ["GET /gists/{gist_id}"],
    getComment: ["GET /gists/{gist_id}/comments/{comment_id}"],
    getRevision: ["GET /gists/{gist_id}/{sha}"],
    list: ["GET /gists"],
    listComments: ["GET /gists/{gist_id}/comments"],
    listCommits: ["GET /gists/{gist_id}/commits"],
    listForUser: ["GET /users/{username}/gists"],
    listForks: ["GET /gists/{gist_id}/forks"],
    listPublic: ["GET /gists/public"],
    listStarred: ["GET /gists/starred"],
    star: ["PUT /gists/{gist_id}/star"],
    unstar: ["DELETE /gists/{gist_id}/star"],
    update: ["PATCH /gists/{gist_id}"],
    updateComment: ["PATCH /gists/{gist_id}/comments/{comment_id}"]
  },
  git: {
    createBlob: ["POST /repos/{owner}/{repo}/git/blobs"],
    createCommit: ["POST /repos/{owner}/{repo}/git/commits"],
    createRef: ["POST /repos/{owner}/{repo}/git/refs"],
    createTag: ["POST /repos/{owner}/{repo}/git/tags"],
    createTree: ["POST /repos/{owner}/{repo}/git/trees"],
    deleteRef: ["DELETE /repos/{owner}/{repo}/git/refs/{ref}"],
    getBlob: ["GET /repos/{owner}/{repo}/git/blobs/{file_sha}"],
    getCommit: ["GET /repos/{owner}/{repo}/git/commits/{commit_sha}"],
    getRef: ["GET /repos/{owner}/{repo}/git/ref/{ref}"],
    getTag: ["GET /repos/{owner}/{repo}/git/tags/{tag_sha}"],
    getTree: ["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"],
    listMatchingRefs: ["GET /repos/{owner}/{repo}/git/matching-refs/{ref}"],
    updateRef: ["PATCH /repos/{owner}/{repo}/git/refs/{ref}"]
  },
  gitignore: {
    getAllTemplates: ["GET /gitignore/templates"],
    getTemplate: ["GET /gitignore/templates/{name}"]
  },
  interactions: {
    getRestrictionsForAuthenticatedUser: ["GET /user/interaction-limits"],
    getRestrictionsForOrg: ["GET /orgs/{org}/interaction-limits"],
    getRestrictionsForRepo: ["GET /repos/{owner}/{repo}/interaction-limits"],
    getRestrictionsForYourPublicRepos: ["GET /user/interaction-limits", {}, {
      renamed: ["interactions", "getRestrictionsForAuthenticatedUser"]
    }],
    removeRestrictionsForAuthenticatedUser: ["DELETE /user/interaction-limits"],
    removeRestrictionsForOrg: ["DELETE /orgs/{org}/interaction-limits"],
    removeRestrictionsForRepo: ["DELETE /repos/{owner}/{repo}/interaction-limits"],
    removeRestrictionsForYourPublicRepos: ["DELETE /user/interaction-limits", {}, {
      renamed: ["interactions", "removeRestrictionsForAuthenticatedUser"]
    }],
    setRestrictionsForAuthenticatedUser: ["PUT /user/interaction-limits"],
    setRestrictionsForOrg: ["PUT /orgs/{org}/interaction-limits"],
    setRestrictionsForRepo: ["PUT /repos/{owner}/{repo}/interaction-limits"],
    setRestrictionsForYourPublicRepos: ["PUT /user/interaction-limits", {}, {
      renamed: ["interactions", "setRestrictionsForAuthenticatedUser"]
    }]
  },
  issues: {
    addAssignees: ["POST /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
    addLabels: ["POST /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    checkUserCanBeAssigned: ["GET /repos/{owner}/{repo}/assignees/{assignee}"],
    create: ["POST /repos/{owner}/{repo}/issues"],
    createComment: ["POST /repos/{owner}/{repo}/issues/{issue_number}/comments"],
    createLabel: ["POST /repos/{owner}/{repo}/labels"],
    createMilestone: ["POST /repos/{owner}/{repo}/milestones"],
    deleteComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    deleteLabel: ["DELETE /repos/{owner}/{repo}/labels/{name}"],
    deleteMilestone: ["DELETE /repos/{owner}/{repo}/milestones/{milestone_number}"],
    get: ["GET /repos/{owner}/{repo}/issues/{issue_number}"],
    getComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    getEvent: ["GET /repos/{owner}/{repo}/issues/events/{event_id}"],
    getLabel: ["GET /repos/{owner}/{repo}/labels/{name}"],
    getMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}"],
    list: ["GET /issues"],
    listAssignees: ["GET /repos/{owner}/{repo}/assignees"],
    listComments: ["GET /repos/{owner}/{repo}/issues/{issue_number}/comments"],
    listCommentsForRepo: ["GET /repos/{owner}/{repo}/issues/comments"],
    listEvents: ["GET /repos/{owner}/{repo}/issues/{issue_number}/events"],
    listEventsForRepo: ["GET /repos/{owner}/{repo}/issues/events"],
    listEventsForTimeline: ["GET /repos/{owner}/{repo}/issues/{issue_number}/timeline", {
      mediaType: {
        previews: ["mockingbird"]
      }
    }],
    listForAuthenticatedUser: ["GET /user/issues"],
    listForOrg: ["GET /orgs/{org}/issues"],
    listForRepo: ["GET /repos/{owner}/{repo}/issues"],
    listLabelsForMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels"],
    listLabelsForRepo: ["GET /repos/{owner}/{repo}/labels"],
    listLabelsOnIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    listMilestones: ["GET /repos/{owner}/{repo}/milestones"],
    lock: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    removeAllLabels: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    removeAssignees: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
    removeLabel: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}"],
    setLabels: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    unlock: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    update: ["PATCH /repos/{owner}/{repo}/issues/{issue_number}"],
    updateComment: ["PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    updateLabel: ["PATCH /repos/{owner}/{repo}/labels/{name}"],
    updateMilestone: ["PATCH /repos/{owner}/{repo}/milestones/{milestone_number}"]
  },
  licenses: {
    get: ["GET /licenses/{license}"],
    getAllCommonlyUsed: ["GET /licenses"],
    getForRepo: ["GET /repos/{owner}/{repo}/license"]
  },
  markdown: {
    render: ["POST /markdown"],
    renderRaw: ["POST /markdown/raw", {
      headers: {
        "content-type": "text/plain; charset=utf-8"
      }
    }]
  },
  meta: {
    get: ["GET /meta"],
    getOctocat: ["GET /octocat"],
    getZen: ["GET /zen"],
    root: ["GET /"]
  },
  migrations: {
    cancelImport: ["DELETE /repos/{owner}/{repo}/import"],
    deleteArchiveForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    deleteArchiveForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    downloadArchiveForOrg: ["GET /orgs/{org}/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getArchiveForAuthenticatedUser: ["GET /user/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getCommitAuthors: ["GET /repos/{owner}/{repo}/import/authors"],
    getImportStatus: ["GET /repos/{owner}/{repo}/import"],
    getLargeFiles: ["GET /repos/{owner}/{repo}/import/large_files"],
    getStatusForAuthenticatedUser: ["GET /user/migrations/{migration_id}", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getStatusForOrg: ["GET /orgs/{org}/migrations/{migration_id}", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listForAuthenticatedUser: ["GET /user/migrations", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listForOrg: ["GET /orgs/{org}/migrations", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listReposForOrg: ["GET /orgs/{org}/migrations/{migration_id}/repositories", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listReposForUser: ["GET /user/migrations/{migration_id}/repositories", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    mapCommitAuthor: ["PATCH /repos/{owner}/{repo}/import/authors/{author_id}"],
    setLfsPreference: ["PATCH /repos/{owner}/{repo}/import/lfs"],
    startForAuthenticatedUser: ["POST /user/migrations"],
    startForOrg: ["POST /orgs/{org}/migrations"],
    startImport: ["PUT /repos/{owner}/{repo}/import"],
    unlockRepoForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    unlockRepoForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    updateImport: ["PATCH /repos/{owner}/{repo}/import"]
  },
  orgs: {
    blockUser: ["PUT /orgs/{org}/blocks/{username}"],
    cancelInvitation: ["DELETE /orgs/{org}/invitations/{invitation_id}"],
    checkBlockedUser: ["GET /orgs/{org}/blocks/{username}"],
    checkMembershipForUser: ["GET /orgs/{org}/members/{username}"],
    checkPublicMembershipForUser: ["GET /orgs/{org}/public_members/{username}"],
    convertMemberToOutsideCollaborator: ["PUT /orgs/{org}/outside_collaborators/{username}"],
    createInvitation: ["POST /orgs/{org}/invitations"],
    createWebhook: ["POST /orgs/{org}/hooks"],
    deleteWebhook: ["DELETE /orgs/{org}/hooks/{hook_id}"],
    get: ["GET /orgs/{org}"],
    getMembershipForAuthenticatedUser: ["GET /user/memberships/orgs/{org}"],
    getMembershipForUser: ["GET /orgs/{org}/memberships/{username}"],
    getWebhook: ["GET /orgs/{org}/hooks/{hook_id}"],
    getWebhookConfigForOrg: ["GET /orgs/{org}/hooks/{hook_id}/config"],
    list: ["GET /organizations"],
    listAppInstallations: ["GET /orgs/{org}/installations"],
    listBlockedUsers: ["GET /orgs/{org}/blocks"],
    listFailedInvitations: ["GET /orgs/{org}/failed_invitations"],
    listForAuthenticatedUser: ["GET /user/orgs"],
    listForUser: ["GET /users/{username}/orgs"],
    listInvitationTeams: ["GET /orgs/{org}/invitations/{invitation_id}/teams"],
    listMembers: ["GET /orgs/{org}/members"],
    listMembershipsForAuthenticatedUser: ["GET /user/memberships/orgs"],
    listOutsideCollaborators: ["GET /orgs/{org}/outside_collaborators"],
    listPendingInvitations: ["GET /orgs/{org}/invitations"],
    listPublicMembers: ["GET /orgs/{org}/public_members"],
    listWebhooks: ["GET /orgs/{org}/hooks"],
    pingWebhook: ["POST /orgs/{org}/hooks/{hook_id}/pings"],
    removeMember: ["DELETE /orgs/{org}/members/{username}"],
    removeMembershipForUser: ["DELETE /orgs/{org}/memberships/{username}"],
    removeOutsideCollaborator: ["DELETE /orgs/{org}/outside_collaborators/{username}"],
    removePublicMembershipForAuthenticatedUser: ["DELETE /orgs/{org}/public_members/{username}"],
    setMembershipForUser: ["PUT /orgs/{org}/memberships/{username}"],
    setPublicMembershipForAuthenticatedUser: ["PUT /orgs/{org}/public_members/{username}"],
    unblockUser: ["DELETE /orgs/{org}/blocks/{username}"],
    update: ["PATCH /orgs/{org}"],
    updateMembershipForAuthenticatedUser: ["PATCH /user/memberships/orgs/{org}"],
    updateWebhook: ["PATCH /orgs/{org}/hooks/{hook_id}"],
    updateWebhookConfigForOrg: ["PATCH /orgs/{org}/hooks/{hook_id}/config"]
  },
  packages: {
    deletePackageForAuthenticatedUser: ["DELETE /user/packages/{package_type}/{package_name}"],
    deletePackageForOrg: ["DELETE /orgs/{org}/packages/{package_type}/{package_name}"],
    deletePackageVersionForAuthenticatedUser: ["DELETE /user/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    deletePackageVersionForOrg: ["DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    getAllPackageVersionsForAPackageOwnedByAnOrg: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions", {}, {
      renamed: ["packages", "getAllPackageVersionsForPackageOwnedByOrg"]
    }],
    getAllPackageVersionsForAPackageOwnedByTheAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions", {}, {
      renamed: ["packages", "getAllPackageVersionsForPackageOwnedByAuthenticatedUser"]
    }],
    getAllPackageVersionsForPackageOwnedByAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions"],
    getAllPackageVersionsForPackageOwnedByOrg: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions"],
    getAllPackageVersionsForPackageOwnedByUser: ["GET /users/{username}/packages/{package_type}/{package_name}/versions"],
    getPackageForAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}"],
    getPackageForOrganization: ["GET /orgs/{org}/packages/{package_type}/{package_name}"],
    getPackageForUser: ["GET /users/{username}/packages/{package_type}/{package_name}"],
    getPackageVersionForAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    getPackageVersionForOrganization: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    getPackageVersionForUser: ["GET /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    restorePackageForAuthenticatedUser: ["POST /user/packages/{package_type}/{package_name}/restore{?token}"],
    restorePackageForOrg: ["POST /orgs/{org}/packages/{package_type}/{package_name}/restore{?token}"],
    restorePackageVersionForAuthenticatedUser: ["POST /user/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"],
    restorePackageVersionForOrg: ["POST /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"]
  },
  projects: {
    addCollaborator: ["PUT /projects/{project_id}/collaborators/{username}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createCard: ["POST /projects/columns/{column_id}/cards", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createColumn: ["POST /projects/{project_id}/columns", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForAuthenticatedUser: ["POST /user/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForOrg: ["POST /orgs/{org}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForRepo: ["POST /repos/{owner}/{repo}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    delete: ["DELETE /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    deleteCard: ["DELETE /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    deleteColumn: ["DELETE /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    get: ["GET /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getCard: ["GET /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getColumn: ["GET /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getPermissionForUser: ["GET /projects/{project_id}/collaborators/{username}/permission", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listCards: ["GET /projects/columns/{column_id}/cards", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listCollaborators: ["GET /projects/{project_id}/collaborators", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listColumns: ["GET /projects/{project_id}/columns", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForOrg: ["GET /orgs/{org}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForRepo: ["GET /repos/{owner}/{repo}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForUser: ["GET /users/{username}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    moveCard: ["POST /projects/columns/cards/{card_id}/moves", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    moveColumn: ["POST /projects/columns/{column_id}/moves", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    removeCollaborator: ["DELETE /projects/{project_id}/collaborators/{username}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    update: ["PATCH /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    updateCard: ["PATCH /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    updateColumn: ["PATCH /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }]
  },
  pulls: {
    checkIfMerged: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    create: ["POST /repos/{owner}/{repo}/pulls"],
    createReplyForReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies"],
    createReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    createReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
    deletePendingReview: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    deleteReviewComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
    dismissReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals"],
    get: ["GET /repos/{owner}/{repo}/pulls/{pull_number}"],
    getReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    getReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
    list: ["GET /repos/{owner}/{repo}/pulls"],
    listCommentsForReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments"],
    listCommits: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/commits"],
    listFiles: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/files"],
    listRequestedReviewers: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    listReviewComments: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
    listReviewCommentsForRepo: ["GET /repos/{owner}/{repo}/pulls/comments"],
    listReviews: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    merge: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    removeRequestedReviewers: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    requestReviewers: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    submitReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events"],
    update: ["PATCH /repos/{owner}/{repo}/pulls/{pull_number}"],
    updateBranch: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch", {
      mediaType: {
        previews: ["lydian"]
      }
    }],
    updateReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    updateReviewComment: ["PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}"]
  },
  rateLimit: {
    get: ["GET /rate_limit"]
  },
  reactions: {
    createForCommitComment: ["POST /repos/{owner}/{repo}/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForIssue: ["POST /repos/{owner}/{repo}/issues/{issue_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForIssueComment: ["POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForPullRequestReviewComment: ["POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForRelease: ["POST /repos/{owner}/{repo}/releases/{release_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForTeamDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForTeamDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForIssue: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForIssueComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForPullRequestComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForTeamDiscussion: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForTeamDiscussionComment: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteLegacy: ["DELETE /reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }, {
      deprecated: "octokit.rest.reactions.deleteLegacy() is deprecated, see https://docs.github.com/rest/reference/reactions/#delete-a-reaction-legacy"
    }],
    listForCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForIssueComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForPullRequestReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForTeamDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForTeamDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }]
  },
  repos: {
    acceptInvitation: ["PATCH /user/repository_invitations/{invitation_id}"],
    addAppAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    addCollaborator: ["PUT /repos/{owner}/{repo}/collaborators/{username}"],
    addStatusCheckContexts: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    addTeamAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    addUserAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    checkCollaborator: ["GET /repos/{owner}/{repo}/collaborators/{username}"],
    checkVulnerabilityAlerts: ["GET /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    compareCommits: ["GET /repos/{owner}/{repo}/compare/{base}...{head}"],
    compareCommitsWithBasehead: ["GET /repos/{owner}/{repo}/compare/{basehead}"],
    createCommitComment: ["POST /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
    createCommitSignatureProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    createCommitStatus: ["POST /repos/{owner}/{repo}/statuses/{sha}"],
    createDeployKey: ["POST /repos/{owner}/{repo}/keys"],
    createDeployment: ["POST /repos/{owner}/{repo}/deployments"],
    createDeploymentStatus: ["POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
    createDispatchEvent: ["POST /repos/{owner}/{repo}/dispatches"],
    createForAuthenticatedUser: ["POST /user/repos"],
    createFork: ["POST /repos/{owner}/{repo}/forks"],
    createInOrg: ["POST /orgs/{org}/repos"],
    createOrUpdateEnvironment: ["PUT /repos/{owner}/{repo}/environments/{environment_name}"],
    createOrUpdateFileContents: ["PUT /repos/{owner}/{repo}/contents/{path}"],
    createPagesSite: ["POST /repos/{owner}/{repo}/pages", {
      mediaType: {
        previews: ["switcheroo"]
      }
    }],
    createRelease: ["POST /repos/{owner}/{repo}/releases"],
    createUsingTemplate: ["POST /repos/{template_owner}/{template_repo}/generate", {
      mediaType: {
        previews: ["baptiste"]
      }
    }],
    createWebhook: ["POST /repos/{owner}/{repo}/hooks"],
    declineInvitation: ["DELETE /user/repository_invitations/{invitation_id}"],
    delete: ["DELETE /repos/{owner}/{repo}"],
    deleteAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
    deleteAdminBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    deleteAnEnvironment: ["DELETE /repos/{owner}/{repo}/environments/{environment_name}"],
    deleteBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection"],
    deleteCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}"],
    deleteCommitSignatureProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    deleteDeployKey: ["DELETE /repos/{owner}/{repo}/keys/{key_id}"],
    deleteDeployment: ["DELETE /repos/{owner}/{repo}/deployments/{deployment_id}"],
    deleteFile: ["DELETE /repos/{owner}/{repo}/contents/{path}"],
    deleteInvitation: ["DELETE /repos/{owner}/{repo}/invitations/{invitation_id}"],
    deletePagesSite: ["DELETE /repos/{owner}/{repo}/pages", {
      mediaType: {
        previews: ["switcheroo"]
      }
    }],
    deletePullRequestReviewProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    deleteRelease: ["DELETE /repos/{owner}/{repo}/releases/{release_id}"],
    deleteReleaseAsset: ["DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    deleteWebhook: ["DELETE /repos/{owner}/{repo}/hooks/{hook_id}"],
    disableAutomatedSecurityFixes: ["DELETE /repos/{owner}/{repo}/automated-security-fixes", {
      mediaType: {
        previews: ["london"]
      }
    }],
    disableVulnerabilityAlerts: ["DELETE /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    downloadArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}", {}, {
      renamed: ["repos", "downloadZipballArchive"]
    }],
    downloadTarballArchive: ["GET /repos/{owner}/{repo}/tarball/{ref}"],
    downloadZipballArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}"],
    enableAutomatedSecurityFixes: ["PUT /repos/{owner}/{repo}/automated-security-fixes", {
      mediaType: {
        previews: ["london"]
      }
    }],
    enableVulnerabilityAlerts: ["PUT /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    get: ["GET /repos/{owner}/{repo}"],
    getAccessRestrictions: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
    getAdminBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    getAllEnvironments: ["GET /repos/{owner}/{repo}/environments"],
    getAllStatusCheckContexts: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts"],
    getAllTopics: ["GET /repos/{owner}/{repo}/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    getAppsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps"],
    getBranch: ["GET /repos/{owner}/{repo}/branches/{branch}"],
    getBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection"],
    getClones: ["GET /repos/{owner}/{repo}/traffic/clones"],
    getCodeFrequencyStats: ["GET /repos/{owner}/{repo}/stats/code_frequency"],
    getCollaboratorPermissionLevel: ["GET /repos/{owner}/{repo}/collaborators/{username}/permission"],
    getCombinedStatusForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/status"],
    getCommit: ["GET /repos/{owner}/{repo}/commits/{ref}"],
    getCommitActivityStats: ["GET /repos/{owner}/{repo}/stats/commit_activity"],
    getCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}"],
    getCommitSignatureProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    getCommunityProfileMetrics: ["GET /repos/{owner}/{repo}/community/profile"],
    getContent: ["GET /repos/{owner}/{repo}/contents/{path}"],
    getContributorsStats: ["GET /repos/{owner}/{repo}/stats/contributors"],
    getDeployKey: ["GET /repos/{owner}/{repo}/keys/{key_id}"],
    getDeployment: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}"],
    getDeploymentStatus: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}"],
    getEnvironment: ["GET /repos/{owner}/{repo}/environments/{environment_name}"],
    getLatestPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/latest"],
    getLatestRelease: ["GET /repos/{owner}/{repo}/releases/latest"],
    getPages: ["GET /repos/{owner}/{repo}/pages"],
    getPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/{build_id}"],
    getPagesHealthCheck: ["GET /repos/{owner}/{repo}/pages/health"],
    getParticipationStats: ["GET /repos/{owner}/{repo}/stats/participation"],
    getPullRequestReviewProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    getPunchCardStats: ["GET /repos/{owner}/{repo}/stats/punch_card"],
    getReadme: ["GET /repos/{owner}/{repo}/readme"],
    getReadmeInDirectory: ["GET /repos/{owner}/{repo}/readme/{dir}"],
    getRelease: ["GET /repos/{owner}/{repo}/releases/{release_id}"],
    getReleaseAsset: ["GET /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    getReleaseByTag: ["GET /repos/{owner}/{repo}/releases/tags/{tag}"],
    getStatusChecksProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    getTeamsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams"],
    getTopPaths: ["GET /repos/{owner}/{repo}/traffic/popular/paths"],
    getTopReferrers: ["GET /repos/{owner}/{repo}/traffic/popular/referrers"],
    getUsersWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users"],
    getViews: ["GET /repos/{owner}/{repo}/traffic/views"],
    getWebhook: ["GET /repos/{owner}/{repo}/hooks/{hook_id}"],
    getWebhookConfigForRepo: ["GET /repos/{owner}/{repo}/hooks/{hook_id}/config"],
    listBranches: ["GET /repos/{owner}/{repo}/branches"],
    listBranchesForHeadCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head", {
      mediaType: {
        previews: ["groot"]
      }
    }],
    listCollaborators: ["GET /repos/{owner}/{repo}/collaborators"],
    listCommentsForCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
    listCommitCommentsForRepo: ["GET /repos/{owner}/{repo}/comments"],
    listCommitStatusesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/statuses"],
    listCommits: ["GET /repos/{owner}/{repo}/commits"],
    listContributors: ["GET /repos/{owner}/{repo}/contributors"],
    listDeployKeys: ["GET /repos/{owner}/{repo}/keys"],
    listDeploymentStatuses: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
    listDeployments: ["GET /repos/{owner}/{repo}/deployments"],
    listForAuthenticatedUser: ["GET /user/repos"],
    listForOrg: ["GET /orgs/{org}/repos"],
    listForUser: ["GET /users/{username}/repos"],
    listForks: ["GET /repos/{owner}/{repo}/forks"],
    listInvitations: ["GET /repos/{owner}/{repo}/invitations"],
    listInvitationsForAuthenticatedUser: ["GET /user/repository_invitations"],
    listLanguages: ["GET /repos/{owner}/{repo}/languages"],
    listPagesBuilds: ["GET /repos/{owner}/{repo}/pages/builds"],
    listPublic: ["GET /repositories"],
    listPullRequestsAssociatedWithCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls", {
      mediaType: {
        previews: ["groot"]
      }
    }],
    listReleaseAssets: ["GET /repos/{owner}/{repo}/releases/{release_id}/assets"],
    listReleases: ["GET /repos/{owner}/{repo}/releases"],
    listTags: ["GET /repos/{owner}/{repo}/tags"],
    listTeams: ["GET /repos/{owner}/{repo}/teams"],
    listWebhooks: ["GET /repos/{owner}/{repo}/hooks"],
    merge: ["POST /repos/{owner}/{repo}/merges"],
    pingWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/pings"],
    removeAppAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    removeCollaborator: ["DELETE /repos/{owner}/{repo}/collaborators/{username}"],
    removeStatusCheckContexts: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    removeStatusCheckProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    removeTeamAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    removeUserAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    renameBranch: ["POST /repos/{owner}/{repo}/branches/{branch}/rename"],
    replaceAllTopics: ["PUT /repos/{owner}/{repo}/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    requestPagesBuild: ["POST /repos/{owner}/{repo}/pages/builds"],
    setAdminBranchProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    setAppAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    setStatusCheckContexts: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    setTeamAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    setUserAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    testPushWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/tests"],
    transfer: ["POST /repos/{owner}/{repo}/transfer"],
    update: ["PATCH /repos/{owner}/{repo}"],
    updateBranchProtection: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection"],
    updateCommitComment: ["PATCH /repos/{owner}/{repo}/comments/{comment_id}"],
    updateInformationAboutPagesSite: ["PUT /repos/{owner}/{repo}/pages"],
    updateInvitation: ["PATCH /repos/{owner}/{repo}/invitations/{invitation_id}"],
    updatePullRequestReviewProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    updateRelease: ["PATCH /repos/{owner}/{repo}/releases/{release_id}"],
    updateReleaseAsset: ["PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    updateStatusCheckPotection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks", {}, {
      renamed: ["repos", "updateStatusCheckProtection"]
    }],
    updateStatusCheckProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    updateWebhook: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}"],
    updateWebhookConfigForRepo: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config"],
    uploadReleaseAsset: ["POST /repos/{owner}/{repo}/releases/{release_id}/assets{?name,label}", {
      baseUrl: "https://uploads.github.com"
    }]
  },
  search: {
    code: ["GET /search/code"],
    commits: ["GET /search/commits", {
      mediaType: {
        previews: ["cloak"]
      }
    }],
    issuesAndPullRequests: ["GET /search/issues"],
    labels: ["GET /search/labels"],
    repos: ["GET /search/repositories"],
    topics: ["GET /search/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    users: ["GET /search/users"]
  },
  secretScanning: {
    getAlert: ["GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/secret-scanning/alerts"],
    updateAlert: ["PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"]
  },
  teams: {
    addOrUpdateMembershipForUserInOrg: ["PUT /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    addOrUpdateProjectPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    addOrUpdateRepoPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    checkPermissionsForProjectInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    checkPermissionsForRepoInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    create: ["POST /orgs/{org}/teams"],
    createDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
    createDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions"],
    deleteDiscussionCommentInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    deleteDiscussionInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    deleteInOrg: ["DELETE /orgs/{org}/teams/{team_slug}"],
    getByName: ["GET /orgs/{org}/teams/{team_slug}"],
    getDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    getDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    getMembershipForUserInOrg: ["GET /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    list: ["GET /orgs/{org}/teams"],
    listChildInOrg: ["GET /orgs/{org}/teams/{team_slug}/teams"],
    listDiscussionCommentsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
    listDiscussionsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions"],
    listForAuthenticatedUser: ["GET /user/teams"],
    listMembersInOrg: ["GET /orgs/{org}/teams/{team_slug}/members"],
    listPendingInvitationsInOrg: ["GET /orgs/{org}/teams/{team_slug}/invitations"],
    listProjectsInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listReposInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos"],
    removeMembershipForUserInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    removeProjectInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/projects/{project_id}"],
    removeRepoInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    updateDiscussionCommentInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    updateDiscussionInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    updateInOrg: ["PATCH /orgs/{org}/teams/{team_slug}"]
  },
  users: {
    addEmailForAuthenticated: ["POST /user/emails"],
    block: ["PUT /user/blocks/{username}"],
    checkBlocked: ["GET /user/blocks/{username}"],
    checkFollowingForUser: ["GET /users/{username}/following/{target_user}"],
    checkPersonIsFollowedByAuthenticated: ["GET /user/following/{username}"],
    createGpgKeyForAuthenticated: ["POST /user/gpg_keys"],
    createPublicSshKeyForAuthenticated: ["POST /user/keys"],
    deleteEmailForAuthenticated: ["DELETE /user/emails"],
    deleteGpgKeyForAuthenticated: ["DELETE /user/gpg_keys/{gpg_key_id}"],
    deletePublicSshKeyForAuthenticated: ["DELETE /user/keys/{key_id}"],
    follow: ["PUT /user/following/{username}"],
    getAuthenticated: ["GET /user"],
    getByUsername: ["GET /users/{username}"],
    getContextForUser: ["GET /users/{username}/hovercard"],
    getGpgKeyForAuthenticated: ["GET /user/gpg_keys/{gpg_key_id}"],
    getPublicSshKeyForAuthenticated: ["GET /user/keys/{key_id}"],
    list: ["GET /users"],
    listBlockedByAuthenticated: ["GET /user/blocks"],
    listEmailsForAuthenticated: ["GET /user/emails"],
    listFollowedByAuthenticated: ["GET /user/following"],
    listFollowersForAuthenticatedUser: ["GET /user/followers"],
    listFollowersForUser: ["GET /users/{username}/followers"],
    listFollowingForUser: ["GET /users/{username}/following"],
    listGpgKeysForAuthenticated: ["GET /user/gpg_keys"],
    listGpgKeysForUser: ["GET /users/{username}/gpg_keys"],
    listPublicEmailsForAuthenticated: ["GET /user/public_emails"],
    listPublicKeysForUser: ["GET /users/{username}/keys"],
    listPublicSshKeysForAuthenticated: ["GET /user/keys"],
    setPrimaryEmailVisibilityForAuthenticated: ["PATCH /user/email/visibility"],
    unblock: ["DELETE /user/blocks/{username}"],
    unfollow: ["DELETE /user/following/{username}"],
    updateAuthenticated: ["PATCH /user"]
  }
};

const VERSION$1 = "5.3.6";

function endpointsToMethods(octokit, endpointsMap) {
  const newMethods = {};

  for (const [scope, endpoints] of Object.entries(endpointsMap)) {
    for (const [methodName, endpoint] of Object.entries(endpoints)) {
      const [route, defaults, decorations] = endpoint;
      const [method, url] = route.split(/ /);
      const endpointDefaults = Object.assign({
        method,
        url
      }, defaults);

      if (!newMethods[scope]) {
        newMethods[scope] = {};
      }

      const scopeMethods = newMethods[scope];

      if (decorations) {
        scopeMethods[methodName] = decorate(octokit, scope, methodName, endpointDefaults, decorations);
        continue;
      }

      scopeMethods[methodName] = octokit.request.defaults(endpointDefaults);
    }
  }

  return newMethods;
}

function decorate(octokit, scope, methodName, defaults, decorations) {
  const requestWithDefaults = octokit.request.defaults(defaults);
  /* istanbul ignore next */

  function withDecorations(...args) {
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488
    let options = requestWithDefaults.endpoint.merge(...args); // There are currently no other decorations than `.mapToData`

    if (decorations.mapToData) {
      options = Object.assign({}, options, {
        data: options[decorations.mapToData],
        [decorations.mapToData]: undefined
      });
      return requestWithDefaults(options);
    }

    if (decorations.renamed) {
      const [newScope, newMethodName] = decorations.renamed;
      octokit.log.warn(`octokit.${scope}.${methodName}() has been renamed to octokit.${newScope}.${newMethodName}()`);
    }

    if (decorations.deprecated) {
      octokit.log.warn(decorations.deprecated);
    }

    if (decorations.renamedParameters) {
      // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488
      const options = requestWithDefaults.endpoint.merge(...args);

      for (const [name, alias] of Object.entries(decorations.renamedParameters)) {
        if (name in options) {
          octokit.log.warn(`"${name}" parameter is deprecated for "octokit.${scope}.${methodName}()". Use "${alias}" instead`);

          if (!(alias in options)) {
            options[alias] = options[name];
          }

          delete options[name];
        }
      }

      return requestWithDefaults(options);
    } // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488


    return requestWithDefaults(...args);
  }

  return Object.assign(withDecorations, requestWithDefaults);
}

function restEndpointMethods(octokit) {
  const api = endpointsToMethods(octokit, Endpoints);
  return {
    rest: api
  };
}
restEndpointMethods.VERSION = VERSION$1;
function legacyRestEndpointMethods(octokit) {
  const api = endpointsToMethods(octokit, Endpoints);
  return _objectSpread2$1(_objectSpread2$1({}, api), {}, {
    rest: api
  });
}
legacyRestEndpointMethods.VERSION = VERSION$1;

distNode$1.legacyRestEndpointMethods = legacyRestEndpointMethods;
distNode$1.restEndpointMethods = restEndpointMethods;

var distNode = {};

Object.defineProperty(distNode, '__esModule', { value: true });

const VERSION = "2.13.6";

function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$2(Object(source), true).forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$2(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/**
 * Some “list” response that can be paginated have a different response structure
 *
 * They have a `total_count` key in the response (search also has `incomplete_results`,
 * /installation/repositories also has `repository_selection`), as well as a key with
 * the list of the items which name varies from endpoint to endpoint.
 *
 * Octokit normalizes these responses so that paginated results are always returned following
 * the same structure. One challenge is that if the list response has only one page, no Link
 * header is provided, so this header alone is not sufficient to check wether a response is
 * paginated or not.
 *
 * We check if a "total_count" key is present in the response data, but also make sure that
 * a "url" property is not, as the "Get the combined status for a specific ref" endpoint would
 * otherwise match: https://developer.github.com/v3/repos/statuses/#get-the-combined-status-for-a-specific-ref
 */
function normalizePaginatedListResponse(response) {
  // endpoints can respond with 204 if repository is empty
  if (!response.data) {
    return _objectSpread2(_objectSpread2({}, response), {}, {
      data: []
    });
  }

  const responseNeedsNormalization = "total_count" in response.data && !("url" in response.data);
  if (!responseNeedsNormalization) return response; // keep the additional properties intact as there is currently no other way
  // to retrieve the same information.

  const incompleteResults = response.data.incomplete_results;
  const repositorySelection = response.data.repository_selection;
  const totalCount = response.data.total_count;
  delete response.data.incomplete_results;
  delete response.data.repository_selection;
  delete response.data.total_count;
  const namespaceKey = Object.keys(response.data)[0];
  const data = response.data[namespaceKey];
  response.data = data;

  if (typeof incompleteResults !== "undefined") {
    response.data.incomplete_results = incompleteResults;
  }

  if (typeof repositorySelection !== "undefined") {
    response.data.repository_selection = repositorySelection;
  }

  response.data.total_count = totalCount;
  return response;
}

function iterator(octokit, route, parameters) {
  const options = typeof route === "function" ? route.endpoint(parameters) : octokit.request.endpoint(route, parameters);
  const requestMethod = typeof route === "function" ? route : octokit.request;
  const method = options.method;
  const headers = options.headers;
  let url = options.url;
  return {
    [Symbol.asyncIterator]: () => ({
      async next() {
        if (!url) return {
          done: true
        };

        try {
          const response = await requestMethod({
            method,
            url,
            headers
          });
          const normalizedResponse = normalizePaginatedListResponse(response); // `response.headers.link` format:
          // '<https://api.github.com/users/aseemk/followers?page=2>; rel="next", <https://api.github.com/users/aseemk/followers?page=2>; rel="last"'
          // sets `url` to undefined if "next" URL is not present or `link` header is not set

          url = ((normalizedResponse.headers.link || "").match(/<([^>]+)>;\s*rel="next"/) || [])[1];
          return {
            value: normalizedResponse
          };
        } catch (error) {
          if (error.status !== 409) throw error;
          url = "";
          return {
            value: {
              status: 200,
              headers: {},
              data: []
            }
          };
        }
      }

    })
  };
}

function paginate(octokit, route, parameters, mapFn) {
  if (typeof parameters === "function") {
    mapFn = parameters;
    parameters = undefined;
  }

  return gather(octokit, [], iterator(octokit, route, parameters)[Symbol.asyncIterator](), mapFn);
}

function gather(octokit, results, iterator, mapFn) {
  return iterator.next().then(result => {
    if (result.done) {
      return results;
    }

    let earlyExit = false;

    function done() {
      earlyExit = true;
    }

    results = results.concat(mapFn ? mapFn(result.value, done) : result.value.data);

    if (earlyExit) {
      return results;
    }

    return gather(octokit, results, iterator, mapFn);
  });
}

const composePaginateRest = Object.assign(paginate, {
  iterator
});

const paginatingEndpoints = ["GET /app/installations", "GET /applications/grants", "GET /authorizations", "GET /enterprises/{enterprise}/actions/permissions/organizations", "GET /enterprises/{enterprise}/actions/runner-groups", "GET /enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/organizations", "GET /enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/runners", "GET /enterprises/{enterprise}/actions/runners", "GET /enterprises/{enterprise}/actions/runners/downloads", "GET /events", "GET /gists", "GET /gists/public", "GET /gists/starred", "GET /gists/{gist_id}/comments", "GET /gists/{gist_id}/commits", "GET /gists/{gist_id}/forks", "GET /installation/repositories", "GET /issues", "GET /marketplace_listing/plans", "GET /marketplace_listing/plans/{plan_id}/accounts", "GET /marketplace_listing/stubbed/plans", "GET /marketplace_listing/stubbed/plans/{plan_id}/accounts", "GET /networks/{owner}/{repo}/events", "GET /notifications", "GET /organizations", "GET /orgs/{org}/actions/permissions/repositories", "GET /orgs/{org}/actions/runner-groups", "GET /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories", "GET /orgs/{org}/actions/runner-groups/{runner_group_id}/runners", "GET /orgs/{org}/actions/runners", "GET /orgs/{org}/actions/runners/downloads", "GET /orgs/{org}/actions/secrets", "GET /orgs/{org}/actions/secrets/{secret_name}/repositories", "GET /orgs/{org}/blocks", "GET /orgs/{org}/credential-authorizations", "GET /orgs/{org}/events", "GET /orgs/{org}/failed_invitations", "GET /orgs/{org}/hooks", "GET /orgs/{org}/installations", "GET /orgs/{org}/invitations", "GET /orgs/{org}/invitations/{invitation_id}/teams", "GET /orgs/{org}/issues", "GET /orgs/{org}/members", "GET /orgs/{org}/migrations", "GET /orgs/{org}/migrations/{migration_id}/repositories", "GET /orgs/{org}/outside_collaborators", "GET /orgs/{org}/projects", "GET /orgs/{org}/public_members", "GET /orgs/{org}/repos", "GET /orgs/{org}/team-sync/groups", "GET /orgs/{org}/teams", "GET /orgs/{org}/teams/{team_slug}/discussions", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", "GET /orgs/{org}/teams/{team_slug}/invitations", "GET /orgs/{org}/teams/{team_slug}/members", "GET /orgs/{org}/teams/{team_slug}/projects", "GET /orgs/{org}/teams/{team_slug}/repos", "GET /orgs/{org}/teams/{team_slug}/team-sync/group-mappings", "GET /orgs/{org}/teams/{team_slug}/teams", "GET /projects/columns/{column_id}/cards", "GET /projects/{project_id}/collaborators", "GET /projects/{project_id}/columns", "GET /repos/{owner}/{repo}/actions/artifacts", "GET /repos/{owner}/{repo}/actions/runners", "GET /repos/{owner}/{repo}/actions/runners/downloads", "GET /repos/{owner}/{repo}/actions/runs", "GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts", "GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs", "GET /repos/{owner}/{repo}/actions/secrets", "GET /repos/{owner}/{repo}/actions/workflows", "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs", "GET /repos/{owner}/{repo}/assignees", "GET /repos/{owner}/{repo}/branches", "GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations", "GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs", "GET /repos/{owner}/{repo}/code-scanning/alerts", "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances", "GET /repos/{owner}/{repo}/code-scanning/analyses", "GET /repos/{owner}/{repo}/collaborators", "GET /repos/{owner}/{repo}/comments", "GET /repos/{owner}/{repo}/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/commits", "GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head", "GET /repos/{owner}/{repo}/commits/{commit_sha}/comments", "GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls", "GET /repos/{owner}/{repo}/commits/{ref}/check-runs", "GET /repos/{owner}/{repo}/commits/{ref}/check-suites", "GET /repos/{owner}/{repo}/commits/{ref}/statuses", "GET /repos/{owner}/{repo}/contributors", "GET /repos/{owner}/{repo}/deployments", "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses", "GET /repos/{owner}/{repo}/events", "GET /repos/{owner}/{repo}/forks", "GET /repos/{owner}/{repo}/git/matching-refs/{ref}", "GET /repos/{owner}/{repo}/hooks", "GET /repos/{owner}/{repo}/invitations", "GET /repos/{owner}/{repo}/issues", "GET /repos/{owner}/{repo}/issues/comments", "GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/issues/events", "GET /repos/{owner}/{repo}/issues/{issue_number}/comments", "GET /repos/{owner}/{repo}/issues/{issue_number}/events", "GET /repos/{owner}/{repo}/issues/{issue_number}/labels", "GET /repos/{owner}/{repo}/issues/{issue_number}/reactions", "GET /repos/{owner}/{repo}/issues/{issue_number}/timeline", "GET /repos/{owner}/{repo}/keys", "GET /repos/{owner}/{repo}/labels", "GET /repos/{owner}/{repo}/milestones", "GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels", "GET /repos/{owner}/{repo}/notifications", "GET /repos/{owner}/{repo}/pages/builds", "GET /repos/{owner}/{repo}/projects", "GET /repos/{owner}/{repo}/pulls", "GET /repos/{owner}/{repo}/pulls/comments", "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/pulls/{pull_number}/comments", "GET /repos/{owner}/{repo}/pulls/{pull_number}/commits", "GET /repos/{owner}/{repo}/pulls/{pull_number}/files", "GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers", "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews", "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments", "GET /repos/{owner}/{repo}/releases", "GET /repos/{owner}/{repo}/releases/{release_id}/assets", "GET /repos/{owner}/{repo}/secret-scanning/alerts", "GET /repos/{owner}/{repo}/stargazers", "GET /repos/{owner}/{repo}/subscribers", "GET /repos/{owner}/{repo}/tags", "GET /repos/{owner}/{repo}/teams", "GET /repositories", "GET /repositories/{repository_id}/environments/{environment_name}/secrets", "GET /scim/v2/enterprises/{enterprise}/Groups", "GET /scim/v2/enterprises/{enterprise}/Users", "GET /scim/v2/organizations/{org}/Users", "GET /search/code", "GET /search/commits", "GET /search/issues", "GET /search/labels", "GET /search/repositories", "GET /search/topics", "GET /search/users", "GET /teams/{team_id}/discussions", "GET /teams/{team_id}/discussions/{discussion_number}/comments", "GET /teams/{team_id}/discussions/{discussion_number}/comments/{comment_number}/reactions", "GET /teams/{team_id}/discussions/{discussion_number}/reactions", "GET /teams/{team_id}/invitations", "GET /teams/{team_id}/members", "GET /teams/{team_id}/projects", "GET /teams/{team_id}/repos", "GET /teams/{team_id}/team-sync/group-mappings", "GET /teams/{team_id}/teams", "GET /user/blocks", "GET /user/emails", "GET /user/followers", "GET /user/following", "GET /user/gpg_keys", "GET /user/installations", "GET /user/installations/{installation_id}/repositories", "GET /user/issues", "GET /user/keys", "GET /user/marketplace_purchases", "GET /user/marketplace_purchases/stubbed", "GET /user/memberships/orgs", "GET /user/migrations", "GET /user/migrations/{migration_id}/repositories", "GET /user/orgs", "GET /user/public_emails", "GET /user/repos", "GET /user/repository_invitations", "GET /user/starred", "GET /user/subscriptions", "GET /user/teams", "GET /users", "GET /users/{username}/events", "GET /users/{username}/events/orgs/{org}", "GET /users/{username}/events/public", "GET /users/{username}/followers", "GET /users/{username}/following", "GET /users/{username}/gists", "GET /users/{username}/gpg_keys", "GET /users/{username}/keys", "GET /users/{username}/orgs", "GET /users/{username}/projects", "GET /users/{username}/received_events", "GET /users/{username}/received_events/public", "GET /users/{username}/repos", "GET /users/{username}/starred", "GET /users/{username}/subscriptions"];

function isPaginatingEndpoint(arg) {
  if (typeof arg === "string") {
    return paginatingEndpoints.includes(arg);
  } else {
    return false;
  }
}

/**
 * @param octokit Octokit instance
 * @param options Options passed to Octokit constructor
 */

function paginateRest(octokit) {
  return {
    paginate: Object.assign(paginate.bind(null, octokit), {
      iterator: iterator.bind(null, octokit)
    })
  };
}
paginateRest.VERSION = VERSION;

distNode.composePaginateRest = composePaginateRest;
distNode.isPaginatingEndpoint = isPaginatingEndpoint;
distNode.paginateRest = paginateRest;
distNode.paginatingEndpoints = paginatingEndpoints;

var __createBinding$4 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$4 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$4 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$4(result, mod, k);
    __setModuleDefault$4(result, mod);
    return result;
};
Object.defineProperty(utils$1, "__esModule", { value: true });
utils$1.getOctokitOptions = utils$1.GitHub = utils$1.context = void 0;
const Context$1 = __importStar$4(context);
const Utils = __importStar$4(utils);
// octokit + plugins
const core_1 = distNode$9;
const plugin_rest_endpoint_methods_1 = distNode$1;
const plugin_paginate_rest_1 = distNode;
utils$1.context = new Context$1.Context();
const baseUrl = Utils.getApiBaseUrl();
const defaults$1 = {
    baseUrl,
    request: {
        agent: Utils.getProxyAgent(baseUrl)
    }
};
utils$1.GitHub = core_1.Octokit.plugin(plugin_rest_endpoint_methods_1.restEndpointMethods, plugin_paginate_rest_1.paginateRest).defaults(defaults$1);
/**
 * Convience function to correctly format Octokit Options to pass into the constructor.
 *
 * @param     token    the repo PAT or GITHUB_TOKEN
 * @param     options  other options to set
 */
function getOctokitOptions(token, options) {
    const opts = Object.assign({}, options || {}); // Shallow clone - don't mutate the object provided by the caller
    // Auth
    const auth = Utils.getAuthString(token, opts);
    if (auth) {
        opts.auth = auth;
    }
    return opts;
}
utils$1.getOctokitOptions = getOctokitOptions;

var __createBinding$3 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$3 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$3 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$3(result, mod, k);
    __setModuleDefault$3(result, mod);
    return result;
};
Object.defineProperty(github, "__esModule", { value: true });
github.getOctokit = github.context = void 0;
const Context = __importStar$3(context);
const utils_1 = utils$1;
github.context = new Context.Context();
/**
 * Returns a hydrated octokit ready to use for GitHub Actions
 *
 * @param     token    the repo PAT or GITHUB_TOKEN
 * @param     options  other options to set
 */
function getOctokit(token, options) {
    return new utils_1.GitHub(utils_1.getOctokitOptions(token, options));
}
github.getOctokit = getOctokit;

var exec$2 = {};

var toolrunner = {};

var io$1 = {};

var ioUtil$2 = {};

(function (exports) {
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCmdPath = exports.tryGetExecutablePath = exports.isRooted = exports.isDirectory = exports.exists = exports.IS_WINDOWS = exports.unlink = exports.symlink = exports.stat = exports.rmdir = exports.rename = exports.readlink = exports.readdir = exports.mkdir = exports.lstat = exports.copyFile = exports.chmod = void 0;
const fs = __importStar(require$$0__default['default']);
const path = __importStar(require$$0__default$1['default']);
_a = fs.promises, exports.chmod = _a.chmod, exports.copyFile = _a.copyFile, exports.lstat = _a.lstat, exports.mkdir = _a.mkdir, exports.readdir = _a.readdir, exports.readlink = _a.readlink, exports.rename = _a.rename, exports.rmdir = _a.rmdir, exports.stat = _a.stat, exports.symlink = _a.symlink, exports.unlink = _a.unlink;
exports.IS_WINDOWS = process.platform === 'win32';
function exists(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.stat(fsPath);
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                return false;
            }
            throw err;
        }
        return true;
    });
}
exports.exists = exists;
function isDirectory(fsPath, useStat = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const stats = useStat ? yield exports.stat(fsPath) : yield exports.lstat(fsPath);
        return stats.isDirectory();
    });
}
exports.isDirectory = isDirectory;
/**
 * On OSX/Linux, true if path starts with '/'. On Windows, true for paths like:
 * \, \hello, \\hello\share, C:, and C:\hello (and corresponding alternate separator cases).
 */
function isRooted(p) {
    p = normalizeSeparators(p);
    if (!p) {
        throw new Error('isRooted() parameter "p" cannot be empty');
    }
    if (exports.IS_WINDOWS) {
        return (p.startsWith('\\') || /^[A-Z]:/i.test(p) // e.g. \ or \hello or \\hello
        ); // e.g. C: or C:\hello
    }
    return p.startsWith('/');
}
exports.isRooted = isRooted;
/**
 * Best effort attempt to determine whether a file exists and is executable.
 * @param filePath    file path to check
 * @param extensions  additional file extensions to try
 * @return if file exists and is executable, returns the file path. otherwise empty string.
 */
function tryGetExecutablePath(filePath, extensions) {
    return __awaiter(this, void 0, void 0, function* () {
        let stats = undefined;
        try {
            // test file exists
            stats = yield exports.stat(filePath);
        }
        catch (err) {
            if (err.code !== 'ENOENT') {
                // eslint-disable-next-line no-console
                console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
            }
        }
        if (stats && stats.isFile()) {
            if (exports.IS_WINDOWS) {
                // on Windows, test for valid extension
                const upperExt = path.extname(filePath).toUpperCase();
                if (extensions.some(validExt => validExt.toUpperCase() === upperExt)) {
                    return filePath;
                }
            }
            else {
                if (isUnixExecutable(stats)) {
                    return filePath;
                }
            }
        }
        // try each extension
        const originalFilePath = filePath;
        for (const extension of extensions) {
            filePath = originalFilePath + extension;
            stats = undefined;
            try {
                stats = yield exports.stat(filePath);
            }
            catch (err) {
                if (err.code !== 'ENOENT') {
                    // eslint-disable-next-line no-console
                    console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
                }
            }
            if (stats && stats.isFile()) {
                if (exports.IS_WINDOWS) {
                    // preserve the case of the actual file (since an extension was appended)
                    try {
                        const directory = path.dirname(filePath);
                        const upperName = path.basename(filePath).toUpperCase();
                        for (const actualName of yield exports.readdir(directory)) {
                            if (upperName === actualName.toUpperCase()) {
                                filePath = path.join(directory, actualName);
                                break;
                            }
                        }
                    }
                    catch (err) {
                        // eslint-disable-next-line no-console
                        console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
                    }
                    return filePath;
                }
                else {
                    if (isUnixExecutable(stats)) {
                        return filePath;
                    }
                }
            }
        }
        return '';
    });
}
exports.tryGetExecutablePath = tryGetExecutablePath;
function normalizeSeparators(p) {
    p = p || '';
    if (exports.IS_WINDOWS) {
        // convert slashes on Windows
        p = p.replace(/\//g, '\\');
        // remove redundant slashes
        return p.replace(/\\\\+/g, '\\');
    }
    // remove redundant slashes
    return p.replace(/\/\/+/g, '/');
}
// on Mac/Linux, test the execute bit
//     R   W  X  R  W X R W X
//   256 128 64 32 16 8 4 2 1
function isUnixExecutable(stats) {
    return ((stats.mode & 1) > 0 ||
        ((stats.mode & 8) > 0 && stats.gid === process.getgid()) ||
        ((stats.mode & 64) > 0 && stats.uid === process.getuid()));
}
// Get the path of cmd.exe in windows
function getCmdPath() {
    var _a;
    return (_a = process.env['COMSPEC']) !== null && _a !== void 0 ? _a : `cmd.exe`;
}
exports.getCmdPath = getCmdPath;

}(ioUtil$2));

var __createBinding$2 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$2 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$2 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$2(result, mod, k);
    __setModuleDefault$2(result, mod);
    return result;
};
var __awaiter$2 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(io$1, "__esModule", { value: true });
io$1.findInPath = io$1.which = io$1.mkdirP = io$1.rmRF = io$1.mv = io$1.cp = void 0;
const assert_1 = require$$6__default$1['default'];
const childProcess = __importStar$2(require$$1__default$2['default']);
const path$5 = __importStar$2(require$$0__default$1['default']);
const util_1 = require$$6__default['default'];
const ioUtil$1 = __importStar$2(ioUtil$2);
const exec$1 = util_1.promisify(childProcess.exec);
const execFile = util_1.promisify(childProcess.execFile);
/**
 * Copies a file or folder.
 * Based off of shelljs - https://github.com/shelljs/shelljs/blob/9237f66c52e5daa40458f94f9565e18e8132f5a6/src/cp.js
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See CopyOptions.
 */
function cp(source, dest, options = {}) {
    return __awaiter$2(this, void 0, void 0, function* () {
        const { force, recursive, copySourceDirectory } = readCopyOptions(options);
        const destStat = (yield ioUtil$1.exists(dest)) ? yield ioUtil$1.stat(dest) : null;
        // Dest is an existing file, but not forcing
        if (destStat && destStat.isFile() && !force) {
            return;
        }
        // If dest is an existing directory, should copy inside.
        const newDest = destStat && destStat.isDirectory() && copySourceDirectory
            ? path$5.join(dest, path$5.basename(source))
            : dest;
        if (!(yield ioUtil$1.exists(source))) {
            throw new Error(`no such file or directory: ${source}`);
        }
        const sourceStat = yield ioUtil$1.stat(source);
        if (sourceStat.isDirectory()) {
            if (!recursive) {
                throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
            }
            else {
                yield cpDirRecursive(source, newDest, 0, force);
            }
        }
        else {
            if (path$5.relative(source, newDest) === '') {
                // a file cannot be copied to itself
                throw new Error(`'${newDest}' and '${source}' are the same file`);
            }
            yield copyFile(source, newDest, force);
        }
    });
}
io$1.cp = cp;
/**
 * Moves a path.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See MoveOptions.
 */
function mv(source, dest, options = {}) {
    return __awaiter$2(this, void 0, void 0, function* () {
        if (yield ioUtil$1.exists(dest)) {
            let destExists = true;
            if (yield ioUtil$1.isDirectory(dest)) {
                // If dest is directory copy src into dest
                dest = path$5.join(dest, path$5.basename(source));
                destExists = yield ioUtil$1.exists(dest);
            }
            if (destExists) {
                if (options.force == null || options.force) {
                    yield rmRF(dest);
                }
                else {
                    throw new Error('Destination already exists');
                }
            }
        }
        yield mkdirP(path$5.dirname(dest));
        yield ioUtil$1.rename(source, dest);
    });
}
io$1.mv = mv;
/**
 * Remove a path recursively with force
 *
 * @param inputPath path to remove
 */
function rmRF(inputPath) {
    return __awaiter$2(this, void 0, void 0, function* () {
        if (ioUtil$1.IS_WINDOWS) {
            // Node doesn't provide a delete operation, only an unlink function. This means that if the file is being used by another
            // program (e.g. antivirus), it won't be deleted. To address this, we shell out the work to rd/del.
            // Check for invalid characters
            // https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file
            if (/[*"<>|]/.test(inputPath)) {
                throw new Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows');
            }
            try {
                const cmdPath = ioUtil$1.getCmdPath();
                if (yield ioUtil$1.isDirectory(inputPath, true)) {
                    yield exec$1(`${cmdPath} /s /c "rd /s /q "%inputPath%""`, {
                        env: { inputPath }
                    });
                }
                else {
                    yield exec$1(`${cmdPath} /s /c "del /f /a "%inputPath%""`, {
                        env: { inputPath }
                    });
                }
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
            }
            // Shelling out fails to remove a symlink folder with missing source, this unlink catches that
            try {
                yield ioUtil$1.unlink(inputPath);
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
            }
        }
        else {
            let isDir = false;
            try {
                isDir = yield ioUtil$1.isDirectory(inputPath);
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
                return;
            }
            if (isDir) {
                yield execFile(`rm`, [`-rf`, `${inputPath}`]);
            }
            else {
                yield ioUtil$1.unlink(inputPath);
            }
        }
    });
}
io$1.rmRF = rmRF;
/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param   fsPath        path to create
 * @returns Promise<void>
 */
function mkdirP(fsPath) {
    return __awaiter$2(this, void 0, void 0, function* () {
        assert_1.ok(fsPath, 'a path argument must be provided');
        yield ioUtil$1.mkdir(fsPath, { recursive: true });
    });
}
io$1.mkdirP = mkdirP;
/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 *
 * @param     tool              name of the tool
 * @param     check             whether to check if tool exists
 * @returns   Promise<string>   path to tool
 */
function which(tool, check) {
    return __awaiter$2(this, void 0, void 0, function* () {
        if (!tool) {
            throw new Error("parameter 'tool' is required");
        }
        // recursive when check=true
        if (check) {
            const result = yield which(tool, false);
            if (!result) {
                if (ioUtil$1.IS_WINDOWS) {
                    throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
                }
                else {
                    throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
                }
            }
            return result;
        }
        const matches = yield findInPath(tool);
        if (matches && matches.length > 0) {
            return matches[0];
        }
        return '';
    });
}
io$1.which = which;
/**
 * Returns a list of all occurrences of the given tool on the system path.
 *
 * @returns   Promise<string[]>  the paths of the tool
 */
function findInPath(tool) {
    return __awaiter$2(this, void 0, void 0, function* () {
        if (!tool) {
            throw new Error("parameter 'tool' is required");
        }
        // build the list of extensions to try
        const extensions = [];
        if (ioUtil$1.IS_WINDOWS && process.env['PATHEXT']) {
            for (const extension of process.env['PATHEXT'].split(path$5.delimiter)) {
                if (extension) {
                    extensions.push(extension);
                }
            }
        }
        // if it's rooted, return it if exists. otherwise return empty.
        if (ioUtil$1.isRooted(tool)) {
            const filePath = yield ioUtil$1.tryGetExecutablePath(tool, extensions);
            if (filePath) {
                return [filePath];
            }
            return [];
        }
        // if any path separators, return empty
        if (tool.includes(path$5.sep)) {
            return [];
        }
        // build the list of directories
        //
        // Note, technically "where" checks the current directory on Windows. From a toolkit perspective,
        // it feels like we should not do this. Checking the current directory seems like more of a use
        // case of a shell, and the which() function exposed by the toolkit should strive for consistency
        // across platforms.
        const directories = [];
        if (process.env.PATH) {
            for (const p of process.env.PATH.split(path$5.delimiter)) {
                if (p) {
                    directories.push(p);
                }
            }
        }
        // find all matches
        const matches = [];
        for (const directory of directories) {
            const filePath = yield ioUtil$1.tryGetExecutablePath(path$5.join(directory, tool), extensions);
            if (filePath) {
                matches.push(filePath);
            }
        }
        return matches;
    });
}
io$1.findInPath = findInPath;
function readCopyOptions(options) {
    const force = options.force == null ? true : options.force;
    const recursive = Boolean(options.recursive);
    const copySourceDirectory = options.copySourceDirectory == null
        ? true
        : Boolean(options.copySourceDirectory);
    return { force, recursive, copySourceDirectory };
}
function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
    return __awaiter$2(this, void 0, void 0, function* () {
        // Ensure there is not a run away recursive copy
        if (currentDepth >= 255)
            return;
        currentDepth++;
        yield mkdirP(destDir);
        const files = yield ioUtil$1.readdir(sourceDir);
        for (const fileName of files) {
            const srcFile = `${sourceDir}/${fileName}`;
            const destFile = `${destDir}/${fileName}`;
            const srcFileStat = yield ioUtil$1.lstat(srcFile);
            if (srcFileStat.isDirectory()) {
                // Recurse
                yield cpDirRecursive(srcFile, destFile, currentDepth, force);
            }
            else {
                yield copyFile(srcFile, destFile, force);
            }
        }
        // Change the mode for the newly created directory
        yield ioUtil$1.chmod(destDir, (yield ioUtil$1.stat(sourceDir)).mode);
    });
}
// Buffered file copy
function copyFile(srcFile, destFile, force) {
    return __awaiter$2(this, void 0, void 0, function* () {
        if ((yield ioUtil$1.lstat(srcFile)).isSymbolicLink()) {
            // unlink/re-link it
            try {
                yield ioUtil$1.lstat(destFile);
                yield ioUtil$1.unlink(destFile);
            }
            catch (e) {
                // Try to override file permission
                if (e.code === 'EPERM') {
                    yield ioUtil$1.chmod(destFile, '0666');
                    yield ioUtil$1.unlink(destFile);
                }
                // other errors = it doesn't exist, no work to do
            }
            // Copy over symlink
            const symlinkFull = yield ioUtil$1.readlink(srcFile);
            yield ioUtil$1.symlink(symlinkFull, destFile, ioUtil$1.IS_WINDOWS ? 'junction' : null);
        }
        else if (!(yield ioUtil$1.exists(destFile)) || force) {
            yield ioUtil$1.copyFile(srcFile, destFile);
        }
    });
}

var __createBinding$1 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$1 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$1 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
    __setModuleDefault$1(result, mod);
    return result;
};
var __awaiter$1 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(toolrunner, "__esModule", { value: true });
toolrunner.argStringToArray = toolrunner.ToolRunner = void 0;
const os = __importStar$1(require$$1__default['default']);
const events = __importStar$1(require$$4__default['default']);
const child = __importStar$1(require$$1__default$2['default']);
const path$4 = __importStar$1(require$$0__default$1['default']);
const io = __importStar$1(io$1);
const ioUtil = __importStar$1(ioUtil$2);
const timers_1 = require$$6__default$2['default'];
/* eslint-disable @typescript-eslint/unbound-method */
const IS_WINDOWS = process.platform === 'win32';
/*
 * Class for running command line tools. Handles quoting and arg parsing in a platform agnostic way.
 */
class ToolRunner extends events.EventEmitter {
    constructor(toolPath, args, options) {
        super();
        if (!toolPath) {
            throw new Error("Parameter 'toolPath' cannot be null or empty.");
        }
        this.toolPath = toolPath;
        this.args = args || [];
        this.options = options || {};
    }
    _debug(message) {
        if (this.options.listeners && this.options.listeners.debug) {
            this.options.listeners.debug(message);
        }
    }
    _getCommandString(options, noPrefix) {
        const toolPath = this._getSpawnFileName();
        const args = this._getSpawnArgs(options);
        let cmd = noPrefix ? '' : '[command]'; // omit prefix when piped to a second tool
        if (IS_WINDOWS) {
            // Windows + cmd file
            if (this._isCmdFile()) {
                cmd += toolPath;
                for (const a of args) {
                    cmd += ` ${a}`;
                }
            }
            // Windows + verbatim
            else if (options.windowsVerbatimArguments) {
                cmd += `"${toolPath}"`;
                for (const a of args) {
                    cmd += ` ${a}`;
                }
            }
            // Windows (regular)
            else {
                cmd += this._windowsQuoteCmdArg(toolPath);
                for (const a of args) {
                    cmd += ` ${this._windowsQuoteCmdArg(a)}`;
                }
            }
        }
        else {
            // OSX/Linux - this can likely be improved with some form of quoting.
            // creating processes on Unix is fundamentally different than Windows.
            // on Unix, execvp() takes an arg array.
            cmd += toolPath;
            for (const a of args) {
                cmd += ` ${a}`;
            }
        }
        return cmd;
    }
    _processLineBuffer(data, strBuffer, onLine) {
        try {
            let s = strBuffer + data.toString();
            let n = s.indexOf(os.EOL);
            while (n > -1) {
                const line = s.substring(0, n);
                onLine(line);
                // the rest of the string ...
                s = s.substring(n + os.EOL.length);
                n = s.indexOf(os.EOL);
            }
            return s;
        }
        catch (err) {
            // streaming lines to console is best effort.  Don't fail a build.
            this._debug(`error processing line. Failed with error ${err}`);
            return '';
        }
    }
    _getSpawnFileName() {
        if (IS_WINDOWS) {
            if (this._isCmdFile()) {
                return process.env['COMSPEC'] || 'cmd.exe';
            }
        }
        return this.toolPath;
    }
    _getSpawnArgs(options) {
        if (IS_WINDOWS) {
            if (this._isCmdFile()) {
                let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
                for (const a of this.args) {
                    argline += ' ';
                    argline += options.windowsVerbatimArguments
                        ? a
                        : this._windowsQuoteCmdArg(a);
                }
                argline += '"';
                return [argline];
            }
        }
        return this.args;
    }
    _endsWith(str, end) {
        return str.endsWith(end);
    }
    _isCmdFile() {
        const upperToolPath = this.toolPath.toUpperCase();
        return (this._endsWith(upperToolPath, '.CMD') ||
            this._endsWith(upperToolPath, '.BAT'));
    }
    _windowsQuoteCmdArg(arg) {
        // for .exe, apply the normal quoting rules that libuv applies
        if (!this._isCmdFile()) {
            return this._uvQuoteCmdArg(arg);
        }
        // otherwise apply quoting rules specific to the cmd.exe command line parser.
        // the libuv rules are generic and are not designed specifically for cmd.exe
        // command line parser.
        //
        // for a detailed description of the cmd.exe command line parser, refer to
        // http://stackoverflow.com/questions/4094699/how-does-the-windows-command-interpreter-cmd-exe-parse-scripts/7970912#7970912
        // need quotes for empty arg
        if (!arg) {
            return '""';
        }
        // determine whether the arg needs to be quoted
        const cmdSpecialChars = [
            ' ',
            '\t',
            '&',
            '(',
            ')',
            '[',
            ']',
            '{',
            '}',
            '^',
            '=',
            ';',
            '!',
            "'",
            '+',
            ',',
            '`',
            '~',
            '|',
            '<',
            '>',
            '"'
        ];
        let needsQuotes = false;
        for (const char of arg) {
            if (cmdSpecialChars.some(x => x === char)) {
                needsQuotes = true;
                break;
            }
        }
        // short-circuit if quotes not needed
        if (!needsQuotes) {
            return arg;
        }
        // the following quoting rules are very similar to the rules that by libuv applies.
        //
        // 1) wrap the string in quotes
        //
        // 2) double-up quotes - i.e. " => ""
        //
        //    this is different from the libuv quoting rules. libuv replaces " with \", which unfortunately
        //    doesn't work well with a cmd.exe command line.
        //
        //    note, replacing " with "" also works well if the arg is passed to a downstream .NET console app.
        //    for example, the command line:
        //          foo.exe "myarg:""my val"""
        //    is parsed by a .NET console app into an arg array:
        //          [ "myarg:\"my val\"" ]
        //    which is the same end result when applying libuv quoting rules. although the actual
        //    command line from libuv quoting rules would look like:
        //          foo.exe "myarg:\"my val\""
        //
        // 3) double-up slashes that precede a quote,
        //    e.g.  hello \world    => "hello \world"
        //          hello\"world    => "hello\\""world"
        //          hello\\"world   => "hello\\\\""world"
        //          hello world\    => "hello world\\"
        //
        //    technically this is not required for a cmd.exe command line, or the batch argument parser.
        //    the reasons for including this as a .cmd quoting rule are:
        //
        //    a) this is optimized for the scenario where the argument is passed from the .cmd file to an
        //       external program. many programs (e.g. .NET console apps) rely on the slash-doubling rule.
        //
        //    b) it's what we've been doing previously (by deferring to node default behavior) and we
        //       haven't heard any complaints about that aspect.
        //
        // note, a weakness of the quoting rules chosen here, is that % is not escaped. in fact, % cannot be
        // escaped when used on the command line directly - even though within a .cmd file % can be escaped
        // by using %%.
        //
        // the saving grace is, on the command line, %var% is left as-is if var is not defined. this contrasts
        // the line parsing rules within a .cmd file, where if var is not defined it is replaced with nothing.
        //
        // one option that was explored was replacing % with ^% - i.e. %var% => ^%var^%. this hack would
        // often work, since it is unlikely that var^ would exist, and the ^ character is removed when the
        // variable is used. the problem, however, is that ^ is not removed when %* is used to pass the args
        // to an external program.
        //
        // an unexplored potential solution for the % escaping problem, is to create a wrapper .cmd file.
        // % can be escaped within a .cmd file.
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
                reverse += '\\'; // double the slash
            }
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '"'; // double the quote
            }
            else {
                quoteHit = false;
            }
        }
        reverse += '"';
        return reverse
            .split('')
            .reverse()
            .join('');
    }
    _uvQuoteCmdArg(arg) {
        // Tool runner wraps child_process.spawn() and needs to apply the same quoting as
        // Node in certain cases where the undocumented spawn option windowsVerbatimArguments
        // is used.
        //
        // Since this function is a port of quote_cmd_arg from Node 4.x (technically, lib UV,
        // see https://github.com/nodejs/node/blob/v4.x/deps/uv/src/win/process.c for details),
        // pasting copyright notice from Node within this function:
        //
        //      Copyright Joyent, Inc. and other Node contributors. All rights reserved.
        //
        //      Permission is hereby granted, free of charge, to any person obtaining a copy
        //      of this software and associated documentation files (the "Software"), to
        //      deal in the Software without restriction, including without limitation the
        //      rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
        //      sell copies of the Software, and to permit persons to whom the Software is
        //      furnished to do so, subject to the following conditions:
        //
        //      The above copyright notice and this permission notice shall be included in
        //      all copies or substantial portions of the Software.
        //
        //      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        //      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        //      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        //      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        //      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        //      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
        //      IN THE SOFTWARE.
        if (!arg) {
            // Need double quotation for empty argument
            return '""';
        }
        if (!arg.includes(' ') && !arg.includes('\t') && !arg.includes('"')) {
            // No quotation needed
            return arg;
        }
        if (!arg.includes('"') && !arg.includes('\\')) {
            // No embedded double quotes or backslashes, so I can just wrap
            // quote marks around the whole thing.
            return `"${arg}"`;
        }
        // Expected input/output:
        //   input : hello"world
        //   output: "hello\"world"
        //   input : hello""world
        //   output: "hello\"\"world"
        //   input : hello\world
        //   output: hello\world
        //   input : hello\\world
        //   output: hello\\world
        //   input : hello\"world
        //   output: "hello\\\"world"
        //   input : hello\\"world
        //   output: "hello\\\\\"world"
        //   input : hello world\
        //   output: "hello world\\" - note the comment in libuv actually reads "hello world\"
        //                             but it appears the comment is wrong, it should be "hello world\\"
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
                reverse += '\\';
            }
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '\\';
            }
            else {
                quoteHit = false;
            }
        }
        reverse += '"';
        return reverse
            .split('')
            .reverse()
            .join('');
    }
    _cloneExecOptions(options) {
        options = options || {};
        const result = {
            cwd: options.cwd || process.cwd(),
            env: options.env || process.env,
            silent: options.silent || false,
            windowsVerbatimArguments: options.windowsVerbatimArguments || false,
            failOnStdErr: options.failOnStdErr || false,
            ignoreReturnCode: options.ignoreReturnCode || false,
            delay: options.delay || 10000
        };
        result.outStream = options.outStream || process.stdout;
        result.errStream = options.errStream || process.stderr;
        return result;
    }
    _getSpawnOptions(options, toolPath) {
        options = options || {};
        const result = {};
        result.cwd = options.cwd;
        result.env = options.env;
        result['windowsVerbatimArguments'] =
            options.windowsVerbatimArguments || this._isCmdFile();
        if (options.windowsVerbatimArguments) {
            result.argv0 = `"${toolPath}"`;
        }
        return result;
    }
    /**
     * Exec a tool.
     * Output will be streamed to the live console.
     * Returns promise with return code
     *
     * @param     tool     path to tool to exec
     * @param     options  optional exec options.  See ExecOptions
     * @returns   number
     */
    exec() {
        return __awaiter$1(this, void 0, void 0, function* () {
            // root the tool path if it is unrooted and contains relative pathing
            if (!ioUtil.isRooted(this.toolPath) &&
                (this.toolPath.includes('/') ||
                    (IS_WINDOWS && this.toolPath.includes('\\')))) {
                // prefer options.cwd if it is specified, however options.cwd may also need to be rooted
                this.toolPath = path$4.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
            }
            // if the tool is only a file name, then resolve it from the PATH
            // otherwise verify it exists (add extension on Windows if necessary)
            this.toolPath = yield io.which(this.toolPath, true);
            return new Promise((resolve, reject) => __awaiter$1(this, void 0, void 0, function* () {
                this._debug(`exec tool: ${this.toolPath}`);
                this._debug('arguments:');
                for (const arg of this.args) {
                    this._debug(`   ${arg}`);
                }
                const optionsNonNull = this._cloneExecOptions(this.options);
                if (!optionsNonNull.silent && optionsNonNull.outStream) {
                    optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os.EOL);
                }
                const state = new ExecState(optionsNonNull, this.toolPath);
                state.on('debug', (message) => {
                    this._debug(message);
                });
                if (this.options.cwd && !(yield ioUtil.exists(this.options.cwd))) {
                    return reject(new Error(`The cwd: ${this.options.cwd} does not exist!`));
                }
                const fileName = this._getSpawnFileName();
                const cp = child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
                let stdbuffer = '';
                if (cp.stdout) {
                    cp.stdout.on('data', (data) => {
                        if (this.options.listeners && this.options.listeners.stdout) {
                            this.options.listeners.stdout(data);
                        }
                        if (!optionsNonNull.silent && optionsNonNull.outStream) {
                            optionsNonNull.outStream.write(data);
                        }
                        stdbuffer = this._processLineBuffer(data, stdbuffer, (line) => {
                            if (this.options.listeners && this.options.listeners.stdline) {
                                this.options.listeners.stdline(line);
                            }
                        });
                    });
                }
                let errbuffer = '';
                if (cp.stderr) {
                    cp.stderr.on('data', (data) => {
                        state.processStderr = true;
                        if (this.options.listeners && this.options.listeners.stderr) {
                            this.options.listeners.stderr(data);
                        }
                        if (!optionsNonNull.silent &&
                            optionsNonNull.errStream &&
                            optionsNonNull.outStream) {
                            const s = optionsNonNull.failOnStdErr
                                ? optionsNonNull.errStream
                                : optionsNonNull.outStream;
                            s.write(data);
                        }
                        errbuffer = this._processLineBuffer(data, errbuffer, (line) => {
                            if (this.options.listeners && this.options.listeners.errline) {
                                this.options.listeners.errline(line);
                            }
                        });
                    });
                }
                cp.on('error', (err) => {
                    state.processError = err.message;
                    state.processExited = true;
                    state.processClosed = true;
                    state.CheckComplete();
                });
                cp.on('exit', (code) => {
                    state.processExitCode = code;
                    state.processExited = true;
                    this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                cp.on('close', (code) => {
                    state.processExitCode = code;
                    state.processExited = true;
                    state.processClosed = true;
                    this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                state.on('done', (error, exitCode) => {
                    if (stdbuffer.length > 0) {
                        this.emit('stdline', stdbuffer);
                    }
                    if (errbuffer.length > 0) {
                        this.emit('errline', errbuffer);
                    }
                    cp.removeAllListeners();
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(exitCode);
                    }
                });
                if (this.options.input) {
                    if (!cp.stdin) {
                        throw new Error('child process missing stdin');
                    }
                    cp.stdin.end(this.options.input);
                }
            }));
        });
    }
}
toolrunner.ToolRunner = ToolRunner;
/**
 * Convert an arg string to an array of args. Handles escaping
 *
 * @param    argString   string of arguments
 * @returns  string[]    array of arguments
 */
function argStringToArray(argString) {
    const args = [];
    let inQuotes = false;
    let escaped = false;
    let arg = '';
    function append(c) {
        // we only escape double quotes.
        if (escaped && c !== '"') {
            arg += '\\';
        }
        arg += c;
        escaped = false;
    }
    for (let i = 0; i < argString.length; i++) {
        const c = argString.charAt(i);
        if (c === '"') {
            if (!escaped) {
                inQuotes = !inQuotes;
            }
            else {
                append(c);
            }
            continue;
        }
        if (c === '\\' && escaped) {
            append(c);
            continue;
        }
        if (c === '\\' && inQuotes) {
            escaped = true;
            continue;
        }
        if (c === ' ' && !inQuotes) {
            if (arg.length > 0) {
                args.push(arg);
                arg = '';
            }
            continue;
        }
        append(c);
    }
    if (arg.length > 0) {
        args.push(arg.trim());
    }
    return args;
}
toolrunner.argStringToArray = argStringToArray;
class ExecState extends events.EventEmitter {
    constructor(options, toolPath) {
        super();
        this.processClosed = false; // tracks whether the process has exited and stdio is closed
        this.processError = '';
        this.processExitCode = 0;
        this.processExited = false; // tracks whether the process has exited
        this.processStderr = false; // tracks whether stderr was written to
        this.delay = 10000; // 10 seconds
        this.done = false;
        this.timeout = null;
        if (!toolPath) {
            throw new Error('toolPath must not be empty');
        }
        this.options = options;
        this.toolPath = toolPath;
        if (options.delay) {
            this.delay = options.delay;
        }
    }
    CheckComplete() {
        if (this.done) {
            return;
        }
        if (this.processClosed) {
            this._setResult();
        }
        else if (this.processExited) {
            this.timeout = timers_1.setTimeout(ExecState.HandleTimeout, this.delay, this);
        }
    }
    _debug(message) {
        this.emit('debug', message);
    }
    _setResult() {
        // determine whether there is an error
        let error;
        if (this.processExited) {
            if (this.processError) {
                error = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
            }
            else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) {
                error = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
            }
            else if (this.processStderr && this.options.failOnStdErr) {
                error = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
            }
        }
        // clear the timeout
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.done = true;
        this.emit('done', error, this.processExitCode);
    }
    static HandleTimeout(state) {
        if (state.done) {
            return;
        }
        if (!state.processClosed && state.processExited) {
            const message = `The STDIO streams did not close within ${state.delay /
                1000} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
            state._debug(message);
        }
        state._setResult();
    }
}

var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exec$2, "__esModule", { value: true });
exec$2.getExecOutput = exec$2.exec = void 0;
const string_decoder_1 = require$$0__default$2['default'];
const tr = __importStar(toolrunner);
/**
 * Exec a command.
 * Output will be streamed to the live console.
 * Returns promise with return code
 *
 * @param     commandLine        command to execute (can include additional args). Must be correctly escaped.
 * @param     args               optional arguments for tool. Escaping is handled by the lib.
 * @param     options            optional exec options.  See ExecOptions
 * @returns   Promise<number>    exit code
 */
function exec(commandLine, args, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const commandArgs = tr.argStringToArray(commandLine);
        if (commandArgs.length === 0) {
            throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
        }
        // Path to tool to execute should be first arg
        const toolPath = commandArgs[0];
        args = commandArgs.slice(1).concat(args || []);
        const runner = new tr.ToolRunner(toolPath, args, options);
        return runner.exec();
    });
}
exec$2.exec = exec;
/**
 * Exec a command and get the output.
 * Output will be streamed to the live console.
 * Returns promise with the exit code and collected stdout and stderr
 *
 * @param     commandLine           command to execute (can include additional args). Must be correctly escaped.
 * @param     args                  optional arguments for tool. Escaping is handled by the lib.
 * @param     options               optional exec options.  See ExecOptions
 * @returns   Promise<ExecOutput>   exit code, stdout, and stderr
 */
function getExecOutput(commandLine, args, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let stdout = '';
        let stderr = '';
        //Using string decoder covers the case where a mult-byte character is split
        const stdoutDecoder = new string_decoder_1.StringDecoder('utf8');
        const stderrDecoder = new string_decoder_1.StringDecoder('utf8');
        const originalStdoutListener = (_a = options === null || options === void 0 ? void 0 : options.listeners) === null || _a === void 0 ? void 0 : _a.stdout;
        const originalStdErrListener = (_b = options === null || options === void 0 ? void 0 : options.listeners) === null || _b === void 0 ? void 0 : _b.stderr;
        const stdErrListener = (data) => {
            stderr += stderrDecoder.write(data);
            if (originalStdErrListener) {
                originalStdErrListener(data);
            }
        };
        const stdOutListener = (data) => {
            stdout += stdoutDecoder.write(data);
            if (originalStdoutListener) {
                originalStdoutListener(data);
            }
        };
        const listeners = Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.listeners), { stdout: stdOutListener, stderr: stdErrListener });
        const exitCode = yield exec(commandLine, args, Object.assign(Object.assign({}, options), { listeners }));
        //flush any remaining characters
        stdout += stdoutDecoder.end();
        stderr += stderrDecoder.end();
        return {
            exitCode,
            stdout,
            stderr
        };
    });
}
exec$2.getExecOutput = getExecOutput;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Modified from: https://github.com/slavcodev/coverage-monitor-action
// Every comment written by our action will have this hidden
// header on top, and will be used to identify which comments
// to update/delete etc
var appendHiddenHeaderToComment = function appendHiddenHeaderToComment(body, hiddenHeader) {
  return hiddenHeader + body;
};

var listComments = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_ref) {
    var client, context, prNumber, hiddenHeader, _yield$client$rest$is, existingComments;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            client = _ref.client, context = _ref.context, prNumber = _ref.prNumber, hiddenHeader = _ref.hiddenHeader;
            _context.next = 3;
            return client.rest.issues.listComments(_objectSpread$1(_objectSpread$1({}, context.repo), {}, {
              issue_number: prNumber
            }));

          case 3:
            _yield$client$rest$is = _context.sent;
            existingComments = _yield$client$rest$is.data;
            return _context.abrupt("return", existingComments.filter(function (_ref3) {
              var body = _ref3.body;
              return body.startsWith(hiddenHeader);
            }));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function listComments(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var insertComment = function insertComment(_ref4, hiddenHeader) {
  var client = _ref4.client,
      context = _ref4.context,
      prNumber = _ref4.prNumber,
      body = _ref4.body;
  return client.rest.issues.createComment(_objectSpread$1(_objectSpread$1({}, context.repo), {}, {
    issue_number: prNumber,
    body: appendHiddenHeaderToComment(body, hiddenHeader)
  }));
};

var updateComment = function updateComment(_ref5, hiddenHeader) {
  var client = _ref5.client,
      context = _ref5.context,
      body = _ref5.body,
      commentId = _ref5.commentId;
  return client.rest.issues.updateComment(_objectSpread$1(_objectSpread$1({}, context.repo), {}, {
    comment_id: commentId,
    body: appendHiddenHeaderToComment(body, hiddenHeader)
  }));
};

var deleteComments = function deleteComments(_ref6) {
  var client = _ref6.client,
      context = _ref6.context,
      comments = _ref6.comments;
  return Promise.all(comments.map(function (_ref7) {
    var id = _ref7.id;
    return client.rest.issues.deleteComment(_objectSpread$1(_objectSpread$1({}, context.repo), {}, {
      comment_id: id
    }));
  }));
};

var upsertComment = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(_ref8) {
    var client, context, prNumber, body, hiddenHeader, existingComments, last;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            client = _ref8.client, context = _ref8.context, prNumber = _ref8.prNumber, body = _ref8.body, hiddenHeader = _ref8.hiddenHeader;
            _context2.next = 3;
            return listComments({
              client: client,
              context: context,
              prNumber: prNumber,
              hiddenHeader: hiddenHeader
            });

          case 3:
            existingComments = _context2.sent;
            last = existingComments.pop();
            _context2.next = 7;
            return deleteComments({
              client: client,
              context: context,
              comments: existingComments
            });

          case 7:
            return _context2.abrupt("return", last ? updateComment({
              client: client,
              context: context,
              body: body,
              commentId: last.id
            }, hiddenHeader) : insertComment({
              client: client,
              context: context,
              prNumber: prNumber,
              body: body
            }, hiddenHeader));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function upsertComment(_x2) {
    return _ref9.apply(this, arguments);
  };
}(); // Given a PR number, returns 3 arrays: file names modified, added and renamed

var getFileStatusesFromPR = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(_ref10) {
    var client, context, prNumber, _yield$client$rest$pu, files;

    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            client = _ref10.client, context = _ref10.context, prNumber = _ref10.prNumber;
            _context3.next = 3;
            return client.rest.pulls.listFiles(_objectSpread$1(_objectSpread$1({}, context.repo), {}, {
              pull_number: prNumber,
              // Pull the maximum number of files.
              // For PRs with over 100 files, we will have too many files which will create
              // a comment which is too large to post anyway.
              per_page: 100
            }));

          case 3:
            _yield$client$rest$pu = _context3.sent;
            files = _yield$client$rest$pu.data;
            return _context3.abrupt("return", {
              added: files.filter(function (file) {
                return file.status === 'added';
              }).map(function (file) {
                return file.filename;
              }),
              modified: files.filter(function (file) {
                return file.status === 'modified' || file.status === 'renamed' && file.changes > 0;
              }).map(function (file) {
                return file.filename;
              }),
              renamed: files.filter(function (file) {
                return file.status === 'renamed';
              }).map(function (file) {
                return {
                  from: file.previous_filename,
                  to: file.filename
                };
              })
            });

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getFileStatusesFromPR(_x3) {
    return _ref11.apply(this, arguments);
  };
}();

var stripMarkdown = strip;

// Expose modifiers for available node types.
// Node types not listed here are not changed (but their children are).
var defaults = {
  heading: paragraph$1,
  text: text$5,
  inlineCode: text$5,
  image: image$2,
  imageReference: image$2,
  break: lineBreak,

  blockquote: children,
  list: children,
  listItem: children,
  strong: children,
  emphasis: children,
  delete: children,
  link: children,
  linkReference: children,

  code: empty$1,
  horizontalRule: empty$1,
  thematicBreak: empty$1,
  html: empty$1,
  table: empty$1,
  tableCell: empty$1,
  definition: empty$1,
  yaml: empty$1,
  toml: empty$1
};

var own$8 = {}.hasOwnProperty;

function strip(options) {
  var keep = (options || {}).keep || [];
  var map = {};
  var length = keep.length;
  var index = -1;
  var key;

  if (length === 0) {
    map = defaults;
  } else {
    for (key in defaults) {
      if (keep.indexOf(key) === -1) {
        map[key] = defaults[key];
      }
    }

    // Warn if unknown keys are turned off.
    while (++index < length) {
      key = keep[index];

      if (!own$8.call(defaults, key)) {
        throw new Error(
          'Invalid `keep` option: No modifier is defined for node type `' +
            key +
            '`'
        )
      }
    }
  }

  return one

  function one(node) {
    var type = node && node.type;

    if (type in map) {
      node = map[type](node);
    }

    if ('length' in node) {
      node = all(node);
    }

    if (node.children) {
      node.children = all(node.children);
    }

    return node
  }

  function all(nodes) {
    var index = -1;
    var length = nodes.length;
    var result = [];
    var value;

    while (++index < length) {
      value = one(nodes[index]);

      if (value && typeof value.length === 'number') {
        result = result.concat(value.map(one));
      } else {
        result.push(value);
      }
    }

    return clean(result)
  }
}

// Clean nodes: merges texts.
function clean(values) {
  var index = -1;
  var length = values.length;
  var result = [];
  var previous = null;
  var value;

  while (++index < length) {
    value = values[index];

    if (previous && 'value' in value && value.type === previous.type) {
      previous.value += value.value;
    } else {
      result.push(value);
      previous = value;
    }
  }

  return result
}

function image$2(node) {
  return {type: 'text', value: node.alt || node.title || ''}
}

function text$5(node) {
  return {type: 'text', value: node.value}
}

function paragraph$1(node) {
  return {type: 'paragraph', children: node.children}
}

function children(node) {
  return node.children || []
}

function lineBreak() {
  return {type: 'text', value: '\n'}
}

function empty$1() {
  return {type: 'text', value: ''}
}

var bail_1 = bail$1;

function bail$1(err) {
  if (err) {
    throw err
  }
}

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

var isBuffer = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
};

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

var isArray$1 = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
var setProperty = function setProperty(target, options) {
	if (defineProperty && options.name === '__proto__') {
		defineProperty(target, options.name, {
			enumerable: true,
			configurable: true,
			value: options.newValue,
			writable: true
		});
	} else {
		target[options.name] = options.newValue;
	}
};

// Return undefined instead of __proto__ if '__proto__' is not an own property
var getProperty = function getProperty(obj, name) {
	if (name === '__proto__') {
		if (!hasOwn.call(obj, name)) {
			return void 0;
		} else if (gOPD) {
			// In early versions of node, obj['__proto__'] is buggy when obj has
			// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
			return gOPD(obj, name).value;
		}
	}

	return obj[name];
};

var extend$2 = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = getProperty(target, name);
				copy = getProperty(options, name);

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray$1(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray$1(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						setProperty(target, { name: name, newValue: copy });
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};

var isPlainObj = value => {
	if (Object.prototype.toString.call(value) !== '[object Object]') {
		return false;
	}

	const prototype = Object.getPrototypeOf(value);
	return prototype === null || prototype === Object.prototype;
};

var slice$3 = [].slice;

var wrap_1 = wrap$1;

// Wrap `fn`.
// Can be sync or async; return a promise, receive a completion handler, return
// new values and errors.
function wrap$1(fn, callback) {
  var invoked;

  return wrapped

  function wrapped() {
    var params = slice$3.call(arguments, 0);
    var callback = fn.length > params.length;
    var result;

    if (callback) {
      params.push(done);
    }

    try {
      result = fn.apply(null, params);
    } catch (error) {
      // Well, this is quite the pickle.
      // `fn` received a callback and invoked it (thus continuing the pipeline),
      // but later also threw an error.
      // We’re not about to restart the pipeline again, so the only thing left
      // to do is to throw the thing instead.
      if (callback && invoked) {
        throw error
      }

      return done(error)
    }

    if (!callback) {
      if (result && typeof result.then === 'function') {
        result.then(then, done);
      } else if (result instanceof Error) {
        done(result);
      } else {
        then(result);
      }
    }
  }

  // Invoke `next`, only once.
  function done() {
    if (!invoked) {
      invoked = true;

      callback.apply(null, arguments);
    }
  }

  // Invoke `done` with one value.
  // Tracks if an error is passed, too.
  function then(value) {
    done(null, value);
  }
}

var wrap = wrap_1;

var trough_1 = trough$1;

trough$1.wrap = wrap;

var slice$2 = [].slice;

// Create new middleware.
function trough$1() {
  var fns = [];
  var middleware = {};

  middleware.run = run;
  middleware.use = use;

  return middleware

  // Run `fns`.  Last argument must be a completion handler.
  function run() {
    var index = -1;
    var input = slice$2.call(arguments, 0, -1);
    var done = arguments[arguments.length - 1];

    if (typeof done !== 'function') {
      throw new Error('Expected function as last argument, not ' + done)
    }

    next.apply(null, [null].concat(input));

    // Run the next `fn`, if any.
    function next(err) {
      var fn = fns[++index];
      var params = slice$2.call(arguments, 0);
      var values = params.slice(1);
      var length = input.length;
      var pos = -1;

      if (err) {
        done(err);
        return
      }

      // Copy non-nully input into values.
      while (++pos < length) {
        if (values[pos] === null || values[pos] === undefined) {
          values[pos] = input[pos];
        }
      }

      input = values;

      // Next or done.
      if (fn) {
        wrap(fn, next).apply(null, input);
      } else {
        done.apply(null, [null].concat(input));
      }
    }
  }

  // Add `fn` to the list.
  function use(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Expected `fn` to be a function, not ' + fn)
    }

    fns.push(fn);

    return middleware
  }
}

var own$7 = {}.hasOwnProperty;

var unistUtilStringifyPosition = stringify$3;

function stringify$3(value) {
  // Nothing.
  if (!value || typeof value !== 'object') {
    return ''
  }

  // Node.
  if (own$7.call(value, 'position') || own$7.call(value, 'type')) {
    return position(value.position)
  }

  // Position.
  if (own$7.call(value, 'start') || own$7.call(value, 'end')) {
    return position(value)
  }

  // Point.
  if (own$7.call(value, 'line') || own$7.call(value, 'column')) {
    return point(value)
  }

  // ?
  return ''
}

function point(point) {
  if (!point || typeof point !== 'object') {
    point = {};
  }

  return index(point.line) + ':' + index(point.column)
}

function position(pos) {
  if (!pos || typeof pos !== 'object') {
    pos = {};
  }

  return point(pos.start) + '-' + point(pos.end)
}

function index(value) {
  return value && typeof value === 'number' ? value : 1
}

var stringify$2 = unistUtilStringifyPosition;

var vfileMessage = VMessage$1;

// Inherit from `Error#`.
function VMessagePrototype() {}
VMessagePrototype.prototype = Error.prototype;
VMessage$1.prototype = new VMessagePrototype();

// Message properties.
var proto = VMessage$1.prototype;

proto.file = '';
proto.name = '';
proto.reason = '';
proto.message = '';
proto.stack = '';
proto.fatal = null;
proto.column = null;
proto.line = null;

// Construct a new VMessage.
//
// Note: We cannot invoke `Error` on the created context, as that adds readonly
// `line` and `column` attributes on Safari 9, thus throwing and failing the
// data.
function VMessage$1(reason, position, origin) {
  var parts;
  var range;
  var location;

  if (typeof position === 'string') {
    origin = position;
    position = null;
  }

  parts = parseOrigin(origin);
  range = stringify$2(position) || '1:1';

  location = {
    start: {line: null, column: null},
    end: {line: null, column: null}
  };

  // Node.
  if (position && position.position) {
    position = position.position;
  }

  if (position) {
    // Position.
    if (position.start) {
      location = position;
      position = position.start;
    } else {
      // Point.
      location.start = position;
    }
  }

  if (reason.stack) {
    this.stack = reason.stack;
    reason = reason.message;
  }

  this.message = reason;
  this.name = range;
  this.reason = reason;
  this.line = position ? position.line : null;
  this.column = position ? position.column : null;
  this.location = location;
  this.source = parts[0];
  this.ruleId = parts[1];
}

function parseOrigin(origin) {
  var result = [null, null];
  var index;

  if (typeof origin === 'string') {
    index = origin.indexOf(':');

    if (index === -1) {
      result[1] = origin;
    } else {
      result[0] = origin.slice(0, index);
      result[1] = origin.slice(index + 1);
    }
  }

  return result
}

var minpath = require$$0__default$1['default'];

var minproc = process;

var p = minpath;
var proc = minproc;
var buffer$1 = isBuffer;

var core = VFile$1;

var own$6 = {}.hasOwnProperty;

// Order of setting (least specific to most), we need this because otherwise
// `{stem: 'a', path: '~/b.js'}` would throw, as a path is needed before a
// stem can be set.
var order$1 = ['history', 'path', 'basename', 'stem', 'extname', 'dirname'];

VFile$1.prototype.toString = toString$4;

// Access full path (`~/index.min.js`).
Object.defineProperty(VFile$1.prototype, 'path', {get: getPath, set: setPath});

// Access parent path (`~`).
Object.defineProperty(VFile$1.prototype, 'dirname', {
  get: getDirname,
  set: setDirname
});

// Access basename (`index.min.js`).
Object.defineProperty(VFile$1.prototype, 'basename', {
  get: getBasename,
  set: setBasename
});

// Access extname (`.js`).
Object.defineProperty(VFile$1.prototype, 'extname', {
  get: getExtname,
  set: setExtname
});

// Access stem (`index.min`).
Object.defineProperty(VFile$1.prototype, 'stem', {get: getStem, set: setStem});

// Construct a new file.
function VFile$1(options) {
  var prop;
  var index;

  if (!options) {
    options = {};
  } else if (typeof options === 'string' || buffer$1(options)) {
    options = {contents: options};
  } else if ('message' in options && 'messages' in options) {
    return options
  }

  if (!(this instanceof VFile$1)) {
    return new VFile$1(options)
  }

  this.data = {};
  this.messages = [];
  this.history = [];
  this.cwd = proc.cwd();

  // Set path related properties in the correct order.
  index = -1;

  while (++index < order$1.length) {
    prop = order$1[index];

    if (own$6.call(options, prop)) {
      this[prop] = options[prop];
    }
  }

  // Set non-path related properties.
  for (prop in options) {
    if (order$1.indexOf(prop) < 0) {
      this[prop] = options[prop];
    }
  }
}

function getPath() {
  return this.history[this.history.length - 1]
}

function setPath(path) {
  assertNonEmpty(path, 'path');

  if (this.path !== path) {
    this.history.push(path);
  }
}

function getDirname() {
  return typeof this.path === 'string' ? p.dirname(this.path) : undefined
}

function setDirname(dirname) {
  assertPath(this.path, 'dirname');
  this.path = p.join(dirname || '', this.basename);
}

function getBasename() {
  return typeof this.path === 'string' ? p.basename(this.path) : undefined
}

function setBasename(basename) {
  assertNonEmpty(basename, 'basename');
  assertPart(basename, 'basename');
  this.path = p.join(this.dirname || '', basename);
}

function getExtname() {
  return typeof this.path === 'string' ? p.extname(this.path) : undefined
}

function setExtname(extname) {
  assertPart(extname, 'extname');
  assertPath(this.path, 'extname');

  if (extname) {
    if (extname.charCodeAt(0) !== 46 /* `.` */) {
      throw new Error('`extname` must start with `.`')
    }

    if (extname.indexOf('.', 1) > -1) {
      throw new Error('`extname` cannot contain multiple dots')
    }
  }

  this.path = p.join(this.dirname, this.stem + (extname || ''));
}

function getStem() {
  return typeof this.path === 'string'
    ? p.basename(this.path, this.extname)
    : undefined
}

function setStem(stem) {
  assertNonEmpty(stem, 'stem');
  assertPart(stem, 'stem');
  this.path = p.join(this.dirname || '', stem + (this.extname || ''));
}

// Get the value of the file.
function toString$4(encoding) {
  return (this.contents || '').toString(encoding)
}

// Assert that `part` is not a path (i.e., does not contain `p.sep`).
function assertPart(part, name) {
  if (part && part.indexOf(p.sep) > -1) {
    throw new Error(
      '`' + name + '` cannot be a path: did not expect `' + p.sep + '`'
    )
  }
}

// Assert that `part` is not empty.
function assertNonEmpty(part, name) {
  if (!part) {
    throw new Error('`' + name + '` cannot be empty')
  }
}

// Assert `path` exists.
function assertPath(path, name) {
  if (!path) {
    throw new Error('Setting `' + name + '` requires `path` to be set too')
  }
}

var VMessage = vfileMessage;
var VFile = core;

var lib$1 = VFile;

VFile.prototype.message = message;
VFile.prototype.info = info;
VFile.prototype.fail = fail;

// Create a message with `reason` at `position`.
// When an error is passed in as `reason`, copies the stack.
function message(reason, position, origin) {
  var message = new VMessage(reason, position, origin);

  if (this.path) {
    message.name = this.path + ':' + message.name;
    message.file = this.path;
  }

  message.fatal = false;

  this.messages.push(message);

  return message
}

// Fail: creates a vmessage, associates it with the file, and throws it.
function fail() {
  var message = this.message.apply(this, arguments);

  message.fatal = true;

  throw message
}

// Info: creates a vmessage, associates it with the file, and marks the fatality
// as null.
function info() {
  var message = this.message.apply(this, arguments);

  message.fatal = null;

  return message
}

var vfile$1 = lib$1;

var bail = bail_1;
var buffer = isBuffer;
var extend$1 = extend$2;
var plain = isPlainObj;
var trough = trough_1;
var vfile = vfile$1;

// Expose a frozen processor.
var unified_1 = unified$1().freeze();

var slice$1 = [].slice;
var own$5 = {}.hasOwnProperty;

// Process pipeline.
var pipeline = trough()
  .use(pipelineParse)
  .use(pipelineRun)
  .use(pipelineStringify);

function pipelineParse(p, ctx) {
  ctx.tree = p.parse(ctx.file);
}

function pipelineRun(p, ctx, next) {
  p.run(ctx.tree, ctx.file, done);

  function done(error, tree, file) {
    if (error) {
      next(error);
    } else {
      ctx.tree = tree;
      ctx.file = file;
      next();
    }
  }
}

function pipelineStringify(p, ctx) {
  var result = p.stringify(ctx.tree, ctx.file);

  if (result === undefined || result === null) ; else if (typeof result === 'string' || buffer(result)) {
    ctx.file.contents = result;
  } else {
    ctx.file.result = result;
  }
}

// Function to create the first processor.
function unified$1() {
  var attachers = [];
  var transformers = trough();
  var namespace = {};
  var freezeIndex = -1;
  var frozen;

  // Data management.
  processor.data = data;

  // Lock.
  processor.freeze = freeze;

  // Plugins.
  processor.attachers = attachers;
  processor.use = use;

  // API.
  processor.parse = parse;
  processor.stringify = stringify;
  processor.run = run;
  processor.runSync = runSync;
  processor.process = process;
  processor.processSync = processSync;

  // Expose.
  return processor

  // Create a new processor based on the processor in the current scope.
  function processor() {
    var destination = unified$1();
    var index = -1;

    while (++index < attachers.length) {
      destination.use.apply(null, attachers[index]);
    }

    destination.data(extend$1(true, {}, namespace));

    return destination
  }

  // Freeze: used to signal a processor that has finished configuration.
  //
  // For example, take unified itself: it’s frozen.
  // Plugins should not be added to it.
  // Rather, it should be extended, by invoking it, before modifying it.
  //
  // In essence, always invoke this when exporting a processor.
  function freeze() {
    var values;
    var transformer;

    if (frozen) {
      return processor
    }

    while (++freezeIndex < attachers.length) {
      values = attachers[freezeIndex];

      if (values[1] === false) {
        continue
      }

      if (values[1] === true) {
        values[1] = undefined;
      }

      transformer = values[0].apply(processor, values.slice(1));

      if (typeof transformer === 'function') {
        transformers.use(transformer);
      }
    }

    frozen = true;
    freezeIndex = Infinity;

    return processor
  }

  // Data management.
  // Getter / setter for processor-specific informtion.
  function data(key, value) {
    if (typeof key === 'string') {
      // Set `key`.
      if (arguments.length === 2) {
        assertUnfrozen('data', frozen);
        namespace[key] = value;
        return processor
      }

      // Get `key`.
      return (own$5.call(namespace, key) && namespace[key]) || null
    }

    // Set space.
    if (key) {
      assertUnfrozen('data', frozen);
      namespace = key;
      return processor
    }

    // Get space.
    return namespace
  }

  // Plugin management.
  //
  // Pass it:
  // *   an attacher and options,
  // *   a preset,
  // *   a list of presets, attachers, and arguments (list of attachers and
  //     options).
  function use(value) {
    var settings;

    assertUnfrozen('use', frozen);

    if (value === null || value === undefined) ; else if (typeof value === 'function') {
      addPlugin.apply(null, arguments);
    } else if (typeof value === 'object') {
      if ('length' in value) {
        addList(value);
      } else {
        addPreset(value);
      }
    } else {
      throw new Error('Expected usable value, not `' + value + '`')
    }

    if (settings) {
      namespace.settings = extend$1(namespace.settings || {}, settings);
    }

    return processor

    function addPreset(result) {
      addList(result.plugins);

      if (result.settings) {
        settings = extend$1(settings || {}, result.settings);
      }
    }

    function add(value) {
      if (typeof value === 'function') {
        addPlugin(value);
      } else if (typeof value === 'object') {
        if ('length' in value) {
          addPlugin.apply(null, value);
        } else {
          addPreset(value);
        }
      } else {
        throw new Error('Expected usable value, not `' + value + '`')
      }
    }

    function addList(plugins) {
      var index = -1;

      if (plugins === null || plugins === undefined) ; else if (typeof plugins === 'object' && 'length' in plugins) {
        while (++index < plugins.length) {
          add(plugins[index]);
        }
      } else {
        throw new Error('Expected a list of plugins, not `' + plugins + '`')
      }
    }

    function addPlugin(plugin, value) {
      var entry = find(plugin);

      if (entry) {
        if (plain(entry[1]) && plain(value)) {
          value = extend$1(true, entry[1], value);
        }

        entry[1] = value;
      } else {
        attachers.push(slice$1.call(arguments));
      }
    }
  }

  function find(plugin) {
    var index = -1;

    while (++index < attachers.length) {
      if (attachers[index][0] === plugin) {
        return attachers[index]
      }
    }
  }

  // Parse a file (in string or vfile representation) into a unist node using
  // the `Parser` on the processor.
  function parse(doc) {
    var file = vfile(doc);
    var Parser;

    freeze();
    Parser = processor.Parser;
    assertParser('parse', Parser);

    if (newable(Parser, 'parse')) {
      return new Parser(String(file), file).parse()
    }

    return Parser(String(file), file) // eslint-disable-line new-cap
  }

  // Run transforms on a unist node representation of a file (in string or
  // vfile representation), async.
  function run(node, file, cb) {
    assertNode(node);
    freeze();

    if (!cb && typeof file === 'function') {
      cb = file;
      file = null;
    }

    if (!cb) {
      return new Promise(executor)
    }

    executor(null, cb);

    function executor(resolve, reject) {
      transformers.run(node, vfile(file), done);

      function done(error, tree, file) {
        tree = tree || node;
        if (error) {
          reject(error);
        } else if (resolve) {
          resolve(tree);
        } else {
          cb(null, tree, file);
        }
      }
    }
  }

  // Run transforms on a unist node representation of a file (in string or
  // vfile representation), sync.
  function runSync(node, file) {
    var result;
    var complete;

    run(node, file, done);

    assertDone('runSync', 'run', complete);

    return result

    function done(error, tree) {
      complete = true;
      result = tree;
      bail(error);
    }
  }

  // Stringify a unist node representation of a file (in string or vfile
  // representation) into a string using the `Compiler` on the processor.
  function stringify(node, doc) {
    var file = vfile(doc);
    var Compiler;

    freeze();
    Compiler = processor.Compiler;
    assertCompiler('stringify', Compiler);
    assertNode(node);

    if (newable(Compiler, 'compile')) {
      return new Compiler(node, file).compile()
    }

    return Compiler(node, file) // eslint-disable-line new-cap
  }

  // Parse a file (in string or vfile representation) into a unist node using
  // the `Parser` on the processor, then run transforms on that node, and
  // compile the resulting node using the `Compiler` on the processor, and
  // store that result on the vfile.
  function process(doc, cb) {
    freeze();
    assertParser('process', processor.Parser);
    assertCompiler('process', processor.Compiler);

    if (!cb) {
      return new Promise(executor)
    }

    executor(null, cb);

    function executor(resolve, reject) {
      var file = vfile(doc);

      pipeline.run(processor, {file: file}, done);

      function done(error) {
        if (error) {
          reject(error);
        } else if (resolve) {
          resolve(file);
        } else {
          cb(null, file);
        }
      }
    }
  }

  // Process the given document (in string or vfile representation), sync.
  function processSync(doc) {
    var file;
    var complete;

    freeze();
    assertParser('processSync', processor.Parser);
    assertCompiler('processSync', processor.Compiler);
    file = vfile(doc);

    process(file, done);

    assertDone('processSync', 'process', complete);

    return file

    function done(error) {
      complete = true;
      bail(error);
    }
  }
}

// Check if `value` is a constructor.
function newable(value, name) {
  return (
    typeof value === 'function' &&
    value.prototype &&
    // A function with keys in its prototype is probably a constructor.
    // Classes’ prototype methods are not enumerable, so we check if some value
    // exists in the prototype.
    (keys(value.prototype) || name in value.prototype)
  )
}

// Check if `value` is an object with keys.
function keys(value) {
  var key;
  for (key in value) {
    return true
  }

  return false
}

// Assert a parser is available.
function assertParser(name, Parser) {
  if (typeof Parser !== 'function') {
    throw new Error('Cannot `' + name + '` without `Parser`')
  }
}

// Assert a compiler is available.
function assertCompiler(name, Compiler) {
  if (typeof Compiler !== 'function') {
    throw new Error('Cannot `' + name + '` without `Compiler`')
  }
}

// Assert the processor is not frozen.
function assertUnfrozen(name, frozen) {
  if (frozen) {
    throw new Error(
      'Cannot invoke `' +
        name +
        '` on a frozen processor.\nCreate a new processor first, by invoking it: use `processor()` instead of `processor`.'
    )
  }
}

// Assert `node` is a unist node.
function assertNode(node) {
  if (!node || typeof node.type !== 'string') {
    throw new Error('Expected node, got `' + node + '`')
  }
}

// Assert that `complete` is `true`.
function assertDone(name, asyncName, complete) {
  if (!complete) {
    throw new Error(
      '`' + name + '` finished async. Use `' + asyncName + '` instead'
    )
  }
}

var mdastUtilToString = toString$3;

// Get the text content of a node.
// Prefer the node’s plain-text fields, otherwise serialize its children,
// and if the given value is an array, serialize the nodes in it.
function toString$3(node) {
  return (
    (node &&
      (node.value ||
        node.alt ||
        node.title ||
        ('children' in node && all(node.children)) ||
        ('length' in node && all(node)))) ||
    ''
  )
}

function all(values) {
  var result = [];
  var index = -1;

  while (++index < values.length) {
    result[index] = toString$3(values[index]);
  }

  return result.join('')
}

var assign$5 = Object.assign;

var assign_1 = assign$5;

var own$4 = {}.hasOwnProperty;

var hasOwnProperty$1 = own$4;

function normalizeIdentifier$3(value) {
  return (
    value // Collapse Markdown whitespace.
      .replace(/[\t\n\r ]+/g, ' ') // Trim.
      .replace(/^ | $/g, '') // Some characters are considered “uppercase”, but if their lowercase
      // counterpart is uppercased will result in a different uppercase
      // character.
      // Hence, to get that form, we perform both lower- and uppercase.
      // Upper case makes sure keys will not interact with default prototypal
      // methods: no object method is uppercase.
      .toLowerCase()
      .toUpperCase()
  )
}

var normalizeIdentifier_1 = normalizeIdentifier$3;

var fromCharCode$4 = String.fromCharCode;

var fromCharCode_1 = fromCharCode$4;

var fromCharCode$3 = fromCharCode_1;

function safeFromInt$1(value, base) {
  var code = parseInt(value, base);

  if (
    // C0 except for HT, LF, FF, CR, space
    code < 9 ||
    code === 11 ||
    (code > 13 && code < 32) || // Control character (DEL) of the basic block and C1 controls.
    (code > 126 && code < 160) || // Lone high surrogates and low surrogates.
    (code > 55295 && code < 57344) || // Noncharacters.
    (code > 64975 && code < 65008) ||
    (code & 65535) === 65535 ||
    (code & 65535) === 65534 || // Out of range
    code > 1114111
  ) {
    return '\uFFFD'
  }

  return fromCharCode$3(code)
}

var safeFromInt_1 = safeFromInt$1;

var content$3 = {};

function markdownLineEnding$j(code) {
  return code < -2
}

var markdownLineEnding_1 = markdownLineEnding$j;

function markdownSpace$9(code) {
  return code === -2 || code === -1 || code === 32
}

var markdownSpace_1 = markdownSpace$9;

var markdownSpace$8 = markdownSpace_1;

function spaceFactory(effects, ok, type, max) {
  var limit = max ? max - 1 : Infinity;
  var size = 0;
  return start

  function start(code) {
    if (markdownSpace$8(code)) {
      effects.enter(type);
      return prefix(code)
    }

    return ok(code)
  }

  function prefix(code) {
    if (markdownSpace$8(code) && size++ < limit) {
      effects.consume(code);
      return prefix
    }

    effects.exit(type);
    return ok(code)
  }
}

var factorySpace$h = spaceFactory;

Object.defineProperty(content$3, '__esModule', {value: true});

var markdownLineEnding$i = markdownLineEnding_1;
var factorySpace$g = factorySpace$h;

var tokenize$2 = initializeContent;

function initializeContent(effects) {
  var contentStart = effects.attempt(
    this.parser.constructs.contentInitial,
    afterContentStartConstruct,
    paragraphInitial
  );
  var previous;
  return contentStart

  function afterContentStartConstruct(code) {
    if (code === null) {
      effects.consume(code);
      return
    }

    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    return factorySpace$g(effects, contentStart, 'linePrefix')
  }

  function paragraphInitial(code) {
    effects.enter('paragraph');
    return lineStart(code)
  }

  function lineStart(code) {
    var token = effects.enter('chunkText', {
      contentType: 'text',
      previous: previous
    });

    if (previous) {
      previous.next = token;
    }

    previous = token;
    return data(code)
  }

  function data(code) {
    if (code === null) {
      effects.exit('chunkText');
      effects.exit('paragraph');
      effects.consume(code);
      return
    }

    if (markdownLineEnding$i(code)) {
      effects.consume(code);
      effects.exit('chunkText');
      return lineStart
    } // Data.

    effects.consume(code);
    return data
  }
}

content$3.tokenize = tokenize$2;

var document$2 = {};

var markdownLineEnding$h = markdownLineEnding_1;
var factorySpace$f = factorySpace$h;

var partialBlankLine$4 = {
  tokenize: tokenizePartialBlankLine,
  partial: true
};

function tokenizePartialBlankLine(effects, ok, nok) {
  return factorySpace$f(effects, afterWhitespace, 'linePrefix')

  function afterWhitespace(code) {
    return code === null || markdownLineEnding$h(code) ? ok(code) : nok(code)
  }
}

var partialBlankLine_1 = partialBlankLine$4;

Object.defineProperty(document$2, '__esModule', {value: true});

var markdownLineEnding$g = markdownLineEnding_1;
var factorySpace$e = factorySpace$h;
var partialBlankLine$3 = partialBlankLine_1;

var tokenize$1 = initializeDocument;
var containerConstruct = {
  tokenize: tokenizeContainer
};
var lazyFlowConstruct = {
  tokenize: tokenizeLazyFlow
};

function initializeDocument(effects) {
  var self = this;
  var stack = [];
  var continued = 0;
  var inspectConstruct = {
    tokenize: tokenizeInspect,
    partial: true
  };
  var inspectResult;
  var childFlow;
  var childToken;
  return start

  function start(code) {
    if (continued < stack.length) {
      self.containerState = stack[continued][1];
      return effects.attempt(
        stack[continued][0].continuation,
        documentContinue,
        documentContinued
      )(code)
    }

    return documentContinued(code)
  }

  function documentContinue(code) {
    continued++;
    return start(code)
  }

  function documentContinued(code) {
    // If we’re in a concrete construct (such as when expecting another line of
    // HTML, or we resulted in lazy content), we can immediately start flow.
    if (inspectResult && inspectResult.flowContinue) {
      return flowStart(code)
    }

    self.interrupt =
      childFlow &&
      childFlow.currentConstruct &&
      childFlow.currentConstruct.interruptible;
    self.containerState = {};
    return effects.attempt(
      containerConstruct,
      containerContinue,
      flowStart
    )(code)
  }

  function containerContinue(code) {
    stack.push([self.currentConstruct, self.containerState]);
    self.containerState = undefined;
    return documentContinued(code)
  }

  function flowStart(code) {
    if (code === null) {
      exitContainers(0, true);
      effects.consume(code);
      return
    }

    childFlow = childFlow || self.parser.flow(self.now());
    effects.enter('chunkFlow', {
      contentType: 'flow',
      previous: childToken,
      _tokenizer: childFlow
    });
    return flowContinue(code)
  }

  function flowContinue(code) {
    if (code === null) {
      continueFlow(effects.exit('chunkFlow'));
      return flowStart(code)
    }

    if (markdownLineEnding$g(code)) {
      effects.consume(code);
      continueFlow(effects.exit('chunkFlow'));
      return effects.check(inspectConstruct, documentAfterPeek)
    }

    effects.consume(code);
    return flowContinue
  }

  function documentAfterPeek(code) {
    exitContainers(
      inspectResult.continued,
      inspectResult && inspectResult.flowEnd
    );
    continued = 0;
    return start(code)
  }

  function continueFlow(token) {
    if (childToken) childToken.next = token;
    childToken = token;
    childFlow.lazy = inspectResult && inspectResult.lazy;
    childFlow.defineSkip(token.start);
    childFlow.write(self.sliceStream(token));
  }

  function exitContainers(size, end) {
    var index = stack.length; // Close the flow.

    if (childFlow && end) {
      childFlow.write([null]);
      childToken = childFlow = undefined;
    } // Exit open containers.

    while (index-- > size) {
      self.containerState = stack[index][1];
      stack[index][0].exit.call(self, effects);
    }

    stack.length = size;
  }

  function tokenizeInspect(effects, ok) {
    var subcontinued = 0;
    inspectResult = {};
    return inspectStart

    function inspectStart(code) {
      if (subcontinued < stack.length) {
        self.containerState = stack[subcontinued][1];
        return effects.attempt(
          stack[subcontinued][0].continuation,
          inspectContinue,
          inspectLess
        )(code)
      } // If we’re continued but in a concrete flow, we can’t have more
      // containers.

      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
        inspectResult.flowContinue = true;
        return inspectDone(code)
      }

      self.interrupt =
        childFlow.currentConstruct && childFlow.currentConstruct.interruptible;
      self.containerState = {};
      return effects.attempt(
        containerConstruct,
        inspectFlowEnd,
        inspectDone
      )(code)
    }

    function inspectContinue(code) {
      subcontinued++;
      return self.containerState._closeFlow
        ? inspectFlowEnd(code)
        : inspectStart(code)
    }

    function inspectLess(code) {
      if (childFlow.currentConstruct && childFlow.currentConstruct.lazy) {
        // Maybe another container?
        self.containerState = {};
        return effects.attempt(
          containerConstruct,
          inspectFlowEnd, // Maybe flow, or a blank line?
          effects.attempt(
            lazyFlowConstruct,
            inspectFlowEnd,
            effects.check(partialBlankLine$3, inspectFlowEnd, inspectLazy)
          )
        )(code)
      } // Otherwise we’re interrupting.

      return inspectFlowEnd(code)
    }

    function inspectLazy(code) {
      // Act as if all containers are continued.
      subcontinued = stack.length;
      inspectResult.lazy = true;
      inspectResult.flowContinue = true;
      return inspectDone(code)
    } // We’re done with flow if we have more containers, or an interruption.

    function inspectFlowEnd(code) {
      inspectResult.flowEnd = true;
      return inspectDone(code)
    }

    function inspectDone(code) {
      inspectResult.continued = subcontinued;
      self.interrupt = self.containerState = undefined;
      return ok(code)
    }
  }
}

function tokenizeContainer(effects, ok, nok) {
  return factorySpace$e(
    effects,
    effects.attempt(this.parser.constructs.document, ok, nok),
    'linePrefix',
    this.parser.constructs.disable.null.indexOf('codeIndented') > -1
      ? undefined
      : 4
  )
}

function tokenizeLazyFlow(effects, ok, nok) {
  return factorySpace$e(
    effects,
    effects.lazy(this.parser.constructs.flow, ok, nok),
    'linePrefix',
    this.parser.constructs.disable.null.indexOf('codeIndented') > -1
      ? undefined
      : 4
  )
}

document$2.tokenize = tokenize$1;

var flow$7 = {};

// Counts tabs based on their expanded size, and CR+LF as one character.

function sizeChunks$2(chunks) {
  var index = -1;
  var size = 0;

  while (++index < chunks.length) {
    size += typeof chunks[index] === 'string' ? chunks[index].length : 1;
  }

  return size
}

var sizeChunks_1 = sizeChunks$2;

var sizeChunks$1 = sizeChunks_1;

function prefixSize$4(events, type) {
  var tail = events[events.length - 1];
  if (!tail || tail[1].type !== type) return 0
  return sizeChunks$1(tail[2].sliceStream(tail[1]))
}

var prefixSize_1 = prefixSize$4;

var splice$1 = [].splice;

var splice_1 = splice$1;

var splice = splice_1;

// causes a stack overflow in V8 when trying to insert 100k items for instance.

function chunkedSplice$8(list, start, remove, items) {
  var end = list.length;
  var chunkStart = 0;
  var parameters; // Make start between zero and `end` (included).

  if (start < 0) {
    start = -start > end ? 0 : end + start;
  } else {
    start = start > end ? end : start;
  }

  remove = remove > 0 ? remove : 0; // No need to chunk the items if there’s only a couple (10k) items.

  if (items.length < 10000) {
    parameters = Array.from(items);
    parameters.unshift(start, remove);
    splice.apply(list, parameters);
  } else {
    // Delete `remove` items starting from `start`
    if (remove) splice.apply(list, [start, remove]); // Insert the items in chunks to not cause stack overflows.

    while (chunkStart < items.length) {
      parameters = items.slice(chunkStart, chunkStart + 10000);
      parameters.unshift(start, 0);
      splice.apply(list, parameters);
      chunkStart += 10000;
      start += 10000;
    }
  }
}

var chunkedSplice_1 = chunkedSplice$8;

var assign$4 = assign_1;

function shallow$6(object) {
  return assign$4({}, object)
}

var shallow_1 = shallow$6;

var assign$3 = assign_1;
var chunkedSplice$7 = chunkedSplice_1;
var shallow$5 = shallow_1;

function subtokenize$2(events) {
  var jumps = {};
  var index = -1;
  var event;
  var lineIndex;
  var otherIndex;
  var otherEvent;
  var parameters;
  var subevents;
  var more;

  while (++index < events.length) {
    while (index in jumps) {
      index = jumps[index];
    }

    event = events[index]; // Add a hook for the GFM tasklist extension, which needs to know if text
    // is in the first content of a list item.

    if (
      index &&
      event[1].type === 'chunkFlow' &&
      events[index - 1][1].type === 'listItemPrefix'
    ) {
      subevents = event[1]._tokenizer.events;
      otherIndex = 0;

      if (
        otherIndex < subevents.length &&
        subevents[otherIndex][1].type === 'lineEndingBlank'
      ) {
        otherIndex += 2;
      }

      if (
        otherIndex < subevents.length &&
        subevents[otherIndex][1].type === 'content'
      ) {
        while (++otherIndex < subevents.length) {
          if (subevents[otherIndex][1].type === 'content') {
            break
          }

          if (subevents[otherIndex][1].type === 'chunkText') {
            subevents[otherIndex][1].isInFirstContentOfListItem = true;
            otherIndex++;
          }
        }
      }
    } // Enter.

    if (event[0] === 'enter') {
      if (event[1].contentType) {
        assign$3(jumps, subcontent(events, index));
        index = jumps[index];
        more = true;
      }
    } // Exit.
    else if (event[1]._container || event[1]._movePreviousLineEndings) {
      otherIndex = index;
      lineIndex = undefined;

      while (otherIndex--) {
        otherEvent = events[otherIndex];

        if (
          otherEvent[1].type === 'lineEnding' ||
          otherEvent[1].type === 'lineEndingBlank'
        ) {
          if (otherEvent[0] === 'enter') {
            if (lineIndex) {
              events[lineIndex][1].type = 'lineEndingBlank';
            }

            otherEvent[1].type = 'lineEnding';
            lineIndex = otherIndex;
          }
        } else {
          break
        }
      }

      if (lineIndex) {
        // Fix position.
        event[1].end = shallow$5(events[lineIndex][1].start); // Switch container exit w/ line endings.

        parameters = events.slice(lineIndex, index);
        parameters.unshift(event);
        chunkedSplice$7(events, lineIndex, index - lineIndex + 1, parameters);
      }
    }
  }

  return !more
}

function subcontent(events, eventIndex) {
  var token = events[eventIndex][1];
  var context = events[eventIndex][2];
  var startPosition = eventIndex - 1;
  var startPositions = [];
  var tokenizer =
    token._tokenizer || context.parser[token.contentType](token.start);
  var childEvents = tokenizer.events;
  var jumps = [];
  var gaps = {};
  var stream;
  var previous;
  var index;
  var entered;
  var end;
  var adjust; // Loop forward through the linked tokens to pass them in order to the
  // subtokenizer.

  while (token) {
    // Find the position of the event for this token.
    while (events[++startPosition][1] !== token) {
      // Empty.
    }

    startPositions.push(startPosition);

    if (!token._tokenizer) {
      stream = context.sliceStream(token);

      if (!token.next) {
        stream.push(null);
      }

      if (previous) {
        tokenizer.defineSkip(token.start);
      }

      if (token.isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = true;
      }

      tokenizer.write(stream);

      if (token.isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = undefined;
      }
    } // Unravel the next token.

    previous = token;
    token = token.next;
  } // Now, loop back through all events (and linked tokens), to figure out which
  // parts belong where.

  token = previous;
  index = childEvents.length;

  while (index--) {
    // Make sure we’ve at least seen something (final eol is part of the last
    // token).
    if (childEvents[index][0] === 'enter') {
      entered = true;
    } else if (
      // Find a void token that includes a break.
      entered &&
      childEvents[index][1].type === childEvents[index - 1][1].type &&
      childEvents[index][1].start.line !== childEvents[index][1].end.line
    ) {
      add(childEvents.slice(index + 1, end));
      // Help GC.
      token._tokenizer = token.next = undefined;
      token = token.previous;
      end = index + 1;
    }
  }

  // Help GC.
  tokenizer.events = token._tokenizer = token.next = undefined; // Do head:

  add(childEvents.slice(0, end));
  index = -1;
  adjust = 0;

  while (++index < jumps.length) {
    gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
    adjust += jumps[index][1] - jumps[index][0] - 1;
  }

  return gaps

  function add(slice) {
    var start = startPositions.pop();
    jumps.unshift([start, start + slice.length - 1]);
    chunkedSplice$7(events, start, 2, slice);
  }
}

var subtokenize_1 = subtokenize$2;

var markdownLineEnding$f = markdownLineEnding_1;
var prefixSize$3 = prefixSize_1;
var subtokenize$1 = subtokenize_1;
var factorySpace$d = factorySpace$h;

// No name because it must not be turned off.
var content$2 = {
  tokenize: tokenizeContent,
  resolve: resolveContent,
  interruptible: true,
  lazy: true
};
var continuationConstruct = {
  tokenize: tokenizeContinuation,
  partial: true
}; // Content is transparent: it’s parsed right now. That way, definitions are also
// parsed right now: before text in paragraphs (specifically, media) are parsed.

function resolveContent(events) {
  subtokenize$1(events);
  return events
}

function tokenizeContent(effects, ok) {
  var previous;
  return start

  function start(code) {
    effects.enter('content');
    previous = effects.enter('chunkContent', {
      contentType: 'content'
    });
    return data(code)
  }

  function data(code) {
    if (code === null) {
      return contentEnd(code)
    }

    if (markdownLineEnding$f(code)) {
      return effects.check(
        continuationConstruct,
        contentContinue,
        contentEnd
      )(code)
    } // Data.

    effects.consume(code);
    return data
  }

  function contentEnd(code) {
    effects.exit('chunkContent');
    effects.exit('content');
    return ok(code)
  }

  function contentContinue(code) {
    effects.consume(code);
    effects.exit('chunkContent');
    previous = previous.next = effects.enter('chunkContent', {
      contentType: 'content',
      previous: previous
    });
    return data
  }
}

function tokenizeContinuation(effects, ok, nok) {
  var self = this;
  return startLookahead

  function startLookahead(code) {
    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    return factorySpace$d(effects, prefixed, 'linePrefix')
  }

  function prefixed(code) {
    if (code === null || markdownLineEnding$f(code)) {
      return nok(code)
    }

    if (
      self.parser.constructs.disable.null.indexOf('codeIndented') > -1 ||
      prefixSize$3(self.events, 'linePrefix') < 4
    ) {
      return effects.interrupt(self.parser.constructs.flow, nok, ok)(code)
    }

    return ok(code)
  }
}

var content_1 = content$2;

Object.defineProperty(flow$7, '__esModule', {value: true});

var content$1 = content_1;
var factorySpace$c = factorySpace$h;
var partialBlankLine$2 = partialBlankLine_1;

var tokenize = initializeFlow;

function initializeFlow(effects) {
  var self = this;
  var initial = effects.attempt(
    // Try to parse a blank line.
    partialBlankLine$2,
    atBlankEnding, // Try to parse initial flow (essentially, only code).
    effects.attempt(
      this.parser.constructs.flowInitial,
      afterConstruct,
      factorySpace$c(
        effects,
        effects.attempt(
          this.parser.constructs.flow,
          afterConstruct,
          effects.attempt(content$1, afterConstruct)
        ),
        'linePrefix'
      )
    )
  );
  return initial

  function atBlankEnding(code) {
    if (code === null) {
      effects.consume(code);
      return
    }

    effects.enter('lineEndingBlank');
    effects.consume(code);
    effects.exit('lineEndingBlank');
    self.currentConstruct = undefined;
    return initial
  }

  function afterConstruct(code) {
    if (code === null) {
      effects.consume(code);
      return
    }

    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    self.currentConstruct = undefined;
    return initial
  }
}

flow$7.tokenize = tokenize;

var text$4 = {};

Object.defineProperty(text$4, '__esModule', {value: true});

var assign$2 = assign_1;
var shallow$4 = shallow_1;

var text$3 = initializeFactory('text');
var string$1 = initializeFactory('string');
var resolver = {
  resolveAll: createResolver()
};

function initializeFactory(field) {
  return {
    tokenize: initializeText,
    resolveAll: createResolver(
      field === 'text' ? resolveAllLineSuffixes : undefined
    )
  }

  function initializeText(effects) {
    var self = this;
    var constructs = this.parser.constructs[field];
    var text = effects.attempt(constructs, start, notText);
    return start

    function start(code) {
      return atBreak(code) ? text(code) : notText(code)
    }

    function notText(code) {
      if (code === null) {
        effects.consume(code);
        return
      }

      effects.enter('data');
      effects.consume(code);
      return data
    }

    function data(code) {
      if (atBreak(code)) {
        effects.exit('data');
        return text(code)
      } // Data.

      effects.consume(code);
      return data
    }

    function atBreak(code) {
      var list = constructs[code];
      var index = -1;

      if (code === null) {
        return true
      }

      if (list) {
        while (++index < list.length) {
          if (
            !list[index].previous ||
            list[index].previous.call(self, self.previous)
          ) {
            return true
          }
        }
      }
    }
  }
}

function createResolver(extraResolver) {
  return resolveAllText

  function resolveAllText(events, context) {
    var index = -1;
    var enter; // A rather boring computation (to merge adjacent `data` events) which
    // improves mm performance by 29%.

    while (++index <= events.length) {
      if (enter === undefined) {
        if (events[index] && events[index][1].type === 'data') {
          enter = index;
          index++;
        }
      } else if (!events[index] || events[index][1].type !== 'data') {
        // Don’t do anything if there is one data token.
        if (index !== enter + 2) {
          events[enter][1].end = events[index - 1][1].end;
          events.splice(enter + 2, index - enter - 2);
          index = enter + 2;
        }

        enter = undefined;
      }
    }

    return extraResolver ? extraResolver(events, context) : events
  }
} // A rather ugly set of instructions which again looks at chunks in the input
// stream.
// The reason to do this here is that it is *much* faster to parse in reverse.
// And that we can’t hook into `null` to split the line suffix before an EOF.
// To do: figure out if we can make this into a clean utility, or even in core.
// As it will be useful for GFMs literal autolink extension (and maybe even
// tables?)

function resolveAllLineSuffixes(events, context) {
  var eventIndex = -1;
  var chunks;
  var data;
  var chunk;
  var index;
  var bufferIndex;
  var size;
  var tabs;
  var token;

  while (++eventIndex <= events.length) {
    if (
      (eventIndex === events.length ||
        events[eventIndex][1].type === 'lineEnding') &&
      events[eventIndex - 1][1].type === 'data'
    ) {
      data = events[eventIndex - 1][1];
      chunks = context.sliceStream(data);
      index = chunks.length;
      bufferIndex = -1;
      size = 0;
      tabs = undefined;

      while (index--) {
        chunk = chunks[index];

        if (typeof chunk === 'string') {
          bufferIndex = chunk.length;

          while (chunk.charCodeAt(bufferIndex - 1) === 32) {
            size++;
            bufferIndex--;
          }

          if (bufferIndex) break
          bufferIndex = -1;
        } // Number
        else if (chunk === -2) {
          tabs = true;
          size++;
        } else if (chunk === -1);
        else {
          // Replacement character, exit.
          index++;
          break
        }
      }

      if (size) {
        token = {
          type:
            eventIndex === events.length || tabs || size < 2
              ? 'lineSuffix'
              : 'hardBreakTrailing',
          start: {
            line: data.end.line,
            column: data.end.column - size,
            offset: data.end.offset - size,
            _index: data.start._index + index,
            _bufferIndex: index
              ? bufferIndex
              : data.start._bufferIndex + bufferIndex
          },
          end: shallow$4(data.end)
        };
        data.end = shallow$4(token.start);

        if (data.start.offset === data.end.offset) {
          assign$2(data, token);
        } else {
          events.splice(
            eventIndex,
            0,
            ['enter', token, context],
            ['exit', token, context]
          );
          eventIndex += 2;
        }
      }

      eventIndex++;
    }
  }

  return events
}

text$4.resolver = resolver;
text$4.string = string$1;
text$4.text = text$3;

function miniflat$3(value) {
  return value === null || value === undefined
    ? []
    : 'length' in value
    ? value
    : [value]
}

var miniflat_1 = miniflat$3;

var hasOwnProperty = hasOwnProperty$1;
var chunkedSplice$6 = chunkedSplice_1;
var miniflat$2 = miniflat_1;

function combineExtensions$1(extensions) {
  var all = {};
  var index = -1;

  while (++index < extensions.length) {
    extension$1(all, extensions[index]);
  }

  return all
}

function extension$1(all, extension) {
  var hook;
  var left;
  var right;
  var code;

  for (hook in extension) {
    left = hasOwnProperty.call(all, hook) ? all[hook] : (all[hook] = {});
    right = extension[hook];

    for (code in right) {
      left[code] = constructs$2(
        miniflat$2(right[code]),
        hasOwnProperty.call(left, code) ? left[code] : []
      );
    }
  }
}

function constructs$2(list, existing) {
  var index = -1;
  var before = [];

  while (++index < list.length) {
(list[index].add === 'after' ? existing : before).push(list[index]);
  }

  chunkedSplice$6(existing, 0, 0, before);
  return existing
}

var combineExtensions_1 = combineExtensions$1;

var chunkedSplice$5 = chunkedSplice_1;

function chunkedPush$3(list, items) {
  if (list.length) {
    chunkedSplice$5(list, list.length, 0, items);
    return list
  }

  return items
}

var chunkedPush_1 = chunkedPush$3;

function resolveAll$3(constructs, events, context) {
  var called = [];
  var index = -1;
  var resolve;

  while (++index < constructs.length) {
    resolve = constructs[index].resolveAll;

    if (resolve && called.indexOf(resolve) < 0) {
      events = resolve(events, context);
      called.push(resolve);
    }
  }

  return events
}

var resolveAll_1 = resolveAll$3;

var fromCharCode$2 = fromCharCode_1;

function serializeChunks$1(chunks) {
  var index = -1;
  var result = [];
  var chunk;
  var value;
  var atTab;

  while (++index < chunks.length) {
    chunk = chunks[index];

    if (typeof chunk === 'string') {
      value = chunk;
    } else if (chunk === -5) {
      value = '\r';
    } else if (chunk === -4) {
      value = '\n';
    } else if (chunk === -3) {
      value = '\r' + '\n';
    } else if (chunk === -2) {
      value = '\t';
    } else if (chunk === -1) {
      if (atTab) continue
      value = ' ';
    } else {
      // Currently only replacement character.
      value = fromCharCode$2(chunk);
    }

    atTab = chunk === -2;
    result.push(value);
  }

  return result.join('')
}

var serializeChunks_1 = serializeChunks$1;

function sliceChunks$1(chunks, token) {
  var startIndex = token.start._index;
  var startBufferIndex = token.start._bufferIndex;
  var endIndex = token.end._index;
  var endBufferIndex = token.end._bufferIndex;
  var view;

  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);

    if (startBufferIndex > -1) {
      view[0] = view[0].slice(startBufferIndex);
    }

    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }

  return view
}

var sliceChunks_1 = sliceChunks$1;

var assign$1 = assign_1;
var markdownLineEnding$e = markdownLineEnding_1;
var chunkedPush$2 = chunkedPush_1;
var chunkedSplice$4 = chunkedSplice_1;
var miniflat$1 = miniflat_1;
var resolveAll$2 = resolveAll_1;
var serializeChunks = serializeChunks_1;
var shallow$3 = shallow_1;
var sliceChunks = sliceChunks_1;

// Create a tokenizer.
// Tokenizers deal with one type of data (e.g., containers, flow, text).
// The parser is the object dealing with it all.
// `initialize` works like other constructs, except that only its `tokenize`
// function is used, in which case it doesn’t receive an `ok` or `nok`.
// `from` can be given to set the point before the first character, although
// when further lines are indented, they must be set with `defineSkip`.
function createTokenizer$1(parser, initialize, from) {
  var point = from
    ? shallow$3(from)
    : {
        line: 1,
        column: 1,
        offset: 0
      };
  var columnStart = {};
  var resolveAllConstructs = [];
  var chunks = [];
  var stack = [];

  var effects = {
    consume: consume,
    enter: enter,
    exit: exit,
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    }),
    lazy: constructFactory(onsuccessfulcheck, {
      lazy: true
    })
  }; // State and tools for resolving and serializing.

  var context = {
    previous: null,
    events: [],
    parser: parser,
    sliceStream: sliceStream,
    sliceSerialize: sliceSerialize,
    now: now,
    defineSkip: skip,
    write: write
  }; // The state function.

  var state = initialize.tokenize.call(context, effects); // Track which character we expect to be consumed, to catch bugs.

  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  } // Store where we are in the input stream.

  point._index = 0;
  point._bufferIndex = -1;
  return context

  function write(slice) {
    chunks = chunkedPush$2(chunks, slice);
    main(); // Exit if we’re not done, resolve might change stuff.

    if (chunks[chunks.length - 1] !== null) {
      return []
    }

    addResult(initialize, 0); // Otherwise, resolve, and exit.

    context.events = resolveAll$2(resolveAllConstructs, context.events, context);
    return context.events
  } //
  // Tools.
  //

  function sliceSerialize(token) {
    return serializeChunks(sliceStream(token))
  }

  function sliceStream(token) {
    return sliceChunks(chunks, token)
  }

  function now() {
    return shallow$3(point)
  }

  function skip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
  } //
  // State management.
  //
  // Main loop (note that `_index` and `_bufferIndex` in `point` are modified by
  // `consume`).
  // Here is where we walk through the chunks, which either include strings of
  // several characters, or numerical character codes.
  // The reason to do this in a loop instead of a call is so the stack can
  // drain.

  function main() {
    var chunkIndex;
    var chunk;

    while (point._index < chunks.length) {
      chunk = chunks[point._index]; // If we’re in a buffer chunk, loop through it.

      if (typeof chunk === 'string') {
        chunkIndex = point._index;

        if (point._bufferIndex < 0) {
          point._bufferIndex = 0;
        }

        while (
          point._index === chunkIndex &&
          point._bufferIndex < chunk.length
        ) {
          go(chunk.charCodeAt(point._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  } // Deal with one code.

  function go(code) {
    state = state(code);
  } // Move a character forward.

  function consume(code) {
    if (markdownLineEnding$e(code)) {
      point.line++;
      point.column = 1;
      point.offset += code === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code !== -1) {
      point.column++;
      point.offset++;
    } // Not in a string chunk.

    if (point._bufferIndex < 0) {
      point._index++;
    } else {
      point._bufferIndex++; // At end of string chunk.

      if (point._bufferIndex === chunks[point._index].length) {
        point._bufferIndex = -1;
        point._index++;
      }
    } // Expose the previous character.

    context.previous = code; // Mark as consumed.
  } // Start a token.

  function enter(type, fields) {
    var token = fields || {};
    token.type = type;
    token.start = now();
    context.events.push(['enter', token, context]);
    stack.push(token);
    return token
  } // Stop a token.

  function exit(type) {
    var token = stack.pop();
    token.end = now();
    context.events.push(['exit', token, context]);
    return token
  } // Use results.

  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  } // Discard results.

  function onsuccessfulcheck(construct, info) {
    info.restore();
  } // Factory to attempt/check/interrupt.

  function constructFactory(onreturn, fields) {
    return hook // Handle either an object mapping codes to constructs, a list of
    // constructs, or a single construct.

    function hook(constructs, returnState, bogusState) {
      var listOfConstructs;
      var constructIndex;
      var currentConstruct;
      var info;
      return constructs.tokenize || 'length' in constructs
        ? handleListOfConstructs(miniflat$1(constructs))
        : handleMapOfConstructs

      function handleMapOfConstructs(code) {
        if (code in constructs || null in constructs) {
          return handleListOfConstructs(
            constructs.null
              ? /* c8 ignore next */
                miniflat$1(constructs[code]).concat(miniflat$1(constructs.null))
              : constructs[code]
          )(code)
        }

        return bogusState(code)
      }

      function handleListOfConstructs(list) {
        listOfConstructs = list;
        constructIndex = 0;
        return handleConstruct(list[constructIndex])
      }

      function handleConstruct(construct) {
        return start

        function start(code) {
          // To do: not nede to store if there is no bogus state, probably?
          // Currently doesn’t work because `inspect` in document does a check
          // w/o a bogus, which doesn’t make sense. But it does seem to help perf
          // by not storing.
          info = store();
          currentConstruct = construct;

          if (!construct.partial) {
            context.currentConstruct = construct;
          }

          if (
            construct.name &&
            context.parser.constructs.disable.null.indexOf(construct.name) > -1
          ) {
            return nok()
          }

          return construct.tokenize.call(
            fields ? assign$1({}, context, fields) : context,
            effects,
            ok,
            nok
          )(code)
        }
      }

      function ok(code) {
        onreturn(currentConstruct, info);
        return returnState
      }

      function nok(code) {
        info.restore();

        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex])
        }

        return bogusState
      }
    }
  }

  function addResult(construct, from) {
    if (construct.resolveAll && resolveAllConstructs.indexOf(construct) < 0) {
      resolveAllConstructs.push(construct);
    }

    if (construct.resolve) {
      chunkedSplice$4(
        context.events,
        from,
        context.events.length - from,
        construct.resolve(context.events.slice(from), context)
      );
    }

    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }

  function store() {
    var startPoint = now();
    var startPrevious = context.previous;
    var startCurrentConstruct = context.currentConstruct;
    var startEventsIndex = context.events.length;
    var startStack = Array.from(stack);
    return {
      restore: restore,
      from: startEventsIndex
    }

    function restore() {
      point = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
    }
  }

  function accountForPotentialSkip() {
    if (point.line in columnStart && point.column < 2) {
      point.column = columnStart[point.line];
      point.offset += columnStart[point.line] - 1;
    }
  }
}

var createTokenizer_1 = createTokenizer$1;

var constructs$1 = {};

function markdownLineEndingOrSpace$8(code) {
  return code < 0 || code === 32
}

var markdownLineEndingOrSpace_1 = markdownLineEndingOrSpace$8;

// This module is generated by `script/`.
//
// CommonMark handles attention (emphasis, strong) markers based on what comes
// before or after them.
// One such difference is if those characters are Unicode punctuation.
// This script is generated from the Unicode data.
var unicodePunctuation$2 = /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;

var unicodePunctuationRegex$1 = unicodePunctuation$2;

var fromCharCode$1 = fromCharCode_1;

function regexCheck$8(regex) {
  return check

  function check(code) {
    return regex.test(fromCharCode$1(code))
  }
}

var regexCheck_1 = regexCheck$8;

var unicodePunctuationRegex = unicodePunctuationRegex$1;
var regexCheck$7 = regexCheck_1;

// In fact adds to the bundle size.

var unicodePunctuation$1 = regexCheck$7(unicodePunctuationRegex);

var unicodePunctuation_1 = unicodePunctuation$1;

var regexCheck$6 = regexCheck_1;

var unicodeWhitespace$1 = regexCheck$6(/\s/);

var unicodeWhitespace_1 = unicodeWhitespace$1;

var markdownLineEndingOrSpace$7 = markdownLineEndingOrSpace_1;
var unicodePunctuation = unicodePunctuation_1;
var unicodeWhitespace = unicodeWhitespace_1;

// Classify whether a character is unicode whitespace, unicode punctuation, or
// anything else.
// Used for attention (emphasis, strong), whose sequences can open or close
// based on the class of surrounding characters.
function classifyCharacter$1(code) {
  if (
    code === null ||
    markdownLineEndingOrSpace$7(code) ||
    unicodeWhitespace(code)
  ) {
    return 1
  }

  if (unicodePunctuation(code)) {
    return 2
  }
}

var classifyCharacter_1 = classifyCharacter$1;

// chunks (replacement characters, tabs, or line endings).

function movePoint$1(point, offset) {
  point.column += offset;
  point.offset += offset;
  point._bufferIndex += offset;
  return point
}

var movePoint_1 = movePoint$1;

var chunkedPush$1 = chunkedPush_1;
var chunkedSplice$3 = chunkedSplice_1;
var classifyCharacter = classifyCharacter_1;
var movePoint = movePoint_1;
var resolveAll$1 = resolveAll_1;
var shallow$2 = shallow_1;

var attention$1 = {
  name: 'attention',
  tokenize: tokenizeAttention,
  resolveAll: resolveAllAttention
};

function resolveAllAttention(events, context) {
  var index = -1;
  var open;
  var group;
  var text;
  var openingSequence;
  var closingSequence;
  var use;
  var nextEvents;
  var offset; // Walk through all events.
  //
  // Note: performance of this is fine on an mb of normal markdown, but it’s
  // a bottleneck for malicious stuff.

  while (++index < events.length) {
    // Find a token that can close.
    if (
      events[index][0] === 'enter' &&
      events[index][1].type === 'attentionSequence' &&
      events[index][1]._close
    ) {
      open = index; // Now walk back to find an opener.

      while (open--) {
        // Find a token that can open the closer.
        if (
          events[open][0] === 'exit' &&
          events[open][1].type === 'attentionSequence' &&
          events[open][1]._open && // If the markers are the same:
          context.sliceSerialize(events[open][1]).charCodeAt(0) ===
            context.sliceSerialize(events[index][1]).charCodeAt(0)
        ) {
          // If the opening can close or the closing can open,
          // and the close size *is not* a multiple of three,
          // but the sum of the opening and closing size *is* multiple of three,
          // then don’t match.
          if (
            (events[open][1]._close || events[index][1]._open) &&
            (events[index][1].end.offset - events[index][1].start.offset) % 3 &&
            !(
              (events[open][1].end.offset -
                events[open][1].start.offset +
                events[index][1].end.offset -
                events[index][1].start.offset) %
              3
            )
          ) {
            continue
          } // Number of markers to use from the sequence.

          use =
            events[open][1].end.offset - events[open][1].start.offset > 1 &&
            events[index][1].end.offset - events[index][1].start.offset > 1
              ? 2
              : 1;
          openingSequence = {
            type: use > 1 ? 'strongSequence' : 'emphasisSequence',
            start: movePoint(shallow$2(events[open][1].end), -use),
            end: shallow$2(events[open][1].end)
          };
          closingSequence = {
            type: use > 1 ? 'strongSequence' : 'emphasisSequence',
            start: shallow$2(events[index][1].start),
            end: movePoint(shallow$2(events[index][1].start), use)
          };
          text = {
            type: use > 1 ? 'strongText' : 'emphasisText',
            start: shallow$2(events[open][1].end),
            end: shallow$2(events[index][1].start)
          };
          group = {
            type: use > 1 ? 'strong' : 'emphasis',
            start: shallow$2(openingSequence.start),
            end: shallow$2(closingSequence.end)
          };
          events[open][1].end = shallow$2(openingSequence.start);
          events[index][1].start = shallow$2(closingSequence.end);
          nextEvents = []; // If there are more markers in the opening, add them before.

          if (events[open][1].end.offset - events[open][1].start.offset) {
            nextEvents = chunkedPush$1(nextEvents, [
              ['enter', events[open][1], context],
              ['exit', events[open][1], context]
            ]);
          } // Opening.

          nextEvents = chunkedPush$1(nextEvents, [
            ['enter', group, context],
            ['enter', openingSequence, context],
            ['exit', openingSequence, context],
            ['enter', text, context]
          ]); // Between.

          nextEvents = chunkedPush$1(
            nextEvents,
            resolveAll$1(
              context.parser.constructs.insideSpan.null,
              events.slice(open + 1, index),
              context
            )
          ); // Closing.

          nextEvents = chunkedPush$1(nextEvents, [
            ['exit', text, context],
            ['enter', closingSequence, context],
            ['exit', closingSequence, context],
            ['exit', group, context]
          ]); // If there are more markers in the closing, add them after.

          if (events[index][1].end.offset - events[index][1].start.offset) {
            offset = 2;
            nextEvents = chunkedPush$1(nextEvents, [
              ['enter', events[index][1], context],
              ['exit', events[index][1], context]
            ]);
          } else {
            offset = 0;
          }

          chunkedSplice$3(events, open - 1, index - open + 3, nextEvents);
          index = open + nextEvents.length - offset - 2;
          break
        }
      }
    }
  } // Remove remaining sequences.

  index = -1;

  while (++index < events.length) {
    if (events[index][1].type === 'attentionSequence') {
      events[index][1].type = 'data';
    }
  }

  return events
}

function tokenizeAttention(effects, ok) {
  var before = classifyCharacter(this.previous);
  var marker;
  return start

  function start(code) {
    effects.enter('attentionSequence');
    marker = code;
    return sequence(code)
  }

  function sequence(code) {
    var token;
    var after;
    var open;
    var close;

    if (code === marker) {
      effects.consume(code);
      return sequence
    }

    token = effects.exit('attentionSequence');
    after = classifyCharacter(code);
    open = !after || (after === 2 && before);
    close = !before || (before === 2 && after);
    token._open = marker === 42 ? open : open && (before || !close);
    token._close = marker === 42 ? close : close && (after || !open);
    return ok(code)
  }
}

var attention_1 = attention$1;

var regexCheck$5 = regexCheck_1;

var asciiAlpha$3 = regexCheck$5(/[A-Za-z]/);

var asciiAlpha_1 = asciiAlpha$3;

var regexCheck$4 = regexCheck_1;

var asciiAlphanumeric$4 = regexCheck$4(/[\dA-Za-z]/);

var asciiAlphanumeric_1 = asciiAlphanumeric$4;

var regexCheck$3 = regexCheck_1;

var asciiAtext$1 = regexCheck$3(/[#-'*+\--9=?A-Z^-~]/);

var asciiAtext_1 = asciiAtext$1;

// Note: EOF is seen as ASCII control here, because `null < 32 == true`.
function asciiControl$2(code) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    code < 32 || code === 127
  )
}

var asciiControl_1 = asciiControl$2;

var asciiAlpha$2 = asciiAlpha_1;
var asciiAlphanumeric$3 = asciiAlphanumeric_1;
var asciiAtext = asciiAtext_1;
var asciiControl$1 = asciiControl_1;

var autolink$1 = {
  name: 'autolink',
  tokenize: tokenizeAutolink
};

function tokenizeAutolink(effects, ok, nok) {
  var size = 1;
  return start

  function start(code) {
    effects.enter('autolink');
    effects.enter('autolinkMarker');
    effects.consume(code);
    effects.exit('autolinkMarker');
    effects.enter('autolinkProtocol');
    return open
  }

  function open(code) {
    if (asciiAlpha$2(code)) {
      effects.consume(code);
      return schemeOrEmailAtext
    }

    return asciiAtext(code) ? emailAtext(code) : nok(code)
  }

  function schemeOrEmailAtext(code) {
    return code === 43 || code === 45 || code === 46 || asciiAlphanumeric$3(code)
      ? schemeInsideOrEmailAtext(code)
      : emailAtext(code)
  }

  function schemeInsideOrEmailAtext(code) {
    if (code === 58) {
      effects.consume(code);
      return urlInside
    }

    if (
      (code === 43 || code === 45 || code === 46 || asciiAlphanumeric$3(code)) &&
      size++ < 32
    ) {
      effects.consume(code);
      return schemeInsideOrEmailAtext
    }

    return emailAtext(code)
  }

  function urlInside(code) {
    if (code === 62) {
      effects.exit('autolinkProtocol');
      return end(code)
    }

    if (code === 32 || code === 60 || asciiControl$1(code)) {
      return nok(code)
    }

    effects.consume(code);
    return urlInside
  }

  function emailAtext(code) {
    if (code === 64) {
      effects.consume(code);
      size = 0;
      return emailAtSignOrDot
    }

    if (asciiAtext(code)) {
      effects.consume(code);
      return emailAtext
    }

    return nok(code)
  }

  function emailAtSignOrDot(code) {
    return asciiAlphanumeric$3(code) ? emailLabel(code) : nok(code)
  }

  function emailLabel(code) {
    if (code === 46) {
      effects.consume(code);
      size = 0;
      return emailAtSignOrDot
    }

    if (code === 62) {
      // Exit, then change the type.
      effects.exit('autolinkProtocol').type = 'autolinkEmail';
      return end(code)
    }

    return emailValue(code)
  }

  function emailValue(code) {
    if ((code === 45 || asciiAlphanumeric$3(code)) && size++ < 63) {
      effects.consume(code);
      return code === 45 ? emailValue : emailLabel
    }

    return nok(code)
  }

  function end(code) {
    effects.enter('autolinkMarker');
    effects.consume(code);
    effects.exit('autolinkMarker');
    effects.exit('autolink');
    return ok
  }
}

var autolink_1 = autolink$1;

var markdownSpace$7 = markdownSpace_1;
var factorySpace$b = factorySpace$h;

var blockQuote$1 = {
  name: 'blockQuote',
  tokenize: tokenizeBlockQuoteStart,
  continuation: {
    tokenize: tokenizeBlockQuoteContinuation
  },
  exit: exit
};

function tokenizeBlockQuoteStart(effects, ok, nok) {
  var self = this;
  return start

  function start(code) {
    if (code === 62) {
      if (!self.containerState.open) {
        effects.enter('blockQuote', {
          _container: true
        });
        self.containerState.open = true;
      }

      effects.enter('blockQuotePrefix');
      effects.enter('blockQuoteMarker');
      effects.consume(code);
      effects.exit('blockQuoteMarker');
      return after
    }

    return nok(code)
  }

  function after(code) {
    if (markdownSpace$7(code)) {
      effects.enter('blockQuotePrefixWhitespace');
      effects.consume(code);
      effects.exit('blockQuotePrefixWhitespace');
      effects.exit('blockQuotePrefix');
      return ok
    }

    effects.exit('blockQuotePrefix');
    return ok(code)
  }
}

function tokenizeBlockQuoteContinuation(effects, ok, nok) {
  return factorySpace$b(
    effects,
    effects.attempt(blockQuote$1, ok, nok),
    'linePrefix',
    this.parser.constructs.disable.null.indexOf('codeIndented') > -1
      ? undefined
      : 4
  )
}

function exit(effects) {
  effects.exit('blockQuote');
}

var blockQuote_1 = blockQuote$1;

var regexCheck$2 = regexCheck_1;

var asciiPunctuation$1 = regexCheck$2(/[!-/:-@[-`{-~]/);

var asciiPunctuation_1 = asciiPunctuation$1;

var asciiPunctuation = asciiPunctuation_1;

var characterEscape$2 = {
  name: 'characterEscape',
  tokenize: tokenizeCharacterEscape
};

function tokenizeCharacterEscape(effects, ok, nok) {
  return start

  function start(code) {
    effects.enter('characterEscape');
    effects.enter('escapeMarker');
    effects.consume(code);
    effects.exit('escapeMarker');
    return open
  }

  function open(code) {
    if (asciiPunctuation(code)) {
      effects.enter('characterEscapeValue');
      effects.consume(code);
      effects.exit('characterEscapeValue');
      effects.exit('characterEscape');
      return ok
    }

    return nok(code)
  }
}

var characterEscape_1 = characterEscape$2;

var AEli = "Æ";
var AElig = "Æ";
var AM = "&";
var AMP = "&";
var Aacut = "Á";
var Aacute = "Á";
var Abreve = "Ă";
var Acir = "Â";
var Acirc = "Â";
var Acy = "А";
var Afr = "𝔄";
var Agrav = "À";
var Agrave = "À";
var Alpha = "Α";
var Amacr = "Ā";
var And = "⩓";
var Aogon = "Ą";
var Aopf = "𝔸";
var ApplyFunction = "⁡";
var Arin = "Å";
var Aring = "Å";
var Ascr = "𝒜";
var Assign = "≔";
var Atild = "Ã";
var Atilde = "Ã";
var Aum = "Ä";
var Auml = "Ä";
var Backslash = "∖";
var Barv = "⫧";
var Barwed = "⌆";
var Bcy = "Б";
var Because = "∵";
var Bernoullis = "ℬ";
var Beta = "Β";
var Bfr = "𝔅";
var Bopf = "𝔹";
var Breve = "˘";
var Bscr = "ℬ";
var Bumpeq = "≎";
var CHcy = "Ч";
var COP = "©";
var COPY = "©";
var Cacute = "Ć";
var Cap = "⋒";
var CapitalDifferentialD = "ⅅ";
var Cayleys = "ℭ";
var Ccaron = "Č";
var Ccedi = "Ç";
var Ccedil = "Ç";
var Ccirc = "Ĉ";
var Cconint = "∰";
var Cdot = "Ċ";
var Cedilla = "¸";
var CenterDot = "·";
var Cfr = "ℭ";
var Chi = "Χ";
var CircleDot = "⊙";
var CircleMinus = "⊖";
var CirclePlus = "⊕";
var CircleTimes = "⊗";
var ClockwiseContourIntegral = "∲";
var CloseCurlyDoubleQuote = "”";
var CloseCurlyQuote = "’";
var Colon = "∷";
var Colone = "⩴";
var Congruent = "≡";
var Conint = "∯";
var ContourIntegral = "∮";
var Copf = "ℂ";
var Coproduct = "∐";
var CounterClockwiseContourIntegral = "∳";
var Cross = "⨯";
var Cscr = "𝒞";
var Cup = "⋓";
var CupCap = "≍";
var DD = "ⅅ";
var DDotrahd = "⤑";
var DJcy = "Ђ";
var DScy = "Ѕ";
var DZcy = "Џ";
var Dagger = "‡";
var Darr = "↡";
var Dashv = "⫤";
var Dcaron = "Ď";
var Dcy = "Д";
var Del = "∇";
var Delta = "Δ";
var Dfr = "𝔇";
var DiacriticalAcute = "´";
var DiacriticalDot = "˙";
var DiacriticalDoubleAcute = "˝";
var DiacriticalGrave = "`";
var DiacriticalTilde = "˜";
var Diamond = "⋄";
var DifferentialD = "ⅆ";
var Dopf = "𝔻";
var Dot = "¨";
var DotDot = "⃜";
var DotEqual = "≐";
var DoubleContourIntegral = "∯";
var DoubleDot = "¨";
var DoubleDownArrow = "⇓";
var DoubleLeftArrow = "⇐";
var DoubleLeftRightArrow = "⇔";
var DoubleLeftTee = "⫤";
var DoubleLongLeftArrow = "⟸";
var DoubleLongLeftRightArrow = "⟺";
var DoubleLongRightArrow = "⟹";
var DoubleRightArrow = "⇒";
var DoubleRightTee = "⊨";
var DoubleUpArrow = "⇑";
var DoubleUpDownArrow = "⇕";
var DoubleVerticalBar = "∥";
var DownArrow = "↓";
var DownArrowBar = "⤓";
var DownArrowUpArrow = "⇵";
var DownBreve = "̑";
var DownLeftRightVector = "⥐";
var DownLeftTeeVector = "⥞";
var DownLeftVector = "↽";
var DownLeftVectorBar = "⥖";
var DownRightTeeVector = "⥟";
var DownRightVector = "⇁";
var DownRightVectorBar = "⥗";
var DownTee = "⊤";
var DownTeeArrow = "↧";
var Downarrow = "⇓";
var Dscr = "𝒟";
var Dstrok = "Đ";
var ENG = "Ŋ";
var ET = "Ð";
var ETH = "Ð";
var Eacut = "É";
var Eacute = "É";
var Ecaron = "Ě";
var Ecir = "Ê";
var Ecirc = "Ê";
var Ecy = "Э";
var Edot = "Ė";
var Efr = "𝔈";
var Egrav = "È";
var Egrave = "È";
var Element = "∈";
var Emacr = "Ē";
var EmptySmallSquare = "◻";
var EmptyVerySmallSquare = "▫";
var Eogon = "Ę";
var Eopf = "𝔼";
var Epsilon = "Ε";
var Equal = "⩵";
var EqualTilde = "≂";
var Equilibrium = "⇌";
var Escr = "ℰ";
var Esim = "⩳";
var Eta = "Η";
var Eum = "Ë";
var Euml = "Ë";
var Exists = "∃";
var ExponentialE = "ⅇ";
var Fcy = "Ф";
var Ffr = "𝔉";
var FilledSmallSquare = "◼";
var FilledVerySmallSquare = "▪";
var Fopf = "𝔽";
var ForAll = "∀";
var Fouriertrf = "ℱ";
var Fscr = "ℱ";
var GJcy = "Ѓ";
var G = ">";
var GT = ">";
var Gamma = "Γ";
var Gammad = "Ϝ";
var Gbreve = "Ğ";
var Gcedil = "Ģ";
var Gcirc = "Ĝ";
var Gcy = "Г";
var Gdot = "Ġ";
var Gfr = "𝔊";
var Gg = "⋙";
var Gopf = "𝔾";
var GreaterEqual = "≥";
var GreaterEqualLess = "⋛";
var GreaterFullEqual = "≧";
var GreaterGreater = "⪢";
var GreaterLess = "≷";
var GreaterSlantEqual = "⩾";
var GreaterTilde = "≳";
var Gscr = "𝒢";
var Gt = "≫";
var HARDcy = "Ъ";
var Hacek = "ˇ";
var Hat = "^";
var Hcirc = "Ĥ";
var Hfr = "ℌ";
var HilbertSpace = "ℋ";
var Hopf = "ℍ";
var HorizontalLine = "─";
var Hscr = "ℋ";
var Hstrok = "Ħ";
var HumpDownHump = "≎";
var HumpEqual = "≏";
var IEcy = "Е";
var IJlig = "Ĳ";
var IOcy = "Ё";
var Iacut = "Í";
var Iacute = "Í";
var Icir = "Î";
var Icirc = "Î";
var Icy = "И";
var Idot = "İ";
var Ifr = "ℑ";
var Igrav = "Ì";
var Igrave = "Ì";
var Im = "ℑ";
var Imacr = "Ī";
var ImaginaryI = "ⅈ";
var Implies = "⇒";
var Int = "∬";
var Integral = "∫";
var Intersection = "⋂";
var InvisibleComma = "⁣";
var InvisibleTimes = "⁢";
var Iogon = "Į";
var Iopf = "𝕀";
var Iota = "Ι";
var Iscr = "ℐ";
var Itilde = "Ĩ";
var Iukcy = "І";
var Ium = "Ï";
var Iuml = "Ï";
var Jcirc = "Ĵ";
var Jcy = "Й";
var Jfr = "𝔍";
var Jopf = "𝕁";
var Jscr = "𝒥";
var Jsercy = "Ј";
var Jukcy = "Є";
var KHcy = "Х";
var KJcy = "Ќ";
var Kappa = "Κ";
var Kcedil = "Ķ";
var Kcy = "К";
var Kfr = "𝔎";
var Kopf = "𝕂";
var Kscr = "𝒦";
var LJcy = "Љ";
var L = "<";
var LT = "<";
var Lacute = "Ĺ";
var Lambda = "Λ";
var Lang = "⟪";
var Laplacetrf = "ℒ";
var Larr = "↞";
var Lcaron = "Ľ";
var Lcedil = "Ļ";
var Lcy = "Л";
var LeftAngleBracket = "⟨";
var LeftArrow = "←";
var LeftArrowBar = "⇤";
var LeftArrowRightArrow = "⇆";
var LeftCeiling = "⌈";
var LeftDoubleBracket = "⟦";
var LeftDownTeeVector = "⥡";
var LeftDownVector = "⇃";
var LeftDownVectorBar = "⥙";
var LeftFloor = "⌊";
var LeftRightArrow = "↔";
var LeftRightVector = "⥎";
var LeftTee = "⊣";
var LeftTeeArrow = "↤";
var LeftTeeVector = "⥚";
var LeftTriangle = "⊲";
var LeftTriangleBar = "⧏";
var LeftTriangleEqual = "⊴";
var LeftUpDownVector = "⥑";
var LeftUpTeeVector = "⥠";
var LeftUpVector = "↿";
var LeftUpVectorBar = "⥘";
var LeftVector = "↼";
var LeftVectorBar = "⥒";
var Leftarrow = "⇐";
var Leftrightarrow = "⇔";
var LessEqualGreater = "⋚";
var LessFullEqual = "≦";
var LessGreater = "≶";
var LessLess = "⪡";
var LessSlantEqual = "⩽";
var LessTilde = "≲";
var Lfr = "𝔏";
var Ll = "⋘";
var Lleftarrow = "⇚";
var Lmidot = "Ŀ";
var LongLeftArrow = "⟵";
var LongLeftRightArrow = "⟷";
var LongRightArrow = "⟶";
var Longleftarrow = "⟸";
var Longleftrightarrow = "⟺";
var Longrightarrow = "⟹";
var Lopf = "𝕃";
var LowerLeftArrow = "↙";
var LowerRightArrow = "↘";
var Lscr = "ℒ";
var Lsh = "↰";
var Lstrok = "Ł";
var Lt = "≪";
var Mcy = "М";
var MediumSpace = " ";
var Mellintrf = "ℳ";
var Mfr = "𝔐";
var MinusPlus = "∓";
var Mopf = "𝕄";
var Mscr = "ℳ";
var Mu = "Μ";
var NJcy = "Њ";
var Nacute = "Ń";
var Ncaron = "Ň";
var Ncedil = "Ņ";
var Ncy = "Н";
var NegativeMediumSpace = "​";
var NegativeThickSpace = "​";
var NegativeThinSpace = "​";
var NegativeVeryThinSpace = "​";
var NestedGreaterGreater = "≫";
var NestedLessLess = "≪";
var NewLine = "\n";
var Nfr = "𝔑";
var NoBreak = "⁠";
var NonBreakingSpace = " ";
var Nopf = "ℕ";
var Not = "⫬";
var NotCongruent = "≢";
var NotCupCap = "≭";
var NotDoubleVerticalBar = "∦";
var NotElement = "∉";
var NotEqual = "≠";
var NotEqualTilde = "≂̸";
var NotExists = "∄";
var NotGreater = "≯";
var NotGreaterEqual = "≱";
var NotGreaterFullEqual = "≧̸";
var NotGreaterGreater = "≫̸";
var NotGreaterLess = "≹";
var NotGreaterSlantEqual = "⩾̸";
var NotGreaterTilde = "≵";
var NotHumpDownHump = "≎̸";
var NotHumpEqual = "≏̸";
var NotLeftTriangle = "⋪";
var NotLeftTriangleBar = "⧏̸";
var NotLeftTriangleEqual = "⋬";
var NotLess = "≮";
var NotLessEqual = "≰";
var NotLessGreater = "≸";
var NotLessLess = "≪̸";
var NotLessSlantEqual = "⩽̸";
var NotLessTilde = "≴";
var NotNestedGreaterGreater = "⪢̸";
var NotNestedLessLess = "⪡̸";
var NotPrecedes = "⊀";
var NotPrecedesEqual = "⪯̸";
var NotPrecedesSlantEqual = "⋠";
var NotReverseElement = "∌";
var NotRightTriangle = "⋫";
var NotRightTriangleBar = "⧐̸";
var NotRightTriangleEqual = "⋭";
var NotSquareSubset = "⊏̸";
var NotSquareSubsetEqual = "⋢";
var NotSquareSuperset = "⊐̸";
var NotSquareSupersetEqual = "⋣";
var NotSubset = "⊂⃒";
var NotSubsetEqual = "⊈";
var NotSucceeds = "⊁";
var NotSucceedsEqual = "⪰̸";
var NotSucceedsSlantEqual = "⋡";
var NotSucceedsTilde = "≿̸";
var NotSuperset = "⊃⃒";
var NotSupersetEqual = "⊉";
var NotTilde = "≁";
var NotTildeEqual = "≄";
var NotTildeFullEqual = "≇";
var NotTildeTilde = "≉";
var NotVerticalBar = "∤";
var Nscr = "𝒩";
var Ntild = "Ñ";
var Ntilde = "Ñ";
var Nu = "Ν";
var OElig = "Œ";
var Oacut = "Ó";
var Oacute = "Ó";
var Ocir = "Ô";
var Ocirc = "Ô";
var Ocy = "О";
var Odblac = "Ő";
var Ofr = "𝔒";
var Ograv = "Ò";
var Ograve = "Ò";
var Omacr = "Ō";
var Omega = "Ω";
var Omicron = "Ο";
var Oopf = "𝕆";
var OpenCurlyDoubleQuote = "“";
var OpenCurlyQuote = "‘";
var Or = "⩔";
var Oscr = "𝒪";
var Oslas = "Ø";
var Oslash = "Ø";
var Otild = "Õ";
var Otilde = "Õ";
var Otimes = "⨷";
var Oum = "Ö";
var Ouml = "Ö";
var OverBar = "‾";
var OverBrace = "⏞";
var OverBracket = "⎴";
var OverParenthesis = "⏜";
var PartialD = "∂";
var Pcy = "П";
var Pfr = "𝔓";
var Phi = "Φ";
var Pi = "Π";
var PlusMinus = "±";
var Poincareplane = "ℌ";
var Popf = "ℙ";
var Pr = "⪻";
var Precedes = "≺";
var PrecedesEqual = "⪯";
var PrecedesSlantEqual = "≼";
var PrecedesTilde = "≾";
var Prime = "″";
var Product = "∏";
var Proportion = "∷";
var Proportional = "∝";
var Pscr = "𝒫";
var Psi = "Ψ";
var QUO = "\"";
var QUOT = "\"";
var Qfr = "𝔔";
var Qopf = "ℚ";
var Qscr = "𝒬";
var RBarr = "⤐";
var RE = "®";
var REG = "®";
var Racute = "Ŕ";
var Rang = "⟫";
var Rarr = "↠";
var Rarrtl = "⤖";
var Rcaron = "Ř";
var Rcedil = "Ŗ";
var Rcy = "Р";
var Re = "ℜ";
var ReverseElement = "∋";
var ReverseEquilibrium = "⇋";
var ReverseUpEquilibrium = "⥯";
var Rfr = "ℜ";
var Rho = "Ρ";
var RightAngleBracket = "⟩";
var RightArrow = "→";
var RightArrowBar = "⇥";
var RightArrowLeftArrow = "⇄";
var RightCeiling = "⌉";
var RightDoubleBracket = "⟧";
var RightDownTeeVector = "⥝";
var RightDownVector = "⇂";
var RightDownVectorBar = "⥕";
var RightFloor = "⌋";
var RightTee = "⊢";
var RightTeeArrow = "↦";
var RightTeeVector = "⥛";
var RightTriangle = "⊳";
var RightTriangleBar = "⧐";
var RightTriangleEqual = "⊵";
var RightUpDownVector = "⥏";
var RightUpTeeVector = "⥜";
var RightUpVector = "↾";
var RightUpVectorBar = "⥔";
var RightVector = "⇀";
var RightVectorBar = "⥓";
var Rightarrow = "⇒";
var Ropf = "ℝ";
var RoundImplies = "⥰";
var Rrightarrow = "⇛";
var Rscr = "ℛ";
var Rsh = "↱";
var RuleDelayed = "⧴";
var SHCHcy = "Щ";
var SHcy = "Ш";
var SOFTcy = "Ь";
var Sacute = "Ś";
var Sc = "⪼";
var Scaron = "Š";
var Scedil = "Ş";
var Scirc = "Ŝ";
var Scy = "С";
var Sfr = "𝔖";
var ShortDownArrow = "↓";
var ShortLeftArrow = "←";
var ShortRightArrow = "→";
var ShortUpArrow = "↑";
var Sigma = "Σ";
var SmallCircle = "∘";
var Sopf = "𝕊";
var Sqrt = "√";
var Square = "□";
var SquareIntersection = "⊓";
var SquareSubset = "⊏";
var SquareSubsetEqual = "⊑";
var SquareSuperset = "⊐";
var SquareSupersetEqual = "⊒";
var SquareUnion = "⊔";
var Sscr = "𝒮";
var Star = "⋆";
var Sub = "⋐";
var Subset = "⋐";
var SubsetEqual = "⊆";
var Succeeds = "≻";
var SucceedsEqual = "⪰";
var SucceedsSlantEqual = "≽";
var SucceedsTilde = "≿";
var SuchThat = "∋";
var Sum = "∑";
var Sup = "⋑";
var Superset = "⊃";
var SupersetEqual = "⊇";
var Supset = "⋑";
var THOR = "Þ";
var THORN = "Þ";
var TRADE = "™";
var TSHcy = "Ћ";
var TScy = "Ц";
var Tab = "\t";
var Tau = "Τ";
var Tcaron = "Ť";
var Tcedil = "Ţ";
var Tcy = "Т";
var Tfr = "𝔗";
var Therefore = "∴";
var Theta = "Θ";
var ThickSpace = "  ";
var ThinSpace = " ";
var Tilde = "∼";
var TildeEqual = "≃";
var TildeFullEqual = "≅";
var TildeTilde = "≈";
var Topf = "𝕋";
var TripleDot = "⃛";
var Tscr = "𝒯";
var Tstrok = "Ŧ";
var Uacut = "Ú";
var Uacute = "Ú";
var Uarr = "↟";
var Uarrocir = "⥉";
var Ubrcy = "Ў";
var Ubreve = "Ŭ";
var Ucir = "Û";
var Ucirc = "Û";
var Ucy = "У";
var Udblac = "Ű";
var Ufr = "𝔘";
var Ugrav = "Ù";
var Ugrave = "Ù";
var Umacr = "Ū";
var UnderBar = "_";
var UnderBrace = "⏟";
var UnderBracket = "⎵";
var UnderParenthesis = "⏝";
var Union = "⋃";
var UnionPlus = "⊎";
var Uogon = "Ų";
var Uopf = "𝕌";
var UpArrow = "↑";
var UpArrowBar = "⤒";
var UpArrowDownArrow = "⇅";
var UpDownArrow = "↕";
var UpEquilibrium = "⥮";
var UpTee = "⊥";
var UpTeeArrow = "↥";
var Uparrow = "⇑";
var Updownarrow = "⇕";
var UpperLeftArrow = "↖";
var UpperRightArrow = "↗";
var Upsi = "ϒ";
var Upsilon = "Υ";
var Uring = "Ů";
var Uscr = "𝒰";
var Utilde = "Ũ";
var Uum = "Ü";
var Uuml = "Ü";
var VDash = "⊫";
var Vbar = "⫫";
var Vcy = "В";
var Vdash = "⊩";
var Vdashl = "⫦";
var Vee = "⋁";
var Verbar = "‖";
var Vert = "‖";
var VerticalBar = "∣";
var VerticalLine = "|";
var VerticalSeparator = "❘";
var VerticalTilde = "≀";
var VeryThinSpace = " ";
var Vfr = "𝔙";
var Vopf = "𝕍";
var Vscr = "𝒱";
var Vvdash = "⊪";
var Wcirc = "Ŵ";
var Wedge = "⋀";
var Wfr = "𝔚";
var Wopf = "𝕎";
var Wscr = "𝒲";
var Xfr = "𝔛";
var Xi = "Ξ";
var Xopf = "𝕏";
var Xscr = "𝒳";
var YAcy = "Я";
var YIcy = "Ї";
var YUcy = "Ю";
var Yacut = "Ý";
var Yacute = "Ý";
var Ycirc = "Ŷ";
var Ycy = "Ы";
var Yfr = "𝔜";
var Yopf = "𝕐";
var Yscr = "𝒴";
var Yuml = "Ÿ";
var ZHcy = "Ж";
var Zacute = "Ź";
var Zcaron = "Ž";
var Zcy = "З";
var Zdot = "Ż";
var ZeroWidthSpace = "​";
var Zeta = "Ζ";
var Zfr = "ℨ";
var Zopf = "ℤ";
var Zscr = "𝒵";
var aacut = "á";
var aacute = "á";
var abreve = "ă";
var ac = "∾";
var acE = "∾̳";
var acd = "∿";
var acir = "â";
var acirc = "â";
var acut = "´";
var acute = "´";
var acy = "а";
var aeli = "æ";
var aelig = "æ";
var af = "⁡";
var afr = "𝔞";
var agrav = "à";
var agrave = "à";
var alefsym = "ℵ";
var aleph = "ℵ";
var alpha = "α";
var amacr = "ā";
var amalg = "⨿";
var am = "&";
var amp = "&";
var and = "∧";
var andand = "⩕";
var andd = "⩜";
var andslope = "⩘";
var andv = "⩚";
var ang = "∠";
var ange = "⦤";
var angle = "∠";
var angmsd = "∡";
var angmsdaa = "⦨";
var angmsdab = "⦩";
var angmsdac = "⦪";
var angmsdad = "⦫";
var angmsdae = "⦬";
var angmsdaf = "⦭";
var angmsdag = "⦮";
var angmsdah = "⦯";
var angrt = "∟";
var angrtvb = "⊾";
var angrtvbd = "⦝";
var angsph = "∢";
var angst = "Å";
var angzarr = "⍼";
var aogon = "ą";
var aopf = "𝕒";
var ap = "≈";
var apE = "⩰";
var apacir = "⩯";
var ape = "≊";
var apid = "≋";
var apos = "'";
var approx = "≈";
var approxeq = "≊";
var arin = "å";
var aring = "å";
var ascr = "𝒶";
var ast = "*";
var asymp = "≈";
var asympeq = "≍";
var atild = "ã";
var atilde = "ã";
var aum = "ä";
var auml = "ä";
var awconint = "∳";
var awint = "⨑";
var bNot = "⫭";
var backcong = "≌";
var backepsilon = "϶";
var backprime = "‵";
var backsim = "∽";
var backsimeq = "⋍";
var barvee = "⊽";
var barwed = "⌅";
var barwedge = "⌅";
var bbrk = "⎵";
var bbrktbrk = "⎶";
var bcong = "≌";
var bcy = "б";
var bdquo = "„";
var becaus = "∵";
var because = "∵";
var bemptyv = "⦰";
var bepsi = "϶";
var bernou = "ℬ";
var beta = "β";
var beth = "ℶ";
var between = "≬";
var bfr = "𝔟";
var bigcap = "⋂";
var bigcirc = "◯";
var bigcup = "⋃";
var bigodot = "⨀";
var bigoplus = "⨁";
var bigotimes = "⨂";
var bigsqcup = "⨆";
var bigstar = "★";
var bigtriangledown = "▽";
var bigtriangleup = "△";
var biguplus = "⨄";
var bigvee = "⋁";
var bigwedge = "⋀";
var bkarow = "⤍";
var blacklozenge = "⧫";
var blacksquare = "▪";
var blacktriangle = "▴";
var blacktriangledown = "▾";
var blacktriangleleft = "◂";
var blacktriangleright = "▸";
var blank = "␣";
var blk12 = "▒";
var blk14 = "░";
var blk34 = "▓";
var block = "█";
var bne = "=⃥";
var bnequiv = "≡⃥";
var bnot = "⌐";
var bopf = "𝕓";
var bot = "⊥";
var bottom = "⊥";
var bowtie = "⋈";
var boxDL = "╗";
var boxDR = "╔";
var boxDl = "╖";
var boxDr = "╓";
var boxH = "═";
var boxHD = "╦";
var boxHU = "╩";
var boxHd = "╤";
var boxHu = "╧";
var boxUL = "╝";
var boxUR = "╚";
var boxUl = "╜";
var boxUr = "╙";
var boxV = "║";
var boxVH = "╬";
var boxVL = "╣";
var boxVR = "╠";
var boxVh = "╫";
var boxVl = "╢";
var boxVr = "╟";
var boxbox = "⧉";
var boxdL = "╕";
var boxdR = "╒";
var boxdl = "┐";
var boxdr = "┌";
var boxh = "─";
var boxhD = "╥";
var boxhU = "╨";
var boxhd = "┬";
var boxhu = "┴";
var boxminus = "⊟";
var boxplus = "⊞";
var boxtimes = "⊠";
var boxuL = "╛";
var boxuR = "╘";
var boxul = "┘";
var boxur = "└";
var boxv = "│";
var boxvH = "╪";
var boxvL = "╡";
var boxvR = "╞";
var boxvh = "┼";
var boxvl = "┤";
var boxvr = "├";
var bprime = "‵";
var breve = "˘";
var brvba = "¦";
var brvbar = "¦";
var bscr = "𝒷";
var bsemi = "⁏";
var bsim = "∽";
var bsime = "⋍";
var bsol = "\\";
var bsolb = "⧅";
var bsolhsub = "⟈";
var bull = "•";
var bullet = "•";
var bump = "≎";
var bumpE = "⪮";
var bumpe = "≏";
var bumpeq = "≏";
var cacute = "ć";
var cap = "∩";
var capand = "⩄";
var capbrcup = "⩉";
var capcap = "⩋";
var capcup = "⩇";
var capdot = "⩀";
var caps = "∩︀";
var caret = "⁁";
var caron = "ˇ";
var ccaps = "⩍";
var ccaron = "č";
var ccedi = "ç";
var ccedil = "ç";
var ccirc = "ĉ";
var ccups = "⩌";
var ccupssm = "⩐";
var cdot = "ċ";
var cedi = "¸";
var cedil = "¸";
var cemptyv = "⦲";
var cen = "¢";
var cent = "¢";
var centerdot = "·";
var cfr = "𝔠";
var chcy = "ч";
var check = "✓";
var checkmark = "✓";
var chi = "χ";
var cir = "○";
var cirE = "⧃";
var circ = "ˆ";
var circeq = "≗";
var circlearrowleft = "↺";
var circlearrowright = "↻";
var circledR = "®";
var circledS = "Ⓢ";
var circledast = "⊛";
var circledcirc = "⊚";
var circleddash = "⊝";
var cire = "≗";
var cirfnint = "⨐";
var cirmid = "⫯";
var cirscir = "⧂";
var clubs = "♣";
var clubsuit = "♣";
var colon = ":";
var colone = "≔";
var coloneq = "≔";
var comma = ",";
var commat = "@";
var comp = "∁";
var compfn = "∘";
var complement = "∁";
var complexes = "ℂ";
var cong = "≅";
var congdot = "⩭";
var conint = "∮";
var copf = "𝕔";
var coprod = "∐";
var cop = "©";
var copy = "©";
var copysr = "℗";
var crarr = "↵";
var cross = "✗";
var cscr = "𝒸";
var csub = "⫏";
var csube = "⫑";
var csup = "⫐";
var csupe = "⫒";
var ctdot = "⋯";
var cudarrl = "⤸";
var cudarrr = "⤵";
var cuepr = "⋞";
var cuesc = "⋟";
var cularr = "↶";
var cularrp = "⤽";
var cup = "∪";
var cupbrcap = "⩈";
var cupcap = "⩆";
var cupcup = "⩊";
var cupdot = "⊍";
var cupor = "⩅";
var cups = "∪︀";
var curarr = "↷";
var curarrm = "⤼";
var curlyeqprec = "⋞";
var curlyeqsucc = "⋟";
var curlyvee = "⋎";
var curlywedge = "⋏";
var curre = "¤";
var curren = "¤";
var curvearrowleft = "↶";
var curvearrowright = "↷";
var cuvee = "⋎";
var cuwed = "⋏";
var cwconint = "∲";
var cwint = "∱";
var cylcty = "⌭";
var dArr = "⇓";
var dHar = "⥥";
var dagger = "†";
var daleth = "ℸ";
var darr = "↓";
var dash = "‐";
var dashv = "⊣";
var dbkarow = "⤏";
var dblac = "˝";
var dcaron = "ď";
var dcy = "д";
var dd = "ⅆ";
var ddagger = "‡";
var ddarr = "⇊";
var ddotseq = "⩷";
var de = "°";
var deg = "°";
var delta = "δ";
var demptyv = "⦱";
var dfisht = "⥿";
var dfr = "𝔡";
var dharl = "⇃";
var dharr = "⇂";
var diam = "⋄";
var diamond = "⋄";
var diamondsuit = "♦";
var diams = "♦";
var die = "¨";
var digamma = "ϝ";
var disin = "⋲";
var div = "÷";
var divid = "÷";
var divide = "÷";
var divideontimes = "⋇";
var divonx = "⋇";
var djcy = "ђ";
var dlcorn = "⌞";
var dlcrop = "⌍";
var dollar = "$";
var dopf = "𝕕";
var dot = "˙";
var doteq = "≐";
var doteqdot = "≑";
var dotminus = "∸";
var dotplus = "∔";
var dotsquare = "⊡";
var doublebarwedge = "⌆";
var downarrow = "↓";
var downdownarrows = "⇊";
var downharpoonleft = "⇃";
var downharpoonright = "⇂";
var drbkarow = "⤐";
var drcorn = "⌟";
var drcrop = "⌌";
var dscr = "𝒹";
var dscy = "ѕ";
var dsol = "⧶";
var dstrok = "đ";
var dtdot = "⋱";
var dtri = "▿";
var dtrif = "▾";
var duarr = "⇵";
var duhar = "⥯";
var dwangle = "⦦";
var dzcy = "џ";
var dzigrarr = "⟿";
var eDDot = "⩷";
var eDot = "≑";
var eacut = "é";
var eacute = "é";
var easter = "⩮";
var ecaron = "ě";
var ecir = "ê";
var ecirc = "ê";
var ecolon = "≕";
var ecy = "э";
var edot = "ė";
var ee = "ⅇ";
var efDot = "≒";
var efr = "𝔢";
var eg = "⪚";
var egrav = "è";
var egrave = "è";
var egs = "⪖";
var egsdot = "⪘";
var el = "⪙";
var elinters = "⏧";
var ell = "ℓ";
var els = "⪕";
var elsdot = "⪗";
var emacr = "ē";
var empty = "∅";
var emptyset = "∅";
var emptyv = "∅";
var emsp13 = " ";
var emsp14 = " ";
var emsp = " ";
var eng = "ŋ";
var ensp = " ";
var eogon = "ę";
var eopf = "𝕖";
var epar = "⋕";
var eparsl = "⧣";
var eplus = "⩱";
var epsi = "ε";
var epsilon = "ε";
var epsiv = "ϵ";
var eqcirc = "≖";
var eqcolon = "≕";
var eqsim = "≂";
var eqslantgtr = "⪖";
var eqslantless = "⪕";
var equals = "=";
var equest = "≟";
var equiv = "≡";
var equivDD = "⩸";
var eqvparsl = "⧥";
var erDot = "≓";
var erarr = "⥱";
var escr = "ℯ";
var esdot = "≐";
var esim = "≂";
var eta = "η";
var et = "ð";
var eth = "ð";
var eum = "ë";
var euml = "ë";
var euro = "€";
var excl = "!";
var exist = "∃";
var expectation = "ℰ";
var exponentiale = "ⅇ";
var fallingdotseq = "≒";
var fcy = "ф";
var female = "♀";
var ffilig = "ﬃ";
var fflig = "ﬀ";
var ffllig = "ﬄ";
var ffr = "𝔣";
var filig = "ﬁ";
var fjlig = "fj";
var flat = "♭";
var fllig = "ﬂ";
var fltns = "▱";
var fnof = "ƒ";
var fopf = "𝕗";
var forall = "∀";
var fork = "⋔";
var forkv = "⫙";
var fpartint = "⨍";
var frac1 = "¼";
var frac12 = "½";
var frac13 = "⅓";
var frac14 = "¼";
var frac15 = "⅕";
var frac16 = "⅙";
var frac18 = "⅛";
var frac23 = "⅔";
var frac25 = "⅖";
var frac3 = "¾";
var frac34 = "¾";
var frac35 = "⅗";
var frac38 = "⅜";
var frac45 = "⅘";
var frac56 = "⅚";
var frac58 = "⅝";
var frac78 = "⅞";
var frasl = "⁄";
var frown = "⌢";
var fscr = "𝒻";
var gE = "≧";
var gEl = "⪌";
var gacute = "ǵ";
var gamma = "γ";
var gammad = "ϝ";
var gap = "⪆";
var gbreve = "ğ";
var gcirc = "ĝ";
var gcy = "г";
var gdot = "ġ";
var ge = "≥";
var gel = "⋛";
var geq = "≥";
var geqq = "≧";
var geqslant = "⩾";
var ges = "⩾";
var gescc = "⪩";
var gesdot = "⪀";
var gesdoto = "⪂";
var gesdotol = "⪄";
var gesl = "⋛︀";
var gesles = "⪔";
var gfr = "𝔤";
var gg = "≫";
var ggg = "⋙";
var gimel = "ℷ";
var gjcy = "ѓ";
var gl = "≷";
var glE = "⪒";
var gla = "⪥";
var glj = "⪤";
var gnE = "≩";
var gnap = "⪊";
var gnapprox = "⪊";
var gne = "⪈";
var gneq = "⪈";
var gneqq = "≩";
var gnsim = "⋧";
var gopf = "𝕘";
var grave = "`";
var gscr = "ℊ";
var gsim = "≳";
var gsime = "⪎";
var gsiml = "⪐";
var g = ">";
var gt = ">";
var gtcc = "⪧";
var gtcir = "⩺";
var gtdot = "⋗";
var gtlPar = "⦕";
var gtquest = "⩼";
var gtrapprox = "⪆";
var gtrarr = "⥸";
var gtrdot = "⋗";
var gtreqless = "⋛";
var gtreqqless = "⪌";
var gtrless = "≷";
var gtrsim = "≳";
var gvertneqq = "≩︀";
var gvnE = "≩︀";
var hArr = "⇔";
var hairsp = " ";
var half = "½";
var hamilt = "ℋ";
var hardcy = "ъ";
var harr = "↔";
var harrcir = "⥈";
var harrw = "↭";
var hbar = "ℏ";
var hcirc = "ĥ";
var hearts = "♥";
var heartsuit = "♥";
var hellip = "…";
var hercon = "⊹";
var hfr = "𝔥";
var hksearow = "⤥";
var hkswarow = "⤦";
var hoarr = "⇿";
var homtht = "∻";
var hookleftarrow = "↩";
var hookrightarrow = "↪";
var hopf = "𝕙";
var horbar = "―";
var hscr = "𝒽";
var hslash = "ℏ";
var hstrok = "ħ";
var hybull = "⁃";
var hyphen = "‐";
var iacut = "í";
var iacute = "í";
var ic = "⁣";
var icir = "î";
var icirc = "î";
var icy = "и";
var iecy = "е";
var iexc = "¡";
var iexcl = "¡";
var iff = "⇔";
var ifr = "𝔦";
var igrav = "ì";
var igrave = "ì";
var ii = "ⅈ";
var iiiint = "⨌";
var iiint = "∭";
var iinfin = "⧜";
var iiota = "℩";
var ijlig = "ĳ";
var imacr = "ī";
var image$1 = "ℑ";
var imagline = "ℐ";
var imagpart = "ℑ";
var imath = "ı";
var imof = "⊷";
var imped = "Ƶ";
var incare = "℅";
var infin = "∞";
var infintie = "⧝";
var inodot = "ı";
var int = "∫";
var intcal = "⊺";
var integers = "ℤ";
var intercal = "⊺";
var intlarhk = "⨗";
var intprod = "⨼";
var iocy = "ё";
var iogon = "į";
var iopf = "𝕚";
var iota = "ι";
var iprod = "⨼";
var iques = "¿";
var iquest = "¿";
var iscr = "𝒾";
var isin = "∈";
var isinE = "⋹";
var isindot = "⋵";
var isins = "⋴";
var isinsv = "⋳";
var isinv = "∈";
var it = "⁢";
var itilde = "ĩ";
var iukcy = "і";
var ium = "ï";
var iuml = "ï";
var jcirc = "ĵ";
var jcy = "й";
var jfr = "𝔧";
var jmath = "ȷ";
var jopf = "𝕛";
var jscr = "𝒿";
var jsercy = "ј";
var jukcy = "є";
var kappa = "κ";
var kappav = "ϰ";
var kcedil = "ķ";
var kcy = "к";
var kfr = "𝔨";
var kgreen = "ĸ";
var khcy = "х";
var kjcy = "ќ";
var kopf = "𝕜";
var kscr = "𝓀";
var lAarr = "⇚";
var lArr = "⇐";
var lAtail = "⤛";
var lBarr = "⤎";
var lE = "≦";
var lEg = "⪋";
var lHar = "⥢";
var lacute = "ĺ";
var laemptyv = "⦴";
var lagran = "ℒ";
var lambda = "λ";
var lang = "⟨";
var langd = "⦑";
var langle = "⟨";
var lap = "⪅";
var laqu = "«";
var laquo = "«";
var larr = "←";
var larrb = "⇤";
var larrbfs = "⤟";
var larrfs = "⤝";
var larrhk = "↩";
var larrlp = "↫";
var larrpl = "⤹";
var larrsim = "⥳";
var larrtl = "↢";
var lat = "⪫";
var latail = "⤙";
var late = "⪭";
var lates = "⪭︀";
var lbarr = "⤌";
var lbbrk = "❲";
var lbrace = "{";
var lbrack = "[";
var lbrke = "⦋";
var lbrksld = "⦏";
var lbrkslu = "⦍";
var lcaron = "ľ";
var lcedil = "ļ";
var lceil = "⌈";
var lcub = "{";
var lcy = "л";
var ldca = "⤶";
var ldquo = "“";
var ldquor = "„";
var ldrdhar = "⥧";
var ldrushar = "⥋";
var ldsh = "↲";
var le = "≤";
var leftarrow = "←";
var leftarrowtail = "↢";
var leftharpoondown = "↽";
var leftharpoonup = "↼";
var leftleftarrows = "⇇";
var leftrightarrow = "↔";
var leftrightarrows = "⇆";
var leftrightharpoons = "⇋";
var leftrightsquigarrow = "↭";
var leftthreetimes = "⋋";
var leg = "⋚";
var leq = "≤";
var leqq = "≦";
var leqslant = "⩽";
var les = "⩽";
var lescc = "⪨";
var lesdot = "⩿";
var lesdoto = "⪁";
var lesdotor = "⪃";
var lesg = "⋚︀";
var lesges = "⪓";
var lessapprox = "⪅";
var lessdot = "⋖";
var lesseqgtr = "⋚";
var lesseqqgtr = "⪋";
var lessgtr = "≶";
var lesssim = "≲";
var lfisht = "⥼";
var lfloor = "⌊";
var lfr = "𝔩";
var lg = "≶";
var lgE = "⪑";
var lhard = "↽";
var lharu = "↼";
var lharul = "⥪";
var lhblk = "▄";
var ljcy = "љ";
var ll = "≪";
var llarr = "⇇";
var llcorner = "⌞";
var llhard = "⥫";
var lltri = "◺";
var lmidot = "ŀ";
var lmoust = "⎰";
var lmoustache = "⎰";
var lnE = "≨";
var lnap = "⪉";
var lnapprox = "⪉";
var lne = "⪇";
var lneq = "⪇";
var lneqq = "≨";
var lnsim = "⋦";
var loang = "⟬";
var loarr = "⇽";
var lobrk = "⟦";
var longleftarrow = "⟵";
var longleftrightarrow = "⟷";
var longmapsto = "⟼";
var longrightarrow = "⟶";
var looparrowleft = "↫";
var looparrowright = "↬";
var lopar = "⦅";
var lopf = "𝕝";
var loplus = "⨭";
var lotimes = "⨴";
var lowast = "∗";
var lowbar = "_";
var loz = "◊";
var lozenge = "◊";
var lozf = "⧫";
var lpar = "(";
var lparlt = "⦓";
var lrarr = "⇆";
var lrcorner = "⌟";
var lrhar = "⇋";
var lrhard = "⥭";
var lrm = "‎";
var lrtri = "⊿";
var lsaquo = "‹";
var lscr = "𝓁";
var lsh = "↰";
var lsim = "≲";
var lsime = "⪍";
var lsimg = "⪏";
var lsqb = "[";
var lsquo = "‘";
var lsquor = "‚";
var lstrok = "ł";
var l = "<";
var lt = "<";
var ltcc = "⪦";
var ltcir = "⩹";
var ltdot = "⋖";
var lthree = "⋋";
var ltimes = "⋉";
var ltlarr = "⥶";
var ltquest = "⩻";
var ltrPar = "⦖";
var ltri = "◃";
var ltrie = "⊴";
var ltrif = "◂";
var lurdshar = "⥊";
var luruhar = "⥦";
var lvertneqq = "≨︀";
var lvnE = "≨︀";
var mDDot = "∺";
var mac = "¯";
var macr = "¯";
var male = "♂";
var malt = "✠";
var maltese = "✠";
var map$2 = "↦";
var mapsto = "↦";
var mapstodown = "↧";
var mapstoleft = "↤";
var mapstoup = "↥";
var marker = "▮";
var mcomma = "⨩";
var mcy = "м";
var mdash = "—";
var measuredangle = "∡";
var mfr = "𝔪";
var mho = "℧";
var micr = "µ";
var micro = "µ";
var mid = "∣";
var midast = "*";
var midcir = "⫰";
var middo = "·";
var middot = "·";
var minus = "−";
var minusb = "⊟";
var minusd = "∸";
var minusdu = "⨪";
var mlcp = "⫛";
var mldr = "…";
var mnplus = "∓";
var models = "⊧";
var mopf = "𝕞";
var mp = "∓";
var mscr = "𝓂";
var mstpos = "∾";
var mu = "μ";
var multimap = "⊸";
var mumap = "⊸";
var nGg = "⋙̸";
var nGt = "≫⃒";
var nGtv = "≫̸";
var nLeftarrow = "⇍";
var nLeftrightarrow = "⇎";
var nLl = "⋘̸";
var nLt = "≪⃒";
var nLtv = "≪̸";
var nRightarrow = "⇏";
var nVDash = "⊯";
var nVdash = "⊮";
var nabla = "∇";
var nacute = "ń";
var nang = "∠⃒";
var nap = "≉";
var napE = "⩰̸";
var napid = "≋̸";
var napos = "ŉ";
var napprox = "≉";
var natur = "♮";
var natural = "♮";
var naturals = "ℕ";
var nbs = " ";
var nbsp = " ";
var nbump = "≎̸";
var nbumpe = "≏̸";
var ncap = "⩃";
var ncaron = "ň";
var ncedil = "ņ";
var ncong = "≇";
var ncongdot = "⩭̸";
var ncup = "⩂";
var ncy = "н";
var ndash = "–";
var ne = "≠";
var neArr = "⇗";
var nearhk = "⤤";
var nearr = "↗";
var nearrow = "↗";
var nedot = "≐̸";
var nequiv = "≢";
var nesear = "⤨";
var nesim = "≂̸";
var nexist = "∄";
var nexists = "∄";
var nfr = "𝔫";
var ngE = "≧̸";
var nge = "≱";
var ngeq = "≱";
var ngeqq = "≧̸";
var ngeqslant = "⩾̸";
var nges = "⩾̸";
var ngsim = "≵";
var ngt = "≯";
var ngtr = "≯";
var nhArr = "⇎";
var nharr = "↮";
var nhpar = "⫲";
var ni = "∋";
var nis = "⋼";
var nisd = "⋺";
var niv = "∋";
var njcy = "њ";
var nlArr = "⇍";
var nlE = "≦̸";
var nlarr = "↚";
var nldr = "‥";
var nle = "≰";
var nleftarrow = "↚";
var nleftrightarrow = "↮";
var nleq = "≰";
var nleqq = "≦̸";
var nleqslant = "⩽̸";
var nles = "⩽̸";
var nless = "≮";
var nlsim = "≴";
var nlt = "≮";
var nltri = "⋪";
var nltrie = "⋬";
var nmid = "∤";
var nopf = "𝕟";
var no = "¬";
var not = "¬";
var notin = "∉";
var notinE = "⋹̸";
var notindot = "⋵̸";
var notinva = "∉";
var notinvb = "⋷";
var notinvc = "⋶";
var notni = "∌";
var notniva = "∌";
var notnivb = "⋾";
var notnivc = "⋽";
var npar = "∦";
var nparallel = "∦";
var nparsl = "⫽⃥";
var npart = "∂̸";
var npolint = "⨔";
var npr = "⊀";
var nprcue = "⋠";
var npre = "⪯̸";
var nprec = "⊀";
var npreceq = "⪯̸";
var nrArr = "⇏";
var nrarr = "↛";
var nrarrc = "⤳̸";
var nrarrw = "↝̸";
var nrightarrow = "↛";
var nrtri = "⋫";
var nrtrie = "⋭";
var nsc = "⊁";
var nsccue = "⋡";
var nsce = "⪰̸";
var nscr = "𝓃";
var nshortmid = "∤";
var nshortparallel = "∦";
var nsim = "≁";
var nsime = "≄";
var nsimeq = "≄";
var nsmid = "∤";
var nspar = "∦";
var nsqsube = "⋢";
var nsqsupe = "⋣";
var nsub = "⊄";
var nsubE = "⫅̸";
var nsube = "⊈";
var nsubset = "⊂⃒";
var nsubseteq = "⊈";
var nsubseteqq = "⫅̸";
var nsucc = "⊁";
var nsucceq = "⪰̸";
var nsup = "⊅";
var nsupE = "⫆̸";
var nsupe = "⊉";
var nsupset = "⊃⃒";
var nsupseteq = "⊉";
var nsupseteqq = "⫆̸";
var ntgl = "≹";
var ntild = "ñ";
var ntilde = "ñ";
var ntlg = "≸";
var ntriangleleft = "⋪";
var ntrianglelefteq = "⋬";
var ntriangleright = "⋫";
var ntrianglerighteq = "⋭";
var nu = "ν";
var num = "#";
var numero = "№";
var numsp = " ";
var nvDash = "⊭";
var nvHarr = "⤄";
var nvap = "≍⃒";
var nvdash = "⊬";
var nvge = "≥⃒";
var nvgt = ">⃒";
var nvinfin = "⧞";
var nvlArr = "⤂";
var nvle = "≤⃒";
var nvlt = "<⃒";
var nvltrie = "⊴⃒";
var nvrArr = "⤃";
var nvrtrie = "⊵⃒";
var nvsim = "∼⃒";
var nwArr = "⇖";
var nwarhk = "⤣";
var nwarr = "↖";
var nwarrow = "↖";
var nwnear = "⤧";
var oS = "Ⓢ";
var oacut = "ó";
var oacute = "ó";
var oast = "⊛";
var ocir = "ô";
var ocirc = "ô";
var ocy = "о";
var odash = "⊝";
var odblac = "ő";
var odiv = "⨸";
var odot = "⊙";
var odsold = "⦼";
var oelig = "œ";
var ofcir = "⦿";
var ofr = "𝔬";
var ogon = "˛";
var ograv = "ò";
var ograve = "ò";
var ogt = "⧁";
var ohbar = "⦵";
var ohm = "Ω";
var oint = "∮";
var olarr = "↺";
var olcir = "⦾";
var olcross = "⦻";
var oline = "‾";
var olt = "⧀";
var omacr = "ō";
var omega = "ω";
var omicron = "ο";
var omid = "⦶";
var ominus = "⊖";
var oopf = "𝕠";
var opar = "⦷";
var operp = "⦹";
var oplus = "⊕";
var or = "∨";
var orarr = "↻";
var ord = "º";
var order = "ℴ";
var orderof = "ℴ";
var ordf = "ª";
var ordm = "º";
var origof = "⊶";
var oror = "⩖";
var orslope = "⩗";
var orv = "⩛";
var oscr = "ℴ";
var oslas = "ø";
var oslash = "ø";
var osol = "⊘";
var otild = "õ";
var otilde = "õ";
var otimes = "⊗";
var otimesas = "⨶";
var oum = "ö";
var ouml = "ö";
var ovbar = "⌽";
var par = "¶";
var para = "¶";
var parallel = "∥";
var parsim = "⫳";
var parsl = "⫽";
var part = "∂";
var pcy = "п";
var percnt = "%";
var period = ".";
var permil = "‰";
var perp = "⊥";
var pertenk = "‱";
var pfr = "𝔭";
var phi = "φ";
var phiv = "ϕ";
var phmmat = "ℳ";
var phone = "☎";
var pi = "π";
var pitchfork = "⋔";
var piv = "ϖ";
var planck = "ℏ";
var planckh = "ℎ";
var plankv = "ℏ";
var plus = "+";
var plusacir = "⨣";
var plusb = "⊞";
var pluscir = "⨢";
var plusdo = "∔";
var plusdu = "⨥";
var pluse = "⩲";
var plusm = "±";
var plusmn = "±";
var plussim = "⨦";
var plustwo = "⨧";
var pm = "±";
var pointint = "⨕";
var popf = "𝕡";
var poun = "£";
var pound = "£";
var pr = "≺";
var prE = "⪳";
var prap = "⪷";
var prcue = "≼";
var pre = "⪯";
var prec = "≺";
var precapprox = "⪷";
var preccurlyeq = "≼";
var preceq = "⪯";
var precnapprox = "⪹";
var precneqq = "⪵";
var precnsim = "⋨";
var precsim = "≾";
var prime = "′";
var primes = "ℙ";
var prnE = "⪵";
var prnap = "⪹";
var prnsim = "⋨";
var prod = "∏";
var profalar = "⌮";
var profline = "⌒";
var profsurf = "⌓";
var prop = "∝";
var propto = "∝";
var prsim = "≾";
var prurel = "⊰";
var pscr = "𝓅";
var psi = "ψ";
var puncsp = " ";
var qfr = "𝔮";
var qint = "⨌";
var qopf = "𝕢";
var qprime = "⁗";
var qscr = "𝓆";
var quaternions = "ℍ";
var quatint = "⨖";
var quest = "?";
var questeq = "≟";
var quo = "\"";
var quot = "\"";
var rAarr = "⇛";
var rArr = "⇒";
var rAtail = "⤜";
var rBarr = "⤏";
var rHar = "⥤";
var race = "∽̱";
var racute = "ŕ";
var radic = "√";
var raemptyv = "⦳";
var rang = "⟩";
var rangd = "⦒";
var range$1 = "⦥";
var rangle = "⟩";
var raqu = "»";
var raquo = "»";
var rarr = "→";
var rarrap = "⥵";
var rarrb = "⇥";
var rarrbfs = "⤠";
var rarrc = "⤳";
var rarrfs = "⤞";
var rarrhk = "↪";
var rarrlp = "↬";
var rarrpl = "⥅";
var rarrsim = "⥴";
var rarrtl = "↣";
var rarrw = "↝";
var ratail = "⤚";
var ratio = "∶";
var rationals = "ℚ";
var rbarr = "⤍";
var rbbrk = "❳";
var rbrace = "}";
var rbrack = "]";
var rbrke = "⦌";
var rbrksld = "⦎";
var rbrkslu = "⦐";
var rcaron = "ř";
var rcedil = "ŗ";
var rceil = "⌉";
var rcub = "}";
var rcy = "р";
var rdca = "⤷";
var rdldhar = "⥩";
var rdquo = "”";
var rdquor = "”";
var rdsh = "↳";
var real = "ℜ";
var realine = "ℛ";
var realpart = "ℜ";
var reals = "ℝ";
var rect = "▭";
var re = "®";
var reg = "®";
var rfisht = "⥽";
var rfloor = "⌋";
var rfr = "𝔯";
var rhard = "⇁";
var rharu = "⇀";
var rharul = "⥬";
var rho = "ρ";
var rhov = "ϱ";
var rightarrow = "→";
var rightarrowtail = "↣";
var rightharpoondown = "⇁";
var rightharpoonup = "⇀";
var rightleftarrows = "⇄";
var rightleftharpoons = "⇌";
var rightrightarrows = "⇉";
var rightsquigarrow = "↝";
var rightthreetimes = "⋌";
var ring = "˚";
var risingdotseq = "≓";
var rlarr = "⇄";
var rlhar = "⇌";
var rlm = "‏";
var rmoust = "⎱";
var rmoustache = "⎱";
var rnmid = "⫮";
var roang = "⟭";
var roarr = "⇾";
var robrk = "⟧";
var ropar = "⦆";
var ropf = "𝕣";
var roplus = "⨮";
var rotimes = "⨵";
var rpar = ")";
var rpargt = "⦔";
var rppolint = "⨒";
var rrarr = "⇉";
var rsaquo = "›";
var rscr = "𝓇";
var rsh = "↱";
var rsqb = "]";
var rsquo = "’";
var rsquor = "’";
var rthree = "⋌";
var rtimes = "⋊";
var rtri = "▹";
var rtrie = "⊵";
var rtrif = "▸";
var rtriltri = "⧎";
var ruluhar = "⥨";
var rx = "℞";
var sacute = "ś";
var sbquo = "‚";
var sc = "≻";
var scE = "⪴";
var scap = "⪸";
var scaron = "š";
var sccue = "≽";
var sce = "⪰";
var scedil = "ş";
var scirc = "ŝ";
var scnE = "⪶";
var scnap = "⪺";
var scnsim = "⋩";
var scpolint = "⨓";
var scsim = "≿";
var scy = "с";
var sdot = "⋅";
var sdotb = "⊡";
var sdote = "⩦";
var seArr = "⇘";
var searhk = "⤥";
var searr = "↘";
var searrow = "↘";
var sec = "§";
var sect = "§";
var semi = ";";
var seswar = "⤩";
var setminus = "∖";
var setmn = "∖";
var sext = "✶";
var sfr = "𝔰";
var sfrown = "⌢";
var sharp = "♯";
var shchcy = "щ";
var shcy = "ш";
var shortmid = "∣";
var shortparallel = "∥";
var sh = "­";
var shy = "­";
var sigma = "σ";
var sigmaf = "ς";
var sigmav = "ς";
var sim = "∼";
var simdot = "⩪";
var sime = "≃";
var simeq = "≃";
var simg = "⪞";
var simgE = "⪠";
var siml = "⪝";
var simlE = "⪟";
var simne = "≆";
var simplus = "⨤";
var simrarr = "⥲";
var slarr = "←";
var smallsetminus = "∖";
var smashp = "⨳";
var smeparsl = "⧤";
var smid = "∣";
var smile = "⌣";
var smt = "⪪";
var smte = "⪬";
var smtes = "⪬︀";
var softcy = "ь";
var sol = "/";
var solb = "⧄";
var solbar = "⌿";
var sopf = "𝕤";
var spades = "♠";
var spadesuit = "♠";
var spar = "∥";
var sqcap = "⊓";
var sqcaps = "⊓︀";
var sqcup = "⊔";
var sqcups = "⊔︀";
var sqsub = "⊏";
var sqsube = "⊑";
var sqsubset = "⊏";
var sqsubseteq = "⊑";
var sqsup = "⊐";
var sqsupe = "⊒";
var sqsupset = "⊐";
var sqsupseteq = "⊒";
var squ = "□";
var square = "□";
var squarf = "▪";
var squf = "▪";
var srarr = "→";
var sscr = "𝓈";
var ssetmn = "∖";
var ssmile = "⌣";
var sstarf = "⋆";
var star$1 = "☆";
var starf = "★";
var straightepsilon = "ϵ";
var straightphi = "ϕ";
var strns = "¯";
var sub = "⊂";
var subE = "⫅";
var subdot = "⪽";
var sube = "⊆";
var subedot = "⫃";
var submult = "⫁";
var subnE = "⫋";
var subne = "⊊";
var subplus = "⪿";
var subrarr = "⥹";
var subset = "⊂";
var subseteq = "⊆";
var subseteqq = "⫅";
var subsetneq = "⊊";
var subsetneqq = "⫋";
var subsim = "⫇";
var subsub = "⫕";
var subsup = "⫓";
var succ = "≻";
var succapprox = "⪸";
var succcurlyeq = "≽";
var succeq = "⪰";
var succnapprox = "⪺";
var succneqq = "⪶";
var succnsim = "⋩";
var succsim = "≿";
var sum = "∑";
var sung = "♪";
var sup = "⊃";
var sup1 = "¹";
var sup2 = "²";
var sup3 = "³";
var supE = "⫆";
var supdot = "⪾";
var supdsub = "⫘";
var supe = "⊇";
var supedot = "⫄";
var suphsol = "⟉";
var suphsub = "⫗";
var suplarr = "⥻";
var supmult = "⫂";
var supnE = "⫌";
var supne = "⊋";
var supplus = "⫀";
var supset = "⊃";
var supseteq = "⊇";
var supseteqq = "⫆";
var supsetneq = "⊋";
var supsetneqq = "⫌";
var supsim = "⫈";
var supsub = "⫔";
var supsup = "⫖";
var swArr = "⇙";
var swarhk = "⤦";
var swarr = "↙";
var swarrow = "↙";
var swnwar = "⤪";
var szli = "ß";
var szlig = "ß";
var target = "⌖";
var tau = "τ";
var tbrk = "⎴";
var tcaron = "ť";
var tcedil = "ţ";
var tcy = "т";
var tdot = "⃛";
var telrec = "⌕";
var tfr = "𝔱";
var there4 = "∴";
var therefore = "∴";
var theta = "θ";
var thetasym = "ϑ";
var thetav = "ϑ";
var thickapprox = "≈";
var thicksim = "∼";
var thinsp = " ";
var thkap = "≈";
var thksim = "∼";
var thor = "þ";
var thorn = "þ";
var tilde = "˜";
var time = "×";
var times = "×";
var timesb = "⊠";
var timesbar = "⨱";
var timesd = "⨰";
var tint = "∭";
var toea = "⤨";
var top = "⊤";
var topbot = "⌶";
var topcir = "⫱";
var topf = "𝕥";
var topfork = "⫚";
var tosa = "⤩";
var tprime = "‴";
var trade = "™";
var triangle = "▵";
var triangledown = "▿";
var triangleleft = "◃";
var trianglelefteq = "⊴";
var triangleq = "≜";
var triangleright = "▹";
var trianglerighteq = "⊵";
var tridot = "◬";
var trie = "≜";
var triminus = "⨺";
var triplus = "⨹";
var trisb = "⧍";
var tritime = "⨻";
var trpezium = "⏢";
var tscr = "𝓉";
var tscy = "ц";
var tshcy = "ћ";
var tstrok = "ŧ";
var twixt = "≬";
var twoheadleftarrow = "↞";
var twoheadrightarrow = "↠";
var uArr = "⇑";
var uHar = "⥣";
var uacut = "ú";
var uacute = "ú";
var uarr = "↑";
var ubrcy = "ў";
var ubreve = "ŭ";
var ucir = "û";
var ucirc = "û";
var ucy = "у";
var udarr = "⇅";
var udblac = "ű";
var udhar = "⥮";
var ufisht = "⥾";
var ufr = "𝔲";
var ugrav = "ù";
var ugrave = "ù";
var uharl = "↿";
var uharr = "↾";
var uhblk = "▀";
var ulcorn = "⌜";
var ulcorner = "⌜";
var ulcrop = "⌏";
var ultri = "◸";
var umacr = "ū";
var um = "¨";
var uml = "¨";
var uogon = "ų";
var uopf = "𝕦";
var uparrow = "↑";
var updownarrow = "↕";
var upharpoonleft = "↿";
var upharpoonright = "↾";
var uplus = "⊎";
var upsi = "υ";
var upsih = "ϒ";
var upsilon = "υ";
var upuparrows = "⇈";
var urcorn = "⌝";
var urcorner = "⌝";
var urcrop = "⌎";
var uring = "ů";
var urtri = "◹";
var uscr = "𝓊";
var utdot = "⋰";
var utilde = "ũ";
var utri = "▵";
var utrif = "▴";
var uuarr = "⇈";
var uum = "ü";
var uuml = "ü";
var uwangle = "⦧";
var vArr = "⇕";
var vBar = "⫨";
var vBarv = "⫩";
var vDash = "⊨";
var vangrt = "⦜";
var varepsilon = "ϵ";
var varkappa = "ϰ";
var varnothing = "∅";
var varphi = "ϕ";
var varpi = "ϖ";
var varpropto = "∝";
var varr = "↕";
var varrho = "ϱ";
var varsigma = "ς";
var varsubsetneq = "⊊︀";
var varsubsetneqq = "⫋︀";
var varsupsetneq = "⊋︀";
var varsupsetneqq = "⫌︀";
var vartheta = "ϑ";
var vartriangleleft = "⊲";
var vartriangleright = "⊳";
var vcy = "в";
var vdash = "⊢";
var vee = "∨";
var veebar = "⊻";
var veeeq = "≚";
var vellip = "⋮";
var verbar = "|";
var vert = "|";
var vfr = "𝔳";
var vltri = "⊲";
var vnsub = "⊂⃒";
var vnsup = "⊃⃒";
var vopf = "𝕧";
var vprop = "∝";
var vrtri = "⊳";
var vscr = "𝓋";
var vsubnE = "⫋︀";
var vsubne = "⊊︀";
var vsupnE = "⫌︀";
var vsupne = "⊋︀";
var vzigzag = "⦚";
var wcirc = "ŵ";
var wedbar = "⩟";
var wedge = "∧";
var wedgeq = "≙";
var weierp = "℘";
var wfr = "𝔴";
var wopf = "𝕨";
var wp = "℘";
var wr = "≀";
var wreath = "≀";
var wscr = "𝓌";
var xcap = "⋂";
var xcirc = "◯";
var xcup = "⋃";
var xdtri = "▽";
var xfr = "𝔵";
var xhArr = "⟺";
var xharr = "⟷";
var xi = "ξ";
var xlArr = "⟸";
var xlarr = "⟵";
var xmap = "⟼";
var xnis = "⋻";
var xodot = "⨀";
var xopf = "𝕩";
var xoplus = "⨁";
var xotime = "⨂";
var xrArr = "⟹";
var xrarr = "⟶";
var xscr = "𝓍";
var xsqcup = "⨆";
var xuplus = "⨄";
var xutri = "△";
var xvee = "⋁";
var xwedge = "⋀";
var yacut = "ý";
var yacute = "ý";
var yacy = "я";
var ycirc = "ŷ";
var ycy = "ы";
var ye = "¥";
var yen = "¥";
var yfr = "𝔶";
var yicy = "ї";
var yopf = "𝕪";
var yscr = "𝓎";
var yucy = "ю";
var yum = "ÿ";
var yuml = "ÿ";
var zacute = "ź";
var zcaron = "ž";
var zcy = "з";
var zdot = "ż";
var zeetrf = "ℨ";
var zeta = "ζ";
var zfr = "𝔷";
var zhcy = "ж";
var zigrarr = "⇝";
var zopf = "𝕫";
var zscr = "𝓏";
var zwj = "‍";
var zwnj = "‌";
var require$$0$1 = {
	AEli: AEli,
	AElig: AElig,
	AM: AM,
	AMP: AMP,
	Aacut: Aacut,
	Aacute: Aacute,
	Abreve: Abreve,
	Acir: Acir,
	Acirc: Acirc,
	Acy: Acy,
	Afr: Afr,
	Agrav: Agrav,
	Agrave: Agrave,
	Alpha: Alpha,
	Amacr: Amacr,
	And: And,
	Aogon: Aogon,
	Aopf: Aopf,
	ApplyFunction: ApplyFunction,
	Arin: Arin,
	Aring: Aring,
	Ascr: Ascr,
	Assign: Assign,
	Atild: Atild,
	Atilde: Atilde,
	Aum: Aum,
	Auml: Auml,
	Backslash: Backslash,
	Barv: Barv,
	Barwed: Barwed,
	Bcy: Bcy,
	Because: Because,
	Bernoullis: Bernoullis,
	Beta: Beta,
	Bfr: Bfr,
	Bopf: Bopf,
	Breve: Breve,
	Bscr: Bscr,
	Bumpeq: Bumpeq,
	CHcy: CHcy,
	COP: COP,
	COPY: COPY,
	Cacute: Cacute,
	Cap: Cap,
	CapitalDifferentialD: CapitalDifferentialD,
	Cayleys: Cayleys,
	Ccaron: Ccaron,
	Ccedi: Ccedi,
	Ccedil: Ccedil,
	Ccirc: Ccirc,
	Cconint: Cconint,
	Cdot: Cdot,
	Cedilla: Cedilla,
	CenterDot: CenterDot,
	Cfr: Cfr,
	Chi: Chi,
	CircleDot: CircleDot,
	CircleMinus: CircleMinus,
	CirclePlus: CirclePlus,
	CircleTimes: CircleTimes,
	ClockwiseContourIntegral: ClockwiseContourIntegral,
	CloseCurlyDoubleQuote: CloseCurlyDoubleQuote,
	CloseCurlyQuote: CloseCurlyQuote,
	Colon: Colon,
	Colone: Colone,
	Congruent: Congruent,
	Conint: Conint,
	ContourIntegral: ContourIntegral,
	Copf: Copf,
	Coproduct: Coproduct,
	CounterClockwiseContourIntegral: CounterClockwiseContourIntegral,
	Cross: Cross,
	Cscr: Cscr,
	Cup: Cup,
	CupCap: CupCap,
	DD: DD,
	DDotrahd: DDotrahd,
	DJcy: DJcy,
	DScy: DScy,
	DZcy: DZcy,
	Dagger: Dagger,
	Darr: Darr,
	Dashv: Dashv,
	Dcaron: Dcaron,
	Dcy: Dcy,
	Del: Del,
	Delta: Delta,
	Dfr: Dfr,
	DiacriticalAcute: DiacriticalAcute,
	DiacriticalDot: DiacriticalDot,
	DiacriticalDoubleAcute: DiacriticalDoubleAcute,
	DiacriticalGrave: DiacriticalGrave,
	DiacriticalTilde: DiacriticalTilde,
	Diamond: Diamond,
	DifferentialD: DifferentialD,
	Dopf: Dopf,
	Dot: Dot,
	DotDot: DotDot,
	DotEqual: DotEqual,
	DoubleContourIntegral: DoubleContourIntegral,
	DoubleDot: DoubleDot,
	DoubleDownArrow: DoubleDownArrow,
	DoubleLeftArrow: DoubleLeftArrow,
	DoubleLeftRightArrow: DoubleLeftRightArrow,
	DoubleLeftTee: DoubleLeftTee,
	DoubleLongLeftArrow: DoubleLongLeftArrow,
	DoubleLongLeftRightArrow: DoubleLongLeftRightArrow,
	DoubleLongRightArrow: DoubleLongRightArrow,
	DoubleRightArrow: DoubleRightArrow,
	DoubleRightTee: DoubleRightTee,
	DoubleUpArrow: DoubleUpArrow,
	DoubleUpDownArrow: DoubleUpDownArrow,
	DoubleVerticalBar: DoubleVerticalBar,
	DownArrow: DownArrow,
	DownArrowBar: DownArrowBar,
	DownArrowUpArrow: DownArrowUpArrow,
	DownBreve: DownBreve,
	DownLeftRightVector: DownLeftRightVector,
	DownLeftTeeVector: DownLeftTeeVector,
	DownLeftVector: DownLeftVector,
	DownLeftVectorBar: DownLeftVectorBar,
	DownRightTeeVector: DownRightTeeVector,
	DownRightVector: DownRightVector,
	DownRightVectorBar: DownRightVectorBar,
	DownTee: DownTee,
	DownTeeArrow: DownTeeArrow,
	Downarrow: Downarrow,
	Dscr: Dscr,
	Dstrok: Dstrok,
	ENG: ENG,
	ET: ET,
	ETH: ETH,
	Eacut: Eacut,
	Eacute: Eacute,
	Ecaron: Ecaron,
	Ecir: Ecir,
	Ecirc: Ecirc,
	Ecy: Ecy,
	Edot: Edot,
	Efr: Efr,
	Egrav: Egrav,
	Egrave: Egrave,
	Element: Element,
	Emacr: Emacr,
	EmptySmallSquare: EmptySmallSquare,
	EmptyVerySmallSquare: EmptyVerySmallSquare,
	Eogon: Eogon,
	Eopf: Eopf,
	Epsilon: Epsilon,
	Equal: Equal,
	EqualTilde: EqualTilde,
	Equilibrium: Equilibrium,
	Escr: Escr,
	Esim: Esim,
	Eta: Eta,
	Eum: Eum,
	Euml: Euml,
	Exists: Exists,
	ExponentialE: ExponentialE,
	Fcy: Fcy,
	Ffr: Ffr,
	FilledSmallSquare: FilledSmallSquare,
	FilledVerySmallSquare: FilledVerySmallSquare,
	Fopf: Fopf,
	ForAll: ForAll,
	Fouriertrf: Fouriertrf,
	Fscr: Fscr,
	GJcy: GJcy,
	G: G,
	GT: GT,
	Gamma: Gamma,
	Gammad: Gammad,
	Gbreve: Gbreve,
	Gcedil: Gcedil,
	Gcirc: Gcirc,
	Gcy: Gcy,
	Gdot: Gdot,
	Gfr: Gfr,
	Gg: Gg,
	Gopf: Gopf,
	GreaterEqual: GreaterEqual,
	GreaterEqualLess: GreaterEqualLess,
	GreaterFullEqual: GreaterFullEqual,
	GreaterGreater: GreaterGreater,
	GreaterLess: GreaterLess,
	GreaterSlantEqual: GreaterSlantEqual,
	GreaterTilde: GreaterTilde,
	Gscr: Gscr,
	Gt: Gt,
	HARDcy: HARDcy,
	Hacek: Hacek,
	Hat: Hat,
	Hcirc: Hcirc,
	Hfr: Hfr,
	HilbertSpace: HilbertSpace,
	Hopf: Hopf,
	HorizontalLine: HorizontalLine,
	Hscr: Hscr,
	Hstrok: Hstrok,
	HumpDownHump: HumpDownHump,
	HumpEqual: HumpEqual,
	IEcy: IEcy,
	IJlig: IJlig,
	IOcy: IOcy,
	Iacut: Iacut,
	Iacute: Iacute,
	Icir: Icir,
	Icirc: Icirc,
	Icy: Icy,
	Idot: Idot,
	Ifr: Ifr,
	Igrav: Igrav,
	Igrave: Igrave,
	Im: Im,
	Imacr: Imacr,
	ImaginaryI: ImaginaryI,
	Implies: Implies,
	Int: Int,
	Integral: Integral,
	Intersection: Intersection,
	InvisibleComma: InvisibleComma,
	InvisibleTimes: InvisibleTimes,
	Iogon: Iogon,
	Iopf: Iopf,
	Iota: Iota,
	Iscr: Iscr,
	Itilde: Itilde,
	Iukcy: Iukcy,
	Ium: Ium,
	Iuml: Iuml,
	Jcirc: Jcirc,
	Jcy: Jcy,
	Jfr: Jfr,
	Jopf: Jopf,
	Jscr: Jscr,
	Jsercy: Jsercy,
	Jukcy: Jukcy,
	KHcy: KHcy,
	KJcy: KJcy,
	Kappa: Kappa,
	Kcedil: Kcedil,
	Kcy: Kcy,
	Kfr: Kfr,
	Kopf: Kopf,
	Kscr: Kscr,
	LJcy: LJcy,
	L: L,
	LT: LT,
	Lacute: Lacute,
	Lambda: Lambda,
	Lang: Lang,
	Laplacetrf: Laplacetrf,
	Larr: Larr,
	Lcaron: Lcaron,
	Lcedil: Lcedil,
	Lcy: Lcy,
	LeftAngleBracket: LeftAngleBracket,
	LeftArrow: LeftArrow,
	LeftArrowBar: LeftArrowBar,
	LeftArrowRightArrow: LeftArrowRightArrow,
	LeftCeiling: LeftCeiling,
	LeftDoubleBracket: LeftDoubleBracket,
	LeftDownTeeVector: LeftDownTeeVector,
	LeftDownVector: LeftDownVector,
	LeftDownVectorBar: LeftDownVectorBar,
	LeftFloor: LeftFloor,
	LeftRightArrow: LeftRightArrow,
	LeftRightVector: LeftRightVector,
	LeftTee: LeftTee,
	LeftTeeArrow: LeftTeeArrow,
	LeftTeeVector: LeftTeeVector,
	LeftTriangle: LeftTriangle,
	LeftTriangleBar: LeftTriangleBar,
	LeftTriangleEqual: LeftTriangleEqual,
	LeftUpDownVector: LeftUpDownVector,
	LeftUpTeeVector: LeftUpTeeVector,
	LeftUpVector: LeftUpVector,
	LeftUpVectorBar: LeftUpVectorBar,
	LeftVector: LeftVector,
	LeftVectorBar: LeftVectorBar,
	Leftarrow: Leftarrow,
	Leftrightarrow: Leftrightarrow,
	LessEqualGreater: LessEqualGreater,
	LessFullEqual: LessFullEqual,
	LessGreater: LessGreater,
	LessLess: LessLess,
	LessSlantEqual: LessSlantEqual,
	LessTilde: LessTilde,
	Lfr: Lfr,
	Ll: Ll,
	Lleftarrow: Lleftarrow,
	Lmidot: Lmidot,
	LongLeftArrow: LongLeftArrow,
	LongLeftRightArrow: LongLeftRightArrow,
	LongRightArrow: LongRightArrow,
	Longleftarrow: Longleftarrow,
	Longleftrightarrow: Longleftrightarrow,
	Longrightarrow: Longrightarrow,
	Lopf: Lopf,
	LowerLeftArrow: LowerLeftArrow,
	LowerRightArrow: LowerRightArrow,
	Lscr: Lscr,
	Lsh: Lsh,
	Lstrok: Lstrok,
	Lt: Lt,
	"Map": "⤅",
	Mcy: Mcy,
	MediumSpace: MediumSpace,
	Mellintrf: Mellintrf,
	Mfr: Mfr,
	MinusPlus: MinusPlus,
	Mopf: Mopf,
	Mscr: Mscr,
	Mu: Mu,
	NJcy: NJcy,
	Nacute: Nacute,
	Ncaron: Ncaron,
	Ncedil: Ncedil,
	Ncy: Ncy,
	NegativeMediumSpace: NegativeMediumSpace,
	NegativeThickSpace: NegativeThickSpace,
	NegativeThinSpace: NegativeThinSpace,
	NegativeVeryThinSpace: NegativeVeryThinSpace,
	NestedGreaterGreater: NestedGreaterGreater,
	NestedLessLess: NestedLessLess,
	NewLine: NewLine,
	Nfr: Nfr,
	NoBreak: NoBreak,
	NonBreakingSpace: NonBreakingSpace,
	Nopf: Nopf,
	Not: Not,
	NotCongruent: NotCongruent,
	NotCupCap: NotCupCap,
	NotDoubleVerticalBar: NotDoubleVerticalBar,
	NotElement: NotElement,
	NotEqual: NotEqual,
	NotEqualTilde: NotEqualTilde,
	NotExists: NotExists,
	NotGreater: NotGreater,
	NotGreaterEqual: NotGreaterEqual,
	NotGreaterFullEqual: NotGreaterFullEqual,
	NotGreaterGreater: NotGreaterGreater,
	NotGreaterLess: NotGreaterLess,
	NotGreaterSlantEqual: NotGreaterSlantEqual,
	NotGreaterTilde: NotGreaterTilde,
	NotHumpDownHump: NotHumpDownHump,
	NotHumpEqual: NotHumpEqual,
	NotLeftTriangle: NotLeftTriangle,
	NotLeftTriangleBar: NotLeftTriangleBar,
	NotLeftTriangleEqual: NotLeftTriangleEqual,
	NotLess: NotLess,
	NotLessEqual: NotLessEqual,
	NotLessGreater: NotLessGreater,
	NotLessLess: NotLessLess,
	NotLessSlantEqual: NotLessSlantEqual,
	NotLessTilde: NotLessTilde,
	NotNestedGreaterGreater: NotNestedGreaterGreater,
	NotNestedLessLess: NotNestedLessLess,
	NotPrecedes: NotPrecedes,
	NotPrecedesEqual: NotPrecedesEqual,
	NotPrecedesSlantEqual: NotPrecedesSlantEqual,
	NotReverseElement: NotReverseElement,
	NotRightTriangle: NotRightTriangle,
	NotRightTriangleBar: NotRightTriangleBar,
	NotRightTriangleEqual: NotRightTriangleEqual,
	NotSquareSubset: NotSquareSubset,
	NotSquareSubsetEqual: NotSquareSubsetEqual,
	NotSquareSuperset: NotSquareSuperset,
	NotSquareSupersetEqual: NotSquareSupersetEqual,
	NotSubset: NotSubset,
	NotSubsetEqual: NotSubsetEqual,
	NotSucceeds: NotSucceeds,
	NotSucceedsEqual: NotSucceedsEqual,
	NotSucceedsSlantEqual: NotSucceedsSlantEqual,
	NotSucceedsTilde: NotSucceedsTilde,
	NotSuperset: NotSuperset,
	NotSupersetEqual: NotSupersetEqual,
	NotTilde: NotTilde,
	NotTildeEqual: NotTildeEqual,
	NotTildeFullEqual: NotTildeFullEqual,
	NotTildeTilde: NotTildeTilde,
	NotVerticalBar: NotVerticalBar,
	Nscr: Nscr,
	Ntild: Ntild,
	Ntilde: Ntilde,
	Nu: Nu,
	OElig: OElig,
	Oacut: Oacut,
	Oacute: Oacute,
	Ocir: Ocir,
	Ocirc: Ocirc,
	Ocy: Ocy,
	Odblac: Odblac,
	Ofr: Ofr,
	Ograv: Ograv,
	Ograve: Ograve,
	Omacr: Omacr,
	Omega: Omega,
	Omicron: Omicron,
	Oopf: Oopf,
	OpenCurlyDoubleQuote: OpenCurlyDoubleQuote,
	OpenCurlyQuote: OpenCurlyQuote,
	Or: Or,
	Oscr: Oscr,
	Oslas: Oslas,
	Oslash: Oslash,
	Otild: Otild,
	Otilde: Otilde,
	Otimes: Otimes,
	Oum: Oum,
	Ouml: Ouml,
	OverBar: OverBar,
	OverBrace: OverBrace,
	OverBracket: OverBracket,
	OverParenthesis: OverParenthesis,
	PartialD: PartialD,
	Pcy: Pcy,
	Pfr: Pfr,
	Phi: Phi,
	Pi: Pi,
	PlusMinus: PlusMinus,
	Poincareplane: Poincareplane,
	Popf: Popf,
	Pr: Pr,
	Precedes: Precedes,
	PrecedesEqual: PrecedesEqual,
	PrecedesSlantEqual: PrecedesSlantEqual,
	PrecedesTilde: PrecedesTilde,
	Prime: Prime,
	Product: Product,
	Proportion: Proportion,
	Proportional: Proportional,
	Pscr: Pscr,
	Psi: Psi,
	QUO: QUO,
	QUOT: QUOT,
	Qfr: Qfr,
	Qopf: Qopf,
	Qscr: Qscr,
	RBarr: RBarr,
	RE: RE,
	REG: REG,
	Racute: Racute,
	Rang: Rang,
	Rarr: Rarr,
	Rarrtl: Rarrtl,
	Rcaron: Rcaron,
	Rcedil: Rcedil,
	Rcy: Rcy,
	Re: Re,
	ReverseElement: ReverseElement,
	ReverseEquilibrium: ReverseEquilibrium,
	ReverseUpEquilibrium: ReverseUpEquilibrium,
	Rfr: Rfr,
	Rho: Rho,
	RightAngleBracket: RightAngleBracket,
	RightArrow: RightArrow,
	RightArrowBar: RightArrowBar,
	RightArrowLeftArrow: RightArrowLeftArrow,
	RightCeiling: RightCeiling,
	RightDoubleBracket: RightDoubleBracket,
	RightDownTeeVector: RightDownTeeVector,
	RightDownVector: RightDownVector,
	RightDownVectorBar: RightDownVectorBar,
	RightFloor: RightFloor,
	RightTee: RightTee,
	RightTeeArrow: RightTeeArrow,
	RightTeeVector: RightTeeVector,
	RightTriangle: RightTriangle,
	RightTriangleBar: RightTriangleBar,
	RightTriangleEqual: RightTriangleEqual,
	RightUpDownVector: RightUpDownVector,
	RightUpTeeVector: RightUpTeeVector,
	RightUpVector: RightUpVector,
	RightUpVectorBar: RightUpVectorBar,
	RightVector: RightVector,
	RightVectorBar: RightVectorBar,
	Rightarrow: Rightarrow,
	Ropf: Ropf,
	RoundImplies: RoundImplies,
	Rrightarrow: Rrightarrow,
	Rscr: Rscr,
	Rsh: Rsh,
	RuleDelayed: RuleDelayed,
	SHCHcy: SHCHcy,
	SHcy: SHcy,
	SOFTcy: SOFTcy,
	Sacute: Sacute,
	Sc: Sc,
	Scaron: Scaron,
	Scedil: Scedil,
	Scirc: Scirc,
	Scy: Scy,
	Sfr: Sfr,
	ShortDownArrow: ShortDownArrow,
	ShortLeftArrow: ShortLeftArrow,
	ShortRightArrow: ShortRightArrow,
	ShortUpArrow: ShortUpArrow,
	Sigma: Sigma,
	SmallCircle: SmallCircle,
	Sopf: Sopf,
	Sqrt: Sqrt,
	Square: Square,
	SquareIntersection: SquareIntersection,
	SquareSubset: SquareSubset,
	SquareSubsetEqual: SquareSubsetEqual,
	SquareSuperset: SquareSuperset,
	SquareSupersetEqual: SquareSupersetEqual,
	SquareUnion: SquareUnion,
	Sscr: Sscr,
	Star: Star,
	Sub: Sub,
	Subset: Subset,
	SubsetEqual: SubsetEqual,
	Succeeds: Succeeds,
	SucceedsEqual: SucceedsEqual,
	SucceedsSlantEqual: SucceedsSlantEqual,
	SucceedsTilde: SucceedsTilde,
	SuchThat: SuchThat,
	Sum: Sum,
	Sup: Sup,
	Superset: Superset,
	SupersetEqual: SupersetEqual,
	Supset: Supset,
	THOR: THOR,
	THORN: THORN,
	TRADE: TRADE,
	TSHcy: TSHcy,
	TScy: TScy,
	Tab: Tab,
	Tau: Tau,
	Tcaron: Tcaron,
	Tcedil: Tcedil,
	Tcy: Tcy,
	Tfr: Tfr,
	Therefore: Therefore,
	Theta: Theta,
	ThickSpace: ThickSpace,
	ThinSpace: ThinSpace,
	Tilde: Tilde,
	TildeEqual: TildeEqual,
	TildeFullEqual: TildeFullEqual,
	TildeTilde: TildeTilde,
	Topf: Topf,
	TripleDot: TripleDot,
	Tscr: Tscr,
	Tstrok: Tstrok,
	Uacut: Uacut,
	Uacute: Uacute,
	Uarr: Uarr,
	Uarrocir: Uarrocir,
	Ubrcy: Ubrcy,
	Ubreve: Ubreve,
	Ucir: Ucir,
	Ucirc: Ucirc,
	Ucy: Ucy,
	Udblac: Udblac,
	Ufr: Ufr,
	Ugrav: Ugrav,
	Ugrave: Ugrave,
	Umacr: Umacr,
	UnderBar: UnderBar,
	UnderBrace: UnderBrace,
	UnderBracket: UnderBracket,
	UnderParenthesis: UnderParenthesis,
	Union: Union,
	UnionPlus: UnionPlus,
	Uogon: Uogon,
	Uopf: Uopf,
	UpArrow: UpArrow,
	UpArrowBar: UpArrowBar,
	UpArrowDownArrow: UpArrowDownArrow,
	UpDownArrow: UpDownArrow,
	UpEquilibrium: UpEquilibrium,
	UpTee: UpTee,
	UpTeeArrow: UpTeeArrow,
	Uparrow: Uparrow,
	Updownarrow: Updownarrow,
	UpperLeftArrow: UpperLeftArrow,
	UpperRightArrow: UpperRightArrow,
	Upsi: Upsi,
	Upsilon: Upsilon,
	Uring: Uring,
	Uscr: Uscr,
	Utilde: Utilde,
	Uum: Uum,
	Uuml: Uuml,
	VDash: VDash,
	Vbar: Vbar,
	Vcy: Vcy,
	Vdash: Vdash,
	Vdashl: Vdashl,
	Vee: Vee,
	Verbar: Verbar,
	Vert: Vert,
	VerticalBar: VerticalBar,
	VerticalLine: VerticalLine,
	VerticalSeparator: VerticalSeparator,
	VerticalTilde: VerticalTilde,
	VeryThinSpace: VeryThinSpace,
	Vfr: Vfr,
	Vopf: Vopf,
	Vscr: Vscr,
	Vvdash: Vvdash,
	Wcirc: Wcirc,
	Wedge: Wedge,
	Wfr: Wfr,
	Wopf: Wopf,
	Wscr: Wscr,
	Xfr: Xfr,
	Xi: Xi,
	Xopf: Xopf,
	Xscr: Xscr,
	YAcy: YAcy,
	YIcy: YIcy,
	YUcy: YUcy,
	Yacut: Yacut,
	Yacute: Yacute,
	Ycirc: Ycirc,
	Ycy: Ycy,
	Yfr: Yfr,
	Yopf: Yopf,
	Yscr: Yscr,
	Yuml: Yuml,
	ZHcy: ZHcy,
	Zacute: Zacute,
	Zcaron: Zcaron,
	Zcy: Zcy,
	Zdot: Zdot,
	ZeroWidthSpace: ZeroWidthSpace,
	Zeta: Zeta,
	Zfr: Zfr,
	Zopf: Zopf,
	Zscr: Zscr,
	aacut: aacut,
	aacute: aacute,
	abreve: abreve,
	ac: ac,
	acE: acE,
	acd: acd,
	acir: acir,
	acirc: acirc,
	acut: acut,
	acute: acute,
	acy: acy,
	aeli: aeli,
	aelig: aelig,
	af: af,
	afr: afr,
	agrav: agrav,
	agrave: agrave,
	alefsym: alefsym,
	aleph: aleph,
	alpha: alpha,
	amacr: amacr,
	amalg: amalg,
	am: am,
	amp: amp,
	and: and,
	andand: andand,
	andd: andd,
	andslope: andslope,
	andv: andv,
	ang: ang,
	ange: ange,
	angle: angle,
	angmsd: angmsd,
	angmsdaa: angmsdaa,
	angmsdab: angmsdab,
	angmsdac: angmsdac,
	angmsdad: angmsdad,
	angmsdae: angmsdae,
	angmsdaf: angmsdaf,
	angmsdag: angmsdag,
	angmsdah: angmsdah,
	angrt: angrt,
	angrtvb: angrtvb,
	angrtvbd: angrtvbd,
	angsph: angsph,
	angst: angst,
	angzarr: angzarr,
	aogon: aogon,
	aopf: aopf,
	ap: ap,
	apE: apE,
	apacir: apacir,
	ape: ape,
	apid: apid,
	apos: apos,
	approx: approx,
	approxeq: approxeq,
	arin: arin,
	aring: aring,
	ascr: ascr,
	ast: ast,
	asymp: asymp,
	asympeq: asympeq,
	atild: atild,
	atilde: atilde,
	aum: aum,
	auml: auml,
	awconint: awconint,
	awint: awint,
	bNot: bNot,
	backcong: backcong,
	backepsilon: backepsilon,
	backprime: backprime,
	backsim: backsim,
	backsimeq: backsimeq,
	barvee: barvee,
	barwed: barwed,
	barwedge: barwedge,
	bbrk: bbrk,
	bbrktbrk: bbrktbrk,
	bcong: bcong,
	bcy: bcy,
	bdquo: bdquo,
	becaus: becaus,
	because: because,
	bemptyv: bemptyv,
	bepsi: bepsi,
	bernou: bernou,
	beta: beta,
	beth: beth,
	between: between,
	bfr: bfr,
	bigcap: bigcap,
	bigcirc: bigcirc,
	bigcup: bigcup,
	bigodot: bigodot,
	bigoplus: bigoplus,
	bigotimes: bigotimes,
	bigsqcup: bigsqcup,
	bigstar: bigstar,
	bigtriangledown: bigtriangledown,
	bigtriangleup: bigtriangleup,
	biguplus: biguplus,
	bigvee: bigvee,
	bigwedge: bigwedge,
	bkarow: bkarow,
	blacklozenge: blacklozenge,
	blacksquare: blacksquare,
	blacktriangle: blacktriangle,
	blacktriangledown: blacktriangledown,
	blacktriangleleft: blacktriangleleft,
	blacktriangleright: blacktriangleright,
	blank: blank,
	blk12: blk12,
	blk14: blk14,
	blk34: blk34,
	block: block,
	bne: bne,
	bnequiv: bnequiv,
	bnot: bnot,
	bopf: bopf,
	bot: bot,
	bottom: bottom,
	bowtie: bowtie,
	boxDL: boxDL,
	boxDR: boxDR,
	boxDl: boxDl,
	boxDr: boxDr,
	boxH: boxH,
	boxHD: boxHD,
	boxHU: boxHU,
	boxHd: boxHd,
	boxHu: boxHu,
	boxUL: boxUL,
	boxUR: boxUR,
	boxUl: boxUl,
	boxUr: boxUr,
	boxV: boxV,
	boxVH: boxVH,
	boxVL: boxVL,
	boxVR: boxVR,
	boxVh: boxVh,
	boxVl: boxVl,
	boxVr: boxVr,
	boxbox: boxbox,
	boxdL: boxdL,
	boxdR: boxdR,
	boxdl: boxdl,
	boxdr: boxdr,
	boxh: boxh,
	boxhD: boxhD,
	boxhU: boxhU,
	boxhd: boxhd,
	boxhu: boxhu,
	boxminus: boxminus,
	boxplus: boxplus,
	boxtimes: boxtimes,
	boxuL: boxuL,
	boxuR: boxuR,
	boxul: boxul,
	boxur: boxur,
	boxv: boxv,
	boxvH: boxvH,
	boxvL: boxvL,
	boxvR: boxvR,
	boxvh: boxvh,
	boxvl: boxvl,
	boxvr: boxvr,
	bprime: bprime,
	breve: breve,
	brvba: brvba,
	brvbar: brvbar,
	bscr: bscr,
	bsemi: bsemi,
	bsim: bsim,
	bsime: bsime,
	bsol: bsol,
	bsolb: bsolb,
	bsolhsub: bsolhsub,
	bull: bull,
	bullet: bullet,
	bump: bump,
	bumpE: bumpE,
	bumpe: bumpe,
	bumpeq: bumpeq,
	cacute: cacute,
	cap: cap,
	capand: capand,
	capbrcup: capbrcup,
	capcap: capcap,
	capcup: capcup,
	capdot: capdot,
	caps: caps,
	caret: caret,
	caron: caron,
	ccaps: ccaps,
	ccaron: ccaron,
	ccedi: ccedi,
	ccedil: ccedil,
	ccirc: ccirc,
	ccups: ccups,
	ccupssm: ccupssm,
	cdot: cdot,
	cedi: cedi,
	cedil: cedil,
	cemptyv: cemptyv,
	cen: cen,
	cent: cent,
	centerdot: centerdot,
	cfr: cfr,
	chcy: chcy,
	check: check,
	checkmark: checkmark,
	chi: chi,
	cir: cir,
	cirE: cirE,
	circ: circ,
	circeq: circeq,
	circlearrowleft: circlearrowleft,
	circlearrowright: circlearrowright,
	circledR: circledR,
	circledS: circledS,
	circledast: circledast,
	circledcirc: circledcirc,
	circleddash: circleddash,
	cire: cire,
	cirfnint: cirfnint,
	cirmid: cirmid,
	cirscir: cirscir,
	clubs: clubs,
	clubsuit: clubsuit,
	colon: colon,
	colone: colone,
	coloneq: coloneq,
	comma: comma,
	commat: commat,
	comp: comp,
	compfn: compfn,
	complement: complement,
	complexes: complexes,
	cong: cong,
	congdot: congdot,
	conint: conint,
	copf: copf,
	coprod: coprod,
	cop: cop,
	copy: copy,
	copysr: copysr,
	crarr: crarr,
	cross: cross,
	cscr: cscr,
	csub: csub,
	csube: csube,
	csup: csup,
	csupe: csupe,
	ctdot: ctdot,
	cudarrl: cudarrl,
	cudarrr: cudarrr,
	cuepr: cuepr,
	cuesc: cuesc,
	cularr: cularr,
	cularrp: cularrp,
	cup: cup,
	cupbrcap: cupbrcap,
	cupcap: cupcap,
	cupcup: cupcup,
	cupdot: cupdot,
	cupor: cupor,
	cups: cups,
	curarr: curarr,
	curarrm: curarrm,
	curlyeqprec: curlyeqprec,
	curlyeqsucc: curlyeqsucc,
	curlyvee: curlyvee,
	curlywedge: curlywedge,
	curre: curre,
	curren: curren,
	curvearrowleft: curvearrowleft,
	curvearrowright: curvearrowright,
	cuvee: cuvee,
	cuwed: cuwed,
	cwconint: cwconint,
	cwint: cwint,
	cylcty: cylcty,
	dArr: dArr,
	dHar: dHar,
	dagger: dagger,
	daleth: daleth,
	darr: darr,
	dash: dash,
	dashv: dashv,
	dbkarow: dbkarow,
	dblac: dblac,
	dcaron: dcaron,
	dcy: dcy,
	dd: dd,
	ddagger: ddagger,
	ddarr: ddarr,
	ddotseq: ddotseq,
	de: de,
	deg: deg,
	delta: delta,
	demptyv: demptyv,
	dfisht: dfisht,
	dfr: dfr,
	dharl: dharl,
	dharr: dharr,
	diam: diam,
	diamond: diamond,
	diamondsuit: diamondsuit,
	diams: diams,
	die: die,
	digamma: digamma,
	disin: disin,
	div: div,
	divid: divid,
	divide: divide,
	divideontimes: divideontimes,
	divonx: divonx,
	djcy: djcy,
	dlcorn: dlcorn,
	dlcrop: dlcrop,
	dollar: dollar,
	dopf: dopf,
	dot: dot,
	doteq: doteq,
	doteqdot: doteqdot,
	dotminus: dotminus,
	dotplus: dotplus,
	dotsquare: dotsquare,
	doublebarwedge: doublebarwedge,
	downarrow: downarrow,
	downdownarrows: downdownarrows,
	downharpoonleft: downharpoonleft,
	downharpoonright: downharpoonright,
	drbkarow: drbkarow,
	drcorn: drcorn,
	drcrop: drcrop,
	dscr: dscr,
	dscy: dscy,
	dsol: dsol,
	dstrok: dstrok,
	dtdot: dtdot,
	dtri: dtri,
	dtrif: dtrif,
	duarr: duarr,
	duhar: duhar,
	dwangle: dwangle,
	dzcy: dzcy,
	dzigrarr: dzigrarr,
	eDDot: eDDot,
	eDot: eDot,
	eacut: eacut,
	eacute: eacute,
	easter: easter,
	ecaron: ecaron,
	ecir: ecir,
	ecirc: ecirc,
	ecolon: ecolon,
	ecy: ecy,
	edot: edot,
	ee: ee,
	efDot: efDot,
	efr: efr,
	eg: eg,
	egrav: egrav,
	egrave: egrave,
	egs: egs,
	egsdot: egsdot,
	el: el,
	elinters: elinters,
	ell: ell,
	els: els,
	elsdot: elsdot,
	emacr: emacr,
	empty: empty,
	emptyset: emptyset,
	emptyv: emptyv,
	emsp13: emsp13,
	emsp14: emsp14,
	emsp: emsp,
	eng: eng,
	ensp: ensp,
	eogon: eogon,
	eopf: eopf,
	epar: epar,
	eparsl: eparsl,
	eplus: eplus,
	epsi: epsi,
	epsilon: epsilon,
	epsiv: epsiv,
	eqcirc: eqcirc,
	eqcolon: eqcolon,
	eqsim: eqsim,
	eqslantgtr: eqslantgtr,
	eqslantless: eqslantless,
	equals: equals,
	equest: equest,
	equiv: equiv,
	equivDD: equivDD,
	eqvparsl: eqvparsl,
	erDot: erDot,
	erarr: erarr,
	escr: escr,
	esdot: esdot,
	esim: esim,
	eta: eta,
	et: et,
	eth: eth,
	eum: eum,
	euml: euml,
	euro: euro,
	excl: excl,
	exist: exist,
	expectation: expectation,
	exponentiale: exponentiale,
	fallingdotseq: fallingdotseq,
	fcy: fcy,
	female: female,
	ffilig: ffilig,
	fflig: fflig,
	ffllig: ffllig,
	ffr: ffr,
	filig: filig,
	fjlig: fjlig,
	flat: flat,
	fllig: fllig,
	fltns: fltns,
	fnof: fnof,
	fopf: fopf,
	forall: forall,
	fork: fork,
	forkv: forkv,
	fpartint: fpartint,
	frac1: frac1,
	frac12: frac12,
	frac13: frac13,
	frac14: frac14,
	frac15: frac15,
	frac16: frac16,
	frac18: frac18,
	frac23: frac23,
	frac25: frac25,
	frac3: frac3,
	frac34: frac34,
	frac35: frac35,
	frac38: frac38,
	frac45: frac45,
	frac56: frac56,
	frac58: frac58,
	frac78: frac78,
	frasl: frasl,
	frown: frown,
	fscr: fscr,
	gE: gE,
	gEl: gEl,
	gacute: gacute,
	gamma: gamma,
	gammad: gammad,
	gap: gap,
	gbreve: gbreve,
	gcirc: gcirc,
	gcy: gcy,
	gdot: gdot,
	ge: ge,
	gel: gel,
	geq: geq,
	geqq: geqq,
	geqslant: geqslant,
	ges: ges,
	gescc: gescc,
	gesdot: gesdot,
	gesdoto: gesdoto,
	gesdotol: gesdotol,
	gesl: gesl,
	gesles: gesles,
	gfr: gfr,
	gg: gg,
	ggg: ggg,
	gimel: gimel,
	gjcy: gjcy,
	gl: gl,
	glE: glE,
	gla: gla,
	glj: glj,
	gnE: gnE,
	gnap: gnap,
	gnapprox: gnapprox,
	gne: gne,
	gneq: gneq,
	gneqq: gneqq,
	gnsim: gnsim,
	gopf: gopf,
	grave: grave,
	gscr: gscr,
	gsim: gsim,
	gsime: gsime,
	gsiml: gsiml,
	g: g,
	gt: gt,
	gtcc: gtcc,
	gtcir: gtcir,
	gtdot: gtdot,
	gtlPar: gtlPar,
	gtquest: gtquest,
	gtrapprox: gtrapprox,
	gtrarr: gtrarr,
	gtrdot: gtrdot,
	gtreqless: gtreqless,
	gtreqqless: gtreqqless,
	gtrless: gtrless,
	gtrsim: gtrsim,
	gvertneqq: gvertneqq,
	gvnE: gvnE,
	hArr: hArr,
	hairsp: hairsp,
	half: half,
	hamilt: hamilt,
	hardcy: hardcy,
	harr: harr,
	harrcir: harrcir,
	harrw: harrw,
	hbar: hbar,
	hcirc: hcirc,
	hearts: hearts,
	heartsuit: heartsuit,
	hellip: hellip,
	hercon: hercon,
	hfr: hfr,
	hksearow: hksearow,
	hkswarow: hkswarow,
	hoarr: hoarr,
	homtht: homtht,
	hookleftarrow: hookleftarrow,
	hookrightarrow: hookrightarrow,
	hopf: hopf,
	horbar: horbar,
	hscr: hscr,
	hslash: hslash,
	hstrok: hstrok,
	hybull: hybull,
	hyphen: hyphen,
	iacut: iacut,
	iacute: iacute,
	ic: ic,
	icir: icir,
	icirc: icirc,
	icy: icy,
	iecy: iecy,
	iexc: iexc,
	iexcl: iexcl,
	iff: iff,
	ifr: ifr,
	igrav: igrav,
	igrave: igrave,
	ii: ii,
	iiiint: iiiint,
	iiint: iiint,
	iinfin: iinfin,
	iiota: iiota,
	ijlig: ijlig,
	imacr: imacr,
	image: image$1,
	imagline: imagline,
	imagpart: imagpart,
	imath: imath,
	imof: imof,
	imped: imped,
	"in": "∈",
	incare: incare,
	infin: infin,
	infintie: infintie,
	inodot: inodot,
	int: int,
	intcal: intcal,
	integers: integers,
	intercal: intercal,
	intlarhk: intlarhk,
	intprod: intprod,
	iocy: iocy,
	iogon: iogon,
	iopf: iopf,
	iota: iota,
	iprod: iprod,
	iques: iques,
	iquest: iquest,
	iscr: iscr,
	isin: isin,
	isinE: isinE,
	isindot: isindot,
	isins: isins,
	isinsv: isinsv,
	isinv: isinv,
	it: it,
	itilde: itilde,
	iukcy: iukcy,
	ium: ium,
	iuml: iuml,
	jcirc: jcirc,
	jcy: jcy,
	jfr: jfr,
	jmath: jmath,
	jopf: jopf,
	jscr: jscr,
	jsercy: jsercy,
	jukcy: jukcy,
	kappa: kappa,
	kappav: kappav,
	kcedil: kcedil,
	kcy: kcy,
	kfr: kfr,
	kgreen: kgreen,
	khcy: khcy,
	kjcy: kjcy,
	kopf: kopf,
	kscr: kscr,
	lAarr: lAarr,
	lArr: lArr,
	lAtail: lAtail,
	lBarr: lBarr,
	lE: lE,
	lEg: lEg,
	lHar: lHar,
	lacute: lacute,
	laemptyv: laemptyv,
	lagran: lagran,
	lambda: lambda,
	lang: lang,
	langd: langd,
	langle: langle,
	lap: lap,
	laqu: laqu,
	laquo: laquo,
	larr: larr,
	larrb: larrb,
	larrbfs: larrbfs,
	larrfs: larrfs,
	larrhk: larrhk,
	larrlp: larrlp,
	larrpl: larrpl,
	larrsim: larrsim,
	larrtl: larrtl,
	lat: lat,
	latail: latail,
	late: late,
	lates: lates,
	lbarr: lbarr,
	lbbrk: lbbrk,
	lbrace: lbrace,
	lbrack: lbrack,
	lbrke: lbrke,
	lbrksld: lbrksld,
	lbrkslu: lbrkslu,
	lcaron: lcaron,
	lcedil: lcedil,
	lceil: lceil,
	lcub: lcub,
	lcy: lcy,
	ldca: ldca,
	ldquo: ldquo,
	ldquor: ldquor,
	ldrdhar: ldrdhar,
	ldrushar: ldrushar,
	ldsh: ldsh,
	le: le,
	leftarrow: leftarrow,
	leftarrowtail: leftarrowtail,
	leftharpoondown: leftharpoondown,
	leftharpoonup: leftharpoonup,
	leftleftarrows: leftleftarrows,
	leftrightarrow: leftrightarrow,
	leftrightarrows: leftrightarrows,
	leftrightharpoons: leftrightharpoons,
	leftrightsquigarrow: leftrightsquigarrow,
	leftthreetimes: leftthreetimes,
	leg: leg,
	leq: leq,
	leqq: leqq,
	leqslant: leqslant,
	les: les,
	lescc: lescc,
	lesdot: lesdot,
	lesdoto: lesdoto,
	lesdotor: lesdotor,
	lesg: lesg,
	lesges: lesges,
	lessapprox: lessapprox,
	lessdot: lessdot,
	lesseqgtr: lesseqgtr,
	lesseqqgtr: lesseqqgtr,
	lessgtr: lessgtr,
	lesssim: lesssim,
	lfisht: lfisht,
	lfloor: lfloor,
	lfr: lfr,
	lg: lg,
	lgE: lgE,
	lhard: lhard,
	lharu: lharu,
	lharul: lharul,
	lhblk: lhblk,
	ljcy: ljcy,
	ll: ll,
	llarr: llarr,
	llcorner: llcorner,
	llhard: llhard,
	lltri: lltri,
	lmidot: lmidot,
	lmoust: lmoust,
	lmoustache: lmoustache,
	lnE: lnE,
	lnap: lnap,
	lnapprox: lnapprox,
	lne: lne,
	lneq: lneq,
	lneqq: lneqq,
	lnsim: lnsim,
	loang: loang,
	loarr: loarr,
	lobrk: lobrk,
	longleftarrow: longleftarrow,
	longleftrightarrow: longleftrightarrow,
	longmapsto: longmapsto,
	longrightarrow: longrightarrow,
	looparrowleft: looparrowleft,
	looparrowright: looparrowright,
	lopar: lopar,
	lopf: lopf,
	loplus: loplus,
	lotimes: lotimes,
	lowast: lowast,
	lowbar: lowbar,
	loz: loz,
	lozenge: lozenge,
	lozf: lozf,
	lpar: lpar,
	lparlt: lparlt,
	lrarr: lrarr,
	lrcorner: lrcorner,
	lrhar: lrhar,
	lrhard: lrhard,
	lrm: lrm,
	lrtri: lrtri,
	lsaquo: lsaquo,
	lscr: lscr,
	lsh: lsh,
	lsim: lsim,
	lsime: lsime,
	lsimg: lsimg,
	lsqb: lsqb,
	lsquo: lsquo,
	lsquor: lsquor,
	lstrok: lstrok,
	l: l,
	lt: lt,
	ltcc: ltcc,
	ltcir: ltcir,
	ltdot: ltdot,
	lthree: lthree,
	ltimes: ltimes,
	ltlarr: ltlarr,
	ltquest: ltquest,
	ltrPar: ltrPar,
	ltri: ltri,
	ltrie: ltrie,
	ltrif: ltrif,
	lurdshar: lurdshar,
	luruhar: luruhar,
	lvertneqq: lvertneqq,
	lvnE: lvnE,
	mDDot: mDDot,
	mac: mac,
	macr: macr,
	male: male,
	malt: malt,
	maltese: maltese,
	map: map$2,
	mapsto: mapsto,
	mapstodown: mapstodown,
	mapstoleft: mapstoleft,
	mapstoup: mapstoup,
	marker: marker,
	mcomma: mcomma,
	mcy: mcy,
	mdash: mdash,
	measuredangle: measuredangle,
	mfr: mfr,
	mho: mho,
	micr: micr,
	micro: micro,
	mid: mid,
	midast: midast,
	midcir: midcir,
	middo: middo,
	middot: middot,
	minus: minus,
	minusb: minusb,
	minusd: minusd,
	minusdu: minusdu,
	mlcp: mlcp,
	mldr: mldr,
	mnplus: mnplus,
	models: models,
	mopf: mopf,
	mp: mp,
	mscr: mscr,
	mstpos: mstpos,
	mu: mu,
	multimap: multimap,
	mumap: mumap,
	nGg: nGg,
	nGt: nGt,
	nGtv: nGtv,
	nLeftarrow: nLeftarrow,
	nLeftrightarrow: nLeftrightarrow,
	nLl: nLl,
	nLt: nLt,
	nLtv: nLtv,
	nRightarrow: nRightarrow,
	nVDash: nVDash,
	nVdash: nVdash,
	nabla: nabla,
	nacute: nacute,
	nang: nang,
	nap: nap,
	napE: napE,
	napid: napid,
	napos: napos,
	napprox: napprox,
	natur: natur,
	natural: natural,
	naturals: naturals,
	nbs: nbs,
	nbsp: nbsp,
	nbump: nbump,
	nbumpe: nbumpe,
	ncap: ncap,
	ncaron: ncaron,
	ncedil: ncedil,
	ncong: ncong,
	ncongdot: ncongdot,
	ncup: ncup,
	ncy: ncy,
	ndash: ndash,
	ne: ne,
	neArr: neArr,
	nearhk: nearhk,
	nearr: nearr,
	nearrow: nearrow,
	nedot: nedot,
	nequiv: nequiv,
	nesear: nesear,
	nesim: nesim,
	nexist: nexist,
	nexists: nexists,
	nfr: nfr,
	ngE: ngE,
	nge: nge,
	ngeq: ngeq,
	ngeqq: ngeqq,
	ngeqslant: ngeqslant,
	nges: nges,
	ngsim: ngsim,
	ngt: ngt,
	ngtr: ngtr,
	nhArr: nhArr,
	nharr: nharr,
	nhpar: nhpar,
	ni: ni,
	nis: nis,
	nisd: nisd,
	niv: niv,
	njcy: njcy,
	nlArr: nlArr,
	nlE: nlE,
	nlarr: nlarr,
	nldr: nldr,
	nle: nle,
	nleftarrow: nleftarrow,
	nleftrightarrow: nleftrightarrow,
	nleq: nleq,
	nleqq: nleqq,
	nleqslant: nleqslant,
	nles: nles,
	nless: nless,
	nlsim: nlsim,
	nlt: nlt,
	nltri: nltri,
	nltrie: nltrie,
	nmid: nmid,
	nopf: nopf,
	no: no,
	not: not,
	notin: notin,
	notinE: notinE,
	notindot: notindot,
	notinva: notinva,
	notinvb: notinvb,
	notinvc: notinvc,
	notni: notni,
	notniva: notniva,
	notnivb: notnivb,
	notnivc: notnivc,
	npar: npar,
	nparallel: nparallel,
	nparsl: nparsl,
	npart: npart,
	npolint: npolint,
	npr: npr,
	nprcue: nprcue,
	npre: npre,
	nprec: nprec,
	npreceq: npreceq,
	nrArr: nrArr,
	nrarr: nrarr,
	nrarrc: nrarrc,
	nrarrw: nrarrw,
	nrightarrow: nrightarrow,
	nrtri: nrtri,
	nrtrie: nrtrie,
	nsc: nsc,
	nsccue: nsccue,
	nsce: nsce,
	nscr: nscr,
	nshortmid: nshortmid,
	nshortparallel: nshortparallel,
	nsim: nsim,
	nsime: nsime,
	nsimeq: nsimeq,
	nsmid: nsmid,
	nspar: nspar,
	nsqsube: nsqsube,
	nsqsupe: nsqsupe,
	nsub: nsub,
	nsubE: nsubE,
	nsube: nsube,
	nsubset: nsubset,
	nsubseteq: nsubseteq,
	nsubseteqq: nsubseteqq,
	nsucc: nsucc,
	nsucceq: nsucceq,
	nsup: nsup,
	nsupE: nsupE,
	nsupe: nsupe,
	nsupset: nsupset,
	nsupseteq: nsupseteq,
	nsupseteqq: nsupseteqq,
	ntgl: ntgl,
	ntild: ntild,
	ntilde: ntilde,
	ntlg: ntlg,
	ntriangleleft: ntriangleleft,
	ntrianglelefteq: ntrianglelefteq,
	ntriangleright: ntriangleright,
	ntrianglerighteq: ntrianglerighteq,
	nu: nu,
	num: num,
	numero: numero,
	numsp: numsp,
	nvDash: nvDash,
	nvHarr: nvHarr,
	nvap: nvap,
	nvdash: nvdash,
	nvge: nvge,
	nvgt: nvgt,
	nvinfin: nvinfin,
	nvlArr: nvlArr,
	nvle: nvle,
	nvlt: nvlt,
	nvltrie: nvltrie,
	nvrArr: nvrArr,
	nvrtrie: nvrtrie,
	nvsim: nvsim,
	nwArr: nwArr,
	nwarhk: nwarhk,
	nwarr: nwarr,
	nwarrow: nwarrow,
	nwnear: nwnear,
	oS: oS,
	oacut: oacut,
	oacute: oacute,
	oast: oast,
	ocir: ocir,
	ocirc: ocirc,
	ocy: ocy,
	odash: odash,
	odblac: odblac,
	odiv: odiv,
	odot: odot,
	odsold: odsold,
	oelig: oelig,
	ofcir: ofcir,
	ofr: ofr,
	ogon: ogon,
	ograv: ograv,
	ograve: ograve,
	ogt: ogt,
	ohbar: ohbar,
	ohm: ohm,
	oint: oint,
	olarr: olarr,
	olcir: olcir,
	olcross: olcross,
	oline: oline,
	olt: olt,
	omacr: omacr,
	omega: omega,
	omicron: omicron,
	omid: omid,
	ominus: ominus,
	oopf: oopf,
	opar: opar,
	operp: operp,
	oplus: oplus,
	or: or,
	orarr: orarr,
	ord: ord,
	order: order,
	orderof: orderof,
	ordf: ordf,
	ordm: ordm,
	origof: origof,
	oror: oror,
	orslope: orslope,
	orv: orv,
	oscr: oscr,
	oslas: oslas,
	oslash: oslash,
	osol: osol,
	otild: otild,
	otilde: otilde,
	otimes: otimes,
	otimesas: otimesas,
	oum: oum,
	ouml: ouml,
	ovbar: ovbar,
	par: par,
	para: para,
	parallel: parallel,
	parsim: parsim,
	parsl: parsl,
	part: part,
	pcy: pcy,
	percnt: percnt,
	period: period,
	permil: permil,
	perp: perp,
	pertenk: pertenk,
	pfr: pfr,
	phi: phi,
	phiv: phiv,
	phmmat: phmmat,
	phone: phone,
	pi: pi,
	pitchfork: pitchfork,
	piv: piv,
	planck: planck,
	planckh: planckh,
	plankv: plankv,
	plus: plus,
	plusacir: plusacir,
	plusb: plusb,
	pluscir: pluscir,
	plusdo: plusdo,
	plusdu: plusdu,
	pluse: pluse,
	plusm: plusm,
	plusmn: plusmn,
	plussim: plussim,
	plustwo: plustwo,
	pm: pm,
	pointint: pointint,
	popf: popf,
	poun: poun,
	pound: pound,
	pr: pr,
	prE: prE,
	prap: prap,
	prcue: prcue,
	pre: pre,
	prec: prec,
	precapprox: precapprox,
	preccurlyeq: preccurlyeq,
	preceq: preceq,
	precnapprox: precnapprox,
	precneqq: precneqq,
	precnsim: precnsim,
	precsim: precsim,
	prime: prime,
	primes: primes,
	prnE: prnE,
	prnap: prnap,
	prnsim: prnsim,
	prod: prod,
	profalar: profalar,
	profline: profline,
	profsurf: profsurf,
	prop: prop,
	propto: propto,
	prsim: prsim,
	prurel: prurel,
	pscr: pscr,
	psi: psi,
	puncsp: puncsp,
	qfr: qfr,
	qint: qint,
	qopf: qopf,
	qprime: qprime,
	qscr: qscr,
	quaternions: quaternions,
	quatint: quatint,
	quest: quest,
	questeq: questeq,
	quo: quo,
	quot: quot,
	rAarr: rAarr,
	rArr: rArr,
	rAtail: rAtail,
	rBarr: rBarr,
	rHar: rHar,
	race: race,
	racute: racute,
	radic: radic,
	raemptyv: raemptyv,
	rang: rang,
	rangd: rangd,
	range: range$1,
	rangle: rangle,
	raqu: raqu,
	raquo: raquo,
	rarr: rarr,
	rarrap: rarrap,
	rarrb: rarrb,
	rarrbfs: rarrbfs,
	rarrc: rarrc,
	rarrfs: rarrfs,
	rarrhk: rarrhk,
	rarrlp: rarrlp,
	rarrpl: rarrpl,
	rarrsim: rarrsim,
	rarrtl: rarrtl,
	rarrw: rarrw,
	ratail: ratail,
	ratio: ratio,
	rationals: rationals,
	rbarr: rbarr,
	rbbrk: rbbrk,
	rbrace: rbrace,
	rbrack: rbrack,
	rbrke: rbrke,
	rbrksld: rbrksld,
	rbrkslu: rbrkslu,
	rcaron: rcaron,
	rcedil: rcedil,
	rceil: rceil,
	rcub: rcub,
	rcy: rcy,
	rdca: rdca,
	rdldhar: rdldhar,
	rdquo: rdquo,
	rdquor: rdquor,
	rdsh: rdsh,
	real: real,
	realine: realine,
	realpart: realpart,
	reals: reals,
	rect: rect,
	re: re,
	reg: reg,
	rfisht: rfisht,
	rfloor: rfloor,
	rfr: rfr,
	rhard: rhard,
	rharu: rharu,
	rharul: rharul,
	rho: rho,
	rhov: rhov,
	rightarrow: rightarrow,
	rightarrowtail: rightarrowtail,
	rightharpoondown: rightharpoondown,
	rightharpoonup: rightharpoonup,
	rightleftarrows: rightleftarrows,
	rightleftharpoons: rightleftharpoons,
	rightrightarrows: rightrightarrows,
	rightsquigarrow: rightsquigarrow,
	rightthreetimes: rightthreetimes,
	ring: ring,
	risingdotseq: risingdotseq,
	rlarr: rlarr,
	rlhar: rlhar,
	rlm: rlm,
	rmoust: rmoust,
	rmoustache: rmoustache,
	rnmid: rnmid,
	roang: roang,
	roarr: roarr,
	robrk: robrk,
	ropar: ropar,
	ropf: ropf,
	roplus: roplus,
	rotimes: rotimes,
	rpar: rpar,
	rpargt: rpargt,
	rppolint: rppolint,
	rrarr: rrarr,
	rsaquo: rsaquo,
	rscr: rscr,
	rsh: rsh,
	rsqb: rsqb,
	rsquo: rsquo,
	rsquor: rsquor,
	rthree: rthree,
	rtimes: rtimes,
	rtri: rtri,
	rtrie: rtrie,
	rtrif: rtrif,
	rtriltri: rtriltri,
	ruluhar: ruluhar,
	rx: rx,
	sacute: sacute,
	sbquo: sbquo,
	sc: sc,
	scE: scE,
	scap: scap,
	scaron: scaron,
	sccue: sccue,
	sce: sce,
	scedil: scedil,
	scirc: scirc,
	scnE: scnE,
	scnap: scnap,
	scnsim: scnsim,
	scpolint: scpolint,
	scsim: scsim,
	scy: scy,
	sdot: sdot,
	sdotb: sdotb,
	sdote: sdote,
	seArr: seArr,
	searhk: searhk,
	searr: searr,
	searrow: searrow,
	sec: sec,
	sect: sect,
	semi: semi,
	seswar: seswar,
	setminus: setminus,
	setmn: setmn,
	sext: sext,
	sfr: sfr,
	sfrown: sfrown,
	sharp: sharp,
	shchcy: shchcy,
	shcy: shcy,
	shortmid: shortmid,
	shortparallel: shortparallel,
	sh: sh,
	shy: shy,
	sigma: sigma,
	sigmaf: sigmaf,
	sigmav: sigmav,
	sim: sim,
	simdot: simdot,
	sime: sime,
	simeq: simeq,
	simg: simg,
	simgE: simgE,
	siml: siml,
	simlE: simlE,
	simne: simne,
	simplus: simplus,
	simrarr: simrarr,
	slarr: slarr,
	smallsetminus: smallsetminus,
	smashp: smashp,
	smeparsl: smeparsl,
	smid: smid,
	smile: smile,
	smt: smt,
	smte: smte,
	smtes: smtes,
	softcy: softcy,
	sol: sol,
	solb: solb,
	solbar: solbar,
	sopf: sopf,
	spades: spades,
	spadesuit: spadesuit,
	spar: spar,
	sqcap: sqcap,
	sqcaps: sqcaps,
	sqcup: sqcup,
	sqcups: sqcups,
	sqsub: sqsub,
	sqsube: sqsube,
	sqsubset: sqsubset,
	sqsubseteq: sqsubseteq,
	sqsup: sqsup,
	sqsupe: sqsupe,
	sqsupset: sqsupset,
	sqsupseteq: sqsupseteq,
	squ: squ,
	square: square,
	squarf: squarf,
	squf: squf,
	srarr: srarr,
	sscr: sscr,
	ssetmn: ssetmn,
	ssmile: ssmile,
	sstarf: sstarf,
	star: star$1,
	starf: starf,
	straightepsilon: straightepsilon,
	straightphi: straightphi,
	strns: strns,
	sub: sub,
	subE: subE,
	subdot: subdot,
	sube: sube,
	subedot: subedot,
	submult: submult,
	subnE: subnE,
	subne: subne,
	subplus: subplus,
	subrarr: subrarr,
	subset: subset,
	subseteq: subseteq,
	subseteqq: subseteqq,
	subsetneq: subsetneq,
	subsetneqq: subsetneqq,
	subsim: subsim,
	subsub: subsub,
	subsup: subsup,
	succ: succ,
	succapprox: succapprox,
	succcurlyeq: succcurlyeq,
	succeq: succeq,
	succnapprox: succnapprox,
	succneqq: succneqq,
	succnsim: succnsim,
	succsim: succsim,
	sum: sum,
	sung: sung,
	sup: sup,
	sup1: sup1,
	sup2: sup2,
	sup3: sup3,
	supE: supE,
	supdot: supdot,
	supdsub: supdsub,
	supe: supe,
	supedot: supedot,
	suphsol: suphsol,
	suphsub: suphsub,
	suplarr: suplarr,
	supmult: supmult,
	supnE: supnE,
	supne: supne,
	supplus: supplus,
	supset: supset,
	supseteq: supseteq,
	supseteqq: supseteqq,
	supsetneq: supsetneq,
	supsetneqq: supsetneqq,
	supsim: supsim,
	supsub: supsub,
	supsup: supsup,
	swArr: swArr,
	swarhk: swarhk,
	swarr: swarr,
	swarrow: swarrow,
	swnwar: swnwar,
	szli: szli,
	szlig: szlig,
	target: target,
	tau: tau,
	tbrk: tbrk,
	tcaron: tcaron,
	tcedil: tcedil,
	tcy: tcy,
	tdot: tdot,
	telrec: telrec,
	tfr: tfr,
	there4: there4,
	therefore: therefore,
	theta: theta,
	thetasym: thetasym,
	thetav: thetav,
	thickapprox: thickapprox,
	thicksim: thicksim,
	thinsp: thinsp,
	thkap: thkap,
	thksim: thksim,
	thor: thor,
	thorn: thorn,
	tilde: tilde,
	time: time,
	times: times,
	timesb: timesb,
	timesbar: timesbar,
	timesd: timesd,
	tint: tint,
	toea: toea,
	top: top,
	topbot: topbot,
	topcir: topcir,
	topf: topf,
	topfork: topfork,
	tosa: tosa,
	tprime: tprime,
	trade: trade,
	triangle: triangle,
	triangledown: triangledown,
	triangleleft: triangleleft,
	trianglelefteq: trianglelefteq,
	triangleq: triangleq,
	triangleright: triangleright,
	trianglerighteq: trianglerighteq,
	tridot: tridot,
	trie: trie,
	triminus: triminus,
	triplus: triplus,
	trisb: trisb,
	tritime: tritime,
	trpezium: trpezium,
	tscr: tscr,
	tscy: tscy,
	tshcy: tshcy,
	tstrok: tstrok,
	twixt: twixt,
	twoheadleftarrow: twoheadleftarrow,
	twoheadrightarrow: twoheadrightarrow,
	uArr: uArr,
	uHar: uHar,
	uacut: uacut,
	uacute: uacute,
	uarr: uarr,
	ubrcy: ubrcy,
	ubreve: ubreve,
	ucir: ucir,
	ucirc: ucirc,
	ucy: ucy,
	udarr: udarr,
	udblac: udblac,
	udhar: udhar,
	ufisht: ufisht,
	ufr: ufr,
	ugrav: ugrav,
	ugrave: ugrave,
	uharl: uharl,
	uharr: uharr,
	uhblk: uhblk,
	ulcorn: ulcorn,
	ulcorner: ulcorner,
	ulcrop: ulcrop,
	ultri: ultri,
	umacr: umacr,
	um: um,
	uml: uml,
	uogon: uogon,
	uopf: uopf,
	uparrow: uparrow,
	updownarrow: updownarrow,
	upharpoonleft: upharpoonleft,
	upharpoonright: upharpoonright,
	uplus: uplus,
	upsi: upsi,
	upsih: upsih,
	upsilon: upsilon,
	upuparrows: upuparrows,
	urcorn: urcorn,
	urcorner: urcorner,
	urcrop: urcrop,
	uring: uring,
	urtri: urtri,
	uscr: uscr,
	utdot: utdot,
	utilde: utilde,
	utri: utri,
	utrif: utrif,
	uuarr: uuarr,
	uum: uum,
	uuml: uuml,
	uwangle: uwangle,
	vArr: vArr,
	vBar: vBar,
	vBarv: vBarv,
	vDash: vDash,
	vangrt: vangrt,
	varepsilon: varepsilon,
	varkappa: varkappa,
	varnothing: varnothing,
	varphi: varphi,
	varpi: varpi,
	varpropto: varpropto,
	varr: varr,
	varrho: varrho,
	varsigma: varsigma,
	varsubsetneq: varsubsetneq,
	varsubsetneqq: varsubsetneqq,
	varsupsetneq: varsupsetneq,
	varsupsetneqq: varsupsetneqq,
	vartheta: vartheta,
	vartriangleleft: vartriangleleft,
	vartriangleright: vartriangleright,
	vcy: vcy,
	vdash: vdash,
	vee: vee,
	veebar: veebar,
	veeeq: veeeq,
	vellip: vellip,
	verbar: verbar,
	vert: vert,
	vfr: vfr,
	vltri: vltri,
	vnsub: vnsub,
	vnsup: vnsup,
	vopf: vopf,
	vprop: vprop,
	vrtri: vrtri,
	vscr: vscr,
	vsubnE: vsubnE,
	vsubne: vsubne,
	vsupnE: vsupnE,
	vsupne: vsupne,
	vzigzag: vzigzag,
	wcirc: wcirc,
	wedbar: wedbar,
	wedge: wedge,
	wedgeq: wedgeq,
	weierp: weierp,
	wfr: wfr,
	wopf: wopf,
	wp: wp,
	wr: wr,
	wreath: wreath,
	wscr: wscr,
	xcap: xcap,
	xcirc: xcirc,
	xcup: xcup,
	xdtri: xdtri,
	xfr: xfr,
	xhArr: xhArr,
	xharr: xharr,
	xi: xi,
	xlArr: xlArr,
	xlarr: xlarr,
	xmap: xmap,
	xnis: xnis,
	xodot: xodot,
	xopf: xopf,
	xoplus: xoplus,
	xotime: xotime,
	xrArr: xrArr,
	xrarr: xrarr,
	xscr: xscr,
	xsqcup: xsqcup,
	xuplus: xuplus,
	xutri: xutri,
	xvee: xvee,
	xwedge: xwedge,
	yacut: yacut,
	yacute: yacute,
	yacy: yacy,
	ycirc: ycirc,
	ycy: ycy,
	ye: ye,
	yen: yen,
	yfr: yfr,
	yicy: yicy,
	yopf: yopf,
	yscr: yscr,
	yucy: yucy,
	yum: yum,
	yuml: yuml,
	zacute: zacute,
	zcaron: zcaron,
	zcy: zcy,
	zdot: zdot,
	zeetrf: zeetrf,
	zeta: zeta,
	zfr: zfr,
	zhcy: zhcy,
	zigrarr: zigrarr,
	zopf: zopf,
	zscr: zscr,
	zwj: zwj,
	zwnj: zwnj
};

var characterEntities = require$$0$1;

var decodeEntity_1 = decodeEntity$1;

var own$3 = {}.hasOwnProperty;

function decodeEntity$1(characters) {
  return own$3.call(characterEntities, characters)
    ? characterEntities[characters]
    : false
}

var regexCheck$1 = regexCheck_1;

var asciiDigit$2 = regexCheck$1(/\d/);

var asciiDigit_1 = asciiDigit$2;

var regexCheck = regexCheck_1;

var asciiHexDigit$1 = regexCheck(/[\dA-Fa-f]/);

var asciiHexDigit_1 = asciiHexDigit$1;

var decodeEntity = decodeEntity_1;
var asciiAlphanumeric$2 = asciiAlphanumeric_1;
var asciiDigit$1 = asciiDigit_1;
var asciiHexDigit = asciiHexDigit_1;

function _interopDefaultLegacy$1(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var decodeEntity__default = /*#__PURE__*/ _interopDefaultLegacy$1(decodeEntity);

var characterReference$2 = {
  name: 'characterReference',
  tokenize: tokenizeCharacterReference
};

function tokenizeCharacterReference(effects, ok, nok) {
  var self = this;
  var size = 0;
  var max;
  var test;
  return start

  function start(code) {
    effects.enter('characterReference');
    effects.enter('characterReferenceMarker');
    effects.consume(code);
    effects.exit('characterReferenceMarker');
    return open
  }

  function open(code) {
    if (code === 35) {
      effects.enter('characterReferenceMarkerNumeric');
      effects.consume(code);
      effects.exit('characterReferenceMarkerNumeric');
      return numeric
    }

    effects.enter('characterReferenceValue');
    max = 31;
    test = asciiAlphanumeric$2;
    return value(code)
  }

  function numeric(code) {
    if (code === 88 || code === 120) {
      effects.enter('characterReferenceMarkerHexadecimal');
      effects.consume(code);
      effects.exit('characterReferenceMarkerHexadecimal');
      effects.enter('characterReferenceValue');
      max = 6;
      test = asciiHexDigit;
      return value
    }

    effects.enter('characterReferenceValue');
    max = 7;
    test = asciiDigit$1;
    return value(code)
  }

  function value(code) {
    var token;

    if (code === 59 && size) {
      token = effects.exit('characterReferenceValue');

      if (
        test === asciiAlphanumeric$2 &&
        !decodeEntity__default['default'](self.sliceSerialize(token))
      ) {
        return nok(code)
      }

      effects.enter('characterReferenceMarker');
      effects.consume(code);
      effects.exit('characterReferenceMarker');
      effects.exit('characterReference');
      return ok
    }

    if (test(code) && size++ < max) {
      effects.consume(code);
      return value
    }

    return nok(code)
  }
}

var characterReference_1 = characterReference$2;

var markdownLineEnding$d = markdownLineEnding_1;
var markdownLineEndingOrSpace$6 = markdownLineEndingOrSpace_1;
var prefixSize$2 = prefixSize_1;
var factorySpace$a = factorySpace$h;

var codeFenced$1 = {
  name: 'codeFenced',
  tokenize: tokenizeCodeFenced,
  concrete: true
};

function tokenizeCodeFenced(effects, ok, nok) {
  var self = this;
  var closingFenceConstruct = {
    tokenize: tokenizeClosingFence,
    partial: true
  };
  var initialPrefix = prefixSize$2(this.events, 'linePrefix');
  var sizeOpen = 0;
  var marker;
  return start

  function start(code) {
    effects.enter('codeFenced');
    effects.enter('codeFencedFence');
    effects.enter('codeFencedFenceSequence');
    marker = code;
    return sequenceOpen(code)
  }

  function sequenceOpen(code) {
    if (code === marker) {
      effects.consume(code);
      sizeOpen++;
      return sequenceOpen
    }

    effects.exit('codeFencedFenceSequence');
    return sizeOpen < 3
      ? nok(code)
      : factorySpace$a(effects, infoOpen, 'whitespace')(code)
  }

  function infoOpen(code) {
    if (code === null || markdownLineEnding$d(code)) {
      return openAfter(code)
    }

    effects.enter('codeFencedFenceInfo');
    effects.enter('chunkString', {
      contentType: 'string'
    });
    return info(code)
  }

  function info(code) {
    if (code === null || markdownLineEndingOrSpace$6(code)) {
      effects.exit('chunkString');
      effects.exit('codeFencedFenceInfo');
      return factorySpace$a(effects, infoAfter, 'whitespace')(code)
    }

    if (code === 96 && code === marker) return nok(code)
    effects.consume(code);
    return info
  }

  function infoAfter(code) {
    if (code === null || markdownLineEnding$d(code)) {
      return openAfter(code)
    }

    effects.enter('codeFencedFenceMeta');
    effects.enter('chunkString', {
      contentType: 'string'
    });
    return meta(code)
  }

  function meta(code) {
    if (code === null || markdownLineEnding$d(code)) {
      effects.exit('chunkString');
      effects.exit('codeFencedFenceMeta');
      return openAfter(code)
    }

    if (code === 96 && code === marker) return nok(code)
    effects.consume(code);
    return meta
  }

  function openAfter(code) {
    effects.exit('codeFencedFence');
    return self.interrupt ? ok(code) : content(code)
  }

  function content(code) {
    if (code === null) {
      return after(code)
    }

    if (markdownLineEnding$d(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return effects.attempt(
        closingFenceConstruct,
        after,
        initialPrefix
          ? factorySpace$a(effects, content, 'linePrefix', initialPrefix + 1)
          : content
      )
    }

    effects.enter('codeFlowValue');
    return contentContinue(code)
  }

  function contentContinue(code) {
    if (code === null || markdownLineEnding$d(code)) {
      effects.exit('codeFlowValue');
      return content(code)
    }

    effects.consume(code);
    return contentContinue
  }

  function after(code) {
    effects.exit('codeFenced');
    return ok(code)
  }

  function tokenizeClosingFence(effects, ok, nok) {
    var size = 0;
    return factorySpace$a(
      effects,
      closingSequenceStart,
      'linePrefix',
      this.parser.constructs.disable.null.indexOf('codeIndented') > -1
        ? undefined
        : 4
    )

    function closingSequenceStart(code) {
      effects.enter('codeFencedFence');
      effects.enter('codeFencedFenceSequence');
      return closingSequence(code)
    }

    function closingSequence(code) {
      if (code === marker) {
        effects.consume(code);
        size++;
        return closingSequence
      }

      if (size < sizeOpen) return nok(code)
      effects.exit('codeFencedFenceSequence');
      return factorySpace$a(effects, closingSequenceEnd, 'whitespace')(code)
    }

    function closingSequenceEnd(code) {
      if (code === null || markdownLineEnding$d(code)) {
        effects.exit('codeFencedFence');
        return ok(code)
      }

      return nok(code)
    }
  }
}

var codeFenced_1 = codeFenced$1;

var markdownLineEnding$c = markdownLineEnding_1;
var chunkedSplice$2 = chunkedSplice_1;
var prefixSize$1 = prefixSize_1;
var factorySpace$9 = factorySpace$h;

var codeIndented$1 = {
  name: 'codeIndented',
  tokenize: tokenizeCodeIndented,
  resolve: resolveCodeIndented
};
var indentedContentConstruct = {
  tokenize: tokenizeIndentedContent,
  partial: true
};

function resolveCodeIndented(events, context) {
  var code = {
    type: 'codeIndented',
    start: events[0][1].start,
    end: events[events.length - 1][1].end
  };
  chunkedSplice$2(events, 0, 0, [['enter', code, context]]);
  chunkedSplice$2(events, events.length, 0, [['exit', code, context]]);
  return events
}

function tokenizeCodeIndented(effects, ok, nok) {
  return effects.attempt(indentedContentConstruct, afterPrefix, nok)

  function afterPrefix(code) {
    if (code === null) {
      return ok(code)
    }

    if (markdownLineEnding$c(code)) {
      return effects.attempt(indentedContentConstruct, afterPrefix, ok)(code)
    }

    effects.enter('codeFlowValue');
    return content(code)
  }

  function content(code) {
    if (code === null || markdownLineEnding$c(code)) {
      effects.exit('codeFlowValue');
      return afterPrefix(code)
    }

    effects.consume(code);
    return content
  }
}

function tokenizeIndentedContent(effects, ok, nok) {
  var self = this;
  return factorySpace$9(effects, afterPrefix, 'linePrefix', 4 + 1)

  function afterPrefix(code) {
    if (markdownLineEnding$c(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return factorySpace$9(effects, afterPrefix, 'linePrefix', 4 + 1)
    }

    return prefixSize$1(self.events, 'linePrefix') < 4 ? nok(code) : ok(code)
  }
}

var codeIndented_1 = codeIndented$1;

var markdownLineEnding$b = markdownLineEnding_1;

var codeText$1 = {
  name: 'codeText',
  tokenize: tokenizeCodeText,
  resolve: resolveCodeText,
  previous: previous
};

function resolveCodeText(events) {
  var tailExitIndex = events.length - 4;
  var headEnterIndex = 3;
  var index;
  var enter; // If we start and end with an EOL or a space.

  if (
    (events[headEnterIndex][1].type === 'lineEnding' ||
      events[headEnterIndex][1].type === 'space') &&
    (events[tailExitIndex][1].type === 'lineEnding' ||
      events[tailExitIndex][1].type === 'space')
  ) {
    index = headEnterIndex; // And we have data.

    while (++index < tailExitIndex) {
      if (events[index][1].type === 'codeTextData') {
        // Then we have padding.
        events[tailExitIndex][1].type = events[headEnterIndex][1].type =
          'codeTextPadding';
        headEnterIndex += 2;
        tailExitIndex -= 2;
        break
      }
    }
  } // Merge adjacent spaces and data.

  index = headEnterIndex - 1;
  tailExitIndex++;

  while (++index <= tailExitIndex) {
    if (enter === undefined) {
      if (index !== tailExitIndex && events[index][1].type !== 'lineEnding') {
        enter = index;
      }
    } else if (
      index === tailExitIndex ||
      events[index][1].type === 'lineEnding'
    ) {
      events[enter][1].type = 'codeTextData';

      if (index !== enter + 2) {
        events[enter][1].end = events[index - 1][1].end;
        events.splice(enter + 2, index - enter - 2);
        tailExitIndex -= index - enter - 2;
        index = enter + 2;
      }

      enter = undefined;
    }
  }

  return events
}

function previous(code) {
  // If there is a previous code, there will always be a tail.
  return (
    code !== 96 ||
    this.events[this.events.length - 1][1].type === 'characterEscape'
  )
}

function tokenizeCodeText(effects, ok, nok) {
  var sizeOpen = 0;
  var size;
  var token;
  return start

  function start(code) {
    effects.enter('codeText');
    effects.enter('codeTextSequence');
    return openingSequence(code)
  }

  function openingSequence(code) {
    if (code === 96) {
      effects.consume(code);
      sizeOpen++;
      return openingSequence
    }

    effects.exit('codeTextSequence');
    return gap(code)
  }

  function gap(code) {
    // EOF.
    if (code === null) {
      return nok(code)
    } // Closing fence?
    // Could also be data.

    if (code === 96) {
      token = effects.enter('codeTextSequence');
      size = 0;
      return closingSequence(code)
    } // Tabs don’t work, and virtual spaces don’t make sense.

    if (code === 32) {
      effects.enter('space');
      effects.consume(code);
      effects.exit('space');
      return gap
    }

    if (markdownLineEnding$b(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return gap
    } // Data.

    effects.enter('codeTextData');
    return data(code)
  } // In code.

  function data(code) {
    if (
      code === null ||
      code === 32 ||
      code === 96 ||
      markdownLineEnding$b(code)
    ) {
      effects.exit('codeTextData');
      return gap(code)
    }

    effects.consume(code);
    return data
  } // Closing fence.

  function closingSequence(code) {
    // More.
    if (code === 96) {
      effects.consume(code);
      size++;
      return closingSequence
    } // Done!

    if (size === sizeOpen) {
      effects.exit('codeTextSequence');
      effects.exit('codeText');
      return ok(code)
    } // More or less accents: mark as data.

    token.type = 'codeTextData';
    return data(code)
  }
}

var codeText_1 = codeText$1;

var asciiControl = asciiControl_1;
var markdownLineEndingOrSpace$5 = markdownLineEndingOrSpace_1;
var markdownLineEnding$a = markdownLineEnding_1;

// eslint-disable-next-line max-params
function destinationFactory(
  effects,
  ok,
  nok,
  type,
  literalType,
  literalMarkerType,
  rawType,
  stringType,
  max
) {
  var limit = max || Infinity;
  var balance = 0;
  return start

  function start(code) {
    if (code === 60) {
      effects.enter(type);
      effects.enter(literalType);
      effects.enter(literalMarkerType);
      effects.consume(code);
      effects.exit(literalMarkerType);
      return destinationEnclosedBefore
    }

    if (asciiControl(code) || code === 41) {
      return nok(code)
    }

    effects.enter(type);
    effects.enter(rawType);
    effects.enter(stringType);
    effects.enter('chunkString', {
      contentType: 'string'
    });
    return destinationRaw(code)
  }

  function destinationEnclosedBefore(code) {
    if (code === 62) {
      effects.enter(literalMarkerType);
      effects.consume(code);
      effects.exit(literalMarkerType);
      effects.exit(literalType);
      effects.exit(type);
      return ok
    }

    effects.enter(stringType);
    effects.enter('chunkString', {
      contentType: 'string'
    });
    return destinationEnclosed(code)
  }

  function destinationEnclosed(code) {
    if (code === 62) {
      effects.exit('chunkString');
      effects.exit(stringType);
      return destinationEnclosedBefore(code)
    }

    if (code === null || code === 60 || markdownLineEnding$a(code)) {
      return nok(code)
    }

    effects.consume(code);
    return code === 92 ? destinationEnclosedEscape : destinationEnclosed
  }

  function destinationEnclosedEscape(code) {
    if (code === 60 || code === 62 || code === 92) {
      effects.consume(code);
      return destinationEnclosed
    }

    return destinationEnclosed(code)
  }

  function destinationRaw(code) {
    if (code === 40) {
      if (++balance > limit) return nok(code)
      effects.consume(code);
      return destinationRaw
    }

    if (code === 41) {
      if (!balance--) {
        effects.exit('chunkString');
        effects.exit(stringType);
        effects.exit(rawType);
        effects.exit(type);
        return ok(code)
      }

      effects.consume(code);
      return destinationRaw
    }

    if (code === null || markdownLineEndingOrSpace$5(code)) {
      if (balance) return nok(code)
      effects.exit('chunkString');
      effects.exit(stringType);
      effects.exit(rawType);
      effects.exit(type);
      return ok(code)
    }

    if (asciiControl(code)) return nok(code)
    effects.consume(code);
    return code === 92 ? destinationRawEscape : destinationRaw
  }

  function destinationRawEscape(code) {
    if (code === 40 || code === 41 || code === 92) {
      effects.consume(code);
      return destinationRaw
    }

    return destinationRaw(code)
  }
}

var factoryDestination$2 = destinationFactory;

var markdownLineEnding$9 = markdownLineEnding_1;
var markdownSpace$6 = markdownSpace_1;

// eslint-disable-next-line max-params
function labelFactory(effects, ok, nok, type, markerType, stringType) {
  var self = this;
  var size = 0;
  var data;
  return start

  function start(code) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code);
    effects.exit(markerType);
    effects.enter(stringType);
    return atBreak
  }

  function atBreak(code) {
    if (
      code === null ||
      code === 91 ||
      (code === 93 && !data) ||
      /* c8 ignore next */
      (code === 94 &&
        /* c8 ignore next */
        !size &&
        /* c8 ignore next */
        '_hiddenFootnoteSupport' in self.parser.constructs) ||
      size > 999
    ) {
      return nok(code)
    }

    if (code === 93) {
      effects.exit(stringType);
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      effects.exit(type);
      return ok
    }

    if (markdownLineEnding$9(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return atBreak
    }

    effects.enter('chunkString', {
      contentType: 'string'
    });
    return label(code)
  }

  function label(code) {
    if (
      code === null ||
      code === 91 ||
      code === 93 ||
      markdownLineEnding$9(code) ||
      size++ > 999
    ) {
      effects.exit('chunkString');
      return atBreak(code)
    }

    effects.consume(code);
    data = data || !markdownSpace$6(code);
    return code === 92 ? labelEscape : label
  }

  function labelEscape(code) {
    if (code === 91 || code === 92 || code === 93) {
      effects.consume(code);
      size++;
      return label
    }

    return label(code)
  }
}

var factoryLabel$2 = labelFactory;

var markdownLineEnding$8 = markdownLineEnding_1;
var markdownSpace$5 = markdownSpace_1;
var factorySpace$8 = factorySpace$h;

function whitespaceFactory(effects, ok) {
  var seen;
  return start

  function start(code) {
    if (markdownLineEnding$8(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      seen = true;
      return start
    }

    if (markdownSpace$5(code)) {
      return factorySpace$8(
        effects,
        start,
        seen ? 'linePrefix' : 'lineSuffix'
      )(code)
    }

    return ok(code)
  }
}

var factoryWhitespace$2 = whitespaceFactory;

var markdownLineEnding$7 = markdownLineEnding_1;
var factorySpace$7 = factorySpace$h;

function titleFactory(effects, ok, nok, type, markerType, stringType) {
  var marker;
  return start

  function start(code) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code);
    effects.exit(markerType);
    marker = code === 40 ? 41 : code;
    return atFirstTitleBreak
  }

  function atFirstTitleBreak(code) {
    if (code === marker) {
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      effects.exit(type);
      return ok
    }

    effects.enter(stringType);
    return atTitleBreak(code)
  }

  function atTitleBreak(code) {
    if (code === marker) {
      effects.exit(stringType);
      return atFirstTitleBreak(marker)
    }

    if (code === null) {
      return nok(code)
    } // Note: blank lines can’t exist in content.

    if (markdownLineEnding$7(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return factorySpace$7(effects, atTitleBreak, 'linePrefix')
    }

    effects.enter('chunkString', {
      contentType: 'string'
    });
    return title(code)
  }

  function title(code) {
    if (code === marker || code === null || markdownLineEnding$7(code)) {
      effects.exit('chunkString');
      return atTitleBreak(code)
    }

    effects.consume(code);
    return code === 92 ? titleEscape : title
  }

  function titleEscape(code) {
    if (code === marker || code === 92) {
      effects.consume(code);
      return title
    }

    return title(code)
  }
}

var factoryTitle$2 = titleFactory;

var markdownLineEnding$6 = markdownLineEnding_1;
var markdownLineEndingOrSpace$4 = markdownLineEndingOrSpace_1;
var normalizeIdentifier$2 = normalizeIdentifier_1;
var factoryDestination$1 = factoryDestination$2;
var factoryLabel$1 = factoryLabel$2;
var factorySpace$6 = factorySpace$h;
var factoryWhitespace$1 = factoryWhitespace$2;
var factoryTitle$1 = factoryTitle$2;

var definition$2 = {
  name: 'definition',
  tokenize: tokenizeDefinition
};
var titleConstruct = {
  tokenize: tokenizeTitle,
  partial: true
};

function tokenizeDefinition(effects, ok, nok) {
  var self = this;
  var identifier;
  return start

  function start(code) {
    effects.enter('definition');
    return factoryLabel$1.call(
      self,
      effects,
      labelAfter,
      nok,
      'definitionLabel',
      'definitionLabelMarker',
      'definitionLabelString'
    )(code)
  }

  function labelAfter(code) {
    identifier = normalizeIdentifier$2(
      self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
    );

    if (code === 58) {
      effects.enter('definitionMarker');
      effects.consume(code);
      effects.exit('definitionMarker'); // Note: blank lines can’t exist in content.

      return factoryWhitespace$1(
        effects,
        factoryDestination$1(
          effects,
          effects.attempt(
            titleConstruct,
            factorySpace$6(effects, after, 'whitespace'),
            factorySpace$6(effects, after, 'whitespace')
          ),
          nok,
          'definitionDestination',
          'definitionDestinationLiteral',
          'definitionDestinationLiteralMarker',
          'definitionDestinationRaw',
          'definitionDestinationString'
        )
      )
    }

    return nok(code)
  }

  function after(code) {
    if (code === null || markdownLineEnding$6(code)) {
      effects.exit('definition');

      if (self.parser.defined.indexOf(identifier) < 0) {
        self.parser.defined.push(identifier);
      }

      return ok(code)
    }

    return nok(code)
  }
}

function tokenizeTitle(effects, ok, nok) {
  return start

  function start(code) {
    return markdownLineEndingOrSpace$4(code)
      ? factoryWhitespace$1(effects, before)(code)
      : nok(code)
  }

  function before(code) {
    if (code === 34 || code === 39 || code === 40) {
      return factoryTitle$1(
        effects,
        factorySpace$6(effects, after, 'whitespace'),
        nok,
        'definitionTitle',
        'definitionTitleMarker',
        'definitionTitleString'
      )(code)
    }

    return nok(code)
  }

  function after(code) {
    return code === null || markdownLineEnding$6(code) ? ok(code) : nok(code)
  }
}

var definition_1$1 = definition$2;

var markdownLineEnding$5 = markdownLineEnding_1;

var hardBreakEscape$1 = {
  name: 'hardBreakEscape',
  tokenize: tokenizeHardBreakEscape
};

function tokenizeHardBreakEscape(effects, ok, nok) {
  return start

  function start(code) {
    effects.enter('hardBreakEscape');
    effects.enter('escapeMarker');
    effects.consume(code);
    return open
  }

  function open(code) {
    if (markdownLineEnding$5(code)) {
      effects.exit('escapeMarker');
      effects.exit('hardBreakEscape');
      return ok(code)
    }

    return nok(code)
  }
}

var hardBreakEscape_1 = hardBreakEscape$1;

var markdownLineEnding$4 = markdownLineEnding_1;
var markdownLineEndingOrSpace$3 = markdownLineEndingOrSpace_1;
var markdownSpace$4 = markdownSpace_1;
var chunkedSplice$1 = chunkedSplice_1;
var factorySpace$5 = factorySpace$h;

var headingAtx$1 = {
  name: 'headingAtx',
  tokenize: tokenizeHeadingAtx,
  resolve: resolveHeadingAtx
};

function resolveHeadingAtx(events, context) {
  var contentEnd = events.length - 2;
  var contentStart = 3;
  var content;
  var text; // Prefix whitespace, part of the opening.

  if (events[contentStart][1].type === 'whitespace') {
    contentStart += 2;
  } // Suffix whitespace, part of the closing.

  if (
    contentEnd - 2 > contentStart &&
    events[contentEnd][1].type === 'whitespace'
  ) {
    contentEnd -= 2;
  }

  if (
    events[contentEnd][1].type === 'atxHeadingSequence' &&
    (contentStart === contentEnd - 1 ||
      (contentEnd - 4 > contentStart &&
        events[contentEnd - 2][1].type === 'whitespace'))
  ) {
    contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
  }

  if (contentEnd > contentStart) {
    content = {
      type: 'atxHeadingText',
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end
    };
    text = {
      type: 'chunkText',
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end,
      contentType: 'text'
    };
    chunkedSplice$1(events, contentStart, contentEnd - contentStart + 1, [
      ['enter', content, context],
      ['enter', text, context],
      ['exit', text, context],
      ['exit', content, context]
    ]);
  }

  return events
}

function tokenizeHeadingAtx(effects, ok, nok) {
  var self = this;
  var size = 0;
  return start

  function start(code) {
    effects.enter('atxHeading');
    effects.enter('atxHeadingSequence');
    return fenceOpenInside(code)
  }

  function fenceOpenInside(code) {
    if (code === 35 && size++ < 6) {
      effects.consume(code);
      return fenceOpenInside
    }

    if (code === null || markdownLineEndingOrSpace$3(code)) {
      effects.exit('atxHeadingSequence');
      return self.interrupt ? ok(code) : headingBreak(code)
    }

    return nok(code)
  }

  function headingBreak(code) {
    if (code === 35) {
      effects.enter('atxHeadingSequence');
      return sequence(code)
    }

    if (code === null || markdownLineEnding$4(code)) {
      effects.exit('atxHeading');
      return ok(code)
    }

    if (markdownSpace$4(code)) {
      return factorySpace$5(effects, headingBreak, 'whitespace')(code)
    }

    effects.enter('atxHeadingText');
    return data(code)
  }

  function sequence(code) {
    if (code === 35) {
      effects.consume(code);
      return sequence
    }

    effects.exit('atxHeadingSequence');
    return headingBreak(code)
  }

  function data(code) {
    if (code === null || code === 35 || markdownLineEndingOrSpace$3(code)) {
      effects.exit('atxHeadingText');
      return headingBreak(code)
    }

    effects.consume(code);
    return data
  }
}

var headingAtx_1 = headingAtx$1;

// This module is copied from <https://spec.commonmark.org/0.29/#html-blocks>.
var basics = [
  'address',
  'article',
  'aside',
  'base',
  'basefont',
  'blockquote',
  'body',
  'caption',
  'center',
  'col',
  'colgroup',
  'dd',
  'details',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'iframe',
  'legend',
  'li',
  'link',
  'main',
  'menu',
  'menuitem',
  'nav',
  'noframes',
  'ol',
  'optgroup',
  'option',
  'p',
  'param',
  'section',
  'source',
  'summary',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'title',
  'tr',
  'track',
  'ul'
];

var htmlBlockNames$1 = basics;

// This module is copied from <https://spec.commonmark.org/0.29/#html-blocks>.
var raws = ['pre', 'script', 'style', 'textarea'];

var htmlRawNames$1 = raws;

var asciiAlpha$1 = asciiAlpha_1;
var asciiAlphanumeric$1 = asciiAlphanumeric_1;
var markdownLineEnding$3 = markdownLineEnding_1;
var markdownLineEndingOrSpace$2 = markdownLineEndingOrSpace_1;
var markdownSpace$3 = markdownSpace_1;
var fromCharCode = fromCharCode_1;
var htmlBlockNames = htmlBlockNames$1;
var htmlRawNames = htmlRawNames$1;
var partialBlankLine$1 = partialBlankLine_1;

var htmlFlow$1 = {
  name: 'htmlFlow',
  tokenize: tokenizeHtmlFlow,
  resolveTo: resolveToHtmlFlow,
  concrete: true
};
var nextBlankConstruct = {
  tokenize: tokenizeNextBlank,
  partial: true
};

function resolveToHtmlFlow(events) {
  var index = events.length;

  while (index--) {
    if (events[index][0] === 'enter' && events[index][1].type === 'htmlFlow') {
      break
    }
  }

  if (index > 1 && events[index - 2][1].type === 'linePrefix') {
    // Add the prefix start to the HTML token.
    events[index][1].start = events[index - 2][1].start; // Add the prefix start to the HTML line token.

    events[index + 1][1].start = events[index - 2][1].start; // Remove the line prefix.

    events.splice(index - 2, 2);
  }

  return events
}

function tokenizeHtmlFlow(effects, ok, nok) {
  var self = this;
  var kind;
  var startTag;
  var buffer;
  var index;
  var marker;
  return start

  function start(code) {
    effects.enter('htmlFlow');
    effects.enter('htmlFlowData');
    effects.consume(code);
    return open
  }

  function open(code) {
    if (code === 33) {
      effects.consume(code);
      return declarationStart
    }

    if (code === 47) {
      effects.consume(code);
      return tagCloseStart
    }

    if (code === 63) {
      effects.consume(code);
      kind = 3; // While we’re in an instruction instead of a declaration, we’re on a `?`
      // right now, so we do need to search for `>`, similar to declarations.

      return self.interrupt ? ok : continuationDeclarationInside
    }

    if (asciiAlpha$1(code)) {
      effects.consume(code);
      buffer = fromCharCode(code);
      startTag = true;
      return tagName
    }

    return nok(code)
  }

  function declarationStart(code) {
    if (code === 45) {
      effects.consume(code);
      kind = 2;
      return commentOpenInside
    }

    if (code === 91) {
      effects.consume(code);
      kind = 5;
      buffer = 'CDATA[';
      index = 0;
      return cdataOpenInside
    }

    if (asciiAlpha$1(code)) {
      effects.consume(code);
      kind = 4;
      return self.interrupt ? ok : continuationDeclarationInside
    }

    return nok(code)
  }

  function commentOpenInside(code) {
    if (code === 45) {
      effects.consume(code);
      return self.interrupt ? ok : continuationDeclarationInside
    }

    return nok(code)
  }

  function cdataOpenInside(code) {
    if (code === buffer.charCodeAt(index++)) {
      effects.consume(code);
      return index === buffer.length
        ? self.interrupt
          ? ok
          : continuation
        : cdataOpenInside
    }

    return nok(code)
  }

  function tagCloseStart(code) {
    if (asciiAlpha$1(code)) {
      effects.consume(code);
      buffer = fromCharCode(code);
      return tagName
    }

    return nok(code)
  }

  function tagName(code) {
    if (
      code === null ||
      code === 47 ||
      code === 62 ||
      markdownLineEndingOrSpace$2(code)
    ) {
      if (
        code !== 47 &&
        startTag &&
        htmlRawNames.indexOf(buffer.toLowerCase()) > -1
      ) {
        kind = 1;
        return self.interrupt ? ok(code) : continuation(code)
      }

      if (htmlBlockNames.indexOf(buffer.toLowerCase()) > -1) {
        kind = 6;

        if (code === 47) {
          effects.consume(code);
          return basicSelfClosing
        }

        return self.interrupt ? ok(code) : continuation(code)
      }

      kind = 7; // Do not support complete HTML when interrupting.

      return self.interrupt
        ? nok(code)
        : startTag
        ? completeAttributeNameBefore(code)
        : completeClosingTagAfter(code)
    }

    if (code === 45 || asciiAlphanumeric$1(code)) {
      effects.consume(code);
      buffer += fromCharCode(code);
      return tagName
    }

    return nok(code)
  }

  function basicSelfClosing(code) {
    if (code === 62) {
      effects.consume(code);
      return self.interrupt ? ok : continuation
    }

    return nok(code)
  }

  function completeClosingTagAfter(code) {
    if (markdownSpace$3(code)) {
      effects.consume(code);
      return completeClosingTagAfter
    }

    return completeEnd(code)
  }

  function completeAttributeNameBefore(code) {
    if (code === 47) {
      effects.consume(code);
      return completeEnd
    }

    if (code === 58 || code === 95 || asciiAlpha$1(code)) {
      effects.consume(code);
      return completeAttributeName
    }

    if (markdownSpace$3(code)) {
      effects.consume(code);
      return completeAttributeNameBefore
    }

    return completeEnd(code)
  }

  function completeAttributeName(code) {
    if (
      code === 45 ||
      code === 46 ||
      code === 58 ||
      code === 95 ||
      asciiAlphanumeric$1(code)
    ) {
      effects.consume(code);
      return completeAttributeName
    }

    return completeAttributeNameAfter(code)
  }

  function completeAttributeNameAfter(code) {
    if (code === 61) {
      effects.consume(code);
      return completeAttributeValueBefore
    }

    if (markdownSpace$3(code)) {
      effects.consume(code);
      return completeAttributeNameAfter
    }

    return completeAttributeNameBefore(code)
  }

  function completeAttributeValueBefore(code) {
    if (
      code === null ||
      code === 60 ||
      code === 61 ||
      code === 62 ||
      code === 96
    ) {
      return nok(code)
    }

    if (code === 34 || code === 39) {
      effects.consume(code);
      marker = code;
      return completeAttributeValueQuoted
    }

    if (markdownSpace$3(code)) {
      effects.consume(code);
      return completeAttributeValueBefore
    }

    marker = undefined;
    return completeAttributeValueUnquoted(code)
  }

  function completeAttributeValueQuoted(code) {
    if (code === marker) {
      effects.consume(code);
      return completeAttributeValueQuotedAfter
    }

    if (code === null || markdownLineEnding$3(code)) {
      return nok(code)
    }

    effects.consume(code);
    return completeAttributeValueQuoted
  }

  function completeAttributeValueUnquoted(code) {
    if (
      code === null ||
      code === 34 ||
      code === 39 ||
      code === 60 ||
      code === 61 ||
      code === 62 ||
      code === 96 ||
      markdownLineEndingOrSpace$2(code)
    ) {
      return completeAttributeNameAfter(code)
    }

    effects.consume(code);
    return completeAttributeValueUnquoted
  }

  function completeAttributeValueQuotedAfter(code) {
    if (code === 47 || code === 62 || markdownSpace$3(code)) {
      return completeAttributeNameBefore(code)
    }

    return nok(code)
  }

  function completeEnd(code) {
    if (code === 62) {
      effects.consume(code);
      return completeAfter
    }

    return nok(code)
  }

  function completeAfter(code) {
    if (markdownSpace$3(code)) {
      effects.consume(code);
      return completeAfter
    }

    return code === null || markdownLineEnding$3(code)
      ? continuation(code)
      : nok(code)
  }

  function continuation(code) {
    if (code === 45 && kind === 2) {
      effects.consume(code);
      return continuationCommentInside
    }

    if (code === 60 && kind === 1) {
      effects.consume(code);
      return continuationRawTagOpen
    }

    if (code === 62 && kind === 4) {
      effects.consume(code);
      return continuationClose
    }

    if (code === 63 && kind === 3) {
      effects.consume(code);
      return continuationDeclarationInside
    }

    if (code === 93 && kind === 5) {
      effects.consume(code);
      return continuationCharacterDataInside
    }

    if (markdownLineEnding$3(code) && (kind === 6 || kind === 7)) {
      return effects.check(
        nextBlankConstruct,
        continuationClose,
        continuationAtLineEnding
      )(code)
    }

    if (code === null || markdownLineEnding$3(code)) {
      return continuationAtLineEnding(code)
    }

    effects.consume(code);
    return continuation
  }

  function continuationAtLineEnding(code) {
    effects.exit('htmlFlowData');
    return htmlContinueStart(code)
  }

  function htmlContinueStart(code) {
    if (code === null) {
      return done(code)
    }

    if (markdownLineEnding$3(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return htmlContinueStart
    }

    effects.enter('htmlFlowData');
    return continuation(code)
  }

  function continuationCommentInside(code) {
    if (code === 45) {
      effects.consume(code);
      return continuationDeclarationInside
    }

    return continuation(code)
  }

  function continuationRawTagOpen(code) {
    if (code === 47) {
      effects.consume(code);
      buffer = '';
      return continuationRawEndTag
    }

    return continuation(code)
  }

  function continuationRawEndTag(code) {
    if (code === 62 && htmlRawNames.indexOf(buffer.toLowerCase()) > -1) {
      effects.consume(code);
      return continuationClose
    }

    if (asciiAlpha$1(code) && buffer.length < 8) {
      effects.consume(code);
      buffer += fromCharCode(code);
      return continuationRawEndTag
    }

    return continuation(code)
  }

  function continuationCharacterDataInside(code) {
    if (code === 93) {
      effects.consume(code);
      return continuationDeclarationInside
    }

    return continuation(code)
  }

  function continuationDeclarationInside(code) {
    if (code === 62) {
      effects.consume(code);
      return continuationClose
    }

    return continuation(code)
  }

  function continuationClose(code) {
    if (code === null || markdownLineEnding$3(code)) {
      effects.exit('htmlFlowData');
      return done(code)
    }

    effects.consume(code);
    return continuationClose
  }

  function done(code) {
    effects.exit('htmlFlow');
    return ok(code)
  }
}

function tokenizeNextBlank(effects, ok, nok) {
  return start

  function start(code) {
    effects.exit('htmlFlowData');
    effects.enter('lineEndingBlank');
    effects.consume(code);
    effects.exit('lineEndingBlank');
    return effects.attempt(partialBlankLine$1, ok, nok)
  }
}

var htmlFlow_1 = htmlFlow$1;

var asciiAlpha = asciiAlpha_1;
var asciiAlphanumeric = asciiAlphanumeric_1;
var markdownLineEnding$2 = markdownLineEnding_1;
var markdownLineEndingOrSpace$1 = markdownLineEndingOrSpace_1;
var markdownSpace$2 = markdownSpace_1;
var factorySpace$4 = factorySpace$h;

var htmlText$1 = {
  name: 'htmlText',
  tokenize: tokenizeHtmlText
};

function tokenizeHtmlText(effects, ok, nok) {
  var self = this;
  var marker;
  var buffer;
  var index;
  var returnState;
  return start

  function start(code) {
    effects.enter('htmlText');
    effects.enter('htmlTextData');
    effects.consume(code);
    return open
  }

  function open(code) {
    if (code === 33) {
      effects.consume(code);
      return declarationOpen
    }

    if (code === 47) {
      effects.consume(code);
      return tagCloseStart
    }

    if (code === 63) {
      effects.consume(code);
      return instruction
    }

    if (asciiAlpha(code)) {
      effects.consume(code);
      return tagOpen
    }

    return nok(code)
  }

  function declarationOpen(code) {
    if (code === 45) {
      effects.consume(code);
      return commentOpen
    }

    if (code === 91) {
      effects.consume(code);
      buffer = 'CDATA[';
      index = 0;
      return cdataOpen
    }

    if (asciiAlpha(code)) {
      effects.consume(code);
      return declaration
    }

    return nok(code)
  }

  function commentOpen(code) {
    if (code === 45) {
      effects.consume(code);
      return commentStart
    }

    return nok(code)
  }

  function commentStart(code) {
    if (code === null || code === 62) {
      return nok(code)
    }

    if (code === 45) {
      effects.consume(code);
      return commentStartDash
    }

    return comment(code)
  }

  function commentStartDash(code) {
    if (code === null || code === 62) {
      return nok(code)
    }

    return comment(code)
  }

  function comment(code) {
    if (code === null) {
      return nok(code)
    }

    if (code === 45) {
      effects.consume(code);
      return commentClose
    }

    if (markdownLineEnding$2(code)) {
      returnState = comment;
      return atLineEnding(code)
    }

    effects.consume(code);
    return comment
  }

  function commentClose(code) {
    if (code === 45) {
      effects.consume(code);
      return end
    }

    return comment(code)
  }

  function cdataOpen(code) {
    if (code === buffer.charCodeAt(index++)) {
      effects.consume(code);
      return index === buffer.length ? cdata : cdataOpen
    }

    return nok(code)
  }

  function cdata(code) {
    if (code === null) {
      return nok(code)
    }

    if (code === 93) {
      effects.consume(code);
      return cdataClose
    }

    if (markdownLineEnding$2(code)) {
      returnState = cdata;
      return atLineEnding(code)
    }

    effects.consume(code);
    return cdata
  }

  function cdataClose(code) {
    if (code === 93) {
      effects.consume(code);
      return cdataEnd
    }

    return cdata(code)
  }

  function cdataEnd(code) {
    if (code === 62) {
      return end(code)
    }

    if (code === 93) {
      effects.consume(code);
      return cdataEnd
    }

    return cdata(code)
  }

  function declaration(code) {
    if (code === null || code === 62) {
      return end(code)
    }

    if (markdownLineEnding$2(code)) {
      returnState = declaration;
      return atLineEnding(code)
    }

    effects.consume(code);
    return declaration
  }

  function instruction(code) {
    if (code === null) {
      return nok(code)
    }

    if (code === 63) {
      effects.consume(code);
      return instructionClose
    }

    if (markdownLineEnding$2(code)) {
      returnState = instruction;
      return atLineEnding(code)
    }

    effects.consume(code);
    return instruction
  }

  function instructionClose(code) {
    return code === 62 ? end(code) : instruction(code)
  }

  function tagCloseStart(code) {
    if (asciiAlpha(code)) {
      effects.consume(code);
      return tagClose
    }

    return nok(code)
  }

  function tagClose(code) {
    if (code === 45 || asciiAlphanumeric(code)) {
      effects.consume(code);
      return tagClose
    }

    return tagCloseBetween(code)
  }

  function tagCloseBetween(code) {
    if (markdownLineEnding$2(code)) {
      returnState = tagCloseBetween;
      return atLineEnding(code)
    }

    if (markdownSpace$2(code)) {
      effects.consume(code);
      return tagCloseBetween
    }

    return end(code)
  }

  function tagOpen(code) {
    if (code === 45 || asciiAlphanumeric(code)) {
      effects.consume(code);
      return tagOpen
    }

    if (code === 47 || code === 62 || markdownLineEndingOrSpace$1(code)) {
      return tagOpenBetween(code)
    }

    return nok(code)
  }

  function tagOpenBetween(code) {
    if (code === 47) {
      effects.consume(code);
      return end
    }

    if (code === 58 || code === 95 || asciiAlpha(code)) {
      effects.consume(code);
      return tagOpenAttributeName
    }

    if (markdownLineEnding$2(code)) {
      returnState = tagOpenBetween;
      return atLineEnding(code)
    }

    if (markdownSpace$2(code)) {
      effects.consume(code);
      return tagOpenBetween
    }

    return end(code)
  }

  function tagOpenAttributeName(code) {
    if (
      code === 45 ||
      code === 46 ||
      code === 58 ||
      code === 95 ||
      asciiAlphanumeric(code)
    ) {
      effects.consume(code);
      return tagOpenAttributeName
    }

    return tagOpenAttributeNameAfter(code)
  }

  function tagOpenAttributeNameAfter(code) {
    if (code === 61) {
      effects.consume(code);
      return tagOpenAttributeValueBefore
    }

    if (markdownLineEnding$2(code)) {
      returnState = tagOpenAttributeNameAfter;
      return atLineEnding(code)
    }

    if (markdownSpace$2(code)) {
      effects.consume(code);
      return tagOpenAttributeNameAfter
    }

    return tagOpenBetween(code)
  }

  function tagOpenAttributeValueBefore(code) {
    if (
      code === null ||
      code === 60 ||
      code === 61 ||
      code === 62 ||
      code === 96
    ) {
      return nok(code)
    }

    if (code === 34 || code === 39) {
      effects.consume(code);
      marker = code;
      return tagOpenAttributeValueQuoted
    }

    if (markdownLineEnding$2(code)) {
      returnState = tagOpenAttributeValueBefore;
      return atLineEnding(code)
    }

    if (markdownSpace$2(code)) {
      effects.consume(code);
      return tagOpenAttributeValueBefore
    }

    effects.consume(code);
    marker = undefined;
    return tagOpenAttributeValueUnquoted
  }

  function tagOpenAttributeValueQuoted(code) {
    if (code === marker) {
      effects.consume(code);
      return tagOpenAttributeValueQuotedAfter
    }

    if (code === null) {
      return nok(code)
    }

    if (markdownLineEnding$2(code)) {
      returnState = tagOpenAttributeValueQuoted;
      return atLineEnding(code)
    }

    effects.consume(code);
    return tagOpenAttributeValueQuoted
  }

  function tagOpenAttributeValueQuotedAfter(code) {
    if (code === 62 || code === 47 || markdownLineEndingOrSpace$1(code)) {
      return tagOpenBetween(code)
    }

    return nok(code)
  }

  function tagOpenAttributeValueUnquoted(code) {
    if (
      code === null ||
      code === 34 ||
      code === 39 ||
      code === 60 ||
      code === 61 ||
      code === 96
    ) {
      return nok(code)
    }

    if (code === 62 || markdownLineEndingOrSpace$1(code)) {
      return tagOpenBetween(code)
    }

    effects.consume(code);
    return tagOpenAttributeValueUnquoted
  } // We can’t have blank lines in content, so no need to worry about empty
  // tokens.

  function atLineEnding(code) {
    effects.exit('htmlTextData');
    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    return factorySpace$4(
      effects,
      afterPrefix,
      'linePrefix',
      self.parser.constructs.disable.null.indexOf('codeIndented') > -1
        ? undefined
        : 4
    )
  }

  function afterPrefix(code) {
    effects.enter('htmlTextData');
    return returnState(code)
  }

  function end(code) {
    if (code === 62) {
      effects.consume(code);
      effects.exit('htmlTextData');
      effects.exit('htmlText');
      return ok
    }

    return nok(code)
  }
}

var htmlText_1 = htmlText$1;

var markdownLineEndingOrSpace = markdownLineEndingOrSpace_1;
var chunkedPush = chunkedPush_1;
var chunkedSplice = chunkedSplice_1;
var normalizeIdentifier$1 = normalizeIdentifier_1;
var resolveAll = resolveAll_1;
var shallow$1 = shallow_1;
var factoryDestination = factoryDestination$2;
var factoryLabel = factoryLabel$2;
var factoryTitle = factoryTitle$2;
var factoryWhitespace = factoryWhitespace$2;

var labelEnd$3 = {
  name: 'labelEnd',
  tokenize: tokenizeLabelEnd,
  resolveTo: resolveToLabelEnd,
  resolveAll: resolveAllLabelEnd
};
var resourceConstruct = {
  tokenize: tokenizeResource
};
var fullReferenceConstruct = {
  tokenize: tokenizeFullReference
};
var collapsedReferenceConstruct = {
  tokenize: tokenizeCollapsedReference
};

function resolveAllLabelEnd(events) {
  var index = -1;
  var token;

  while (++index < events.length) {
    token = events[index][1];

    if (
      !token._used &&
      (token.type === 'labelImage' ||
        token.type === 'labelLink' ||
        token.type === 'labelEnd')
    ) {
      // Remove the marker.
      events.splice(index + 1, token.type === 'labelImage' ? 4 : 2);
      token.type = 'data';
      index++;
    }
  }

  return events
}

function resolveToLabelEnd(events, context) {
  var index = events.length;
  var offset = 0;
  var group;
  var label;
  var text;
  var token;
  var open;
  var close;
  var media; // Find an opening.

  while (index--) {
    token = events[index][1];

    if (open) {
      // If we see another link, or inactive link label, we’ve been here before.
      if (
        token.type === 'link' ||
        (token.type === 'labelLink' && token._inactive)
      ) {
        break
      } // Mark other link openings as inactive, as we can’t have links in
      // links.

      if (events[index][0] === 'enter' && token.type === 'labelLink') {
        token._inactive = true;
      }
    } else if (close) {
      if (
        events[index][0] === 'enter' &&
        (token.type === 'labelImage' || token.type === 'labelLink') &&
        !token._balanced
      ) {
        open = index;

        if (token.type !== 'labelLink') {
          offset = 2;
          break
        }
      }
    } else if (token.type === 'labelEnd') {
      close = index;
    }
  }

  group = {
    type: events[open][1].type === 'labelLink' ? 'link' : 'image',
    start: shallow$1(events[open][1].start),
    end: shallow$1(events[events.length - 1][1].end)
  };
  label = {
    type: 'label',
    start: shallow$1(events[open][1].start),
    end: shallow$1(events[close][1].end)
  };
  text = {
    type: 'labelText',
    start: shallow$1(events[open + offset + 2][1].end),
    end: shallow$1(events[close - 2][1].start)
  };
  media = [
    ['enter', group, context],
    ['enter', label, context]
  ]; // Opening marker.

  media = chunkedPush(media, events.slice(open + 1, open + offset + 3)); // Text open.

  media = chunkedPush(media, [['enter', text, context]]); // Between.

  media = chunkedPush(
    media,
    resolveAll(
      context.parser.constructs.insideSpan.null,
      events.slice(open + offset + 4, close - 3),
      context
    )
  ); // Text close, marker close, label close.

  media = chunkedPush(media, [
    ['exit', text, context],
    events[close - 2],
    events[close - 1],
    ['exit', label, context]
  ]); // Reference, resource, or so.

  media = chunkedPush(media, events.slice(close + 1)); // Media close.

  media = chunkedPush(media, [['exit', group, context]]);
  chunkedSplice(events, open, events.length, media);
  return events
}

function tokenizeLabelEnd(effects, ok, nok) {
  var self = this;
  var index = self.events.length;
  var labelStart;
  var defined; // Find an opening.

  while (index--) {
    if (
      (self.events[index][1].type === 'labelImage' ||
        self.events[index][1].type === 'labelLink') &&
      !self.events[index][1]._balanced
    ) {
      labelStart = self.events[index][1];
      break
    }
  }

  return start

  function start(code) {
    if (!labelStart) {
      return nok(code)
    } // It’s a balanced bracket, but contains a link.

    if (labelStart._inactive) return balanced(code)
    defined =
      self.parser.defined.indexOf(
        normalizeIdentifier$1(
          self.sliceSerialize({
            start: labelStart.end,
            end: self.now()
          })
        )
      ) > -1;
    effects.enter('labelEnd');
    effects.enter('labelMarker');
    effects.consume(code);
    effects.exit('labelMarker');
    effects.exit('labelEnd');
    return afterLabelEnd
  }

  function afterLabelEnd(code) {
    // Resource: `[asd](fgh)`.
    if (code === 40) {
      return effects.attempt(
        resourceConstruct,
        ok,
        defined ? ok : balanced
      )(code)
    } // Collapsed (`[asd][]`) or full (`[asd][fgh]`) reference?

    if (code === 91) {
      return effects.attempt(
        fullReferenceConstruct,
        ok,
        defined
          ? effects.attempt(collapsedReferenceConstruct, ok, balanced)
          : balanced
      )(code)
    } // Shortcut reference: `[asd]`?

    return defined ? ok(code) : balanced(code)
  }

  function balanced(code) {
    labelStart._balanced = true;
    return nok(code)
  }
}

function tokenizeResource(effects, ok, nok) {
  return start

  function start(code) {
    effects.enter('resource');
    effects.enter('resourceMarker');
    effects.consume(code);
    effects.exit('resourceMarker');
    return factoryWhitespace(effects, open)
  }

  function open(code) {
    if (code === 41) {
      return end(code)
    }

    return factoryDestination(
      effects,
      destinationAfter,
      nok,
      'resourceDestination',
      'resourceDestinationLiteral',
      'resourceDestinationLiteralMarker',
      'resourceDestinationRaw',
      'resourceDestinationString',
      3
    )(code)
  }

  function destinationAfter(code) {
    return markdownLineEndingOrSpace(code)
      ? factoryWhitespace(effects, between)(code)
      : end(code)
  }

  function between(code) {
    if (code === 34 || code === 39 || code === 40) {
      return factoryTitle(
        effects,
        factoryWhitespace(effects, end),
        nok,
        'resourceTitle',
        'resourceTitleMarker',
        'resourceTitleString'
      )(code)
    }

    return end(code)
  }

  function end(code) {
    if (code === 41) {
      effects.enter('resourceMarker');
      effects.consume(code);
      effects.exit('resourceMarker');
      effects.exit('resource');
      return ok
    }

    return nok(code)
  }
}

function tokenizeFullReference(effects, ok, nok) {
  var self = this;
  return start

  function start(code) {
    return factoryLabel.call(
      self,
      effects,
      afterLabel,
      nok,
      'reference',
      'referenceMarker',
      'referenceString'
    )(code)
  }

  function afterLabel(code) {
    return self.parser.defined.indexOf(
      normalizeIdentifier$1(
        self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
      )
    ) < 0
      ? nok(code)
      : ok(code)
  }
}

function tokenizeCollapsedReference(effects, ok, nok) {
  return start

  function start(code) {
    effects.enter('reference');
    effects.enter('referenceMarker');
    effects.consume(code);
    effects.exit('referenceMarker');
    return open
  }

  function open(code) {
    if (code === 93) {
      effects.enter('referenceMarker');
      effects.consume(code);
      effects.exit('referenceMarker');
      effects.exit('reference');
      return ok
    }

    return nok(code)
  }
}

var labelEnd_1 = labelEnd$3;

var labelEnd$2 = labelEnd_1;

var labelStartImage$1 = {
  name: 'labelStartImage',
  tokenize: tokenizeLabelStartImage,
  resolveAll: labelEnd$2.resolveAll
};

function tokenizeLabelStartImage(effects, ok, nok) {
  var self = this;
  return start

  function start(code) {
    effects.enter('labelImage');
    effects.enter('labelImageMarker');
    effects.consume(code);
    effects.exit('labelImageMarker');
    return open
  }

  function open(code) {
    if (code === 91) {
      effects.enter('labelMarker');
      effects.consume(code);
      effects.exit('labelMarker');
      effects.exit('labelImage');
      return after
    }

    return nok(code)
  }

  function after(code) {
    /* c8 ignore next */
    return code === 94 &&
      /* c8 ignore next */
      '_hiddenFootnoteSupport' in self.parser.constructs
      ? /* c8 ignore next */
        nok(code)
      : ok(code)
  }
}

var labelStartImage_1 = labelStartImage$1;

var labelEnd$1 = labelEnd_1;

var labelStartLink$1 = {
  name: 'labelStartLink',
  tokenize: tokenizeLabelStartLink,
  resolveAll: labelEnd$1.resolveAll
};

function tokenizeLabelStartLink(effects, ok, nok) {
  var self = this;
  return start

  function start(code) {
    effects.enter('labelLink');
    effects.enter('labelMarker');
    effects.consume(code);
    effects.exit('labelMarker');
    effects.exit('labelLink');
    return after
  }

  function after(code) {
    /* c8 ignore next */
    return code === 94 &&
      /* c8 ignore next */
      '_hiddenFootnoteSupport' in self.parser.constructs
      ? /* c8 ignore next */
        nok(code)
      : ok(code)
  }
}

var labelStartLink_1 = labelStartLink$1;

var factorySpace$3 = factorySpace$h;

var lineEnding$1 = {
  name: 'lineEnding',
  tokenize: tokenizeLineEnding
};

function tokenizeLineEnding(effects, ok) {
  return start

  function start(code) {
    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    return factorySpace$3(effects, ok, 'linePrefix')
  }
}

var lineEnding_1 = lineEnding$1;

var markdownLineEnding$1 = markdownLineEnding_1;
var markdownSpace$1 = markdownSpace_1;
var factorySpace$2 = factorySpace$h;

var thematicBreak$3 = {
  name: 'thematicBreak',
  tokenize: tokenizeThematicBreak
};

function tokenizeThematicBreak(effects, ok, nok) {
  var size = 0;
  var marker;
  return start

  function start(code) {
    effects.enter('thematicBreak');
    marker = code;
    return atBreak(code)
  }

  function atBreak(code) {
    if (code === marker) {
      effects.enter('thematicBreakSequence');
      return sequence(code)
    }

    if (markdownSpace$1(code)) {
      return factorySpace$2(effects, atBreak, 'whitespace')(code)
    }

    if (size < 3 || (code !== null && !markdownLineEnding$1(code))) {
      return nok(code)
    }

    effects.exit('thematicBreak');
    return ok(code)
  }

  function sequence(code) {
    if (code === marker) {
      effects.consume(code);
      size++;
      return sequence
    }

    effects.exit('thematicBreakSequence');
    return atBreak(code)
  }
}

var thematicBreak_1$1 = thematicBreak$3;

var asciiDigit = asciiDigit_1;
var markdownSpace = markdownSpace_1;
var prefixSize = prefixSize_1;
var sizeChunks = sizeChunks_1;
var factorySpace$1 = factorySpace$h;
var partialBlankLine = partialBlankLine_1;
var thematicBreak$2 = thematicBreak_1$1;

var list$2 = {
  name: 'list',
  tokenize: tokenizeListStart,
  continuation: {
    tokenize: tokenizeListContinuation
  },
  exit: tokenizeListEnd
};
var listItemPrefixWhitespaceConstruct = {
  tokenize: tokenizeListItemPrefixWhitespace,
  partial: true
};
var indentConstruct = {
  tokenize: tokenizeIndent,
  partial: true
};

function tokenizeListStart(effects, ok, nok) {
  var self = this;
  var initialSize = prefixSize(self.events, 'linePrefix');
  var size = 0;
  return start

  function start(code) {
    var kind =
      self.containerState.type ||
      (code === 42 || code === 43 || code === 45
        ? 'listUnordered'
        : 'listOrdered');

    if (
      kind === 'listUnordered'
        ? !self.containerState.marker || code === self.containerState.marker
        : asciiDigit(code)
    ) {
      if (!self.containerState.type) {
        self.containerState.type = kind;
        effects.enter(kind, {
          _container: true
        });
      }

      if (kind === 'listUnordered') {
        effects.enter('listItemPrefix');
        return code === 42 || code === 45
          ? effects.check(thematicBreak$2, nok, atMarker)(code)
          : atMarker(code)
      }

      if (!self.interrupt || code === 49) {
        effects.enter('listItemPrefix');
        effects.enter('listItemValue');
        return inside(code)
      }
    }

    return nok(code)
  }

  function inside(code) {
    if (asciiDigit(code) && ++size < 10) {
      effects.consume(code);
      return inside
    }

    if (
      (!self.interrupt || size < 2) &&
      (self.containerState.marker
        ? code === self.containerState.marker
        : code === 41 || code === 46)
    ) {
      effects.exit('listItemValue');
      return atMarker(code)
    }

    return nok(code)
  }

  function atMarker(code) {
    effects.enter('listItemMarker');
    effects.consume(code);
    effects.exit('listItemMarker');
    self.containerState.marker = self.containerState.marker || code;
    return effects.check(
      partialBlankLine, // Can’t be empty when interrupting.
      self.interrupt ? nok : onBlank,
      effects.attempt(
        listItemPrefixWhitespaceConstruct,
        endOfPrefix,
        otherPrefix
      )
    )
  }

  function onBlank(code) {
    self.containerState.initialBlankLine = true;
    initialSize++;
    return endOfPrefix(code)
  }

  function otherPrefix(code) {
    if (markdownSpace(code)) {
      effects.enter('listItemPrefixWhitespace');
      effects.consume(code);
      effects.exit('listItemPrefixWhitespace');
      return endOfPrefix
    }

    return nok(code)
  }

  function endOfPrefix(code) {
    self.containerState.size =
      initialSize + sizeChunks(self.sliceStream(effects.exit('listItemPrefix')));
    return ok(code)
  }
}

function tokenizeListContinuation(effects, ok, nok) {
  var self = this;
  self.containerState._closeFlow = undefined;
  return effects.check(partialBlankLine, onBlank, notBlank)

  function onBlank(code) {
    self.containerState.furtherBlankLines =
      self.containerState.furtherBlankLines ||
      self.containerState.initialBlankLine; // We have a blank line.
    // Still, try to consume at most the items size.

    return factorySpace$1(
      effects,
      ok,
      'listItemIndent',
      self.containerState.size + 1
    )(code)
  }

  function notBlank(code) {
    if (self.containerState.furtherBlankLines || !markdownSpace(code)) {
      self.containerState.furtherBlankLines = self.containerState.initialBlankLine = undefined;
      return notInCurrentItem(code)
    }

    self.containerState.furtherBlankLines = self.containerState.initialBlankLine = undefined;
    return effects.attempt(indentConstruct, ok, notInCurrentItem)(code)
  }

  function notInCurrentItem(code) {
    // While we do continue, we signal that the flow should be closed.
    self.containerState._closeFlow = true; // As we’re closing flow, we’re no longer interrupting.

    self.interrupt = undefined;
    return factorySpace$1(
      effects,
      effects.attempt(list$2, ok, nok),
      'linePrefix',
      self.parser.constructs.disable.null.indexOf('codeIndented') > -1
        ? undefined
        : 4
    )(code)
  }
}

function tokenizeIndent(effects, ok, nok) {
  var self = this;
  return factorySpace$1(
    effects,
    afterPrefix,
    'listItemIndent',
    self.containerState.size + 1
  )

  function afterPrefix(code) {
    return prefixSize(self.events, 'listItemIndent') ===
      self.containerState.size
      ? ok(code)
      : nok(code)
  }
}

function tokenizeListEnd(effects) {
  effects.exit(this.containerState.type);
}

function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
  var self = this;
  return factorySpace$1(
    effects,
    afterPrefix,
    'listItemPrefixWhitespace',
    self.parser.constructs.disable.null.indexOf('codeIndented') > -1
      ? undefined
      : 4 + 1
  )

  function afterPrefix(code) {
    return markdownSpace(code) ||
      !prefixSize(self.events, 'listItemPrefixWhitespace')
      ? nok(code)
      : ok(code)
  }
}

var list_1$1 = list$2;

var markdownLineEnding = markdownLineEnding_1;
var shallow = shallow_1;
var factorySpace = factorySpace$h;

var setextUnderline$1 = {
  name: 'setextUnderline',
  tokenize: tokenizeSetextUnderline,
  resolveTo: resolveToSetextUnderline
};

function resolveToSetextUnderline(events, context) {
  var index = events.length;
  var content;
  var text;
  var definition;
  var heading; // Find the opening of the content.
  // It’ll always exist: we don’t tokenize if it isn’t there.

  while (index--) {
    if (events[index][0] === 'enter') {
      if (events[index][1].type === 'content') {
        content = index;
        break
      }

      if (events[index][1].type === 'paragraph') {
        text = index;
      }
    } // Exit
    else {
      if (events[index][1].type === 'content') {
        // Remove the content end (if needed we’ll add it later)
        events.splice(index, 1);
      }

      if (!definition && events[index][1].type === 'definition') {
        definition = index;
      }
    }
  }

  heading = {
    type: 'setextHeading',
    start: shallow(events[text][1].start),
    end: shallow(events[events.length - 1][1].end)
  }; // Change the paragraph to setext heading text.

  events[text][1].type = 'setextHeadingText'; // If we have definitions in the content, we’ll keep on having content,
  // but we need move it.

  if (definition) {
    events.splice(text, 0, ['enter', heading, context]);
    events.splice(definition + 1, 0, ['exit', events[content][1], context]);
    events[content][1].end = shallow(events[definition][1].end);
  } else {
    events[content][1] = heading;
  } // Add the heading exit at the end.

  events.push(['exit', heading, context]);
  return events
}

function tokenizeSetextUnderline(effects, ok, nok) {
  var self = this;
  var index = self.events.length;
  var marker;
  var paragraph; // Find an opening.

  while (index--) {
    // Skip enter/exit of line ending, line prefix, and content.
    // We can now either have a definition or a paragraph.
    if (
      self.events[index][1].type !== 'lineEnding' &&
      self.events[index][1].type !== 'linePrefix' &&
      self.events[index][1].type !== 'content'
    ) {
      paragraph = self.events[index][1].type === 'paragraph';
      break
    }
  }

  return start

  function start(code) {
    if (!self.lazy && (self.interrupt || paragraph)) {
      effects.enter('setextHeadingLine');
      effects.enter('setextHeadingLineSequence');
      marker = code;
      return closingSequence(code)
    }

    return nok(code)
  }

  function closingSequence(code) {
    if (code === marker) {
      effects.consume(code);
      return closingSequence
    }

    effects.exit('setextHeadingLineSequence');
    return factorySpace(effects, closingSequenceEnd, 'lineSuffix')(code)
  }

  function closingSequenceEnd(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit('setextHeadingLine');
      return ok(code)
    }

    return nok(code)
  }
}

var setextUnderline_1 = setextUnderline$1;

Object.defineProperty(constructs$1, '__esModule', {value: true});

var text$1$1 = text$4;
var attention = attention_1;
var autolink = autolink_1;
var blockQuote = blockQuote_1;
var characterEscape$1 = characterEscape_1;
var characterReference$1 = characterReference_1;
var codeFenced = codeFenced_1;
var codeIndented = codeIndented_1;
var codeText = codeText_1;
var definition$1 = definition_1$1;
var hardBreakEscape = hardBreakEscape_1;
var headingAtx = headingAtx_1;
var htmlFlow = htmlFlow_1;
var htmlText = htmlText_1;
var labelEnd = labelEnd_1;
var labelStartImage = labelStartImage_1;
var labelStartLink = labelStartLink_1;
var lineEnding = lineEnding_1;
var list$1 = list_1$1;
var setextUnderline = setextUnderline_1;
var thematicBreak$1 = thematicBreak_1$1;

var document$1 = {
  42: list$1,
  // Asterisk
  43: list$1,
  // Plus sign
  45: list$1,
  // Dash
  48: list$1,
  // 0
  49: list$1,
  // 1
  50: list$1,
  // 2
  51: list$1,
  // 3
  52: list$1,
  // 4
  53: list$1,
  // 5
  54: list$1,
  // 6
  55: list$1,
  // 7
  56: list$1,
  // 8
  57: list$1,
  // 9
  62: blockQuote // Greater than
};
var contentInitial = {
  91: definition$1 // Left square bracket
};
var flowInitial = {
  '-2': codeIndented,
  // Horizontal tab
  '-1': codeIndented,
  // Virtual space
  32: codeIndented // Space
};
var flow$6 = {
  35: headingAtx,
  // Number sign
  42: thematicBreak$1,
  // Asterisk
  45: [setextUnderline, thematicBreak$1],
  // Dash
  60: htmlFlow,
  // Less than
  61: setextUnderline,
  // Equals to
  95: thematicBreak$1,
  // Underscore
  96: codeFenced,
  // Grave accent
  126: codeFenced // Tilde
};
var string = {
  38: characterReference$1,
  // Ampersand
  92: characterEscape$1 // Backslash
};
var text$2 = {
  '-5': lineEnding,
  // Carriage return
  '-4': lineEnding,
  // Line feed
  '-3': lineEnding,
  // Carriage return + line feed
  33: labelStartImage,
  // Exclamation mark
  38: characterReference$1,
  // Ampersand
  42: attention,
  // Asterisk
  60: [autolink, htmlText],
  // Less than
  91: labelStartLink,
  // Left square bracket
  92: [hardBreakEscape, characterEscape$1],
  // Backslash
  93: labelEnd,
  // Right square bracket
  95: attention,
  // Underscore
  96: codeText // Grave accent
};
var insideSpan = {
  null: [attention, text$1$1.resolver]
};
var disable = {
  null: []
};

constructs$1.contentInitial = contentInitial;
constructs$1.disable = disable;
constructs$1.document = document$1;
constructs$1.flow = flow$6;
constructs$1.flowInitial = flowInitial;
constructs$1.insideSpan = insideSpan;
constructs$1.string = string;
constructs$1.text = text$2;

var content = content$3;
var document = document$2;
var flow$5 = flow$7;
var text$1 = text$4;
var combineExtensions = combineExtensions_1;
var createTokenizer = createTokenizer_1;
var miniflat = miniflat_1;
var constructs = constructs$1;

function parse$3(options) {
  var settings = options || {};
  var parser = {
    defined: [],
    constructs: combineExtensions(
      [constructs].concat(miniflat(settings.extensions))
    ),
    content: create(content),
    document: create(document),
    flow: create(flow$5),
    string: create(text$1.string),
    text: create(text$1.text)
  };
  return parser

  function create(initializer) {
    return creator

    function creator(from) {
      return createTokenizer(parser, initializer, from)
    }
  }
}

var parse_1 = parse$3;

var search = /[\0\t\n\r]/g;

function preprocess() {
  var start = true;
  var column = 1;
  var buffer = '';
  var atCarriageReturn;
  return preprocessor

  function preprocessor(value, encoding, end) {
    var chunks = [];
    var match;
    var next;
    var startPosition;
    var endPosition;
    var code;
    value = buffer + value.toString(encoding);
    startPosition = 0;
    buffer = '';

    if (start) {
      if (value.charCodeAt(0) === 65279) {
        startPosition++;
      }

      start = undefined;
    }

    while (startPosition < value.length) {
      search.lastIndex = startPosition;
      match = search.exec(value);
      endPosition = match ? match.index : value.length;
      code = value.charCodeAt(endPosition);

      if (!match) {
        buffer = value.slice(startPosition);
        break
      }

      if (code === 10 && startPosition === endPosition && atCarriageReturn) {
        chunks.push(-3);
        atCarriageReturn = undefined;
      } else {
        if (atCarriageReturn) {
          chunks.push(-5);
          atCarriageReturn = undefined;
        }

        if (startPosition < endPosition) {
          chunks.push(value.slice(startPosition, endPosition));
          column += endPosition - startPosition;
        }

        if (code === 0) {
          chunks.push(65533);
          column++;
        } else if (code === 9) {
          next = Math.ceil(column / 4) * 4;
          chunks.push(-2);

          while (column++ < next) chunks.push(-1);
        } else if (code === 10) {
          chunks.push(-4);
          column = 1;
        } // Must be carriage return.
        else {
          atCarriageReturn = true;
          column = 1;
        }
      }

      startPosition = endPosition + 1;
    }

    if (end) {
      if (atCarriageReturn) chunks.push(-5);
      if (buffer) chunks.push(buffer);
      chunks.push(null);
    }

    return chunks
  }
}

var preprocess_1 = preprocess;

var subtokenize = subtokenize_1;

function postprocess$1(events) {
  while (!subtokenize(events)) {
    // Empty
  }

  return events
}

var postprocess_1 = postprocess$1;

var dist = fromMarkdown$1;

// These three are compiled away in the `dist/`

var toString$2 = mdastUtilToString;
var assign = assign_1;
var own$2 = hasOwnProperty$1;
var normalizeIdentifier = normalizeIdentifier_1;
var safeFromInt = safeFromInt_1;
var parser = parse_1;
var preprocessor = preprocess_1;
var postprocess = postprocess_1;
var decode$1 = decodeEntity_1;
var stringifyPosition = unistUtilStringifyPosition;

function fromMarkdown$1(value, encoding, options) {
  if (typeof encoding !== 'string') {
    options = encoding;
    encoding = undefined;
  }

  return compiler(options)(
    postprocess(
      parser(options).document().write(preprocessor()(value, encoding, true))
    )
  )
}

// Note this compiler only understand complete buffering, not streaming.
function compiler(options) {
  var settings = options || {};
  var config = configure$2(
    {
      transforms: [],
      canContainEols: [
        'emphasis',
        'fragment',
        'heading',
        'paragraph',
        'strong'
      ],

      enter: {
        autolink: opener(link),
        autolinkProtocol: onenterdata,
        autolinkEmail: onenterdata,
        atxHeading: opener(heading),
        blockQuote: opener(blockQuote),
        characterEscape: onenterdata,
        characterReference: onenterdata,
        codeFenced: opener(codeFlow),
        codeFencedFenceInfo: buffer,
        codeFencedFenceMeta: buffer,
        codeIndented: opener(codeFlow, buffer),
        codeText: opener(codeText, buffer),
        codeTextData: onenterdata,
        data: onenterdata,
        codeFlowValue: onenterdata,
        definition: opener(definition),
        definitionDestinationString: buffer,
        definitionLabelString: buffer,
        definitionTitleString: buffer,
        emphasis: opener(emphasis),
        hardBreakEscape: opener(hardBreak),
        hardBreakTrailing: opener(hardBreak),
        htmlFlow: opener(html, buffer),
        htmlFlowData: onenterdata,
        htmlText: opener(html, buffer),
        htmlTextData: onenterdata,
        image: opener(image),
        label: buffer,
        link: opener(link),
        listItem: opener(listItem),
        listItemValue: onenterlistitemvalue,
        listOrdered: opener(list, onenterlistordered),
        listUnordered: opener(list),
        paragraph: opener(paragraph),
        reference: onenterreference,
        referenceString: buffer,
        resourceDestinationString: buffer,
        resourceTitleString: buffer,
        setextHeading: opener(heading),
        strong: opener(strong),
        thematicBreak: opener(thematicBreak)
      },

      exit: {
        atxHeading: closer(),
        atxHeadingSequence: onexitatxheadingsequence,
        autolink: closer(),
        autolinkEmail: onexitautolinkemail,
        autolinkProtocol: onexitautolinkprotocol,
        blockQuote: closer(),
        characterEscapeValue: onexitdata,
        characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
        characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
        characterReferenceValue: onexitcharacterreferencevalue,
        codeFenced: closer(onexitcodefenced),
        codeFencedFence: onexitcodefencedfence,
        codeFencedFenceInfo: onexitcodefencedfenceinfo,
        codeFencedFenceMeta: onexitcodefencedfencemeta,
        codeFlowValue: onexitdata,
        codeIndented: closer(onexitcodeindented),
        codeText: closer(onexitcodetext),
        codeTextData: onexitdata,
        data: onexitdata,
        definition: closer(),
        definitionDestinationString: onexitdefinitiondestinationstring,
        definitionLabelString: onexitdefinitionlabelstring,
        definitionTitleString: onexitdefinitiontitlestring,
        emphasis: closer(),
        hardBreakEscape: closer(onexithardbreak),
        hardBreakTrailing: closer(onexithardbreak),
        htmlFlow: closer(onexithtmlflow),
        htmlFlowData: onexitdata,
        htmlText: closer(onexithtmltext),
        htmlTextData: onexitdata,
        image: closer(onexitimage),
        label: onexitlabel,
        labelText: onexitlabeltext,
        lineEnding: onexitlineending,
        link: closer(onexitlink),
        listItem: closer(),
        listOrdered: closer(),
        listUnordered: closer(),
        paragraph: closer(),
        referenceString: onexitreferencestring,
        resourceDestinationString: onexitresourcedestinationstring,
        resourceTitleString: onexitresourcetitlestring,
        resource: onexitresource,
        setextHeading: closer(onexitsetextheading),
        setextHeadingLineSequence: onexitsetextheadinglinesequence,
        setextHeadingText: onexitsetextheadingtext,
        strong: closer(),
        thematicBreak: closer()
      }
    },

    settings.mdastExtensions || []
  );

  var data = {};

  return compile

  function compile(events) {
    var tree = {type: 'root', children: []};
    var stack = [tree];
    var tokenStack = [];
    var listStack = [];
    var index = -1;
    var handler;
    var listStart;

    var context = {
      stack: stack,
      tokenStack: tokenStack,
      config: config,
      enter: enter,
      exit: exit,
      buffer: buffer,
      resume: resume,
      setData: setData,
      getData: getData
    };

    while (++index < events.length) {
      // We preprocess lists to add `listItem` tokens, and to infer whether
      // items the list itself are spread out.
      if (
        events[index][1].type === 'listOrdered' ||
        events[index][1].type === 'listUnordered'
      ) {
        if (events[index][0] === 'enter') {
          listStack.push(index);
        } else {
          listStart = listStack.pop(index);
          index = prepareList(events, listStart, index);
        }
      }
    }

    index = -1;

    while (++index < events.length) {
      handler = config[events[index][0]];

      if (own$2.call(handler, events[index][1].type)) {
        handler[events[index][1].type].call(
          assign({sliceSerialize: events[index][2].sliceSerialize}, context),
          events[index][1]
        );
      }
    }

    if (tokenStack.length) {
      throw new Error(
        'Cannot close document, a token (`' +
          tokenStack[tokenStack.length - 1].type +
          '`, ' +
          stringifyPosition({
            start: tokenStack[tokenStack.length - 1].start,
            end: tokenStack[tokenStack.length - 1].end
          }) +
          ') is still open'
      )
    }

    // Figure out `root` position.
    tree.position = {
      start: point(
        events.length ? events[0][1].start : {line: 1, column: 1, offset: 0}
      ),

      end: point(
        events.length
          ? events[events.length - 2][1].end
          : {line: 1, column: 1, offset: 0}
      )
    };

    index = -1;
    while (++index < config.transforms.length) {
      tree = config.transforms[index](tree) || tree;
    }

    return tree
  }

  function prepareList(events, start, length) {
    var index = start - 1;
    var containerBalance = -1;
    var listSpread = false;
    var listItem;
    var tailIndex;
    var lineIndex;
    var tailEvent;
    var event;
    var firstBlankLineIndex;
    var atMarker;

    while (++index <= length) {
      event = events[index];

      if (
        event[1].type === 'listUnordered' ||
        event[1].type === 'listOrdered' ||
        event[1].type === 'blockQuote'
      ) {
        if (event[0] === 'enter') {
          containerBalance++;
        } else {
          containerBalance--;
        }

        atMarker = undefined;
      } else if (event[1].type === 'lineEndingBlank') {
        if (event[0] === 'enter') {
          if (
            listItem &&
            !atMarker &&
            !containerBalance &&
            !firstBlankLineIndex
          ) {
            firstBlankLineIndex = index;
          }

          atMarker = undefined;
        }
      } else if (
        event[1].type === 'linePrefix' ||
        event[1].type === 'listItemValue' ||
        event[1].type === 'listItemMarker' ||
        event[1].type === 'listItemPrefix' ||
        event[1].type === 'listItemPrefixWhitespace'
      ) ; else {
        atMarker = undefined;
      }

      if (
        (!containerBalance &&
          event[0] === 'enter' &&
          event[1].type === 'listItemPrefix') ||
        (containerBalance === -1 &&
          event[0] === 'exit' &&
          (event[1].type === 'listUnordered' ||
            event[1].type === 'listOrdered'))
      ) {
        if (listItem) {
          tailIndex = index;
          lineIndex = undefined;

          while (tailIndex--) {
            tailEvent = events[tailIndex];

            if (
              tailEvent[1].type === 'lineEnding' ||
              tailEvent[1].type === 'lineEndingBlank'
            ) {
              if (tailEvent[0] === 'exit') continue

              if (lineIndex) {
                events[lineIndex][1].type = 'lineEndingBlank';
                listSpread = true;
              }

              tailEvent[1].type = 'lineEnding';
              lineIndex = tailIndex;
            } else if (
              tailEvent[1].type === 'linePrefix' ||
              tailEvent[1].type === 'blockQuotePrefix' ||
              tailEvent[1].type === 'blockQuotePrefixWhitespace' ||
              tailEvent[1].type === 'blockQuoteMarker' ||
              tailEvent[1].type === 'listItemIndent'
            ) ; else {
              break
            }
          }

          if (
            firstBlankLineIndex &&
            (!lineIndex || firstBlankLineIndex < lineIndex)
          ) {
            listItem._spread = true;
          }

          // Fix position.
          listItem.end = point(
            lineIndex ? events[lineIndex][1].start : event[1].end
          );

          events.splice(lineIndex || index, 0, ['exit', listItem, event[2]]);
          index++;
          length++;
        }

        // Create a new list item.
        if (event[1].type === 'listItemPrefix') {
          listItem = {
            type: 'listItem',
            _spread: false,
            start: point(event[1].start)
          };

          events.splice(index, 0, ['enter', listItem, event[2]]);
          index++;
          length++;
          firstBlankLineIndex = undefined;
          atMarker = true;
        }
      }
    }

    events[start][1]._spread = listSpread;
    return length
  }

  function setData(key, value) {
    data[key] = value;
  }

  function getData(key) {
    return data[key]
  }

  function point(d) {
    return {line: d.line, column: d.column, offset: d.offset}
  }

  function opener(create, and) {
    return open

    function open(token) {
      enter.call(this, create(token), token);
      if (and) and.call(this, token);
    }
  }

  function buffer() {
    this.stack.push({type: 'fragment', children: []});
  }

  function enter(node, token) {
    this.stack[this.stack.length - 1].children.push(node);
    this.stack.push(node);
    this.tokenStack.push(token);
    node.position = {start: point(token.start)};
    return node
  }

  function closer(and) {
    return close

    function close(token) {
      if (and) and.call(this, token);
      exit.call(this, token);
    }
  }

  function exit(token) {
    var node = this.stack.pop();
    var open = this.tokenStack.pop();

    if (!open) {
      throw new Error(
        'Cannot close `' +
          token.type +
          '` (' +
          stringifyPosition({start: token.start, end: token.end}) +
          '): it’s not open'
      )
    } else if (open.type !== token.type) {
      throw new Error(
        'Cannot close `' +
          token.type +
          '` (' +
          stringifyPosition({start: token.start, end: token.end}) +
          '): a different token (`' +
          open.type +
          '`, ' +
          stringifyPosition({start: open.start, end: open.end}) +
          ') is open'
      )
    }

    node.position.end = point(token.end);
    return node
  }

  function resume() {
    return toString$2(this.stack.pop())
  }

  //
  // Handlers.
  //

  function onenterlistordered() {
    setData('expectingFirstListItemValue', true);
  }

  function onenterlistitemvalue(token) {
    if (getData('expectingFirstListItemValue')) {
      this.stack[this.stack.length - 2].start = parseInt(
        this.sliceSerialize(token),
        10
      );

      setData('expectingFirstListItemValue');
    }
  }

  function onexitcodefencedfenceinfo() {
    var data = this.resume();
    this.stack[this.stack.length - 1].lang = data;
  }

  function onexitcodefencedfencemeta() {
    var data = this.resume();
    this.stack[this.stack.length - 1].meta = data;
  }

  function onexitcodefencedfence() {
    // Exit if this is the closing fence.
    if (getData('flowCodeInside')) return
    this.buffer();
    setData('flowCodeInside', true);
  }

  function onexitcodefenced() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data.replace(
      /^(\r?\n|\r)|(\r?\n|\r)$/g,
      ''
    );

    setData('flowCodeInside');
  }

  function onexitcodeindented() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data;
  }

  function onexitdefinitionlabelstring(token) {
    // Discard label, use the source content instead.
    var label = this.resume();
    this.stack[this.stack.length - 1].label = label;
    this.stack[this.stack.length - 1].identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
  }

  function onexitdefinitiontitlestring() {
    var data = this.resume();
    this.stack[this.stack.length - 1].title = data;
  }

  function onexitdefinitiondestinationstring() {
    var data = this.resume();
    this.stack[this.stack.length - 1].url = data;
  }

  function onexitatxheadingsequence(token) {
    if (!this.stack[this.stack.length - 1].depth) {
      this.stack[this.stack.length - 1].depth = this.sliceSerialize(
        token
      ).length;
    }
  }

  function onexitsetextheadingtext() {
    setData('setextHeadingSlurpLineEnding', true);
  }

  function onexitsetextheadinglinesequence(token) {
    this.stack[this.stack.length - 1].depth =
      this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2;
  }

  function onexitsetextheading() {
    setData('setextHeadingSlurpLineEnding');
  }

  function onenterdata(token) {
    var siblings = this.stack[this.stack.length - 1].children;
    var tail = siblings[siblings.length - 1];

    if (!tail || tail.type !== 'text') {
      // Add a new text node.
      tail = text();
      tail.position = {start: point(token.start)};
      this.stack[this.stack.length - 1].children.push(tail);
    }

    this.stack.push(tail);
  }

  function onexitdata(token) {
    var tail = this.stack.pop();
    tail.value += this.sliceSerialize(token);
    tail.position.end = point(token.end);
  }

  function onexitlineending(token) {
    var context = this.stack[this.stack.length - 1];

    // If we’re at a hard break, include the line ending in there.
    if (getData('atHardBreak')) {
      context.children[context.children.length - 1].position.end = point(
        token.end
      );

      setData('atHardBreak');
      return
    }

    if (
      !getData('setextHeadingSlurpLineEnding') &&
      config.canContainEols.indexOf(context.type) > -1
    ) {
      onenterdata.call(this, token);
      onexitdata.call(this, token);
    }
  }

  function onexithardbreak() {
    setData('atHardBreak', true);
  }

  function onexithtmlflow() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data;
  }

  function onexithtmltext() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data;
  }

  function onexitcodetext() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data;
  }

  function onexitlink() {
    var context = this.stack[this.stack.length - 1];

    // To do: clean.
    if (getData('inReference')) {
      context.type += 'Reference';
      context.referenceType = getData('referenceType') || 'shortcut';
      delete context.url;
      delete context.title;
    } else {
      delete context.identifier;
      delete context.label;
      delete context.referenceType;
    }

    setData('referenceType');
  }

  function onexitimage() {
    var context = this.stack[this.stack.length - 1];

    // To do: clean.
    if (getData('inReference')) {
      context.type += 'Reference';
      context.referenceType = getData('referenceType') || 'shortcut';
      delete context.url;
      delete context.title;
    } else {
      delete context.identifier;
      delete context.label;
      delete context.referenceType;
    }

    setData('referenceType');
  }

  function onexitlabeltext(token) {
    this.stack[this.stack.length - 2].identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
  }

  function onexitlabel() {
    var fragment = this.stack[this.stack.length - 1];
    var value = this.resume();

    this.stack[this.stack.length - 1].label = value;

    // Assume a reference.
    setData('inReference', true);

    if (this.stack[this.stack.length - 1].type === 'link') {
      this.stack[this.stack.length - 1].children = fragment.children;
    } else {
      this.stack[this.stack.length - 1].alt = value;
    }
  }

  function onexitresourcedestinationstring() {
    var data = this.resume();
    this.stack[this.stack.length - 1].url = data;
  }

  function onexitresourcetitlestring() {
    var data = this.resume();
    this.stack[this.stack.length - 1].title = data;
  }

  function onexitresource() {
    setData('inReference');
  }

  function onenterreference() {
    setData('referenceType', 'collapsed');
  }

  function onexitreferencestring(token) {
    var label = this.resume();
    this.stack[this.stack.length - 1].label = label;
    this.stack[this.stack.length - 1].identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
    setData('referenceType', 'full');
  }

  function onexitcharacterreferencemarker(token) {
    setData('characterReferenceType', token.type);
  }

  function onexitcharacterreferencevalue(token) {
    var data = this.sliceSerialize(token);
    var type = getData('characterReferenceType');
    var value;
    var tail;

    if (type) {
      value = safeFromInt(
        data,
        type === 'characterReferenceMarkerNumeric' ? 10 : 16
      );

      setData('characterReferenceType');
    } else {
      value = decode$1(data);
    }

    tail = this.stack.pop();
    tail.value += value;
    tail.position.end = point(token.end);
  }

  function onexitautolinkprotocol(token) {
    onexitdata.call(this, token);
    this.stack[this.stack.length - 1].url = this.sliceSerialize(token);
  }

  function onexitautolinkemail(token) {
    onexitdata.call(this, token);
    this.stack[this.stack.length - 1].url =
      'mailto:' + this.sliceSerialize(token);
  }

  //
  // Creaters.
  //

  function blockQuote() {
    return {type: 'blockquote', children: []}
  }

  function codeFlow() {
    return {type: 'code', lang: null, meta: null, value: ''}
  }

  function codeText() {
    return {type: 'inlineCode', value: ''}
  }

  function definition() {
    return {
      type: 'definition',
      identifier: '',
      label: null,
      title: null,
      url: ''
    }
  }

  function emphasis() {
    return {type: 'emphasis', children: []}
  }

  function heading() {
    return {type: 'heading', depth: undefined, children: []}
  }

  function hardBreak() {
    return {type: 'break'}
  }

  function html() {
    return {type: 'html', value: ''}
  }

  function image() {
    return {type: 'image', title: null, url: '', alt: null}
  }

  function link() {
    return {type: 'link', title: null, url: '', children: []}
  }

  function list(token) {
    return {
      type: 'list',
      ordered: token.type === 'listOrdered',
      start: null,
      spread: token._spread,
      children: []
    }
  }

  function listItem(token) {
    return {
      type: 'listItem',
      spread: token._spread,
      checked: null,
      children: []
    }
  }

  function paragraph() {
    return {type: 'paragraph', children: []}
  }

  function strong() {
    return {type: 'strong', children: []}
  }

  function text() {
    return {type: 'text', value: ''}
  }

  function thematicBreak() {
    return {type: 'thematicBreak'}
  }
}

function configure$2(config, extensions) {
  var index = -1;

  while (++index < extensions.length) {
    extension(config, extensions[index]);
  }

  return config
}

function extension(config, extension) {
  var key;
  var left;

  for (key in extension) {
    left = own$2.call(config, key) ? config[key] : (config[key] = {});

    if (key === 'canContainEols' || key === 'transforms') {
      config[key] = [].concat(left, extension[key]);
    } else {
      Object.assign(left, extension[key]);
    }
  }
}

var mdastUtilFromMarkdown = dist;

var remarkParse = parse$2;

var fromMarkdown = mdastUtilFromMarkdown;

function parse$2(options) {
  var self = this;

  this.Parser = parse;

  function parse(doc) {
    return fromMarkdown(
      doc,
      Object.assign({}, self.data('settings'), options, {
        // Note: these options are not in the readme.
        // The goal is for them to be set by plugins on `data` instead of being
        // passed by users.
        extensions: self.data('micromarkExtensions') || [],
        mdastExtensions: self.data('fromMarkdownExtensions') || []
      })
    )
  }
}

var zwitch$1 = factory;

var noop = Function.prototype;
var own$1 = {}.hasOwnProperty;

// Handle values based on a property.
function factory(key, options) {
  var settings = options || {};

  function one(value) {
    var fn = one.invalid;
    var handlers = one.handlers;

    if (value && own$1.call(value, key)) {
      fn = own$1.call(handlers, value[key]) ? handlers[value[key]] : one.unknown;
    }

    return (fn || noop).apply(this, arguments)
  }

  one.handlers = settings.handlers || {};
  one.invalid = settings.invalid;
  one.unknown = settings.unknown;

  return one
}

var configure_1 = configure$1;

function configure$1(base, extension) {
  var index = -1;
  var key;

  // First do subextensions.
  if (extension.extensions) {
    while (++index < extension.extensions.length) {
      configure$1(base, extension.extensions[index]);
    }
  }

  for (key in extension) {
    if (key === 'extensions') ; else if (key === 'unsafe' || key === 'join') {
      base[key] = base[key].concat(extension[key] || []);
    } else if (key === 'handlers') {
      base[key] = Object.assign(base[key], extension[key] || {});
    } else {
      base.options[key] = extension[key];
    }
  }

  return base
}

var handle = {};

/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

/**
 * Results cache
 */

var res = '';
var cache;

/**
 * Expose `repeat`
 */

var repeatString = repeat$5;

/**
 * Repeat the given `string` the specified `number`
 * of times.
 *
 * **Example:**
 *
 * ```js
 * var repeat = require('repeat-string');
 * repeat('A', 5);
 * //=> AAAAA
 * ```
 *
 * @param {String} `string` The string to repeat
 * @param {Number} `number` The number of times to repeat the string
 * @return {String} Repeated string
 * @api public
 */

function repeat$5(str, num) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  // cover common, quick use cases
  if (num === 1) return str;
  if (num === 2) return str + str;

  var max = str.length * num;
  if (cache !== str || typeof cache === 'undefined') {
    cache = str;
    res = '';
  } else if (res.length >= max) {
    return res.substr(0, max);
  }

  while (max > res.length && num > 1) {
    if (num & 1) {
      res += str;
    }

    num >>= 1;
    str += str;
  }

  res += str;
  res = res.substr(0, max);
  return res;
}

var containerFlow = flow$4;

var repeat$4 = repeatString;

function flow$4(parent, context) {
  var children = parent.children || [];
  var results = [];
  var index = -1;
  var child;

  while (++index < children.length) {
    child = children[index];

    results.push(
      context.handle(child, parent, context, {before: '\n', after: '\n'})
    );

    if (index + 1 < children.length) {
      results.push(between(child, children[index + 1]));
    }
  }

  return results.join('')

  function between(left, right) {
    var index = -1;
    var result;

    while (++index < context.join.length) {
      result = context.join[index](left, right, parent, context);

      if (result === true || result === 1) {
        break
      }

      if (typeof result === 'number') {
        return repeat$4('\n', 1 + Number(result))
      }

      if (result === false) {
        return '\n\n<!---->\n\n'
      }
    }

    return '\n\n'
  }
}

var indentLines_1 = indentLines$3;

var eol = /\r?\n|\r/g;

function indentLines$3(value, map) {
  var result = [];
  var start = 0;
  var line = 0;
  var match;

  while ((match = eol.exec(value))) {
    one(value.slice(start, match.index));
    result.push(match[0]);
    start = match.index + match[0].length;
    line++;
  }

  one(value.slice(start));

  return result.join('')

  function one(value) {
    result.push(map(value, line, !value));
  }
}

var blockquote_1 = blockquote;

var flow$3 = containerFlow;
var indentLines$2 = indentLines_1;

function blockquote(node, _, context) {
  var exit = context.enter('blockquote');
  var value = indentLines$2(flow$3(node, context), map$1);
  exit();
  return value
}

function map$1(line, index, blank) {
  return '>' + (blank ? '' : ' ') + line
}

var patternInScope_1 = patternInScope$2;

function patternInScope$2(stack, pattern) {
  return (
    listInScope(stack, pattern.inConstruct, true) &&
    !listInScope(stack, pattern.notInConstruct)
  )
}

function listInScope(stack, list, none) {
  var index;

  if (!list) {
    return none
  }

  if (typeof list === 'string') {
    list = [list];
  }

  index = -1;

  while (++index < list.length) {
    if (stack.indexOf(list[index]) !== -1) {
      return true
    }
  }

  return false
}

var _break = hardBreak;

var patternInScope$1 = patternInScope_1;

function hardBreak(node, _, context, safe) {
  var index = -1;

  while (++index < context.unsafe.length) {
    // If we can’t put eols in this construct (setext headings, tables), use a
    // space instead.
    if (
      context.unsafe[index].character === '\n' &&
      patternInScope$1(context.stack, context.unsafe[index])
    ) {
      return /[ \t]/.test(safe.before) ? '' : ' '
    }
  }

  return '\\\n'
}

var longestStreak_1 = longestStreak;

// Get the count of the longest repeating streak of `character` in `value`.
function longestStreak(value, character) {
  var count = 0;
  var maximum = 0;
  var expected;
  var index;

  if (typeof character !== 'string' || character.length !== 1) {
    throw new Error('Expected character')
  }

  value = String(value);
  index = value.indexOf(character);
  expected = index;

  while (index !== -1) {
    count++;

    if (index === expected) {
      if (count > maximum) {
        maximum = count;
      }
    } else {
      count = 1;
    }

    expected = index + 1;
    index = value.indexOf(character, expected);
  }

  return maximum
}

var formatCodeAsIndented_1 = formatCodeAsIndented$2;

function formatCodeAsIndented$2(node, context) {
  return (
    !context.options.fences &&
    node.value &&
    // If there’s no info…
    !node.lang &&
    // And there’s a non-whitespace character…
    /[^ \r\n]/.test(node.value) &&
    // And the value doesn’t start or end in a blank…
    !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node.value)
  )
}

var checkFence_1 = checkFence$1;

function checkFence$1(context) {
  var marker = context.options.fence || '`';

  if (marker !== '`' && marker !== '~') {
    throw new Error(
      'Cannot serialize code with `' +
        marker +
        '` for `options.fence`, expected `` ` `` or `~`'
    )
  }

  return marker
}

var patternCompile_1 = patternCompile$2;

function patternCompile$2(pattern) {
  var before;
  var after;

  if (!pattern._compiled) {
    before = pattern.before ? '(?:' + pattern.before + ')' : '';
    after = pattern.after ? '(?:' + pattern.after + ')' : '';

    if (pattern.atBreak) {
      before = '[\\r\\n][\\t ]*' + before;
    }

    pattern._compiled = new RegExp(
      (before ? '(' + before + ')' : '') +
        (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? '\\' : '') +
        pattern.character +
        (after || ''),
      'g'
    );
  }

  return pattern._compiled
}

var safe_1 = safe$7;

var patternCompile$1 = patternCompile_1;
var patternInScope = patternInScope_1;

function safe$7(context, input, config) {
  var value = (config.before || '') + (input || '') + (config.after || '');
  var positions = [];
  var result = [];
  var infos = {};
  var index = -1;
  var before;
  var after;
  var position;
  var pattern;
  var expression;
  var match;
  var start;
  var end;

  while (++index < context.unsafe.length) {
    pattern = context.unsafe[index];

    if (!patternInScope(context.stack, pattern)) {
      continue
    }

    expression = patternCompile$1(pattern);

    while ((match = expression.exec(value))) {
      before = 'before' in pattern || pattern.atBreak;
      after = 'after' in pattern;

      position = match.index + (before ? match[1].length : 0);

      if (positions.indexOf(position) === -1) {
        positions.push(position);
        infos[position] = {before: before, after: after};
      } else {
        if (infos[position].before && !before) {
          infos[position].before = false;
        }

        if (infos[position].after && !after) {
          infos[position].after = false;
        }
      }
    }
  }

  positions.sort(numerical);

  start = config.before ? config.before.length : 0;
  end = value.length - (config.after ? config.after.length : 0);
  index = -1;

  while (++index < positions.length) {
    position = positions[index];

    if (
      // Character before or after matched:
      position < start ||
      position >= end
    ) {
      continue
    }

    // If this character is supposed to be escaped because it has a condition on
    // the next character, and the next character is definitly being escaped,
    // then skip this escape.
    if (
      position + 1 < end &&
      positions[index + 1] === position + 1 &&
      infos[position].after &&
      !infos[position + 1].before &&
      !infos[position + 1].after
    ) {
      continue
    }

    if (start !== position) {
      // If we have to use a character reference, an ampersand would be more
      // correct, but as backslashes only care about punctuation, either will
      // do the trick
      result.push(escapeBackslashes(value.slice(start, position), '\\'));
    }

    start = position;

    if (
      /[!-/:-@[-`{-~]/.test(value.charAt(position)) &&
      (!config.encode || config.encode.indexOf(value.charAt(position)) === -1)
    ) {
      // Character escape.
      result.push('\\');
    } else {
      // Character reference.
      result.push(
        '&#x' + value.charCodeAt(position).toString(16).toUpperCase() + ';'
      );
      start++;
    }
  }

  result.push(escapeBackslashes(value.slice(start, end), config.after));

  return result.join('')
}

function numerical(a, b) {
  return a - b
}

function escapeBackslashes(value, after) {
  var expression = /\\(?=[!-/:-@[-`{-~])/g;
  var positions = [];
  var results = [];
  var index = -1;
  var start = 0;
  var whole = value + after;
  var match;

  while ((match = expression.exec(whole))) {
    positions.push(match.index);
  }

  while (++index < positions.length) {
    if (start !== positions[index]) {
      results.push(value.slice(start, positions[index]));
    }

    results.push('\\');
    start = positions[index];
  }

  results.push(value.slice(start));

  return results.join('')
}

var code_1 = code;

var repeat$3 = repeatString;
var streak = longestStreak_1;
var formatCodeAsIndented$1 = formatCodeAsIndented_1;
var checkFence = checkFence_1;
var indentLines$1 = indentLines_1;
var safe$6 = safe_1;

function code(node, _, context) {
  var marker = checkFence(context);
  var raw = node.value || '';
  var suffix = marker === '`' ? 'GraveAccent' : 'Tilde';
  var value;
  var sequence;
  var exit;
  var subexit;

  if (formatCodeAsIndented$1(node, context)) {
    exit = context.enter('codeIndented');
    value = indentLines$1(raw, map);
  } else {
    sequence = repeat$3(marker, Math.max(streak(raw, marker) + 1, 3));
    exit = context.enter('codeFenced');
    value = sequence;

    if (node.lang) {
      subexit = context.enter('codeFencedLang' + suffix);
      value += safe$6(context, node.lang, {
        before: '`',
        after: ' ',
        encode: ['`']
      });
      subexit();
    }

    if (node.lang && node.meta) {
      subexit = context.enter('codeFencedMeta' + suffix);
      value +=
        ' ' +
        safe$6(context, node.meta, {
          before: ' ',
          after: '\n',
          encode: ['`']
        });
      subexit();
    }

    value += '\n';

    if (raw) {
      value += raw + '\n';
    }

    value += sequence;
  }

  exit();
  return value
}

function map(line, _, blank) {
  return (blank ? '' : '    ') + line
}

var association_1 = association$3;

var decode = decodeEntity_1;

var characterEscape = /\\([!-/:-@[-`{-~])/g;
var characterReference = /&(#(\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;

// The `label` of an association is the string value: character escapes and
// references work, and casing is intact.
// The `identifier` is used to match one association to another: controversially,
// character escapes and references don’t work in this matching: `&copy;` does
// not match `©`, and `\+` does not match `+`.
// But casing is ignored (and whitespace) is trimmed and collapsed: ` A\nb`
// matches `a b`.
// So, we do prefer the label when figuring out how we’re going to serialize:
// it has whitespace, casing, and we can ignore most useless character escapes
// and all character references.
function association$3(node) {
  if (node.label || !node.identifier) {
    return node.label || ''
  }

  return node.identifier
    .replace(characterEscape, '$1')
    .replace(characterReference, decodeIfPossible)
}

function decodeIfPossible($0, $1) {
  return decode($1) || $0
}

var checkQuote_1 = checkQuote$3;

function checkQuote$3(context) {
  var marker = context.options.quote || '"';

  if (marker !== '"' && marker !== "'") {
    throw new Error(
      'Cannot serialize title with `' +
        marker +
        '` for `options.quote`, expected `"`, or `\'`'
    )
  }

  return marker
}

var definition_1 = definition;

var association$2 = association_1;
var checkQuote$2 = checkQuote_1;
var safe$5 = safe_1;

function definition(node, _, context) {
  var marker = checkQuote$2(context);
  var suffix = marker === '"' ? 'Quote' : 'Apostrophe';
  var exit = context.enter('definition');
  var subexit = context.enter('label');
  var value =
    '[' + safe$5(context, association$2(node), {before: '[', after: ']'}) + ']: ';

  subexit();

  if (
    // If there’s no url, or…
    !node.url ||
    // If there’s whitespace, enclosed is prettier.
    /[ \t\r\n]/.test(node.url)
  ) {
    subexit = context.enter('destinationLiteral');
    value += '<' + safe$5(context, node.url, {before: '<', after: '>'}) + '>';
  } else {
    // No whitespace, raw is prettier.
    subexit = context.enter('destinationRaw');
    value += safe$5(context, node.url, {before: ' ', after: ' '});
  }

  subexit();

  if (node.title) {
    subexit = context.enter('title' + suffix);
    value +=
      ' ' +
      marker +
      safe$5(context, node.title, {before: marker, after: marker}) +
      marker;
    subexit();
  }

  exit();

  return value
}

var checkEmphasis_1 = checkEmphasis$1;

function checkEmphasis$1(context) {
  var marker = context.options.emphasis || '*';

  if (marker !== '*' && marker !== '_') {
    throw new Error(
      'Cannot serialize emphasis with `' +
        marker +
        '` for `options.emphasis`, expected `*`, or `_`'
    )
  }

  return marker
}

var containerPhrasing = phrasing$6;

function phrasing$6(parent, context, safeOptions) {
  var children = parent.children || [];
  var results = [];
  var index = -1;
  var before = safeOptions.before;
  var after;
  var handle;
  var child;

  while (++index < children.length) {
    child = children[index];

    if (index + 1 < children.length) {
      handle = context.handle.handlers[children[index + 1].type];
      if (handle && handle.peek) handle = handle.peek;
      after = handle
        ? handle(children[index + 1], parent, context, {
            before: '',
            after: ''
          }).charAt(0)
        : '';
    } else {
      after = safeOptions.after;
    }

    // In some cases, html (text) can be found in phrasing right after an eol.
    // When we’d serialize that, in most cases that would be seen as html
    // (flow).
    // As we can’t escape or so to prevent it from happening, we take a somewhat
    // reasonable approach: replace that eol with a space.
    // See: <https://github.com/syntax-tree/mdast-util-to-markdown/issues/15>
    if (
      results.length > 0 &&
      (before === '\r' || before === '\n') &&
      child.type === 'html'
    ) {
      results[results.length - 1] = results[results.length - 1].replace(
        /(\r?\n|\r)$/,
        ' '
      );
      before = ' ';
    }

    results.push(
      context.handle(child, parent, context, {
        before: before,
        after: after
      })
    );

    before = results[results.length - 1].slice(-1);
  }

  return results.join('')
}

var emphasis_1 = emphasis;
emphasis.peek = emphasisPeek;

var checkEmphasis = checkEmphasis_1;
var phrasing$5 = containerPhrasing;

// To do: there are cases where emphasis cannot “form” depending on the
// previous or next character of sequences.
// There’s no way around that though, except for injecting zero-width stuff.
// Do we need to safeguard against that?
function emphasis(node, _, context) {
  var marker = checkEmphasis(context);
  var exit = context.enter('emphasis');
  var value = phrasing$5(node, context, {before: marker, after: marker});
  exit();
  return marker + value + marker
}

function emphasisPeek(node, _, context) {
  return context.options.emphasis || '*'
}

var formatHeadingAsSetext_1 = formatHeadingAsSetext$2;

var toString$1 = mdastUtilToString;

function formatHeadingAsSetext$2(node, context) {
  return (
    context.options.setext && (!node.depth || node.depth < 3) && toString$1(node)
  )
}

var heading_1 = heading;

var repeat$2 = repeatString;
var formatHeadingAsSetext$1 = formatHeadingAsSetext_1;
var phrasing$4 = containerPhrasing;

function heading(node, _, context) {
  var rank = Math.max(Math.min(6, node.depth || 1), 1);
  var exit;
  var subexit;
  var value;
  var sequence;

  if (formatHeadingAsSetext$1(node, context)) {
    exit = context.enter('headingSetext');
    subexit = context.enter('phrasing');
    value = phrasing$4(node, context, {before: '\n', after: '\n'});
    subexit();
    exit();

    return (
      value +
      '\n' +
      repeat$2(
        rank === 1 ? '=' : '-',
        // The whole size…
        value.length -
          // Minus the position of the character after the last EOL (or
          // 0 if there is none)…
          (Math.max(value.lastIndexOf('\r'), value.lastIndexOf('\n')) + 1)
      )
    )
  }

  sequence = repeat$2('#', rank);
  exit = context.enter('headingAtx');
  subexit = context.enter('phrasing');
  value = phrasing$4(node, context, {before: '# ', after: '\n'});
  value = value ? sequence + ' ' + value : sequence;
  if (context.options.closeAtx) {
    value += ' ' + sequence;
  }

  subexit();
  exit();

  return value
}

var html_1 = html;
html.peek = htmlPeek;

function html(node) {
  return node.value || ''
}

function htmlPeek() {
  return '<'
}

var image_1 = image;
image.peek = imagePeek;

var checkQuote$1 = checkQuote_1;
var safe$4 = safe_1;

function image(node, _, context) {
  var quote = checkQuote$1(context);
  var suffix = quote === '"' ? 'Quote' : 'Apostrophe';
  var exit = context.enter('image');
  var subexit = context.enter('label');
  var value = '![' + safe$4(context, node.alt, {before: '[', after: ']'}) + '](';

  subexit();

  if (
    // If there’s no url but there is a title…
    (!node.url && node.title) ||
    // Or if there’s markdown whitespace or an eol, enclose.
    /[ \t\r\n]/.test(node.url)
  ) {
    subexit = context.enter('destinationLiteral');
    value += '<' + safe$4(context, node.url, {before: '<', after: '>'}) + '>';
  } else {
    // No whitespace, raw is prettier.
    subexit = context.enter('destinationRaw');
    value += safe$4(context, node.url, {
      before: '(',
      after: node.title ? ' ' : ')'
    });
  }

  subexit();

  if (node.title) {
    subexit = context.enter('title' + suffix);
    value +=
      ' ' +
      quote +
      safe$4(context, node.title, {before: quote, after: quote}) +
      quote;
    subexit();
  }

  value += ')';
  exit();

  return value
}

function imagePeek() {
  return '!'
}

var imageReference_1 = imageReference;
imageReference.peek = imageReferencePeek;

var association$1 = association_1;
var safe$3 = safe_1;

function imageReference(node, _, context) {
  var type = node.referenceType;
  var exit = context.enter('imageReference');
  var subexit = context.enter('label');
  var alt = safe$3(context, node.alt, {before: '[', after: ']'});
  var value = '![' + alt + ']';
  var reference;
  var stack;

  subexit();
  // Hide the fact that we’re in phrasing, because escapes don’t work.
  stack = context.stack;
  context.stack = [];
  subexit = context.enter('reference');
  reference = safe$3(context, association$1(node), {before: '[', after: ']'});
  subexit();
  context.stack = stack;
  exit();

  if (type === 'full' || !alt || alt !== reference) {
    value += '[' + reference + ']';
  } else if (type !== 'shortcut') {
    value += '[]';
  }

  return value
}

function imageReferencePeek() {
  return '!'
}

var inlineCode_1 = inlineCode;
inlineCode.peek = inlineCodePeek;

var patternCompile = patternCompile_1;

function inlineCode(node, parent, context) {
  var value = node.value || '';
  var sequence = '`';
  var index = -1;
  var pattern;
  var expression;
  var match;
  var position;

  // If there is a single grave accent on its own in the code, use a fence of
  // two.
  // If there are two in a row, use one.
  while (new RegExp('(^|[^`])' + sequence + '([^`]|$)').test(value)) {
    sequence += '`';
  }

  // If this is not just spaces or eols (tabs don’t count), and either the
  // first or last character are a space, eol, or tick, then pad with spaces.
  if (
    /[^ \r\n]/.test(value) &&
    (/[ \r\n`]/.test(value.charAt(0)) ||
      /[ \r\n`]/.test(value.charAt(value.length - 1)))
  ) {
    value = ' ' + value + ' ';
  }

  // We have a potential problem: certain characters after eols could result in
  // blocks being seen.
  // For example, if someone injected the string `'\n# b'`, then that would
  // result in an ATX heading.
  // We can’t escape characters in `inlineCode`, but because eols are
  // transformed to spaces when going from markdown to HTML anyway, we can swap
  // them out.
  while (++index < context.unsafe.length) {
    pattern = context.unsafe[index];

    // Only look for `atBreak`s.
    // Btw: note that `atBreak` patterns will always start the regex at LF or
    // CR.
    if (!pattern.atBreak) continue

    expression = patternCompile(pattern);

    while ((match = expression.exec(value))) {
      position = match.index;

      // Support CRLF (patterns only look for one of the characters).
      if (
        value.charCodeAt(position) === 10 /* `\n` */ &&
        value.charCodeAt(position - 1) === 13 /* `\r` */
      ) {
        position--;
      }

      value = value.slice(0, position) + ' ' + value.slice(match.index + 1);
    }
  }

  return sequence + value + sequence
}

function inlineCodePeek() {
  return '`'
}

var formatLinkAsAutolink_1 = formatLinkAsAutolink$1;

var toString = mdastUtilToString;

function formatLinkAsAutolink$1(node, context) {
  var raw = toString(node);

  return (
    !context.options.resourceLink &&
    // If there’s a url…
    node.url &&
    // And there’s a no title…
    !node.title &&
    // And the content of `node` is a single text node…
    node.children &&
    node.children.length === 1 &&
    node.children[0].type === 'text' &&
    // And if the url is the same as the content…
    (raw === node.url || 'mailto:' + raw === node.url) &&
    // And that starts w/ a protocol…
    /^[a-z][a-z+.-]+:/i.test(node.url) &&
    // And that doesn’t contain ASCII control codes (character escapes and
    // references don’t work) or angle brackets…
    !/[\0- <>\u007F]/.test(node.url)
  )
}

var link_1 = link;
link.peek = linkPeek;

var checkQuote = checkQuote_1;
var formatLinkAsAutolink = formatLinkAsAutolink_1;
var phrasing$3 = containerPhrasing;
var safe$2 = safe_1;

function link(node, _, context) {
  var quote = checkQuote(context);
  var suffix = quote === '"' ? 'Quote' : 'Apostrophe';
  var exit;
  var subexit;
  var value;
  var stack;

  if (formatLinkAsAutolink(node, context)) {
    // Hide the fact that we’re in phrasing, because escapes don’t work.
    stack = context.stack;
    context.stack = [];
    exit = context.enter('autolink');
    value = '<' + phrasing$3(node, context, {before: '<', after: '>'}) + '>';
    exit();
    context.stack = stack;
    return value
  }

  exit = context.enter('link');
  subexit = context.enter('label');
  value = '[' + phrasing$3(node, context, {before: '[', after: ']'}) + '](';
  subexit();

  if (
    // If there’s no url but there is a title…
    (!node.url && node.title) ||
    // Or if there’s markdown whitespace or an eol, enclose.
    /[ \t\r\n]/.test(node.url)
  ) {
    subexit = context.enter('destinationLiteral');
    value += '<' + safe$2(context, node.url, {before: '<', after: '>'}) + '>';
  } else {
    // No whitespace, raw is prettier.
    subexit = context.enter('destinationRaw');
    value += safe$2(context, node.url, {
      before: '(',
      after: node.title ? ' ' : ')'
    });
  }

  subexit();

  if (node.title) {
    subexit = context.enter('title' + suffix);
    value +=
      ' ' +
      quote +
      safe$2(context, node.title, {before: quote, after: quote}) +
      quote;
    subexit();
  }

  value += ')';

  exit();
  return value
}

function linkPeek(node, _, context) {
  return formatLinkAsAutolink(node, context) ? '<' : '['
}

var linkReference_1 = linkReference;
linkReference.peek = linkReferencePeek;

var association = association_1;
var phrasing$2 = containerPhrasing;
var safe$1 = safe_1;

function linkReference(node, _, context) {
  var type = node.referenceType;
  var exit = context.enter('linkReference');
  var subexit = context.enter('label');
  var text = phrasing$2(node, context, {before: '[', after: ']'});
  var value = '[' + text + ']';
  var reference;
  var stack;

  subexit();
  // Hide the fact that we’re in phrasing, because escapes don’t work.
  stack = context.stack;
  context.stack = [];
  subexit = context.enter('reference');
  reference = safe$1(context, association(node), {before: '[', after: ']'});
  subexit();
  context.stack = stack;
  exit();

  if (type === 'full' || !text || text !== reference) {
    value += '[' + reference + ']';
  } else if (type !== 'shortcut') {
    value += '[]';
  }

  return value
}

function linkReferencePeek() {
  return '['
}

var list_1 = list;

var flow$2 = containerFlow;

function list(node, _, context) {
  var exit = context.enter('list');
  var value = flow$2(node, context);
  exit();
  return value
}

var checkBullet_1 = checkBullet$1;

function checkBullet$1(context) {
  var marker = context.options.bullet || '*';

  if (marker !== '*' && marker !== '+' && marker !== '-') {
    throw new Error(
      'Cannot serialize items with `' +
        marker +
        '` for `options.bullet`, expected `*`, `+`, or `-`'
    )
  }

  return marker
}

var checkListItemIndent_1 = checkListItemIndent$1;

function checkListItemIndent$1(context) {
  var style = context.options.listItemIndent || 'tab';

  if (style === 1 || style === '1') {
    return 'one'
  }

  if (style !== 'tab' && style !== 'one' && style !== 'mixed') {
    throw new Error(
      'Cannot serialize items with `' +
        style +
        '` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`'
    )
  }

  return style
}

var listItem_1 = listItem;

var repeat$1 = repeatString;
var checkBullet = checkBullet_1;
var checkListItemIndent = checkListItemIndent_1;
var flow$1 = containerFlow;
var indentLines = indentLines_1;

function listItem(node, parent, context) {
  var bullet = checkBullet(context);
  var listItemIndent = checkListItemIndent(context);
  var size;
  var value;
  var exit;

  if (parent && parent.ordered) {
    bullet =
      (parent.start > -1 ? parent.start : 1) +
      (context.options.incrementListMarker === false
        ? 0
        : parent.children.indexOf(node)) +
      '.';
  }

  size = bullet.length + 1;

  if (
    listItemIndent === 'tab' ||
    (listItemIndent === 'mixed' && ((parent && parent.spread) || node.spread))
  ) {
    size = Math.ceil(size / 4) * 4;
  }

  exit = context.enter('listItem');
  value = indentLines(flow$1(node, context), map);
  exit();

  return value

  function map(line, index, blank) {
    if (index) {
      return (blank ? '' : repeat$1(' ', size)) + line
    }

    return (blank ? bullet : bullet + repeat$1(' ', size - bullet.length)) + line
  }
}

var paragraph_1 = paragraph;

var phrasing$1 = containerPhrasing;

function paragraph(node, _, context) {
  var exit = context.enter('paragraph');
  var subexit = context.enter('phrasing');
  var value = phrasing$1(node, context, {before: '\n', after: '\n'});
  subexit();
  exit();
  return value
}

var root_1 = root;

var flow = containerFlow;

function root(node, _, context) {
  return flow(node, context)
}

var checkStrong_1 = checkStrong$1;

function checkStrong$1(context) {
  var marker = context.options.strong || '*';

  if (marker !== '*' && marker !== '_') {
    throw new Error(
      'Cannot serialize strong with `' +
        marker +
        '` for `options.strong`, expected `*`, or `_`'
    )
  }

  return marker
}

var strong_1 = strong;
strong.peek = strongPeek;

var checkStrong = checkStrong_1;
var phrasing = containerPhrasing;

// To do: there are cases where emphasis cannot “form” depending on the
// previous or next character of sequences.
// There’s no way around that though, except for injecting zero-width stuff.
// Do we need to safeguard against that?
function strong(node, _, context) {
  var marker = checkStrong(context);
  var exit = context.enter('strong');
  var value = phrasing(node, context, {before: marker, after: marker});
  exit();
  return marker + marker + value + marker + marker
}

function strongPeek(node, _, context) {
  return context.options.strong || '*'
}

var text_1 = text;

var safe = safe_1;

function text(node, parent, context, safeOptions) {
  return safe(context, node.value, safeOptions)
}

var checkRuleRepeat = checkRule$2;

function checkRule$2(context) {
  var repetition = context.options.ruleRepetition || 3;

  if (repetition < 3) {
    throw new Error(
      'Cannot serialize rules with repetition `' +
        repetition +
        '` for `options.ruleRepetition`, expected `3` or more'
    )
  }

  return repetition
}

var checkRule_1 = checkRule$1;

function checkRule$1(context) {
  var marker = context.options.rule || '*';

  if (marker !== '*' && marker !== '-' && marker !== '_') {
    throw new Error(
      'Cannot serialize rules with `' +
        marker +
        '` for `options.rule`, expected `*`, `-`, or `_`'
    )
  }

  return marker
}

var thematicBreak_1 = thematicBreak;

var repeat = repeatString;
var checkRepeat = checkRuleRepeat;
var checkRule = checkRule_1;

function thematicBreak(node, parent, context) {
  var value = repeat(
    checkRule(context) + (context.options.ruleSpaces ? ' ' : ''),
    checkRepeat(context)
  );

  return context.options.ruleSpaces ? value.slice(0, -1) : value
}

handle.blockquote = blockquote_1;
handle.break = _break;
handle.code = code_1;
handle.definition = definition_1;
handle.emphasis = emphasis_1;
handle.hardBreak = _break;
handle.heading = heading_1;
handle.html = html_1;
handle.image = image_1;
handle.imageReference = imageReference_1;
handle.inlineCode = inlineCode_1;
handle.link = link_1;
handle.linkReference = linkReference_1;
handle.list = list_1;
handle.listItem = listItem_1;
handle.paragraph = paragraph_1;
handle.root = root_1;
handle.strong = strong_1;
handle.text = text_1;
handle.thematicBreak = thematicBreak_1;

var join = [joinDefaults];

var formatCodeAsIndented = formatCodeAsIndented_1;
var formatHeadingAsSetext = formatHeadingAsSetext_1;

function joinDefaults(left, right, parent, context) {
  if (
    // Two lists with the same marker.
    (right.type === 'list' &&
      right.type === left.type &&
      Boolean(left.ordered) === Boolean(right.ordered)) ||
    // Indented code after list or another indented code.
    (right.type === 'code' &&
      formatCodeAsIndented(right, context) &&
      (left.type === 'list' ||
        (left.type === right.type && formatCodeAsIndented(left, context))))
  ) {
    return false
  }

  // Join children of a list or an item.
  // In which case, `parent` has a `spread` field.
  if (typeof parent.spread === 'boolean') {
    if (
      left.type === 'paragraph' &&
      // Two paragraphs.
      (left.type === right.type ||
        right.type === 'definition' ||
        // Paragraph followed by a setext heading.
        (right.type === 'heading' && formatHeadingAsSetext(right, context)))
    ) {
      return
    }

    return parent.spread ? 1 : 0
  }
}

var unsafe = [
  {
    character: '\t',
    inConstruct: ['codeFencedLangGraveAccent', 'codeFencedLangTilde']
  },
  {
    character: '\r',
    inConstruct: [
      'codeFencedLangGraveAccent',
      'codeFencedLangTilde',
      'codeFencedMetaGraveAccent',
      'codeFencedMetaTilde',
      'destinationLiteral',
      'headingAtx'
    ]
  },
  {
    character: '\n',
    inConstruct: [
      'codeFencedLangGraveAccent',
      'codeFencedLangTilde',
      'codeFencedMetaGraveAccent',
      'codeFencedMetaTilde',
      'destinationLiteral',
      'headingAtx'
    ]
  },
  {
    character: ' ',
    inConstruct: ['codeFencedLangGraveAccent', 'codeFencedLangTilde']
  },
  // An exclamation mark can start an image, if it is followed by a link or
  // a link reference.
  {character: '!', after: '\\[', inConstruct: 'phrasing'},
  // A quote can break out of a title.
  {character: '"', inConstruct: 'titleQuote'},
  // A number sign could start an ATX heading if it starts a line.
  {atBreak: true, character: '#'},
  {character: '#', inConstruct: 'headingAtx', after: '(?:[\r\n]|$)'},
  // Dollar sign and percentage are not used in markdown.
  // An ampersand could start a character reference.
  {character: '&', after: '[#A-Za-z]', inConstruct: 'phrasing'},
  // An apostrophe can break out of a title.
  {character: "'", inConstruct: 'titleApostrophe'},
  // A left paren could break out of a destination raw.
  {character: '(', inConstruct: 'destinationRaw'},
  {before: '\\]', character: '(', inConstruct: 'phrasing'},
  // A right paren could start a list item or break out of a destination
  // raw.
  {atBreak: true, before: '\\d+', character: ')'},
  {character: ')', inConstruct: 'destinationRaw'},
  // An asterisk can start thematic breaks, list items, emphasis, strong.
  {atBreak: true, character: '*'},
  {character: '*', inConstruct: 'phrasing'},
  // A plus sign could start a list item.
  {atBreak: true, character: '+'},
  // A dash can start thematic breaks, list items, and setext heading
  // underlines.
  {atBreak: true, character: '-'},
  // A dot could start a list item.
  {atBreak: true, before: '\\d+', character: '.', after: '(?:[ \t\r\n]|$)'},
  // Slash, colon, and semicolon are not used in markdown for constructs.
  // A less than can start html (flow or text) or an autolink.
  // HTML could start with an exclamation mark (declaration, cdata, comment),
  // slash (closing tag), question mark (instruction), or a letter (tag).
  // An autolink also starts with a letter.
  // Finally, it could break out of a destination literal.
  {atBreak: true, character: '<', after: '[!/?A-Za-z]'},
  {character: '<', after: '[!/?A-Za-z]', inConstruct: 'phrasing'},
  {character: '<', inConstruct: 'destinationLiteral'},
  // An equals to can start setext heading underlines.
  {atBreak: true, character: '='},
  // A greater than can start block quotes and it can break out of a
  // destination literal.
  {atBreak: true, character: '>'},
  {character: '>', inConstruct: 'destinationLiteral'},
  // Question mark and at sign are not used in markdown for constructs.
  // A left bracket can start definitions, references, labels,
  {atBreak: true, character: '['},
  {character: '[', inConstruct: ['phrasing', 'label', 'reference']},
  // A backslash can start an escape (when followed by punctuation) or a
  // hard break (when followed by an eol).
  // Note: typical escapes are handled in `safe`!
  {character: '\\', after: '[\\r\\n]', inConstruct: 'phrasing'},
  // A right bracket can exit labels.
  {
    character: ']',
    inConstruct: ['label', 'reference']
  },
  // Caret is not used in markdown for constructs.
  // An underscore can start emphasis, strong, or a thematic break.
  {atBreak: true, character: '_'},
  {before: '[^A-Za-z]', character: '_', inConstruct: 'phrasing'},
  {character: '_', after: '[^A-Za-z]', inConstruct: 'phrasing'},
  // A grave accent can start code (fenced or text), or it can break out of
  // a grave accent code fence.
  {atBreak: true, character: '`'},
  {
    character: '`',
    inConstruct: [
      'codeFencedLangGraveAccent',
      'codeFencedMetaGraveAccent',
      'phrasing'
    ]
  },
  // Left brace, vertical bar, right brace are not used in markdown for
  // constructs.
  // A tilde can start code (fenced).
  {atBreak: true, character: '~'}
];

var lib = toMarkdown$1;

var zwitch = zwitch$1;
var configure = configure_1;
var defaultHandlers = handle;
var defaultJoin = join;
var defaultUnsafe = unsafe;

function toMarkdown$1(tree, options) {
  var settings = options || {};
  var context = {
    enter: enter,
    stack: [],
    unsafe: [],
    join: [],
    handlers: {},
    options: {}
  };
  var result;

  configure(context, {
    unsafe: defaultUnsafe,
    join: defaultJoin,
    handlers: defaultHandlers
  });
  configure(context, settings);

  if (context.options.tightDefinitions) {
    context.join = [joinDefinition].concat(context.join);
  }

  context.handle = zwitch('type', {
    invalid: invalid,
    unknown: unknown,
    handlers: context.handlers
  });

  result = context.handle(tree, null, context, {before: '\n', after: '\n'});

  if (
    result &&
    result.charCodeAt(result.length - 1) !== 10 &&
    result.charCodeAt(result.length - 1) !== 13
  ) {
    result += '\n';
  }

  return result

  function enter(name) {
    context.stack.push(name);
    return exit

    function exit() {
      context.stack.pop();
    }
  }
}

function invalid(value) {
  throw new Error('Cannot handle value `' + value + '`, expected node')
}

function unknown(node) {
  throw new Error('Cannot handle unknown node `' + node.type + '`')
}

function joinDefinition(left, right) {
  // No blank line between adjacent definitions.
  if (left.type === 'definition' && left.type === right.type) {
    return 0
  }
}

var mdastUtilToMarkdown = lib;

var remarkStringify = stringify$1;

var toMarkdown = mdastUtilToMarkdown;

function stringify$1(options) {
  var self = this;

  this.Compiler = compile;

  function compile(tree) {
    return toMarkdown(
      tree,
      Object.assign({}, self.data('settings'), options, {
        // Note: this option is not in the readme.
        // The goal is for it to be set by plugins on `data` instead of being
        // passed by users.
        extensions: self.data('toMarkdownExtensions') || []
      })
    )
  }
}

var unified = unified_1;
var parse$1 = remarkParse;
var stringify = remarkStringify;

var remark = unified().use(parse$1).use(stringify).freeze();

var old$1 = {};

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var pathModule = require$$0__default$1['default'];
var isWindows = process.platform === 'win32';
var fs$3 = require$$0__default['default'];

// JavaScript implementation of realpath, ported from node pre-v6

var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

function rethrow() {
  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
  // is fairly slow to generate.
  var callback;
  if (DEBUG) {
    var backtrace = new Error;
    callback = debugCallback;
  } else
    callback = missingCallback;

  return callback;

  function debugCallback(err) {
    if (err) {
      backtrace.message = err.message;
      err = backtrace;
      missingCallback(err);
    }
  }

  function missingCallback(err) {
    if (err) {
      if (process.throwDeprecation)
        throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
      else if (!process.noDeprecation) {
        var msg = 'fs: missing callback ' + (err.stack || err.message);
        if (process.traceDeprecation)
          console.trace(msg);
        else
          console.error(msg);
      }
    }
  }
}

function maybeCallback(cb) {
  return typeof cb === 'function' ? cb : rethrow();
}

pathModule.normalize;

// Regexp that finds the next partion of a (partial) path
// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
if (isWindows) {
  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
} else {
  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
}

// Regex to find the device root, including trailing slash. E.g. 'c:\\'.
if (isWindows) {
  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
} else {
  var splitRootRe = /^[\/]*/;
}

old$1.realpathSync = function realpathSync(p, cache) {
  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return cache[p];
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs$3.lstatSync(base);
      knownHard[base] = true;
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  // NB: p.length changes.
  while (pos < p.length) {
    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      continue;
    }

    var resolvedLink;
    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // some known symbolic link.  no need to stat again.
      resolvedLink = cache[base];
    } else {
      var stat = fs$3.lstatSync(base);
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        continue;
      }

      // read the link if it wasn't read before
      // dev/ino always return 0 on windows, so skip the check.
      var linkTarget = null;
      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          linkTarget = seenLinks[id];
        }
      }
      if (linkTarget === null) {
        fs$3.statSync(base);
        linkTarget = fs$3.readlinkSync(base);
      }
      resolvedLink = pathModule.resolve(previous, linkTarget);
      // track this, if given a cache.
      if (cache) cache[base] = resolvedLink;
      if (!isWindows) seenLinks[id] = linkTarget;
    }

    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }

  if (cache) cache[original] = p;

  return p;
};


old$1.realpath = function realpath(p, cache, cb) {
  if (typeof cb !== 'function') {
    cb = maybeCallback(cache);
    cache = null;
  }

  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return process.nextTick(cb.bind(null, null, cache[p]));
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs$3.lstat(base, function(err) {
        if (err) return cb(err);
        knownHard[base] = true;
        LOOP();
      });
    } else {
      process.nextTick(LOOP);
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  function LOOP() {
    // stop if scanned past end of path
    if (pos >= p.length) {
      if (cache) cache[original] = p;
      return cb(null, p);
    }

    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      return process.nextTick(LOOP);
    }

    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // known symbolic link.  no need to stat again.
      return gotResolvedLink(cache[base]);
    }

    return fs$3.lstat(base, gotStat);
  }

  function gotStat(err, stat) {
    if (err) return cb(err);

    // if not a symlink, skip to the next path part
    if (!stat.isSymbolicLink()) {
      knownHard[base] = true;
      if (cache) cache[base] = base;
      return process.nextTick(LOOP);
    }

    // stat & read the link if not read before
    // call gotTarget as soon as the link target is known
    // dev/ino always return 0 on windows, so skip the check.
    if (!isWindows) {
      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
      if (seenLinks.hasOwnProperty(id)) {
        return gotTarget(null, seenLinks[id], base);
      }
    }
    fs$3.stat(base, function(err) {
      if (err) return cb(err);

      fs$3.readlink(base, function(err, target) {
        if (!isWindows) seenLinks[id] = target;
        gotTarget(err, target);
      });
    });
  }

  function gotTarget(err, target, base) {
    if (err) return cb(err);

    var resolvedLink = pathModule.resolve(previous, target);
    if (cache) cache[base] = resolvedLink;
    gotResolvedLink(resolvedLink);
  }

  function gotResolvedLink(resolvedLink) {
    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }
};

var fs_realpath = realpath;
realpath.realpath = realpath;
realpath.sync = realpathSync;
realpath.realpathSync = realpathSync;
realpath.monkeypatch = monkeypatch;
realpath.unmonkeypatch = unmonkeypatch;

var fs$2 = require$$0__default['default'];
var origRealpath = fs$2.realpath;
var origRealpathSync = fs$2.realpathSync;

var version = process.version;
var ok$1 = /^v[0-5]\./.test(version);
var old = old$1;

function newError (er) {
  return er && er.syscall === 'realpath' && (
    er.code === 'ELOOP' ||
    er.code === 'ENOMEM' ||
    er.code === 'ENAMETOOLONG'
  )
}

function realpath (p, cache, cb) {
  if (ok$1) {
    return origRealpath(p, cache, cb)
  }

  if (typeof cache === 'function') {
    cb = cache;
    cache = null;
  }
  origRealpath(p, cache, function (er, result) {
    if (newError(er)) {
      old.realpath(p, cache, cb);
    } else {
      cb(er, result);
    }
  });
}

function realpathSync (p, cache) {
  if (ok$1) {
    return origRealpathSync(p, cache)
  }

  try {
    return origRealpathSync(p, cache)
  } catch (er) {
    if (newError(er)) {
      return old.realpathSync(p, cache)
    } else {
      throw er
    }
  }
}

function monkeypatch () {
  fs$2.realpath = realpath;
  fs$2.realpathSync = realpathSync;
}

function unmonkeypatch () {
  fs$2.realpath = origRealpath;
  fs$2.realpathSync = origRealpathSync;
}

var concatMap$1 = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

var balancedMatch = balanced$1;
function balanced$1(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced$1.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    if(a===b) {
      return [ai, bi];
    }
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}

var concatMap = concatMap$1;
var balanced = balancedMatch;

var braceExpansion = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand$1(escapeBraces(str), true).map(unescapeBraces);
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand$1(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand$1(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand$1(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand$1(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand$1(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length);
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand$1(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}

var minimatch_1 = minimatch$3;
minimatch$3.Minimatch = Minimatch$1;

var path$3 = { sep: '/' };
try {
  path$3 = require$$0__default$1['default'];
} catch (er) {}

var GLOBSTAR = minimatch$3.GLOBSTAR = Minimatch$1.GLOBSTAR = {};
var expand = braceExpansion;

var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
};

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]';

// * => any number of characters
var star = qmark + '*?';

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?';

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?';

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!');

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true;
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/;

minimatch$3.filter = filter;
function filter (pattern, options) {
  options = options || {};
  return function (p, i, list) {
    return minimatch$3(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {};
  b = b || {};
  var t = {};
  Object.keys(b).forEach(function (k) {
    t[k] = b[k];
  });
  Object.keys(a).forEach(function (k) {
    t[k] = a[k];
  });
  return t
}

minimatch$3.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch$3

  var orig = minimatch$3;

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  };

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  };

  return m
};

Minimatch$1.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch$1
  return minimatch$3.defaults(def).Minimatch
};

function minimatch$3 (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {};

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch$1(pattern, options).match(p)
}

function Minimatch$1 (pattern, options) {
  if (!(this instanceof Minimatch$1)) {
    return new Minimatch$1(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {};
  pattern = pattern.trim();

  // windows support: need to use /, not \
  if (path$3.sep !== '/') {
    pattern = pattern.split(path$3.sep).join('/');
  }

  this.options = options;
  this.set = [];
  this.pattern = pattern;
  this.regexp = null;
  this.negate = false;
  this.comment = false;
  this.empty = false;

  // make the set of regexps etc.
  this.make();
}

Minimatch$1.prototype.debug = function () {};

Minimatch$1.prototype.make = make;
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern;
  var options = this.options;

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true;
    return
  }
  if (!pattern) {
    this.empty = true;
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate();

  // step 2: expand braces
  var set = this.globSet = this.braceExpand();

  if (options.debug) this.debug = console.error;

  this.debug(this.pattern, set);

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  });

  this.debug(this.pattern, set);

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this);

  this.debug(this.pattern, set);

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  });

  this.debug(this.pattern, set);

  this.set = set;
}

Minimatch$1.prototype.parseNegate = parseNegate;
function parseNegate () {
  var pattern = this.pattern;
  var negate = false;
  var options = this.options;
  var negateOffset = 0;

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate;
    negateOffset++;
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset);
  this.negate = negate;
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch$3.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
};

Minimatch$1.prototype.braceExpand = braceExpand;

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch$1) {
      options = this.options;
    } else {
      options = {};
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern;

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch$1.prototype.parse = parse;
var SUBPARSE = {};
function parse (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options;

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = '';
  var hasMagic = !!options.nocase;
  var escaping = false;
  // ? => one single character
  var patternListStack = [];
  var negativeLists = [];
  var stateChar;
  var inClass = false;
  var reClassStart = -1;
  var classStart = -1;
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)';
  var self = this;

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star;
          hasMagic = true;
        break
        case '?':
          re += qmark;
          hasMagic = true;
        break
        default:
          re += '\\' + stateChar;
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re);
      stateChar = false;
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c);

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c;
      escaping = false;
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar();
        escaping = true;
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c);

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class');
          if (c === '!' && i === classStart + 1) c = '^';
          re += c;
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar);
        clearStateChar();
        stateChar = c;
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar();
      continue

      case '(':
        if (inClass) {
          re += '(';
          continue
        }

        if (!stateChar) {
          re += '\\(';
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        });
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:';
        this.debug('plType %j %j', stateChar, re);
        stateChar = false;
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)';
          continue
        }

        clearStateChar();
        hasMagic = true;
        var pl = patternListStack.pop();
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close;
        if (pl.type === '!') {
          negativeLists.push(pl);
        }
        pl.reEnd = re.length;
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|';
          escaping = false;
          continue
        }

        clearStateChar();
        re += '|';
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar();

        if (inClass) {
          re += '\\' + c;
          continue
        }

        inClass = true;
        classStart = i;
        reClassStart = re.length;
        re += c;
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c;
          escaping = false;
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i);
          try {
            RegExp('[' + cs + ']');
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE);
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]';
            hasMagic = hasMagic || sp[1];
            inClass = false;
            continue
          }
        }

        // finish up the class.
        hasMagic = true;
        inClass = false;
        re += c;
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar();

        if (escaping) {
          // no need
          escaping = false;
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\';
        }

        re += c;

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1);
    sp = this.parse(cs, SUBPARSE);
    re = re.substr(0, reClassStart) + '\\[' + sp[0];
    hasMagic = hasMagic || sp[1];
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length);
    this.debug('setting tail', re, pl);
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\';
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    });

    this.debug('tail=%j\n   %s', tail, tail, pl, re);
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type;

    hasMagic = true;
    re = re.slice(0, pl.reStart) + t + '\\(' + tail;
  }

  // handle trailing things that only matter at the very end.
  clearStateChar();
  if (escaping) {
    // trailing \\
    re += '\\\\';
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false;
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true;
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n];

    var nlBefore = re.slice(0, nl.reStart);
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
    var nlAfter = re.slice(nl.reEnd);

    nlLast += nlAfter;

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1;
    var cleanAfter = nlAfter;
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '');
    }
    nlAfter = cleanAfter;

    var dollar = '';
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$';
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
    re = newRe;
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re;
  }

  if (addPatternStart) {
    re = patternStart + re;
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : '';
  try {
    var regExp = new RegExp('^' + re + '$', flags);
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern;
  regExp._src = re;

  return regExp
}

minimatch$3.makeRe = function (pattern, options) {
  return new Minimatch$1(pattern, options || {}).makeRe()
};

Minimatch$1.prototype.makeRe = makeRe;
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set;

  if (!set.length) {
    this.regexp = false;
    return this.regexp
  }
  var options = this.options;

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot;
  var flags = options.nocase ? 'i' : '';

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|');

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$';

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$';

  try {
    this.regexp = new RegExp(re, flags);
  } catch (ex) {
    this.regexp = false;
  }
  return this.regexp
}

minimatch$3.match = function (list, pattern, options) {
  options = options || {};
  var mm = new Minimatch$1(pattern, options);
  list = list.filter(function (f) {
    return mm.match(f)
  });
  if (mm.options.nonull && !list.length) {
    list.push(pattern);
  }
  return list
};

Minimatch$1.prototype.match = match;
function match (f, partial) {
  this.debug('match', f, this.pattern);
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options;

  // windows: need to use /, not \
  if (path$3.sep !== '/') {
    f = f.split(path$3.sep).join('/');
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit);
  this.debug(this.pattern, 'split', f);

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set;
  this.debug(this.pattern, 'set', set);

  // Find the basename of the path by looking for the last non-empty segment
  var filename;
  var i;
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i];
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i];
    var file = f;
    if (options.matchBase && pattern.length === 1) {
      file = [filename];
    }
    var hit = this.matchOne(file, pattern, partial);
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch$1.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options;

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern });

  this.debug('matchOne', file.length, pattern.length);

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop');
    var p = pattern[pi];
    var f = file[fi];

    this.debug(pattern, p, f);

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f]);

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi;
      var pr = pi + 1;
      if (pr === pl) {
        this.debug('** at the end');
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr];

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee);
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr);
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue');
          fr++;
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit;
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase();
      } else {
        hit = f === p;
      }
      this.debug('string match', p, f, hit);
    } else {
      hit = f.match(p);
      this.debug('pattern match', p, f, hit);
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '');
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
};

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

var inherits$1 = {exports: {}};

var inherits_browser = {exports: {}};

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  inherits_browser.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  // old school shim for old browsers
  inherits_browser.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}

try {
  var util = require$$6__default['default'];
  /* istanbul ignore next */
  if (typeof util.inherits !== 'function') throw '';
  inherits$1.exports = util.inherits;
} catch (e) {
  /* istanbul ignore next */
  inherits$1.exports = inherits_browser.exports;
}

var pathIsAbsolute = {exports: {}};

function posix(path) {
	return path.charAt(0) === '/';
}

function win32(path) {
	// https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
	var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
	var result = splitDeviceRe.exec(path);
	var device = result[1] || '';
	var isUnc = Boolean(device && device.charAt(1) !== ':');

	// UNC paths are always absolute
	return Boolean(result[2] || isUnc);
}

pathIsAbsolute.exports = process.platform === 'win32' ? win32 : posix;
pathIsAbsolute.exports.posix = posix;
pathIsAbsolute.exports.win32 = win32;

var common$2 = {};

common$2.setopts = setopts$2;
common$2.ownProp = ownProp$2;
common$2.makeAbs = makeAbs;
common$2.finish = finish;
common$2.mark = mark;
common$2.isIgnored = isIgnored$2;
common$2.childrenIgnored = childrenIgnored$2;

function ownProp$2 (obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field)
}

var path$2 = require$$0__default$1['default'];
var minimatch$2 = minimatch_1;
var isAbsolute$2 = pathIsAbsolute.exports;
var Minimatch = minimatch$2.Minimatch;

function alphasort (a, b) {
  return a.localeCompare(b, 'en')
}

function setupIgnores (self, options) {
  self.ignore = options.ignore || [];

  if (!Array.isArray(self.ignore))
    self.ignore = [self.ignore];

  if (self.ignore.length) {
    self.ignore = self.ignore.map(ignoreMap);
  }
}

// ignore patterns are always in dot:true mode.
function ignoreMap (pattern) {
  var gmatcher = null;
  if (pattern.slice(-3) === '/**') {
    var gpattern = pattern.replace(/(\/\*\*)+$/, '');
    gmatcher = new Minimatch(gpattern, { dot: true });
  }

  return {
    matcher: new Minimatch(pattern, { dot: true }),
    gmatcher: gmatcher
  }
}

function setopts$2 (self, pattern, options) {
  if (!options)
    options = {};

  // base-matching: just use globstar for that.
  if (options.matchBase && -1 === pattern.indexOf("/")) {
    if (options.noglobstar) {
      throw new Error("base matching requires globstar")
    }
    pattern = "**/" + pattern;
  }

  self.silent = !!options.silent;
  self.pattern = pattern;
  self.strict = options.strict !== false;
  self.realpath = !!options.realpath;
  self.realpathCache = options.realpathCache || Object.create(null);
  self.follow = !!options.follow;
  self.dot = !!options.dot;
  self.mark = !!options.mark;
  self.nodir = !!options.nodir;
  if (self.nodir)
    self.mark = true;
  self.sync = !!options.sync;
  self.nounique = !!options.nounique;
  self.nonull = !!options.nonull;
  self.nosort = !!options.nosort;
  self.nocase = !!options.nocase;
  self.stat = !!options.stat;
  self.noprocess = !!options.noprocess;
  self.absolute = !!options.absolute;

  self.maxLength = options.maxLength || Infinity;
  self.cache = options.cache || Object.create(null);
  self.statCache = options.statCache || Object.create(null);
  self.symlinks = options.symlinks || Object.create(null);

  setupIgnores(self, options);

  self.changedCwd = false;
  var cwd = process.cwd();
  if (!ownProp$2(options, "cwd"))
    self.cwd = cwd;
  else {
    self.cwd = path$2.resolve(options.cwd);
    self.changedCwd = self.cwd !== cwd;
  }

  self.root = options.root || path$2.resolve(self.cwd, "/");
  self.root = path$2.resolve(self.root);
  if (process.platform === "win32")
    self.root = self.root.replace(/\\/g, "/");

  // TODO: is an absolute `cwd` supposed to be resolved against `root`?
  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
  self.cwdAbs = isAbsolute$2(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
  if (process.platform === "win32")
    self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
  self.nomount = !!options.nomount;

  // disable comments and negation in Minimatch.
  // Note that they are not supported in Glob itself anyway.
  options.nonegate = true;
  options.nocomment = true;

  self.minimatch = new Minimatch(pattern, options);
  self.options = self.minimatch.options;
}

function finish (self) {
  var nou = self.nounique;
  var all = nou ? [] : Object.create(null);

  for (var i = 0, l = self.matches.length; i < l; i ++) {
    var matches = self.matches[i];
    if (!matches || Object.keys(matches).length === 0) {
      if (self.nonull) {
        // do like the shell, and spit out the literal glob
        var literal = self.minimatch.globSet[i];
        if (nou)
          all.push(literal);
        else
          all[literal] = true;
      }
    } else {
      // had matches
      var m = Object.keys(matches);
      if (nou)
        all.push.apply(all, m);
      else
        m.forEach(function (m) {
          all[m] = true;
        });
    }
  }

  if (!nou)
    all = Object.keys(all);

  if (!self.nosort)
    all = all.sort(alphasort);

  // at *some* point we statted all of these
  if (self.mark) {
    for (var i = 0; i < all.length; i++) {
      all[i] = self._mark(all[i]);
    }
    if (self.nodir) {
      all = all.filter(function (e) {
        var notDir = !(/\/$/.test(e));
        var c = self.cache[e] || self.cache[makeAbs(self, e)];
        if (notDir && c)
          notDir = c !== 'DIR' && !Array.isArray(c);
        return notDir
      });
    }
  }

  if (self.ignore.length)
    all = all.filter(function(m) {
      return !isIgnored$2(self, m)
    });

  self.found = all;
}

function mark (self, p) {
  var abs = makeAbs(self, p);
  var c = self.cache[abs];
  var m = p;
  if (c) {
    var isDir = c === 'DIR' || Array.isArray(c);
    var slash = p.slice(-1) === '/';

    if (isDir && !slash)
      m += '/';
    else if (!isDir && slash)
      m = m.slice(0, -1);

    if (m !== p) {
      var mabs = makeAbs(self, m);
      self.statCache[mabs] = self.statCache[abs];
      self.cache[mabs] = self.cache[abs];
    }
  }

  return m
}

// lotta situps...
function makeAbs (self, f) {
  var abs = f;
  if (f.charAt(0) === '/') {
    abs = path$2.join(self.root, f);
  } else if (isAbsolute$2(f) || f === '') {
    abs = f;
  } else if (self.changedCwd) {
    abs = path$2.resolve(self.cwd, f);
  } else {
    abs = path$2.resolve(f);
  }

  if (process.platform === 'win32')
    abs = abs.replace(/\\/g, '/');

  return abs
}


// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
function isIgnored$2 (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
  })
}

function childrenIgnored$2 (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return !!(item.gmatcher && item.gmatcher.match(path))
  })
}

var sync = globSync$1;
globSync$1.GlobSync = GlobSync$1;

var fs$1 = require$$0__default['default'];
var rp$1 = fs_realpath;
var minimatch$1 = minimatch_1;
var path$1 = require$$0__default$1['default'];
var assert$1 = require$$6__default$1['default'];
var isAbsolute$1 = pathIsAbsolute.exports;
var common$1 = common$2;
var setopts$1 = common$1.setopts;
var ownProp$1 = common$1.ownProp;
var childrenIgnored$1 = common$1.childrenIgnored;
var isIgnored$1 = common$1.isIgnored;

function globSync$1 (pattern, options) {
  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  return new GlobSync$1(pattern, options).found
}

function GlobSync$1 (pattern, options) {
  if (!pattern)
    throw new Error('must provide pattern')

  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  if (!(this instanceof GlobSync$1))
    return new GlobSync$1(pattern, options)

  setopts$1(this, pattern, options);

  if (this.noprocess)
    return this

  var n = this.minimatch.set.length;
  this.matches = new Array(n);
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false);
  }
  this._finish();
}

GlobSync$1.prototype._finish = function () {
  assert$1(this instanceof GlobSync$1);
  if (this.realpath) {
    var self = this;
    this.matches.forEach(function (matchset, index) {
      var set = self.matches[index] = Object.create(null);
      for (var p in matchset) {
        try {
          p = self._makeAbs(p);
          var real = rp$1.realpathSync(p, self.realpathCache);
          set[real] = true;
        } catch (er) {
          if (er.syscall === 'stat')
            set[self._makeAbs(p)] = true;
          else
            throw er
        }
      }
    });
  }
  common$1.finish(this);
};


GlobSync$1.prototype._process = function (pattern, index, inGlobStar) {
  assert$1(this instanceof GlobSync$1);

  // Get the first [n] parts of pattern that are all strings.
  var n = 0;
  while (typeof pattern[n] === 'string') {
    n ++;
  }
  // now n is the index of the first one that is *not* a string.

  // See if there's anything else
  var prefix;
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index);
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null;
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/');
      break
  }

  var remain = pattern.slice(n);

  // get the list of entries.
  var read;
  if (prefix === null)
    read = '.';
  else if (isAbsolute$1(prefix) || isAbsolute$1(pattern.join('/'))) {
    if (!prefix || !isAbsolute$1(prefix))
      prefix = '/' + prefix;
    read = prefix;
  } else
    read = prefix;

  var abs = this._makeAbs(read);

  //if ignored, skip processing
  if (childrenIgnored$1(this, read))
    return

  var isGlobStar = remain[0] === minimatch$1.GLOBSTAR;
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
};


GlobSync$1.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
  var entries = this._readdir(abs, inGlobStar);

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0];
  var negate = !!this.minimatch.negate;
  var rawGlob = pn._glob;
  var dotOk = this.dot || rawGlob.charAt(0) === '.';

  var matchedEntries = [];
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i];
    if (e.charAt(0) !== '.' || dotOk) {
      var m;
      if (negate && !prefix) {
        m = !e.match(pn);
      } else {
        m = e.match(pn);
      }
      if (m)
        matchedEntries.push(e);
    }
  }

  var len = matchedEntries.length;
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null);

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i];
      if (prefix) {
        if (prefix.slice(-1) !== '/')
          e = prefix + '/' + e;
        else
          e = prefix + e;
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path$1.join(this.root, e);
      }
      this._emitMatch(index, e);
    }
    // This was the last one, and no stats were needed
    return
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift();
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i];
    var newPattern;
    if (prefix)
      newPattern = [prefix, e];
    else
      newPattern = [e];
    this._process(newPattern.concat(remain), index, inGlobStar);
  }
};


GlobSync$1.prototype._emitMatch = function (index, e) {
  if (isIgnored$1(this, e))
    return

  var abs = this._makeAbs(e);

  if (this.mark)
    e = this._mark(e);

  if (this.absolute) {
    e = abs;
  }

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs];
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true;

  if (this.stat)
    this._stat(e);
};


GlobSync$1.prototype._readdirInGlobStar = function (abs) {
  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false)

  var entries;
  var lstat;
  try {
    lstat = fs$1.lstatSync(abs);
  } catch (er) {
    if (er.code === 'ENOENT') {
      // lstat failed, doesn't exist
      return null
    }
  }

  var isSym = lstat && lstat.isSymbolicLink();
  this.symlinks[abs] = isSym;

  // If it's not a symlink or a dir, then it's definitely a regular file.
  // don't bother doing a readdir in that case.
  if (!isSym && lstat && !lstat.isDirectory())
    this.cache[abs] = 'FILE';
  else
    entries = this._readdir(abs, false);

  return entries
};

GlobSync$1.prototype._readdir = function (abs, inGlobStar) {

  if (inGlobStar && !ownProp$1(this.symlinks, abs))
    return this._readdirInGlobStar(abs)

  if (ownProp$1(this.cache, abs)) {
    var c = this.cache[abs];
    if (!c || c === 'FILE')
      return null

    if (Array.isArray(c))
      return c
  }

  try {
    return this._readdirEntries(abs, fs$1.readdirSync(abs))
  } catch (er) {
    this._readdirError(abs, er);
    return null
  }
};

GlobSync$1.prototype._readdirEntries = function (abs, entries) {
  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i];
      if (abs === '/')
        e = abs + e;
      else
        e = abs + '/' + e;
      this.cache[e] = true;
    }
  }

  this.cache[abs] = entries;

  // mark and cache dir-ness
  return entries
};

GlobSync$1.prototype._readdirError = function (f, er) {
  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f);
      this.cache[abs] = 'FILE';
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd);
        error.path = this.cwd;
        error.code = er.code;
        throw error
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false;
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false;
      if (this.strict)
        throw er
      if (!this.silent)
        console.error('glob error', er);
      break
  }
};

GlobSync$1.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

  var entries = this._readdir(abs, inGlobStar);

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1);
  var gspref = prefix ? [ prefix ] : [];
  var noGlobStar = gspref.concat(remainWithoutGlobStar);

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false);

  var len = entries.length;
  var isSym = this.symlinks[abs];

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return

  for (var i = 0; i < len; i++) {
    var e = entries[i];
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar);
    this._process(instead, index, true);

    var below = gspref.concat(entries[i], remain);
    this._process(below, index, true);
  }
};

GlobSync$1.prototype._processSimple = function (prefix, index) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var exists = this._stat(prefix);

  if (!this.matches[index])
    this.matches[index] = Object.create(null);

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return

  if (prefix && isAbsolute$1(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix);
    if (prefix.charAt(0) === '/') {
      prefix = path$1.join(this.root, prefix);
    } else {
      prefix = path$1.resolve(this.root, prefix);
      if (trail)
        prefix += '/';
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/');

  // Mark this as a match
  this._emitMatch(index, prefix);
};

// Returns either 'DIR', 'FILE', or false
GlobSync$1.prototype._stat = function (f) {
  var abs = this._makeAbs(f);
  var needDir = f.slice(-1) === '/';

  if (f.length > this.maxLength)
    return false

  if (!this.stat && ownProp$1(this.cache, abs)) {
    var c = this.cache[abs];

    if (Array.isArray(c))
      c = 'DIR';

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return c

    if (needDir && c === 'FILE')
      return false

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }
  var stat = this.statCache[abs];
  if (!stat) {
    var lstat;
    try {
      lstat = fs$1.lstatSync(abs);
    } catch (er) {
      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
        this.statCache[abs] = false;
        return false
      }
    }

    if (lstat && lstat.isSymbolicLink()) {
      try {
        stat = fs$1.statSync(abs);
      } catch (er) {
        stat = lstat;
      }
    } else {
      stat = lstat;
    }
  }

  this.statCache[abs] = stat;

  var c = true;
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE';

  this.cache[abs] = this.cache[abs] || c;

  if (needDir && c === 'FILE')
    return false

  return c
};

GlobSync$1.prototype._mark = function (p) {
  return common$1.mark(this, p)
};

GlobSync$1.prototype._makeAbs = function (f) {
  return common$1.makeAbs(this, f)
};

var wrappy = wrappy_1;
var reqs = Object.create(null);
var once$1 = once$4.exports;

var inflight_1 = wrappy(inflight$1);

function inflight$1 (key, cb) {
  if (reqs[key]) {
    reqs[key].push(cb);
    return null
  } else {
    reqs[key] = [cb];
    return makeres(key)
  }
}

function makeres (key) {
  return once$1(function RES () {
    var cbs = reqs[key];
    var len = cbs.length;
    var args = slice(arguments);

    // XXX It's somewhat ambiguous whether a new callback added in this
    // pass should be queued for later execution if something in the
    // list of callbacks throws, or if it should just be discarded.
    // However, it's such an edge case that it hardly matters, and either
    // choice is likely as surprising as the other.
    // As it happens, we do go ahead and schedule it for later execution.
    try {
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args);
      }
    } finally {
      if (cbs.length > len) {
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len);
        process.nextTick(function () {
          RES.apply(null, args);
        });
      } else {
        delete reqs[key];
      }
    }
  })
}

function slice (args) {
  var length = args.length;
  var array = [];

  for (var i = 0; i < length; i++) array[i] = args[i];
  return array
}

// Approach:
//
// 1. Get the minimatch set
// 2. For each pattern in the set, PROCESS(pattern, false)
// 3. Store matches per-set, then uniq them
//
// PROCESS(pattern, inGlobStar)
// Get the first [n] items from pattern that are all strings
// Join these together.  This is PREFIX.
//   If there is no more remaining, then stat(PREFIX) and
//   add to matches if it succeeds.  END.
//
// If inGlobStar and PREFIX is symlink and points to dir
//   set ENTRIES = []
// else readdir(PREFIX) as ENTRIES
//   If fail, END
//
// with ENTRIES
//   If pattern[n] is GLOBSTAR
//     // handle the case where the globstar match is empty
//     // by pruning it out, and testing the resulting pattern
//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
//     // handle other cases.
//     for ENTRY in ENTRIES (not dotfiles)
//       // attach globstar + tail onto the entry
//       // Mark that this entry is a globstar match
//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
//
//   else // not globstar
//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
//       Test ENTRY against pattern[n]
//       If fails, continue
//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
//
// Caveat:
//   Cache all stats and readdirs results to minimize syscall.  Since all
//   we ever care about is existence and directory-ness, we can just keep
//   `true` for files, and [children,...] for directories, or `false` for
//   things that don't exist.

var glob_1 = glob;

var fs = require$$0__default['default'];
var rp = fs_realpath;
var minimatch = minimatch_1;
var inherits = inherits$1.exports;
var EE = require$$4__default['default'].EventEmitter;
var path = require$$0__default$1['default'];
var assert = require$$6__default$1['default'];
var isAbsolute = pathIsAbsolute.exports;
var globSync = sync;
var common = common$2;
var setopts = common.setopts;
var ownProp = common.ownProp;
var inflight = inflight_1;
var childrenIgnored = common.childrenIgnored;
var isIgnored = common.isIgnored;

var once = once$4.exports;

function glob (pattern, options, cb) {
  if (typeof options === 'function') cb = options, options = {};
  if (!options) options = {};

  if (options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return globSync(pattern, options)
  }

  return new Glob(pattern, options, cb)
}

glob.sync = globSync;
var GlobSync = glob.GlobSync = globSync.GlobSync;

// old api surface
glob.glob = glob;

function extend (origin, add) {
  if (add === null || typeof add !== 'object') {
    return origin
  }

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin
}

glob.hasMagic = function (pattern, options_) {
  var options = extend({}, options_);
  options.noprocess = true;

  var g = new Glob(pattern, options);
  var set = g.minimatch.set;

  if (!pattern)
    return false

  if (set.length > 1)
    return true

  for (var j = 0; j < set[0].length; j++) {
    if (typeof set[0][j] !== 'string')
      return true
  }

  return false
};

glob.Glob = Glob;
inherits(Glob, EE);
function Glob (pattern, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = null;
  }

  if (options && options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return new GlobSync(pattern, options)
  }

  if (!(this instanceof Glob))
    return new Glob(pattern, options, cb)

  setopts(this, pattern, options);
  this._didRealPath = false;

  // process each pattern in the minimatch set
  var n = this.minimatch.set.length;

  // The matches are stored as {<filename>: true,...} so that
  // duplicates are automagically pruned.
  // Later, we do an Object.keys() on these.
  // Keep them as a list so we can fill in when nonull is set.
  this.matches = new Array(n);

  if (typeof cb === 'function') {
    cb = once(cb);
    this.on('error', cb);
    this.on('end', function (matches) {
      cb(null, matches);
    });
  }

  var self = this;
  this._processing = 0;

  this._emitQueue = [];
  this._processQueue = [];
  this.paused = false;

  if (this.noprocess)
    return this

  if (n === 0)
    return done()

  var sync = true;
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false, done);
  }
  sync = false;

  function done () {
    --self._processing;
    if (self._processing <= 0) {
      if (sync) {
        process.nextTick(function () {
          self._finish();
        });
      } else {
        self._finish();
      }
    }
  }
}

Glob.prototype._finish = function () {
  assert(this instanceof Glob);
  if (this.aborted)
    return

  if (this.realpath && !this._didRealpath)
    return this._realpath()

  common.finish(this);
  this.emit('end', this.found);
};

Glob.prototype._realpath = function () {
  if (this._didRealpath)
    return

  this._didRealpath = true;

  var n = this.matches.length;
  if (n === 0)
    return this._finish()

  var self = this;
  for (var i = 0; i < this.matches.length; i++)
    this._realpathSet(i, next);

  function next () {
    if (--n === 0)
      self._finish();
  }
};

Glob.prototype._realpathSet = function (index, cb) {
  var matchset = this.matches[index];
  if (!matchset)
    return cb()

  var found = Object.keys(matchset);
  var self = this;
  var n = found.length;

  if (n === 0)
    return cb()

  var set = this.matches[index] = Object.create(null);
  found.forEach(function (p, i) {
    // If there's a problem with the stat, then it means that
    // one or more of the links in the realpath couldn't be
    // resolved.  just return the abs value in that case.
    p = self._makeAbs(p);
    rp.realpath(p, self.realpathCache, function (er, real) {
      if (!er)
        set[real] = true;
      else if (er.syscall === 'stat')
        set[p] = true;
      else
        self.emit('error', er); // srsly wtf right here

      if (--n === 0) {
        self.matches[index] = set;
        cb();
      }
    });
  });
};

Glob.prototype._mark = function (p) {
  return common.mark(this, p)
};

Glob.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
};

Glob.prototype.abort = function () {
  this.aborted = true;
  this.emit('abort');
};

Glob.prototype.pause = function () {
  if (!this.paused) {
    this.paused = true;
    this.emit('pause');
  }
};

Glob.prototype.resume = function () {
  if (this.paused) {
    this.emit('resume');
    this.paused = false;
    if (this._emitQueue.length) {
      var eq = this._emitQueue.slice(0);
      this._emitQueue.length = 0;
      for (var i = 0; i < eq.length; i ++) {
        var e = eq[i];
        this._emitMatch(e[0], e[1]);
      }
    }
    if (this._processQueue.length) {
      var pq = this._processQueue.slice(0);
      this._processQueue.length = 0;
      for (var i = 0; i < pq.length; i ++) {
        var p = pq[i];
        this._processing--;
        this._process(p[0], p[1], p[2], p[3]);
      }
    }
  }
};

Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
  assert(this instanceof Glob);
  assert(typeof cb === 'function');

  if (this.aborted)
    return

  this._processing++;
  if (this.paused) {
    this._processQueue.push([pattern, index, inGlobStar, cb]);
    return
  }

  //console.error('PROCESS %d', this._processing, pattern)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0;
  while (typeof pattern[n] === 'string') {
    n ++;
  }
  // now n is the index of the first one that is *not* a string.

  // see if there's anything else
  var prefix;
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index, cb);
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null;
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/');
      break
  }

  var remain = pattern.slice(n);

  // get the list of entries.
  var read;
  if (prefix === null)
    read = '.';
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix;
    read = prefix;
  } else
    read = prefix;

  var abs = this._makeAbs(read);

  //if ignored, skip _processing
  if (childrenIgnored(this, read))
    return cb()

  var isGlobStar = remain[0] === minimatch.GLOBSTAR;
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
};

Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this;
  this._readdir(abs, inGlobStar, function (er, entries) {
    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  });
};

Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return cb()

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0];
  var negate = !!this.minimatch.negate;
  var rawGlob = pn._glob;
  var dotOk = this.dot || rawGlob.charAt(0) === '.';

  var matchedEntries = [];
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i];
    if (e.charAt(0) !== '.' || dotOk) {
      var m;
      if (negate && !prefix) {
        m = !e.match(pn);
      } else {
        m = e.match(pn);
      }
      if (m)
        matchedEntries.push(e);
    }
  }

  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

  var len = matchedEntries.length;
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return cb()

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null);

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i];
      if (prefix) {
        if (prefix !== '/')
          e = prefix + '/' + e;
        else
          e = prefix + e;
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e);
      }
      this._emitMatch(index, e);
    }
    // This was the last one, and no stats were needed
    return cb()
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift();
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i];
    if (prefix) {
      if (prefix !== '/')
        e = prefix + '/' + e;
      else
        e = prefix + e;
    }
    this._process([e].concat(remain), index, inGlobStar, cb);
  }
  cb();
};

Glob.prototype._emitMatch = function (index, e) {
  if (this.aborted)
    return

  if (isIgnored(this, e))
    return

  if (this.paused) {
    this._emitQueue.push([index, e]);
    return
  }

  var abs = isAbsolute(e) ? e : this._makeAbs(e);

  if (this.mark)
    e = this._mark(e);

  if (this.absolute)
    e = abs;

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs];
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true;

  var st = this.statCache[abs];
  if (st)
    this.emit('stat', e, st);

  this.emit('match', e);
};

Glob.prototype._readdirInGlobStar = function (abs, cb) {
  if (this.aborted)
    return

  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false, cb)

  var lstatkey = 'lstat\0' + abs;
  var self = this;
  var lstatcb = inflight(lstatkey, lstatcb_);

  if (lstatcb)
    fs.lstat(abs, lstatcb);

  function lstatcb_ (er, lstat) {
    if (er && er.code === 'ENOENT')
      return cb()

    var isSym = lstat && lstat.isSymbolicLink();
    self.symlinks[abs] = isSym;

    // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.
    if (!isSym && lstat && !lstat.isDirectory()) {
      self.cache[abs] = 'FILE';
      cb();
    } else
      self._readdir(abs, false, cb);
  }
};

Glob.prototype._readdir = function (abs, inGlobStar, cb) {
  if (this.aborted)
    return

  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb);
  if (!cb)
    return

  //console.error('RD %j %j', +inGlobStar, abs)
  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs, cb)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs];
    if (!c || c === 'FILE')
      return cb()

    if (Array.isArray(c))
      return cb(null, c)
  }
  fs.readdir(abs, readdirCb(this, abs, cb));
};

function readdirCb (self, abs, cb) {
  return function (er, entries) {
    if (er)
      self._readdirError(abs, er, cb);
    else
      self._readdirEntries(abs, entries, cb);
  }
}

Glob.prototype._readdirEntries = function (abs, entries, cb) {
  if (this.aborted)
    return

  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i];
      if (abs === '/')
        e = abs + e;
      else
        e = abs + '/' + e;
      this.cache[e] = true;
    }
  }

  this.cache[abs] = entries;
  return cb(null, entries)
};

Glob.prototype._readdirError = function (f, er, cb) {
  if (this.aborted)
    return

  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f);
      this.cache[abs] = 'FILE';
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd);
        error.path = this.cwd;
        error.code = er.code;
        this.emit('error', error);
        this.abort();
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false;
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false;
      if (this.strict) {
        this.emit('error', er);
        // If the error is handled, then we abort
        // if not, we threw out of here
        this.abort();
      }
      if (!this.silent)
        console.error('glob error', er);
      break
  }

  return cb()
};

Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this;
  this._readdir(abs, inGlobStar, function (er, entries) {
    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
  });
};


Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
  //console.error('pgs2', prefix, remain[0], entries)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return cb()

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1);
  var gspref = prefix ? [ prefix ] : [];
  var noGlobStar = gspref.concat(remainWithoutGlobStar);

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false, cb);

  var isSym = this.symlinks[abs];
  var len = entries.length;

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return cb()

  for (var i = 0; i < len; i++) {
    var e = entries[i];
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar);
    this._process(instead, index, true, cb);

    var below = gspref.concat(entries[i], remain);
    this._process(below, index, true, cb);
  }

  cb();
};

Glob.prototype._processSimple = function (prefix, index, cb) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var self = this;
  this._stat(prefix, function (er, exists) {
    self._processSimple2(prefix, index, er, exists, cb);
  });
};
Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

  //console.error('ps2', prefix, exists)

  if (!this.matches[index])
    this.matches[index] = Object.create(null);

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return cb()

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix);
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix);
    } else {
      prefix = path.resolve(this.root, prefix);
      if (trail)
        prefix += '/';
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/');

  // Mark this as a match
  this._emitMatch(index, prefix);
  cb();
};

// Returns either 'DIR', 'FILE', or false
Glob.prototype._stat = function (f, cb) {
  var abs = this._makeAbs(f);
  var needDir = f.slice(-1) === '/';

  if (f.length > this.maxLength)
    return cb()

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs];

    if (Array.isArray(c))
      c = 'DIR';

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return cb(null, c)

    if (needDir && c === 'FILE')
      return cb()

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }
  var stat = this.statCache[abs];
  if (stat !== undefined) {
    if (stat === false)
      return cb(null, stat)
    else {
      var type = stat.isDirectory() ? 'DIR' : 'FILE';
      if (needDir && type === 'FILE')
        return cb()
      else
        return cb(null, type, stat)
    }
  }

  var self = this;
  var statcb = inflight('stat\0' + abs, lstatcb_);
  if (statcb)
    fs.lstat(abs, statcb);

  function lstatcb_ (er, lstat) {
    if (lstat && lstat.isSymbolicLink()) {
      // If it's a symlink, then treat it as the target, unless
      // the target does not exist, then treat it as a file.
      return fs.stat(abs, function (er, stat) {
        if (er)
          self._stat2(f, abs, null, lstat, cb);
        else
          self._stat2(f, abs, er, stat, cb);
      })
    } else {
      self._stat2(f, abs, er, lstat, cb);
    }
  }
};

Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
    this.statCache[abs] = false;
    return cb()
  }

  var needDir = f.slice(-1) === '/';
  this.statCache[abs] = stat;

  if (abs.slice(-1) === '/' && stat && !stat.isDirectory())
    return cb(null, false, stat)

  var c = true;
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE';
  this.cache[abs] = this.cache[abs] || c;

  if (needDir && c === 'FILE')
    return cb()

  return cb(null, c, stat)
};

var convert_1 = convert$1;

function convert$1(test) {
  if (test == null) {
    return ok
  }

  if (typeof test === 'string') {
    return typeFactory(test)
  }

  if (typeof test === 'object') {
    return 'length' in test ? anyFactory(test) : allFactory(test)
  }

  if (typeof test === 'function') {
    return test
  }

  throw new Error('Expected function, string, or object as test')
}

// Utility assert each property in `test` is represented in `node`, and each
// values are strictly equal.
function allFactory(test) {
  return all

  function all(node) {
    var key;

    for (key in test) {
      if (node[key] !== test[key]) return false
    }

    return true
  }
}

function anyFactory(tests) {
  var checks = [];
  var index = -1;

  while (++index < tests.length) {
    checks[index] = convert$1(tests[index]);
  }

  return any

  function any() {
    var index = -1;

    while (++index < checks.length) {
      if (checks[index].apply(this, arguments)) {
        return true
      }
    }

    return false
  }
}

// Utility to convert a string into a function which checks a given node’s type
// for said string.
function typeFactory(test) {
  return type

  function type(node) {
    return Boolean(node && node.type === test)
  }
}

// Utility to return true.
function ok() {
  return true
}

var color_1 = color$1;
function color$1(d) {
  return '\u001B[33m' + d + '\u001B[39m'
}

var unistUtilVisitParents = visitParents$1;

var convert = convert_1;
var color = color_1;

var CONTINUE$1 = true;
var SKIP$1 = 'skip';
var EXIT$1 = false;

visitParents$1.CONTINUE = CONTINUE$1;
visitParents$1.SKIP = SKIP$1;
visitParents$1.EXIT = EXIT$1;

function visitParents$1(tree, test, visitor, reverse) {
  var step;
  var is;

  if (typeof test === 'function' && typeof visitor !== 'function') {
    reverse = visitor;
    visitor = test;
    test = null;
  }

  is = convert(test);
  step = reverse ? -1 : 1;

  factory(tree, null, [])();

  function factory(node, index, parents) {
    var value = typeof node === 'object' && node !== null ? node : {};
    var name;

    if (typeof value.type === 'string') {
      name =
        typeof value.tagName === 'string'
          ? value.tagName
          : typeof value.name === 'string'
          ? value.name
          : undefined;

      visit.displayName =
        'node (' + color(value.type + (name ? '<' + name + '>' : '')) + ')';
    }

    return visit

    function visit() {
      var grandparents = parents.concat(node);
      var result = [];
      var subresult;
      var offset;

      if (!test || is(node, index, parents[parents.length - 1] || null)) {
        result = toResult(visitor(node, parents));

        if (result[0] === EXIT$1) {
          return result
        }
      }

      if (node.children && result[0] !== SKIP$1) {
        offset = (reverse ? node.children.length : -1) + step;

        while (offset > -1 && offset < node.children.length) {
          subresult = factory(node.children[offset], offset, grandparents)();

          if (subresult[0] === EXIT$1) {
            return subresult
          }

          offset =
            typeof subresult[1] === 'number' ? subresult[1] : offset + step;
        }
      }

      return result
    }
  }
}

function toResult(value) {
  if (value !== null && typeof value === 'object' && 'length' in value) {
    return value
  }

  if (typeof value === 'number') {
    return [CONTINUE$1, value]
  }

  return [value]
}

var unistUtilVisit = visit;

var visitParents = unistUtilVisitParents;

var CONTINUE = visitParents.CONTINUE;
var SKIP = visitParents.SKIP;
var EXIT = visitParents.EXIT;

visit.CONTINUE = CONTINUE;
visit.SKIP = SKIP;
visit.EXIT = EXIT;

function visit(tree, test, visitor, reverse) {
  if (typeof test === 'function' && typeof visitor !== 'function') {
    reverse = visitor;
    visitor = test;
    test = null;
  }

  visitParents(tree, test, overload, reverse);

  function overload(node, parents) {
    var parent = parents[parents.length - 1];
    var index = parent ? parent.children.indexOf(node) : null;
    return visitor(node, index, parent)
  }
}

var pluralize$3 = {exports: {}};

/* global define */

(function (module, exports) {
(function (root, pluralize) {
  /* istanbul ignore else */
  if (typeof commonjsRequire === 'function' && 'object' === 'object' && 'object' === 'object') {
    // Node.
    module.exports = pluralize();
  } else {
    // Browser global.
    root.pluralize = pluralize();
  }
})(commonjsGlobal, function () {
  // Rule storage - pluralize and singularize need to be run sequentially,
  // while other rules can be optimized using an object for instant lookups.
  var pluralRules = [];
  var singularRules = [];
  var uncountables = {};
  var irregularPlurals = {};
  var irregularSingles = {};

  /**
   * Sanitize a pluralization rule to a usable regular expression.
   *
   * @param  {(RegExp|string)} rule
   * @return {RegExp}
   */
  function sanitizeRule (rule) {
    if (typeof rule === 'string') {
      return new RegExp('^' + rule + '$', 'i');
    }

    return rule;
  }

  /**
   * Pass in a word token to produce a function that can replicate the case on
   * another word.
   *
   * @param  {string}   word
   * @param  {string}   token
   * @return {Function}
   */
  function restoreCase (word, token) {
    // Tokens are an exact match.
    if (word === token) return token;

    // Upper cased words. E.g. "HELLO".
    if (word === word.toUpperCase()) return token.toUpperCase();

    // Title cased words. E.g. "Title".
    if (word[0] === word[0].toUpperCase()) {
      return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
    }

    // Lower cased words. E.g. "test".
    return token.toLowerCase();
  }

  /**
   * Interpolate a regexp string.
   *
   * @param  {string} str
   * @param  {Array}  args
   * @return {string}
   */
  function interpolate (str, args) {
    return str.replace(/\$(\d{1,2})/g, function (match, index) {
      return args[index] || '';
    });
  }

  /**
   * Replace a word using a rule.
   *
   * @param  {string} word
   * @param  {Array}  rule
   * @return {string}
   */
  function replace (word, rule) {
    return word.replace(rule[0], function (match, index) {
      var result = interpolate(rule[1], arguments);

      if (match === '') {
        return restoreCase(word[index - 1], result);
      }

      return restoreCase(match, result);
    });
  }

  /**
   * Sanitize a word by passing in the word and sanitization rules.
   *
   * @param  {string}   token
   * @param  {string}   word
   * @param  {Array}    rules
   * @return {string}
   */
  function sanitizeWord (token, word, rules) {
    // Empty string or doesn't need fixing.
    if (!token.length || uncountables.hasOwnProperty(token)) {
      return word;
    }

    var len = rules.length;

    // Iterate over the sanitization rules and use the first one to match.
    while (len--) {
      var rule = rules[len];

      if (rule[0].test(word)) return replace(word, rule);
    }

    return word;
  }

  /**
   * Replace a word with the updated word.
   *
   * @param  {Object}   replaceMap
   * @param  {Object}   keepMap
   * @param  {Array}    rules
   * @return {Function}
   */
  function replaceWord (replaceMap, keepMap, rules) {
    return function (word) {
      // Get the correct token and case restoration functions.
      var token = word.toLowerCase();

      // Check against the keep object map.
      if (keepMap.hasOwnProperty(token)) {
        return restoreCase(word, token);
      }

      // Check against the replacement map for a direct word replacement.
      if (replaceMap.hasOwnProperty(token)) {
        return restoreCase(word, replaceMap[token]);
      }

      // Run all the rules against the word.
      return sanitizeWord(token, word, rules);
    };
  }

  /**
   * Check if a word is part of the map.
   */
  function checkWord (replaceMap, keepMap, rules, bool) {
    return function (word) {
      var token = word.toLowerCase();

      if (keepMap.hasOwnProperty(token)) return true;
      if (replaceMap.hasOwnProperty(token)) return false;

      return sanitizeWord(token, token, rules) === token;
    };
  }

  /**
   * Pluralize or singularize a word based on the passed in count.
   *
   * @param  {string}  word
   * @param  {number}  count
   * @param  {boolean} inclusive
   * @return {string}
   */
  function pluralize (word, count, inclusive) {
    var pluralized = count === 1
      ? pluralize.singular(word) : pluralize.plural(word);

    return (inclusive ? count + ' ' : '') + pluralized;
  }

  /**
   * Pluralize a word.
   *
   * @type {Function}
   */
  pluralize.plural = replaceWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Check if a word is plural.
   *
   * @type {Function}
   */
  pluralize.isPlural = checkWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Singularize a word.
   *
   * @type {Function}
   */
  pluralize.singular = replaceWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Check if a word is singular.
   *
   * @type {Function}
   */
  pluralize.isSingular = checkWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Add a pluralization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addPluralRule = function (rule, replacement) {
    pluralRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add a singularization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addSingularRule = function (rule, replacement) {
    singularRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add an uncountable word rule.
   *
   * @param {(string|RegExp)} word
   */
  pluralize.addUncountableRule = function (word) {
    if (typeof word === 'string') {
      uncountables[word.toLowerCase()] = true;
      return;
    }

    // Set singular and plural references for the word.
    pluralize.addPluralRule(word, '$0');
    pluralize.addSingularRule(word, '$0');
  };

  /**
   * Add an irregular word definition.
   *
   * @param {string} single
   * @param {string} plural
   */
  pluralize.addIrregularRule = function (single, plural) {
    plural = plural.toLowerCase();
    single = single.toLowerCase();

    irregularSingles[single] = plural;
    irregularPlurals[plural] = single;
  };

  /**
   * Irregular rules.
   */
  [
    // Pronouns.
    ['I', 'we'],
    ['me', 'us'],
    ['he', 'they'],
    ['she', 'they'],
    ['them', 'them'],
    ['myself', 'ourselves'],
    ['yourself', 'yourselves'],
    ['itself', 'themselves'],
    ['herself', 'themselves'],
    ['himself', 'themselves'],
    ['themself', 'themselves'],
    ['is', 'are'],
    ['was', 'were'],
    ['has', 'have'],
    ['this', 'these'],
    ['that', 'those'],
    // Words ending in with a consonant and `o`.
    ['echo', 'echoes'],
    ['dingo', 'dingoes'],
    ['volcano', 'volcanoes'],
    ['tornado', 'tornadoes'],
    ['torpedo', 'torpedoes'],
    // Ends with `us`.
    ['genus', 'genera'],
    ['viscus', 'viscera'],
    // Ends with `ma`.
    ['stigma', 'stigmata'],
    ['stoma', 'stomata'],
    ['dogma', 'dogmata'],
    ['lemma', 'lemmata'],
    ['schema', 'schemata'],
    ['anathema', 'anathemata'],
    // Other irregular rules.
    ['ox', 'oxen'],
    ['axe', 'axes'],
    ['die', 'dice'],
    ['yes', 'yeses'],
    ['foot', 'feet'],
    ['eave', 'eaves'],
    ['goose', 'geese'],
    ['tooth', 'teeth'],
    ['quiz', 'quizzes'],
    ['human', 'humans'],
    ['proof', 'proofs'],
    ['carve', 'carves'],
    ['valve', 'valves'],
    ['looey', 'looies'],
    ['thief', 'thieves'],
    ['groove', 'grooves'],
    ['pickaxe', 'pickaxes'],
    ['whiskey', 'whiskies']
  ].forEach(function (rule) {
    return pluralize.addIrregularRule(rule[0], rule[1]);
  });

  /**
   * Pluralization rules.
   */
  [
    [/s?$/i, 's'],
    [/[^\u0000-\u007F]$/i, '$0'],
    [/([^aeiou]ese)$/i, '$1'],
    [/(ax|test)is$/i, '$1es'],
    [/(alias|[^aou]us|tlas|gas|ris)$/i, '$1es'],
    [/(e[mn]u)s?$/i, '$1s'],
    [/([^l]ias|[aeiou]las|[emjzr]as|[iu]am)$/i, '$1'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
    [/(seraph|cherub)(?:im)?$/i, '$1im'],
    [/(her|at|gr)o$/i, '$1oes'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
    [/sis$/i, 'ses'],
    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
    [/([^aeiouy]|qu)y$/i, '$1ies'],
    [/([^ch][ieo][ln])ey$/i, '$1ies'],
    [/(x|ch|ss|sh|zz)$/i, '$1es'],
    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
    [/(m|l)(?:ice|ouse)$/i, '$1ice'],
    [/(pe)(?:rson|ople)$/i, '$1ople'],
    [/(child)(?:ren)?$/i, '$1ren'],
    [/eaux$/i, '$0'],
    [/m[ae]n$/i, 'men'],
    ['thou', 'you']
  ].forEach(function (rule) {
    return pluralize.addPluralRule(rule[0], rule[1]);
  });

  /**
   * Singularization rules.
   */
  [
    [/s$/i, ''],
    [/(ss)$/i, '$1'],
    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
    [/ies$/i, 'y'],
    [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],
    [/\b(mon|smil)ies$/i, '$1ey'],
    [/(m|l)ice$/i, '$1ouse'],
    [/(seraph|cherub)im$/i, '$1'],
    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|tlas|gas|(?:her|at|gr)o|ris)(?:es)?$/i, '$1'],
    [/(analy|ba|diagno|parenthe|progno|synop|the|empha|cri)(?:sis|ses)$/i, '$1sis'],
    [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
    [/(test)(?:is|es)$/i, '$1is'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
    [/(alumn|alg|vertebr)ae$/i, '$1a'],
    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
    [/(matr|append)ices$/i, '$1ix'],
    [/(pe)(rson|ople)$/i, '$1rson'],
    [/(child)ren$/i, '$1'],
    [/(eau)x?$/i, '$1'],
    [/men$/i, 'man']
  ].forEach(function (rule) {
    return pluralize.addSingularRule(rule[0], rule[1]);
  });

  /**
   * Uncountable rules.
   */
  [
    // Singular words with no plurals.
    'adulthood',
    'advice',
    'agenda',
    'aid',
    'alcohol',
    'ammo',
    'anime',
    'athletics',
    'audio',
    'bison',
    'blood',
    'bream',
    'buffalo',
    'butter',
    'carp',
    'cash',
    'chassis',
    'chess',
    'clothing',
    'cod',
    'commerce',
    'cooperation',
    'corps',
    'debris',
    'diabetes',
    'digestion',
    'elk',
    'energy',
    'equipment',
    'excretion',
    'expertise',
    'flounder',
    'fun',
    'gallows',
    'garbage',
    'graffiti',
    'headquarters',
    'health',
    'herpes',
    'highjinks',
    'homework',
    'housework',
    'information',
    'jeans',
    'justice',
    'kudos',
    'labour',
    'literature',
    'machinery',
    'mackerel',
    'mail',
    'media',
    'mews',
    'moose',
    'music',
    'manga',
    'news',
    'pike',
    'plankton',
    'pliers',
    'pollution',
    'premises',
    'rain',
    'research',
    'rice',
    'salmon',
    'scissors',
    'series',
    'sewage',
    'shambles',
    'shrimp',
    'species',
    'staff',
    'swine',
    'tennis',
    'traffic',
    'transporation',
    'trout',
    'tuna',
    'wealth',
    'welfare',
    'whiting',
    'wildebeest',
    'wildlife',
    'you',
    // Regexes.
    /[^aeiou]ese$/i, // "chinese", "japanese"
    /deer$/i, // "deer", "reindeer"
    /fish$/i, // "fish", "blowfish", "angelfish"
    /measles$/i,
    /o[iu]s$/i, // "carnivorous"
    /pox$/i, // "chickpox", "smallpox"
    /sheep$/i
  ].forEach(pluralize.addUncountableRule);

  return pluralize;
});
}(pluralize$3));

var normalizeStrings = {exports: {}};

var require$$0 = {
	"105": "i",
	"192": "A",
	"193": "A",
	"194": "A",
	"195": "A",
	"196": "A",
	"197": "A",
	"199": "C",
	"200": "E",
	"201": "E",
	"202": "E",
	"203": "E",
	"204": "I",
	"205": "I",
	"206": "I",
	"207": "I",
	"209": "N",
	"210": "O",
	"211": "O",
	"212": "O",
	"213": "O",
	"214": "O",
	"216": "O",
	"217": "U",
	"218": "U",
	"219": "U",
	"220": "U",
	"221": "Y",
	"224": "a",
	"225": "a",
	"226": "a",
	"227": "a",
	"228": "a",
	"229": "a",
	"231": "c",
	"232": "e",
	"233": "e",
	"234": "e",
	"235": "e",
	"236": "i",
	"237": "i",
	"238": "i",
	"239": "i",
	"241": "n",
	"242": "o",
	"243": "o",
	"244": "o",
	"245": "o",
	"246": "o",
	"248": "o",
	"249": "u",
	"250": "u",
	"251": "u",
	"252": "u",
	"253": "y",
	"255": "y",
	"256": "A",
	"257": "a",
	"258": "A",
	"259": "a",
	"260": "A",
	"261": "a",
	"262": "C",
	"263": "c",
	"264": "C",
	"265": "c",
	"266": "C",
	"267": "c",
	"268": "C",
	"269": "c",
	"270": "D",
	"271": "d",
	"272": "D",
	"273": "d",
	"274": "E",
	"275": "e",
	"276": "E",
	"277": "e",
	"278": "E",
	"279": "e",
	"280": "E",
	"281": "e",
	"282": "E",
	"283": "e",
	"284": "G",
	"285": "g",
	"286": "G",
	"287": "g",
	"288": "G",
	"289": "g",
	"290": "G",
	"291": "g",
	"292": "H",
	"293": "h",
	"294": "H",
	"295": "h",
	"296": "I",
	"297": "i",
	"298": "I",
	"299": "i",
	"300": "I",
	"301": "i",
	"302": "I",
	"303": "i",
	"304": "I",
	"308": "J",
	"309": "j",
	"310": "K",
	"311": "k",
	"313": "L",
	"314": "l",
	"315": "L",
	"316": "l",
	"317": "L",
	"318": "l",
	"319": "L",
	"320": "l",
	"321": "L",
	"322": "l",
	"323": "N",
	"324": "n",
	"325": "N",
	"326": "n",
	"327": "N",
	"328": "n",
	"332": "O",
	"333": "o",
	"334": "O",
	"335": "o",
	"336": "O",
	"337": "o",
	"338": "O",
	"339": "o",
	"340": "R",
	"341": "r",
	"342": "R",
	"343": "r",
	"344": "R",
	"345": "r",
	"346": "S",
	"347": "s",
	"348": "S",
	"349": "s",
	"350": "S",
	"351": "s",
	"352": "S",
	"353": "s",
	"354": "T",
	"355": "t",
	"356": "T",
	"357": "t",
	"358": "T",
	"359": "t",
	"360": "U",
	"361": "u",
	"362": "U",
	"363": "u",
	"364": "U",
	"365": "u",
	"366": "U",
	"367": "u",
	"368": "U",
	"369": "u",
	"370": "U",
	"371": "u",
	"372": "W",
	"373": "w",
	"374": "Y",
	"375": "y",
	"376": "Y",
	"377": "Z",
	"378": "z",
	"379": "Z",
	"380": "z",
	"381": "Z",
	"382": "z",
	"384": "b",
	"385": "B",
	"386": "B",
	"387": "b",
	"390": "O",
	"391": "C",
	"392": "c",
	"393": "D",
	"394": "D",
	"395": "D",
	"396": "d",
	"398": "E",
	"400": "E",
	"401": "F",
	"402": "f",
	"403": "G",
	"407": "I",
	"408": "K",
	"409": "k",
	"410": "l",
	"412": "M",
	"413": "N",
	"414": "n",
	"415": "O",
	"416": "O",
	"417": "o",
	"420": "P",
	"421": "p",
	"422": "R",
	"427": "t",
	"428": "T",
	"429": "t",
	"430": "T",
	"431": "U",
	"432": "u",
	"434": "V",
	"435": "Y",
	"436": "y",
	"437": "Z",
	"438": "z",
	"461": "A",
	"462": "a",
	"463": "I",
	"464": "i",
	"465": "O",
	"466": "o",
	"467": "U",
	"468": "u",
	"477": "e",
	"484": "G",
	"485": "g",
	"486": "G",
	"487": "g",
	"488": "K",
	"489": "k",
	"490": "O",
	"491": "o",
	"500": "G",
	"501": "g",
	"504": "N",
	"505": "n",
	"512": "A",
	"513": "a",
	"514": "A",
	"515": "a",
	"516": "E",
	"517": "e",
	"518": "E",
	"519": "e",
	"520": "I",
	"521": "i",
	"522": "I",
	"523": "i",
	"524": "O",
	"525": "o",
	"526": "O",
	"527": "o",
	"528": "R",
	"529": "r",
	"530": "R",
	"531": "r",
	"532": "U",
	"533": "u",
	"534": "U",
	"535": "u",
	"536": "S",
	"537": "s",
	"538": "T",
	"539": "t",
	"542": "H",
	"543": "h",
	"544": "N",
	"545": "d",
	"548": "Z",
	"549": "z",
	"550": "A",
	"551": "a",
	"552": "E",
	"553": "e",
	"558": "O",
	"559": "o",
	"562": "Y",
	"563": "y",
	"564": "l",
	"565": "n",
	"566": "t",
	"567": "j",
	"570": "A",
	"571": "C",
	"572": "c",
	"573": "L",
	"574": "T",
	"575": "s",
	"576": "z",
	"579": "B",
	"580": "U",
	"581": "V",
	"582": "E",
	"583": "e",
	"584": "J",
	"585": "j",
	"586": "Q",
	"587": "q",
	"588": "R",
	"589": "r",
	"590": "Y",
	"591": "y",
	"592": "a",
	"593": "a",
	"595": "b",
	"596": "o",
	"597": "c",
	"598": "d",
	"599": "d",
	"600": "e",
	"603": "e",
	"604": "e",
	"605": "e",
	"606": "e",
	"607": "j",
	"608": "g",
	"609": "g",
	"610": "g",
	"613": "h",
	"614": "h",
	"616": "i",
	"618": "i",
	"619": "l",
	"620": "l",
	"621": "l",
	"623": "m",
	"624": "m",
	"625": "m",
	"626": "n",
	"627": "n",
	"628": "n",
	"629": "o",
	"633": "r",
	"634": "r",
	"635": "r",
	"636": "r",
	"637": "r",
	"638": "r",
	"639": "r",
	"640": "r",
	"641": "r",
	"642": "s",
	"647": "t",
	"648": "t",
	"649": "u",
	"651": "v",
	"652": "v",
	"653": "w",
	"654": "y",
	"655": "y",
	"656": "z",
	"657": "z",
	"663": "c",
	"665": "b",
	"666": "e",
	"667": "g",
	"668": "h",
	"669": "j",
	"670": "k",
	"671": "l",
	"672": "q",
	"686": "h",
	"688": "h",
	"690": "j",
	"691": "r",
	"692": "r",
	"694": "r",
	"695": "w",
	"696": "y",
	"737": "l",
	"738": "s",
	"739": "x",
	"780": "v",
	"829": "x",
	"851": "x",
	"867": "a",
	"868": "e",
	"869": "i",
	"870": "o",
	"871": "u",
	"872": "c",
	"873": "d",
	"874": "h",
	"875": "m",
	"876": "r",
	"877": "t",
	"878": "v",
	"879": "x",
	"7424": "a",
	"7427": "b",
	"7428": "c",
	"7429": "d",
	"7431": "e",
	"7432": "e",
	"7433": "i",
	"7434": "j",
	"7435": "k",
	"7436": "l",
	"7437": "m",
	"7438": "n",
	"7439": "o",
	"7440": "o",
	"7441": "o",
	"7442": "o",
	"7443": "o",
	"7446": "o",
	"7447": "o",
	"7448": "p",
	"7449": "r",
	"7450": "r",
	"7451": "t",
	"7452": "u",
	"7453": "u",
	"7454": "u",
	"7455": "m",
	"7456": "v",
	"7457": "w",
	"7458": "z",
	"7522": "i",
	"7523": "r",
	"7524": "u",
	"7525": "v",
	"7680": "A",
	"7681": "a",
	"7682": "B",
	"7683": "b",
	"7684": "B",
	"7685": "b",
	"7686": "B",
	"7687": "b",
	"7690": "D",
	"7691": "d",
	"7692": "D",
	"7693": "d",
	"7694": "D",
	"7695": "d",
	"7696": "D",
	"7697": "d",
	"7698": "D",
	"7699": "d",
	"7704": "E",
	"7705": "e",
	"7706": "E",
	"7707": "e",
	"7710": "F",
	"7711": "f",
	"7712": "G",
	"7713": "g",
	"7714": "H",
	"7715": "h",
	"7716": "H",
	"7717": "h",
	"7718": "H",
	"7719": "h",
	"7720": "H",
	"7721": "h",
	"7722": "H",
	"7723": "h",
	"7724": "I",
	"7725": "i",
	"7728": "K",
	"7729": "k",
	"7730": "K",
	"7731": "k",
	"7732": "K",
	"7733": "k",
	"7734": "L",
	"7735": "l",
	"7738": "L",
	"7739": "l",
	"7740": "L",
	"7741": "l",
	"7742": "M",
	"7743": "m",
	"7744": "M",
	"7745": "m",
	"7746": "M",
	"7747": "m",
	"7748": "N",
	"7749": "n",
	"7750": "N",
	"7751": "n",
	"7752": "N",
	"7753": "n",
	"7754": "N",
	"7755": "n",
	"7764": "P",
	"7765": "p",
	"7766": "P",
	"7767": "p",
	"7768": "R",
	"7769": "r",
	"7770": "R",
	"7771": "r",
	"7774": "R",
	"7775": "r",
	"7776": "S",
	"7777": "s",
	"7778": "S",
	"7779": "s",
	"7786": "T",
	"7787": "t",
	"7788": "T",
	"7789": "t",
	"7790": "T",
	"7791": "t",
	"7792": "T",
	"7793": "t",
	"7794": "U",
	"7795": "u",
	"7796": "U",
	"7797": "u",
	"7798": "U",
	"7799": "u",
	"7804": "V",
	"7805": "v",
	"7806": "V",
	"7807": "v",
	"7808": "W",
	"7809": "w",
	"7810": "W",
	"7811": "w",
	"7812": "W",
	"7813": "w",
	"7814": "W",
	"7815": "w",
	"7816": "W",
	"7817": "w",
	"7818": "X",
	"7819": "x",
	"7820": "X",
	"7821": "x",
	"7822": "Y",
	"7823": "y",
	"7824": "Z",
	"7825": "z",
	"7826": "Z",
	"7827": "z",
	"7828": "Z",
	"7829": "z",
	"7835": "s",
	"7840": "A",
	"7841": "a",
	"7842": "A",
	"7843": "a",
	"7864": "E",
	"7865": "e",
	"7866": "E",
	"7867": "e",
	"7868": "E",
	"7869": "e",
	"7880": "I",
	"7881": "i",
	"7882": "I",
	"7883": "i",
	"7884": "O",
	"7885": "o",
	"7886": "O",
	"7887": "o",
	"7908": "U",
	"7909": "u",
	"7910": "U",
	"7911": "u",
	"7922": "Y",
	"7923": "y",
	"7924": "Y",
	"7925": "y",
	"7926": "Y",
	"7927": "y",
	"7928": "Y",
	"7929": "y",
	"8305": "i",
	"8341": "h",
	"8342": "k",
	"8343": "l",
	"8344": "m",
	"8345": "n",
	"8346": "p",
	"8347": "s",
	"8348": "t",
	"8450": "c",
	"8458": "g",
	"8459": "h",
	"8460": "h",
	"8461": "h",
	"8464": "i",
	"8465": "i",
	"8466": "l",
	"8467": "l",
	"8468": "l",
	"8469": "n",
	"8472": "p",
	"8473": "p",
	"8474": "q",
	"8475": "r",
	"8476": "r",
	"8477": "r",
	"8484": "z",
	"8488": "z",
	"8492": "b",
	"8493": "c",
	"8495": "e",
	"8496": "e",
	"8497": "f",
	"8498": "F",
	"8499": "m",
	"8500": "o",
	"8506": "q",
	"8513": "g",
	"8514": "l",
	"8515": "l",
	"8516": "y",
	"8517": "d",
	"8518": "d",
	"8519": "e",
	"8520": "i",
	"8521": "j",
	"8526": "f",
	"8579": "C",
	"8580": "c",
	"8765": "s",
	"8766": "s",
	"8959": "z",
	"8999": "x",
	"9746": "x",
	"9776": "i",
	"9866": "i",
	"10005": "x",
	"10006": "x",
	"10007": "x",
	"10008": "x",
	"10625": "z",
	"10626": "z",
	"11362": "L",
	"11364": "R",
	"11365": "a",
	"11366": "t",
	"11373": "A",
	"11374": "M",
	"11375": "A",
	"11390": "S",
	"11391": "Z",
	"19904": "i",
	"42893": "H",
	"42922": "H",
	"42923": "E",
	"42924": "G",
	"42925": "L",
	"42928": "K",
	"42929": "T",
	"62937": "x"
};

(function (module) {
(function(global, factory) {
  if (module.exports) {
    module.exports = factory(global, global.document);
  } else {
      global.normalize = factory(global, global.document);
  }
} (typeof window !== 'undefined' ? window : commonjsGlobal, function (window, document) {
  var charmap = require$$0;
  var regex = null;
  var current_charmap;
  var old_charmap;

  function normalize(str, custom_charmap) {
    old_charmap = current_charmap;
    current_charmap = custom_charmap || charmap;

    regex = (regex && old_charmap === current_charmap) ? regex : buildRegExp(current_charmap);

    return str.replace(regex, function(charToReplace) {
      return current_charmap[charToReplace.charCodeAt(0)] || charToReplace;
    });
  }

  function buildRegExp(charmap){
     return new RegExp('[' + Object.keys(charmap).map(function(code) {return String.fromCharCode(code); }).join(' ') + ']', 'g');
   }

  return normalize;
}));
}(normalizeStrings));

var abalone = 4;
var abare = 3;
var abbruzzese = 4;
var abed = 2;
var aborigine = 5;
var abruzzese = 4;
var acreage = 3;
var adame = 3;
var adieu = 2;
var adobe = 3;
var anemone = 4;
var apache = 3;
var aphrodite = 4;
var apostrophe = 4;
var ariadne = 4;
var cafe = 2;
var calliope = 4;
var catastrophe = 4;
var chile = 2;
var chloe = 2;
var circe = 2;
var coyote = 3;
var daphne = 2;
var epitome = 4;
var eurydice = 4;
var euterpe = 3;
var every = 2;
var everywhere = 3;
var forever = 3;
var gethsemane = 4;
var guacamole = 4;
var hermione = 4;
var hyperbole = 4;
var jesse = 2;
var jukebox = 2;
var karate = 3;
var machete = 3;
var maybe = 2;
var newlywed = 3;
var penelope = 4;
var people = 2;
var persephone = 4;
var phoebe = 2;
var pulse = 1;
var queue = 1;
var recipe = 3;
var riverbed = 3;
var sesame = 3;
var shoreline = 2;
var simile = 3;
var snuffleupagus = 5;
var sometimes = 2;
var syncope = 3;
var tamale = 3;
var waterbed = 3;
var wednesday = 2;
var yosemite = 4;
var zoe = 2;
var require$$2 = {
	abalone: abalone,
	abare: abare,
	abbruzzese: abbruzzese,
	abed: abed,
	aborigine: aborigine,
	abruzzese: abruzzese,
	acreage: acreage,
	adame: adame,
	adieu: adieu,
	adobe: adobe,
	anemone: anemone,
	apache: apache,
	aphrodite: aphrodite,
	apostrophe: apostrophe,
	ariadne: ariadne,
	cafe: cafe,
	calliope: calliope,
	catastrophe: catastrophe,
	chile: chile,
	chloe: chloe,
	circe: circe,
	coyote: coyote,
	daphne: daphne,
	epitome: epitome,
	eurydice: eurydice,
	euterpe: euterpe,
	every: every,
	everywhere: everywhere,
	forever: forever,
	gethsemane: gethsemane,
	guacamole: guacamole,
	hermione: hermione,
	hyperbole: hyperbole,
	jesse: jesse,
	jukebox: jukebox,
	karate: karate,
	machete: machete,
	maybe: maybe,
	newlywed: newlywed,
	penelope: penelope,
	people: people,
	persephone: persephone,
	phoebe: phoebe,
	pulse: pulse,
	queue: queue,
	recipe: recipe,
	riverbed: riverbed,
	sesame: sesame,
	shoreline: shoreline,
	simile: simile,
	snuffleupagus: snuffleupagus,
	sometimes: sometimes,
	syncope: syncope,
	tamale: tamale,
	waterbed: waterbed,
	wednesday: wednesday,
	yosemite: yosemite,
	zoe: zoe
};

var pluralize$2 = pluralize$3.exports;
var normalize = normalizeStrings.exports;
var problematic = require$$2;

var syllable_1 = syllables;

var own = {}.hasOwnProperty;

// Two expressions of occurrences which normally would be counted as two
// syllables, but should be counted as one.
var EXPRESSION_MONOSYLLABIC_ONE = new RegExp(
  [
    'cia(?:l|$)',
    'tia',
    'cius',
    'cious',
    '[^aeiou]giu',
    '[aeiouy][^aeiouy]ion',
    'iou',
    'sia$',
    'eous$',
    '[oa]gue$',
    '.[^aeiuoycgltdb]{2,}ed$',
    '.ely$',
    '^jua',
    'uai',
    'eau',
    '^busi$',
    '(?:[aeiouy](?:' +
      [
        '[bcfgklmnprsvwxyz]',
        'ch',
        'dg',
        'g[hn]',
        'lch',
        'l[lv]',
        'mm',
        'nch',
        'n[cgn]',
        'r[bcnsv]',
        'squ',
        's[chkls]',
        'th'
      ].join('|') +
      ')ed$)',
    '(?:[aeiouy](?:' +
      [
        '[bdfklmnprstvy]',
        'ch',
        'g[hn]',
        'lch',
        'l[lv]',
        'mm',
        'nch',
        'nn',
        'r[nsv]',
        'squ',
        's[cklst]',
        'th'
      ].join('|') +
      ')es$)'
  ].join('|'),
  'g'
);

var EXPRESSION_MONOSYLLABIC_TWO = new RegExp(
  '[aeiouy](?:' +
    [
      '[bcdfgklmnprstvyz]',
      'ch',
      'dg',
      'g[hn]',
      'l[lv]',
      'mm',
      'n[cgn]',
      'r[cnsv]',
      'squ',
      's[cklst]',
      'th'
    ].join('|') +
    ')e$',
  'g'
);

// Four expression of occurrences which normally would be counted as one
// syllable, but should be counted as two.
var EXPRESSION_DOUBLE_SYLLABIC_ONE = new RegExp(
  '(?:' +
    [
      '([^aeiouy])\\1l',
      '[^aeiouy]ie(?:r|s?t)',
      '[aeiouym]bl',
      'eo',
      'ism',
      'asm',
      'thm',
      'dnt',
      'snt',
      'uity',
      'dea',
      'gean',
      'oa',
      'ua',
      'react?',
      'orbed', // Cancel `'.[^aeiuoycgltdb]{2,}ed$',`
      'eings?',
      '[aeiouy]sh?e[rs]'
    ].join('|') +
    ')$',
  'g'
);

var EXPRESSION_DOUBLE_SYLLABIC_TWO = new RegExp(
  [
    'creat(?!u)',
    '[^gq]ua[^auieo]',
    '[aeiou]{3}',
    '^(?:ia|mc|coa[dglx].)',
    '^re(app|es|im|us)'
  ].join('|'),
  'g'
);

var EXPRESSION_DOUBLE_SYLLABIC_THREE = new RegExp(
  [
    '[^aeiou]y[ae]',
    '[^l]lien',
    'riet',
    'dien',
    'iu',
    'io',
    'ii',
    'uen',
    'real',
    'iell',
    'eo[^aeiou]',
    '[aeiou]y[aeiou]'
  ].join('|'),
  'g'
);

var EXPRESSION_DOUBLE_SYLLABIC_FOUR = /[^s]ia/;

// Expression to match single syllable pre- and suffixes.
var EXPRESSION_SINGLE = new RegExp(
  [
    '^(?:' +
      [
        'un',
        'fore',
        'ware',
        'none?',
        'out',
        'post',
        'sub',
        'pre',
        'pro',
        'dis',
        'side',
        'some'
      ].join('|') +
      ')',
    '(?:' +
      [
        'ly',
        'less',
        'some',
        'ful',
        'ers?',
        'ness',
        'cians?',
        'ments?',
        'ettes?',
        'villes?',
        'ships?',
        'sides?',
        'ports?',
        'shires?',
        'tion(?:ed|s)?'
      ].join('|') +
      ')$'
  ].join('|'),
  'g'
);

// Expression to match double syllable pre- and suffixes.
var EXPRESSION_DOUBLE = new RegExp(
  [
    '^' +
      '(?:' +
      [
        'above',
        'anti',
        'ante',
        'counter',
        'hyper',
        'afore',
        'agri',
        'infra',
        'intra',
        'inter',
        'over',
        'semi',
        'ultra',
        'under',
        'extra',
        'dia',
        'micro',
        'mega',
        'kilo',
        'pico',
        'nano',
        'macro',
        'somer'
      ].join('|') +
      ')',
    '(?:' + ['fully', 'berry', 'woman', 'women', 'edly'].join('|') + ')$'
  ].join('|'),
  'g'
);

// Expression to match triple syllable suffixes.
var EXPRESSION_TRIPLE = /(creations?|ology|ologist|onomy|onomist)$/g;

// Expression to split on word boundaries.
var SPLIT = /\b/g;

// Expression to merge elision.
var APOSTROPHE = /['’]/g;

// Expression to remove non-alphabetic characters from a given value.
var EXPRESSION_NONALPHABETIC = /[^a-z]/g;

// Wrapper to support multiple word-parts (GH-11).
function syllables(value) {
  var values = normalize(String(value))
    .toLowerCase()
    .replace(APOSTROPHE, '')
    .split(SPLIT);
  var length = values.length;
  var index = -1;
  var total = 0;

  while (++index < length) {
    total += syllable$1(values[index].replace(EXPRESSION_NONALPHABETIC, ''));
  }

  return total
}

// Get syllables in a given value.
function syllable$1(value) {
  var count = 0;
  var index;
  var length;
  var singular;
  var parts;
  var addOne;
  var subtractOne;

  if (value.length === 0) {
    return count
  }

  // Return early when possible.
  if (value.length < 3) {
    return 1
  }

  // If `value` is a hard to count, it might be in `problematic`.
  if (own.call(problematic, value)) {
    return problematic[value]
  }

  // Additionally, the singular word might be in `problematic`.
  singular = pluralize$2(value, 1);

  if (own.call(problematic, singular)) {
    return problematic[singular]
  }

  addOne = returnFactory(1);
  subtractOne = returnFactory(-1);

  // Count some prefixes and suffixes, and remove their matched ranges.
  value = value
    .replace(EXPRESSION_TRIPLE, countFactory(3))
    .replace(EXPRESSION_DOUBLE, countFactory(2))
    .replace(EXPRESSION_SINGLE, countFactory(1));

  // Count multiple consonants.
  parts = value.split(/[^aeiouy]+/);
  index = -1;
  length = parts.length;

  while (++index < length) {
    if (parts[index] !== '') {
      count++;
    }
  }

  // Subtract one for occurrences which should be counted as one (but are
  // counted as two).
  value
    .replace(EXPRESSION_MONOSYLLABIC_ONE, subtractOne)
    .replace(EXPRESSION_MONOSYLLABIC_TWO, subtractOne);

  // Add one for occurrences which should be counted as two (but are counted as
  // one).
  value
    .replace(EXPRESSION_DOUBLE_SYLLABIC_ONE, addOne)
    .replace(EXPRESSION_DOUBLE_SYLLABIC_TWO, addOne)
    .replace(EXPRESSION_DOUBLE_SYLLABIC_THREE, addOne)
    .replace(EXPRESSION_DOUBLE_SYLLABIC_FOUR, addOne);

  // Make sure at least on is returned.
  return count || 1

  // Define scoped counters, to be used in `String#replace()` calls.
  // The scoped counter removes the matched value from the input.
  function countFactory(addition) {
    return counter
    function counter() {
      count += addition;
      return ''
    }
  }

  // Define scoped counters, to be used in `String#replace()` calls.
  // The scoped counter does not remove the matched value from the input.
  function returnFactory(addition) {
    return returner
    function returner($0) {
      count += addition;
      return $0
    }
  }
}

var pluralize$1 = {exports: {}};

/* global define */

(function (module, exports) {
(function (root, pluralize) {
  /* istanbul ignore else */
  if (typeof commonjsRequire === 'function' && 'object' === 'object' && 'object' === 'object') {
    // Node.
    module.exports = pluralize();
  } else {
    // Browser global.
    root.pluralize = pluralize();
  }
})(commonjsGlobal, function () {
  // Rule storage - pluralize and singularize need to be run sequentially,
  // while other rules can be optimized using an object for instant lookups.
  var pluralRules = [];
  var singularRules = [];
  var uncountables = {};
  var irregularPlurals = {};
  var irregularSingles = {};

  /**
   * Sanitize a pluralization rule to a usable regular expression.
   *
   * @param  {(RegExp|string)} rule
   * @return {RegExp}
   */
  function sanitizeRule (rule) {
    if (typeof rule === 'string') {
      return new RegExp('^' + rule + '$', 'i');
    }

    return rule;
  }

  /**
   * Pass in a word token to produce a function that can replicate the case on
   * another word.
   *
   * @param  {string}   word
   * @param  {string}   token
   * @return {Function}
   */
  function restoreCase (word, token) {
    // Tokens are an exact match.
    if (word === token) return token;

    // Lower cased words. E.g. "hello".
    if (word === word.toLowerCase()) return token.toLowerCase();

    // Upper cased words. E.g. "WHISKY".
    if (word === word.toUpperCase()) return token.toUpperCase();

    // Title cased words. E.g. "Title".
    if (word[0] === word[0].toUpperCase()) {
      return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
    }

    // Lower cased words. E.g. "test".
    return token.toLowerCase();
  }

  /**
   * Interpolate a regexp string.
   *
   * @param  {string} str
   * @param  {Array}  args
   * @return {string}
   */
  function interpolate (str, args) {
    return str.replace(/\$(\d{1,2})/g, function (match, index) {
      return args[index] || '';
    });
  }

  /**
   * Replace a word using a rule.
   *
   * @param  {string} word
   * @param  {Array}  rule
   * @return {string}
   */
  function replace (word, rule) {
    return word.replace(rule[0], function (match, index) {
      var result = interpolate(rule[1], arguments);

      if (match === '') {
        return restoreCase(word[index - 1], result);
      }

      return restoreCase(match, result);
    });
  }

  /**
   * Sanitize a word by passing in the word and sanitization rules.
   *
   * @param  {string}   token
   * @param  {string}   word
   * @param  {Array}    rules
   * @return {string}
   */
  function sanitizeWord (token, word, rules) {
    // Empty string or doesn't need fixing.
    if (!token.length || uncountables.hasOwnProperty(token)) {
      return word;
    }

    var len = rules.length;

    // Iterate over the sanitization rules and use the first one to match.
    while (len--) {
      var rule = rules[len];

      if (rule[0].test(word)) return replace(word, rule);
    }

    return word;
  }

  /**
   * Replace a word with the updated word.
   *
   * @param  {Object}   replaceMap
   * @param  {Object}   keepMap
   * @param  {Array}    rules
   * @return {Function}
   */
  function replaceWord (replaceMap, keepMap, rules) {
    return function (word) {
      // Get the correct token and case restoration functions.
      var token = word.toLowerCase();

      // Check against the keep object map.
      if (keepMap.hasOwnProperty(token)) {
        return restoreCase(word, token);
      }

      // Check against the replacement map for a direct word replacement.
      if (replaceMap.hasOwnProperty(token)) {
        return restoreCase(word, replaceMap[token]);
      }

      // Run all the rules against the word.
      return sanitizeWord(token, word, rules);
    };
  }

  /**
   * Check if a word is part of the map.
   */
  function checkWord (replaceMap, keepMap, rules, bool) {
    return function (word) {
      var token = word.toLowerCase();

      if (keepMap.hasOwnProperty(token)) return true;
      if (replaceMap.hasOwnProperty(token)) return false;

      return sanitizeWord(token, token, rules) === token;
    };
  }

  /**
   * Pluralize or singularize a word based on the passed in count.
   *
   * @param  {string}  word      The word to pluralize
   * @param  {number}  count     How many of the word exist
   * @param  {boolean} inclusive Whether to prefix with the number (e.g. 3 ducks)
   * @return {string}
   */
  function pluralize (word, count, inclusive) {
    var pluralized = count === 1
      ? pluralize.singular(word) : pluralize.plural(word);

    return (inclusive ? count + ' ' : '') + pluralized;
  }

  /**
   * Pluralize a word.
   *
   * @type {Function}
   */
  pluralize.plural = replaceWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Check if a word is plural.
   *
   * @type {Function}
   */
  pluralize.isPlural = checkWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Singularize a word.
   *
   * @type {Function}
   */
  pluralize.singular = replaceWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Check if a word is singular.
   *
   * @type {Function}
   */
  pluralize.isSingular = checkWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Add a pluralization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addPluralRule = function (rule, replacement) {
    pluralRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add a singularization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addSingularRule = function (rule, replacement) {
    singularRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add an uncountable word rule.
   *
   * @param {(string|RegExp)} word
   */
  pluralize.addUncountableRule = function (word) {
    if (typeof word === 'string') {
      uncountables[word.toLowerCase()] = true;
      return;
    }

    // Set singular and plural references for the word.
    pluralize.addPluralRule(word, '$0');
    pluralize.addSingularRule(word, '$0');
  };

  /**
   * Add an irregular word definition.
   *
   * @param {string} single
   * @param {string} plural
   */
  pluralize.addIrregularRule = function (single, plural) {
    plural = plural.toLowerCase();
    single = single.toLowerCase();

    irregularSingles[single] = plural;
    irregularPlurals[plural] = single;
  };

  /**
   * Irregular rules.
   */
  [
    // Pronouns.
    ['I', 'we'],
    ['me', 'us'],
    ['he', 'they'],
    ['she', 'they'],
    ['them', 'them'],
    ['myself', 'ourselves'],
    ['yourself', 'yourselves'],
    ['itself', 'themselves'],
    ['herself', 'themselves'],
    ['himself', 'themselves'],
    ['themself', 'themselves'],
    ['is', 'are'],
    ['was', 'were'],
    ['has', 'have'],
    ['this', 'these'],
    ['that', 'those'],
    // Words ending in with a consonant and `o`.
    ['echo', 'echoes'],
    ['dingo', 'dingoes'],
    ['volcano', 'volcanoes'],
    ['tornado', 'tornadoes'],
    ['torpedo', 'torpedoes'],
    // Ends with `us`.
    ['genus', 'genera'],
    ['viscus', 'viscera'],
    // Ends with `ma`.
    ['stigma', 'stigmata'],
    ['stoma', 'stomata'],
    ['dogma', 'dogmata'],
    ['lemma', 'lemmata'],
    ['schema', 'schemata'],
    ['anathema', 'anathemata'],
    // Other irregular rules.
    ['ox', 'oxen'],
    ['axe', 'axes'],
    ['die', 'dice'],
    ['yes', 'yeses'],
    ['foot', 'feet'],
    ['eave', 'eaves'],
    ['goose', 'geese'],
    ['tooth', 'teeth'],
    ['quiz', 'quizzes'],
    ['human', 'humans'],
    ['proof', 'proofs'],
    ['carve', 'carves'],
    ['valve', 'valves'],
    ['looey', 'looies'],
    ['thief', 'thieves'],
    ['groove', 'grooves'],
    ['pickaxe', 'pickaxes'],
    ['passerby', 'passersby']
  ].forEach(function (rule) {
    return pluralize.addIrregularRule(rule[0], rule[1]);
  });

  /**
   * Pluralization rules.
   */
  [
    [/s?$/i, 's'],
    [/[^\u0000-\u007F]$/i, '$0'],
    [/([^aeiou]ese)$/i, '$1'],
    [/(ax|test)is$/i, '$1es'],
    [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, '$1es'],
    [/(e[mn]u)s?$/i, '$1s'],
    [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, '$1'],
    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
    [/(seraph|cherub)(?:im)?$/i, '$1im'],
    [/(her|at|gr)o$/i, '$1oes'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
    [/sis$/i, 'ses'],
    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
    [/([^aeiouy]|qu)y$/i, '$1ies'],
    [/([^ch][ieo][ln])ey$/i, '$1ies'],
    [/(x|ch|ss|sh|zz)$/i, '$1es'],
    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
    [/\b((?:tit)?m|l)(?:ice|ouse)$/i, '$1ice'],
    [/(pe)(?:rson|ople)$/i, '$1ople'],
    [/(child)(?:ren)?$/i, '$1ren'],
    [/eaux$/i, '$0'],
    [/m[ae]n$/i, 'men'],
    ['thou', 'you']
  ].forEach(function (rule) {
    return pluralize.addPluralRule(rule[0], rule[1]);
  });

  /**
   * Singularization rules.
   */
  [
    [/s$/i, ''],
    [/(ss)$/i, '$1'],
    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
    [/ies$/i, 'y'],
    [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],
    [/\b(mon|smil)ies$/i, '$1ey'],
    [/\b((?:tit)?m|l)ice$/i, '$1ouse'],
    [/(seraph|cherub)im$/i, '$1'],
    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, '$1'],
    [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, '$1sis'],
    [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
    [/(test)(?:is|es)$/i, '$1is'],
    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
    [/(alumn|alg|vertebr)ae$/i, '$1a'],
    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
    [/(matr|append)ices$/i, '$1ix'],
    [/(pe)(rson|ople)$/i, '$1rson'],
    [/(child)ren$/i, '$1'],
    [/(eau)x?$/i, '$1'],
    [/men$/i, 'man']
  ].forEach(function (rule) {
    return pluralize.addSingularRule(rule[0], rule[1]);
  });

  /**
   * Uncountable rules.
   */
  [
    // Singular words with no plurals.
    'adulthood',
    'advice',
    'agenda',
    'aid',
    'aircraft',
    'alcohol',
    'ammo',
    'analytics',
    'anime',
    'athletics',
    'audio',
    'bison',
    'blood',
    'bream',
    'buffalo',
    'butter',
    'carp',
    'cash',
    'chassis',
    'chess',
    'clothing',
    'cod',
    'commerce',
    'cooperation',
    'corps',
    'debris',
    'diabetes',
    'digestion',
    'elk',
    'energy',
    'equipment',
    'excretion',
    'expertise',
    'firmware',
    'flounder',
    'fun',
    'gallows',
    'garbage',
    'graffiti',
    'hardware',
    'headquarters',
    'health',
    'herpes',
    'highjinks',
    'homework',
    'housework',
    'information',
    'jeans',
    'justice',
    'kudos',
    'labour',
    'literature',
    'machinery',
    'mackerel',
    'mail',
    'media',
    'mews',
    'moose',
    'music',
    'mud',
    'manga',
    'news',
    'only',
    'personnel',
    'pike',
    'plankton',
    'pliers',
    'police',
    'pollution',
    'premises',
    'rain',
    'research',
    'rice',
    'salmon',
    'scissors',
    'series',
    'sewage',
    'shambles',
    'shrimp',
    'software',
    'species',
    'staff',
    'swine',
    'tennis',
    'traffic',
    'transportation',
    'trout',
    'tuna',
    'wealth',
    'welfare',
    'whiting',
    'wildebeest',
    'wildlife',
    'you',
    /pok[eé]mon$/i,
    // Regexes.
    /[^aeiou]ese$/i, // "chinese", "japanese"
    /deer$/i, // "deer", "reindeer"
    /fish$/i, // "fish", "blowfish", "angelfish"
    /measles$/i,
    /o[iu]s$/i, // "carnivorous"
    /pox$/i, // "chickpox", "smallpox"
    /sheep$/i
  ].forEach(pluralize.addUncountableRule);

  return pluralize;
});
}(pluralize$1));

const easyWords$1 = [
  "a",
  "able",
  "aboard",
  "about",
  "above",
  "absent",
  "accept",
  "accident",
  "account",
  "ache",
  "aching",
  "acorn",
  "acre",
  "across",
  "act",
  "acts",
  "add",
  "address",
  "admire",
  "adventure",
  "afar",
  "afraid",
  "after",
  "afternoon",
  "afterward",
  "afterwards",
  "again",
  "against",
  "age",
  "aged",
  "ago",
  "agree",
  "ah",
  "ahead",
  "aid",
  "aim",
  "air",
  "airfield",
  "airplane",
  "airport",
  "airship",
  "airy",
  "alarm",
  "alike",
  "alive",
  "all",
  "alley",
  "alligator",
  "allow",
  "almost",
  "alone",
  "along",
  "aloud",
  "already",
  "also",
  "always",
  "am",
  "america",
  "american",
  "among",
  "amount",
  "an",
  "and",
  "angel",
  "anger",
  "angry",
  "animal",
  "another",
  "answer",
  "ant",
  "any",
  "anybody",
  "anyhow",
  "anyone",
  "anything",
  "anyway",
  "anywhere",
  "apart",
  "apartment",
  "ape",
  "apiece",
  "appear",
  "apple",
  "april",
  "apron",
  "are",
  "aren't",
  "arise",
  "arithmetic",
  "arm",
  "armful",
  "army",
  "arose",
  "around",
  "arrange",
  "arrive",
  "arrived",
  "arrow",
  "art",
  "artist",
  "as",
  "ash",
  "ashes",
  "aside",
  "ask",
  "asleep",
  "at",
  "ate",
  "attack",
  "attend",
  "attention",
  "august",
  "aunt",
  "author",
  "auto",
  "automobile",
  "autumn",
  "avenue",
  "awake",
  "awaken",
  "away",
  "awful",
  "awfully",
  "awhile",
  "ax",
  "axe",
  "baa",
  "babe",
  "babies",
  "back",
  "background",
  "backward",
  "backwards",
  "bacon",
  "bad",
  "badge",
  "badly",
  "bag",
  "bake",
  "baker",
  "bakery",
  "baking",
  "ball",
  "balloon",
  "banana",
  "band",
  "bandage",
  "bang",
  "banjo",
  "bank",
  "banker",
  "bar",
  "barber",
  "bare",
  "barefoot",
  "barely",
  "bark",
  "barn",
  "barrel",
  "base",
  "baseball",
  "basement",
  "basket",
  "bat",
  "batch",
  "bath",
  "bathe",
  "bathing",
  "bathroom",
  "bathtub",
  "battle",
  "battleship",
  "bay",
  "be",
  "beach",
  "bead",
  "beam",
  "bean",
  "bear",
  "beard",
  "beast",
  "beat",
  "beating",
  "beautiful",
  "beautify",
  "beauty",
  "became",
  "because",
  "become",
  "becoming",
  "bed",
  "bedbug",
  "bedroom",
  "bedspread",
  "bedtime",
  "bee",
  "beech",
  "beef",
  "beefsteak",
  "beehive",
  "been",
  "beer",
  "beet",
  "before",
  "beg",
  "began",
  "beggar",
  "begged",
  "begin",
  "beginning",
  "begun",
  "behave",
  "behind",
  "being",
  "believe",
  "bell",
  "belong",
  "below",
  "belt",
  "bench",
  "bend",
  "beneath",
  "bent",
  "berries",
  "berry",
  "beside",
  "besides",
  "best",
  "bet",
  "better",
  "between",
  "bib",
  "bible",
  "bicycle",
  "bid",
  "big",
  "bigger",
  "bill",
  "billboard",
  "bin",
  "bind",
  "bird",
  "birth",
  "birthday",
  "biscuit",
  "bit",
  "bite",
  "biting",
  "bitter",
  "black",
  "blackberry",
  "blackbird",
  "blackboard",
  "blackness",
  "blacksmith",
  "blame",
  "blank",
  "blanket",
  "blast",
  "blaze",
  "bleed",
  "bless",
  "blessing",
  "blew",
  "blind",
  "blindfold",
  "blinds",
  "block",
  "blood",
  "bloom",
  "blossom",
  "blot",
  "blow",
  "blue",
  "blueberry",
  "bluebird",
  "blush",
  "board",
  "boast",
  "boat",
  "bob",
  "bobwhite",
  "bodies",
  "body",
  "boil",
  "boiler",
  "bold",
  "bone",
  "bonnet",
  "boo",
  "book",
  "bookcase",
  "bookkeeper",
  "boom",
  "boot",
  "born",
  "borrow",
  "boss",
  "both",
  "bother",
  "bottle",
  "bottom",
  "bought",
  "bounce",
  "bow",
  "bowl",
  "bow-wow",
  "box",
  "boxcar",
  "boxer",
  "boxes",
  "boy",
  "boyhood",
  "bracelet",
  "brain",
  "brake",
  "bran",
  "branch",
  "brass",
  "brave",
  "bread",
  "break",
  "breakfast",
  "breast",
  "breath",
  "breathe",
  "breeze",
  "brick",
  "bride",
  "bridge",
  "bright",
  "brightness",
  "bring",
  "broad",
  "broadcast",
  "broke",
  "broken",
  "brook",
  "broom",
  "brother",
  "brought",
  "brown",
  "brush",
  "bubble",
  "bucket",
  "buckle",
  "bud",
  "buffalo",
  "bug",
  "buggy",
  "build",
  "building",
  "built",
  "bulb",
  "bull",
  "bullet",
  "bum",
  "bumblebee",
  "bump",
  "bun",
  "bunch",
  "bundle",
  "bunny",
  "burn",
  "burst",
  "bury",
  "bus",
  "bush",
  "bushel",
  "business",
  "busy",
  "but",
  "butcher",
  "butt",
  "butter",
  "buttercup",
  "butterfly",
  "buttermilk",
  "butterscotch",
  "button",
  "buttonhole",
  "buy",
  "buzz",
  "by",
  "bye",
  "cab",
  "cabbage",
  "cabin",
  "cabinet",
  "cackle",
  "cage",
  "cake",
  "calendar",
  "calf",
  "call",
  "caller",
  "calling",
  "came",
  "camel",
  "camp",
  "campfire",
  "can",
  "canal",
  "canary",
  "candle",
  "candlestick",
  "candy",
  "cane",
  "cannon",
  "cannot",
  "canoe",
  "can't",
  "canyon",
  "cap",
  "cape",
  "capital",
  "captain",
  "car",
  "card",
  "cardboard",
  "care",
  "careful",
  "careless",
  "carelessness",
  "carload",
  "carpenter",
  "carpet",
  "carriage",
  "carrot",
  "carry",
  "cart",
  "carve",
  "case",
  "cash",
  "cashier",
  "castle",
  "cat",
  "catbird",
  "catch",
  "catcher",
  "caterpillar",
  "catfish",
  "catsup",
  "cattle",
  "caught",
  "cause",
  "cave",
  "ceiling",
  "cell",
  "cellar",
  "cent",
  "center",
  "cereal",
  "certain",
  "certainly",
  "chain",
  "chair",
  "chalk",
  "champion",
  "chance",
  "change",
  "chap",
  "charge",
  "charm",
  "chart",
  "chase",
  "chatter",
  "cheap",
  "cheat",
  "check",
  "checkers",
  "cheek",
  "cheer",
  "cheese",
  "cherry",
  "chest",
  "chew",
  "chick",
  "chicken",
  "chief",
  "child",
  "childhood",
  "children",
  "chill",
  "chilly",
  "chimney",
  "chin",
  "china",
  "chip",
  "chipmunk",
  "chocolate",
  "choice",
  "choose",
  "chop",
  "chorus",
  "chose",
  "chosen",
  "christen",
  "christmas",
  "church",
  "churn",
  "cigarette",
  "circle",
  "circus",
  "citizen",
  "city",
  "clang",
  "clap",
  "class",
  "classmate",
  "classroom",
  "claw",
  "clay",
  "clean",
  "cleaner",
  "clear",
  "clerk",
  "clever",
  "click",
  "cliff",
  "climb",
  "clip",
  "cloak",
  "clock",
  "close",
  "closet",
  "cloth",
  "clothes",
  "clothing",
  "cloud",
  "cloudy",
  "clover",
  "clown",
  "club",
  "cluck",
  "clump",
  "coach",
  "coal",
  "coast",
  "coat",
  "cob",
  "cobbler",
  "cocoa",
  "coconut",
  "cocoon",
  "cod",
  "codfish",
  "coffee",
  "coffeepot",
  "coin",
  "cold",
  "collar",
  "college",
  "color",
  "colored",
  "colt",
  "column",
  "comb",
  "come",
  "comfort",
  "comic",
  "coming",
  "company",
  "compare",
  "conductor",
  "cone",
  "connect",
  "coo",
  "cook",
  "cooked",
  "cooking",
  "cookie",
  "cookies",
  "cool",
  "cooler",
  "coop",
  "copper",
  "copy",
  "cord",
  "cork",
  "corn",
  "corner",
  "correct",
  "cost",
  "cot",
  "cottage",
  "cotton",
  "couch",
  "cough",
  "could",
  "couldn't",
  "count",
  "counter",
  "country",
  "county",
  "course",
  "court",
  "cousin",
  "cover",
  "cow",
  "coward",
  "cowardly",
  "cowboy",
  "cozy",
  "crab",
  "crack",
  "cracker",
  "cradle",
  "cramps",
  "cranberry",
  "crank",
  "cranky",
  "crash",
  "crawl",
  "crazy",
  "cream",
  "creamy",
  "creek",
  "creep",
  "crept",
  "cried",
  "croak",
  "crook",
  "crooked",
  "crop",
  "cross",
  "crossing",
  "cross-eyed",
  "crow",
  "crowd",
  "crowded",
  "crown",
  "cruel",
  "crumb",
  "crumble",
  "crush",
  "crust",
  "cry",
  "cries",
  "cub",
  "cuff",
  "cup",
  "cuff",
  "cup",
  "cupboard",
  "cupful",
  "cure",
  "curl",
  "curly",
  "curtain",
  "curve",
  "cushion",
  "custard",
  "customer",
  "cut",
  "cute",
  "cutting",
  "dab",
  "dad",
  "daddy",
  "daily",
  "dairy",
  "daisy",
  "dam",
  "damage",
  "dame",
  "damp",
  "dance",
  "dancer",
  "dancing",
  "dandy",
  "danger",
  "dangerous",
  "dare",
  "dark",
  "darkness",
  "darling",
  "darn",
  "dart",
  "dash",
  "date",
  "daughter",
  "dawn",
  "day",
  "daybreak",
  "daytime",
  "dead",
  "deaf",
  "deal",
  "dear",
  "death",
  "december",
  "decide",
  "deck",
  "deed",
  "deep",
  "deer",
  "defeat",
  "defend",
  "defense",
  "delight",
  "den",
  "dentist",
  "depend",
  "deposit",
  "describe",
  "desert",
  "deserve",
  "desire",
  "desk",
  "destroy",
  "devil",
  "dew",
  "diamond",
  "did",
  "didn't",
  "die",
  "died",
  "dies",
  "difference",
  "different",
  "dig",
  "dim",
  "dime",
  "dine",
  "ding-dong",
  "dinner",
  "dip",
  "direct",
  "direction",
  "dirt",
  "dirty",
  "discover",
  "dish",
  "dislike",
  "dismiss",
  "ditch",
  "dive",
  "diver",
  "divide",
  "do",
  "dock",
  "doctor",
  "does",
  "doesn't",
  "dog",
  "doll",
  "dollar",
  "dolly",
  "done",
  "donkey",
  "don't",
  "door",
  "doorbell",
  "doorknob",
  "doorstep",
  "dope",
  "dot",
  "double",
  "dough",
  "dove",
  "down",
  "downstairs",
  "downtown",
  "dozen",
  "drag",
  "drain",
  "drank",
  "draw",
  "drawer",
  "draw",
  "drawing",
  "dream",
  "dress",
  "dresser",
  "dressmaker",
  "drew",
  "dried",
  "drift",
  "drill",
  "drink",
  "drip",
  "drive",
  "driven",
  "driver",
  "drop",
  "drove",
  "drown",
  "drowsy",
  "drub",
  "drum",
  "drunk",
  "dry",
  "duck",
  "due",
  "dug",
  "dull",
  "dumb",
  "dump",
  "during",
  "dust",
  "dusty",
  "duty",
  "dwarf",
  "dwell",
  "dwelt",
  "dying",
  "each",
  "eager",
  "eagle",
  "ear",
  "early",
  "earn",
  "earth",
  "east",
  "eastern",
  "easy",
  "eat",
  "eaten",
  "edge",
  "egg",
  "eh",
  "eight",
  "eighteen",
  "eighth",
  "eighty",
  "either",
  "elbow",
  "elder",
  "eldest",
  "electric",
  "electricity",
  "elephant",
  "eleven",
  "elf",
  "elm",
  "else",
  "elsewhere",
  "empty",
  "end",
  "ending",
  "enemy",
  "engine",
  "engineer",
  "english",
  "enjoy",
  "enough",
  "enter",
  "envelope",
  "equal",
  "erase",
  "eraser",
  "errand",
  "escape",
  "eve",
  "even",
  "evening",
  "ever",
  "every",
  "everybody",
  "everyday",
  "everyone",
  "everything",
  "everywhere",
  "evil",
  "exact",
  "except",
  "exchange",
  "excited",
  "exciting",
  "excuse",
  "exit",
  "expect",
  "explain",
  "extra",
  "eye",
  "eyebrow",
  "fable",
  "face",
  "facing",
  "fact",
  "factory",
  "fail",
  "faint",
  "fair",
  "fairy",
  "faith",
  "fake",
  "fall",
  "false",
  "family",
  "fan",
  "fancy",
  "far",
  "faraway",
  "fare",
  "farmer",
  "farm",
  "farming",
  "far-off",
  "farther",
  "fashion",
  "fast",
  "fasten",
  "fat",
  "father",
  "fault",
  "favor",
  "favorite",
  "fear",
  "feast",
  "feather",
  "february",
  "fed",
  "feed",
  "feel",
  "feet",
  "fell",
  "fellow",
  "felt",
  "fence",
  "fever",
  "few",
  "fib",
  "fiddle",
  "field",
  "fife",
  "fifteen",
  "fifth",
  "fifty",
  "fig",
  "fight",
  "figure",
  "file",
  "fill",
  "film",
  "finally",
  "find",
  "fine",
  "finger",
  "finish",
  "fire",
  "firearm",
  "firecracker",
  "fireplace",
  "fireworks",
  "firing",
  "first",
  "fish",
  "fisherman",
  "fist",
  "fit",
  "fits",
  "five",
  "fix",
  "flag",
  "flake",
  "flame",
  "flap",
  "flash",
  "flashlight",
  "flat",
  "flea",
  "flesh",
  "flew",
  "flies",
  "flight",
  "flip",
  "flip-flop",
  "float",
  "flock",
  "flood",
  "floor",
  "flop",
  "flour",
  "flow",
  "flower",
  "flowery",
  "flutter",
  "fly",
  "foam",
  "fog",
  "foggy",
  "fold",
  "folks",
  "follow",
  "following",
  "fond",
  "food",
  "fool",
  "foolish",
  "foot",
  "football",
  "footprint",
  "for",
  "forehead",
  "forest",
  "forget",
  "forgive",
  "forgot",
  "forgotten",
  "fork",
  "form",
  "fort",
  "forth",
  "fortune",
  "forty",
  "forward",
  "fought",
  "found",
  "fountain",
  "four",
  "fourteen",
  "fourth",
  "fox",
  "frame",
  "free",
  "freedom",
  "freeze",
  "freight",
  "french",
  "fresh",
  "fret",
  "friday",
  "fried",
  "friend",
  "friendly",
  "friendship",
  "frighten",
  "frog",
  "from",
  "front",
  "frost",
  "frown",
  "froze",
  "fruit",
  "fry",
  "fudge",
  "fuel",
  "full",
  "fully",
  "fun",
  "funny",
  "fur",
  "furniture",
  "further",
  "fuzzy",
  "gain",
  "gallon",
  "gallop",
  "game",
  "gang",
  "garage",
  "garbage",
  "garden",
  "gas",
  "gasoline",
  "gate",
  "gather",
  "gave",
  "gay",
  "gear",
  "geese",
  "general",
  "gentle",
  "gentleman",
  "gentlemen",
  "geography",
  "get",
  "getting",
  "giant",
  "gift",
  "gingerbread",
  "girl",
  "give",
  "given",
  "giving",
  "glad",
  "gladly",
  "glance",
  "glass",
  "glasses",
  "gleam",
  "glide",
  "glory",
  "glove",
  "glow",
  "glue",
  "go",
  "going",
  "goes",
  "goal",
  "goat",
  "gobble",
  "god",
  "god",
  "godmother",
  "gold",
  "golden",
  "goldfish",
  "golf",
  "gone",
  "good",
  "goods",
  "goodbye",
  "good-by",
  "goodbye",
  "good-bye",
  "good-looking",
  "goodness",
  "goody",
  "goose",
  "gooseberry",
  "got",
  "govern",
  "government",
  "gown",
  "grab",
  "gracious",
  "grade",
  "grain",
  "grand",
  "grandchild",
  "grandchildren",
  "granddaughter",
  "grandfather",
  "grandma",
  "grandmother",
  "grandpa",
  "grandson",
  "grandstand",
  "grape",
  "grapes",
  "grapefruit",
  "grass",
  "grasshopper",
  "grateful",
  "grave",
  "gravel",
  "graveyard",
  "gravy",
  "gray",
  "graze",
  "grease",
  "great",
  "green",
  "greet",
  "grew",
  "grind",
  "groan",
  "grocery",
  "ground",
  "group",
  "grove",
  "grow",
  "guard",
  "guess",
  "guest",
  "guide",
  "gulf",
  "gum",
  "gun",
  "gunpowder",
  "guy",
  "ha",
  "habit",
  "had",
  "hadn't",
  "hail",
  "hair",
  "haircut",
  "hairpin",
  "half",
  "hall",
  "halt",
  "ham",
  "hammer",
  "hand",
  "handful",
  "handkerchief",
  "handle",
  "handwriting",
  "hang",
  "happen",
  "happily",
  "happiness",
  "happy",
  "harbor",
  "hard",
  "hardly",
  "hardship",
  "hardware",
  "hare",
  "hark",
  "harm",
  "harness",
  "harp",
  "harvest",
  "has",
  "hasn't",
  "haste",
  "hasten",
  "hasty",
  "hat",
  "hatch",
  "hatchet",
  "hate",
  "haul",
  "have",
  "haven't",
  "having",
  "hawk",
  "hay",
  "hayfield",
  "haystack",
  "he",
  "head",
  "headache",
  "heal",
  "health",
  "healthy",
  "heap",
  "hear",
  "hearing",
  "heard",
  "heart",
  "heat",
  "heater",
  "heaven",
  "heavy",
  "he'd",
  "heel",
  "height",
  "held",
  "hell",
  "he'll",
  "hello",
  "helmet",
  "help",
  "helper",
  "helpful",
  "hem",
  "hen",
  "henhouse",
  "her",
  "hers",
  "herd",
  "here",
  "here's",
  "hero",
  "herself",
  "he's",
  "hey",
  "hickory",
  "hid",
  "hidden",
  "hide",
  "high",
  "highway",
  "hill",
  "hillside",
  "hilltop",
  "hilly",
  "him",
  "himself",
  "hind",
  "hint",
  "hip",
  "hire",
  "his",
  "hiss",
  "history",
  "hit",
  "hitch",
  "hive",
  "ho",
  "hoe",
  "hog",
  "hold",
  "holder",
  "hole",
  "holiday",
  "hollow",
  "holy",
  "home",
  "homely",
  "homesick",
  "honest",
  "honey",
  "honeybee",
  "honeymoon",
  "honk",
  "honor",
  "hood",
  "hoof",
  "hook",
  "hoop",
  "hop",
  "hope",
  "hopeful",
  "hopeless",
  "horn",
  "horse",
  "horseback",
  "horseshoe",
  "hose",
  "hospital",
  "host",
  "hot",
  "hotel",
  "hound",
  "hour",
  "house",
  "housetop",
  "housewife",
  "housework",
  "how",
  "however",
  "howl",
  "hug",
  "huge",
  "hum",
  "humble",
  "hump",
  "hundred",
  "hung",
  "hunger",
  "hungry",
  "hunk",
  "hunt",
  "hunter",
  "hurrah",
  "hurried",
  "hurry",
  "hurt",
  "husband",
  "hush",
  "hut",
  "hymn",
  "i",
  "ice",
  "icy",
  "i'd",
  "idea",
  "ideal",
  "if",
  "ill",
  "i'll",
  "i'm",
  "important",
  "impossible",
  "improve",
  "in",
  "inch",
  "inches",
  "income",
  "indeed",
  "indian",
  "indoors",
  "ink",
  "inn",
  "insect",
  "inside",
  "instant",
  "instead",
  "insult",
  "intend",
  "interested",
  "interesting",
  "into",
  "invite",
  "iron",
  "is",
  "island",
  "isn't",
  "it",
  "its",
  "it's",
  "itself",
  "i've",
  "ivory",
  "ivy",
  "jacket",
  "jacks",
  "jail",
  "jam",
  "january",
  "jar",
  "jaw",
  "jay",
  "jelly",
  "jellyfish",
  "jerk",
  "jig",
  "job",
  "jockey",
  "join",
  "joke",
  "joking",
  "jolly",
  "journey",
  "joy",
  "joyful",
  "joyous",
  "judge",
  "jug",
  "juice",
  "juicy",
  "july",
  "jump",
  "june",
  "junior",
  "junk",
  "just",
  "keen",
  "keep",
  "kept",
  "kettle",
  "key",
  "kick",
  "kid",
  "kill",
  "killed",
  "kind",
  "kindly",
  "kindness",
  "king",
  "kingdom",
  "kiss",
  "kitchen",
  "kite",
  "kitten",
  "kitty",
  "knee",
  "kneel",
  "knew",
  "knife",
  "knit",
  "knives",
  "knob",
  "knock",
  "knot",
  "know",
  "known",
  "lace",
  "lad",
  "ladder",
  "ladies",
  "lady",
  "laid",
  "lake",
  "lamb",
  "lame",
  "lamp",
  "land",
  "lane",
  "language",
  "lantern",
  "lap",
  "lard",
  "large",
  "lash",
  "lass",
  "last",
  "late",
  "laugh",
  "laundry",
  "law",
  "lawn",
  "lawyer",
  "lay",
  "lazy",
  "lead",
  "leader",
  "leaf",
  "leak",
  "lean",
  "leap",
  "learn",
  "learned",
  "least",
  "leather",
  "leave",
  "leaving",
  "led",
  "left",
  "leg",
  "lemon",
  "lemonade",
  "lend",
  "length",
  "less",
  "lesson",
  "let",
  "let's",
  "letter",
  "letting",
  "lettuce",
  "level",
  "liberty",
  "library",
  "lice",
  "lick",
  "lid",
  "lie",
  "life",
  "lift",
  "light",
  "lightness",
  "lightning",
  "like",
  "likely",
  "liking",
  "lily",
  "limb",
  "lime",
  "limp",
  "line",
  "linen",
  "lion",
  "lip",
  "list",
  "listen",
  "lit",
  "little",
  "live",
  "lives",
  "lively",
  "liver",
  "living",
  "lizard",
  "load",
  "loaf",
  "loan",
  "loaves",
  "lock",
  "locomotive",
  "log",
  "lone",
  "lonely",
  "lonesome",
  "long",
  "look",
  "lookout",
  "loop",
  "loose",
  "lord",
  "lose",
  "loser",
  "loss",
  "lost",
  "lot",
  "loud",
  "love",
  "lovely",
  "lover",
  "low",
  "luck",
  "lucky",
  "lumber",
  "lump",
  "lunch",
  "lying",
  "machine",
  "machinery",
  "mad",
  "made",
  "magazine",
  "magic",
  "maid",
  "mail",
  "mailbox",
  "mailman",
  "major",
  "make",
  "making",
  "male",
  "mama",
  "mamma",
  "man",
  "manager",
  "mane",
  "manger",
  "many",
  "map",
  "maple",
  "marble",
  "march",
  "march",
  "mare",
  "mark",
  "market",
  "marriage",
  "married",
  "marry",
  "mask",
  "mast",
  "master",
  "mat",
  "match",
  "matter",
  "mattress",
  "may",
  "may",
  "maybe",
  "mayor",
  "maypole",
  "me",
  "meadow",
  "meal",
  "mean",
  "means",
  "meant",
  "measure",
  "meat",
  "medicine",
  "meet",
  "meeting",
  "melt",
  "member",
  "men",
  "mend",
  "meow",
  "merry",
  "mess",
  "message",
  "met",
  "metal",
  "mew",
  "mice",
  "middle",
  "midnight",
  "might",
  "mighty",
  "mile",
  "milk",
  "milkman",
  "mill",
  "miler",
  "million",
  "mind",
  "mine",
  "miner",
  "mint",
  "minute",
  "mirror",
  "mischief",
  "miss",
  "miss",
  "misspell",
  "mistake",
  "misty",
  "mitt",
  "mitten",
  "mix",
  "moment",
  "monday",
  "money",
  "monkey",
  "month",
  "moo",
  "moon",
  "moonlight",
  "moose",
  "mop",
  "more",
  "morning",
  "morrow",
  "moss",
  "most",
  "mostly",
  "mother",
  "motor",
  "mount",
  "mountain",
  "mouse",
  "mouth",
  "move",
  "movie",
  "movies",
  "moving",
  "mow",
  "mr.",
  "mrs.",
  "much",
  "mud",
  "muddy",
  "mug",
  "mule",
  "multiply",
  "murder",
  "music",
  "must",
  "my",
  "myself",
  "nail",
  "name",
  "nap",
  "napkin",
  "narrow",
  "nasty",
  "naughty",
  "navy",
  "near",
  "nearby",
  "nearly",
  "neat",
  "neck",
  "necktie",
  "need",
  "needle",
  "needn't",
  "negro",
  "neighbor",
  "neighborhood",
  "neither",
  "nerve",
  "nest",
  "net",
  "never",
  "nevermore",
  "new",
  "news",
  "newspaper",
  "next",
  "nibble",
  "nice",
  "nickel",
  "night",
  "nightgown",
  "nine",
  "nineteen",
  "ninety",
  "no",
  "nobody",
  "nod",
  "noise",
  "noisy",
  "none",
  "noon",
  "nor",
  "north",
  "northern",
  "nose",
  "not",
  "note",
  "nothing",
  "notice",
  "november",
  "now",
  "nowhere",
  "number",
  "nurse",
  "nut",
  "oak",
  "oar",
  "oatmeal",
  "oats",
  "obey",
  "ocean",
  "o'clock",
  "october",
  "odd",
  "of",
  "off",
  "offer",
  "office",
  "officer",
  "often",
  "oh",
  "oil",
  "old",
  "old-fashioned",
  "on",
  "once",
  "one",
  "onion",
  "only",
  "onward",
  "open",
  "or",
  "orange",
  "orchard",
  "order",
  "ore",
  "organ",
  "other",
  "otherwise",
  "ouch",
  "ought",
  "our",
  "ours",
  "ourselves",
  "out",
  "outdoors",
  "outfit",
  "outlaw",
  "outline",
  "outside",
  "outward",
  "oven",
  "over",
  "overalls",
  "overcoat",
  "overeat",
  "overhead",
  "overhear",
  "overnight",
  "overturn",
  "owe",
  "owing",
  "owl",
  "own",
  "owner",
  "ox",
  "pa",
  "pace",
  "pack",
  "package",
  "pad",
  "page",
  "paid",
  "pail",
  "pain",
  "painful",
  "paint",
  "painter",
  "painting",
  "pair",
  "pal",
  "palace",
  "pale",
  "pan",
  "pancake",
  "pane",
  "pansy",
  "pants",
  "papa",
  "paper",
  "parade",
  "pardon",
  "parent",
  "park",
  "part",
  "partly",
  "partner",
  "party",
  "pass",
  "passenger",
  "past",
  "paste",
  "pasture",
  "pat",
  "patch",
  "path",
  "patter",
  "pave",
  "pavement",
  "paw",
  "pay",
  "payment",
  "pea",
  "peas",
  "peace",
  "peaceful",
  "peach",
  "peaches",
  "peak",
  "peanut",
  "pear",
  "pearl",
  "peck",
  "peek",
  "peel",
  "peep",
  "peg",
  "pen",
  "pencil",
  "penny",
  "people",
  "pepper",
  "peppermint",
  "perfume",
  "perhaps",
  "person",
  "pet",
  "phone",
  "piano",
  "pick",
  "pickle",
  "picnic",
  "picture",
  "pie",
  "piece",
  "pig",
  "pigeon",
  "piggy",
  "pile",
  "pill",
  "pillow",
  "pin",
  "pine",
  "pineapple",
  "pink",
  "pint",
  "pipe",
  "pistol",
  "pit",
  "pitch",
  "pitcher",
  "pity",
  "place",
  "plain",
  "plan",
  "plane",
  "plant",
  "plate",
  "platform",
  "platter",
  "play",
  "player",
  "playground",
  "playhouse",
  "playmate",
  "plaything",
  "pleasant",
  "please",
  "pleasure",
  "plenty",
  "plow",
  "plug",
  "plum",
  "pocket",
  "pocketbook",
  "poem",
  "point",
  "poison",
  "poke",
  "pole",
  "police",
  "policeman",
  "polish",
  "polite",
  "pond",
  "ponies",
  "pony",
  "pool",
  "poor",
  "pop",
  "popcorn",
  "popped",
  "porch",
  "pork",
  "possible",
  "post",
  "postage",
  "postman",
  "pot",
  "potato",
  "potatoes",
  "pound",
  "pour",
  "powder",
  "power",
  "powerful",
  "praise",
  "pray",
  "prayer",
  "prepare",
  "present",
  "pretty",
  "price",
  "prick",
  "prince",
  "princess",
  "print",
  "prison",
  "prize",
  "promise",
  "proper",
  "protect",
  "proud",
  "prove",
  "prune",
  "public",
  "puddle",
  "puff",
  "pull",
  "pump",
  "pumpkin",
  "punch",
  "punish",
  "pup",
  "pupil",
  "puppy",
  "pure",
  "purple",
  "purse",
  "push",
  "puss",
  "pussy",
  "pussycat",
  "put",
  "putting",
  "puzzle",
  "quack",
  "quart",
  "quarter",
  "queen",
  "queer",
  "question",
  "quick",
  "quickly",
  "quiet",
  "quilt",
  "quit",
  "quite",
  "rabbit",
  "race",
  "rack",
  "radio",
  "radish",
  "rag",
  "rail",
  "railroad",
  "railway",
  "rain",
  "rainy",
  "rainbow",
  "raise",
  "raisin",
  "rake",
  "ram",
  "ran",
  "ranch",
  "rang",
  "rap",
  "rapidly",
  "rat",
  "rate",
  "rather",
  "rattle",
  "raw",
  "ray",
  "reach",
  "read",
  "reader",
  "reading",
  "ready",
  "real",
  "really",
  "reap",
  "rear",
  "reason",
  "rebuild",
  "receive",
  "recess",
  "record",
  "red",
  "redbird",
  "redbreast",
  "refuse",
  "reindeer",
  "rejoice",
  "remain",
  "remember",
  "remind",
  "remove",
  "rent",
  "repair",
  "repay",
  "repeat",
  "report",
  "rest",
  "return",
  "review",
  "reward",
  "rib",
  "ribbon",
  "rice",
  "rich",
  "rid",
  "riddle",
  "ride",
  "rider",
  "riding",
  "right",
  "rim",
  "ring",
  "rip",
  "ripe",
  "rise",
  "rising",
  "river",
  "road",
  "roadside",
  "roar",
  "roast",
  "rob",
  "robber",
  "robe",
  "robin",
  "rock",
  "rocky",
  "rocket",
  "rode",
  "roll",
  "roller",
  "roof",
  "room",
  "rooster",
  "root",
  "rope",
  "rose",
  "rosebud",
  "rot",
  "rotten",
  "rough",
  "round",
  "route",
  "row",
  "rowboat",
  "royal",
  "rub",
  "rubbed",
  "rubber",
  "rubbish",
  "rug",
  "rule",
  "ruler",
  "rumble",
  "run",
  "rung",
  "runner",
  "running",
  "rush",
  "rust",
  "rusty",
  "rye",
  "sack",
  "sad",
  "saddle",
  "sadness",
  "safe",
  "safety",
  "said",
  "sail",
  "sailboat",
  "sailor",
  "saint",
  "salad",
  "sale",
  "salt",
  "same",
  "sand",
  "sandy",
  "sandwich",
  "sang",
  "sank",
  "sap",
  "sash",
  "sat",
  "satin",
  "satisfactory",
  "saturday",
  "sausage",
  "savage",
  "save",
  "savings",
  "saw",
  "say",
  "scab",
  "scales",
  "scare",
  "scarf",
  "school",
  "schoolboy",
  "schoolhouse",
  "schoolmaster",
  "schoolroom",
  "scorch",
  "score",
  "scrap",
  "scrape",
  "scratch",
  "scream",
  "screen",
  "screw",
  "scrub",
  "sea",
  "seal",
  "seam",
  "search",
  "season",
  "seat",
  "second",
  "secret",
  "see",
  "seeing",
  "seed",
  "seek",
  "seem",
  "seen",
  "seesaw",
  "select",
  "self",
  "selfish",
  "sell",
  "send",
  "sense",
  "sent",
  "sentence",
  "separate",
  "september",
  "servant",
  "serve",
  "service",
  "set",
  "setting",
  "settle",
  "settlement",
  "seven",
  "seventeen",
  "seventh",
  "seventy",
  "several",
  "sew",
  "shade",
  "shadow",
  "shady",
  "shake",
  "shaker",
  "shaking",
  "shall",
  "shame",
  "shan't",
  "shape",
  "share",
  "sharp",
  "shave",
  "she",
  "she'd",
  "she'll",
  "she's",
  "shear",
  "shears",
  "shed",
  "sheep",
  "sheet",
  "shelf",
  "shell",
  "shepherd",
  "shine",
  "shining",
  "shiny",
  "ship",
  "shirt",
  "shock",
  "shoe",
  "shoemaker",
  "shone",
  "shook",
  "shoot",
  "shop",
  "shopping",
  "shore",
  "short",
  "shot",
  "should",
  "shoulder",
  "shouldn't",
  "shout",
  "shovel",
  "show",
  "shower",
  "shut",
  "shy",
  "sick",
  "sickness",
  "side",
  "sidewalk",
  "sideways",
  "sigh",
  "sight",
  "sign",
  "silence",
  "silent",
  "silk",
  "sill",
  "silly",
  "silver",
  "simple",
  "sin",
  "since",
  "sing",
  "singer",
  "single",
  "sink",
  "sip",
  "sir",
  "sis",
  "sissy",
  "sister",
  "sit",
  "sitting",
  "six",
  "sixteen",
  "sixth",
  "sixty",
  "size",
  "skate",
  "skater",
  "ski",
  "skin",
  "skip",
  "skirt",
  "sky",
  "slam",
  "slap",
  "slate",
  "slave",
  "sled",
  "sleep",
  "sleepy",
  "sleeve",
  "sleigh",
  "slept",
  "slice",
  "slid",
  "slide",
  "sling",
  "slip",
  "slipped",
  "slipper",
  "slippery",
  "slit",
  "slow",
  "slowly",
  "sly",
  "smack",
  "small",
  "smart",
  "smell",
  "smile",
  "smoke",
  "smooth",
  "snail",
  "snake",
  "snap",
  "snapping",
  "sneeze",
  "snow",
  "snowy",
  "snowball",
  "snowflake",
  "snuff",
  "snug",
  "so",
  "soak",
  "soap",
  "sob",
  "socks",
  "sod",
  "soda",
  "sofa",
  "soft",
  "soil",
  "sold",
  "soldier",
  "sole",
  "some",
  "somebody",
  "somehow",
  "someone",
  "something",
  "sometime",
  "sometimes",
  "somewhere",
  "son",
  "song",
  "soon",
  "sore",
  "sorrow",
  "sorry",
  "sort",
  "soul",
  "sound",
  "soup",
  "sour",
  "south",
  "southern",
  "space",
  "spade",
  "spank",
  "sparrow",
  "speak",
  "speaker",
  "spear",
  "speech",
  "speed",
  "spell",
  "spelling",
  "spend",
  "spent",
  "spider",
  "spike",
  "spill",
  "spin",
  "spinach",
  "spirit",
  "spit",
  "splash",
  "spoil",
  "spoke",
  "spook",
  "spoon",
  "sport",
  "spot",
  "spread",
  "spring",
  "springtime",
  "sprinkle",
  "square",
  "squash",
  "squeak",
  "squeeze",
  "squirrel",
  "stable",
  "stack",
  "stage",
  "stair",
  "stall",
  "stamp",
  "stand",
  "star",
  "stare",
  "start",
  "starve",
  "state",
  "station",
  "stay",
  "steak",
  "steal",
  "steam",
  "steamboat",
  "steamer",
  "steel",
  "steep",
  "steeple",
  "steer",
  "stem",
  "step",
  "stepping",
  "stick",
  "sticky",
  "stiff",
  "still",
  "stillness",
  "sting",
  "stir",
  "stitch",
  "stock",
  "stocking",
  "stole",
  "stone",
  "stood",
  "stool",
  "stoop",
  "stop",
  "stopped",
  "stopping",
  "store",
  "stork",
  "stories",
  "storm",
  "stormy",
  "story",
  "stove",
  "straight",
  "strange",
  "stranger",
  "strap",
  "straw",
  "strawberry",
  "stream",
  "street",
  "stretch",
  "string",
  "strip",
  "stripes",
  "strong",
  "stuck",
  "study",
  "stuff",
  "stump",
  "stung",
  "subject",
  "such",
  "suck",
  "sudden",
  "suffer",
  "sugar",
  "suit",
  "sum",
  "summer",
  "sun",
  "sunday",
  "sunflower",
  "sung",
  "sunk",
  "sunlight",
  "sunny",
  "sunrise",
  "sunset",
  "sunshine",
  "supper",
  "suppose",
  "sure",
  "surely",
  "surface",
  "surprise",
  "swallow",
  "swam",
  "swamp",
  "swan",
  "swat",
  "swear",
  "sweat",
  "sweater",
  "sweep",
  "sweet",
  "sweetness",
  "sweetheart",
  "swell",
  "swept",
  "swift",
  "swim",
  "swimming",
  "swing",
  "switch",
  "sword",
  "swore",
  "table",
  "tablecloth",
  "tablespoon",
  "tablet",
  "tack",
  "tag",
  "tail",
  "tailor",
  "take",
  "taken",
  "taking",
  "tale",
  "talk",
  "talker",
  "tall",
  "tame",
  "tan",
  "tank",
  "tap",
  "tape",
  "tar",
  "tardy",
  "task",
  "taste",
  "taught",
  "tax",
  "tea",
  "teach",
  "teacher",
  "team",
  "tear",
  "tease",
  "teaspoon",
  "teeth",
  "telephone",
  "tell",
  "temper",
  "ten",
  "tennis",
  "tent",
  "term",
  "terrible",
  "test",
  "than",
  "thank",
  "thanks",
  "thankful",
  "thanksgiving",
  "that",
  "that's",
  "the",
  "theater",
  "thee",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "they'd",
  "they'll",
  "they're",
  "they've",
  "thick",
  "thief",
  "thimble",
  "thin",
  "thing",
  "think",
  "third",
  "thirsty",
  "thirteen",
  "thirty",
  "this",
  "thorn",
  "those",
  "though",
  "thought",
  "thousand",
  "thread",
  "three",
  "threw",
  "throat",
  "throne",
  "through",
  "throw",
  "thrown",
  "thumb",
  "thunder",
  "thursday",
  "thy",
  "tick",
  "ticket",
  "tickle",
  "tie",
  "tiger",
  "tight",
  "till",
  "time",
  "tin",
  "tinkle",
  "tiny",
  "tip",
  "tiptoe",
  "tire",
  "tired",
  "title",
  "to",
  "toad",
  "toadstool",
  "toast",
  "tobacco",
  "today",
  "toe",
  "together",
  "toilet",
  "told",
  "tomato",
  "tomorrow",
  "ton",
  "tone",
  "tongue",
  "tonight",
  "too",
  "took",
  "tool",
  "toot",
  "tooth",
  "toothbrush",
  "toothpick",
  "top",
  "tore",
  "torn",
  "toss",
  "touch",
  "tow",
  "toward",
  "towards",
  "towel",
  "tower",
  "town",
  "toy",
  "trace",
  "track",
  "trade",
  "train",
  "tramp",
  "trap",
  "tray",
  "treasure",
  "treat",
  "tree",
  "trick",
  "tricycle",
  "tried",
  "trim",
  "trip",
  "trolley",
  "trouble",
  "truck",
  "true",
  "truly",
  "trunk",
  "trust",
  "truth",
  "try",
  "tub",
  "tuesday",
  "tug",
  "tulip",
  "tumble",
  "tune",
  "tunnel",
  "turkey",
  "turn",
  "turtle",
  "twelve",
  "twenty",
  "twice",
  "twig",
  "twin",
  "two",
  "ugly",
  "umbrella",
  "uncle",
  "under",
  "understand",
  "underwear",
  "undress",
  "unfair",
  "unfinished",
  "unfold",
  "unfriendly",
  "unhappy",
  "unhurt",
  "uniform",
  "united",
  "states",
  "unkind",
  "unknown",
  "unless",
  "unpleasant",
  "until",
  "unwilling",
  "up",
  "upon",
  "upper",
  "upset",
  "upside",
  "upstairs",
  "uptown",
  "upward",
  "us",
  "use",
  "used",
  "useful",
  "valentine",
  "valley",
  "valuable",
  "value",
  "vase",
  "vegetable",
  "velvet",
  "very",
  "vessel",
  "victory",
  "view",
  "village",
  "vine",
  "violet",
  "visit",
  "visitor",
  "voice",
  "vote",
  "wag",
  "wagon",
  "waist",
  "wait",
  "wake",
  "waken",
  "walk",
  "wall",
  "walnut",
  "want",
  "war",
  "warm",
  "warn",
  "was",
  "wash",
  "washer",
  "washtub",
  "wasn't",
  "waste",
  "watch",
  "watchman",
  "water",
  "watermelon",
  "waterproof",
  "wave",
  "wax",
  "way",
  "wayside",
  "we",
  "weak",
  "weakness",
  "weaken",
  "wealth",
  "weapon",
  "wear",
  "weary",
  "weather",
  "weave",
  "web",
  "we'd",
  "wedding",
  "wednesday",
  "wee",
  "weed",
  "week",
  "we'll",
  "weep",
  "weigh",
  "welcome",
  "well",
  "went",
  "were",
  "we're",
  "west",
  "western",
  "wet",
  "we've",
  "whale",
  "what",
  "what's",
  "wheat",
  "wheel",
  "when",
  "whenever",
  "where",
  "which",
  "while",
  "whip",
  "whipped",
  "whirl",
  "whisky",
  "whiskey",
  "whisper",
  "whistle",
  "white",
  "who",
  "who'd",
  "whole",
  "who'll",
  "whom",
  "who's",
  "whose",
  "why",
  "wicked",
  "wide",
  "wife",
  "wiggle",
  "wild",
  "wildcat",
  "will",
  "willing",
  "willow",
  "win",
  "wind",
  "windy",
  "windmill",
  "window",
  "wine",
  "wing",
  "wink",
  "winner",
  "winter",
  "wipe",
  "wire",
  "wise",
  "wish",
  "wit",
  "witch",
  "with",
  "without",
  "woke",
  "wolf",
  "woman",
  "women",
  "won",
  "wonder",
  "wonderful",
  "won't",
  "wood",
  "wooden",
  "woodpecker",
  "woods",
  "wool",
  "woolen",
  "word",
  "wore",
  "work",
  "worker",
  "workman",
  "world",
  "worm",
  "worn",
  "worry",
  "worse",
  "worst",
  "worth",
  "would",
  "wouldn't",
  "wound",
  "wove",
  "wrap",
  "wrapped",
  "wreck",
  "wren",
  "wring",
  "write",
  "writing",
  "written",
  "wrong",
  "wrote",
  "wrung",
  "yard",
  "yarn",
  "year",
  "yell",
  "yellow",
  "yes",
  "yesterday",
  "yet",
  "yolk",
  "yonder",
  "you",
  "you'd",
  "you'll",
  "young",
  "youngster",
  "your",
  "yours",
  "you're",
  "yourself",
  "yourselves",
  "youth",
  "you've",
];
var easy_words = easyWords$1;

const syllable = syllable_1;
const pluralize = pluralize$1.exports;
const punctuationRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-./:;<=>?@[\]^_`{|}~]/g;
const easyWords = easy_words;
const easyWordSet = new Set(easyWords);

// extends Math object
Math.copySign = (x, y) => {
  return x * (y / Math.abs(y))
};
Math.legacyRound = (number, points = 0) => {
  const p = 10 ** points;
  // return float(math.floor((number * p) + math.copysign(0.5, number))) / p
  return Math.floor((number * p) + Math.copySign(0.5, number)) / p
};

class Readability {
  static getGradeSuffix (grade) {
    grade = Math.floor(grade);
    // poor function fix this, gives { 22th and 23th grade }
    const gradeMap = {
      1: 'st',
      2: 'nd',
      3: 'rd'
    };
    return gradeMap[grade] ? gradeMap[grade] : 'th'
  }
  charCount (text, ignoreSpaces = true) {
    if (ignoreSpaces) text = text.replace(/ /g, '');
    return text.length
  }
  letterCount (text, ignoreSpaces = true) {
    if (ignoreSpaces) text = text.replace(/ /g, '');
    return this.removePunctuation(text).length
  }
  removePunctuation (text) {
    text = text.replace(punctuationRE, '');
    return text
  }
  static split (text) {
    text = text.split(/,| |\n|\r/g);
    text = text.filter(n => n);
    return text
  }
  lexiconCount (text, removePunctuation = true) {
    if (removePunctuation) text = this.removePunctuation(text);
    text = text.split(/,| |\n|\r/g);
    text = text.filter(n => n);
    return text.length
  }
  syllableCount (text, lang = 'en-US') {
    text = text.toLocaleLowerCase(lang);
    text = this.removePunctuation(text);
    if (!text) return 0
    // eventually replace syllable
    const count = syllable(text);
    return count //  js lib overs compared to python
  }
  sentenceCount (text) {
    let ignoreCount = 0;
    let sentences = text.split(/ *[.?!]['")\]]*[ |\n](?=[A-Z])/g);
    for (let sentence of sentences) {
      if (this.lexiconCount(sentence) <= 2) ignoreCount += 1;
    }
    const validSentences = sentences.length - ignoreCount;
    return validSentences > 1 ? validSentences : 1
  }
  averageSentenceLength (text) {
    const asl = this.lexiconCount(text) / this.sentenceCount(text);
    const returnVal = Math.legacyRound(asl, 1);
    return !isNaN(returnVal) ? returnVal : 0.0
  }
  averageSyllablePerWord (text) {
    const syllables = this.syllableCount(text);
    const words = this.lexiconCount(text);
    const syllablePerWord = syllables / words;
    const returnVal = Math.legacyRound(syllablePerWord, 1);
    return !isNaN(returnVal) ? returnVal : 0.0
  }
  averageCharacterPerWord (text) {
    const charactersPerWord = this.charCount(text) / this.lexiconCount(text);
    const returnVal = Math.legacyRound(charactersPerWord, 2);
    return !isNaN(returnVal) ? returnVal : 0.0
  }
  averageLetterPerWord (text) {
    const lettersPerWord = this.letterCount(text) / this.lexiconCount(text);
    const returnVal = Math.legacyRound(lettersPerWord, 2);
    return !isNaN(returnVal) ? returnVal : 0.0
  }
  averageSentencePerWord (text) {
    const sentencesPerWord = this.sentenceCount(text) / this.lexiconCount(text);
    const returnVal = Math.legacyRound(sentencesPerWord, 2);
    return !isNaN(returnVal) ? returnVal : 0.0
  }
  fleschReadingEase (text) {
    const sentenceLength = this.averageSentenceLength(text);
    const syllablesPerWord = this.averageSyllablePerWord(text);
    const flesch = 206.835 - (1.015 * sentenceLength) - (84.6 * syllablesPerWord);
    const returnVal = Math.legacyRound(flesch, 2);
    return returnVal
  }
  fleschReadingEaseToGrade (score) {
    if (score < 100 && score >= 90) return 5
    else if (score < 90 && score >= 80) return 6
    else if (score < 80 && score >= 70) return 7
    else if (score < 70 && score >= 60) return 8.5
    else if (score < 60 && score >= 50) return 11
    else if (score < 50 && score >= 40) return 13 // college
    else if (score < 40 && score >= 30) return 15
    else return 16
  }
  fleschKincaidGrade (text) {
    const sentenceLength = this.averageSentenceLength(text);
    const syllablePerWord = this.averageSyllablePerWord(text);
    const flesch = 0.39 * sentenceLength + 11.8 * syllablePerWord - 15.59;
    const returnVal = Math.legacyRound(flesch, 1);
    return returnVal
  }
  polySyllableCount (text) {
    let count = 0;
    let wrds;
    for (let word of Readability.split(text)) {
      wrds = this.syllableCount(word);
      if (wrds >= 3) count += 1;
    }
    return count
  }
  smogIndex (text) {
    const sentences = this.sentenceCount(text);
    if (sentences >= 3) {
      const polySyllab = this.polySyllableCount(text);
      const smog = 1.043 * (30 * (polySyllab / sentences)) ** 0.5 + 3.1291;
      const returnVal = Math.legacyRound(smog, 1);
      return !isNaN(returnVal) ? returnVal : 0.0
    }
    return 0.0
  }
  colemanLiauIndex (text) {
    const letters = Math.legacyRound(this.averageLetterPerWord(text) * 100, 2);
    const sentences = Math.legacyRound(this.averageSentencePerWord(text) * 100, 2);
    const coleman = 0.058 * letters - 0.296 * sentences - 15.8;
    return Math.legacyRound(coleman, 2)
  }
  automatedReadabilityIndex (text) {
    const characters = this.charCount(text);
    const words = this.lexiconCount(text);
    const sentences = this.sentenceCount(text);

    const averageCharacterPerWord = characters / words;
    const averageWordPerSentence = words / sentences;
    const readability = (
      (4.71 * Math.legacyRound(averageCharacterPerWord, 2)) +
      (0.5 * Math.legacyRound(averageWordPerSentence, 2)) -
      21.43
    );
    const returnVal = Math.legacyRound(readability, 1);
    return !isNaN(returnVal) ? returnVal : 0.0
  }
  linsearWriteFormula (text) {
    let easyWord = 0;
    let difficultWord = 0;
    let textList = Readability.split(text).slice(0, 100);

    for (let word of textList) {
      if (this.syllableCount(word) < 3) {
        easyWord += 1;
      } else {
        difficultWord += 1;
      }
    }
    text = textList.join(' ');
    let number = (easyWord * 1 + difficultWord * 3) / this.sentenceCount(text);
    let returnVal = number <= 20 ? (number - 2) / 2 : number / 2;
    returnVal = Math.legacyRound(returnVal, 1);
    return !isNaN(returnVal) ? returnVal : 0.0
  }
  presentTense(word) {
    // good enough for most long words -- we only care about "difficult" words
    // of two or more syllables anyway.
    // Doesn't work for words ending in "e" that aren't "easy"
    if (word.length < 6)
      return word
    if (word.endsWith('ed')) {
      if (easyWordSet.has(word.slice(0, -1)))
        return word.slice(0, -1) // "easy" word ending in e
      else
        return word.slice(0, -2) // assume we remove "ed"
    }
    if (word.endsWith('ing')) {
      const suffixIngToE = word.slice(0, -3) + "e"; // e.g. forcing -> force
      if (easyWordSet.has(suffixIngToE))
        return suffixIngToE
      else
        return word.slice(0, -3)
    }
    return word
  }
  difficultWords (text, syllableThreshold = 2) {
    const textList = text.match(/[\w=‘’]+/g);
    const diffWordsSet = new Set();
    if (textList === null)
      return diffWordsSet
    for (let word of textList) {
      const normalized = this.presentTense(pluralize(word.toLocaleLowerCase(), 1));
      // console.log(`difficultWords(${word}): norm=${normalized}, `
      //             `${this.syllableCount(word)} syllables, easy? ${easyWordSet.has(normalized)}`)
      if (!easyWordSet.has(normalized) && this.syllableCount(word) >= syllableThreshold) {
        diffWordsSet.add(word);
      }
    }
    return [...diffWordsSet].length
  }
  daleChallReadabilityScore (text) {
    const wordCount = this.lexiconCount(text);
    const count = wordCount - this.difficultWords(text);
    const per = (count / wordCount * 100);
    if (isNaN(per)) return 0.0
    const difficultWords = 100 - per;
    // console.log('difficult words : ', difficultWords)
    let score = (0.1579 * difficultWords) + (0.0496 * this.averageSentenceLength(text));
    if (difficultWords > 5) score += 3.6365;
    return Math.legacyRound(score, 2)
  }
  daleChallToGrade (score) {
    if (score <= 4.9) return 4
    if (score < 5.9) return 5
    if (score < 6.9) return 7
    if (score < 7.9) return 9
    if (score < 8.9) return 11
    if (score < 9.9) return 13
    else return 16
  }
  gunningFog (text) {
    const perDiffWords = (this.difficultWords(text, 3) / this.lexiconCount(text) * 100);
    const grade = 0.4 * (this.averageSentenceLength(text) + perDiffWords);
    const returnVal = Math.legacyRound(grade, 2);
    return !isNaN(returnVal) ? returnVal : 0.0
  }
  lix (text) {
    const words = Readability.split(text);
    const wordsLen = words.length;
    const longWords = words.filter(wrd => wrd.length > 6).length;
    const perLongWords = longWords * 100 / wordsLen;
    const asl = this.averageSentenceLength(text);
    const lix = asl + perLongWords;
    return Math.legacyRound(lix, 2)
  }
  rix (text) {
    const words = Readability.split(text);
    const longWordsCount = words.filter(wrd => wrd.length > 6).length;
    const sentencesCount = this.sentenceCount(text);
    const rix = longWordsCount / sentencesCount;
    return !isNaN(rix) ? Math.legacyRound(rix, 2) : 0.0
  }
  textStandard (text, floatOutput = null) {
    const grade = [];
    // Appending Flesch Kincaid Grade
    let lower = Math.legacyRound(this.fleschKincaidGrade(text));
    let upper = Math.ceil(this.fleschKincaidGrade(text));
    grade.push(Math.floor(lower));
    grade.push(Math.floor(upper));

    let score = this.fleschReadingEase(text);
    let freGrade = this.fleschReadingEaseToGrade(score);
    grade.push(freGrade);

    // console.log('grade till now: \n', grade)

    lower = Math.legacyRound(this.smogIndex(text));
    upper = Math.ceil(this.smogIndex(text));
    grade.push(Math.floor(lower));
    grade.push(Math.floor(upper));

    // Appending Coleman_Liau_Index
    lower = Math.legacyRound(this.colemanLiauIndex(text));
    upper = Math.ceil(this.colemanLiauIndex(text));
    grade.push(Math.floor(lower));
    grade.push(Math.floor(upper));

    // Appending Automated_Readability_Index
    lower = Math.legacyRound(this.automatedReadabilityIndex(text));
    upper = Math.ceil(this.automatedReadabilityIndex(text));
    grade.push(Math.floor(lower));
    grade.push(Math.floor(upper));

    // console.log('grade till now : 2 : \n', grade)

    // Appending  Dale_Chall_Readability_Score
    lower = Math.legacyRound(this.daleChallToGrade(this.daleChallReadabilityScore(text)));
    upper = Math.ceil(this.daleChallToGrade(this.daleChallReadabilityScore(text)));
    grade.push(Math.floor(lower));
    grade.push(Math.floor(upper));

    // Appending linsearWriteFormula
    lower = Math.legacyRound(this.linsearWriteFormula(text));
    upper = Math.ceil(this.linsearWriteFormula(text));
    grade.push(Math.floor(lower));
    grade.push(Math.floor(upper));

    // Appending Gunning Fog Index
    lower = Math.legacyRound(this.gunningFog(text));
    upper = Math.ceil(this.gunningFog(text));
    grade.push(Math.floor(lower));
    grade.push(Math.floor(upper));

    // d = Counter(grade)
    // final_grade = d.most_common(1)
    // score = final_grade[0][0]

    // if float_output:
    //     return float(score)
    // else:
    //     lower_score = int(score) - 1
    //     upper_score = lower_score + 1
    //     return "{}{} and {}{} grade".format(
    //         lower_score, get_grade_suffix(lower_score),
    //         upper_score, get_grade_suffix(upper_score)
    //     )
    // Finding the Readability Consensus based upon all the above tests
    // console.log('grade List: ', grade)
    const counterMap = [...new Set(grade)].map(x => [x, grade.filter(y => y === x).length]);
    const finalGrade = counterMap.reduce((x, y) => y[1] >= x[1] ? y : x);
    score = finalGrade[0];
    if (floatOutput) return score
    const lowerScore = Math.floor(score) - 1;
    const upperScore = lowerScore + 1;
    return `${lowerScore}${Readability.getGradeSuffix(lowerScore)} and ${upperScore}${Readability.getGradeSuffix(upperScore)} grade`
  }
  textMedian (text) {
    const grade = [];
    // Appending Flesch Kincaid Grade
    grade.push(this.fleschKincaidGrade(text));

    const score = this.fleschReadingEase(text);
    const freGrade = this.fleschReadingEaseToGrade(score);
    grade.push(freGrade);

    grade.push(this.smogIndex(text));

    // Appending Coleman_Liau_Index
    grade.push(this.colemanLiauIndex(text));

    // Appending Automated_Readability_Index
    grade.push(this.automatedReadabilityIndex(text));

    // Appending  Dale_Chall_Readability_Score
    grade.push(this.daleChallToGrade(this.daleChallReadabilityScore(text)));

    // Appending linsearWriteFormula
    grade.push(this.linsearWriteFormula(text));

    // Appending Gunning Fog Index
    grade.push(this.gunningFog(text));

    // compute median
    grade.sort(function(a, b) { return a - b });
    let half = Math.floor(grade.length / 2);
    if (half & 0x1)
      return (grade[half-1] + grade[half])/2
    else
      return grade[half]
  }
}
const readability = new Readability();
var main$1 = readability;

// This helps the readability algorithms correctly calculate
// sentence length.

var addPeriodToHeadings = function addPeriodToHeadings() {
  return function (tree) {
    unistUtilVisit(tree, 'heading', function (headingNode) {
      unistUtilVisit(headingNode, 'text', function (textNode) {
        if (textNode.value) {
          textNode.value += '.';
        }
      });
    });
  };
}; // Remark plugin to remove list items that have less than 4 works.
// For us these tend to be long lists of values, and throws off
// readability results.


var removeShortListItems = function removeShortListItems() {
  return function (tree) {
    unistUtilVisit(tree, 'listItem', function (listItemNode) {
      unistUtilVisit(listItemNode, 'paragraph', function (paragraphNode) {
        // Convert list items to plain text (as they can have children of many
        // different types, such as italics, bold etc)
        stripMarkdown()(paragraphNode);
        unistUtilVisit(paragraphNode, 'text', function (textNode) {
          // Only keep the list item if it is at least 4 words long
          if (textNode.value.split(' ').length < 4) {
            textNode.value = '';
          }
        });
      });
    });
  };
}; // Returns scores for a given string


function scoreText(text) {
  var colemanLiauIndex = main$1.colemanLiauIndex(text);
  return {
    fleschReadingEase: main$1.fleschReadingEase(text),
    gunningFog: main$1.gunningFog(text),
    smogIndex: main$1.smogIndex(text),
    automatedReadabilityIndex: main$1.automatedReadabilityIndex(text),
    linsearWriteFormula: main$1.linsearWriteFormula(text),
    daleChallReadabilityScore: main$1.daleChallReadabilityScore(text),
    // The CLI index can be NaN for some texts, so ensure it's 0
    colemanLiauIndex: Number.isNaN(colemanLiauIndex) ? 0 : colemanLiauIndex
  };
} // Calculates the average of a particular property value, given an array of objects


function calcAverage(arrayOfObjects, accessorFn) {
  return arrayOfObjects.reduce(function (acc, value) {
    return acc + accessorFn(value);
  }, 0) / arrayOfObjects.length;
} // Returns a score object containing the averages, given an array of scores


function averageObjectProperties(objects) {
  return Object.keys(objects[0]).reduce(function (acc, key) {
    acc[key] = calcAverage(objects, function (object) {
      return object[key];
    });
    return acc;
  }, {});
} // Calculate the readabilty result for all files found in a given path glob.
// This result contains readability scores for each file, and an overall average

function calculateReadability(globPath) {
  var filePaths = glob_1.sync(globPath);
  var remarker = remark().use(removeShortListItems).use(addPeriodToHeadings).use(stripMarkdown);
  var fileResults = filePaths.map(function (filePath) {
    var markdown = require$$0__default['default'].readFileSync(filePath);
    var stripped = remarker.processSync(markdown).contents // Remove any blank lines
    .replace(/\n+/g, "\n");
    var scores = scoreText(stripped);
    return {
      name: filePath,
      scores: scores
    };
  });
  var averageResult = [{
    name: 'Average',
    scores: averageObjectProperties(fileResults.map(function (result) {
      return result.scores;
    }))
  }];
  return {
    fileResults: fileResults,
    averageResult: averageResult
  };
}

var FILE_STATUS = {
  ADDED: 'added',
  MODIFIED: 'modified'
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
// between the objects. For example:
// diffScores({a: 1, b: 10}, {a: 3, b:10})
// returns: {a:2, b:0}

function diffScores(newResult, oldResult) {
  return Object.keys(newResult).reduce(function (acc, key) {
    acc[key] = newResult[key] - oldResult[key];
    return acc;
  }, {});
} // Adds a diff property to each result object, showing an increase
// or decrease in each score


function addDiffToResults(newResults, oldResults) {
  var renamedFiles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return newResults.map(function (newResult) {
    var _renamedFiles$find$fr, _renamedFiles$find;

    var oldName = (_renamedFiles$find$fr = (_renamedFiles$find = renamedFiles.find(function (file) {
      return file.to === newResult.name;
    })) === null || _renamedFiles$find === void 0 ? void 0 : _renamedFiles$find.from) !== null && _renamedFiles$find$fr !== void 0 ? _renamedFiles$find$fr : newResult.name;
    var matchingOldResult = oldResults.find(function (oldResult) {
      return oldResult.name === oldName;
    });
    var diff = matchingOldResult ? diffScores(newResult.scores, matchingOldResult.scores) : null;
    return _objectSpread(_objectSpread({}, newResult), {}, {
      diff: diff
    });
  });
} // Adds a status property to each result object, showing
// if that file was added or modified in this PR


function addFileStatusToResults(results, _ref) {
  var added = _ref.added,
      modified = _ref.modified;
  return results.map(function (result) {
    var status = null;

    if (added.includes(result.name)) {
      status = FILE_STATUS.ADDED;
    } else if (modified.includes(result.name)) {
      status = FILE_STATUS.MODIFIED;
    }

    return _objectSpread(_objectSpread({}, result), {}, {
      status: status
    });
  });
} // Creates a report object using the old and new readability
// scores and files statuses. The report has extra details such
// as the difference between the old and the new values.


var generateReport = function generateReport(_ref2) {
  var newReadability = _ref2.newReadability,
      oldReadability = _ref2.oldReadability,
      fileStatuses = _ref2.fileStatuses;
  var filesWithDiff = addDiffToResults(newReadability.fileResults, oldReadability.fileResults, fileStatuses.renamed);
  var filesWithStatuses = addFileStatusToResults(filesWithDiff, fileStatuses);
  var onlyTouchedFiles = filesWithStatuses.filter(function (result) {
    return result.status !== null;
  });
  return {
    fileResults: onlyTouchedFiles,
    averageResult: addDiffToResults(newReadability.averageResult, oldReadability.averageResult)
  };
};

var arrayToCells = function arrayToCells(array) {
  return "".concat(array.join(' | '), "\n");
};

var tableToMD = function tableToMD(_ref) {
  var headers = _ref.headers,
      rows = _ref.rows;
  var table = arrayToCells(headers);
  table += arrayToCells(Array.from({
    length: headers.length
  }, function () {
    return '---';
  }));
  table += rows.map(function (row) {
    return arrayToCells(row);
  }).join('');
  return table;
}; // Round a number to 2 decimal places, but return a float
// so that trailing 0's will not be stringified


var roundValue = function roundValue(value) {
  if (typeof value !== 'undefined') {
    return parseFloat(value.toFixed(2));
  }

  return value;
}; // Adds an emoji marker to a value.
// If the value is POSITIVE, we consider it a good value
// and add a positive marker, otherwise a negative marker


var addPositiveDiffMarker = function addPositiveDiffMarker(value) {
  if (typeof value !== 'undefined') {
    if (value === 0 || value > 0) {
      return "\uD83D\uDFE2 +".concat(value);
    }

    return "\uD83D\uDD34 ".concat(value);
  }

  return value;
}; // Adds an emoji marker to a value.
// If the value is NEGATIVE, we consider it a good value
// and add a positive marker, otherwise a negative marker


var addNegativeDiffMarker = function addNegativeDiffMarker(value) {
  if (typeof value !== 'undefined') {
    if (value === 0 || value < 0) {
      return "\uD83D\uDFE2 ".concat(value);
    }

    return "\uD83D\uDD34 +".concat(value);
  }

  return value;
}; // Returns a table row showing the absolute scores for a given result object.
// If a nameToLinkFunction is passed, the result name will be created
// as link, using the result of that function as the target


var resultToScoreTableRow = function resultToScoreTableRow(result, nameToLinkFunction) {
  var name = result.name,
      scores = result.scores;
  var filenameOnly = require$$0__default$1['default'].basename(name);
  var displayName = nameToLinkFunction ? "[".concat(filenameOnly, "](").concat(nameToLinkFunction(name), " \"").concat(name, "\")") : name;
  return [displayName, roundValue(scores.fleschReadingEase), roundValue(scores.gunningFog), roundValue(scores.smogIndex), roundValue(scores.automatedReadabilityIndex), roundValue(scores.colemanLiauIndex), roundValue(scores.linsearWriteFormula), roundValue(scores.daleChallReadabilityScore)];
}; // Returns a table row showing the difference in scores for a given result object.


var resultToDiffTableRow = function resultToDiffTableRow(result) {
  var _addPositiveDiffMarke, _addNegativeDiffMarke, _addNegativeDiffMarke2, _addNegativeDiffMarke3, _addNegativeDiffMarke4, _addNegativeDiffMarke5, _addNegativeDiffMarke6;

  var diff = result.diff;
  return ['&nbsp;', (_addPositiveDiffMarke = addPositiveDiffMarker(roundValue(diff === null || diff === void 0 ? void 0 : diff.fleschReadingEase))) !== null && _addPositiveDiffMarke !== void 0 ? _addPositiveDiffMarke : '-', (_addNegativeDiffMarke = addNegativeDiffMarker(roundValue(diff === null || diff === void 0 ? void 0 : diff.gunningFog))) !== null && _addNegativeDiffMarke !== void 0 ? _addNegativeDiffMarke : '-', (_addNegativeDiffMarke2 = addNegativeDiffMarker(roundValue(diff === null || diff === void 0 ? void 0 : diff.smogIndex))) !== null && _addNegativeDiffMarke2 !== void 0 ? _addNegativeDiffMarke2 : '-', (_addNegativeDiffMarke3 = addNegativeDiffMarker(roundValue(diff === null || diff === void 0 ? void 0 : diff.automatedReadabilityIndex))) !== null && _addNegativeDiffMarke3 !== void 0 ? _addNegativeDiffMarke3 : '-', (_addNegativeDiffMarke4 = addNegativeDiffMarker(roundValue(diff === null || diff === void 0 ? void 0 : diff.colemanLiauIndex))) !== null && _addNegativeDiffMarke4 !== void 0 ? _addNegativeDiffMarke4 : '-', (_addNegativeDiffMarke5 = addNegativeDiffMarker(roundValue(diff === null || diff === void 0 ? void 0 : diff.linsearWriteFormula))) !== null && _addNegativeDiffMarke5 !== void 0 ? _addNegativeDiffMarke5 : '-', (_addNegativeDiffMarke6 = addNegativeDiffMarker(roundValue(diff === null || diff === void 0 ? void 0 : diff.daleChallReadabilityScore))) !== null && _addNegativeDiffMarke6 !== void 0 ? _addNegativeDiffMarke6 : '-'];
}; // Convert a report object to a markdown comment


var reportToComment = function reportToComment(_ref2) {
  var report = _ref2.report,
      _ref2$repository = _ref2.repository,
      repository = _ref2$repository === void 0 ? 'repo-name' : _ref2$repository,
      _ref2$commit = _ref2.commit,
      commit = _ref2$commit === void 0 ? 'commit-sha' : _ref2$commit;

  var nameToLink = function nameToLink(name) {
    return "https://github.com/".concat(repository, "/blob/").concat(commit, "/").concat(name);
  };

  var fileTable = tableToMD({
    headers: ['Path', 'FRE', 'GF', 'SMOG', 'ARI', 'CLI', 'LWF', 'DCRS'],
    rows: report.fileResults.flatMap(function (result) {
      return [resultToScoreTableRow(result, nameToLink), resultToDiffTableRow(result)];
    })
  });
  var averageTable = tableToMD({
    headers: ['&nbsp;', 'FRE', 'GF', 'SMOG', 'ARI', 'CLI', 'LWF', 'DCRS'],
    rows: [resultToScoreTableRow(report.averageResult[0]), resultToDiffTableRow(report.averageResult[0])]
  });
  return "\nReadability after merging this PR:\n\n<details>\n  <summary>View Metric Targets</summary>\n\nMetric | Range | Ideal score\n--- | --- | ---\nFlesch Reading Ease | 100 (very easy read) to 0 (extremely difficult read) | 60\nGunning Fog | 6 ( very easy read) to 17(extremely difficult read) | 8 or less\nSMOG Index | 6 (very easy read) to 14(extremely difficult read) | 8 or less\nAuto. Read. Index | 6 (very easy read) to 14(extremely difficult read) | 8 or less\nColeman Liau Index | 6 (very easy read) to 17(extremely difficult read) | 8 or less\nLinsear Write | 0 (very easy read) to 11(extremely difficult read) | 8 or less\nDale-Chall Readability | 4.9 (very easy read) to 9.9(extremely difficult read) | 6.9 or less\n\n</details>\n\n\uD83D\uDFE2 - Shows an _increase_ in readability\n\uD83D\uDD34 - Shows a _decrease_ in readability\n\n".concat(fileTable, "\n\nOverall average:\n").concat(averageTable, "\n");
};

var main = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    var _ref2, _ref2$context, context, token, glob, baseBranchRef, headBranchRef, prNumber, client, oldReadability, newReadability, fileStatuses, report, repository, commit, body;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = github || {}, _ref2$context = _ref2.context, context = _ref2$context === void 0 ? {} : _ref2$context; // action parameters

            token = core$1.getInput('github-token');
            glob = core$1.getInput('glob');
            baseBranchRef = context.payload.pull_request.base.ref;
            headBranchRef = context.payload.pull_request.head.ref;
            prNumber = context.payload.pull_request.number;
            client = github.getOctokit(token); // Run readability on base branch

            _context.next = 9;
            return exec$2.exec("git fetch origin ".concat(baseBranchRef));

          case 9:
            _context.next = 11;
            return exec$2.exec("git checkout ".concat(baseBranchRef));

          case 11:
            oldReadability = calculateReadability(glob); // Run readability on head branch

            _context.next = 14;
            return exec$2.exec("git fetch origin ".concat(headBranchRef));

          case 14:
            _context.next = 16;
            return exec$2.exec("git checkout ".concat(headBranchRef));

          case 16:
            newReadability = calculateReadability(glob);
            _context.next = 19;
            return getFileStatusesFromPR({
              client: client,
              context: context,
              prNumber: prNumber
            });

          case 19:
            fileStatuses = _context.sent;
            report = generateReport({
              newReadability: newReadability,
              oldReadability: oldReadability,
              fileStatuses: fileStatuses
            });
            repository = context.payload.repository.full_name;
            commit = context.payload.pull_request.head.sha;
            body = reportToComment({
              report: report,
              repository: repository,
              commit: commit
            });
            _context.next = 26;
            return upsertComment({
              client: client,
              context: context,
              prNumber: context.payload.pull_request.number,
              body: body,
              hiddenHeader: "<!-- ".concat(glob, "-code-coverage-assistant -->")
            });

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

main()["catch"](function (err) {
  console.log(err);
  core$1.setFailed(err.message);
});
