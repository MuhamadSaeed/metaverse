import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Lessons from './pages/Lessons';
import LessonDetails from './pages/LessonDetails';
import Navbar from './components/Navbar';
// import ProfilePage from './ProfilePage';

const App = () => {
  return (
    <Router>
      <div dir="rtl" className="font-sans">
              <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/lessons/:subject" element={<Lessons />} />
          <Route path="/lesson/:subject/:id" element={<LessonDetails />} />

          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
