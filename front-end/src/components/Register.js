import React from 'react';
import styles from '../CSS/Register.module.css';
import axios from 'axios';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirmation: '',
            email: '',
            passwordWarning: null
        }
    }

    
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.props.history);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        if (this.state.password !== this.state.passwordConfirmation) {
            this.setState({ passwordWarning: <small className="red">Password and Password Confirmation are not the same!</small> })
        } else {
            this.setState({ passwordWarning: null })

            const user = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            };

            axios.post(`http://localhost:3000/v1/user/register`, { user })
            .then(res => {
                // console.log(req);
                console.log(res);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                return null;
            })
            .finally(res => {
                console.log(res);
            })
        }
    }

    handleCancel = (event) => {
        event.preventDefault();
        this.props.history.goBack();
    }
    
    render() {
        return (
            <div className={styles.Container}>
                <form className={styles.Form}>
                    <div className={styles.FormGroup}>
                        <label htmlFor="username" className={styles.Label}>Username</label><br/>
                        <input type="text" className={styles.Input} name="username" placeholder="Your username" value={this.state.username} onChange={this.handleChange} />
                    </div>
                    <div className={styles.FormGroup}>
                        <label htmlFor="password" className={styles.Label}>Password</label><br/>
                        <input type="password" className={styles.Input} name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div className={styles.FormGroup}>
                        <label htmlFor="passwordConfirmation" className={styles.Label}>Password confirmation</label><br/>
                        <input type="password" className={styles.Input} name="passwordConfirmation" placeholder="Type your password again" value={this.state.passwordConfirmation} onChange={this.handleChange} />
                    </div>
                    {this.state.passwordWarning}
                    <div className={styles.FormGroup}>
                        <label htmlFor="email" className={styles.Label}>Email</label><br/>
                        <input type="email" className={styles.Input} name="email" placeholder="Your email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className={styles.SubmitBtn} onClick={this.handleSubmit}>Register</button><br/>
                    <button  className={styles.CancelBtn} onClick={this.handleCancel}>Cancel</button>
                </form>
            </div>
        )
    }
}