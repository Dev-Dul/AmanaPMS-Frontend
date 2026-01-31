import { useEffect, useState, useContext } from "react";
import amanaLogo from "../assets/Img/amanaLogo.png"
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/welcome.module.css";
import { AuthContext } from "../../utils/context";
import { useMediaQuery } from "react-responsive";
import { addDays, isAfter } from "date-fns";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import { LogIn } from "../../utils/fetch";
import { toast } from "sonner";


function LogInPage(){
    const navigate = useNavigate();
    const { handleLogin, hydrate, user, userLoad } = useContext(AuthContext);
    const isMobile = useMediaQuery({ query: "(max-width: 486px)" });
    const { register, handleSubmit, formState: { errors }} = useForm();
    // const apiUrl = import.meta.env.VITE_API_URL;


    function checkUser(user){
      if(import.meta.env.VITE_NODE_ENV === "production"){
        if(isAfter(new Date(), addDays(user.created, 50))) {
          toast.error("Free trial has ended. Contact DevAbdul for more info");
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
    }


    async function onSubmit(formData){
        const LogInPromise = LogIn(formData.username, formData.password);
        toast.promise(LogInPromise, {
            loading: "Loggin you In...",
            success: (response) => {
                if(response && response.user){
                  if(!checkUser(response.user)){
                    const { role } = response.user;
                    handleLogin(response.user);
                    if(role === "ADMIN"){
                      navigate("/overview");
                    }else{
                      navigate("/dashboard");
                    }
                    return response.message;
                  }
                }
            },
            error: (error) => {
                return error.message;
            }
        })
    }



    useEffect(() => {
      document.body.classList.add(styles.bodyStyles);
      
      return () => {
        document.body.classList.remove(styles.bodyStyles);
      }
    }, [])

    useEffect(() => {
      hydrate();
      if(user && !userLoad){
        const { role } = user;
        if(role === "ADMIN"){
          navigate("/overview");
        }else{
          navigate("/dashboard");
        }
      }
   }, [user])


    if(userLoad) return <Loader />


    return (
      <div className={`${styles.container} ${styles.login} ${isMobile ? styles.mobile : ""}`}>
        {!isMobile && <div className={styles.left}></div>}
        <div className={styles.right}>
          <img src={amanaLogo} alt="Al-amana Logo" className={styles.afLogo} />
          <h1>
            Welcome Back! <br />{" "}
            <span>to AL-AMANA Digital Management System</span>
          </h1>
          <p className={styles.sub}>Powered by Transcendent Systems (by Abdulrahim Jamil).</p>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <h2>Log In to continue to your account.</h2>
            <div className={styles.inputBox}>
             <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />

              {errors.username && (
                <p className={styles.error}>{errors.username.message}</p>
              )}

            </div>
            <div className={styles.inputBox}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long.",
                  },
                })}
              />
              {errors.password && (
                <p className={styles.error}>{errors.password.message}</p>
              )}
            </div>
            <button type="submit" className="btn">
              Log In
            </button>
          </form>
        </div>
      </div>
    );
}

export default LogInPage;