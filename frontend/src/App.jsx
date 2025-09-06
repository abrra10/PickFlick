import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import HomePage from "./pages/HomePage";
import SessionPage from "./pages/SessionPage";
import ResultsPage from "./pages/ResultsPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <SessionProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/session/:sessionCode" element={<SessionPage />} />
            <Route path="/results/:sessionCode" element={<ResultsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </SessionProvider>
  );
}

export default App;
