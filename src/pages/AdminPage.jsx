import styles from "../styles/adminpage.module.css";
import { AuthContext } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useContext } from "react";


function AdminPage(){
    const navigate = useNavigate();
    const { user, userLoad, userError } = useContext(AuthContext);

    if(userLoad) return <Loader/>
    if(userError || !user) return <Error error={userError || "User not logged in"} />

    return (
      <div className="container">
        <div className="header">
          <h2>Admin Page</h2>
        </div>


        <div className={styles.boxes}>
          <div className={styles.box} onClick={() => navigate("/drugs")}>
            <div className={styles.text}>
              <h2>Drugs Page</h2>
            </div>
            <div className="img"></div>
          </div>

          <div className={styles.box} onClick={() => navigate("/items")}>
            <div className={styles.text}>
              <h2>Items Page</h2>
            </div>
          </div>

          <div className={styles.box} onClick={() => navigate("/revenue")}>
            <div className={styles.text}>
              <h2>Revenue Page</h2>
            </div>
          </div>

          <div className={styles.box} onClick={() => navigate("/sales-admin")}>
            <div className={styles.text}>
              <h2>Sales Admin Page</h2>
            </div>
          </div>

          <div className={styles.box} onClick={() => navigate("/staff")}>
            <div className={styles.text}>
              <h2>Staff Admin Page</h2>
            </div>
          </div>


        </div>

    
      </div>
    );
}

export default AdminPage;