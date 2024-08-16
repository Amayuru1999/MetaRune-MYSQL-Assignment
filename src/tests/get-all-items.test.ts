import { Request, Response } from 'express';
import ItemsSchemaModel from "../models/item-model";
import {ItemController} from "../controllers/item-controller";

describe('getAllItems', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockFind: jest.SpyInstance;

    beforeEach(() => {
        mockRequest = {};

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        mockFind = jest.spyOn(ItemsSchemaModel, 'find');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve all items successfully', async () => {
        const items = [{ name: 'Item 1', id: '1' }, { name: 'Item 2', id: '2' }];
        mockFind.mockResolvedValue(items);

        await ItemController.getAllItems(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Get all items successfully',
            result: items,
        });
    });

    it('should handle errors during retrieval', async () => {
        mockFind.mockRejectedValue(new Error('Database error'));

        await ItemController.getAllItems(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error occurred' });
    });
});
