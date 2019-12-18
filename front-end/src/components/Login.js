import React, { useState } from "react";
import styles from "../CSS/Login.module.css";
import ButtonStyles from "../CSS/Buttons.module.css";
import InputStyles from "../CSS/InputFields.module.css";
import { Link } from "react-router-dom";

const imgLink =
"https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
;

export default function Login(props) {
  console.log(props);

  const [rememberMe, setRememberMe] = useState(false);

  // function handleCancel(event) {
  //     event.preventDefault();
  //     props.history.goBack();
  // }

  function handleSubmitHandler(event) {
    event.preventDefault();
    // console.log(event.target);
    // console.log(props);
    props.handleSubmit(
      event.target["username"].value,
      event.target["password"].value,
      rememberMe
    );
    if (props.user) {
      // console.log(props.user)
      props.history.goBack();
    }
  }


  function handleChangeInRememberMe(event) {
    setRememberMe(event.target.checked);
  }

  return (
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
    <div className={styles.background}>
      <img
        src={imgLink}
        className={styles.backgroundImg}
        alt="background"
      />
      <div className={styles.Login}>
        <div className={styles.LoginForm}>
          <h2 className={styles.h2}>Sign in</h2>
          <form className={styles.Form} onSubmit={handleSubmitHandler}>
            <div className={styles.EmailPassword}>
              <input
                name="username"
                className={`${InputStyles.InputField}`}
                placeholder="Enter your email or username"
              />
              <input
                type="password"
                name="password"
                className={InputStyles.InputField}
                placeholder="Enter your password"
              />
            </div>
            <div className={styles.RememberMe}>
              <input
                type="checkbox"
                id="RememberMe"
                className={InputStyles.Checkbox}
                onChange={handleChangeInRememberMe}
              />
              {/* <span className={InputStyles.Check}></span> */}
              <label for="RememberMe"> Remember me </label>
            </div>
            <div className={styles.Buttons}>
              <button type="submit" className={ButtonStyles.SubmitButton}>
                Login
            </button>
              {/* <button className={ButtonStyles.SecondaryButton} onClick={handleCancel}> Cancel </button>  */}
            </div>
          </form>
          <span>
            {" "}
            Do not have an account?{" "}
            <Link
              to="/register"
              id={styles.RegisterLink}
              className={ButtonStyles.Link}
            >
              {" "}
              Register{" "}
            </Link>{" "}
          </span>
          {/* <a className={ButtonStyles.Link} >Register</a> */}
        </div>
      </div>
    </div>
  );
}
