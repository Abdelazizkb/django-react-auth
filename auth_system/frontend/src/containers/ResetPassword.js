
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/auth';

const ResetPassword = ({ resetPassword,isAuthenticated }) => {
    const [email, setEmail] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        resetPassword(email);
    };

    if (isAuthenticated)
        return <Redirect to='/' />;
    
    return (
        <div className='container mt-5'>
            <h1>Reset your password</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input 
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Reset</button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);