import React from 'react'
import './Admin.css'
import { replace, useNavigate } from 'react-router-dom'





function Adminnav() {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate('/login', { replace: true })

    }
    return (

        <div className="navbar" >
            <div className="navbar-left">Smart Dashboard</div>
            <div className="navbar-right">
                <button onClick={logout} className="btn">Logout</button>

            </div>
        </div >


    )
}

export default Adminnav
