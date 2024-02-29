import express, { Router } from 'express'

import postgresClient from '../config/db.js'

const router = express.Router()

// Get product
router.get('/get_product', async (req, res) => {
    try {
        const text = "select * from categories join products on categories.category_id=products.category_id join product_image on product_image.product_id=products.product_id order by categories.category_id"

        const { rows } = await postgresClient.query(text)

        console.log("Succesfull")

        return res.status(200).json(rows)
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })   
    }
});


// Basket Delete product
router.post('/basket_del_product', async(req, res) => {
    try{
        const text = "delete from basket where (user_id=$1 and product_id=$2) returning *";
        const values = [req.body.userID, req.body.product_id];
        const {rows} = await postgresClient.query(text, values);

        if(!rows.length)
            return res.status(404).json({message: 'Product not found.'});

        return res.status(200).json(rows)

    }catch(error){
        console.log('ERror occured:', error.message)
        return res.status(400).json({message: error.message})
    }
});



//POST product add_basket
router.post('/add_basket', async(req, res) => {
    try{
        const text = "INSERT INTO basket (user_id, product_id) VALUES ($1,$2) returning*";
        const values = [req.body.userID, req.body.product_id];
        const {rows} = await postgresClient.query(text, values);

        if(!rows.length)
            return res.status(404).json({message: 'Product not found.'});

        return res.status(200).json(rows)

    }catch(error){
        console.log('ERror occured:', error.message)
        return res.status(400).json({message: error.message})
    }
});



//POST-GET basket
router.post('/get_basket', async(req, res) => {
    try{
        const text = "select * from basket join products on basket.product_id = products.product_id join product_image on basket.product_id = product_image.product_id where basket.user_id=$1";
        const values = [req.body.userID];
        const {rows} = await postgresClient.query(text, values);

        if(!rows.length)
            return res.status(404).json({message: 'Product not found.'});

        return res.status(200).json(rows)

    }catch(error){
        console.log('ERror occured:', error.message)
        return res.status(400).json({message: error.message})
    }
});




//create product
router.post('/create_product', async (req, res) => {
    try {

        const { name, price, description } = req.body;
        const text = "INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *";
        const values = [name, price, req.body.des, req.body.password];
        const { rows } = await postgresClient.query(text, [
            name,
            price,
            description

        ]);

        return res.status(201).json({ createdUser: rows[0] });
    } catch (error) {
        console.error('Error occurred', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});







export default router