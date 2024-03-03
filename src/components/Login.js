import React, { useReducer, useState, useContext } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import '../index.css';
import tokenService from '../services/tokens'
import { AuthContext } from './authConfig.tsx'
import { saveToken } from './useToken';

const formReducer = (state, event) => {
    console.log("process form reducer")
    if (event.reset) {
        console.log("start reset")
        return {
            email: '',
            password: '',
        }
    }
    return {
        ...state,
        [event.target.name]: event.target.value
    }
}

export default function Login() {
    const authContext = useContext(AuthContext)
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    let navigate = useNavigate();
    let location = useLocation();

    let from;
    if (location && location.state && location.state.from && location.state.from.pathname) {
        from = location.state.from.pathname;
    } else {
        from = "/";
    }

    console.log(`At this point location is ${JSON.stringify(location)}`);

    const handleSubmit = async event => {
        event.preventDefault();
        setSubmitting(true);

        const tt = await tokenService.authenticate(formData)
            .then(returnedToken => {
                saveToken(returnedToken);
                return returnedToken;
            })
            .catch(error => {
                console.log("request error is " + error);
            });
        authContext.signin(tt, () => {
            console.log(`now navigate backt to ${from}`);
            navigate(from, { replace: true });
        });
        setTimeout(() => {
            console.log("calling set form data");
            setSubmitting(false);
            setFormData({ reset: true });
        }, 2000);
    }

    const goToSignup = () => {
        navigate('/signup', { replace: true, state: location.state});
    };

    return (
        <div className="login-wrapper">
            <h1>please log in</h1>
            {submitting &&
                <div>
                    Submtting Form...
                    <ul>
                        {Object.entries(formData).map(([name, value]) => (
                            <li key={name}><strong>{name}</strong>: {value.toString()}</li>
                        ))}
                    </ul>

                </div>
            }
            <form onSubmit={handleSubmit}>
                <label>
                    Email <input type="text" name="email" onChange={setFormData} value={formData.email || ''} />
                </label>
                <label>
                    Password <input type="text" name="password" onChange={setFormData} value={formData.password || ''} />
                </label>
                <button type="submit">Submit</button>
                <p>Don't have an account? 
                    <button onClick={goToSignup}>Sign Up</button>
                </p>
            </form>
        </div>
    )
}