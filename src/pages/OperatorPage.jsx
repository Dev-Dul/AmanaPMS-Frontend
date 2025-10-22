import styles from "../styles/operatorpage.module.css";
import Operator from "../components/Operator";
import { useFetchOperators, useFetchBuses, registerNewOperator } from "../../utils/fetch";
import { Download, PlusCircle, XCircle } from "lucide-react";
import { AuthContext } from "../../utils/context";
import { exportToExcel } from "../../utils/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useContext } from "react";
import { toast } from "sonner";

function OperatorPage() {
    const [overlay, setOverlay] = useState(false);
    const { user, userLoad, userError } = useContext(AuthContext);
    const [filteredData, setFilteredData] = useState([]);
    const [statFilter, setStatFilter] = useState("ALL");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const { operators, operatorsLoading, operatorError } = useFetchOperators();
    const { buses, busLoading, busError } = useFetchBuses();
    const { register, handleSubmit, formState: { errors }} = useForm();
    
    
    function handleOverlay(){
        setOverlay(prev => !prev);
    }

    function handleStatChange(e){
      setStatFilter(e.target.value);
    }

    function handleRoleChange(e){
      setRoleFilter(e.target.value);
    }

    function handleExport(){
      if(operators.length > 0){
        const safeUsers = operators.map(({ password, ...rest }) => rest)
        exportToExcel(safeUsers, "swiftryde_operator_data", "SwiftRyde Operator Data");
      }else{
        toast.error("No data available");
      }
    }

    function handleFilter() {
      let filtered = operators;
      // Filter by status
      if(statFilter !== "ALL") filtered = filtered.filter((opr) => opr.status === statFilter);
      if(roleFilter !== "ALL") filtered = filtered.filter((opr) => opr.role === roleFilter);

      setFilteredData(filtered);
    }

    useEffect(() => {
      handleFilter();
    }, [statFilter, roleFilter, operators])

    async function onSubmit(formData){
        const operatorPromise = registerNewOperator(formData.fullname, formData.role, formData.staffId, formData.busId );
        toast.promise(operatorPromise, {
            loading: "Registering new operator...",
            success: (response) => {
              return response.message;
            },
            error: (error) => {
                return error.message;
            }
        })
    }

    if(operatorsLoading || userLoad || busLoading) return <Loader/>
    if(userError) return <Error error={userError} />
    if(operatorError) return <Error error={operatorError} />

    const active = operators.filter(operator => operator.status === "ACTIVE").length;
    const inActive = operators.filter(operator => operator.status !== "ACTIVE").length;
    const totalDrivers = operators.filter((operator) => operator.role === "DRIVER").length;
    const totalConductors = operators.filter(operator => operator.role === 'CONDUCTOR').length;

  return (
    <div className="container">
      <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={handleOverlay} />
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h2>Register A New Operator</h2>
          <div className={styles.inputBox}>
            <label htmlFor="fullname">Fullname</label>
            <input
              type="text"
              id="fullname"
              {...register("fullname", {
                required: "Operator's fullname is required",
              })}
            />
            {errors.fullname && (
              <p className={styles.error}>{errors.fullname.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="staffId">Staff ID</label>
            <input
              type="text"
              id="staffId"
              {...register("staffId", {
                required: "Operator's staffId is required",
              })}
            />
            {errors.staffId && (
              <p className={styles.error}>{errors.staffId.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="role">Assign Role</label>
            <select
              name="role"
              id="role"
              {...register("role", {
                required: "Operator's role is required",
              })}>
              <option value="" selected>
                Select Operator Role
              </option>
              <option value={"DRIVER"}>DRIVER</option>
              <option value={"CONDUCTOR"}>CONDUCTOR</option>
            </select>
            {errors.role && (
              <p className={styles.error}>{errors.role.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="role">Assign Bus</label>
            <select
              name="role"
              id="busId"
              {...register("busId", {
                required: "Bus id is required",
              })}>
              <option value="" selected>
                Select Bus For Operator
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
            {errors.busId && (
              <p className={styles.error}>{errors.busId.message}</p>
            )}
          </div>
          <button>Register</button>
        </form>
      </div>
      <div className="header">
        <h2>Operators</h2>
      </div>
      <div className={styles.top}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>Total Operators</h2>
            <h3>{operators.length}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Drivers</h2>
            <h3>{totalDrivers}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Conductors</h2>
            <h3>{totalConductors}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Active Operators</h2>
            <h3>{active}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Suspended Operators</h2>
            <h3>{inActive}</h3>
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.filter}>
            <div className="first">
              <h2>Filter By Role:</h2>
              <select name="filter" id="filter" onChange={handleRoleChange}>
                <option value="0">ALL</option>
                <option value="1">DRIVER</option>
                <option value="2">CONDUCTOR</option>
              </select>
            </div>
            <div className="second">
              <h2>Filter By Status:</h2>
              <select
                name="filter_two"
                id="filter_two"
                onChange={handleStatChange}>
                <option value="ALL">ALL</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="EXPIRED">SUSPENDED</option>
                <option value="EXPIRED">DELETED</option>
              </select>
            </div>
          </div>
          <div className={styles.left}>
            <button onClick={handleExport}>
              Download Operator Data <Download style={{ marginLeft: "1rem" }} />
            </button>
            <button onClick={handleOverlay}>
              Register New Operator{" "}
              <PlusCircle style={{ marginLeft: "1rem" }} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <h3>Opearators</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ROLE</th>
              <th>BUS</th>
              <th>DATE HIRED</th>
              <th>STATUS</th>
              <th colSpan={2}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((operator) => (
                <Operator
                  id={operator.staffId}
                  name={operator.fullname}
                  role={operator.role}
                  bus={operator.drivenBuses ?? operator.conductedBuses}
                  date={operator.createdAt}
                  status={operator.status}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: "center", padding: "1rem" }}>
                  No operators found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OperatorPage;
