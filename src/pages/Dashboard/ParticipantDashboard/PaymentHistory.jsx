import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const res = await axiosSecure.get(
          `/participants/email/${user.email}`
        );
        const participantList = res.data;

        const campDataPromises = participantList.map(async (participant) => {
          const campRes = await axiosSecure.get(
            `/camps/${participant.campId}`
          );
          return {
            campName: campRes.data.title,
            campFees: campRes.data.fees,
            paymentStatus: participant.paymentStatus || "Unpaid",
            confirmationStatus: participant.confirmationStatus || "Pending",
          };
        });

        const allHistory = await Promise.all(campDataPromises);
        setPaymentHistory(allHistory);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchPaymentHistory();
  }, [user?.email]);

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Payment History
      </h2>
      {loading ? (
        <p className="text-center">Loading payment history...</p>
      ) : paymentHistory.length === 0 ? (
        <p className="text-center text-gray-500">No payment records found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border px-4 py-2">Camp Name</th>
              <th className="border px-4 py-2">Fees</th>
              <th className="border px-4 py-2">Payment Status</th>
              <th className="border px-4 py-2">Confirmation Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((history, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{history.campName}</td>
                <td className="border px-4 py-2">${history.campFees}</td>
                <td className="border px-4 py-2">
                  {history.paymentStatus === "Paid" ? (
                    <span className="text-green-600 font-medium">Paid</span>
                  ) : (
                    <span className="text-red-600 font-medium">Unpaid</span>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {history.confirmationStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
