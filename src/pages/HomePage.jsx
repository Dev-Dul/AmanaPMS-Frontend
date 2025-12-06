import { IconControl, IconHistory, IconPayment, IconTicket, IconTracking, IconVerify } from "../components/Icons";
import { useLocation, useNavigate } from "react-router-dom";
import sales from "../assets/Img/sales-analytics.svg"
import inventory from "../assets/Img/inventory.svg";
import styles from "../styles/homepage.module.css";
import { useMediaQuery } from "react-responsive";
import payments from "../assets/Img/payments.svg"
import revenue from "../assets/Img/revenue.svg";
import history from "../assets/Img/history.svg";
import { useState, useEffect } from "react";
import users from "../assets/Img/users.svg"
import { useForm } from "react-hook-form";
import { SendIcon } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

function HomePage(){
    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(false);
    const isMobile = useMediaQuery({ query: "(max-width: 486px)" });
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    function toggle() {
      if(isMobile){
        setSidebar((prev) => !prev);
      }
    }

    const onError = (errors) => {
      if (errors.email) {
        toast.error(errors.email.message);
      }
    };

    async function onSubmit(data){
        const joinPromise = joinWaitlist(data.email);
        toast.promise(joinPromise, {
              loading: "Bringing you onboard...",
              success: (response) => {
                  if(response){
                    return response.message;
                  }
              },
              error: (error) => {
                  return error.message;
              }
        })
      }

    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <nav>
            <div className={styles.logo}>
              <h2>ALAMANA</h2>
            </div>
            <div className={styles.menu}>
              <input
                type="checkbox"
                id="check"
                onChange={toggle}
                className={sidebar ? styles.checked : ""}
              />
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={`${styles.secondNav} ${sidebar ? styles.show : ""}`}>
              <div className={styles.second}>
                <div className={styles.center}>
                  <button style={{ "--pos": "1" }}>Features</button>
                  <button style={{ "--pos": "2" }}>About</button>
                </div>
                <div className={styles.end}>
                  <button style={{ "--pos": "4" }} onClick={() => navigate("/login")}>Log In</button>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div className={styles.main}>
          <div className={`${styles.welcome}`}>
            <div className={styles.textTwo}>
              <p className={styles.subOne}>Welcome to ALAMANA</p>
              <h1>Digital Management System.</h1>
              <h2>Trusted Care, Every Step.</h2>
              <div className={styles.action}>
                <button onClick={() => navigate("/login")}>Login</button>
              </div>
            </div>
            
          </div>
        </div>
        
        <div className={styles.play}>
          <motion.div
            className={styles.features}
            initial={{ opacity: 0, y: -150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}>
            <h2>Features</h2>
            <div className={styles.cards}>
              <div className={styles.card}>
                <img src={inventory} alt="Inventory" />
                <h3>Manage Inventory</h3>
              </div>
              <div className={styles.card}>
                <img src={payments} alt="Payments" />
                <h3>Seamless Sales Recording</h3>
              </div>
              <div className={styles.card}>
                <img src={history} alt="Sales history" />
                <h3>Track Sales History</h3>
              </div>
              <div className={styles.card}>
                <IconVerify className={styles.icon} />
                <h3>{!isMobile && "Streamlined"} Receipt Issuance</h3>
              </div>
              <div className={styles.card}>
                <img src={sales} alt="Sales" />
                <h3>Robust Sales Analytics</h3>
              </div>
              <div className={styles.card}>
                <img src={users} alt="Manage staff" />
                <h3>Streamlined staff management</h3>
              </div>
            </div>
          </motion.div>
        </div>
        <div className={styles.waitlist} id="waitlist">
          <h2>Contact Us.</h2>
          <p>Send Us A message:</p>
          <form action="" onSubmit={handleSubmit(onSubmit, onError)}>
            <div className={styles.inputBox}>
              <input
                type="text"
                id="name"
                placeholder="Name"
                {...register("Name", {
                  required: "Name is required",
                })}
              />
            </div>
            <div className={styles.inputBox}>
              <textarea
                name="message"
                placeholder="Message..."
                {...register("message", {
                  required: "Message cannot be blank!",
                })}
              ></textarea>
            </div>
            <div className={styles.inputBox}>
              <button type="submit">
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
        <div className={styles.footer}>
          <div className={styles.top}>
            <h2>ALAMANA DIGITAL MANAGEMENT SYSTEM</h2>
            <p className={styles.subThree}>Trusted Care, Every Step.</p>
          </div>
          <div className={styles.bottom}>
            <p>
              Built by Abdulrahim Jamil. All Rights Reserved &copy;
              2025.
            </p>
          </div>
        </div>
      </div>
    );
}

export default HomePage;