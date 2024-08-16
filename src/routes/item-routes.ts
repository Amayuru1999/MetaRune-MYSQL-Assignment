
import express from 'express';
import { InternRepository } from '../InternRepository';
import { IIntern } from '../IIntern';
import { mysqlConnection } from '../server'; 

const router = express.Router();
const internRepository = new InternRepository(mysqlConnection!); 


router.post('/add', async (req, res) => {
    try {
        const intern: IIntern = req.body;
        await internRepository.save(intern);
        res.status(201).json({ message: 'Intern added successfully' });
    } catch (error) {
        console.error('Error adding intern:', error);
        res.status(500).json({ message: 'Error adding intern' });
    }
});

export default router;
