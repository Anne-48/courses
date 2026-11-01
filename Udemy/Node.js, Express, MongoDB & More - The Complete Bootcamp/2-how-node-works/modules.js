console.log(arguments);
console.log(require("module").wrapper);
// export
// require
// module
// __filename
// __dirname

//module.exports
const Calculator = require("./module-module-exports");
const calc1 = new Calculator();
console.log(calc1.add(2, 5));

// exports
const calc2 = require("./module-exports");
console.log(calc2.add(2, 5));

// deestructuring
const { add, multiply } = require("./module-exports");
console.log(add(2, 5));

// caching (only 'runs' the 1st one because stays in cache)
require("./module-cache")();
require("./module-cache")();
require("./module-cache")();
