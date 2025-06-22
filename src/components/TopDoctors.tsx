// import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useAppContext();
  return (
    <div className="flex flex-col items-center gap-4 text-gray-900 my-16 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500 cursor-pointer"
          >
            <img className="bg-blue-50" src={item.image} alt="image" />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-500 ">
                <p className="w-2 h-2 rounded-full bg-green-500"></p>
                <p>Available</p>
              </div>
              <p className="font-semibold text-lg text-gray-6">{item.name}</p>
              <p className="font-medium text-sm text-gray-500">
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="font-semibold text-gray-600 rounded-full px-10 py-2 bg-blue-50 cursor-pointer hover:bg-gray-400 transition-all duration-500"
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
