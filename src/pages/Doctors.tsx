import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import type { DoctorInterface } from "../assets/assets";
import { specialityData } from "../assets/assets";
const Doctors = () => {

  const navigate = useNavigate();
  const { speciality } = useParams();
  const { doctors } = useAppContext();
  const [filterDoc, setFilterDoc] = useState<DoctorInterface[]>([]);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((item) => item.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col md:flex-row items-start gap-4 mt-5">
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          {specialityData.map((item, index) => (
            <p
              key={index}
              onClick={() =>
                speciality === item.speciality
                  ? navigate("/doctors")
                  : navigate(`/doctors/${item.speciality}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 rounded border border-gray-500 cursor-pointer transition-all ${
                item.speciality === speciality ? "bg-indigo-100 text-black" : ""
              }`}
            >
              {item.speciality}
            </p>
          ))}
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc?.length > 0 ? (
            filterDoc.map((item, index) => (
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
                  <p className="font-semibold text-lg text-gray-6">
                    {item.name}
                  </p>
                  <p className="font-medium text-sm text-gray-500">
                    {item.speciality}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl md:text-3xl text-gray-800 flex justify-center">
              No data found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
