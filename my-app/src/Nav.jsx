import React from 'react'
import './Style/Style.css'

export default function Nav() {
    return (
        <nav className="regnav-container">
            <img src="/assets/knshdlogo.png" alt="Logo" className="logo" />
            <div className="text-block">
                <h1 className="title">Kolehiyo Ng Subic</h1>
                <p className="subtitle">SSG VOTING SYSTEM 2025</p>
            </div>
        </nav>
    )
}
