import React from 'react';
import styles from '../CSS/Login.module.css';

export default function Login(props) {

    function handleCancel(event) {
        event.preventDefault();
        props.history.goBack();
    }

    function handleSubmitHandler(event) {
        event.preventDefault();
        console.log(props);
        props.handleSubmit();
    }

    function handleChangeHandler(event) {
        event.preventDefault();
        console.log(event.target.value);
        props.handleChange(event.target.value, event.target.value);
    }

    console.log(props);

    return(
        <div className={styles.Container}>
        <form className={styles.Form}>
            <div className={styles.FormGroup}>
                <label htmlFor="username" className={styles.Label}>Username</label><br/>
                <input type="text" className={styles.Input} name="username" placeholder="Your username" value={props.user.username} onChange={handleChangeHandler} />
            </div>
            <div className={styles.FormGroup}>
                <label htmlFor="password" className={styles.Label}>Password</label><br/>
                <input type="password" className={styles.Input} name="password" placeholder="Password" value={props.user.password} onChange={handleChangeHandler} />
            </div>
            <button type="submit" className={styles.SubmitBtn} onClick={handleSubmitHandler}>Login</button><br/>
            <button className={styles.CancelBtn} onClick={handleCancel}>Cancel</button>
        </form>
    </div>
    )
}