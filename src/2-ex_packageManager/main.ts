import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000; // Vous pouvez choisir le port que vous préférez

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        res.json(response.data); // Envoie les données JSON récupérées à l'utilisateur
    } catch (error) {
        console.error('Error fetching dta:', error);
        res.status(500).send('An error occurred while fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
