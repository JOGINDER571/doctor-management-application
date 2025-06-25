// import React from 'react'

import { assets } from "../assets/assets";

const Contact: React.FC = () => {
  return (
    <div>
      <div className="text-xl md:text-2xl text-gray-500 text-center">
        <p>
          CONTACT <span className="text-gray-800 font-medium">US</span>{" "}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-10 py-6">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt="img"
        />
        <div className="flex flex-col gap-6 py-6 text-gray-500">
          <div>
            <b>Our OFFICE</b>
            <div className="flex flex-col gap-3">
              <p>
                54709 Willms Station <br /> Suite 350, Bhiwani, INDIA
              </p>
              <div>
                <p>Tel: (415) 555‑0132</p>
                <p>Email: jogigautam1706@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-start">
            <b>Careers at CLINICORE</b>
            <p>Learn more about our teams and job openings.</p>
            <button className="my-5 font-medium text-xl hover:text-white border-2 border-gray-400 py-2 px-5 cursor-pointer hover:bg-black hover:border-black transition-all duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
