import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const HeroRegister = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name,email, password ,accepted);

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
        else if(!accepted){
            setRegisterError('Please Accept terms and conditions')
            return;
        }



        //create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User Created Successfully.')

                //update profile
                updateProfile(result.user,{
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(() =>console.log('Profile updated'))
                .catch()

                // send verification email
                sendEmailVerification(result.user)
                .then(()=>{
                    alert('Check your email and verify account')
                })
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
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="name" name="name" className="input input-bordered" required />
                                </div>
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
                                        <span className="absolute right-10 bottom-60" onClick={() => setShowPassword(!showPassword)}>{
                                            showPassword ? <AiFillEye></AiFillEye> : <AiFillEyeInvisible></AiFillEyeInvisible>
                                        }</span>
                                        <br />
                                        <div className="mb-2">
                                            <input type="checkbox" name="terms" id="terms" />
                                            <label className="ms-2" htmlFor="terms">Accept terms & conditions</label>
                                        </div>
                                    </div>
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                    <p>Already have an account? please <Link to='/login'><button className="px-2 py-1 bg-pink-700 rounded-md text-black font-bold">Login</button></Link></p>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Register</button>
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