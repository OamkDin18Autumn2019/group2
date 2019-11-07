import React from 'react';
import styles from '../CSS/Header.module.css';

export default function Header() {

    return(
        <>
            <div className="container-fluid fixed-top">
                <div className="row">
                    <div className="text-left col-md-6">
                        <button className="btn btn-primary">About Us</button>
                        <button className="btn btn-primary">Help</button>
                    </div>
                    <div className="text-right col-md-6">
                        <button className="btn btn-primary">Sign Up</button>
                        <button className="btn btn-primary">Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}
