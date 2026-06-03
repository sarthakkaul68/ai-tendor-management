import React, { useState, useEffect } from "react";
import { Eye, EyeOff, LogIn, User, Lock, Brain, Cpu, Network, Sparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from '../../assets/logo/redian.png';
const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaQuestion, setCaptchaQuestion] = useState({ num1: 0, num2: 0 });
  const [error, setError] = useState("");


  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
 // Generate random math question
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaQuestion({ num1, num2 });
  }, []);



    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsLoading(true);
          setError("");

    // Verify CAPTCHA
    const correctAnswer = captchaQuestion.num1 + captchaQuestion.num2;
    if (parseInt(captchaAnswer) !== correctAnswer) {
      alert("Incorrect CAPTCHA answer. Please try again.");
      // Generate new CAPTCHA question
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      setCaptchaQuestion({ num1, num2 });
      setCaptchaAnswer("");
       setError("Captcha answer incorrect!");
    setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      // console.log("Sign In with:", { username, password });
      const apiUrl = import.meta.env.VITE_API_URL;
            
      //  const response = await axios.post("http://localhost:5000/api/auth/login", {
       const response = await axios.post(`${apiUrl}/api/auth/login`, {
      username,
      password,
    });

    
      if (response.data.success) {

         console.log("✅ Login successful:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      // Reset CAPTCHA
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      setCaptchaQuestion({ num1, num2 });
      setCaptchaAnswer("");
      
      navigate("/dashboard");
      }
      else {
      setError(response.data.message || "Invalid credentials");
    }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 relative overflow-hidden p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)", animation: "pulse 10s ease-in-out infinite" }} />
        </div>
        {particles.map((particle) => (
          <div key={particle.id} className="absolute rounded-full bg-blue-400/30" style={{ left: `${particle.x}%`, top: `${particle.y}%`, width: `${particle.size}px`, height: `${particle.size}px`, animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite` }} />
        ))}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <line key={i} x1={`${(i * 12.5)}%`} y1="0%" x2={`${(i * 12.5 + 50) % 100}%`} y2="100%" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.3" />
          ))}
        </svg>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" style={{ animation: "glow 5s ease-in-out infinite" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" style={{ animation: "glow 7s ease-in-out infinite 1s" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" style={{ maskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)" }} />
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0) translateX(0); opacity: 0; } 50% { transform: translateY(-100px); opacity: 1; } }
        @keyframes glow { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.2); opacity: 0.6; } }
        @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="hidden lg:block space-y-8 text-white">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              {/* <div className="relative w-20 h-20">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center" style={{ boxShadow: "0 0 30px rgba(99, 102, 241, 0.6)", animation: "glow 2s ease-in-out infinite" }}>
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0" style={{ animation: "orbit 8s linear infinite" }}>
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full -translate-x-1/2"></div>
                </div>
              </div> */}
              <div>
                {/* <img className="  drop-shadow-[0_1px_2px_rgba(247,237,237)]" src={logo} alt="Reidan logo" /> */}
                {/* <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Redian AI</h1>
                <p className="text-lg text-gray-300 mt-1 flex items-center gap-2"><Sparkles className="w-4 h-4 text-yellow-400" />Neural Document Intelligence</p> */}
              </div>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">Experience next-generation document management powered by advanced AI neural networks and machine learning algorithms.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: Brain, text: "Neural Network Processing", color: "from-blue-400 to-cyan-400" },
              { icon: Cpu, text: "Real-time AI Analysis", color: "from-purple-400 to-pink-400" },
              { icon: Network, text: "Distributed AI Architecture", color: "from-indigo-400 to-blue-400" },
            ].map((feature, index) => (
              <div key={feature.text} className="relative group" style={{ animation: `slideIn 0.5s ease-out ${0.8 + index * 0.1}s both` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative flex items-center space-x-4 p-4 rounded-xl bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.color}`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-200 font-medium">{feature.text}</span>
                  <div className="ml-auto"><Zap className="w-4 h-4 text-yellow-400" /></div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-700/50">
            {[
              { value: "99.8%", label: "AI Accuracy", gradient: "from-green-400 to-emerald-400" },
              { value: "<10ms", label: "Response Time", gradient: "from-blue-400 to-cyan-400" },
              { value: "50B+", label: "Tokens Processed", gradient: "from-purple-400 to-pink-400" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center relative group">
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>{stat.value}</div>
                <div className="text-xs text-gray-400 mt-2">{stat.label}</div>
                <div className={`h-1 mt-2 bg-gradient-to-r ${stat.gradient} rounded-full`} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md">
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg flex items-center justify-center">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Redian</h1>
                  <p className="text-gray-400 text-sm">Neural Intelligence</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-75" style={{ animation: "pulse 2s ease-in-out infinite" }} />
              
              <div className="relative bg-gray-900/80 backdrop-blur-2xl rounded-3xl border border-gray-700/50 shadow-2xl p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">Sign In</h2>
                  <p className="text-gray-400 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full" style={{ animation: "pulse 1s ease-in-out infinite" }}></span>
                    AI System Online
                  </p>
                </div>
                              
                <div onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">User Identifier</label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-md group-focus-within:blur-lg transition-all"></div>
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400 z-10" />
                      <input id="username" type="text" placeholder="Enter neural ID or email" value={username} onChange={(e) => setUsername(e.target.value)} required className="relative w-full pl-12 pr-4 py-3.5 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Security Key</label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-md group-focus-within:blur-lg transition-all"></div>
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400 z-10" />
                      <input id="password" type={showPassword ? "text" : "password"} placeholder="Enter encryption key" value={password} onChange={(e) => setPassword(e.target.value)} required className="relative w-full pl-12 pr-12 py-3.5 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors z-10">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="captcha" className="block text-sm font-medium text-gray-300 mb-2">Verify You're Not a Robot</label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-md group-focus-within:blur-lg transition-all"></div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-300 w-6xs">{`${captchaQuestion.num1} + ${captchaQuestion.num2} = ?`}</span>
                        <input
                          id="captcha"
                          type="number"
                          placeholder="Enter answer"
                          value={captchaAnswer}
                          onChange={(e) => setCaptchaAnswer(e.target.value)}
                          required
                          className="relative w-full pl-4 pr-4 py-3.5 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center text-gray-400 cursor-pointer group">
                      <input type="checkbox" className="rounded bg-gray-800/50 border-gray-700/50 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                      <span className="ml-2 group-hover:text-gray-300 transition-colors">Cache Credentials</span>
                    </label>
                    <a href="#" className="text-blue-400 hover:text-purple-400 transition-colors">Reset Neural Key?</a>
                  </div>

                  <div>
                    <button type="button" onClick={handleSubmit} disabled={isLoading} className="relative w-full group overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ animation: "shimmer 2s linear infinite" }} />
                      <div className="relative py-3.5 px-4 flex items-center justify-center space-x-2 text-white font-semibold">
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" style={{ animation: "orbit 1s linear infinite" }} />
                            <span>Authenticating...</span>
                          </>
                        ) : (
                          <>
                            <LogIn className="w-5 h-5" />
                            <span>Login</span>
                            <Sparkles className="w-4 h-4" />
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                <div className="text-center text-xs text-gray-500 mt-6 pt-6 border-t border-gray-700/50">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full" style={{ animation: "pulse 1s ease-in-out infinite" }}></span>
                    <span>Neural Network Active</span>
                    <span className="w-2 h-2 bg-purple-400 rounded-full" style={{ animation: "pulse 1s ease-in-out infinite 0.5s" }}></span>
                  </div>
                  © {new Date().getFullYear()} Redian Platform. Powered by Neural Intelligence.
                  <div className="mt-1 text-[10px] text-gray-600">Quantum Encrypted • AI Protected • Neural Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;