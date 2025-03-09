import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
    const { aToken } = useContext(AdminContext);
    const {dToken} = useContext(DoctorContext)

    return (
        <div className="min-h-screen border-r-2 border-r-zinc-300 fixed top-20 left-0 h-full">
            {
                aToken && (
                    <ul className="space-y-2">
                        <NavLink
                            to={"/admin-dashboard"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? " border-[#0A48A8] border-r-4" : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={assets.home_icon} alt="" className="w-6 h-6" />
                            <p className="font-medium">Dashboard</p>
                        </NavLink>
                        <NavLink
                            to={"/all-appointments"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 transition ${isActive ? "border-[#0A48A8] border-r-4 " : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
                            <p className="font-medium">Appointments</p>
                        </NavLink>
                        <NavLink
                            to={"/add-doctor"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 transition ${isActive ? "border-[#0A48A8] border-r-4 " : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={assets.add_icon} alt="" className="w-6 h-6" />
                            <p className="font-medium">Add Doctor</p>
                        </NavLink>
                        <NavLink
                            to={"/doctor-list"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 transition ${isActive ? "border-[#0A48A8] border-r-4 " : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={assets.people_icon} alt="" className="w-6 h-6" />
                            <p className="font-medium">Doctors List</p>
                        </NavLink>
                    </ul>
                )
            }
            {
                dToken && (
                    <ul className="space-y-2">
                        <NavLink
                            to={"/doctor-dashboard"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 transition ${isActive ? " border-[#0A48A8] border-r-4 " : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={assets.home_icon} alt="" className="w-6 h-6" />
                            <p className="font-medium">Dashboard</p>
                        </NavLink>
                        <NavLink
                            to={"/doctor-appointments"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 transition ${isActive ? "border-[#0A48A8] border-r-4 " : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
                            <p className="font-medium">Appointments</p>
                        </NavLink>
                        <NavLink
                            to={"/doctor-profile"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 transition ${isActive ? "border-[#0A48A8] border-r-4 " : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={assets.people_icon} alt="" className="w-6 h-6" />
                            <p className="font-medium">Profile</p>
                        </NavLink>
                    </ul>
                )
            }
        </div>
    );
};

export default Sidebar;
