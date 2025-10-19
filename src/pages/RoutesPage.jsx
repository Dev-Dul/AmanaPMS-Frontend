import styles from "../styles/routespage.module.css";
import Route from "../components/Route";
import { useFetchRoutes } from "../../utils/fetch";
import { Download, PlusCircle, XCircle } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { AuthContext } from "../../utils/context";
import { exportToExcel } from "../../utils/utils";

function RoutesPage() {
    const [stops, setStops] = useState([]);
    const [overlay, setOverlay] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [statFilter, setStatFilter] = useState("ALL");
    const { register, handleSubmit, formState: { errors }} = useForm();
    const { user, userLoad } = useContext(AuthContext);
    const { routes, routeLoading, routeError } = useFetchRoutes();
    

    function handleOverlay(){
        setOverlay(prev => !prev);
    }

    function handleStops(){
        setStops([...stops, ""])
    }

    function handleExport(){
      if(routes.length > 0){
        exportToExcel(routes, "swiftryde_routes_data", "SWIFTRYDE ROUTES DATA");
      }else{
        toast.error("No data available");
      }
    }

    function handleChange(index, value){
        const newInputs = [...stops];
        newInputs[index] = value;
        setStops(newInputs);
    }

    function handleStatChange(e) {
      setStatFilter(e.target.value);
    }

    function handleFilter() {
      let filtered = routes;
      // Filter by status
      if(statFilter !== "ALL") filtered = filtered.filter((route) => route.status === statFilter);

      setFilteredData(filtered);
    }

    useEffect(() => {
      handleFilter();
    }, [statFilter, routes]);

    if(routeLoading || userLoad) return <Loader />;
    if(!user) return <Error />;
    if(routeError) return <Error error={routeError} />;

    const active = routes.filter(route => route.status === "ACTIVE").length;
    const inActive = routes.filter(route => route.status !== "ACTIVE").length;
    const totalStops = routes.reduce((total, route) => total + (route.stops?.length || 0), 0);

  return (
    <div className="container">
      <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={handleOverlay} />
        <form action="">
          <h2>Register A New Route</h2>
          <div className={styles.inputBox}>
            <label htmlFor="name">Route Name</label>
            <input type="text" />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="start">Starting Point</label>
            <input type="text" />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="end">End Point</label>
            <input type="text" />
          </div>
          <div className={`${styles.inputBox} ${styles.two}`}>
            <label htmlFor="stops">Bus Stops</label>
            {stops.map((stop, index) => (
              <input
                key={index}
                type="text"
                value={stop}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
            <button type="button" className={styles.new} onClick={handleStops}>
              Add New Bus Stop <PlusCircle style={{ marginLeft: "1rem" }} />
            </button>
          </div>
          <button>Register</button>
        </form>
      </div>
      <div className="header">
        <h2>Routes</h2>
      </div>
      <div className={styles.top}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>Total Routes</h2>
            <h3>{routes.length}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Active Routes</h2>
            <h3>{active}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Inactive Routes</h2>
            <h3>{inActive}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Bus Stops</h2>
            <h3>{totalStops}</h3>
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.filter}>
            <div className="first">
              <h2>Filter By Bus Stops:</h2>
              <select name="filter" id="filter">
                <option value="1">0 - 10</option>
                <option value="2">10 - 20</option>
                <option value="2">20 - 30</option>
              </select>
            </div>
            <div className="second">
              <h2>Filter By Status:</h2>
              <select name="filter_two" id="filter_two" onChange={handleStatChange}>
                <option value="ALL">ALL</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="EXPIRED">DELETED</option>
              </select>
            </div>
          </div>
          <div className={styles.left}>
            <button onClick={handleExport}>
              Download Route Data <Download style={{ marginLeft: "1rem" }} />
            </button>
            <button onClick={handleOverlay}>
              Register New Route <PlusCircle style={{ marginLeft: "1rem" }} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <h3>Routes</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ST. POINT</th>
              <th>END POINT</th>
              <th>BUS STOPS</th>
              <th>STATUS</th>
              <th colSpan={2}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((route) => (
                <Route
                  id={route.id}
                  name={route.name}
                  start={route.startPoint}
                  end={route.endPoint}
                  stops={route.stops.length}
                  status={route.status}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: "center", padding: "1rem" }}>
                  No routes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RoutesPage;
