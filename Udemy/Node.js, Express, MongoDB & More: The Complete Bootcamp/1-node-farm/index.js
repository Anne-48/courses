const fs = require("fs");
const http = require("http");
const url = require("url");

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName); // / /g -> regular expression global
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%SLUG%}/g, product.slug);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic"); // 'not-organic' the class name in css to not show the organic part
  return output;
};

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObj.map((n) => replaceTemplate(templateCard, n)).join("");
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } /* else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
    // to use slugs instead of query
    */ else if (pathname.startsWith("/product")) {
    const slug = pathname.split("/")[2];
    const product = dataObj.find((n) => n.slug === slug);
    const output = replaceTemplate(templateProduct, product);
    if (!product) {
      res.writeHead(404, { "Content-type": "text/html" });
      res.end("<h1>Page not found <h1/>");
    }
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("<h1>Page not found <h1/>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening requests on port 8000");
});
