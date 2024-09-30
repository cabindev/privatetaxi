'use client';

import { FaUser, FaPhone, FaEnvelope, FaLine, FaWhatsapp, FaFacebook } from 'react-icons/fa';
import ContactItem from './ContactItem';

export default function ContactInfo() {
  const contactItems = [
    { icon: <FaUser />, title: "Name", value: "Mr.Noom" },
    { 
      icon: <FaPhone />, 
      title: "Phone", 
      value: [
        { number: "092-269-1269", link: "tel:+66922691269" },
        { number: "098-491-4699", link: "tel:+66984914699", isBackup: true }
      ]
    },
    { icon: <FaEnvelope />, title: "Email", value: "nbnoom@gmail.com" },
    { 
      icon: <FaLine />, 
      title: "Line", 
      value: "ID : 092-2691269",
      link: "https://line.me/R/ti/p/~092-2691269"
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      value: "092-269-1269",
      link: "https://wa.me/66922691269?text=สวัสดี%20ฉันสนใจบริการของคุณ"
    },
    {
      icon: <FaFacebook />,
      title: "Facebook",
      value: "My Facebook Page",
      link: "https://www.facebook.com/share/1qFU1fir97eVSg8i/?mibextid=qi2Omg"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-100 to-indigo-500 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
          {contactItems.map((item, index) => (
            <ContactItem 
              key={index}
              icon={item.icon}
              title={item.title}
              value={item.value}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}