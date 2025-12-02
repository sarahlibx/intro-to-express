const express = require('express');
const validator = require('validator');

const app = express();

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/', (req, res) => {
    res.send('<h1>Hello Express!</h1>');
});

// greeting route
app.get('/greet/:name', (req, res) => {
    const name = req.params.name;

  // Sending a response with the parameter
  res.send(`<h1>Hello ${name}!</h1>`);
});

// validation parameters
app.get('/roll/:num', (req, res) => {
    const num = req.params.num;

  //validate if parameter is a number
  if(isNaN(num)) {
    return res.send('You must specify a number');
  }

    const roll = Math.floor(Math.random() * (num + 1));
   return res.send(`You entered ${roll}!`);
});

// create route for specific items in an index (key/value pairs)
app.get('/collectibles/:index', (req, res) => {
    const index = Number(req.params.index);

// validation if the item is in the index
    const isNotInteger = !Number.isInteger(index);
    const isNegative = index < 0;
    const isTooLarge = index >= collectibles.length;

    if (isNotInteger || isNegative || isTooLarge) {
        return res.send('This item is not in stock yet, check back soon!');
    }

// assigning the key/value pairs to accessible variables 
    const item = collectibles[index];
    const name = item.name;
    const price = item.price;

    return res.send(`So you want the ${name}? For $${price}, it can be yours!`);
});

// filter shoes by query parameters
app.get('/shoes', (req, res) => {
    const minPrice = req.query['min-price'];
    const maxPrice = req.query['max-price'];
    const type = req.query.type;

    let results = shoes;

    // filter by min-price
    if (minPrice !== undefined) {
        const min = Number(minPrice);
        results = results.filter(shoe => shoe.price >= min);
    }

    // filter by max-price
    if (maxPrice !== undefined) {
        const max = Number(maxPrice);
        results = results.filter(shoe => shoe.price <= max);
    }

    // filter by type
    if (type !== undefined) {
        results = results.filter(shoe => shoe.type === type);
    }

    // edge cases
    if (results.length === 0) {
        return res.send('No shoes match your search.');
  }

    // unfiltered list
    return res.send(results);
});

// Listen for requests on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000')
});
