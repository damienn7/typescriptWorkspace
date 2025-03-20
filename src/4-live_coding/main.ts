import express from 'express';

const app = () => {
    const app = express();
    const port = 3000;
    app.use(express.json());

    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`)
    });
}