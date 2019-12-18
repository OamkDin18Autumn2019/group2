import React from "react";
import styles from "../CSS/Register.module.css";
import ButtonStyles from "../CSS/Buttons.module.css";
import InputStyles from "../CSS/InputFields.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const imgLink =
  "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  ;

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordConfirmation: "",
      email: "",
      passwordWarning: null
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    if (this.state.password !== this.state.passwordConfirmation) {
      this.setState({
        passwordWarning: (
          <small className="red">
            Password and Password Confirmation are not the same!
          </small>
        )
      });
    } else {
      this.setState({ passwordWarning: null });

      const user = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      };

      axios
        .post(`http://localhost:4000/v1/user/register`, { user })
        .then(res => {
          // console.log(req);
          console.log(res);
          console.log(res.data);
          // event.preventDefault();
          this.props.history.goBack();
        })
        .catch(err => {
          console.log(err);
          return null;
        });
    }
  };

  // handleCancel = (event) => {
  //     event.preventDefault();
  //     this.props.history.goBack();
  // }

  render() {
    return (
      <div className={styles.background}>
        <img
          src={imgLink}
          className={styles.backgroundImg}
          alt="background"
        />
        <div className={styles.Login}>
          <div className={styles.LoginForm}>
            <h2 className={styles.h2}>Register</h2>
            <form className={styles.Form} onSubmit={this.handleSubmit}>
              <div className={styles.EmailPassword}>
                <input
                  required
                  className={InputStyles.InputField}
                  name="username"
                  placeholder="Enter your username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <input
                  required
                  type="email"
                  className={InputStyles.InputField}
                  name="email"
                  placeholder="Enter your email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <input
                  required
                  type="password"
                  className={InputStyles.InputField}
                  name="password"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <input
                  required
                  type="password"
                  className={InputStyles.InputField}
                  name="passwordConfirmation"
                  placeholder="Enter your password again"
                  value={this.state.passwordConfirmation}
                  onChange={this.handleChange}
                />
              </div>
              <div className={styles.Buttons}>
                <button type="submit" className={ButtonStyles.SubmitButton}>
                  Register
              </button>
              </div>
            </form>
            <span>
              {" "}
              Already have an account?{" "}
              <Link
                to="/login"
                id={styles.RegisterLink}
                className={ButtonStyles.Link}
              >
                {" "}
                Login{" "}
              </Link>{" "}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
