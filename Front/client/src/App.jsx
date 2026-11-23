import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';

// Every page except Home is loaded on demand, so a visit only downloads the code for the page shown.
const named = (load, name) => lazy(() => load().then((m) => ({ default: m[name] })));

const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const English = lazy(() => import('./pages/English'));
const MathPage = lazy(() => import('./pages/Math'));
const MathChapterPage = named(() => import('./pages/Math'), 'MathChapterPage');
const CompetitiveExams = lazy(() => import('./pages/CompetitiveExams'));
const CourseTests = named(() => import('./pages/CompetitiveExams'), 'CourseTests');
const Grammar = lazy(() => import('./pages/Grammar'));
const Writing = lazy(() => import('./pages/Writing'));
const Vocabulary = lazy(() => import('./pages/Vocabulary'));
const VocabularyGuide = lazy(() => import('./pages/VocabularyGuide'));
const VocabularyDiagnosticTest = lazy(() => import('./pages/VocabularyDiagnosticTest'));
const VocabAnalytics = lazy(() => import('./pages/VocabAnalytics'));
const MathBootcamp = lazy(() => import('./pages/math/MathBootcamp'));
const ExamRunner = lazy(() => import('./pages/exams/ExamRunner'));
const ExamAnalysis = named(() => import('./pages/exams/ExamRunner'), 'ExamAnalysis');
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminCourseDashboard = lazy(() => import('./pages/admin/AdminCourseDashboard'));
const AdminUserDetail = lazy(() => import('./pages/admin/AdminUserDetail'));
const AdminMathInsights = lazy(() => import('./pages/admin/AdminMathInsights'));
const VocabHub = lazy(() => import('./pages/vocabulary-content/VocabHub'));
const VocabContentPage = lazy(() => import('./pages/vocabulary-content/VocabContentPage'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgetPassword = lazy(() => import('./pages/auth/ForgetPassword'));

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
            <Route path="/math/:grade/:chapterSlug" element={<MathChapterPage />} />
            <Route path="/competitive-exams" element={<CompetitiveExams />} />
            <Route path="/competitive-exams/:course" element={<CourseTests />} />
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
              <Route path="/competitive-exams/:exam/test" element={<ExamRunner />} />
              <Route path="/competitive-exams/:exam/analysis" element={<ExamAnalysis />} />
              <Route path="/competitive-exams/:exam/:section/:module" element={<ExamRunner />} />
            </Route>

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/course/maths/insights" element={<AdminMathInsights />} />
            <Route path="/admin/course/:course" element={<AdminCourseDashboard />} />
            <Route path="/admin/user-detail" element={<AdminUserDetail />} />
          </Route>

          <Route path="/login" element={<Suspense fallback={null}><Login /></Suspense>} />
          <Route path="/register" element={<Suspense fallback={null}><Register /></Suspense>} />
          <Route path="/forget-password" element={<Suspense fallback={null}><ForgetPassword /></Suspense>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
