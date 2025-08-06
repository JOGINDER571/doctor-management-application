import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, type DoctorInterface } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import RelatedDoctor from "../components/RelatedDoctor";
import { toast } from "react-toastify";
import { UserService } from "../services/UserService";
import { useAuth } from "../context/AuthContext";
import useLoading from "../hooks/useLoading";
import Loader from "../components/Loader";

interface Slot {
  datetime: Date;
  time: string;
}
const Appointment: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { loading, showLoader, hideLoader } = useLoading();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const { docId } = useParams();
  if (!docId) return;
  const [docInfo, setDocInfo] = useState<DoctorInterface>();
  const { doctors, currencySymbol, fetchDoctors } = useAppContext();
  const [docSlots, setDocSlots] = useState<Slot[][]>([]);
  const [slotIndex, setSlotIndex] = useState<number>(0);
  const [slotTime, setSlotTime] = useState<string>("");
  const getDocInfo = () => {
    setDocInfo(doctors.find((item) => item.id === parseInt(docId)));
  };

  useEffect(() => {
    if (!docId) return;
    getDocInfo();
  }, [docId, doctors]);

  const getAvailableSlots = () => {
    setDocSlots([]);

    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0); // 9:00 PM

      if (i === 0) {
        // today
        const now = new Date();
        const nextHour = now.getHours() + 1;
        currentDate.setHours(nextHour > 10 ? nextHour : 10);
        currentDate.setMinutes(now.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlots: any = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const slotDate = `${day}-${month}-${year}`;
        const slotTime = formattedTime;
        const isSlotAvailable =
          docInfo?.slotsBooked &&
          docInfo?.slotsBooked[slotDate] &&
          docInfo.slotsBooked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    if (!docInfo) return;
    getAvailableSlots();
  }, [docInfo]);

  const handleAppointment = async () => {
    if (!slotTime || !docInfo) {
      toast.error("Please select a time slot to book an appointment.");
      return;
    }
    const date = docSlots[slotIndex][0].datetime;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const appointmentDetails = {
      docId: docInfo.id,
      slotDate: `${day}-${month}-${year}`,
      slotTime: slotTime,
    };
    try {
      showLoader();
      const response = await UserService.bookAppointment(
        token,
        appointmentDetails
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchDoctors();
        navigate("/my-appointment");
      }
      setSlotIndex(0);
      setSlotTime("");
      getAvailableSlots();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error booking appointment");
    } finally {
      hideLoader();
    }
  };
  return (
    docInfo && (
      <div>
        {loading && <Loader />}
        {/* top */}
        <div className="flex flex-col sm:flex-row gap-5">
          <div>
            <img
              className="w-full sm:max-w-80 bg-primary rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-5 py-5 mx-2 sm:mx-0 sm:mt-0">
            <p className="flex  gap-2 font-medium text-xl sm:text-2xl text-gray-700">
              {docInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="img" />
            </p>
            <div className="flex items-center gap-3 text-gray-500 font-small py-2">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <p className="border border-gray-400 p-2 py-1 rounded-full text-sm">
                {docInfo.experience}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2 py-2">
                About
                <img src={assets.info_icon} alt="img" />
              </p>
              <p className="text-gray-500 ">{docInfo.about}</p>
              <p className="text-gray-500 py-2">
                Appointment fee:{" "}
                <span className="text-gray-800">
                  {currencySymbol}
                  {docInfo.fees}
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* bottom */}
        <div className="sm:ml-82 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center overflow-x-scroll py-5">
            {docSlots?.length &&
              docSlots.map((item, index) => {
                if (item?.length === 0) return null;
                return (
                  <div
                    key={index}
                    className={`py-6 min-w-16 rounded-full cursor-pointer text-center
                ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "border-2 border-gray-200"
                } `}
                    onClick={() => {
                      setSlotIndex(index);
                      setSlotTime("");
                    }}
                  >
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                );
              })}
          </div>
          <div className="flex gap-3 flex-wrap items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  className={`text-sm font-medium flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "border border-gray-300 text-gray-400"
                  }`}
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={handleAppointment}
            className="my-5 font-light text-xl text-white bg-primary py-2 px-5 rounded-full cursor-pointer hover:scale-105 transition-all duration-300"
          >
            Book an appointment
          </button>
        </div>
        <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
