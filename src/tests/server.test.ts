import request from 'supertest';
import {app, server} from '../server';
import mongoose from "mongoose";

afterAll(async () => {
    // disconnect from mongodb
    await mongoose.disconnect()
    // close the server
    server.close();
})

describe('GET /', () => {
    it('should respond with a message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Hello World!' });
    });
});