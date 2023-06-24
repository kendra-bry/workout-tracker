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
      startTime: '2023-06-24T01:33:43.197Z',
      endTime: '2023-06-24T01:45:43.197Z',
      duration: '12 minutes',
      reps: 5,
      sets: 3,
      weight: '',
      distance: '',
      notes: 'This was a tough exercise.',
    },
    Workout: {
      startTime: '2023-06-24T01:33:43.197Z',
      endTime: '2023-06-24T01:45:43.197Z',
      $exercises: [{ exercise_id: '647ccbb8813669570a51f2e9' }],
    },
  },
};

const endpointsFiles = ['./src/app.ts'];
const outputFile = './src/swagger.json';

if (process.env.NODE_ENV === 'prod') {
  doc.host = process.env.HOST;
  doc.schemes = ['https'];
}

swaggerAutogen(outputFile, endpointsFiles, doc);
