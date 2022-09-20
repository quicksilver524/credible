import React from "react";
import gold1 from "../pageImages/gold1.png";
import gold2 from "../pageImages/gold2.png";
import gold3 from "../pageImages/gold3.png";
import gold4 from "../pageImages/gold4.png";
import { Container } from "semantic-ui-react";
import { Card, Icon, Image, Button } from "semantic-ui-react";

function Store() {
  return (
    <Container id="store-section">
      <Card.Group itemsPerRow={4} id="credit-section">
        {/* <Container className="card-container store-container"> */}
        <Card color="violet" className="card credit-purchase-card">
          <Card.Header as="h2">99 credits</Card.Header>
          <Image src={gold1} alt="gold1" />
          <Card.Content>
            <Icon name="hand point right" />
            <Button
              // background-color="#4baeae"
              type="button"
              className="credit-purchase-button post-create-btn"
            >
              Buy Credits
            </Button>
          </Card.Content>
        </Card>
        {/* </Container> */}
        {/* <div className="card-container store-container"> */}
        <Card color="violet" className="card credit-purchase-card">
          <Card.Header as="h2">249 credits</Card.Header>
          <Image src={gold2} alt="gold2" />
          <Button
            type="button"
            className="credit-purchase-button post-create-btn"
          >
            <Icon name="hand point right" />
            Buy Credits
          </Button>
        </Card>
        {/* </div>
        <div className="card-container store-container"> */}
        <Card color="violet" className="card credit-purchase-card">
          <Card.Header as="h2">499 credits</Card.Header>
          <Image src={gold3} alt="gold3" />
          <Button
            type="button"
            className="credit-purchase-button post-create-btn"
          >
            Buy Credits
          </Button>
        </Card>
        {/* </div>
        <div className="card-container store-container"> */}
        <Card color="violet" className="card credit-purchase-card">
          <Card.Header as="h2">999 credits</Card.Header>
          <Image src={gold4} alt="gold4" />
          <Button
            type="button"
            className="credit-purchase-button post-create-btn"
          >
            Buy Credits
          </Button>
        </Card>
        {/* </div> */}
      </Card.Group>
      <div id="product-section"></div>
    </Container>
  );
}

export default Store;
