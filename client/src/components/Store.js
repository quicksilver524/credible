import React from "react";

function Store() {
  return (
    <div id="store-section">
      <div id="credit-section">
        <div className="card-container store-container">
          <div className="card credit-purchase-card">
            <h3>99 credits</h3>
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
