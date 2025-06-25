import { useAppContext } from "../context/AppContext";

const MyAppointment = () => {
  const { doctors } = useAppContext();
  return <div>
    <p className="text-xl md:text-2xl font-medium mt-20 pb-2 text-gray-500 border-b border-gray-300">My appointments</p>
    <div className="">
      {
        doctors.slice(0,3).map((item,index)=>(
          <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300" key={index}>
            <div>
              <img className="w-32 bg-indigo-50" src={item.image} alt="img" />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-natural-800 font-semibold">{item.name}</p>
              <p>{item.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.address.line1}</p>
              <p className="text-xs">{item.address.line2}</p>
              <p className="text-xs mt-1"><span className="text-sm font-medium text-neutral-700">Date & Time:</span>25, July, 2024 | 8:30 pm</p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end text-gray-400 ">
              <button className="py-2 px-6  hover:bg-primary  hover:text-white transition-all duration-300 cursor-pointer">Pay online</button>
              <button className="py-2 px-6  hover:bg-red-600  hover:text-white transition-all duration-300 cursor-pointer">Cancel appointment</button>
            </div>
          </div>
        ))
      }
    </div>
  </div>;
};

export default MyAppointment;
