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

    //Retrieve interns
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
    
    //Retrieve interns by id
    async retrieveById(id: number): Promise<IIntern | undefined> {
        const query = 'SELECT * FROM interns WHERE id = ?';
        const [rows] = await this.connection.execute(query, [id]);
        const result = rows as IIntern[];
        return result.length > 0 ? result[0] : undefined;
    }

    //Update an intern record
    async update(record: IIntern): Promise<number> {
        const query = 'UPDATE interns SET name = ?, email = ?, school = ?, start_date = ?, end_date = ? WHERE id = ?';
        const values = [record.name, record.email, record.school, record.startDate, record.endDate, record.id];
        const [result] = await this.connection.execute(query, values);
        return (result as any).affectedRows;
    }

}