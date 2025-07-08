import express from 'express'
import PDFDocument from 'pdfkit'
import nodemailer from 'nodemailer'

const availability = express.Router()

availability.post('/pdf', (req, res) => {
    const { teachers, event } = req.body

    const doc = new PDFDocument()
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename="allocated_teachers.pdf"')

    doc.pipe(res)

    doc.fontSize(20).text('Allocated Teachers List', { align: 'center' })
    doc.moveDown()

    doc.fontSize(14).text(`Summary: ${event.summary}`)
    doc.text(`Description: ${event.description}`)
    doc.text(`Location: ${event.location}`)

    const roomsText = Array.isArray(event.roomNumbers)
        ? event.roomNumbers.join(', ')
        : event.roomNumbers

    doc.text(`Rooms: ${roomsText}`)
    doc.text(`Start Time: ${event.startTime}`)
    doc.text(`End Time: ${event.endTime}`)
    doc.moveDown()

    if (!teachers || teachers.length === 0) {
        doc.text('No teachers allocated')
    } else {
        teachers.forEach((teacher, i) => {
            const room = teacher.room || 'Not Assigned'
            doc.text(`${i + 1}. ${teacher.email} - Room: ${room}`)
        })
    }

    doc.end()
})

availability.post('/mail', async (req, res) => {
    const { teachers, event } = req.body

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'esther.graham@ethereal.email',
            pass: 'EBaANdTC4pXMDSCAXD'
        }
    })

    try {
        for (const teacher of teachers) {
            const room = teacher.room || 'Not Assigned'

            await transporter.sendMail({
                from: '"Exam Duty Allocator" <maddison53@ethereal.email>',
                to: teacher.email,
                subject: `Exam Duty Assignment - ${event.summary}`,
                html: `
          <p>Dear <strong>${teacher.email}</strong>,</p>
          <p>You have been assigned for the following exam invigilation duty:</p>
          <ul>
            <li><strong>Summary:</strong> ${event.summary}</li>
            <li><strong>Description:</strong> ${event.description}</li>
            <li><strong>Location:</strong> ${event.location}</li>
            <li><strong>Room:</strong> ${room}</li>
            <li><strong>Start Time:</strong> ${event.startTime}</li>
            <li><strong>End Time:</strong> ${event.endTime}</li>
          </ul>
          <p>Thank you</p>
          <p>Regards,<br/>Exam Committee</p>
        `
            })
        }

        res.status(200).json({ message: 'Emails sent to all selected teachers successfully' })
    } catch (error) {
        console.error('Failed to send emails:', error)
        res.status(500).json({ message: 'Failed to send some or all emails' })
    }
})

export default availability
