const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		res.render('products', {products});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		const id = req.params.id;
		const productSelected = products.filter(product => product.id == id)
		console.log(productSelected);
		res.render('detail', {productSelected});
		// const id = req.params.id;
		// const selectProduct = (id) => {
		// 	const product = products.find(product => product.id == id );
		// 	return product;
		// }
		// res.render('detail', {product: selectProduct(id)});
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			image: req.file.filename
		}
		console.log(newProduct);
		products.push(newProduct)
		console.log(newProduct);
		const jsonProducts = JSON.stringify(products);

		fs.writeFileSync(productsFilePath, jsonProducts, 'utf-8');

		res.render('product-create-form');

	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		let idProducto = req.params.id
		let productToEdit = products[idProducto];
		res.render('product-edit-form', {productToEdit});
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		res.render('update');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		res.render('destroy');
	}
};

module.exports = controller;