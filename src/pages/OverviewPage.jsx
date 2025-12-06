import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useLast7DaysPurchases, useFetchOverView } from "../../utils/fetch";
import styles from "../styles/overviewpage.module.css";
import { AuthContext } from "../../utils/context";
import { useContext, useState } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";

function OverviewPage() {
  const { user, userLoad } = useContext(AuthContext);
  const { data, loading, error } = useLast7DaysPurchases();
  const { overview, ovLoading, ovError } = useFetchOverView();

  if(loading || userLoad || ovLoading) return <Loader />;
  if(error || !user || ovError) return <Error error={error} />;

  return (
    <div className="container">
      <div className="header">
        <h2>Overview</h2>
      </div>

      {/* ===== Top Section ===== */}
      <div className={styles.top}>
        <h2>Welcome Back, Admin!</h2>
        <div className={styles.cardsWrapper}>
          <h3>Here's today's stats</h3>
          <div className={styles.cards}>

            <div className={styles.card}>
              <h2>{overview.today.purchases}</h2>
              <h4>Total Puchases</h4>
            </div>

            <div className={styles.card}>
              <h2>{overview.today.drugs}</h2>
              <h4>Total Drugs Sold</h4>
            </div>

            <div className={styles.card}>
              <h2>{overview.today.items}</h2>
              <h4>Total Items Sold</h4>
            </div>
            
            <div className={styles.card}>
              <h2>₦{overview.today.revenue}</h2>
              <h4>Total Revenue</h4>
            </div>

          </div>
        </div>
      </div>

      {/* ===== Middle Section ===== */}
      <div className={styles.middle}>
        <div className={styles.cardsWrapper}>
          <h3>All-time stats</h3>
          <div className={styles.cards}>
            <div className={styles.card}>
              <h2>{overview.allDrugs}</h2>
              <h4>Total Drugs</h4>
            </div>

            <div className={styles.card}>
              <h2>{overview.availableDrugs}</h2>
              <h4>Available Drugs</h4>
            </div>

            <div className={styles.card}>
              <h2>{overview.finishedDrugs}</h2>
              <h4>Finished Drugs</h4>
            </div>

            <div className={styles.card}>
              <h2>{overview.items}</h2>
              <h4>Total Items</h4>
            </div>

            <div className={styles.card}>
              <h2>{overview.availableItems}</h2>
              <h4>Available Items</h4>
            </div>

            <div className={styles.card}>
              <h2>{overview.finishedItems}</h2>
              <h4>Finished Items</h4>
            </div>

            <div className={styles.card}>
              <h2>{overview.staff}</h2>
              <h4>Total Staff</h4>
            </div>

            <div className={styles.card}>
              <h2>{overview.totalPurchases}</h2>
              <h4>All Time Purchases</h4>
            </div>

            <div className={styles.card}>
              <h2>₦{overview.totalRevenue}</h2>
              <h4>Total Revenue</h4>
            </div>

          </div>
        </div>
      </div>

      {/* ===== Bottom Section (Bar Chart) ===== */}
      <div className={styles.bottom}>
        <h2>Purchases in the Last 7 Days</h2>
        <div className={styles.chart}>
          {data.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888" }}>
              No data available
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
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
  );
}

export default OverviewPage;
