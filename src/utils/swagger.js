import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import config from 'config';

import logger from './logger';

const port = config.get('port');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CS-Training API',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
    components: {
      securitySchemes: {
        Bearer: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ Bearer: [] }],
  },
  apis: ['./src/routes/*.js', './src/schema/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = app => {
  // swagger page
  app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));

  // swagger json
  app.get('/api-docs.json', (_, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  logger.info(`Docs available at http://localhost:${port}/api-docs`);
};

export default swaggerDocs;
