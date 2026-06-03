import React from "react";
import {
  FileText,
  Zap,
  Users,
  CheckCircle,
  Check,
  ChevronDown,
  Settings,
  Upload,
  Search,
  Folder,
  Lock,
  Brain,
  Shield,
  BarChart3,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              {/* <Brain className="text-blue-600" size={28} /> */}
              <span className="text-blue-600 font-bold text-2xl">DocuTender</span>
            </div>
            <nav className="hidden md:flex space-x-6 text-sm">
              <button className="text-gray-700 hover:text-gray-900 font-medium" onClick={() => navigate("/WhyDocuTender")}>
                Why DocuTender
              </button>
              {/* <button className="text-gray-700 hover:text-gray-900 font-medium" onClick={() => navigate("/Pricing")}>
                Pricing
              </button> */}
              <button className="text-gray-700 hover:text-gray-900 font-medium" onClick={() => navigate("/Contact")}>
                Contact
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-blue-600 text-sm font-medium hover:bg-blue-50 rounded-lg transition-colors"
            >
              Log in
            </button>
            <button 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
              
            >  {/*onClick={() => navigate("/Pricing")}*/}
              Get started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-800/30 px-4 py-2 rounded-full mb-6 border border-blue-700/50">
              <Zap size={16} className="text-blue-300" />
              <span className="text-blue-200 text-sm font-medium">AI-Powered Tender Management</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Intelligent Tender Management <br />
              <span className="text-blue-300">Powered by AI</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Transform your tender processes with AI-driven content organization, automated governance, and intelligent archiving—all in one secure platform.
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 font-medium transition-colors shadow-lg">
                Start Free Trial
              </button>
              <button className="bg-white/10 text-white px-8 py-4 rounded-lg hover:bg-white/20 font-medium transition-colors backdrop-blur-sm">
                Schedule Demo
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Folder className="text-blue-600" size={24} />
                  <span className="text-gray-900 font-semibold">Active Tenders</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Search size={18} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Settings size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileText size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Tender Document {i}</div>
                        <div className="text-xs text-gray-500">Updated 2h ago • AI Reviewed</div>
                      </div>
                    </div>
                    <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Management Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI-Driven Content Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our advanced AI algorithms transform how you manage, classify, and secure tender documents with unprecedented accuracy and efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl overflow-hidden border border-blue-100">
                <div className="p-8">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-gray-900">98%</span>
                        <div className="text-green-500 text-sm font-medium">↑ 15%</div>
                      </div>
                      <div className="text-xs text-gray-600 font-medium">Accuracy Rate</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-gray-900">4.2x</span>
                        <div className="text-blue-500 text-sm font-medium">↑ 42%</div>
                      </div>
                      <div className="text-xs text-gray-600 font-medium">Faster Processing</div>
                    </div>
                  </div>
                  <div className="bg-blue-600 text-white p-4 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain size={20} />
                      <span className="font-semibold">AI Insights Generated</span>
                    </div>
                    <p className="text-sm text-blue-100">5 critical documents flagged for immediate review</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-green-500 text-white p-4 rounded-full shadow-lg">
                <CheckCircle size={28} />
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900">
                Intelligent Document Processing
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our AI engine automatically classifies, extracts, and analyzes tender documents with human-level accuracy. Machine learning models continuously improve based on your organizational patterns and compliance requirements.
              </p>
              <div className="space-y-4 mb-6">
                {['Automated classification & tagging', 'Smart content extraction', 'Compliance risk detection', 'Predictive analytics'].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center transition-colors">
                Explore AI Capabilities →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-4xl font-bold mb-6 text-gray-900">
              Advanced Search & Discovery
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Semantic search powered by natural language processing understands context and intent, delivering precise results across millions of documents in milliseconds.
            </p>
            <div className="space-y-4 mb-6">
              {['Natural language queries', 'Semantic similarity matching', 'Cross-document references', 'Smart recommendations'].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Target className="text-blue-500" size={20} />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center transition-colors">
              Discover Smart Search →
            </button>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-semibold text-gray-900 text-lg">AI Search Results</h4>
                <div className="relative">
                  <Search size={20} className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search tenders..." 
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Q4 Financial Report.pdf', confidence: 95, tags: ['Financial', 'Quarterly'] },
                  { name: 'Marketing Strategy 2025.docx', confidence: 88, tags: ['Marketing', 'Strategy'] },
                  { name: 'Budget Allocation 2025.xlsx', confidence: 92, tags: ['Financial', 'Planning'] },
                  { name: 'Client Presentation.pptx', confidence: 85, tags: ['Sales', 'Presentation'] }
                ].map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-blue-50 rounded-xl transition-colors border border-gray-100">
                    <div className="flex items-center space-x-4">
                      <FileText className="text-blue-600" size={24} />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{file.name}</div>
                        <div className="flex space-x-2 mt-1">
                          {file.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">{file.confidence}%</div>
                      <div className="text-xs text-gray-500">Confidence</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tender Lifecycle Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: FileText, label: 'Create & Draft', desc: 'AI-assisted document creation' },
              { icon: Upload, label: 'Upload & Process', desc: 'Automated classification' },
              { icon: Users, label: 'Collaborate & Review', desc: 'Smart workflow routing' },
              { icon: Lock, label: 'Secure & Archive', desc: 'Compliant retention' }
            ].map((item, i) => {
              const IconComponent = item.icon;
              return (
                <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                  <div className="flex justify-center mb-4 text-blue-300">
                    <IconComponent size={32} />
                  </div>
                  <div className="font-semibold mb-2">{item.label}</div>
                  <div className="text-sm text-blue-200">{item.desc}</div>
                </div>
              );
            })}
            <div className="col-span-2 bg-blue-800 rounded-xl p-6 flex items-center justify-center space-x-4 border border-blue-700">
              <Brain className="text-blue-300" size={32} />
              <div className="text-center">
                <div className="font-semibold text-lg">AI-Optimized Workflow</div>
                <div className="text-blue-200 text-sm">Continuous learning and improvement</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-4xl font-bold mb-6">
              End-to-End AI Workflow Automation
            </h3>
            <p className="text-blue-100 leading-relaxed mb-6">
              From initial tender creation to final archival, our AI orchestrates every step of the process. Intelligent routing, automated compliance checks, and predictive analytics ensure optimal efficiency and risk mitigation throughout the document lifecycle.
            </p>
            <div className="space-y-4 mb-6">
              {['Automated workflow routing', 'Real-time compliance monitoring', 'Predictive deadline management', 'Smart version control'].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="text-green-400" size={20} />
                  <span className="text-blue-100 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            <button className="text-blue-300 hover:text-white font-semibold flex items-center transition-colors">
              Explore Workflow Automation →
            </button>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-4xl font-bold mb-6 text-gray-900">
              AI-Enhanced Compliance & Security
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our compliance engine uses AI to automatically detect and classify sensitive information, enforce retention policies, and ensure adherence to global regulations including GDPR, HIPAA, SOC 2, and ISO 27001.
            </p>
            <div className="space-y-4 mb-6">
              {['Automated sensitive data detection', 'Real-time compliance monitoring', 'Global regulatory updates', 'Audit trail generation'].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Shield className="text-green-500" size={20} />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center transition-colors">
              View Compliance Features →
            </button>
          </div>
          <div className="relative">
            <div className="grid grid-cols-3 gap-4">
              {[
                { flag: '🇺🇸', label: 'GDPR', compliance: '98%' },
                { flag: '🇪🇺', label: 'HIPAA', compliance: '99%' },
                { flag: '🌐', label: 'SOC 2', compliance: '100%' },
                { flag: '🇬🇧', label: 'ISO 27001', compliance: '97%' },
                { flag: '🇦🇺', label: 'PCI DSS', compliance: '96%' },
                { flag: '🇨', label: 'PIPEDA', compliance: '98%' }
              ].map((regulation, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform shadow-lg">
                  <div className="text-3xl mb-2">{regulation.flag}</div>
                  <div className="font-semibold mb-1">{regulation.label}</div>
                  <div className="text-blue-200 text-sm">Compliance</div>
                  <div className="text-2xl font-bold mt-2">{regulation.compliance}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Tender Management?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of organizations using DocuTender's AI-powered platform to streamline their tender processes and ensure compliance.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 font-semibold transition-colors shadow-lg">
              Start Free Trial
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 font-semibold transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors">Features</button></li>
                <li><button className="hover:text-white transition-colors">AI Capabilities</button></li>
                <li><button className="hover:text-white transition-colors">Security</button></li>
                <li><button className="hover:text-white transition-colors">Pricing</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors">Enterprise</button></li>
                <li><button className="hover:text-white transition-colors">Government</button></li>
                <li><button className="hover:text-white transition-colors">Healthcare</button></li>
                <li><button className="hover:text-white transition-colors">Legal</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors">Documentation</button></li>
                <li><button className="hover:text-white transition-colors">API Reference</button></li>
                <li><button className="hover:text-white transition-colors">Blog</button></li>
                <li><button className="hover:text-white transition-colors">Case Studies</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors">About</button></li>
                <li><button className="hover:text-white transition-colors">Careers</button></li>
                <li><button className="hover:text-white transition-colors">Contact</button></li>
                <li><button className="hover:text-white transition-colors">Partners</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors">Help Center</button></li>
                <li><button className="hover:text-white transition-colors">Status</button></li>
                <li><button className="hover:text-white transition-colors">Contact Support</button></li>
                <li><button className="hover:text-white transition-colors">Training</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="text-blue-400" size={20} />
              <span>© 2025 DocuTender, Inc. All rights reserved</span>
            </div>
            <div className="flex space-x-6">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
              <button className="hover:text-white transition-colors">Cookie Settings</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;