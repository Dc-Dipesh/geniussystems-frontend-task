import { useEffect, useState } from "react";
import { DashboardAnalytics } from "../action";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import "../assets/css/analytic.css";
import { Bar, Pie } from "react-chartjs-2";

interface IAnalytics {
  totalSubscribers: number;
  totalSubscriptions: number;
  totalActiveSubscribers: number;
  totalInactiveSubscribers: number;
  totalPackages: number;
  packageSubscribed: PackageSubscribed[];
}

interface PackageSubscribed {
  package: string;
  total: number;
}

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Analytics = () => {
  const [data, setData] = useState<IAnalytics>();
  useEffect(() => {
    DashboardAnalytics()
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="analytic">
      <div className="info-cards">
        <div className="info-card">
          <h2>Total Subscribers</h2>
          <p>{data?.totalSubscribers}</p>
        </div>
        <div className="info-card">
          <h2>Total Subscriptions</h2>
          <p>{data?.totalSubscriptions}</p>
        </div>
        <div className="info-card">
          <h2>Active Subscribers</h2>
          <p>{data?.totalActiveSubscribers}</p>
        </div>
        <div className="info-card">
          <h2>Inactive Subscribers</h2>
          <p>{data?.totalInactiveSubscribers}</p>
        </div>
      </div>
      <div className="chart-container">
        <div className="pie-chart">
          <Pie
            data={{
              labels: ["Active", "Inactive"],
              datasets: [
                {
                  data: [
                    data?.totalActiveSubscribers,
                    data?.totalInactiveSubscribers,
                  ],
                  backgroundColor: ["#FF6384", "#36A2EB"],
                },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
        <div className="bar-chart">
          <Bar
            data={{
              labels: data?.packageSubscribed.map((pkg) => pkg.package),
              datasets: [
                {
                  label: "Values",
                  data: data?.packageSubscribed.map((pkg) => pkg.total),
                  backgroundColor: data?.packageSubscribed?.map(() => {
                    return `#${Math.floor(Math.random() * 16777215).toString(
                      16
                    )}`;
                  }),
                  // borderColor: "#000",
                  borderWidth: 1,
                },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
