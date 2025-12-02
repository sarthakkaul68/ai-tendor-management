import React from "react";
import {

  Brain,
 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const WhyDocuTender = () => {
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
            <button className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700" > {/*onClick={() => navigate("/Pricing")}*/}
              Get started
            </button>
          </div>
        </div>
      </header>


      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Why Choose DocuTender</h1>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">
            Discover how DocuTender transforms tender management with AI, automation, and secure document handling.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        {[
          {
            title: "AI-Powered Insights",
            desc: "Use intelligent algorithms to classify, detect, and analyze tender documents in seconds.",
          },
          {
            title: "Compliance & Security",
            desc: "Built-in compliance features help your organization meet GDPR, HIPAA, and other regulations effortlessly.",
          },
          {
            title: "Collaboration Simplified",
            desc: "Share, review, and approve tenders in one secure space, reducing delays and human errors.",
          },
        ].map((item, i) => (
          <div key={i} className="bg-white shadow-lg rounded-xl p-8 border border-gray-100 hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold mb-4 text-blue-700">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default WhyDocuTender;
