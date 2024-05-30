import app from './app';
import connectMongoDb from './services/mongoDb';

const port = process.env.PORT || 3001;

connectMongoDb().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});