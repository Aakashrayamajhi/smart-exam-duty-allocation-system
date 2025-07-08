import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
    const username = useRef()
    const password = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate('/admin')
        }
    }, [navigate])

    const handlesubmit = async (e) => {
        e.preventDefault()

        const data = {
            username: username.current.value,
            password: password.current.value
        }

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (response.ok) {
                localStorage.setItem('token', result.token)
                localStorage.setItem('username', result.username)
                navigate('/admin')
            } else {
                alert(result.message || 'Login failed')
            }
        } catch (error) {
            alert('Server error')
            console.error(error)
        }
    }

    return (
        <div className='login-page'>
            <div className='login-card'>
                <div className='login-left-bg'></div>
                <div className='login-form'>
                    <h2>Admin Login</h2>
                    <form onSubmit={handlesubmit}>
                        <div className='input-group'>
                            <span className='icon'>👤</span>
                            <input type='text' placeholder='Username' ref={username} required />
                        </div>
                        <div className='input-group'>
                            <span className='icon'>🔒</span>
                            <input type='password' placeholder='Password' ref={password} required />
                        </div>
                        <button type='submit' className='login-btn'>Login</button>
                    </form>
                    <p className='small-text'>Faculty members should:</p>
                    <a className='link-text' onClick={() => window.location.href = 'http://localhost:3001/auth/google'}>
                        Authorize
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Login
