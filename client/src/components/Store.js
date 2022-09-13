import React from "react";
import gold1 from "../pageImages/gold1.png";
import gold2 from "../pageImages/gold2.png";
import gold3 from "../pageImages/gold3.png";
import gold4 from "../pageImages/gold4.png";

function Store() {
  return (
    <div id="store-section">
      <div id="credit-section">
        <div className="card-container store-container">
          <div className="card credit-purchase-card">
            <h3>99 credits</h3>
            <img src={gold1} alt="gold1" />
            <button
              type="button"
              className="credit-purchase-button post-create-btn"
            >
              Buy Credits
            </button>
          </div>
        </div>
        <div className="card-container store-container">
          <div className="card credit-purchase-card">
            <h3>249 credits</h3>
            <img src={gold2} alt="gold2" />
            <button
              type="button"
              className="credit-purchase-button post-create-btn"
            >
              Buy Credits
            </button>
          </div>
        </div>
        <div className="card-container store-container">
          <div className="card credit-purchase-card">
            <h3>499 credits</h3>
            <img src={gold3} alt="gold3" />
            <button
              type="button"
              className="credit-purchase-button post-create-btn"
            >
              Buy Credits
            </button>
          </div>
        </div>
        <div className="card-container store-container">
          <div className="card credit-purchase-card">
            <h3>999 credits</h3>
            <img src={gold4} alt="gold4" />
            <button
              type="button"
              className="credit-purchase-button post-create-btn"
            >
              Buy Credits
            </button>
          </div>
        </div>
      </div>
      <div id="product-section"></div>
    </div>
  );
}

export default Store;
