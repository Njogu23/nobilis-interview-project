import React, { useState } from 'react';
import Login from '../Login/Login';
import Signup from '../SingUp/Signup';

const SignInToggle = ({onLogin}) => {
    const [ active, setActive ] = useState(true)

    return (
        <div style={{
            margin: "30px"
        }}>
            {active ? (
                <div>
                    <Login onLogin={onLogin}/>
                    <div style={{
                         border: "none",
                         borderBottom: "1px solid #ccc",
                         margin: "16px 0"
                    }}>
                        Don't have an account? <button onClick={()=> setActive(false)} className='btn-sec'>Sign In</button>
                    </div>
                </div>
            ) : (
                <div>
                    <Signup onLogin={onLogin}/>
                    <div style={{
                         border: "none",
                         borderBottom: "1px solid #ccc",
                         margin: "16px 0"
                    }}>
                        Already have an account? <button onClick={()=> setActive(true)} className='btn-sec'>Login</button>
                    </div>
                    
                </div>
            )}
        </div>
    );
}

export default SignInToggle;
