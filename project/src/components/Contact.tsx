import React from "react";
import { useNavigate } from "react-router-dom";
import {

  Brain,
 
} from "lucide-react";

const Contact = () => {
    const navigate = useNavigate();
    
  return (
    <div className="min-h-screen bg-white text-gray-900">


    <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {/* <Brain className="text-blue-600" size={28} /> */}
            <button className="text-blue-600 font-bold text-2xl" onClick={() => navigate("/")}>DocuTender</button>
            <nav className="hidden md:flex space-x-6 text-sm">
              {/* <button className="text-gray-700 hover:text-gray-900">Products</button>
              <button className="text-gray-700 hover:text-gray-900">Solutions</button>
              <button className="text-gray-700 hover:text-gray-900">Resources</button>
              <button className="text-gray-700 hover:text-gray-900">Developers</button> */}
              <button className="text-gray-700 hover:text-gray-900"   onClick={() => navigate("/WhyDocuTender")}>Why DocuTender</button>
              {/* <button className="text-gray-700 hover:text-gray-900" onClick={() => navigate("/Pricing")}>Pricing</button> */}
              <button className="text-gray-700 hover:text-gray-900" onClick={() => navigate("/Contact")}>Contact</button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-blue-600 text-sm font-medium hover:bg-blue-50 rounded"
            >
            Log in
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700" >   {/*onClick={() => navigate("/Pricing")}*/}
              Get started
            </button>
          </div>
        </div>
      </header>


      <section className="bg-blue-900 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-blue-100 text-lg max-w-3xl mx-auto">
          Have questions or need help? Our team is here for you.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <form className="bg-white rounded-xl shadow-lg p-10 space-y-6 border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
