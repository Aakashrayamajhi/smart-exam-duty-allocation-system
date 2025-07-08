import express from 'express'
import allocatemodel from '../models/allocatemodel.js'
import { Token, Event } from '../models/calendarmodel.js'
import dutyModel from '../models/dutyModel.js'
import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const allocate = express.Router()


const __filename = fileURLToPath(import.meta.url)
// import.meta.url le current file ko URL path dinxa (like file:///...)
// fileURLToPath le tyo URL lai OS ko format ma normal file path ma convert garxa
// jasto C:\Users\abc\project\file.js

const __dirname = path.dirname(__filename)
// path.dirname le __filename bata tyo file ko folder ko path dinxa
// jasle hamlai current file ko folder path dinxa

// credentials.json file bata Google API ko client ID, secret, redirect path linxa
const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json')))
const { client_id, client_secret, redirect_uris } = credentials.web

// yo function le pathako time arko event sanga overlap cha ki chaina check garxa
function isFree(events, startTime, endTime) {
    return !events.some(e => {
        const eventStart = new Date(e.start.dateTime || e.start)
        const eventEnd = new Date(e.end.dateTime || e.end)
        return startTime < eventEnd && endTime > eventStart
    })
}

// OAuth client banayera credentials set garxa
function createOAuthClient(tokens) {
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
    oAuth2Client.setCredentials(tokens)
    return oAuth2Client
}

// exam duty allocate garne main route
allocate.post('/allocate', async (req, res) => {
    try {
        const { summary, description, location, roomNumbers, startTime, endTime } = req.body
        const start = new Date(startTime)
        const end = new Date(endTime)

        // roomNumbers string ma aako cha vane array ma split garxa
        const rooms = typeof roomNumbers === 'string'
            ? roomNumbers.split(',').map(r => r.trim()).filter(r => r !== '')
            : Array.isArray(roomNumbers) ? roomNumbers : []

        // sabai authorized teachers ko token tanne
        const authorizedTeachers = await Token.find()
        const available = []

        // sabai teacher haru loop garera kun free xa bhanera check garxa
        for (const teacher of authorizedTeachers) {
            const teacherEmail = teacher.email
            const events = await Event.find({ userEmail: teacherEmail })
            const free = isFree(events, start, end)
            if (free) {
                const duty = await dutyModel.findOne({ email: teacherEmail })
                const count = duty?.count || 0
                available.push({
                    id: teacher._id,
                    email: teacherEmail,
                    dutyCount: count
                })
            }
        }

        // duty count ascending anusar sort garxa
        available.sort((a, b) => a.dutyCount - b.dutyCount)

        // rooms.length jati teacher select garxa
        const selected = available.slice(0, rooms.length)

        // duty count 1 le badhauxa
        for (const teacher of selected) {
            await dutyModel.updateOne(
                { email: teacher.email },
                { $inc: { count: 1 } },
                { upsert: true }
            )
        }

        //  selected teacher lai euta room assign garxa
        for (let i = 0; i < selected.length; i++) {
            selected[i].room = rooms[i] || 'Not Assigned'
        }

        // Google Calendar ma event create garxa
        for (let i = 0; i < selected.length; i++) {
            const teacher = selected[i]
            const room = teacher.room

            const teacherToken = await Token.findOne({ email: teacher.email })
            if (!teacherToken || !teacherToken.tokens) continue

            const auth = createOAuthClient(teacherToken.tokens)
            const calendar = google.calendar({ version: 'v3', auth })

            const calendarEvent = {
                summary,
                description: `${description} (Room: ${room})`,
                location: `${location} - Room ${room}`,
                start: { dateTime: start.toISOString(), timeZone: 'Asia/Kathmandu' },
                end: { dateTime: end.toISOString(), timeZone: 'Asia/Kathmandu' }
            }

            try {
                await calendar.events.insert({
                    calendarId: 'primary',
                    resource: calendarEvent
                })
                console.log(`Event created for ${teacher.email} in Room ${room}`)
            } catch (err) {
                console.error(`Failed to create event for ${teacher.email}:`, err.message)
            }
        }

        // yo allocation ko details database ma save garxa
        const saved = await allocatemodel.create({
            summary,
            description,
            location,
            roomNumbers: rooms,
            startTime: start,
            endTime: end,
            available,
            selected
        })

        // response ma success message pathauxa
        res.status(201).json({
            message: 'Duty allocated and events created on Google Calendar',
            data: saved,
            selectedTeachers: selected
        })
    } catch (err) {
        console.error('Error during allocation:', err)
        res.status(500).json({ message: 'Error saving allocation', error: err.message })
    }
})

export default allocate
