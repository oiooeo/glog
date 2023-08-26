import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Header from '../components/common/header/Header';
import Footer from '../components/common/footer/Footer';
import MyPage from '../pages/MyPage';
import ScrollTest from '../pages/ScrollTest';

const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/test" element={<ScrollTest />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Router;
