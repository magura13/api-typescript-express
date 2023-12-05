import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for your Node.js API',
    },
  },
  apis: ['./src/routes/*.ts'], // Caminho para seus arquivos de rota TypeScript
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
