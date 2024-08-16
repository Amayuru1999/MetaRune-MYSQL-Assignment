import mongoose, {Schema} from "mongoose";

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})

const ItemsSchemaModel = mongoose.model('items', itemSchema)

export default ItemsSchemaModel