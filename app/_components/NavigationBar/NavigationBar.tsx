"use client";

import Image from "next/image";
import { SlUser, SlBasket } from "react-icons/sl";
import Dropdown from "./_components/Dropdown";

export default function NavigationBar() {
  return (
    <div className="relative w-full max-w-7xl h-24 flex items-center justify-between font-onest font-semibold">
      <div className="text-3xl font-poppins font-bold">
        <p>Nost Copy</p>
      </div>

      <ul className="flex space-x-8 items-center">
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">
          Home
        </li>
        <li>
          <Dropdown
            label="Services"
            items={[
              { name: "Printing" },
              { name: "Design" },
              { name: "Packaging" },
            ]}
          />
        </li>
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">
          About Us
        </li>
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">
          Contact
        </li>
      </ul>

      <div className="flex flex-row text-xl gap-4">
        <SlUser className="cursor-pointer" />
        <SlBasket className="cursor-pointer" />
      </div>
    </div>
  );
}
