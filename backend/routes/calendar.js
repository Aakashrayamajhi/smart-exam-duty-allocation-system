import express from 'express'
const calendar = express.Router()
import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Token, Event } from '../models/calendarmodel.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// credentials.json file bata Google OAuth2 credentials lincha
const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json')))
const { client_id, client_secret, redirect_uris } = credentials.web

// yo function le OAuth2 client object banauxa
function createOAuthClient(tokens) {
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
    oAuth2Client.setCredentials(tokens)
    return oAuth2Client
}

// yo function le Google Calendar bata event fetch garera Mongodb ma rakhxa
async function fetchAndStoreEvents(tokens, userEmail) {
    try {
        const oAuth2Client = createOAuthClient(tokens)

        // yedi token expire vako cha vane Google le new access token return garcha
        const tokenInfo = await oAuth2Client.getAccessToken()

        if (tokenInfo.res && tokenInfo.res.data) {
            await Token.findOneAndUpdate({ email: userEmail }, { tokens: { ...tokens, access_token: tokenInfo.token } })
            oAuth2Client.setCredentials({ ...tokens, access_token: tokenInfo.token })
            console.log(`Token refreshed for ${userEmail}`)
        }

        const calendarApi = google.calendar({ version: 'v3', auth: oAuth2Client })
        // Google Calendar API client object banauxa
        const response = await calendarApi.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 50,
            singleEvents: true,
            orderBy: 'startTime'
        })

        const events = response.data.items || []
        console.log(`Fetched ${events.length} events for ${userEmail}`)

        for (const ev of events) {
            await Event.findOneAndUpdate(
                { eventId: ev.id, userEmail },
                {
                    eventId: ev.id,
                    summary: ev.summary || '',
                    description: ev.description || '',
                    start: ev.start,
                    end: ev.end,
                    userEmail
                },
                { upsert: true }
            )
        }
    } catch (err) {
        console.error(`Error fetching/saving events for ${userEmail}:`, err.message)
    }
}

// yo route le.... user lai Google login garna pathauncha
calendar.get('/auth/google', (req, res) => {
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline', // offline le refresh token dincha
        scope: [
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
        prompt: 'consent'
    })
    res.redirect(authUrl)
})

// Google le auth code pathaune bela yaha hit huncha
calendar.get('/__/auth/handler', async (req, res) => {
    try {
        const code = req.query.code
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

        const { tokens } = await oAuth2Client.getToken(code)
        oAuth2Client.setCredentials(tokens)

        const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client })
        const { data } = await oauth2.userinfo.get()
        const userEmail = data.email

        // token MongoDB ma save garne
        await Token.findOneAndUpdate({ email: userEmail }, { tokens }, { upsert: true })
        console.log(`Token saved for ${userEmail}`)

        // pahilo patak calendar fetch garne
        await fetchAndStoreEvents(tokens, userEmail)

        res.send(`<h3>Authorization complete for ${userEmail}</h3><a href="http://localhost:3000"><- Back</a>`)
    } catch (err) {
        console.error('Auth Error:', err.message)
        res.status(500).send('Error during Google auth.')
    }
})

// yo interval le 5 minute ma sabai users ko event sync garne
setInterval(async () => {
    try {
        const tokensList = await Token.find({})
        for (const tokenDoc of tokensList) {
            await fetchAndStoreEvents(tokenDoc.tokens, tokenDoc.email)
        }
    } catch (err) {
        console.error('Periodic sync error:', err.message)
    }
}, 5 * 60 * 1000)

export default calendar
