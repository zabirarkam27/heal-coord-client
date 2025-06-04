import { useEffect, useState, useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AuthContext } from "../../../context/AuthProvider";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#d0ed57",
];

const Analytics = () => {
  const { user } = useContext(AuthContext);
  const [campData, setCampData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalFees, setTotalFees] = useState(0);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/participants/email/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const processedData = data.map((item) => ({
            name: item.campName,
            fees: isNaN(parseFloat(item.fees)) ? 0 : parseFloat(item.fees),
            location: item.location,
            doctor: item.doctor,
          }));

          setCampData(processedData);

          const total = processedData.reduce((acc, curr) => acc + curr.fees, 0);
          setTotalFees(total);

          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading analytics data:", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 font-medium">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-2xl font-semibold text-center text-purple-700">
        📊 Your Camp Registration Analytics
      </h2>

      <div className="text-center text-xl font-bold text-green-600">
        💰 Total Fees Paid: ৳{totalFees}
      </div>

      {campData.length === 0 ? (
        <p className="text-center text-gray-500">No data available.</p>
      ) : (
        <>
          {/* Bar Chart */}
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={campData}
                margin={{ top: 20, right: 30, left: 10, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                  height={80}
                />
                <YAxis />
                <Tooltip formatter={(value) => `৳${value}`} />
                <Legend />
                <Bar dataKey="fees" fill="#8884d8" name="Registration Fees">
                  <LabelList
                    dataKey="fees"
                    position="top"
                    formatter={(v) => `৳${v}`}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={campData}
                  dataKey="fees"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {campData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `৳${value}`}
                  labelFormatter={(label) => `Camp: ${label}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
