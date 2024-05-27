import React, { useState } from 'react';
import Login from '../Login/Login';
import Signup from '../SingUp/Signup';

const SignInToggle = () => {
    const [ active, setActive ] = useState(true)

    return (
        <div className='signup'>
            {active ? (
                <div style={{
                    textAlign: "center"
                }}>
                    <Login />
                    <div style={{
                         border: "none",
                         borderBottom: "1px solid #ccc",
                         margin: "16px 0"
                    }}>
                        Don't have an account? <button onClick={()=> setActive(false)} className='btn-nav'>Sign In</button>
                    </div>
                </div>
            ) : (
                <div style={{
                    textAlign: "center"
                }}>
                    <Signup />
                    <div style={{
                         border: "none",
                         borderBottom: "1px solid #ccc",
                         margin: "16px 0"
                    }}>
                        Already have an account? <button onClick={()=> setActive(true)} className='btn-nav'>Login</button>
                    </div>
                    
                </div>
            )}
        </div>
    );
}

export default SignInToggle;
