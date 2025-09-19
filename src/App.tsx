import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/Layout';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';
import DirectionProvider from './components/DirectionProvider';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductsPage from './pages/ProductsPage';
import QuickConsultationPage from './pages/QuickConsultationPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <CustomThemeProvider>
      <CartProvider>
        <DirectionProvider>
          <Router>
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/consultation" element={<QuickConsultationPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
              <CartDrawer />
            </Layout>
          </Router>
        </DirectionProvider>
      </CartProvider>
    </CustomThemeProvider>
  );
}

export default App;