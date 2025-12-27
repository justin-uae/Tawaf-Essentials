import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { BrandedFallback } from './components/LoadingFallback';
import { initializeAuth } from './slices/authSlice';
import ScrollToTop from './helper/ScrollToTop';
import { useAppDispatch } from './hooks/useRedux';
import { WhatsAppButton } from './components/WhatsAppButton';
import Screen2 from './pages/Screen2';
import Screen3 from './pages/Screen3';
import Screen4 from './pages/Screen4';
import Screen5 from './pages/Screen5';

const ExcursionsDubaiHero = lazy(() => import('./components/ExcursionsDubaiHero'));
const Footer = lazy(() => import('./components/Footer'));
const ItemDetailpage = lazy(() => import('./components/ItemDetailpage'));
const Navbar = lazy(() => import('./components/Navbar'));
const ContactUsPage = lazy(() => import('./components/ContactUs'));
const FallbackPage = lazy(() => import('./components/FallBackPage'));
const BookingsPage = lazy(() => import('./pages/BookingsPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const AboutPage = lazy(() => import('./pages/AboutUs'));
// const ViewAllExcursion = lazy(() => import('./pages/ViewAllExcursion'))
// const EBookPage = lazy(() => import('./pages/EBookPage'))
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize auth on app load
    dispatch(initializeAuth() as any);
  }, [dispatch]);


  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<BrandedFallback />}>
        <Navbar />
        <Routes>
          <Route path='/' element={<ExcursionsDubaiHero />} />
          <Route path='/Screen2' element={<Screen2 />} />
          <Route path='/Screen3' element={<Screen3 />} />
          <Route path='/Screen4' element={<Screen4 />} />
          <Route path='/Screen5' element={<Screen5 />} />
          <Route path='/contact' element={<ContactUsPage />} />
          <Route path='/about' element={<AboutPage />} />
          {/* <Route path='/products' element={<ViewAllExcursion />} /> */}
          {/* <Route path='/ebooks' element={<EBookPage />} /> */}
          <Route path='/products/:id' element={<ItemDetailpage />} />

          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <BookingsPage />
              </ProtectedRoute>
            }
          />

          <Route path='/tours' element={<FallbackPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/transfers' element={<FallbackPage />} />
          <Route path='/services' element={<FallbackPage />} />
          <Route path='*' element={<FallbackPage />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;