import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { UserService } from "../services/UserService";
import { useEffect, useState } from "react";
import useLoading from "../hooks/useLoading";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";

interface Address {
  line1: string;
  line2: string;
}

interface DoctorData {
  name: string;
  image: string;
  address: Address;
}

interface Appointment {
  id: number;
  docData: DoctorData;
  slotDate: string;
  slotTime: string;
  speciality: string;
  cancelled: boolean;
  payment: boolean;
}

const MyAppointment = () => {
  const [data, setData] = useState<Appointment[]>([]);
  const { fetchDoctors } = useAppContext();
  const { token } = useAuth();
  const { loading, showLoader, hideLoader } = useLoading();
  const fetchAppointments = async () => {
    try {
      showLoader();
      const response = await UserService.getAppointments(token);
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);
  const handleCancelAppointment = async (id: number) => {
    try {
      showLoader();
      const response = await UserService.cancelAppointment(token, id);
      if (response.data.success) {
        fetchDoctors();
        toast.success(
          response.data.message || "Appointment cancelled successfully"
        );
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      hideLoader();
      fetchAppointments();
    }
  };

  const initPay = (order: any) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Apointment payment",
      description: "Payment for appointment",
      image: "https://example.com/logo.png",
      order_id: order.id,
      receipt: order.receipt,
      handler: async function (response: any) {
        console.log(response);
        await UserService.verifyPayment(token, response.razorpay_order_id);
        fetchAppointments();
        toast.success("Payment successful");
      },
    };
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const handlePayment = async (id: number) => {
    try {
      showLoader();
      const response = await UserService.paymentRazorpay(token, id);
      if (response.data.success) {
        // console.log(response.data);
        initPay(response.data.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      hideLoader();
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <p className="text-xl md:text-2xl font-medium mt-20 pb-2 text-gray-500 border-b border-gray-300">
        My appointments
      </p>
      <div className="">
        {data?.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt="img"
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-natural-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm font-medium text-neutral-700">
                  Date & Time:
                </span>
                {item.slotDate} | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end text-gray-400 ">
              {!item.cancelled && (
                <button
                disabled={item.payment}
                  onClick={() => handlePayment(item.id)}
                  className={`py-2 px-6 min-w-54 ${
                    item.payment
                      ? "border-3 border-gray-400 text-green-500"
                      : "hover:bg-primary  hover:text-white transition-all duration-300 cursor-pointer"
                  } `}
                >
                  {item.payment ? "Paid" : "Pay online"}
                </button>
              )}
              {!item.payment && (
                <button
                  onClick={() => handleCancelAppointment(item.id)}
                  disabled={item.cancelled}
                  className={`py-2 px-6 ${
                    item.cancelled ? "" : "hover:text-white"
                  }  transition-all duration-300 ${
                    item.cancelled
                      ? "text-red-600 cursor-not-allowed border-3 border-gray-400"
                      : "cursor-pointer hover:bg-red-600"
                  } `}
                >
                  Appointment {item.cancelled ? "Cancelled" : "Cancel"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
