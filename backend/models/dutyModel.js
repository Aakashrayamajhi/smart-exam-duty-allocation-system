import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/data')

const dutySchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 }
});

const dutyModel = mongoose.model('TeacherDuty', dutySchema);
export default dutyModel;
