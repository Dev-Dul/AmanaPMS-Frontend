import styles from "../styles/welcome.module.css";
import { signUp } from "../../utils/fetch";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";



function SignupPage(){
    // const navigate = useNavigate();
    const [nav, setNav] = useState(1);
    const { register, handleSubmit, formState: { errors }} = useForm();
    // const apiUrl = import.meta.env.VITE_API_URL;


    async function onSubmit(formData){
        const signUpPromise = signUp(formData.username, formData.email, formData.password);
        toast.promise(signUpPromise, {
            loading: "Creating your account...",
            success: (response) => {
                if(response){
                    navigate("/");
                    return response.message;
                }
            },
            error: (error) => {
                return error.message;
            }
        })
    }

    async function handleAuth(e) {
      e.preventDefault(); // prevent form reload if any
      window.location.href = `${apiUrl}/api/v1/auth/google`; // ✅ Do a browser redirect
    }

    function handleNav(num){
      setNav(num);
    }



    return (
      <div className={`${styles.container} ${styles.signup}`}>
        <div className={styles.left}>
          <h1>
            Welcome! <br /> <span>to AFUSTA Transit Management System</span>
          </h1>
          <p className={styles.sub}>Powered by SwiftRyde!.</p>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <h2>Experience Transit Like Never Before.</h2>
            <div className={styles.nav}>
              {/* <h3>Sign up as:</h3> */}
              <div className={styles.btns}>
                <button
                  type="button"
                  className={nav === 1 ? styles.selected : ""}
                  onClick={() => handleNav(1)}
                >
                  Student
                </button>
                <button
                  type="button"
                  className={nav === 2 ? styles.selected : ""}
                  onClick={() => handleNav(2)}
                >
                  Staff
                </button>
              </div>
            </div>
            <div className={styles.inputBox}>
              <input
                type="text"
                id="fullname"
                placeholder="fullname"
                {...register("fullname", {
                  required: "Fullname is required",
                  minLength: {
                    value: 5,
                    message: "Username must be at least 5 characters long",
                  },
                })}
              />
              {errors.username && (
                <p className={styles.error}>{errors.username.message}</p>
              )}
            </div>
            <div className={styles.inputBox}>
              <input
                type="email"
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>
            <div className={styles.inputBox}>
              {nav === 1 ? (
                <input
                  type="text"
                  id="admNo"
                  placeholder="Admission No."
                  {...register("admission", {
                    required: "Admission Number is required",
                    minLength: {
                      value: 10,
                      message:
                        "Admission Number must be at least 10 characters long.",
                    },
                  })}
                />
              ) : (
                <input
                  type="text"
                  id="staffId"
                  placeholder="Staff Id"
                  {...register("staffId", {
                    required: "Staff ID is required",
                  })}
                />
              )}
              {nav === 1
                ? errors.admission && (
                    <p className={styles.error}>{errors.admission.message}</p>
                  )
                : errors.staffId && (
                    <p className={styles.error}>{errors.staffId.message}</p>
                  )}
            </div>
            <div className={styles.inputBox}>
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
              Sign Up
            </button>
            <p className={styles.already}>
              Already have an account?{" "}
              {/* <Link to="/" className="link">
                Log In
              </Link> */}
            </p>
          </form>
          <h2 className={styles.dev}>
            Made with ❤️ by{" "}
            <a
              href="https://github.com/Dev-Dul"
              target="_blank"
              className="link"
            >
              DevAbdul
            </a>
            &nbsp; Check Out the{" "}
            <a
              href="https://github.com/Dev-Dul/OdinBook.git"
              target="_blank"
              className="link"
            >
              Repo.
            </a>
          </h2>
        </div>
        <div className={styles.right}></div>
      </div>
    );
}

export default SignupPage;