import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import English from './pages/English';
import MathPage from './pages/Math';
import Grammar from './pages/Grammar';
import Writing from './pages/Writing';
import Vocabulary from './pages/Vocabulary';
import VocabularyGuide from './pages/VocabularyGuide';
import VocabularyDiagnosticTest from './pages/VocabularyDiagnosticTest';
import VocabAnalytics from './pages/VocabAnalytics';
import MathBootcamp from './pages/math/MathBootcamp';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUserDetail from './pages/admin/AdminUserDetail';
import VocabHub from './pages/vocabulary-content/VocabHub';
import VocabContentPage from './pages/vocabulary-content/VocabContentPage';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgetPassword from './pages/auth/ForgetPassword';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/english" element={<English />} />
            <Route path="/math" element={<MathPage />} />
            <Route path="/grammar" element={<Grammar />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/vocabulary-guide" element={<VocabularyGuide />} />
            <Route path="/vocab-analytics" element={<VocabAnalytics />} />
            <Route path="/vocabulary-content" element={<VocabHub />} />
            <Route path="/vocabulary-content/:topic" element={<VocabContentPage />} />

            {/* Routes that redirected to login when not authenticated in the original site */}
            <Route element={<RequireAuth />}>
              <Route path="/vocabulary-diagnostic-test" element={<VocabularyDiagnosticTest />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/math/:grade/:chapterSlug/:level" element={<MathBootcamp />} />
            </Route>

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/user-detail" element={<AdminUserDetail />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
