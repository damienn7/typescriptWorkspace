import express from 'express';
import axios from 'axios';
import { Get } from './promiseChain';


const app = express();
const port = 3000; // Vous pouvez choisir le port que vous préférez

app.get('/api/get/promise/chain', async (req, res) => {
    try {
        const response = await Get();
        res.json(response); // Envoie les données JSON récupérées à l'utilisateur
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An error occurred while fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
