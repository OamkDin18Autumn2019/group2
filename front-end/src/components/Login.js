import React from 'react';
import styles from '../CSS/Login.module.css';
import ButtonStyles from '../CSS/Buttons.module.css';
import InputStyles from '../CSS/InputFields.module.css';
import { Link } from 'react-router-dom'

export default function Login(props) {

    console.log(props);

    // function handleCancel(event) {
    //     event.preventDefault();
    //     props.history.goBack();
    // }

    function handleSubmitHandler(event) {
        event.preventDefault();
        // console.log(event.target);
        // console.log(props);
        props.handleSubmit( event.target["username"].value,
                            event.target["password"].value );
        if (props.user) {
            // console.log(props.user)
            props.history.goBack();
        }
    }

    return(
    <div className={styles.Login}>
        <div className={styles.LoginForm}>
            <h2 className={styles.h2}>Log in to mothersell</h2>
            <form className={styles.Form} onSubmit={handleSubmitHandler}>
                <div className={styles.EmailPassword}>
                    <input name="username" className={InputStyles.InputField} placeholder="Enter your email or username" />  
                    <input type="password" name="password" className={InputStyles.InputField} placeholder="Enter your password" />  
                </div>
                <div className={styles.RememberMe}>
                    <input type="checkbox" id="RememberMe" className={InputStyles.Checkbox} /> 
                    {/* <span className={InputStyles.Check}></span> */}
                    <label for="RememberMe" > Remember me </label> 
                </div>
                <div className={styles.Buttons}>
                    <button type="submit" className={ButtonStyles.SubmitButton} >Login</button>
                    {/* <button className={ButtonStyles.SecondaryButton} onClick={handleCancel}> Cancel </button>  */}
                </div>
            </form>
            <span > Do not have an account? <Link to="/register" id={styles.RegisterLink} className={ButtonStyles.Link}> Register </Link> </span>
            {/* <a className={ButtonStyles.Link} >Register</a> */}
        </div>
    </div>
    )
}
