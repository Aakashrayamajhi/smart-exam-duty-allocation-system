import React from 'react'
import "./Feature.css";


function Feature() {
    return (
        <div>
            <section className="features">
                <h2 className="section-title">Why Choose DUTRIX?</h2>
                <div className="feature-grid">
                    <div className="feature-item">
                        <img src="https://img.freepik.com/free-vector/woman-choosing-dates-calendar-appointment-booking_23-2148552956.jpg?ga=GA1.1.2019641601.1748257859&semt=ais_items_boosted&w=740" alt="Smart Scheduling" className="feature-img" />
                        <h3>Smart Scheduling</h3>
                        <p>Automatically balances duty assignments based on faculty availability and preferences.</p>
                    </div>
                    <div className="feature-item">
                        <img src="https://img.freepik.com/free-vector/screen-addiction-abstract-concept-illustration-digital-overload-information-dependence-smartphone-addiction-screen-addicted-mobile-phone-dependence-mental-disorder_335657-1247.jpg?ga=GA1.1.2019641601.1748257859&semt=ais_items_boosted&w=740" alt="Real-Time Updates" className="feature-img" />
                        <h3>Real-Time Updates</h3>
                        <p>Get live changes and notifications to stay up to date effortlessly.</p>
                    </div>
                    <div className="feature-item">
                        <img src="https://img.freepik.com/free-vector/business-people-working-giving-tasks_1262-19728.jpg?ga=GA1.1.2019641601.1748257859&semt=ais_items_boosted&w=740" alt="Effortless Management" className="feature-img" />
                        <h3>Effortless Management</h3>
                        <p>Say goodbye to spreadsheets — manage everything in one intuitive dashboard.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Feature
