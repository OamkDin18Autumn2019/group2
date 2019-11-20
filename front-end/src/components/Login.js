import React from 'react';
import styles from '../CSS/Login.module.css';
import { Link } from 'react-router-dom'

export default function Login(props) {

    function handleCancel(event) {
        event.preventDefault();
        props.history.goBack();
    }

    function handleSubmitHandler(event) {
        event.preventDefault();
        console.log(event.target);
        // console.log(props);
        props.handleSubmit( event.target["username"].value,
                            event.target["password"].value );
    }

    return(
    //     <div className={styles.Container}>
    //     <form className={styles.Form} onSubmit={handleSubmitHandler}>
    //         <div className={styles.FormGroup}>
    //             <label htmlFor="username" className={styles.Label}>Username</label><br/>
    //             <input type="text" className={styles.Input} name="username" placeholder="Your username" />
    //         </div>
    //         <div className={styles.FormGroup}>
    //             <label htmlFor="password" className={styles.Label}>Password</label><br/>
    //             <input type="password" className={styles.Input} name="password" placeholder="Your password" />
    //         </div>

    //         <button type="submit" className={styles.SubmitBtn} >Login</button><br/>
    //         {/* <li><Link to='./product/1'>Product1 for testing</Link></li> */}

    //         <button className={styles.CancelBtn} onClick={handleCancel}>Cancel</button>
    //     </form>
    // </div>
    <div className={styles.Login}>
        <div className={styles.LoginForm}>
            <h2 className={styles.h2}>Log in to mothersell</h2>
            <div className={styles.Form}>
                <div className={styles.EmailPassword}>
                    <input className={styles.InputField} placeholder="Enter your email or username" />  
                    
                    <input className={styles.InputField} placeholder="Enter your password" />  
                </div>
                <div className={styles.RememberMe}>
                    <input type="checkbox" id="RememberMe" /> 
                    <label for="RememberMe" > Remember me </label> 
            
                </div>
                <div className={styles.Buttons}>
                    <button type="submit"> Log In </button> 
                    <button type="reset"> Cancel </button> 
                </div>
            </div>
            <a href="#" >Forgot account?</a>
        </div>
    </div>
    )
}

{/* <div className={styles.Login}>
<div className={styles.LoginForm}>
    <h2 className={styles.h2}>Log in to mothersell</h2>
    <div className={styles.Form}>
        <div className={styles.EmailPassword}>
             <input className={styles.InputField} placeholder="Enter your email or username" />  
            
             <input className={styles.InputField} placeholder="Enter your password" />  
        </div>
        <div className={styles.RememberMe}>
             <input type="checkbox" id="RememberMe" /> 
            <label for="RememberMe" > Remember me </label> 
    
        </div>
        <div className={styles.Buttons}>
             <button type="submit"> Log In </button> 
             <button type="reset"> Cancel </button> 
        </div>
    </div>
    <a href="#" >Forgot account?</a>
</div>
</div> */}

// onClick={handleSubmitHandler}