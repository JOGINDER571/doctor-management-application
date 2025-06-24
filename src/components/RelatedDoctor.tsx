import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import type { DoctorInterface } from "../assets/assets";
import { useNavigate } from "react-router-dom";
// Define props interface
interface RelatedDoctorProps {
  docId: string;
  speciality: string;
}

const RelatedDoctor: React.FC<RelatedDoctorProps> = ({ docId, speciality }) => {
  const { doctors } = useAppContext();
  const navigate = useNavigate();
  const [relDoc, setLelDoc] = useState<DoctorInterface[]>([]);
  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const docData = doctors.filter(
        (item) => item.speciality === speciality && item._id !== docId
      );
      setLelDoc(docData);
    }
  }, []);
  return (
    <div className="flex flex-col items-center gap-4 text-gray-900 my-16 md:mx-10">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
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
      {/* <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="font-semibold text-gray-600 rounded-full px-10 py-2 bg-blue-50 cursor-pointer hover:bg-gray-400 transition-all duration-500"
      >
        more
      </button> */}
    </div>
  );
};

export default RelatedDoctor;
