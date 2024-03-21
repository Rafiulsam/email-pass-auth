import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app)

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef()

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password);
        setSuccess('')
        setError('')
        
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedInUser = result.user
                console.log(loggedInUser);
                setSuccess('User logged in successfully')
                form.reset()
            })
            .catch(error => {
                console.error(error.message);
                setError(error.message)
            })
    }

    const handleResetPassword = ()=>{
        const email = emailRef.current.value;
        if (!email){
            alert('Please enter a email address')
            return
        }
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            alert('Please check you email')
        })
        .catch(error=>{
            setError(error.message)
        })
    }
    return (
        <div className='w-25 mx-auto'>
            <h2>Pease login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" ref={emailRef} className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your Email' required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder='Your Password' required/>
                </div>
                <div className="mb-3 d-flex align-items-center form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className=" ps-1 form-check-label" htmlFor="exampleCheck1">Remember me</label>
                    <span className='ms-auto'><button onClick={handleResetPassword} className='p-0 btn btn-link'>Forgot password?</button></span>
                </div>
                <button type="submit" className="btn btn-primary">Log in</button>
            </form>
            <p><small>Don't have an account? Please <Link className='text-decoration-underline' to='/register'>Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;