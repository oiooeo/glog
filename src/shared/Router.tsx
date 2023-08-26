import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Header from '../components/common/header/Header';
import Footer from '../components/common/footer/Footer';
import MyPage from '../pages/MyPage';

const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my" element={<MyPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Router;
