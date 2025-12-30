import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowRight, Wallet, Plus, ClipboardCopy, TrendingUp } from "lucide-react";
import styles from "../styles/userdashboard.module.css";
import { AuthContext } from "../../utils/context";
import { format, startOfToday } from "date-fns";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import { useContext } from "react";
import { toast } from "sonner";

function UserDashboard() {
  const navigate = useNavigate();
  const { user, userLoad } = useContext(AuthContext);

  if(userLoad) return <Loader />;
  if(!user) return <Error />;

  // Format current date dynamically
  const today = format(new Date(), "EEE, MMM d yyyy");

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(user.accountNumber ?? "8069940628");
    toast.info("Account number copied!");
  };

  const isPassenger = user?.role === "STUDENT" || user?.role === "STAFF"; // You can adapt this based on your logic

  return (
    <div className="container">
      <div className="header">
        <h2>Dashboard</h2>
      </div>

      <div className={styles.top}>
        <h1 style={{ color: "#007ba7" }}>Welcome Back!, {user.username}</h1>
        {isPassenger && (
          <p className={styles.sub}>Let's see how far we can go today.</p>
        )}
      </div>

      <div className={styles.middle}>
        {isPassenger && (
          <div className={styles.acctBox}>
            <div className={styles.action}>
              <div className={styles.ft}>
                <div>
                  <p>Acct Status: {user.status}</p>
                </div>
                <div>
                  <button>
                    Sale History <ArrowRight className={styles.icon} />
                  </button>
                </div>
              </div>

              <div className={styles.mid}>
                <div>
                  <h3>{user.fullname}</h3>
                </div>
                <div>
                  <button onClick={() => navigate("/new")}>
                    Record New Sale <Plus className={styles.icon} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        <div className={styles.tripBox}>
          <div className={styles.heading}>
            <h2>Total Sales</h2>
            <TrendingUp />
          </div>
          <h3>{user.purchases?.length ?? 0}</h3>
          <p>Lifetime Sales Completed</p>
        </div>

        <div className={styles.bottom}>
            <h2>Sales Made in the Last 7 Days</h2>
            <div className={styles.chart}>
              {user.purchases.length === 0 ? (
                <p style={{ textAlign: "center", color: "#888" }}>
                  No data available
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={user.purchases}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip
                      formatter={(value) => [`${value} purchases`, "Purchases"]}
                      labelFormatter={(label) =>
                        new Date(label).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })
                      }
                    />
                    <Bar dataKey="count" fill="#007bff" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}

export default UserDashboard;
