'use client';

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

type PhoneNumber = {
  number: string;
  link: string;
  isBackup?: boolean;
};

type ContactItemProps = {
  icon: React.ReactNode;
  title: string;
  value: string | PhoneNumber[];
  link?: string;
};

export default function ContactItem({ icon, title, value, link }: ContactItemProps) {
  const [showBackup, setShowBackup] = useState(false);

  const handleClick = (clickLink: string) => {
    if (clickLink) {
      if (title === "Phone") {
        window.location.href = clickLink;
      } else {
        window.open(clickLink, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center transform hover:-translate-y-1">
      <div className="text-3xl mb-4">
        <div className={`${getIconColor(title)}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-700">{title}</h3>
      {Array.isArray(value) ? (
        <>
          <button
            onClick={() => handleClick(value[0].link)}
            className="text-gray-600 hover:underline focus:outline-none"
          >
            {value[0].number}
          </button>
          {value.length > 1 && (
            <div className="mt-2">
              <button
                onClick={() => setShowBackup(!showBackup)}
                className="text-sm text-blue-500 hover:underline focus:outline-none flex items-center"
              >
                {showBackup ? 'Hide' : 'Show'} backup number
                <FaChevronDown className={`ml-1 transform ${showBackup ? 'rotate-180' : ''}`} />
              </button>
              {showBackup && (
                <button
                  onClick={() => handleClick(value[1].link)}
                  className="mt-1 text-gray-600 hover:underline focus:outline-none"
                >
                  {value[1].number}
                </button>
              )}
            </div>
          )}
        </>
      ) : link ? (
        <button 
          onClick={() => handleClick(link)}
          className="text-gray-600 hover:underline focus:outline-none"
        >
          {value}
        </button>
      ) : (
        <p className="text-gray-600">{value}</p>
      )}
    </div>
  );
}

function getIconColor(title: string): string {
  switch (title) {
    case "Phone":
      return "text-green-500 hover:text-green-600";
    case "Email":
      return "text-red-500 hover:text-red-600";
    case "Line":
      return "text-green-400 hover:text-green-500";
    case "WhatsApp":
      return "text-green-600 hover:text-green-700";
    case "Facebook":
      return "text-blue-600 hover:text-blue-700";
    default:
      return "text-blue-500 hover:text-blue-600";
  }
}