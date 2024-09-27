'use client';

import { FaUser, FaPhone, FaEnvelope, FaLine, FaWhatsapp } from 'react-icons/fa';

type ContactItemProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  link?: string;
};

export default function ContactItem({ icon, title, value, link }: ContactItemProps) {
  const handleClick = () => {
    if (link) {
      if (title === "Phone") {
        window.location.href = link;  // This will initiate a call without opening a new tab
      } else {
        window.open(link, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
      <div className="text-3xl text-blue-500 mb-4">
        {link ? (
          <button 
            onClick={handleClick} 
            className="focus:outline-none hover:text-blue-600 transition-colors duration-300"
          >
            {icon}
          </button>
        ) : (
          icon
        )}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-700">{title}</h3>
      <p className="text-gray-600">{value}</p>
    </div>
  );
}