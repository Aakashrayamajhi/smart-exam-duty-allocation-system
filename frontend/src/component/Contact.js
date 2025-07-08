import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3001/contact", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            });

            const text = await res.text();

            if (res.ok) {
                setStatus(text);
                setFormData({ firstname: "", lastname: "", email: "", message: "" });
            } else {
                setStatus("Something went wrong.");
            }
        } catch (err) {
            setStatus("Error submitting form.");
            console.error(err);
        }
    };

    return (
        <div>
            <section className="contact-container">
                <div className="contact-card">
                    <div className="contact-left">
                        <h1 className="contact-title">Let's work together.</h1>
                        <p className="contact-subtext">
                            Or reach us via: <a href="mailto:aakashrayamajhi03@mail.com">aakashrayamajhi03@mail.com</a>
                        </p>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="First name"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="lastname"
                                    placeholder="Last name"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                placeholder="Message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                            <div className="form-footer">
                                {status && <p className="status-message">{status}</p>}
                                <button type="submit" className="send-button">
                                    Send message
                                </button>
                            </div>
                        </form>

                    </div>
                    <div className="contact-right">
                        <img
                            src="https://img.freepik.com/free-photo/standard-quality-control-collage-concept_23-2149595847.jpg?ga=GA1.1.2019641601.1748257859&semt=ais_items_boosted&w=740"
                            alt="Scenic Mountain"
                            className="contact-image"
                        />
                    </div>
                </div>
            </section>
            <footer className="footer">
                <p>&copy; 2025 DUTRIX. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Contact;
