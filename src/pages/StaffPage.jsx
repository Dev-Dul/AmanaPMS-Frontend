import styles from "../styles/operatorpage.module.css";
import Operator from "../components/Staff";
import { useFetchStaff, registerNewStaff } from "../../utils/fetch";
import { Download, PlusCircle, XCircle } from "lucide-react";
import { AuthContext } from "../../utils/context";
import { exportToExcel } from "../../utils/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useContext } from "react";
import { toast } from "sonner";
import Staff from "../components/Staff";

function StaffPage() {
    const [overlay, setOverlay] = useState(false);
    const { user, userLoad, userError } = useContext(AuthContext);
    const [filteredData, setFilteredData] = useState([]);
    const [statFilter, setStatFilter] = useState("ALL");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const { staff, staffLoading, staffError } = useFetchStaff();
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
      if(staff.length > 0){
        const safeUsers = staff.map(({ password, ...rest }) => rest)
        exportToExcel(safeUsers, "swiftryde_staff_data", "Staff Data");
      }else{
        toast.error("No data available");
      }
    }

    function handleFilter() {
      let filtered = staff;
      // Filter by status
      if(statFilter !== "ALL") filtered = filtered.filter((opr) => opr.status === statFilter);
      if(roleFilter !== "ALL") filtered = filtered.filter((opr) => opr.role === roleFilter);

      setFilteredData(filtered);
    }

    useEffect(() => {
      handleFilter();
    }, [statFilter, roleFilter, staff])

    async function onSubmit(formData){
        const staffPromise = registerNewStaff(formData.fullname, formData.password, formData.email, formData.username);
        toast.promise(staffPromise, {
            loading: "Registering new staff...",
            success: (response) => {
              return response.message;
            },
            error: (error) => {
                return error.message;
            }
        })
    }

    if(staffLoading || userLoad) return <Loader/>
    if(userError) return <Error error={userError} />
    if(staffError) return <Error error={staffError} />

    const active = staff.filter(st => st.status === "ACTIVE").length;
    const inActive = staff.filter(st => st.status !== "ACTIVE").length;
    

  return (
    <div className="container">
      <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={handleOverlay} />
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h2>Register A New Staff</h2>
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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: "Staff's username is required",
              })}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Staff's email is required",
              })}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Staff's passwod is required",
              })}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>
          
          <button>Register</button>
        </form>
      </div>
      
      <div className="header">
        <h2>Staff</h2>
      </div>
      <div className={styles.top}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>Total Staff</h2>
            <h3>{staff.length}</h3>
          </div>

          <div className={styles.card}>
            <h2>Total Active Staff</h2>
            <h3>{active}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Suspended Staff</h2>
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
              Download Staff Data <Download style={{ marginLeft: "1rem" }} />
            </button>
            <button onClick={handleOverlay}>
              Register New Staff{" "}
              <PlusCircle style={{ marginLeft: "1rem" }} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <h3>Staff</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>USERNAME</th>
              <th>DATE REGISTERED</th>
              <th>TOTAL SALES</th>
              <th>STATUS</th>
              <th colSpan={2}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((staff) => (
                <Staff
                  id={staff.id}
                  name={staff.fullname}
                  username={staff.username}
                  date={staff.created}
                  sales={staff.purchases.length}
                  status={staff.status}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: "center", padding: "1rem" }}>
                  No staff found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffPage;
