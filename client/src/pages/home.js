import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import GridView from "../components/GridView";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [
          categoriesResponse,
          featuredProductResponse,
          featuredProductsResponse,
        ] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/categories`),
          axios.get(
            `${process.env.REACT_APP_API_URL}/products/featured?count=1`
          ),
          axios.get(
            `${process.env.REACT_APP_API_URL}/products/featured?count=3`
          ),
        ]);
        setCategories(categoriesResponse.data);
        setFeaturedProduct(featuredProductResponse.data);
        setFeaturedProducts(featuredProductsResponse.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchTabProducts = async () => {
      const storedTab = sessionStorage.getItem("selectedTab");
      if (storedTab) {
        setCurrentTab(storedTab);
      }
      try {
        const tabProductsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/products/${currentTab}`
        );
        setCurrentProducts(tabProductsResponse.data);
      } catch (error) {
        console.error(`Error fetching ${currentTab} products:`, error);
      }
    };

    fetchTabProducts();
  }, [currentTab]);

  const handleTabClick = (tab) => {
    sessionStorage.setItem("selectedTab", tab);
    setCurrentTab(tab);
  };

  const isTabActive = (tab) => (currentTab === tab ? "active-tab" : "");

  return (
    <div className="home-page">
      <Navbar />
      <main className="content">
        <div className="first-box">
          <div className="categories-box">
            <div className="category-title-box">
              <h2>CATEGORIES</h2>
            </div>
            <div className="category-list-box">
              <ul className="category-list">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/category/${category.id}`}
                      className="category-item"
                    >
                      {category.category_name}
                    </Link>
                  </li>
                ))}
                <li className="category-item">
                  <Link to="/all-categories" className="category-item">
                    All Categories
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {featuredProduct ? (
            <div className="ad-box">
              <div className="ad-text">
                <h2>{featuredProduct[0].name}</h2>
                <h3>
                  Start From $
                  {parseFloat(featuredProduct[0].starting_bid).toFixed(2)}
                </h3>
                <p>{featuredProduct[0].description}</p>
                <Link
                  to={`/product/${featuredProduct[0].product_id}`}
                  className="ad-button"
                >
                  BID NOW
                  <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                </Link>
              </div>
              <div className="ad-img">
                <Link to={`/product/${featuredProduct[0].product_id}`}>
                  <img src={featuredProduct[0].image_url} alt="Ad Image" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="ad-box">
              <p>Loading featured product...</p>
            </div>
          )}
        </div>

        <div className="second-box">
          <div className="second-box-content">
            <h2 className="featured-products-title">Featured products</h2>
            <div className="featured-products-box">
              {featuredProducts.map((product) => (
                <div key={product.product_id} className="featured-item">
                  <Link
                    to={`/product/${product.product_id}`}
                    className="product-link"
                  >
                    <div className="featured-image">
                      <img src={product.image_url} alt={product.name} />
                    </div>
                    <div className="featured-details">
                      <h3>{product.name}</h3>
                      <p>
                        Start From{" "}
                        <span className="price">${product.starting_bid}</span>
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="third-box">
          <div className="tab-titles">
            <button
              onClick={() => handleTabClick("new_arrivals")}
              className={isTabActive("new_arrivals")}
            >
              New Arrivals
            </button>
            <button
              onClick={() => handleTabClick("top_rated")}
              className={isTabActive("top_rated")}
            >
              Top Rated
            </button>
            <button
              onClick={() => handleTabClick("last_chance")}
              className={isTabActive("last_chance")}
            >
              Last Chance
            </button>
          </div>

          <div className="grid-view">
            {currentProducts.map((product) => (
              <Link
                key={product.product_id}
                to={`/product/${product.product_id}`}
                className="product-link"
              >
                <div className="product-item">
                  <div className="product-image">
                    <img src={product.image_url} alt={product.name} />
                  </div>
                  <div className="product-details">
                    <h3>{product.name}</h3>
                    <p>
                      Start From{" "}
                      <span className="price">${product.starting_bid}</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
