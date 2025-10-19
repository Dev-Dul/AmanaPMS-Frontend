import styles from "../styles/trip.module.css";
import Receipt from "../components/ReceiptEngine";
import { useState, useContext } from "react";
import { XCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../utils/context";
import { useFetchTrip, purchaseTicket } from "../../utils/fetch";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { toast } from "sonner";

function TripPage() {
  const { tripId } = useParams();
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [overlay, setOverlay] = useState(false);
  const { user, userLoad } = useContext(AuthContext);
  const { trip, tripLoading, tripError } = useFetchTrip(tripId);
  const { register, handleSubmit, formState: { errors }} = useForm();


  const isPassenger = user?.role === "STUDENT" || user?.role === "STAFF";
  const paid = trip?.boardings?.find(boarding => boarding.user.id === user.id); // Replace with actual trip payment info when available

  function handleOverlay(){
    setOverlay((prev) => !prev);
  }

  function handleOpen(){
    setOpen((prev) => !prev);
  }

  function handlePrice(e){
    const stop = e.target.value;
    setPrice(stop.price);
  }

  function handlePrint() {
    window.print();
  }

  async function onSubmit(formData){
    const check = user.wallet.balance >= price;
    if(!check){
      toast.error("Insufficient funds!");
      return;
    }

    const ticketPromise = purchaseTicket(price, user.id, tripId);
    toast.promise(ticketPromise, {
        loading: "Processing ticket purchase...",
        success: (response) => {
          return response.message;
        },
        error: (error) => {
            return error.message;
        }
    })
  }

  if(userLoad || tripLoading) return <Loader />;
  if(!user || tripError || !trip) return <Error />;

  const busStops = trip.route.stops ?? [
    "School - Aleiro (Custom)",
    "School - Aleiro (Gadan Audu)",
    "School - Aleiro (Kashin Zama)",
    "School - Aleiro (Lemi)",
    "School - Jega (Old BLB)",
    "School - Jega (EcoBank)",
    "School - BK (AP2)",
    "School - BK (Halliru Abdu)",
  ];

  const details = [
    { label: "Departure", value: trip.departureTime ?? "6:30 AM" },
    { label: "Trip Type", value: trip.type ?? "RETURN" },
    { label: "Bus", value: trip.bus.plateNumber ?? "AFUSTA 001" },
    { label: "Driver", value: trip.bus.driver.fullname ?? "Mal Suleiman" },
  ];

  const extraDetails = [
    { label: "Conductor", value: trip.bus.conductor.fullname ?? "Lawal Muhammad" },
    { label: "Capacity", value: trip.bus.capacity ?? "35" },
    { label: "ETA", value: trip.eta ?? "7:30 AM" },
    { label: "Route", value: trip.route.shortName ?? "Sch - BK" },
  ];

  return (
    <div className="container">
      {/* Ticket Purchase Overlay */}
      <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={handleOverlay} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Purchase Ticket For Trip {trip.title ?? trip.id}</h2>
          <h3>Ticket Price - ₦{price}</h3>

          <div className={styles.inputBox}>
            <label htmlFor="stop">Select Bus Stop</label>
            <select name="stop" id="stop" defaultValue="" onChange={handlePrice} 
              {...register("stop", {
                required: "Bus stop is required",
              })}>
              <option value="" disabled>
                Select Bus Stop
              </option>
              {busStops.map((stop, index) => (
                <option key={index} value={stop}>
                  {stop.name ?? stop}
                </option>
              ))}
            </select>
            {errors.stop && (
              <p className={styles.error}>{errors.stop.message}</p>
            )}
          </div>

          <button type="submit">Purchase</button>
        </form>
      </div>

      {/* Ticket Receipt Overlay */}
      <div className={`${styles.overlay} ${styles.two} ${open ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={handleOpen} />
        <Receipt trip={trip} />
        <button type="button" onClick={handlePrint}>
          Print
        </button>
      </div>

      {/* Header */}
      <div className="header">
        <h2>Trip Page</h2>
      </div>

      {/* Top Section */}
      <div className={styles.top}>
        <h1>Welcome To Trip: {trip.title ?? trip.id}</h1>
        {isPassenger && (
          <p className={styles.sub}>Purchase your ticket now and join us!</p>
        )}
      </div>

      {/* Trip Details */}
      <div className={styles.middle}>
        <div className={styles.firstBox}>
          <h2>Details</h2>
          <div className={styles.deets}>
            {details.map(({ label, value }) => (
              <div key={label}>
                <h2>{label}</h2>
                <h3>{value}</h3>
              </div>
            ))}
          </div>

          <div className={`${styles.deets} ${styles.two}`}>
            <div className={styles.divider}></div>
            {extraDetails.map(({ label, value }) => (
              <div key={label}>
                <h2>{label}</h2>
                <h3>{value}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.secondBox}>
          <h2>Available Passengers</h2>
          <h3>{trip.boardings?.length ?? 20}</h3>
        </div>
      </div>

      {/* Bus Stops */}
      <div className={styles.secondMiddle}>
        <div className={styles.fourthBox}>
          <h2>Bus Stops</h2>
          {busStops.map((stop, i) => (
            <h3 key={i}>{stop}</h3>
          ))}
        </div>
      </div>

      {/* Actions */}
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
