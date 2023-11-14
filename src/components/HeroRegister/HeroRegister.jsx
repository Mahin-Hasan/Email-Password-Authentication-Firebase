import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const HeroRegister = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        //reset error
        setRegisterError('')
        setSuccess('')


        if (password.length < 6) { //client side validation
            setRegisterError('Password should be at least 6 characters or long');
            return;
        }
        else if (!/[A-Z]/.test(password)) { // ! means if false than below code will execute
            setRegisterError('Must have a Uppercase');
            return;
        }


        //create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User Created Successfully.')
            })
            .catch(error => {
                console.log(error);
                setRegisterError(error.message);
            })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="password"
                                        name="password"
                                        className="input input-bordered"
                                        required />
                                    <div className="realative">
                                        {/* <span onClick={()=> setShowPassword(!showPassword)} className="absolute bg-teal-800 p-1 rounded-lg font-bold cursor-pointer end-0 bottom-36 right-12">show</span> */}
                                        <span onClick={() => setShowPassword(!showPassword)}>{
                                            showPassword ? <AiFillEye></AiFillEye> : <AiFillEyeInvisible></AiFillEyeInvisible>
                                        }</span>
                                         
                                    </div>
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mb-12">
                {
                    registerError && <p className="text-red-600">{registerError}</p>
                }
                {
                    success && <p className="text-lime-500">{success}</p>
                }
            </div>
        </div>
    );
};

export default HeroRegister;