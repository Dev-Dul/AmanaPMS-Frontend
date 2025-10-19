import { useFetchTrips, createNewTrip, useFetchBuses, useFetchRoutes, useFetchStats } from "../../utils/fetch";
import { parseISO, subMonths, isAfter, isBefore, startOfYear, endOfYear, subYears } from "date-fns";
import styles from "../styles/revenuepage.module.css";
import Week from "../components/Week";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Download, PlusCircle, XCircle, BusIcon } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../utils/context";
import { exportToExcel } from "../../utils/utils";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function TripAdminPage() {
  const [tab, setTab] = useState(1);
  const [open, setOpen] = useState(false);
  const { user, userLoad, userError } = useContext(AuthContext);
  const [overlay, setOverlay] = useState(false);
  const [filteredtrips, setFilteredtrips] = useState([]);
  const [monthFilter, setMonthFilter] = useState("0");
  const { trips, tripLoading, tripError } = useFetchTrips();
  const { buses, busLoading, busError } = useFetchBuses();
  const { routes, routeLoading, routeError } = useFetchRoutes();
  const { register, handleSubmit, formState: { errors }} = useForm();
  const { stats, statLoading, statError } = useFetchStats("REV");
  

  
    function handleMonthChange(e){
      setMonthFilter(e.target.value);
    }

    function handleExport(){
      if(stats.length > 0){
        exportToExcel(stats, "swiftryde_trip_history_by_weeks", "SWIFTRYDE TRIP STATISTICS BY WEEKS");
      }else{
        toast.error("No data available");
      }
    }

    function handleFilter() {
      if(!stats || stats.length === 0) {
        setFilteredtrips([]);
        return;
      }

      let filtered = [...stats];
      const now = new Date();

      if (monthFilter !== "0") {
        let startDate, endDate;

        switch (monthFilter) {
          case "1": // a month ago
            startDate = subMonths(now, 1);
            endDate = now;
            break;
          case "2": // 2 months ago (exact window)
            startDate = subMonths(now, 2);
            endDate = subMonths(now, 1);
            break;
          case "3": // 3 months ago (exact window)
            startDate = subMonths(now, 3);
            endDate = subMonths(now, 2);
            break;
          case "4": // last year
            const lastYear = subYears(now, 1);
            startDate = startOfYear(lastYear);
            endDate = endOfYear(lastYear);
            break;
          default:
            startDate = null;
            endDate = null;
        }

        if (startDate && endDate) {
          filtered = filtered.filter((week) => {
            const weekStart = parseISO(week.start);
            return weekStart >= startDate && weekStart <= endDate;
          });
        }
      }

      setFilteredtrips(filtered);
    }

    useEffect(() => {
      handleFilter();
    }, [monthFilter, stats]);


  function handleOverlay() {
    setOverlay((prev) => !prev);
  }

  function handleOpen() {
    setOpen((prev) => !prev);
  }

  function handleTab(num) {
    setTab(num);
  }

  async function onSubmit(formData){
      const newTripPromise = createNewTrip(new Date(), formData.bus, formData.route);
      toast.promise(newTripPromise, {
          loading: "Creating new trip...",
          success: (response) => {
            return response.message;
          },
          error: (error) => {
              return error.message;
          }
      })
  }

  if(tripLoading || userLoad || busLoading || routeLoading || statLoading) return <Loader />;
  if(userError || tripError || busError || routeError || statError) return <Error />;

  return (
    <div className="container">
      <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={handleOverlay} />
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className={`${styles.one} ${tab === 1 ? styles.active : ""}`}
        >
          <h2>Create New Trip</h2>
          <div className={styles.inputBox}>
            <label htmlFor="route">Choose A Route</label>
            <select
              id="route"
              {...register("route", {
                required: "Trip route is required",
              })}
            >
              <option value="" selected>
                Select a Route for the Trip
              </option>
              {routes.length > 0 ? (
                routes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.name}
                  </option>
                ))
              ) : (
                <option>No routes found</option>
              )}
            </select>
            {errors.route && (
              <p className={styles.error}>{errors.route.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="bus">Choose A Bus</label>
            <select
              id="bus"
              {...register("bus", {
                required: "Bus is required",
              })}
            >
              <option value="" selected>
                Select a Bus for the Trip
              </option>
              {buses.length > 0 ? (
                buses.map((bus) => (
                  <option key={bus.id} value={bus.id}>
                    {bus.plateNumber}
                  </option>
                ))
              ) : (
                <option>No buses found</option>
              )}
            </select>
            {errors.bus && <p className={styles.error}>{errors.bus.message}</p>}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="time">Set Departure Time</label>
            <input type="time" />
          </div>
          <button type="submit">Create Trip</button>
        </form>
      </div>
      <div
        className={`${styles.overlayTwo} ${open ? styles.active : ""} ${
          styles.two
        }`}
      >
        <XCircle className={styles.close} onClick={handleOpen} />
        <form
          action=""
          className={`${styles.one} ${tab === 1 ? styles.active : ""}`}
        >
          <h2>Create Trips For Today (Morning)</h2>
          <h3>Trip One</h3>
          <div className={styles.inputBox}>
            <label htmlFor="route">Choose A Route </label>
            <select name="route" id="route">
              <option value="" selected>
                Select a Route for the Trip
              </option>
              <option value={"1"}>School - Birnin Kebbi</option>
              <option value={"2"}>Birnin Kebbi - School</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="stop">Choose A Bus Stop </label>
            <select name="stop" id="stop">
              <option value="" selected>
                Select a Bus Stop for the Trip
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
          <div className={styles.inputBox}>
            <label htmlFor="time">Set Departure Time</label>
            <input type="time" />
          </div>
          <h3>Trip Two</h3>
          <div className={styles.inputBox}>
            <label htmlFor="route">Choose A Route </label>
            <select name="route" id="route">
              <option value="" selected>
                Select a Route for the Trip
              </option>
              <option value={"1"}>School - Birnin Kebbi</option>
              <option value={"2"}>Birnin Kebbi - School</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="stop">Choose A Bus Stop </label>
            <select name="stop" id="stop">
              <option value="" selected>
                Select a Bus Stop for the Trip
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
          <div className={styles.inputBox}>
            <label htmlFor="time">Set Departure Time</label>
            <input type="time" />
          </div>
          <button type="button" onClick={() => handleTab(2)}>
            Next
          </button>
        </form>
        <form action="" className={`${styles.one} ${tab === 2 ? styles.active : ""}`}>
          <h2>Create Trips For Today (Afternoon)</h2>
          <h3>Trip One</h3>
          <div className={styles.inputBox}>
            <label htmlFor="route">Choose A Route </label>
            <select name="route" id="route">
              <option value="" selected>
                Select a Route for the Trip
              </option>
              <option value={"1"}>School - Birnin Kebbi</option>
              <option value={"2"}>Birnin Kebbi - School</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="stop">Choose A Bus Stop </label>
            <select name="stop" id="stop">
              <option value="" selected>
                Select a Bus Stop for the Trip
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
          <div className={styles.inputBox}>
            <label htmlFor="time">Set Departure Time</label>
            <input type="time" />
          </div>
          <h3>Trip Two</h3>
          <div className={styles.inputBox}>
            <label htmlFor="route">Choose A Route </label>
            <select name="route" id="route">
              <option value="" selected>
                Select a Route for the Trip
              </option>
              <option value={"1"}>School - Birnin Kebbi</option>
              <option value={"2"}>Birnin Kebbi - School</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="stop">Choose A Bus Stop </label>
            <select name="stop" id="stop">
              <option value="" selected>
                Select a Bus Stop for the Trip
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
          <div className={styles.inputBox}>
            <label htmlFor="time">Set Departure Time</label>
            <input type="time" />
          </div>
          <button type="button" onClick={() => handleTab(1)}>
            Back
          </button>
          <button>Create Trips</button>
        </form>
      </div>
      <div className="header">
        <h2>Trips</h2>
      </div>
      <div className={styles.top}>
        <div className={`${styles.cards} ${styles.two}`}>
          <div className={styles.card}>
            <h2>All Time Trips</h2>
            <h3>15,000, 000</h3>
          </div>
          <div className={styles.card}>
            <h2>Trips For Last Month</h2>
            <h3>250,000</h3>
          </div>
          <div className={styles.card}>
            <h2>Trips For Last Week</h2>
            <h3>10</h3>
          </div>
          <div className={styles.card}>
            <h2>Trips Per User</h2>
            <h3>15</h3>
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.filter}>
            <button type="button" onClick={handleOverlay}>
              Create Single Trip <BusIcon style={{ marginLeft: "1rem" }} />
            </button>
            <div className={styles.filterTop}>
              <div className="first">
                <h2>Filter By Month:</h2>
                <select name="filter" id="filter" onChange={handleMonthChange}>
                  <option value="0">All Time</option>
                  <option value="1">A Month Ago</option>
                  <option value="2">2 Months Ago</option>
                  <option value="3">3 Months Ago</option>
                  <option value="4">Last Year</option>
                </select>
              </div>
              <div className="second">
                <h2>Filter By Trip Amount:</h2>
                <select name="filter_two" id="filter_two">
                  <option value="ALL">ALL</option>
                  <option value="LEAST">LEAST</option>
                  <option value="MONTH">MOST</option>
                </select>
              </div>
            </div>
          </div>
          <div className={styles.left}>
            <button>
              Download Trip trips <Download style={{ marginLeft: "1rem" }} />
            </button>
            <button onClick={handleOpen}>
              Schedule Trips For Today{" "}
              <PlusCircle style={{ marginLeft: "1rem" }} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <h3>Trip History (By Weeks)</h3>
        <table>
          <thead>
            <tr>
              <th>WEEK</th>
              <th>START</th>
              <th>END</th>
              <th>TOTAL TRIPS</th>
              <th>TOTAL PASSENGERS</th>
            </tr>
          </thead>
          <tbody>
            {filteredtrips.length > 0 ? (
              filteredtrips.map((week) => (
                <Week
                  num={week.num}
                  start={week.start}
                  end={week.end}
                  trips={week.trips}
                  passengers={week.passengers}
                  type={"TRIP"}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TripAdminPage;
