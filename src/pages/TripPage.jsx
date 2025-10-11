import styles from "../styles/trip.module.css";
import Receipt from "../components/ReceiptEngine";
import { useState } from "react";
import { XCircle } from "lucide-react";

function TripPage(){
    const [open, setOpen] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const role = "STUDENT";
    const paid = true;
    const isPassenger = role === "STUDENT" || role === "STAFF";

    function handleOverlay(){
        setOverlay(prev => !prev);
    }

    function handleOpen(){
        setOpen(prev => !prev);
    }

    function handlePrint() {
      window.print();
    }

    return (
      <div className="container">
        <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
          <XCircle className={styles.close} onClick={handleOverlay} />
          <form action="">
            <h2>Purchase Ticket For Trip AFU-123</h2>
            <h3>Ticket Price - N700</h3>
            <div className={styles.inputBox}>
              <label htmlFor="stop">Select Bus Stop</label>
              <select name="stop" id="stop">
                <option value="" selected>
                  Select Bus Stop
                </option>
                <option value={"1"}>School - Aleiro (Custom)</option>
                <option value={"1"}>School - Aleiro (Gadan Audu)</option>
                <option value={"1"}>School - Aleiro (Kashin Zama)</option>
                <option value={"1"}>School - Aleiro (Lemi)</option>
                <option value={"1"}>School - Jega (Old BLB)</option>
                <option value={"1"}>School - Jega (EcoBank)</option>
                <option value={"1"}>School - BK (AP2)</option>
                <option value={"1"}>School - BK (Halliru Abdu)</option>
              </select>
            </div>
            <button>Purchase</button>
          </form>
        </div>
        <div
          className={`${styles.overlay} ${styles.two} ${
            open ? styles.active : ""
          }`}
        >
          <XCircle className={styles.close} onClick={handleOpen} />
          <Receipt props={"Hello"} />
          <button type="button" onClick={handlePrint}>
            Print
          </button>
        </div>
        <div className="header">
          <h2>Trip Page</h2>
        </div>
        <div className={styles.top}>
          <h1>Welcome To Trip: AFU-123</h1>
          {isPassenger && (
            <p className={styles.sub}>
              Purchase your tickets now and join us!.
            </p>
          )}
        </div>
        <div className={styles.middle}>
          <div className={styles.firstBox}>
            <h2>Details</h2>
            <div className={styles.deets}>
              <div className="first">
                <h2>Departure</h2>
                <h3>6:30 AM</h3>
              </div>
              <div className="second">
                <h2>Trip Type</h2>
                <h3>RETURN</h3>
              </div>
              <div className="third">
                <h2>Bus</h2>
                <h3>AFUSTA 001</h3>
              </div>
              <div className="fourth">
                <h2>Driver</h2>
                <h3>Mal Suleiman</h3>
              </div>
            </div>
            <div className={`${styles.deets} ${styles.two}`}>
              <div className={styles.divider}></div>
              <div className="first">
                <h2>Conductor</h2>
                <h3>Lawal Muhammad</h3>
              </div>
               <div className="second">
                <h2>Capacity</h2>
                <h3>35</h3>
              </div>
              <div className="third">
                <h2>ETA</h2>
                <h3>7:30 AM</h3>
              </div>
              <div className="fourth">
                <h2>Route</h2>
                <h3>Sch - BK</h3>
              </div>
            </div>
          </div>
          <div className={styles.secondBox}>
            <h2>Available Passengers</h2>
            <h3>20</h3>
          </div>
        </div>
        <div className={styles.secondMiddle}>
          <div className={styles.fourthBox}>
            <h2>Bus Stops</h2>
            <h3>School - Aleiro (Custom)</h3>
            <h3>School - Aleiro (Gadan Audu)</h3>
            <h3>School - Aleiro (Kashin Zama)</h3>
            <h3>School - Aleiro (Lemi)</h3>
            <h3>School - Jega (Old BLB)</h3>
            <h3>School - Jega (EcoBank)</h3>
            <h3>School - BK (AP2)</h3>
            <h3>School - BK (Halliru Abdu)</h3>
          </div>
        </div>
        <div className={styles.bottom}>
          {isPassenger && !paid && (
            <button onClick={handleOverlay}>Purchase Ticket</button>
          )}
          {isPassenger && paid && (
            <button onClick={handleOpen}>View Ticket</button>
          )}
          {!isPassenger && <button>Mark Trip As Completed</button>}
          <button>Make A Complaint</button>
        </div>
      </div>
    );
}

export default TripPage;