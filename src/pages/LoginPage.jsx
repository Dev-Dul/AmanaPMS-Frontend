import styles from "../styles/welcome.module.css";
import { LogIn } from "../../utils/fetch";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import afustaLogo from "../assets/Img/afusta-logo.png"
import { useMediaQuery } from "react-responsive";
import { useContext } from "react";
import { AuthContext } from "../../utils/context";


function LogInPage(){
    const navigate = useNavigate();
    const [nav, setNav] = useState(1);
    const { register, handleSubmit, formState: { errors }} = useForm();
    const isMobile = useMediaQuery({ query: "(max-width: 486px)" });
    // const apiUrl = import.meta.env.VITE_API_URL;
    const { setUser } = useContext(AuthContext);


    async function onSubmit(formData){
        const ids = { 1: formData.admissionNo, 2: formData.staffId, 3: formData.adminId };
        const userId = ids[nav];
        const LogInPromise = LogIn(userId, formData.password);
        toast.promise(LogInPromise, {
            loading: "Loggin you In...",
            success: (response) => {
                if(response && response.user){
                  const { role } = response.user;
                  localStorage.setItem("logged", "true");
                  setUser(response.user);
                  if(role === "ADMIN"){
                    navigate("/overview");
                  }else{
                    navigate("/dashboard");
                  }
                    return response.message;
                }
            },
            error: (error) => {
                return error.message;
            }
        })
    }


    function handleNav(num){
      setNav(num);
    }


    return (
      <div className={`${styles.container} ${styles.login} ${isMobile ? styles.mobile : ""}`}>
        {!isMobile && <div className={styles.left}></div>}
        <div className={styles.right}>
          <img src={afustaLogo} alt="Afusta Logo" className={styles.afLogo} />
          <h1>
            Welcome Back! <br />{" "}
            <span>to AFUSTA Transit Management System</span>
          </h1>
          <p className={styles.sub}>Powered by SwiftRyde!.</p>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <h2>Log In to continue to your account.</h2>
            <div className={styles.nav}>
              <div className={styles.btns}>
                <button
                  type="button"
                  className={nav === 1 ? styles.selected : ""}
                  onClick={() => handleNav(1)}>
                  Student
                </button>
                <button
                  type="button"
                  className={nav === 2 ? styles.selected : ""}
                  onClick={() => handleNav(2)}>
                  Staff
                </button>
                <button
                  type="button"
                  className={nav === 3 ? styles.selected : ""}
                  onClick={() => handleNav(3)}>
                  Admin
                </button>
              </div>
            </div>
            <div className={styles.inputBox}>
              {nav === 1 && <label htmlFor="admNo">Admission No</label>}
              {nav === 2 && <label htmlFor="staffId">Staff ID</label>}
              {nav === 3 && <label htmlFor="adminId">Admin ID</label>}

              {nav === 1 && (
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
              )}

              {nav === 2 && (
                <input
                  type="text"
                  id="staffId"
                  placeholder="Staff ID"
                  {...register("staffId", { required: "Staff ID is required" })}
                />
              )}

              {nav === 3 && (
                <input
                  type="text"
                  id="adminId"
                  placeholder="Admin ID"
                  {...register("adminId", {
                    required: "AdminId is required",
                  })}
                />
              )}

              {nav === 1 && errors.admission && (
                <p className={styles.error}>{errors.admission.message}</p>
              )}

              {nav === 2 && errors.staffId && (
                <p className={styles.error}>{errors.staffId.message}</p>
              )}

              {nav === 3 && errors.adminId && (
                <p className={styles.error}>{errors.adminId.message}</p>
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
            <p className={styles.already}>
              Don't have an account?{" "}
              <Link to="/signup" className="link">
                Sign Up
              </Link>
            </p>
          </form>
          <h2 className={styles.dev}>
            Made with ❤️ by{" "}
            <a
              href="https://github.com/Dev-Dul"
              target="_blank"
              className="link">
              DevAbdul
            </a>
            &nbsp; Check Out the{" "}
            <a
              href="https://github.com/Dev-Dul/OdinBook.git"
              target="_blank"
              className="link">
              Repo.
            </a>
          </h2>
        </div>
      </div>
    );
}

export default LogInPage;