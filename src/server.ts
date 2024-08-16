import express from 'express';
import itemRoutes from "./routes/item-routes";
import dotenv from 'dotenv'
import {Server} from "http";
import mysql,{Connection} from 'mysql2/promise';
dotenv.config()

const PORT = 5000
const app = express()
let server: Server
let mysqlConnection: Connection | null = null;

// json serialize
app.use(express.json())

// Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));


// routes
app.get('/', (req, res)=> {
    res.status(200).json({message: 'Hello Metaroon 2024!'})
    // res.sendFile(path.join(__dirname, 'public/index.html'));
})
app.use('/api/v1/items', itemRoutes)

// Start the express app
async function connectToDatabase(): Promise<Connection> {
    try{
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Amayuru@1999',
            database: 'interns'
        });
        console.log('✅ Connected to database');
        return connection;
    }catch(err){
        console.error('❌ Error connecting to database: ', err);
        throw err;
    }
    
}
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
export {app,server,mysqlConnection}

