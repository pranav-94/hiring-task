import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot,useRecoilValue } from 'recoil';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Home from './routes/Home';
import { themeState } from './recoil/atom';
import CustomThemeToggle from './components/CustomTheme';

const AppContent = () => {
  const theme = useRecoilValue(themeState);
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <CustomThemeToggle />
        </div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Signup />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

function App() {
  return (
    <RecoilRoot>
      <AppContent />
    </RecoilRoot>
  );
}

export default App;

