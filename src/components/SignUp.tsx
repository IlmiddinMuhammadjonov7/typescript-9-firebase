import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignUp = () => {
  const [values, setValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    setValue({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    const { email, password } = values;

    if (values.email == "") {
      alert("Provided email");
      return;
    }

    if (values.password !== values.confirmPassword) {
        alert("You should match")
      
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Your email..."
          name="email"
        />
        <br />
        <br />
        <label htmlFor="pass">Password: </label>
        <input onChange={handleChange} type="password" name="password" />
        <br />
        <br />
        <label htmlFor="pass2">Confirm password: </label>
        <input
          onChange={handleChange}
          type="password"
          id="pass2"
          name="confirmPassword"
        />
        <br />
        <br />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
