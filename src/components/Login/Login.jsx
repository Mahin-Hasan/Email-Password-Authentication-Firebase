import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');
    const emailRef = useRef(null);


    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);


        //reset error and success
        setLoginError('');
        setLoginSuccess('');
        //add validation



        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if(result.user.emailVerified){
                    setLoginSuccess('Logged in Successfully')
                }
                else{
                    alert('Please verify your email address');
                }
            })
            .catch(error => {
                console.error(error)
                setLoginError(error.message);
            });
    }
    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log('provide email', emailRef.current.value);
            return;
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            console.log('Enter Valid Email');
            return;
        }

        //send validation email
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert('Check Your Email');
        })
        .catch(error =>{
            console.log(error);
        })
    }

    return (
        <div className="">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-8">Please Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        className="mb-4 w-3/4 px-2 py-4 rounded-lg"
                        type="email"
                        ref={emailRef}
                        placeholder="Your Email"
                        name="email"
                        id="email" />
                    <br />
                    <input className="mb-4 w-3/4 px-2 py-4 rounded-lg" type="password" placeholder="Enter Password" name="password" id="password" />
                    <br />
                    <input className=" btn btn-primary mb-4 w-3/4" type="submit" value="Login" />
                </form>
                <div className="text-center">
                    {
                        loginError && <p className="text-red-600">{loginError}</p>
                    }
                    {
                        loginSuccess && <p className="text-green-600">{loginSuccess}</p>
                    }
                </div>
                <label className="label">
                    <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                <p>New to this website please <Link to='/heroRegister'><button className="px-2 py-1 bg-amber-500 rounded-md text-black font-bold">Register</button></Link></p>
            </div>
        </div>
    );
};

export default Login;