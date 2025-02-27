import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const EmergencyCallButton = () => {
  const [hospital, setHospital] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const apiKey = import.meta.env.GOMAP_APIKEY // Replace with your API key
  const dropdownRef = useRef(null);

  // Auto-close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 100);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && hospital?.phone) {
      window.location.href = `tel:${hospital.phone}`; // Auto call
      // window.location.href = `intent://dial/${hospital.phone}#Intent;scheme=tel;package=com.android.server.telecom;end;`;

    }
  }, [countdown, hospital]);

  const fetchNearestHospital = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const nearbyResponse = await axios.get(
            `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&key=${apiKey}`
          );

          if (!nearbyResponse.data.results || nearbyResponse.data.results.length === 0) {
            alert("No hospitals found nearby.");
            return;
          }

          const firstHospital = nearbyResponse.data.results[0];

          const detailsResponse = await axios.get(
            `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${firstHospital.place_id}&fields=name,vicinity,formatted_phone_number&key=${apiKey}`
          );

          const hospitalDetails = detailsResponse.data.result;

          if (!hospitalDetails.formatted_phone_number) {
            alert("No contact number available.");
            return;
          }

          setHospital({
            name: hospitalDetails.name,
            phone: hospitalDetails.formatted_phone_number,
          });

          setDropdownVisible(true); // Show dropdown
          setCountdown(3); // Start countdown
        } catch (error) {
          console.error("Error fetching hospital details:", error);
          alert("Failed to get hospital details.");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Failed to get location.");
      }
    );
  };

  return (
    <div className="relative  right-4 z-50">
      {/* Emergency Button */}
      <button
        onClick={fetchNearestHospital}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold tracking-tight py-2 px-2 rounded-lg shadow-lg transition duration-300"
      >
        {countdown > 0 ? `Calling in ${countdown}...` : "Emergency Call"}
      </button>

      {/* Dropdown (visible when hospital data is available) */}
      {dropdownVisible && hospital && (
        <div ref={dropdownRef} className="absolute mt-2 w-64 bg-[#cccccc83] backdrop-blur-md border border-gray-300 rounded-lg shadow-md p-4 right-0 ">
          <p className="text-lg font-semibold">{hospital.name}</p>
          <p className="text-sm text-gray-700">{hospital.phone}</p>
          <a
            href={`tel:${hospital.phone}`}
            className="block mt-2 bg-blue-500 hover:bg-blue-600 text-white text-center py-1 rounded-md transition duration-300"
          >
            Call Now
          </a>
        </div>
      )}
    </div>
  );
};

export default EmergencyCallButton;
