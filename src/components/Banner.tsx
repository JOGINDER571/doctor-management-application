import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex  bg-primary rounded-lg px-6 sm:px-10 md:px-12 lg:px-14 my-20 md:mx-10">
      <div className="flex-1 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white font-semibold py-4">
          <p>Book Appointment</p>
          <p>With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="mb-2 py-3 px-8 flex items-center gap-2 rounded-full font-medium bg-white cursor-pointer text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Create account
        </button>
      </div>
      <div className="hidden md:block md:w-1/2 lg:w-[400px] relative">
        <img
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={assets.appointment_img}
          alt="img"
        />
      </div>
    </div>
  );
};

export default Banner;
