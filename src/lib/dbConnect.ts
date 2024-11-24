import mongoose from "mongoose";
import { DBconstant } from "../DB_constant";

type ConnectionObject = {
  isConnected?: number; // Tracks connection state: 0 (disconnected), 1 (connected), etc.
};

const connection: ConnectionObject = {};

// Ensures the database is connected
async function dbConnect(): Promise<void> {
  console.log('in db')
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  // Ensure MONGODB_URI is defined
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    throw new Error("MONGODB_URI is required for database connection");
  }

  // Construct the connection string
  const connectionString = `${mongoUri}/${DBconstant}`;
  try {
    // Connect to MongoDB
    const db = await mongoose.connect(connectionString);
    connection.isConnected = db.connections[0].readyState;

    console.log(`DB connected successfully: ${connectionString}`);
  } catch (error) {
    console.error("Database connection failed:", error);

    // Consider removing process.exit for non-critical setups
    process.exit(1);
  }
}

export default dbConnect;