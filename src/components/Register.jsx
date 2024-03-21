import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth'
import app from '../firebase/firebase.init';
import { Link } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const auth = getAuth(app)

    const handleEmailChange = (event) => {

        console.log(event.target.value);
        // setEmail(event.target.value);
    }

    const handlePasswordBlur = (event) => {
        console.log(event.target.value);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('')
        const email = event.target.email.value
        const password = event.target.password.value
        console.log(email, 'pass-', password);
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Password Should contain at least one uppercase letter')
            return
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Password should contain at least a spacial character (!@#$&*)')
            return
        }
        else if (!/(?=.*[0-9])/.test(password)) {
            setError('Password should contain at least one number')
            return
        }
        else if (password.length < 8) {
            setError('Password should be 8 characters long')
            return
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const loggedUser = userCredential.user
                console.log(loggedUser);
                setError('')
                setSuccess('User has been created successfully')
                event.target.reset()
                sendEmailVerification(loggedUser)
                    .then(result => {
                        console.log(result);
                        alert('Please verify your email')
                    })
                    .catch(error => {
                        console.error(error);
                    })
            })
            .catch(error => {
                console.error(error.message);
                setError(error.message)
            })
    }


    return (
        <div className='w-50 mx-auto'>
            <h2>Please register</h2>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-3 rounded-1 ps-2' onChange={handleEmailChange} type="email" name='email' placeholder='Your Email' required />
                <br />
                <input className='w-50 mb-3 rounded-1 ps-2' onBlur={handlePasswordBlur} type="password" name='password' placeholder='Your Password' required />
                <br />
                <input className='btn btn-primary' type="submit" value='register' />
            </form>
            <p><small>Already have an account? Please <Link className='text-decoration-underline' to="/login">Login</Link> </small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;