import Link from "next/link"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-[#FDF8EB]   border-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-[#482817]  mb-4 text-sm md:text-base ">CONTACT US</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="">
                <span className="font-semibold text-[#482817]  mb-4 text-sm ">Address:</span>
                <p className="font-normal text-[#968F8F]  mb-4 text-sm">26 Wyle Cop, Shrewsbury, Shropshire, SY1 1XD</p>
              </div>
              <div>
                <span className="font-semibold text-[#482817]  mb-4 text-sm">Tel:</span>
                <p className="font-normal text-[#968F8F]  mb-4 text-sm">01743 234500</p>
              </div>
              <div>
                <span className="font-semibold text-[#482817]  mb-4 text-sm">Email:</span>
                <p className="font-normal text-[#968F8F]  mb-4 text-sm">support&kowine.com</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              <Link
                href="#"
                className="flex items-center justify-center w-10 h-10 "
                aria-label="LinkedIn"
              >
    <FaFacebook  size={40}/>
              </Link>
              <Link
                href="#"
                className="flex items-center justify-center w-10 h-10 "
                aria-label="Instagram"
              >
        <FaInstagram size={40} />
              </Link>
              <Link
                href="#"
                className="flex items-center justify-center w-10 h-10 "
                aria-label="Facebook"
              >
           <FaLinkedin size={40} />
              </Link>
              {/* <Link
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 transition"
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.223-.937 1.58-6.685 1.58-6.685s-.4-.8-.4-1.982c0-1.858 1.08-3.246 2.423-3.246 1.146 0 1.699.86 1.699 1.888 0 1.151-.732 2.87-.744 4.462-.013 1.543 1.066 2.8 3.021 2.8 3.632 0 6.433-3.833 6.433-9.339 0-4.864-3.515-8.334-8.533-8.334-5.82 0-9.253 4.358-9.253 8.86 0 1.758.664 3.639 1.976 4.28.173.081.335 0 .344-.176l.622-2.54c.043-.174-.01-.336-.145-.437-1.08-.743-1.763-1.942-1.763-3.112 0-3.662 2.769-6.99 7.429-6.99 3.953 0 7.001 2.799 7.001 6.594 0 4.333-2.67 7.806-6.391 7.806-1.253 0-2.433-.65-2.835-1.418l-.773 2.616c-.277.945-.996 2.129-1.488 2.85.934.285 1.922.437 2.961.437 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </Link> */}
            </div>
          </div>

          {/* Customer Services */}
          <div>
            <h3 className="font-semibold text-[#482817]  mb-4 text-sm md:text-base ">CUSTOMER SERVICES</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900 transition font-normal text-[#968F8F]  mb-4 text-sm">
                  Contact & FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition font-normal text-[#968F8F]  mb-4 text-sm">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition font-normal text-[#968F8F]  mb-4 text-sm">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition font-normal text-[#968F8F]  mb-4 text-sm">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition font-normal text-[#968F8F]  mb-4 text-sm">
                  Interest Free Finance
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-semibold text-[#482817]  mb-4 text-sm md:text-base ">ABOUT US</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900 transition font-normal text-[#968F8F]  mb-4 text-sm">
                  Our story
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition font-normal text-[#968F8F]  mb-4 text-sm">
                  Customer Review
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition font-normal text-[#968F8F]  mb-4 text-sm">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition font-normal text-[#968F8F]  mb-4 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition font-normal text-[#968F8F]  mb-4 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Discover More */}
          <div>
            <h3 className="font-semibold text-[#482817]  mb-4 text-sm md:text-base ">DISCOVER MORE</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900 transition font-normal text-[#968F8F]  mb-4 text-sm">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition font-normal text-[#968F8F]  mb-4 text-sm">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition font-normal text-[#968F8F]  mb-4 text-sm">
                  Pinterest
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 transition font-normal text-[#968F8F]  mb-4 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t-2 border-[#968F8F] bg-[#FDF8EB] py-4">
        <div className= "max-w-7xl mx-auto px-6 ">
          <p className=" font-normal text-[#968F8F]  mb-4 text-sm">Copyright © 2025 Ops Wine.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
