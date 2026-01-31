import { ArrowRight, RefreshCcw, ClipboardCopy } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import { imageLinkGenerator } from "../../utils/utils";
import { updateAdminProfile } from "../../utils/fetch";
import styles from "../styles/profilepage.module.css";
import { AuthContext } from "../../utils/context";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../../utils/fetch";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { XCircle } from "lucide-react";
import { toast } from "sonner";

function ProfilePage(){
    const navigate = useNavigate();
    const { user, userLoad, userError, handleLogout, setUser } = useContext(AuthContext);
    const [ avatar, setAvatar ] = useState(null);
    const [ overlay, setOverlay ] = useState(false);
    const { register, handleSubmit, reset, formState: { errors }} = useForm();
    


    useEffect(() => {

      if(!user) return;
      const check = user.role === "ADMIN";
      const image = check
        ? imageLinkGenerator(user.username, true)
        : imageLinkGenerator(user.username);
      if(image) setAvatar(image);

    }, [user]);


    useEffect(() => {
    if (!user) return;

    reset({
      fullname: user.fullname,
      email: user.email,
      username: user.username,
      password: "*******"
    });
    }, [user, reset]);



     async function logOutUser(){
        const logOutPromise = LogOut();
        toast.promise(logOutPromise, {
            loading: "Logging you out...",
            success: (response) => {
              handleLogout();
              navigate("/");
              return response.message;
            },
            error: (error) => {
                return error.message;
            }
        })
      }


    function handleOverlay(){
      setOverlay(prev => !prev);
    }


     async function onSubmit(formData){
        const updatePromise = updateAdminProfile(formData.fullname, formData.password, formData.email, formData.username, user.id);
        toast.promise(updatePromise, {
            loading: "Updating Admin Account...",
            success: (response) => {
              setUser(response.user);
              return response.message;
            },
            error: (error) => {
                return error.message;
            }
        })
      }

    async function copyLink(){
      try{
          await navigator.clipboard.writeText(import.meta.env.VITE_TG_ADD);
          toast.info("App link successfully copied!")
      }catch(err){
          toast.error(`Error copying app link due to: ${err.message}`)
      }
    }


    if(!user) return <Error />;
    if(userLoad) return <Loader />;
    if(userError) return <Error error={userError} />;
    
    const isAdmin = user.role === "ADMIN";
    const totalRevenue = user.purchases.reduce((total, purchase) => total + (purchase.drug ? purchase.drug.price : purchase.item.price || 0), 0);

    return (
      <div className="container">

        <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={handleOverlay} />
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h2>Update Admin Profile</h2>
          <div className={styles.inputBox}>
            <label htmlFor="fullname">Fullname</label>
            <input
              type="text"
              id="fullname"
              {...register("fullname", {
                required: "Admin's new fullname is required",
              })}
            />
            {errors.fullname && (
              <p className={styles.error}>{errors.fullname.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: "Admin's new username is required",
              })}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Admin's new new email is required",
              })}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Admin's new password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long."
                }
              })}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>
          
          <button type="submit">Update</button>
        </form>
      </div>

        <div className="header">
          <h2>Profile</h2>
        </div>
        <div className={styles.top}>
          <div className={styles.pic}>
            <div
              className={styles.frame}
              style={{ backgroundImage: avatar ? `url(${avatar})` : "" }}
            ></div>
          </div>
          <div className={styles.text}>
            <h1>{user.fullname}</h1>
            <h2>{user.role}</h2>
            <div className={styles.pts}>
              <div className="first">
                <h3>{user.purchases.length}</h3>
                <h2>Total Sales</h2>
              </div>
              <div className="second">
                <h3>{user.drugs.length + user.items.length}</h3>
                <h2>Total Products Registered</h2>
              </div>
              <div className="third">
                <h3>{totalRevenue}</h3>
                <h2>Total Revenue Generated</h2>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.actionBox}>
          <h2>Action</h2>
          <div className={styles.action}>
            <button onClick={logOutUser}>
              Log Out <ArrowRight />
            </button>
            {isAdmin && (
              <button onClick={copyLink}>
                Copy App Link <ClipboardCopy />
              </button>
            )}
            {isAdmin && (
              <button onClick={handleOverlay}>
                Update Profile <RefreshCcw />
              </button>
            )}
          </div>
        </div>
      </div>
    );
}

export default ProfilePage;