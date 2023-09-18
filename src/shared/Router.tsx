import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from '../components/common/footer/Footer';
import Header from '../components/common/header/Header';
import Home from '../pages/Home';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Router;
