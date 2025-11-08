"use client";

import { FaTruckFast } from "react-icons/fa6";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineSupportAgent } from "react-icons/md";
import { BiSolidDiscount } from "react-icons/bi";


export default function Dropdown() {
    return (
        <ul className="flex flex-row w-full max-w-7xl justify-between py-20 text-md font-poppins font-light">
            <li className="px-4 py-2 cursor-pointer whitespace-nowrap ">
                <a className="flex flex-row gap-2 items-center hover:text-blue-400"><FaTruckFast className="text-blue-400" />Free delivery worldwide</a>
            </li>
            <li className="px-4 py-2 cursor-pointer whitespace-nowrap ">
                <a className="flex flex-row gap-2 items-center hover:text-blue-400"><GiReturnArrow className="text-blue-400" />30 days online returns</a>
            </li>
            <li className="px-4 py-2 cursor-pointer whitespace-nowrap ">
                <a className="flex flex-row gap-2 items-center hover:text-blue-400"><MdOutlineSupportAgent className="text-blue-400" />Top notch support</a>
            </li>
            <li className="px-4 py-2 cursor-pointer whitespace-nowrap ">
                <a className="flex flex-row gap-2 items-center hover:text-blue-400"><BiSolidDiscount className="text-blue-400" />Low price guarantee</a>
            </li>
        </ul>
    );
}
