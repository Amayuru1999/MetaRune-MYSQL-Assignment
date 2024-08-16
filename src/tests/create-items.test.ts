import {Request, Response} from 'express';
import ItemsSchemaModel from "../models/item-model";
import {ItemController} from "../controllers/item-controller";
import {connectToMongoDB} from "../configs/mongodb";
import mongoose from "mongoose";
import {server} from "../server";
import dotenv from "dotenv";
dotenv.config()

jest.mock('uuid', () => {
    return {
        v4: jest.fn(),
    };
});

beforeAll(async ()=> {
    await connectToMongoDB('mongodb+srv://stoXmod:5VJbnUadD3lLZPJu@cluster0.avfm1yl.mongodb.net/test?retryWrites=true&w=majority')
})

afterAll(async () => {
    // disconnect from mongodb
    await mongoose.disconnect()
    // close the server
    server.close();
})

describe('createItem', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockSave: jest.SpyInstance;

    beforeEach(() => {
        mockRequest = {
            body: {},
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        mockSave = jest.spyOn(ItemsSchemaModel.prototype, 'save');
        (require('uuid').v4 as jest.Mock).mockReturnValue('unique-uuid');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully create an item', async () => {
        mockRequest.body = { name: 'Test Item' };

        await ItemController.createItem(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // expect(mockResponse.json).toHaveBeenCalledWith({
        //     message: 'Item added successfully',
        //     result: { name: 'Test Item', id: 'unique-uuid' },
        // });
    });

    it('should return 400 if name is not provided', async () => {
        await ItemController.createItem(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Name is required!' });
    });

    it('should handle database errors', async () => {
        mockRequest.body = { name: 'Test Item' };
        mockSave.mockRejectedValue(new Error('Database error'));

        await ItemController.createItem(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error occurred' });
    });
});
