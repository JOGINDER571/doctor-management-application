import { assets } from "../assets/assets.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import { useState } from "react";
import { useAppContext } from "../context/AppContext.tsx";
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { userInfo } = useAppContext();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center py-4 mb-5 border-b-2 border-b-gray-300">
      <NavLink to={"/"}>
        <img className="w-44 cursor-pointer" src={assets.logo1} alt="" />
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
            <div
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center justify-center gap-1.5"
            >
              <img
                className="w-[40px] h-[40px] object-cover rounded-full"
                src={userInfo.image ?? assets.profile_pic}
                alt="profile_image"
              />
              <img
                className="w-2.5"
                src={assets.dropdown_icon}
                alt="dropdown_arrow"
              />
            </div>

            <div
              className={`absolute z-10 top-0 right-0 pt-14 font-medium text-base text-gray-600 cursor-pointer ${
                showDropdown ? "block" : "hidden"
              } sm:group-hover:block`}
            >
              <div
                onClick={() => setShowDropdown(false)}
                className="min-w-48 bg-stone-100 flex flex-col gap-4 p-4"
              >
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
            onClick={() => {
              navigate("/login");
            }}
            className="py-3 px-8 text-[#fff] rounded-full bg-primary cursor-pointer font-light hidden md:block"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-8 md:hidden"
          src={assets.menu_icon}
          alt="img"
        />
        <div
          className={` ${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white`}
        >
          <div className="flex items-center justify-between px-2 py-3">
            <img className="w-36" src={assets.logo1} alt="img" />
            <img
              onClick={() => setShowMenu(false)}
              className="w-8"
              src={assets.cross_icon}
              alt="img"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to={"/"}>
              <li className="py-1">HOME</li>
              <hr className="border-none outline-none bg-primary h-0.5 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/doctors"}>
              <li className="py-1">ALL DOCTORS</li>
              <hr className="border-none outline-none bg-primary h-0.5 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/about"}>
              <li className="py-1">ABOUT</li>
              <hr className="border-none outline-none bg-primary h-0.5 w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/contact"}>
              <li className="py-1">CONTACT</li>
              <hr className="border-none outline-none bg-primary h-0.5 w-3/5 m-auto hidden" />
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
