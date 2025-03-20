# Exercice Package manager

# Step 1
Setup un projet npm Typescript avec toutes les libs nécéssaire

# Step 2
Ajouter une lib `axios` pour vos requêtes réseaux, `nodemon` en version 3.0.0 spécifiquement pour votre environnement de développement

# Step 3
Créer un fichier main.ts à la racine avec le code suivant:

```ts
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
```

# Step 4
Ajouter la lib express à votre projet dans la dernière version dispo, il faut que elle soit configuré de façon à ce qu'elle puisse mettre à jour les versions de patch

# Step 5
Il faut setup votre partie script pour vous permettre de run la commande `npm run start:dev` et ainsi de run votre projet avec du `hot reload`. La commande à run derrière cette commande npm est `npx nodemon -e ts --exec ts-node main.ts`. Quand vous aurez fait ça faites un test sur l'url exposé par votre api express dans votre navigateur pour voir les changements avoir lieu sans avoir besoin de relancer votre serveur.

# Step 6
Setup la partie script pour vous permettre de transpiler votre code typeScript en javascript dans un dossier dist puis de l'éxecuter