import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/SharedLayout";
import LandingPage from "./components/LandingPage";
import MusicProductionPage from "./components/MusicProduccionPage";
import WebDevelopmentPage from "./components/WebDevelopomentPage";
import ContactPage from "./components/ContactPage";
import ChatbotAssistant from "./components/ChatbotAssistant";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/music-production" element={<MusicProductionPage />} />
          <Route path="/web-development" element={<WebDevelopmentPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Add more routes as needed */}
          {/* <Route path="/web-development" element={<WebDevelopmentPage />} /> */}
          {/* <Route path="/digital-solutions" element={<DigitalSolutionsPage />} /> */}
        </Routes>
        <ChatbotAssistant />
      </Layout>
    </Router>
  );
}

export default App;
