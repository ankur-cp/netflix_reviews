import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom"

// pages
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AddProductPage from './pages/AddProductPage';
import AddReviewPage from './pages/AddReviewPage';

// components
import Header from './components/Header';
import ProductMenu from './components/ProductMenu';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header title="NETFLIX REVIEWS"/>
        <div id="div-content">
          <ProductMenu />
          <main id="main-content">
            <Routes>
              <Route path="/" element={ <HomePage /> } />
              <Route path="/all" element={ <ProductPage /> } />
              <Route path="/category/:categoryId" element={ <ProductPage /> } />
              <Route path="/genre/:genreId" element={ <ProductPage /> } />
              <Route path="/product/:productId" element={ <ProductDetailPage /> } />
              <Route path="/product/:productId/review/add" element={ <AddReviewPage /> } />
              <Route path="/product/add" element={ <AddProductPage /> } />
              <Route path="/review/add" element={ <AddReviewPage /> } />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
