import { IconControl, IconHistory, IconPayment, IconTicket, IconTracking, IconVerify } from "../components/Icons";
import styles from "../styles/homepage.module.css";
import { useState, useEffect } from "react";
import { SendIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useForm } from "react-hook-form";
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
              <h2>SWIFTRYDE</h2>
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
                  <button style={{ "--pos": "3" }} onClick={() => navigate("/login")}>Login</button>
                </div>
                <div className={styles.end}>
                  <button style={{ "--pos": "4" }} onClick={() => navigate("/signup")}>Sign Up</button>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div className={styles.main}>
          <div className={`${styles.welcome}`}>
            <div className={styles.textTwo}>
              <p className={styles.subOne}>Welcome to SWIFTRYDE</p>
              <h1>AFUSTA Digital Transit Management System.</h1>
              <h2>Your Gateway To Swift Transit.</h2>
              <div className={styles.action}>
                <button onClick={() => navigate("/launch")}>Get Started</button>
                <button>How It Works</button>
              </div>
            </div>
            {/* <div className={`${styles.cryptoAnim} ${show ? styles.show : ""}`}>
              <Lottie animationData={cryptoAnim} loop={true} autoPlay={true} />
            </div> */}
          </div>
        </div>
        <div className={`${styles.section} ${styles.sectionOne}`}>
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}>
            {/* <img src={four} alt="Web3 Platform" /> */}
          </motion.div>
          <motion.div
            className={styles.right}
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.8 }}>
            <h2>The Ultimate Transit Platform.</h2>
            <p className={styles.subTwo}>
              Experience Transit Like Never Before.
            </p>
            <p style={{ textAlign: "justify" }}>
              The AFUSTA Transit Management System (powered by SwiftRyde) is a
              platform that puts all your transit needs in one place - powerful,
              seamless and built to take you where you want to be. <br />
              <span>No Hurdles, No Delays, Just Swift Movement.</span>
            </p>
          </motion.div>
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
                <IconTicket className={styles.icon} />
                <h3>Ticket Purchase</h3>
              </div>
              <div className={styles.card}>
                <IconPayment className={styles.icon} />
                <h3>Seamless Payments</h3>
              </div>
              <div className={styles.card}>
                <IconHistory className={styles.icon} />
                <h3>Trip History</h3>
              </div>
              <div className={styles.card}>
                <IconVerify className={styles.icon} />
                <h3>{!isMobile && "Streamlined"} Ticket Verification</h3>
              </div>
              <div className={styles.card}>
                <IconControl className={styles.icon} />
                <h3>Centralized Control</h3>
              </div>
              <div className={styles.card}>
                <IconTracking className={styles.icon} />
                <h3>Track payments &  More</h3>
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
            <h2>AFUSTA TRANSIT MANAGEMENT SYSTEM</h2>
            <h3>Powered By SWIFTRYDE</h3>
            <p className={styles.subThree}>The Swift Way To Move</p>
          </div>
          <div className={styles.bottom}>
            <p>
              Built by Abdulrahim Jamil (2010203057). All Rights Reserved &copy;
              2025.
            </p>
          </div>
        </div>
      </div>
    );
}

export default HomePage;