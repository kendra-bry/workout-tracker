const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'Workout Tracker API',
    description: 'CSE 341 Workout Tracker API',
  },
  host: `localhost:${process.env.PORT}`,
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    Exercise: {
      $name: 'Dumbbell Rows',
      startTime: '2023-06-15',
      endTime: '2023-06-15',
      duration: '30 minutes',
      reps: '5',
      sets: '3',
      weight: '150 lbs',
      distance: '1 mi',
      notes: 'This was a tough exercise.',
    },
    Workout: {
      startTime: '2023-06-15',
      endTime: '2023-06-15',
      exercises: {
        type: 'array',
        items: {
          $ref: '#/definitions/Exercise'
        }
      }
    },
  },
};

const endpointsFiles = ['./src/app.ts'];
let outputFile = './src/swagger.json';

if (process.env.NODE_ENV === 'PROD') {
  doc.host = process.env.HOST;
  doc.schemes = ['https'];
  outputFile = './dist/swagger.json';
}


swaggerAutogen(outputFile, endpointsFiles, doc);