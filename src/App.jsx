import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import ContactUs from './components/pages/ContactUs';
import AboutUs from './components/pages/AboutUs';
import Stopwatch from './components/pages/Stopwatch';
import Workouts from './components/pages/Workouts';
import Nutrition from './components/pages/Nutrition';
import Shop from './components/pages/Shop';
import Profile from './components/pages/Profile';
import Aichatassistant from './components/pages/Aichatassistant';

function App() {
  useEffect(() => {
    document.title = 'FitPro - Your Ultimate Fitness Companion';
  }, []);

  return (
    <Router>
        <AuthProvider>
          <div className="min-h-screen bg-pattern flex flex-col">
            <Header />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/stopwatch" element={<Stopwatch />} />
                  <Route path="/workouts" element={<Workouts />} />
                  <Route path="/nutrition" element={<Nutrition />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/aiassistant" element={<Aichatassistant />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </AuthProvider>
    </Router>
  );
}

export default App;