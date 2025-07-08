import React, { useEffect } from 'react'
import './Notification.css'
import Emailimg from '../component/Email.jpg'

function Notification() {

    return (
        <div className='notify'>
            <div className='img-box'>
                <img src='https://static.vecteezy.com/system/resources/previews/016/017/112/original/email-notification-free-png.png'></img>


            </div>

            <div className='email-box'>
                <input type='text' placeholder='name'></input>
                <input type='email' placeholder='email'></input>
                <textarea placeholder='message'></textarea>
                <button type='submit'>submit</button>

            </div>
        </div>
    )
}

export default Notification
