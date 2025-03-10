import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { Calendar, Clock, FileText, User, X } from 'lucide-react';
import { AppContext } from '../../context/AppContext';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);

  // State for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState([]);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  // Open Modal with Selected Medical History
  const openModal = (history) => {
    setSelectedHistory(history);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">All Appointments</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-7 gap-4 p-4 bg-gray-100 text-sm font-medium text-gray-700 border-b">
            <div className="flex items-center">#</div>
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              Patient
            </div>
            <div className="flex items-center">Age</div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              Date & Time
            </div>
            <div className="flex items-center">Fees</div>
            <div className="flex items-center">
              <FileText size={16} className="mr-2" />
              Medical History
            </div>
            <div className="flex items-center">Type</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {appointments.map((item, index) => (
              <div key={index} className="md:grid md:grid-cols-7 gap-4 p-4 hover:bg-gray-50 transition-colors">
                <div className="hidden md:flex items-center text-gray-600">{index + 1}</div>

                {/* Patient info */}
                <div className="flex items-center font-medium text-gray-900 mb-2 md:mb-0">
                  <img
                    src={item.userData.image}
                    alt={item.userData.name}
                    className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200"
                  />
                  <div>
                    <p>{item.userData.name}</p>
                    <p className="text-sm text-gray-500 md:hidden">Age: {calculateAge(item.userData.dob)}</p>
                  </div>
                </div>

                {/* Age */}
                <div className="hidden md:flex items-center text-gray-600">
                  {calculateAge(item.userData.dob)}
                </div>

                {/* Date & Time */}
                <div className="flex md:block mb-2 md:mb-0">
                  <div className="flex items-start md:items-center mr-4 md:mr-0">
                    <Calendar size={14} className="mr-2 text-gray-400 mt-1 md:mt-0" />
                    <span className="text-gray-600">{slotDateFormat(item.slotDate)}</span>
                  </div>
                  <div className="flex items-start md:items-center mt-0 md:mt-1 text-sm text-gray-500">
                    <Clock size={14} className="mr-2 text-gray-400 mt-1 md:mt-0" />
                    <span>{item.slotTime}</span>
                  </div>
                </div>

                {/* Fees */}
                <div className="flex items-center font-medium text-green-600 mb-2 md:mb-0">
                  ₹{item.amount}
                </div>

                {/* Medical History */}
                <div className="text-gray-600 mb-3 md:mb-0">
                  <p className="font-medium text-sm mb-2">Medical History:</p>
                  <ul className="space-y-1 text-sm">
                    {item.userData?.medicalHistory?.length > 0 ? (
                      item.userData.medicalHistory.slice(0, 2).map((history, i) => (
                        <li key={i} className="flex items-start">
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-1.5 mr-2 flex-shrink-0"></span>
                          <span className="line-clamp-1">
                            {history.condition}
                            <span className="text-gray-400 ml-1">
                              - {new Date(history.diagnosisDate).toLocaleDateString()}
                            </span>
                          </span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400 italic">No history available</li>
                    )}
                    {item.userData?.medicalHistory?.length > 2 && (
                      <li
                        className="text-blue-500 text-xs cursor-pointer hover:underline"
                        onClick={() => openModal(item.userData.medicalHistory)}
                      >
                        + {item.userData.medicalHistory.length - 2} more
                      </li>
                    )}
                  </ul>
                </div>

                <p>{item.homeConsultancy ? '🏡 Home Visit' : '🏥 Clinic Visit'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Medical History Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-[#11111123] bg-opacity-50 transition-opacity duration-300 ease-in-out"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-5 rounded-lg shadow-lg w-96 transform transition-all duration-300 ease-in-out scale-100 opacity-100 animate-modal"
            onClick={e => e.stopPropagation()}
            style={{
              animation: 'modal-pop 0.3s ease-out forwards'
            }}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Medical History</h2>
              <X
                className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <ul className="space-y-2 mt-3">
              {selectedHistory.map((history, i) => (
                <li key={i} className="border-b-zinc-300 border-b pb-2">
                  <span className="font-medium">{history.condition}</span>
                  <span className="text-gray-400 ml-1">
                    - {new Date(history.diagnosisDate).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-[#163d77] text-white rounded-md w-full hover:bg-[#122f5c] transition-colors duration-200"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modal-pop {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DoctorAppointments;