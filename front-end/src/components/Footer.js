import React from 'react';
import styles from '../CSS/Footer.module.css';
import AddressLogo from '../icons/icons8_address_filled_50px.png';
import PhoneLogo from '../icons/icons8_phone_filled_50px.png';
import EmailLogo from '../icons/icons8_mail_filled_50px.png';
import VisaLogo from '../icons/icons8_visa_filled_50px_2.png';
import MasterCardLogo from '../icons/icons8_mastercard_filled_50px.png';
import PayPalLogo from '../icons/icons8_paypal_filled_50px.png';
import TwitterLogo from '../icons/icons8_twitter_filled_50px.png';
import FacebookLogo from '../icons/icons8_facebook_filled_50px.png';
import InstagramLogo from '../icons/icons8_instagram_new_filled_50px.png';


export default function Footer() {

    return(
        <>
            <footer className={styles.Footer}>
                <div className={styles.FooterElement}>
                    <h5> Contact Us</h5>
                    <div className={styles.FooterInfo}>
                        <img src={AddressLogo} className={styles.Inline} alt="address logo"/>
                        <p className={styles.Inline}>Oulu, Northern Ostrobothnia, Finland</p>
                    </div>
                    <div className={styles.FooterInfo}>
                        <img src={PhoneLogo} className={styles.Inline} alt="phone logo"/>
                        <p className={styles.Inline}>+358 555 3535</p>
                    </div>
                </div>
                <div className={styles.FooterElement}>
                    <h5> Customer Support</h5>
                    <div className={styles.FooterInfo}>
                        <img src={PhoneLogo} className={styles.Inline} alt="phone logo"/>
                        <p className={styles.Inline}>24/7: +358 555 3636</p>
                    </div>
                    <div className={styles.FooterInfo}>
                        <img src={EmailLogo} className={styles.Inline} alt="email logo"/>
                        <p className={styles.Inline}>customer.support@anystore.com</p>
                    </div>
                </div>
                <div className={styles.FooterElement}>
                    <h5> Social Media</h5>
                    <div className={styles.SocialMediaLogos}>
                        <img src={FacebookLogo} alt="FB logo"/>
                        <img src={TwitterLogo} alt="Twitter logo"/>
                        <img src={InstagramLogo} alt="Instagram logo"/>
                    </div>
                </div>
                <div className={styles.FooterElementBottom}>
                    <div>
                        <h5>
                            We would like to support these methods of payment
                        </h5>
                    </div>
                    <div className={styles.PaymentMethods}>
                        <img src={VisaLogo} className={styles.PaymentMethods} alt="Visa logo"/>
                        <img src={PayPalLogo} className={styles.PaymentMethods} alt="Paypal logo"/>
                        <img src={MasterCardLogo} className={styles.PaymentMethods} alt="Master logo"/>
                    </div>
                    <div className={styles.Copyright}>
                        <p>mothersell (c) 2019 We sell everything. All rights reserved. Design stolen by us</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
