import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
    const { aToken } = useContext(AdminContext);
    const {dToken} = useContext(DoctorContext)

    return (
        <div className="min-h-screen fixed top-20 left-0 h-full ">
            {
                aToken && (
                    <ul className="space-y-2">
                        <NavLink
                            to={"/admin-dashboard"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 transition ${isActive ? " border-[#0A48A8] border-l-4" : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={assets.home_icon} alt="" className="w-6 h-6" />
                            <p className="font-medium md:block hidden">Dashboard</p>
                        </NavLink>
                        <NavLink
                            to={"/all-appointments"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 transition ${isActive ? "border-[#0A48A8] border-l-4 " : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
                            <p className="font-medium md:block hidden">Appointments</p>
                        </NavLink>
                        <NavLink
                            to={"/add-doctor"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 transition ${isActive ? "border-[#0A48A8] border-l-4 " : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={assets.add_icon} alt="" className="w-6 h-6" />
                            <p className="font-medium md:block hidden">Add Doctor</p>
                        </NavLink>
                        <NavLink
                            to={"/doctor-list"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 transition ${isActive ? "border-[#0A48A8] border-l-4 " : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={assets.people_icon} alt="" className="w-6 h-6" />
                            <p className="font-medium md:block hidden">Doctors List</p>
                        </NavLink>
                    </ul>
                )
            }
            {
                dToken && (
                    <ul className="space-y-2 ">
                        <NavLink
                            to={"/doctor-dashboard"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 transition ${isActive ? " border-[#0A48A8] border-l-4 " : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={assets.home_icon} alt="" className="w-6 h-6" />
                            <p className="font-medium md:block hidden">Dashboard</p>
                        </NavLink>
                        <NavLink
                            to={"/doctor-appointments"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 transition ${isActive ? "border-[#0A48A8] border-l-4 " : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
                            <p className="font-medium md:block hidden">Appointments</p>
                        </NavLink>
                        <NavLink
                            to={"/doctor-profile"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 transition ${isActive ? "border-[#0A48A8] border-l-4 " : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={assets.people_icon} alt="" className="w-6 h-6" />
                            <p className="font-medium md:block hidden">Profile</p>
                        </NavLink>
                    </ul>
                )
            }
        </div>
    );
};

export default Sidebar;
