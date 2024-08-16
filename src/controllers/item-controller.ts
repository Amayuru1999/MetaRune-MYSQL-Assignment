import {Request, Response} from "express";
import ItemsSchemaModel from "../models/item-model";
import {v4 as uuid} from 'uuid'

export class ItemController {
    public static async createItem(req: Request, res: Response) {
        const {name} = req.body
        if(!name) return res.status(400).json({message: 'Name is required!'})

        try{
            const newItem = new ItemsSchemaModel({
                name: name,
                id: uuid(),
            })

            const result = await newItem.save()

            // const result  = await itemsCollection.insertOne({name, id: uuid()})
            res.status(200).json({message: 'Item added successfully', result})
        }catch(ex){
            res.status(400).json({message: 'Error occurred'})
        }
    }

    public static async getAllItems(req: Request, res: Response) {
        try{
            const result = await ItemsSchemaModel.find()
            res.status(200).json({message: 'Get all items successfully', result})
        }catch(ex){
            res.status(400).json({message: 'Error occurred'})
        }
    }
}