import styles from "../styles/profilepage.module.css";
import { ArrowRight, ClipboardCopy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useMediaQuery } from "react-responsive";
import { useState, useContext, useEffect } from "react";
import { imageLinkGenerator } from "../../utils/utils";
import { AuthContext } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../../utils/fetch";
import { toast } from "sonner";

function ProfilePage(){
    const navigate = useNavigate();
    const { user, userLoad, userError, handleLogout } = useContext(AuthContext);
    const [ avatar, setAvatar ] = useState(null);
    const isMobile = useMediaQuery({ query: "(max-width: 486px)" });


    useEffect(() => {

      if(!user) return;
      const check = user.role === "ADMIN";
      const image = check
        ? imageLinkGenerator(user.username, true)
        : imageLinkGenerator(user.username);
      if(image) setAvatar(image);

    }, [user, socket]);

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


    if(!user) return <Error />;
    if(userLoad) return <Loader />;
    if(userError) return <Error error={userError} />;
    
    const isAdmin = user.role === "ADMIN";
    const totalSpent = user.tickets.reduce((total, ticket) => total + (ticket.price || 0), 0);

    return (
      <div className="container">
        <div className="header">
          <h2>Profile</h2>
        </div>
        <div className={styles.top}>
          <div className={styles.pic}>
            <div className={styles.frame} style={{ backgroundImage: avatar ? `url(${avatar})` : "" }}></div>
          </div>
          <div className={styles.text}>
            <h1>{user.fullname}</h1>
            <h2>{user.admissionNo ?? user.staffId}</h2>
            {isAdmin && <h2>ADMIN</h2>}
            {!isAdmin && (
              <div className={styles.pts}>
                <div className="first">
                  <h2>Total Trips</h2>
                  <h3>{user.boardings.length}</h3>
                </div>
                <div className="second">
                  <h2>Total Tickets Bought</h2>
                  <h3>{user.tickets.length}</h3>
                </div>
                <div className="third">
                  <h2>Total Money Spent</h2>
                  <h3>{totalSpent}</h3>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.actionBox}>
          <h2>Action</h2>
          <div className={styles.action}>
            <button onClick={logOutUser}>
              Log Out
              {!isMobile && (
                <ArrowRight
                  size={20}
                  style={{ marginLeft: "5px" }}
                  className={styles.arrow}
                />
              )}
            </button>
            <button>
              Contact Support
              {!isMobile && (
                <ArrowRight
                  size={20}
                  style={{ marginLeft: "5px" }}
                  className={styles.arrow}
                />
              )}
            </button>
            <button>
              {isAdmin ? "Generate system report" : "File a complaint"}
              {!isMobile && (
                <ArrowRight
                  size={20}
                  style={{ marginLeft: "5px" }}
                  className={styles.arrow}
                />
              )}
            </button>
            <button>
              {isAdmin ? "View system reviews" : "Leave a review"}
              {!isMobile && (
                <ArrowRight
                  size={20}
                  style={{ marginLeft: "5px" }}
                  className={styles.arrow}
                />
              )}
            </button>
          </div>
        </div>
        {!isAdmin && (
          <div className={styles.txns}>
            <button onClick={() => navigate("/trip-history")}>
              Trip History <ArrowRight className={styles.arrow} />
            </button>
            <button onClick={() => navigate("/transactions")}>
              Transaction History <ArrowRight className={styles.arrow} />
            </button>
          </div>
        )}
      </div>
    );
}

export default ProfilePage;