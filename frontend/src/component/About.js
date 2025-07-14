/* === About.js === */
import React from "react";
import './About.css';
import './Contact.css'
import Image from './aakash.jpg';

const About = () => {
    return (
        <div className="about-container">
            <section className="about-hero-section">
                <div className="about-title-bg-text">ABOUT</div>
                <div className="about-hero-content">
                    <h1>About Dutrix</h1>
                    <p>We intelligently allocate exam duties – so you don’t have to.</p>
                </div>
            </section>

            <section className="about-info">
                <div className="about-grid-images">
                    <div className="about-img-box about-img1">
                        <img />
                    </div>
                    <div className="about-img-box about-img2">
                        <img />
                    </div>
                    <div className="about-img-box about-img3">
                        <img />
                    </div>
                </div>
                <div className="about-text-info">
                    <h2>What is Dutrix?</h2>
                    <p>
                        Dutrix is a smart exam duty allocation system that fetches faculty schedules via Google Calendar,
                        runs an intelligent algorithm, and creates new duty events accordingly. It also features a notification
                        system to keep everyone informed and organized.
                    </p>
                </div>
            </section>

            <section className="about-developer-section">
                <div className="about-dev-img-box">
                    <img src={Image} alt="Aakash Jung Rayamajhi" />
                </div>
                <div className="about-dev-text-box">
                    <h2>Aakash Jung Rayamajhi</h2>
                    <p>
                        Aakash is a skilled Web and Cross-Platform App Developer with a strong background in full stack development and digital marketing. He is the creator of Dutrix — an innovative and robust solution designed to streamline and automate exam duty management by leveraging modern web technologies.
                    </p>
                </div>
            </section>


        </div>
    );
};

export default About;