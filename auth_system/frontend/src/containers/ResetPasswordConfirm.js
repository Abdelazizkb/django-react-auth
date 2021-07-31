
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPasswordConfirm } from '../actions/auth';

const ResetPasswordConfirm = ({match, resetPasswordConfirm, isAuthenticated }) => {
    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({

        password: '',
        re_password: '',
    });


    const uid = match.params.uid;
    const token = match.params.token;

    const {re_password, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        resetPasswordConfirm(uid,token,re_password, password);
        setRequestSent(!requestSent)
    };

    if (isAuthenticated ||requestSent )
        return <Redirect to='/' />;
    
    return (
        <div className='container mt-5'>
            <h1>New password</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input 
                        className='form-control'
                        type='password'
                        placeholder='New password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='New password'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Confirm</button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { resetPasswordConfirm })(ResetPasswordConfirm);