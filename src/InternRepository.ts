import { IIntern } from "./IIntern";
import { Connection} from 'mysql2/promise';

export class InternRepository{
    private connection: Connection;
    constructor(connection: Connection){
        this.connection = connection;
    }

    //save a new intern record
    async save(intern:IIntern): Promise<void>{
        const query=`INSERT INTO interns(name,email,school,start_date,end_date) VALUES(?,?,?,?,?)`;
        const values=[intern.name,intern.email,intern.school,intern.startDate,intern.endDate,intern.startDate,intern.endDate];
        await this.connection.query(query,values);
    }

    //Retrieve intern by id
    async retrieveAll(searchParams?:{id?:number}):Promise<IIntern[]>{
        let query = 'SELECT * FROM interns';
        const values: any[] = [];
        if(searchParams && searchParams.id){
            query += `WHERE id = ?`;
            values.push(searchParams.id);
        }
        const [rows] = await this.connection.execute(query,values);
        return rows as IIntern[];
    }
}