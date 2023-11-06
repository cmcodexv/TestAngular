process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

// Env files
import dotenv from 'dotenv';

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

import express, { json } from 'express';
import cors from 'cors';
import { loadControllers } from 'awilix-express';
import container from './container';
import ensureAuth from './common/middlewares/isAuth';

// Create a new express app instance
const app: express.Application = express();

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:4200'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));
app.use(json());

// Load dependencies
container(app);

// middleware
if (process.env.jwt_secret_key) {
    app.use(ensureAuth);
}
// Load controllers
app.use(loadControllers(
    'controllers/*.ts',
    { cwd: __dirname })
);

export { app };