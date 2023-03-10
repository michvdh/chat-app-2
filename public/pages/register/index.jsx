import classes from "./Register.module.scss";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import { registerRoute } from "../api/APIRoutes";
import Link from "next/link";
import { useRouter } from "next/router";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  // const [inputIsValid, setInputIsValid] = useState(false);

  const [initRender, setInitRender] = useState(true);
  const router = useRouter();


  const submitHandler = (e) => {
    e.preventDefault();

    console.log(e.target[0].value);

    setValues({
      username: e.target[0].value,
      password: e.target[1].value,
      confirmPassword: e.target[2].value,
    });

    // setInputIsValid(true);  
  };

  useEffect(() => {
    if (initRender) {
      if (localStorage.getItem("chat-app-user")) {
        router.push('/');
      }
      
      setInitRender(false);
    }

    if (!initRender) {
      const registerData = async () => {
        const { username, password, confirmPassword } = values;
        const { data } = await axios.post(registerRoute, {
          username,
          password,
          confirmPassword,
        });

        if (data.status === false) {
          console.log(data.msg);
        }

        if (data.status === true) {
          router.push('/login');
        } 
      };
  
      registerData();
    }
  }, [values]);

  return (
    <>
      <Head>
        <title>ASG Chat App | Create Account</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={classes.register}>
          <div className={classes.container}>
            <h1>ASG Chat App</h1>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Username"
                className={`input--light`}
                // onChange={(e) => changeHandler(e)}
                // onChange={changeHandler}
              />
              <input
                type="password"
                placeholder="Password"
                className={`input--light`}
                // onChange={(e) => changeHandler(e)}
                // onChange={changeHandler}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className={`input--light`}
                // onChange={(e) => changeHandler(e)}
                // onChange={changeHandler}
              />
              <button type="submit" className={`${classes.btn} btn btn--dark`}>
                  Create Account
              </button>
            </form>
            <p className={classes.login}>Already have an account? <Link href={{pathname:`/login`}}><span>Log in</span></Link></p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
