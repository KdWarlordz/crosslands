import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import compression from 'compression';
import { MapService } from './src/services/mapService.js';
import { ConfigService } from './src/services/configService.js';
import { middleware } from 'express-openapi-validator';
import bodyParser from 'body-parser';
import connectDB from './src/dbConnector.js';
import { MapMatrixDataModel } from './src/models/mapModel.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.APIPORT || 8888;
app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const swaggerDocument = YAML.load(path.join(__dirname, './openapi.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(middleware({
    apiSpec: path.join(__dirname, './openapi.yaml'),
    validateRequests: true,
    validateResponses: true
}));
app.get('/api/health', (req, res) => {
    res.json({ message: '*** Crossland API is up and running v0.01 ***' });
});
app.get('/api/chains/:chain/:planet/:id', async (req, res) => {
    const { chain, planet, id } = req.params;
    try {
        const data = await MapService.getMatrixData(chain, planet, id);
        if (data) {
            res.json(data);
        }
        else {
            res.status(404).json({ error: 'Data not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/api/addworld', async (req, res) => {
    const { chain, planet, id, seed, matrix } = req.body;
    try {
        const newMapMatrixData = new MapMatrixDataModel({
            chain,
            planet,
            id,
            seed,
            matrix
        });
        const savedData = await newMapMatrixData.save();
        res.status(201).json(savedData);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/api/config', async (req, res) => {
    try {
        const data = await ConfigService.getConfig();
        if (data) {
            res.json(data);
        }
        else {
            res.status(404).json({ error: 'Config not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/api/config', async (req, res) => {
    const configData = req.body;
    try {
        const savedData = await ConfigService.saveConfig(configData);
        res.status(201).json(savedData);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/api/routes', (req, res) => {
    const routes = getRoutes(app);
    res.json(routes);
});
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.json({ message: '*** Crossland v1.0' });
});
app.use((err, req, res, next) => {
    if (err.status && err.errors) {
        return res.status(err.status || 500).json({
            message: err.message,
            errors: err.errors
        });
    }
    next(err);
});
connectDB();
app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});
// Dev test only
function getRoutes(app) {
    const routes = [];
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            routes.push(`${Object.keys(middleware.route.methods)[0].toUpperCase()} ${middleware.route.path}`);
        }
        else if (middleware.name === 'router') {
            middleware.handle.stack.forEach((handler) => {
                const route = handler.route;
                if (route) {
                    routes.push(`${Object.keys(route.methods)[0].toUpperCase()} ${route.path}`);
                }
            });
        }
    });
    return routes;
}
