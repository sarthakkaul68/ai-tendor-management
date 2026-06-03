import React from "react";
import { useNavigate } from "react-router-dom";
import {

  Brain,
 
} from "lucide-react";

const Pricing = () => {
      const navigate = useNavigate();
    
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

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
              <button className="text-gray-700 hover:text-gray-900" onClick={() => navigate("/Pricing")}>Pricing</button>
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
            <button className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700" onClick={() => navigate("/Pricing")}>
              Get started
            </button>
          </div>
        </div>
      </header>


      <section className="bg-blue-900 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Pricing Plans</h1>
        <p className="text-blue-100 text-lg max-w-3xl mx-auto">
          Flexible plans designed for every organization — from startups to enterprises.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        {[
          {
            name: "Starter",
            price: "₹999 /mo",
            features: ["Up to 10 users", "Basic AI tools", "Email support"],
          },
          {
            name: "Professional",
            price: "₹2,999 /mo",
            features: ["Unlimited users", "Advanced AI tools", "Priority support"],
          },
          {
            name: "Enterprise",
            price: "Custom",
            features: ["Custom integrations", "Dedicated manager", "Enterprise security"],
          },
        ].map((plan, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition border border-gray-100 text-center"
          >
            <h3 className="text-2xl font-bold text-blue-700 mb-3">{plan.name}</h3>
            <p className="text-3xl font-bold mb-6">{plan.price}</p>
            <ul className="space-y-3 text-gray-600 mb-6">
              {plan.features.map((f, j) => (
                <li key={j}>✔️ {f}</li>
              ))}
            </ul>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Choose Plan
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Pricing;
