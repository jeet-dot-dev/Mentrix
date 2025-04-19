import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Test from './pages/Test';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Exam from './pages/Exam';
import Results from './pages/Results';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="test" element={<Test />} />
          <Route path="exam" element={<Exam />} />
          <Route path="results" element={<Results />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;