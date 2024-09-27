import { FaFacebook, FaLine, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer bg-gradient-to-r from-blue-100 to-indigo-200 text-base-content p-10">
      <nav>
        <h6 className="footer-title">Our Services</h6>
        <a className="link link-hover">Airport Transfer</a>
        <a className="link link-hover">City Tour</a>
        <a className="link link-hover">Long Distance Travel</a>
        <a className="link link-hover">Corporate Service</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Book Now</a>
        <a className="link link-hover">Pricing</a>
      </nav>
      <nav>
        <h6 className="footer-title">Contact</h6>
        <a className="link link-hover">Phone: 092-269-1269</a>
        <a className="link link-hover">Email: contact@privatetaxi.com</a>
        <a className="link link-hover">Line: @privatetaxi</a>
        <a className="link link-hover">Address: Pattaya, Thailand</a>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="fill-current w-6 h-6" />
          </a>
          <a href="https://line.me/R/ti/p/~092-2691269" target="_blank" rel="noopener noreferrer">
            <FaLine className="fill-current w-6 h-6" />
          </a>
          <a href="https://wa.me/66922691269?text=สวัสดี%20ฉันสนใจบริการของคุณ" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="fill-current w-6 h-6" />
          </a>
        </div>
      </nav>
    </footer>
  );
}