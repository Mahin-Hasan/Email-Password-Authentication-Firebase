import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const Register = () => {
    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-8">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input className="mb-4 w-3/4 px-2 py-4 rounded-lg" type="email" placeholder="Your Email" name="email" id="" />
                    <br />
                    <input className="mb-4 w-3/4 px-2 py-4 rounded-lg" type="password" placeholder="Enter Password" name="password" id="" />
                    <br />
                    <input className=" btn btn-primary mb-4 w-3/4" type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
};

export default Register;