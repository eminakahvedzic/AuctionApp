import React from "react";
import PropTypes from "prop-types";
import "../styles/grid-view.css";

const GridView = ({ products, rows, columns }) => {
  return (
    <div className="grid-view" style={{ "--columns": columns, "--rows": rows }}>
      {products.map((product, index) => (
        <div key={index} className="product-item">
          <div className="product-image">
            <img src={product.image_url} alt={product.name} />
          </div>
          <div className="product-details">
            <h3>{product.name}</h3>
            <p>
              Start From{" "}
              <span className="price">
                ${parseFloat(product.starting_bid).toFixed(rows)}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

GridView.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      image_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      starting_bid: PropTypes.number.isRequired,
    })
  ).isRequired,
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
};

export default GridView;
