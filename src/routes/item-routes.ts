import express from "express";
import {ItemController} from "../controllers/item-controller";

const router = express.Router()

router.post('/add-item', ItemController.createItem);
router.get('/', ItemController.getAllItems);

export default router