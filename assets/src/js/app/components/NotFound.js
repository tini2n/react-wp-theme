import React from 'react'
import { Link } from "react-router-dom";

const NotFound = () => (
    <div className="not-found">
        <div className="wrapper-thin">
            <header>
                <h1>404</h1>
                <h5>Finner ikke siden!</h5>
            </header>
            <footer>
                <p>Siden du leter etter er enten flyttet eller eksisterer ikke lenger.</p>
                <Link to="/" className="button">Gå til forsiden</Link>
            </footer>
        </div>
    </div>
);

export default NotFound