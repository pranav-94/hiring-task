import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Home from './routes/Home';
import ThemeToggle from './components/Theme';
import { themeState } from './recoil/atom';

const AppTheme = () => {
  
  return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
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
      <AppTheme />
    </RecoilRoot>
  );
}

export default App;

