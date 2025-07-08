import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/data')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Mongo error:', err))

const TokenSchema = new mongoose.Schema({
    email: String,
    tokens: Object,
})

const Token = mongoose.model('Token', TokenSchema)

const EventSchema = new mongoose.Schema({
    userEmail: String,
    eventId: String,
    summary: String,
    description: String,
    start: Object,
    end: Object,
})

const Event = mongoose.model('Event', EventSchema)

export { Token, Event }
