import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Home.css";
import { Link } from "react-router-dom";

const AnimatedText = ({ text }) => {
    return (
        <h1 className="homepage-animated-title">
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="homepage-letter"
                >
                    {char}
                </motion.span>
            ))}
        </h1>
    );
};

function Home() {
    return (
        <div className="homepage-container">
            <main className="homepage-main">
                <AnimatedText
                    text="SmartExam Duty Allocation System with DUTRIX"

                />

                <p className="homepage-subtext">
                    DUTRIX uses intelligent algorithms to automatically assign invigilation duties, optimizing resources and reducing administrative burden.
                </p>
                <div className="homepage-button-group">
                    <Link to="/login">
                        <button className="homepage-btn primary">Get Started</button>
                    </Link>
                    <Link to='/contact'>
                        <button className="homepage-btn secondary">Learn More</button>
                    </Link>


                </div>
            </main>

            <section className="homepage-features">
                <h2 className="homepage-section-title">Why Choose DUTRIX?</h2>
                <div className="homepage-feature-grid">
                    <div className="homepage-feature-item">
                        <img src="https://img.freepik.com/free-vector/woman-choosing-dates-calendar-appointment-booking_23-2148552956.jpg?ga=GA1.1.2019641601.1748257859&semt=ais_items_boosted&w=740" alt="Smart Scheduling" className="homepage-feature-img" />
                        <h3>Smart Scheduling</h3>
                        <p>Automatically balances duty assignments based on faculty availability and preferences.</p>
                    </div>
                    <div className="homepage-feature-item">
                        <img src="https://img.freepik.com/free-vector/screen-addiction-abstract-concept-illustration-digital-overload-information-dependence-smartphone-addiction-screen-addicted-mobile-phone-dependence-mental-disorder_335657-1247.jpg?ga=GA1.1.2019641601.1748257859&semt=ais_items_boosted&w=740" alt="Real-Time Updates" className="homepage-feature-img" />
                        <h3>Real-Time Updates</h3>
                        <p>Get live changes and notifications to stay up to date effortlessly.</p>
                    </div>
                    <div className="homepage-feature-item">
                        <img src="https://img.freepik.com/free-vector/business-people-working-giving-tasks_1262-19728.jpg?ga=GA1.1.2019641601.1748257859&semt=ais_items_boosted&w=740" alt="Effortless Management" className="homepage-feature-img" />
                        <h3>Effortless Management</h3>
                        <p>Say goodbye to spreadsheets — manage everything in one intuitive dashboard.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;