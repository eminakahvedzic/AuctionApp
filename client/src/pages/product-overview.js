import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/product-overview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

const ProductOverview = () => {
  const [largeImageUrl, setLargeImageUrl] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productTitle, setProductTitle] = useState("");
  const [startingBid, setStartingBid] = useState(0);
  const [highestBid, setHighestBid] = useState(0);
  const [numberOfBids, setNumberOfBids] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [productDescription, setProductDescription] = useState("");
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [closingDate, setClosingDate] = useState("");

  const { product_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      window.scrollTo(0, 0);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products/${product_id}/details`
        );
        const productData = response.data;

        setProductTitle(productData.name);
        setStartingBid(productData.startingBid);
        setHighestBid(productData.currentBid);
        setNumberOfBids(productData.numberOfBids);
        setTimeLeft(productData.timeLeft);
        setClosingDate(productData.closingDate);
        setProductDescription(productData.description);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [product_id]);

  const fetchFeaturedData = async () => {
    try {
      const [featuredProductsResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/products/featured?count=3`),
      ]);

      setFeaturedProducts(featuredProductsResponse.data);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  useEffect(() => {
    fetchFeaturedData();
  }, []);

  const handleImageClick = (imageUrl) => {
    setLargeImageUrl(imageUrl);
  };

  const placeBid = () => {};

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products/${product_id}/images`
        );
        const images = response.data;

        setLargeImageUrl(images[0]);
        setProductImages(images);
      } catch (error) {
        console.error("Error fetching product images:", error);
      }
    };

    fetchProductImages();
  }, [product_id]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const closingTime = new Date(closingDate);
      const timeDifference = closingTime - now;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft("Closed");
      }
    };

    if (closingDate) {
      calculateTimeLeft();
      const interval = setInterval(calculateTimeLeft, 1000);
      return () => clearInterval(interval);
    }
  }, [closingDate]);

  const handleFeaturedProductClick = (productId) => {
    fetchFeaturedData();
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="product-overview-page">
      <Navbar />
      <div className="product-bar">
        <div className="product-bar-content">
          <div className="product-title">
            <h2>{productTitle}</h2>
          </div>
          <div className="page-path">
            <Link to="/">Home</Link> &rarr;{" "}
            <Link to={`/product/${product_id}`}>Single product</Link>
          </div>
        </div>
      </div>
      <main className="content">
        <div className="first-content-box">
          <div className="images-box">
            <div className="large-image">
              <img src={largeImageUrl} alt="Large Product" />
            </div>
            <div className="carousel">
              {productImages.map((productImages, index) => (
                <img
                  key={index}
                  src={productImages}
                  alt={`Product ${index}`}
                  onClick={() => handleImageClick(productImages)}
                />
              ))}
            </div>
          </div>
          <div className="text-and-bid-box">
            <div className="bidding">
              <h2>{productTitle}</h2>
              <p className="startsFrom">
                Starts From <span className="highlighted">${startingBid}</span>
              </p>
              <div className="wishlist-box">
                <p>Add to Wishlist</p>
                <div className="wishlist-icon">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>

              <div className="bid-info">
                <p>
                  Highest Bid:{" "}
                  <span className="highlighted">${highestBid}</span>
                </p>
                <p>
                  Number of Bids:{" "}
                  <span className="highlighted">{numberOfBids}</span>
                </p>
                <p>
                  Time Left: <span className="highlighted">{timeLeft}</span>
                </p>
              </div>
              <div className="bid-input">
                <input
                  type="number"
                  placeholder={`Enter $${Math.ceil(highestBid) + 1} or higher`}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
                <Link className="bid-button">
                  BID NOW
                  <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                </Link>{" "}
              </div>
            </div>
            <div className="details">
              <div className="tab">
                <button
                  onClick={() => setActiveTab("details")}
                  className={activeTab === "details" ? "active" : ""}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab("seller-info")}
                  className={activeTab === "seller-info" ? "active" : ""}
                >
                  Seller Information
                </button>
                <button
                  onClick={() => setActiveTab("customer-reviews")}
                  className={activeTab === "customer-reviews" ? "active" : ""}
                >
                  Customer Reviews
                </button>
              </div>
              <div className="tab-content">
                {activeTab === "details" && (
                  <div>
                    <p>{productDescription}</p>
                  </div>
                )}
                {activeTab === "seller-info" && (
                  <div>
                    <p>Seller Information goes here.</p>
                  </div>
                )}
                {activeTab === "customer-reviews" && (
                  <div>
                    <p>Customer Reviews go here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="second-content-box">
          <div className="second-box-content">
            <h2 className="related-products-title">Related products</h2>
            <div className="featured-products-box">
              {featuredProducts.map((product) => (
                <div
                  key={product.product_id}
                  className="featured-item"
                  onClick={() => handleFeaturedProductClick(product.product_id)}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductOverview;
