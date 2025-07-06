import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { UserService } from "../services/UserService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import useLoading from "../hooks/useLoading";

const MyProfile = () => {
  const { userInfo, setUserInfo } = useAppContext();
  const { loading, showLoader, hideLoader } = useLoading();
  const { token } = useAuth();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [image, setImage] = useState<any>("");

  const fetchUser = async () => {
    try {
      showLoader();
      const response = await UserService.getUser(token);
      if (response.data.data) {
        setUserInfo(response.data.data);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    field2?: string
  ) => {
    const { value } = e.target;
    if (!field2) {
      setUserInfo((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setUserInfo((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field2]: value,
        },
      }));
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", userInfo.name);
    formData.append("phone", userInfo.phone);
    formData.append("gender", userInfo.gender);
    formData.append("dob", userInfo.dob);
    formData.append("address", JSON.stringify(userInfo.address));
    if (image) {
      formData.append("image", image);
    }
    try {
      showLoader();
      const response = await UserService.updateUser(token, formData);
      if (response.data.success) {
        fetchUser();
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      hideLoader();
      setIsEdit(false);
    }
  };

  return (
    <div className="w-full sm:w-1/2">
      {loading && <Loader />}
      <div className="flex gap-4 flex-wrap">
        {isEdit ? (
          <label htmlFor="image">
            <div className="relative cursor-pointer">
              <img
                className="max-w-28 rounded-lg"
                src={image ? URL.createObjectURL(image) : userInfo.image}
                alt="profile"
              />

              <img
                className={`max-w-28 rounded-lg absolute top-2 right-2 ${
                  image ? "hidden" : ""
                }`}
                src={assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e: any) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            className="max-w-28 rounded-lg"
            src={userInfo.image}
            alt="profile"
          />
        )}
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
          <p className="">{userInfo.email}</p>
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
          <div className="flex flex-col w-full gap-2">
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={userInfo.address.line1}
                  onChange={(e) => handleChange(e, "address", "line1")}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                  placeholder="Address"
                />

                <input
                  type="text"
                  value={userInfo.address.line1}
                  onChange={(e) => handleChange(e, "address", "line2")}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                  placeholder="Address"
                />
              </>
            ) : (
              <>
                <span className="">{userInfo.address.line1},</span>
                <span className="">{userInfo.address.line2}</span>
              </>
            )}
          </div>
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
          <label>DOB:</label>
          {isEdit ? (
            <input
              type="date"
              value={userInfo.dob}
              onChange={(e) => handleChange(e, "dob")}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          ) : (
            <p className="">{userInfo.dob}</p>
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
            onClick={handleUpdate}
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
