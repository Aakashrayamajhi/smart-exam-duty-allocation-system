import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import loginmodel from '../models/loginmodel.js'

const login = express.Router()
const JWT_SECRET = 'secretkey'

login.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        let admin = await loginmodel.findOne({ username })

        if (!admin && username === 'admin@gmail.com') {
            const hash = await bcrypt.hash('1234', 10)
            admin = await loginmodel.create({ username, password: hash })
        }

        if (!admin) {
            return res.status(401).json({ message: 'Invalid username or password' })
        }

        const match = await bcrypt.compare(password, admin.password)
        if (!match) {
            return res.status(401).json({ message: 'Invalid username or password' })
        }

        const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1d' })
        res.json({ message: 'Login successful', token, username: admin.username })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server error' })
    }
})

export default login
