// import React from 'react'
import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets";
const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-4 text-gray-800 py-16"
    >
      <h1 className="text-3xl md:text-3xl font-medium">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex sm:justify-center w-full gap-4 pt-4 overflow-scroll">
        {specialityData.map((item, index) => (
          <Link onClick={() => scrollTo(0,0)} className="flex flex-col items-center text-xl  cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-400" key={index} to={`doctors/${item.speciality}`}>
            <img className="w-16 sm:w-24 mb-2" src={item.image} alt="speciality" />
            <p className="text-center py-2 font-light">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
