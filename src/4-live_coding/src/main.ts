import express from 'express';
import { initHandlers } from './handlers/handler';
import { AppDataSource } from './db/database';
const app = async () => {
    const app = express();
    const port = 3000;
    app.use(express.json());

    initHandlers(app);

    try {
        await AppDataSource.initialize();
    } catch (error) {
        console.error(error);
    }

    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`)
    });
}

app()