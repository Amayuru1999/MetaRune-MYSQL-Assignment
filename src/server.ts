import express from 'express';
import itemRoutes from "./routes/item-routes";
import dotenv from 'dotenv';
import { Server } from "http";
import mysql, { Connection } from 'mysql2/promise';

dotenv.config();

const PORT = 5000;
const app = express();
let server: Server;
let mysqlConnection: Connection | null = null;

// JSON middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello Metaroon 2024!' });
});


app.use('/api/v1/items', itemRoutes);

// Connect to MySQL database
async function connectToDatabase(): Promise<Connection> {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'interns'
        });
        console.log('✅ Connected to database');
        

        return connection;
    } catch (err) {
        console.error('❌ Error connecting to database: ', err);
        throw err;
    }
}

// Start the server
(async () => {
    try {
        // Connect to MySQL
        mysqlConnection = await connectToDatabase();

        // Start Express server
        server = app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    } catch (ex) {
        console.log('🔴 Failed to start application due to database connection error', ex);
    }
})();

export { app, server, mysqlConnection };
