import express from 'express'

import postgresClient from '../config/db.js'

const router = express.Router()
// Create user
router.post('/create_user', async (req, res) => {
    try {
        const text = "INSERT INTO users (name, surname, mail, password) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [req.body.name, req.body.surname, req.body.mail, req.body.password];
        const { rows } = await postgresClient.query(text, values);

        return res.status(201).json({ createdUser: rows[0] });
    } catch (error) {
        console.error('Error occurred', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Authenticate user
router.post('/login', async (req, res) => {
    try {
        const text = "SELECT * FROM users WHERE mail = $1 AND password = $2";
        const values = [req.body.mail, req.body.password];
        const { rows } = await postgresClient.query(text, values);

        if (!rows.length)
            return res.status(404).json({ message: 'User not found.' });

        return res.status(200).json({ message: 'Authentication successful.', userId:rows[0].id, userName:rows[0].name});
    } catch (error) {
        console.error('Error occurred', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Delete user
router.delete('/:userId', async (req, res) => {
    try {
        const { userId } = req.params

        const text = "DELETE FROM users WHERE id = $1 RETURNING *"

        const values = [userId]

        const { rows } = await postgresClient.query(text, values)
        if(!rows.length)
            return res.status(404).json({ message: 'User not found.' })

        return res.status(200).json({ deletedUser: rows[0] })
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })   
    }
})

// Get users
router.get('/get_users', async (req, res) => {
    try {
        const text = "SELECT * FROM users ORDER BY id ASC"

        const { rows } = await postgresClient.query(text)

        return res.status(200).json(rows)
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })   
    }
})


export default router