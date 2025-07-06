import axios from 'axios';
import { useState } from 'react';
const InputForm = ({ formClose }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const toggleForm = () => setIsSignup(prev => !prev);
    const clearForm = () => {
        setEmail("");
        setPassword("");
        setUsername("");
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        setError(""); // Clear error before next attempt

        try {
            let res;
            if (isSignup) {
                res = await axios.post(`${process.env.VITE_API_BASE_URL}/signup`, {
                    email,
                    password,
                    username
                });
            } else {
                res = await axios.post(`${process.env.VITE_API_BASE_URL}/login`, {
                    email,
                    password
                });
            }

            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("user", JSON.stringify(res.data.user));
            console.log('User successfully logged in', res.data.user);
            formClose();
        } catch (err) {
            console.error("Error during login/signup:", err);
            setError(err.response?.data?.error || "Something went wrong");
        }
        clearForm();
    };
    return (
        <>
            <style>{`
                .form-container {
                    width: 100%;
                    max-width: 400px;
                    margin: 10px auto;
                    padding: 20px;
                    border: 1px solid #e0e0e0;
                    border-radius: 10px;
                    background-color: #ffffff;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                }

                .form-title {
                    font-size: 24px;
                    font-weight: 600;
                    text-align: center;
                    margin-bottom: 10px;
                }

                .form-control {
                    margin-bottom: 10px;
                    display: flex;
                    flex-direction: column;
                }

                .form-control label {
                    margin-bottom: 6px;
                    font-size: 14px;
                    color: #333;
                }

                .form-control input {
                    padding: 10px;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    transition: border-color 0.3s ease;
                }

                .form-control input:focus {
                    border-color: #007bff;
                    outline: none;
                }

                .submit-btn {
                    width: 100%;
                    padding: 12px;
                    background-color: #007bff;
                    color: white;
                    font-size: 16px;
                    font-weight: 500;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .submit-btn:hover {
                    background-color: #0056b3;
                }

                .footer-text {
                    margin-top: 16px;
                    font-size: 14px;
                    text-align: center;
                }

                .footer-text a {
                    color: #007bff;
                    text-decoration: none;
                    font-weight: 500;
                    cursor: pointer;
                }

                .footer-text a:hover {
                    text-decoration: underline;
                }
            `}</style>

            <form className="form-container" onSubmit={submitHandler}>
                <h2 className="form-title">{isSignup ? 'Sign Up' : 'Login'}</h2>

                {isSignup && (
                    <div className="form-control" onSubmit={submitHandler}>
                        <label>Username</label>
                        <input type="text" value={username} required onChange={(e) => setUsername(e.target.value)} />
                    </div>
                )}

                <div className="form-control">
                    <label>Email</label>
                    <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-control">
                    <label>Password</label>
                    <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit" className="submit-btn">
                    {isSignup ? 'Sign Up' : 'Login'}
                </button>
                {(error != "") && <h4 className="error" >{error}</h4>}
                <p className="footer-text">
                    {isSignup
                        ? <>Already have an account? <a onClick={toggleForm}>Login</a></>
                        : <>Don't have an account? <a onClick={toggleForm}>Sign up</a></>
                    }
                </p>
            </form>
        </>
    );
};

export default InputForm;
