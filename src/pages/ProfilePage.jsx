import styles from "../styles/profilepage.module.css";
import { Bell } from "lucide-react";
import { ArrowRight, ClipboardCopy, ForwardIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import { toast } from "sonner";

function ProfilePage(){
    // const navigate = useNavigate();
    // const { user, loading, error, socket } = useContext(AuthContext);
    const [ avatar, setAvatar ] = useState(null);

    // useEffect(() => {

    //   if(!user || !socket) return;
    //   const image = imageLinkGenerator(user.username);
    //   if(image) setAvatar(image);

    // }, [user, socket]);


    // if(!user) return <Error />;
    // if(loading) return <Loader />;
    // if(error) return <Error />;
    


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
            <h1>Abdulrahim Jamil</h1>
            <h2>2010203057</h2>
            <div className={styles.pts}>
              {/* <h2>20 Trips</h2>
              <button>
                <ArrowRight size={20} style={{ marginLeft: "0" }} />
              </button> */}
              <div className="first">
                <h2>Total Trips</h2>
                <h3>20</h3>
              </div>
              <div className="second">
                <h2>Total Tickets Bought</h2>
                <h3>200</h3>
              </div>
              <div className="third">
                <h2>Total Transit Time</h2>
                <h3>20 hrs</h3>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.actionBox}>
          <h2>Action</h2>
          <div className={styles.action}>
            <button>
              Log Out
              <ArrowRight size={20} style={{ marginLeft: "5px" }} className={styles.arrow} />
            </button>
            <button>
              Contact Support
              <ArrowRight size={20} style={{ marginLeft: "5px" }} className={styles.arrow} />
            </button>
            <button>
              File a complaint
              <ArrowRight size={20} style={{ marginLeft: "5px" }} className={styles.arrow} />
            </button>
            <button>
              Leave a review
              <ArrowRight size={20} style={{ marginLeft: "5px" }} className={styles.arrow} />
            </button>
          </div>
        </div>
        <div className={styles.txns}>
          <button onClick={() => navigate("/transactions")}>
            Transaction History <ArrowRight className={styles.arrow} />
          </button>
        </div>
      </div>
    );
}

export default ProfilePage;