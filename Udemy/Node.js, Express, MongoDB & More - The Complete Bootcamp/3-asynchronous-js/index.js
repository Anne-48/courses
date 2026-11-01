const fs = require("fs");
const superagent = require("superagent");

/*
//------------with callback hell------------------------------------------------
 fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
   console.log(`Breed: ${data}`);
   superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
     if (err) return console.log(err.message);
     console.log(res.body.message);
     fs.writeFile("dog-img.txt", res.body.message, err => {
       console.log("Image saved!");
       if (err) return console.log(err.message);
     });
   });
 });
*/

/*
//--------------with promises---------------------------------------------------
 // out: pending promise | in: fullfiled/rejected resolved promise
 const readFilePromise = file => {
   return new Promise((resolve, reject) => {
     fs.readFile(file, (err, data) => {
       if (err) reject("error");
       resolve(data);
     });
   });
 };
 // manually build promisse (promisify)
 const writeFilePromisse = (file, data) => {
   return new Promise((resolve, reject) => {
     fs.writeFile(file, data, err => {
       if (err) reject("Could not write the file");
       resolve("Success");
     });
   });
 };
 // get() creates pending promise
 // then() if fullfiled resolved promise
 // catch() if rejected resolved promise
 readFilePromise(`${__dirname}/dog.txt`)
   .then(data => {
     console.log(`Breed: ${data}`);
     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); // superagent already have promisify
   })
   .then(res => {
     console.log(res.body.message);
     return writeFilePromisse("dog-img.txt", res.body.message);
   })
   .then(() => {
     console.log("Imagem salva!");
   })
   .catch(err => {
     console.log(err);
   });
// chain the then() methods, and only 1 catch()
*/

//-------------------------with async await-------------------------------------
const readFilePromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("error");
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject("Could not write the file");
      resolve("Success");
    });
  });
};
// async fn | await can only be used inside async fn
const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`); // await stop the code from running until promisse is resolved
    console.log(`Breed: ${data}`);

    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(res.body.message);

    await writeFilePromisse(`${__dirname}/dog-img.txt`, res.body.message);
    console.log("Imagem salva!");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "Success";
};

// with multiple files
const getDogPics = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Promise = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2Promise = superagent.get(`https://dog.ceo/api/breed/rottweiler/images/random`);
    const res3Promise = superagent.get(`https://dog.ceo/api/breed/bulldog/images/random`);
    const all = await Promise.all([res1Promise, res2Promise, res3Promise]);
    const imgs = all.map(el => el.body.message);
    console.log(imgs);

    await writeFilePromise(`${__dirname}/dog-img.txt`, imgs.join("\n"));
    console.log("Imagem salva!");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "Success";
};

// getDogPic()
//   .then(n => console.log(n))
//   .catch(err => console.log("Error"));

// IIFE
(async () => {
  try {
    const n = await getDogPics();
    console.log(n);
  } catch (err) {
    console.log("Error");
  }
})();
