import React, { Component } from 'react'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state={
            username: '',
            password: '',
            passwordConfirmation: '',
            email: '',
            passwordWarning:null
        }
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        
    }
    handleSubmit = (event) => {
        event.preventDefault();
        
        if (this.state.password!==this.state.passwordConfirmation) {
            this.setState({passwordWarning:<small className="red">Password and Password Confirmation are not the same!</small>})
        }
        else {
            this.setState({passwordWarning: null})
        }
    }
    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" placeholder="Your username" value={this.state.username} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirmation">Password confirmation</label>
                        <input type="password" className="form-control" name="passwordConfirmation" placeholder="Type your password again" value={this.state.passwordConfirmation} onChange={this.handleChange}/>
                    </div>
                    {this.state.passwordWarning}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" placeholder="Your email" value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}