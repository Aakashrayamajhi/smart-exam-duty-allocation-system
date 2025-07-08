import mongoose from "mongoose"

mongoose.connect('mongodb://127.0.0.1:27017/data')

const allocateschema = mongoose.Schema(
    {
        summary: String,
        description: String,
        location: String,
        roomNumbers: Array,
        startTime: Object,
        endTime: Object,
        available: Array,
        selected: Array
    }
)

const allocatemodel = mongoose.model('allocated-task', allocateschema)

export default allocatemodel
