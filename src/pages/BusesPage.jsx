import styles from "../styles/busespage.module.css";
import Bus from "../components/Bus";
import { Download, PlusCircle, XCircle } from "lucide-react";
import { useFetchBuses, registerNewBus, useFetchOperators } from "../../utils/fetch";
import { AuthContext } from "../../utils/context";
import { exportToExcel } from "../../utils/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useContext } from "react";
import { toast } from "sonner";

function BusesPage() {
    const [filteredData, setFilteredData] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [conductors, setConductors] = useState([]);
    const [filter, setFilter] = useState("ALL");
    const [overlay, setOverlay] = useState(false);
    const { user, userLoad } = useContext(AuthContext);
    const { buses, busLoading, busError } = useFetchBuses();
    const { operators, operatorsLoading, operatorError } = useFetchOperators();
    const { register, handleSubmit, formState: { errors }} = useForm();

    function handleOverlay(){
      setOverlay(prev => !prev);
    }

    function handleExport(){
      if(buses.length > 0){
        exportToExcel(buses, "swiftryde_buses_data", "SWIFTRYDE BUSES DATA");
      }else{
        toast.error("No data available");
      }
    }

    function handleChange(e){
      setFilter(e.target.value);
    }

    function handleFilter(){
      let filtered = buses;
      // Filter by status
      if(filter !== "ALL") {
        filtered = filtered.filter((bus) => bus.status === filter);
      }

      setFilteredData(filtered);
    }

    useEffect(() => {
      handleFilter();
    }, [filter, buses])

    useEffect(() => {
      if(user){
        const driverArr = operators.filter(operator => operator.role === "DRIVER");
        const conductorArr = operators.filter(operator => operator.role === "CONDUCTOR");
        setDrivers(driverArr);
        setConductors(conductorArr);
      }
    }, [])

    async function onSubmit(formData){
        const newBusPromise = registerNewBus(formData.plateNum, formData.make, formData.model, formData.capacity, formData.driverId, formData.conductorId);
        toast.promise(newBusPromise, {
            loading: "Registering new bus...",
            success: (response) => {
              return response.message;
            },
            error: (error) => {
                return error.message;
            }
        })
    }

    if(busLoading || userLoad || operatorsLoading) return <Loader/>
    if(!user) return <Error />
    if(busError || operatorError) return <Error error={busError} />

    const active = buses.filter(bus => bus.status === "ACTIVE").length;
    const inActive = buses.filter(bus => bus.status !== "ACTIVE").length;
    const totalRoutes = buses.reduce((total, bus) => total + (bus.routes?.length || 0), 0);
    const totalCapacity = buses.reduce((total, bus) => total + (bus.capacity || 0), 0);

  return (
    <div className="container">
      <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={handleOverlay} />
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h2>Register A New Bus</h2>
          <div className={styles.inputBox}>
            <label htmlFor="make">Make</label>
            <input
              type="text"
              id="make"
              {...register("make", {
                required: "Bus make is required",
              })}
            />
            {errors.make && (
              <p className={styles.error}>{errors.make.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="model">Model</label>
            <input
              type="text"
              id="model"
              {...register("model", {
                required: "Bus model is required",
              })}
            />
            {errors.model && (
              <p className={styles.error}>{errors.model.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="plateNum">Plate Number</label>
            <input
              type="text"
              id="plateNum"
              {...register("plateNum", {
                required: "Plate Number is required",
              })}
            />
            {errors.plateNum && (
              <p className={styles.error}>{errors.plateNum.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="capacity">Capacity</label>
            <input
              type="number"
              min={10}
              id="capcity"
              {...register("capcity", {
                required: "Bus capacity is required",
              })}
            />
            {errors.capacity && (
              <p className={styles.error}>{errors.capacity.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="conductor">Assign Conductor</label>
            <select
              name="conductor"
              id="conductor"
              {...register("conductorId", {
                required: "Conductor Id is required",
              })}>
              <option value="" selected>
                Select Conductor For This Bus
              </option>
              {conductors.length > 0 ? (
                conductors.map((conductor) => (
                  <option key={conductor.id} value={conductor.id}>
                    {conductor.fullname}
                  </option>
                ))
              ) : (
                <option>No conductors found</option>
              )}
            </select>
            {errors.conductorId && (
              <p className={styles.error}>{errors.conductorId.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="driver">Assign Driver</label>
            <select
              name="driver"
              id="driver"
              {...register("driverId", {
                required: "Driver Id is required",
              })}>
              <option value="" selected>
                Select Driver For This Bus
              </option>
              {drivers.length > 0 ? (
                drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.fullname}
                  </option>
                ))
              ) : (
                <option>No Drivers found</option>
              )}
              {errors.driverId && (
                <p className={styles.error}>{errors.driverId.message}</p>
              )}
            </select>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <div className="header">
        <h2>Buses</h2>
      </div>
      <div className={styles.top}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>Total Buses</h2>
            <h3>{buses.length}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Bus Capacity</h2>
            <h3>{totalCapacity}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Bus Routes</h2>
            <h3>{totalRoutes}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Active Buses</h2>
            <h3>{active}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Inactive Buses</h2>
            <h3>{inActive}</h3>
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.filter}>
            <div className="first">
              <h2>Filter By Capacity:</h2>
              <select name="filter" id="filter">
                <option value="1">0 - 20</option>
                <option value="2">20 - 30</option>
                <option value="2">30 - 40</option>
                <option value="2">40 - 50</option>
                <option value="2">50 - 60</option>
                <option value="2">60 - 70</option>
                <option value="2">70 - 80</option>
              </select>
            </div>
            <div className="second">
              <h2>Filter By Status:</h2>
              <select name="filter_two" id="filter_two" onChange={handleChange}>
                <option value="ALL">ALL</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="EXPIRED">INACTIVE</option>
                <option value="EXPIRED">DELETED</option>
              </select>
            </div>
          </div>
          <div className={styles.left}>
            <button>
              Download Bus Data{" "}
              <Download style={{ marginLeft: "1rem" }} size={20} />
            </button>
            <button onClick={handleOverlay}>
              Register New Bus{" "}
              <PlusCircle style={{ marginLeft: "1rem" }} size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <h3>Buses</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>MAKE</th>
              <th>MODEL</th>
              <th>PLATE NO</th>
              <th>CAPACITY</th>
              <th>ROUTES</th>
              <th>DRIVER</th>
              <th>CONDUCTOR</th>
              <th>STATUS</th>
              <th colSpan={2}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((bus) => (
                <Bus
                  id={bus.id}
                  make={bus.make}
                  model={bus.model}
                  plate={bus.plateNumber}
                  capacity={bus.capacity}
                  routes={bus.routes.length}
                  driver={bus.driver.fullname}
                  conductor={bus.conductor.fullname}
                  status={bus.status}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  style={{ textAlign: "center", padding: "1rem" }}>
                  No buses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BusesPage;
