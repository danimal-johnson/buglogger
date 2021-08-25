const mongoose = require('mongoose');

const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

const connectDB = async () => {
  try {
    const db = await mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.hb3ae.mongodb.net/${dbName}?retryWrites=true&w=majority`,
      { useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
      }
    );
    console.log('Connected to DB');
    return db;
  } catch (err) {
    console.error('Error connecting to DB', err);
    process.exit(1);
  }
}

module.exports = connectDB;