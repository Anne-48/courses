const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

//can setup multiple listeners for the event, nesse caso são 3 observers
myEmitter.on("newSale", () => {
  console.log("There was a new sale.");
});
myEmitter.on("newSale", () => {
  console.log("Costumer name: John.");
});
myEmitter.on("newSale", estoque => {
  console.log(`There are now ${estoque} items left in stock.`);
});

myEmitter.emit("newSale", 9); // .emit equivalente a onClick (esse é o emitter)

//----------------------------------------------------------------------------//

const server = http.createServer();

// .on -> always listening to an event
server.on("request", (req, res) => {
  console.log("Request received!");
  res.end("Request received"); // you can only send 1 response
});

server.on("request", (req, res) => {
  console.log("Another request");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting request");
});
