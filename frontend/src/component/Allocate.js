import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Allocate.css'

const Allocate = () => {
    const [data, setData] = useState({
        summary: '',
        description: '',
        location: '',
        roomNumbers: '',
        startTime: '',
        endTime: ''
    })

    const [message, setMessage] = useState(null)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch('http://localhost:3001/allocate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const result = await res.json()

            if (!res.ok) {
                setMessage({ type: 'error', text: result.error || 'Unknown error' })
                return
            }

            setMessage({ type: 'success', text: result.message })

            navigate('/admin/faculty', {
                state: {
                    selectedTeachers: result.selectedTeachers,
                    eventData: data
                }
            })

            setData({
                summary: '',
                description: '',
                location: '',
                roomNumbers: '',
                startTime: '',
                endTime: ''
            })
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to allocate duties: ' + error.message })
        }
    }

    return (
        <div className="allocate-container">
            <h2>Create Event & Allocate Duty</h2>

            {message && (
                <div
                    style={{
                        padding: '10px',
                        marginBottom: '15px',
                        color: message.type === 'error' ? 'red' : 'green',
                        border: `1px solid ${message.type === 'error' ? 'red' : 'green'}`,
                        borderRadius: '5px'
                    }}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="allocate-form">
                <label>Summary:</label>
                <input
                    type="text"
                    name="summary"
                    value={data.summary}
                    onChange={handleChange}
                    required
                />

                <label>Description:</label>
                <textarea
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    required
                />

                <label>Location:</label>
                <input
                    type="text"
                    name="location"
                    value={data.location}
                    onChange={handleChange}
                    required
                />

                <label>Room Numbers (comma separated):</label>
                <input
                    type="text"
                    name="roomNumbers"
                    placeholder="e.g., 5, 7, 3, 2, 19"
                    value={data.roomNumbers}
                    onChange={handleChange}
                    required
                />

                <label>Start Date-Time:</label>
                <input
                    type="datetime-local"
                    name="startTime"
                    value={data.startTime}
                    onChange={handleChange}
                    required
                />

                <label>End Date-Time:</label>
                <input
                    type="datetime-local"
                    name="endTime"
                    value={data.endTime}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Create Event</button>
            </form>
        </div>
    )
}

export default Allocate
