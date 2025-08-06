import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img className="mb-5 w-40" src={assets.logo1} alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Our Doctor Management System streamlines appointment scheduling, patient management. From tracking consultation history to managing availability and earnings, the system empowers healthcare professionals with a modern, efficient, and easy-to-use platform.
          </p>

        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-4 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-4 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>jogigautam1706@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="border-b border-gray-500" />
        <p className="py-5 text-sm text-center">Copyright © 2024 clinicore - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
