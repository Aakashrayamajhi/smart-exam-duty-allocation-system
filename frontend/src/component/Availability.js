import React from 'react';
import { useLocation } from 'react-router-dom';
import './Availability.css'

function Availability() {
    const location = useLocation();
    const selectedTeachers = location.state?.selectedTeachers || [];
    const eventData = location.state?.eventData;

    const handleGeneratePDF = async () => {
        try {
            const response = await fetch('http://localhost:3001/pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    teachers: selectedTeachers,
                    event: eventData,
                })
            });

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
        } catch (err) {
            console.error("PDF generation failed", err);
        }
    };

    const handleNotifyAll = async () => {
        try {
            const response = await fetch('http://localhost:3001/mail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    teachers: selectedTeachers,
                    event: eventData,
                })
            });

            const result = await response.json();
            alert(result.message || 'Notification sent successfully');
        } catch (err) {
            console.error("Notification failed", err);
            alert('Failed to send notifications');
        }
    };

    return (
        <div className='allocatedcontainer'>
            <h2>Selected Faculty</h2>
            <ul className='allocatedlist'>
                {selectedTeachers.length === 0 ? (
                    <li>No teachers allocated</li>
                ) : (
                    selectedTeachers.map((teacher, i) => (
                        <li key={i}>
                            {teacher.email} - Room: {teacher.room || 'Not Assigned'}
                        </li>
                    ))
                )}
            </ul>

            {selectedTeachers.length > 0 && (
                <>
                    <button id='pdf' onClick={handleGeneratePDF}>Generate PDF</button>
                    <button id='notify' onClick={handleNotifyAll}>Notify All</button>
                </>
            )}
        </div>
    );
}

export default Availability;
