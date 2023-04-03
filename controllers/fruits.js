const express = require('express');
const router = express.Router();
const startFruits = require('../db/fruitSeedData.js')
const Fruit = require('../models/fruit.js')

// Post
router.post('/', async (req, res) => {
	console.log(req.body)
	req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
	const fruit = await Fruit.create(req.body);
	res.redirect('/fruits');
});

// New
router.get('/new', (req, res) => {
	res.render("fruits/new.ejs")
});


// Index .. show all fruits
router.get('/', async (req, res) => {
	Fruit.find({}) // this is a promise
	.then((fruits) => {
		// res.send(fruits)
		// console.log(fruits)
		res.render("fruits/index.ejs", {fruits});
	})
});
// router.get('/', async (req, res) => {
// 	const fruits = await Fruit.find({});
// 	// res.send(fruits);
// 	res.render("fruits/index.ejs", {fruits});
// });

// Seed
router.get('/seed', (req, res) => {
	Fruit.deleteMany({})
	.then(() => {
		Fruit.insertMany(startFruits)
		.then((fruits) => {
			console.log(fruits);//show us what we got
			res.redirect('/fruits');
		})
	})	
});

// Show
router.get('/:id', async (req, res) => {
	const fruit = await Fruit.findById(req.params.id);
	// res.send(fruit);
	res.render("fruits/show.ejs", {fruit})
});

// Delete
router.delete('/:id', async (req, res) => {
	const fruit = await Fruit.findByIdAndDelete(req.params.id);
	res.redirect('/fruits');
});

// Update
router.put('/:id', async (req, res) => {
	const fruit = await Fruit.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.send(fruit);
});

module.exports = router;
