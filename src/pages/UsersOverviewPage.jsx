import styles from "../styles/usersoverview.module.css";
import UserOverview from "../components/UserOverView";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { AuthContext } from "../../utils/context";
import { useFetchUsers } from "../../utils/fetch";
import { exportToExcel } from "../../utils/utils";

function UsersOverviewPage() {
    const [filteredData, setFilteredData] = useState([]);
    const [statFilter, setStatFilter] = useState("ALL");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const { user, userLoad, userError } = useContext(AuthContext);
    const { users, userLoading, usersError } = useFetchUsers();
    

    function handleStatChange(e){
      setStatFilter(e.target.value);
    }

    function handleExport(){
      if(users.length > 0){
        exportToExcel(users, "swiftryde_user_data", "SWIFTRYDE USER DATA");
      }else{
        toast.error("No data available");
      }
    }

    function handleRoleChange(e){
      setRoleFilter(e.target.value);
    }

    function handleFilter() {
      let filtered = users;
      // Filter by status
      if(statFilter !== "ALL") filtered = filtered.filter((user) => user.status === statFilter);
      if(roleFilter !== "ALL") filtered = filtered.filter((user) => user.role === roleFilter);

      setFilteredData(filtered);
    }

    useEffect(() => {
      handleFilter();
    }, [statFilter, roleFilter, users])

  if(userLoading || userLoad) return <Loader />;
  if(usersError || !user || userError) return <Error />;

  const active = users.filter(user => user.status === "ACTIVE").length;
  const inActive = users.filter(user => user.status !== "ACTIVE").length;
  const totalStaff = users.filter((user) => user.role === "STAFF").length;
  const totalStudents = users.filter(user => user.role === 'STUDENT').length;
  
  return (
    <div className="container">
      <div className="header">
        <h2>Users</h2>
      </div>
      <div className={styles.top}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>Total Users</h2>
            <h3>{users.length}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Staff</h2>
            <h3>{totalStaff}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Students</h2>
            <h3>{totalStudents}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Active Users</h2>
            <h3>{active}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Suspended Users</h2>
            <h3>{inActive}</h3>
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.filter}>
            <div className="first">
              <h2>Filter By Role:</h2>
              <select name="filter" id="filter" onChange={handleRoleChange}>
                <option value="ALL">Staff</option>
                <option value="STAFF">Staff</option>
                <option value="STUDENT">Student</option>
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
              Download User Data <Download style={{ marginLeft: "1rem" }} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <h3>Users</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ROLE</th>
              <th>STATUS</th>
              <th>TRIPS</th>
              <th>TICKETS</th>
              <th colSpan={2}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((user) => (
                <UserOverview
                  id={user.admissionNo ?? user.staffId}
                  name={user.fullname}
                  role={user.role}
                  status={user.status}
                  trips={user.boardings.length}
                  tickets={user.tickets.length}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: "center", padding: "1rem" }}>
                  No Users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersOverviewPage;
