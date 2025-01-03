// mongodb.js

import { MongoClient } from 'mongodb';

const uri =
  'mongodb+srv://root:yhXiz9s0c9AYpq7G@cluster0.1oeuk.mongodb.net/?retryWrites=true&w=majority&';
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to Environment vars');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(
      uri,
      {
        useUnifiedTopology: true,
      },
      {
        useNewUrlParser: true,
      },
      {
        connectTimeoutMS: 30000,
      },
      {
        keepAlive: 1,
      }
    );
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(
    uri,
    {
      useUnifiedTopology: true,
    },
    {
      useNewUrlParser: true,
    },
    {
      connectTimeoutMS: 30000,
    },
    {
      keepAlive: 1,
    }
  );
  clientPromise = client.connect();
}

export default clientPromise;
