import { assets } from "../assets/assets.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { token, login, logout } = useAuth();

  return (
    <div className="flex justify-between items-center py-4 mb-5 border-b-2 border-b-gray-300">
      <NavLink to={"/"}>
        <img className="w-44 cursor-pointer" src={assets.logo} alt="" />
      </NavLink>
      <ul className="hidden md:flex justify-center items-start gap-5 font-medium">
        <NavLink to={"/"}>
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none bg-primary h-0.5 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none bg-primary h-0.5 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none bg-primary h-0.5 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none bg-primary h-0.5 w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center">
        {token ? (
          <div className="flex items-center justify-center gap-1.5 group relative">
            <img
              className="w-8 rounded-full"
              src={assets.profile_pic}
              alt="profile_image"
            />
            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt="dropdown_arrow"
            />
            <div className="absolute z-10 top-0 right-0 pt-14 font-medium text-base text-gray-600 hidden cursor-pointer group-hover:block">
              <div className="min-w-48 bg-stone-100 flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointment")}
                  className="hover:text-black"
                >
                  My Appointments
                </p>
                <p onClick={() => logout()} className="hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => login()}
            className="py-3 px-8 text-[#fff] rounded-full bg-primary cursor-pointer font-light hidden md:block"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
