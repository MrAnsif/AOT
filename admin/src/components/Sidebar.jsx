import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
    const { aToken } = useContext(AdminContext);

    return (
        <div className="min-h-screen bg-white border-r shadow-md p-4 w-64">
            {aToken && (
                <ul className="space-y-2">
                    <NavLink
                        to={"/admin-dashboard"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? " border-[#0A48A8] border-r-4 bg-white" : "hover:bg-gray-100"
                            }`
                        }
                    >
                        <img src={assets.home_icon} alt="" className="w-6 h-6" />
                        <p className="font-medium">Dashboard</p>
                    </NavLink>
                    <NavLink
                        to={"/all-appointments"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? "border-[#0A48A8] border-r-4 bg-white" : "hover:bg-gray-100"
                            }`
                        }
                    >
                        <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
                        <p className="font-medium">Appointments</p>
                    </NavLink>
                    <NavLink
                        to={"/add-doctor"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? "border-[#0A48A8] border-r-4 bg-white" : "hover:bg-gray-100"
                            }`
                        }
                    >
                        <img src={assets.add_icon} alt="" className="w-6 h-6" />
                        <p className="font-medium">Add Doctor</p>
                    </NavLink>
                    <NavLink
                        to={"/doctor-list"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? "border-[#0A48A8] border-r-4 bg-white" : "hover:bg-gray-100"
                            }`
                        }
                    >
                        <img src={assets.people_icon} alt="" className="w-6 h-6" />
                        <p className="font-medium">Doctors List</p>
                    </NavLink>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;
