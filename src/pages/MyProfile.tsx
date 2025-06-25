import { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState({
    name: "Edward Vincent",
    emailId: "richardjameswap@gmail.com",
    phone: "+1  123 456 7890",
    address: "57th Cross, Richmond,Circle, Church Road, London",
    gender: "Male",
    birthday: "2024-07-20",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full sm:w-1/2">
      <div className="flex gap-4 flex-wrap">
        <img
          className="max-w-28 rounded-lg"
          src={assets.profile_pic}
          alt="profile"
        />
        <img
          className="max-w-28 rounded-lg"
          src={assets.profile_pic}
          alt="profile"
        />
      </div>

      {/* Name */}
      <div className="w-full  text-xl md:text-2xl font-medium mt-5 border-b-2 border-gray-300 py-2">
        {isEdit ? (
          <input
            type="text"
            value={userInfo.name}
            onChange={(e) => handleChange(e, "name")}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        ) : (
          <p>{userInfo.name}</p>
        )}
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-2 text-sm text-gray-600 pt-4">
        <p className="underline text-gray-800 font-medium">
          CONTACT INFORMATION
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <label>Email id:</label>
          <p className="">{userInfo.emailId}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <label>Phone:</label>
          {isEdit ? (
            <input
              type="text"
              value={userInfo.phone}
              onChange={(e) => handleChange(e, "phone")}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          ) : (
            <p className="">{userInfo.phone}</p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <label>Address:</label>
          {isEdit ? (
            <input
              type="text"
              value={userInfo.address}
              onChange={(e) => handleChange(e, "address")}
              className="border border-gray-300 rounded px-2 py-1 w-full"
              placeholder="Address"
            />
          ) : (
            <p className="">{userInfo.address}</p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div className="flex flex-col gap-2 text-sm text-gray-600 pt-4">
        <p className="underline text-gray-800 font-medium">BASIC INFORMATION</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <label>Gender:</label>
          {isEdit ? (
            <select
              value={userInfo.gender}
              onChange={(e: any) => handleChange(e, "gender")}
              className="border border-gray-300 rounded px-2 py-1 bg-white w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="">{userInfo.gender}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <label>Birthday:</label>
          {isEdit ? (
            <input
              type="date"
              value={userInfo.birthday}
              onChange={(e) => handleChange(e, "birthday")}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          ) : (
            <p className="">
              {new Date(userInfo.birthday).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-4 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setIsEdit((prev) => !prev)}
          className="font-medium text-xl hover:text-white border-2 border-gray-400 py-1 px-5 cursor-pointer hover:bg-black hover:border-black transition-all duration-300"
        >
          {isEdit ? "Cancel" : "Edit"}
        </button>
        {isEdit && (
          <button
            onClick={() => {
              setIsEdit(false);
              console.log("Saved:", userInfo);
            }}
            className="font-medium text-xl hover:text-white border-2 border-gray-400 py-1 px-5 cursor-pointer hover:bg-black hover:border-black transition-all duration-300"
          >
            Save Information
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
