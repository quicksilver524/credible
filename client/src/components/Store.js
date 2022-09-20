import React from "react";
import gold1 from "../pageImages/gold1.png";
import gold2 from "../pageImages/gold2.png";
import gold3 from "../pageImages/gold3.png";
import gold4 from "../pageImages/gold4.png";
// import { Container } from "semantic-ui-react";
import { Card, Image, Button, Grid } from "semantic-ui-react";

function Store() {
  return (
    <Grid container stackable id="store-section">
      {/* <Grid.Row container columns={4} id="credit-section" fits="true"> */}
      <Grid.Column
        mobile={16}
        tablet={8}
        computer={4}
        className="card-container store-container"
      >
        <Card color="violet" className="card" id="credit-purchase-card">
          <Card.Header as="h2">99 credits</Card.Header>
          <Image src={gold1} alt="gold1" />
          <div class="ui blurring inverted dimmer">
            <div class="center">
              <Button rounded type="button" id="credit-purchase-button">
                Buy Credits
              </Button>
            </div>
          </div>
        </Card>
      </Grid.Column>
      <Grid.Column
        mobile={16}
        tablet={8}
        computer={4}
        className="card-container store-container"
      >
        <Card color="violet" className="card" id="credit-purchase-card">
          <Card.Header as="h2">249 credits</Card.Header>
          <Image src={gold2} alt="gold2" />
          <Button rounded type="button" id="credit-purchase-button">
            Buy Credits
          </Button>
        </Card>
      </Grid.Column>
      <Grid.Column
        mobile={16}
        tablet={8}
        computer={4}
        className="card-container store-container"
      >
        <Card color="violet" className="card" id="credit-purchase-card">
          <Card.Header as="h2">499 credits</Card.Header>
          <Image src={gold3} alt="gold3" />
          <Button rounded type="button" id="credit-purchase-button">
            Buy Credits
          </Button>
        </Card>
      </Grid.Column>
      <Grid.Column
        mobile={16}
        tablet={8}
        computer={4}
        className="card-container store-container"
      >
        <Card color="violet" className="card" id="credit-purchase-card">
          <Card.Header as="h2">999 credits</Card.Header>
          <Image src={gold4} alt="gold4" />
          <Button rounded type="button" id="credit-purchase-button">
            Buy Credits
          </Button>
        </Card>
      </Grid.Column>
      {/* </Grid.Row> */}
      {/* <Grid.Row id="product-section"></Grid.Row> */}
    </Grid>
  );
}

export default Store;
