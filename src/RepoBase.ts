import mysql,{Connection} from 'mysql2/promise';

async function connectToDatabase(): Promise<Connection> {
    try{
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'test'
        });
        console.log('✅ Connected to database');
        return connection;
    }catch(err){
        console.error('❌ Error connecting to database: ', err);
        throw err;
    }
    
}
(async()=>{
    const connection = await connectToDatabase();
})();