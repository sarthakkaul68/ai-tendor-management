import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import Signin from "./components/signin";
import Dashboard from "./components/Dashboard/Dashboard";
import Users from "./components/Projects/Users";
import Setting from "./components/Projects/Setting.tsx";
import ProjectList from "./components/Projects/ProjectList";
import CreateProject from "./components/Projects/CreateProject";
import UploadDocument from "./components/Projects/UploadDocument";
import ReportView from "./components/Projects/ReportView";
import Reports from "./components/Projects/Reports.tsx";
import Timeline from "./components/Projects/Timeline.tsx";
import Documents from "./components/Projects/Documents.tsx";
import LandingPage from "./components/LandingPage.tsx";
import WhyDocuTender from "./components/WhyDocuTender";
import Pricing from "./components/Pricingt.tsx";
import Contact from "./components/Contact";
import Workflow from "./components/Workflow/Workflow.jsx";


function App() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const location = useLocation();

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

    // List of pages that do not show Sidebar/Header
  const noLayoutRoutes = ["/", "/login", "/WhyDocuTender", "/Pricing", "/Contact"];
  const isAuthPage = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {isAuthPage ? (
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/WhyDocuTender" element={<WhyDocuTender />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      ) : (
       
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/Users" element={<Users />} />
                 <Route path="/Setting" element={<Setting />} />
                 <Route path="/Workflow" element={<Workflow />} />
                 <Route path="/Timeline" element={<Timeline />} />
                <Route path="/projects" element={<ProjectList />} />
                <Route path="/projects/create" element={<CreateProject />} />
                <Route path="/projects/edit/:id" element={<CreateProject />} />
                {/* <Route path="/projects/upload" element={<UploadDocument />} /> */}
                <Route path="/projects/upload/:id" element={<UploadDocument />} />
                <Route path="/report/:id" element={<ReportView />} />
                 <Route path="/Reports" element={<Reports />} />
                  <Route path="/Documents" element={<Documents />} />
                
              </Routes>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
