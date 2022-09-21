import React, {useState,useEffect} from "react";
import {Card, Grid, Button, Form, Image, Modal } from "semantic-ui-react";
import gold1 from "../pageImages/gold1.png";
import gold2 from "../pageImages/gold2.png";
import gold3 from "../pageImages/gold3.png";
import gold4 from "../pageImages/gold4.png";
// import { Container } from "semantic-ui-react";
import {CHECKOUT, LOGIN_USER} from "../utils/mutations";
import AuthService from "../utils/auth";
import {useMutation} from "@apollo/client";
import { loadStripe } from '@stripe/stripe-js'
import { idbPromise } from '../utils/helpers';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');


function Store() {
    const [checkout, {data}] = useMutation(CHECKOUT);
    const [formState, setFormState] = useState({credits: "", price: ""});
    // update state based on form input changes
    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleCreditSubmit = async (a, b) => {
        console.log(a,b);
        try {
            const {data} = await checkout({
                variables: {
                    "credits": a,
                    "price": b
                },
            });
            await idbPromise('points', 'put', {
                "credits": a,
                "price": b
            });
            console.log(data);
            if(data) {
                stripePromise.then((res) => {
                    res.redirectToCheckout({ sessionId: data.checkout.session });
                });
            }
        } catch (e) {
            console.error(e);
        }
    };


    return (
    <Grid container stackable id="store-section">
      {/* <Grid.Row container columns={4} id="credit-section" fits="true"> */}
        <Grid.Column
            mobile={16}
            tablet={8}
            computer={4}
            className="store-container"
        >
            <Card color="violet" className="card" id="credit-purchase-card">
                <Card.Header as="h2">99 credits</Card.Header>
                <Image src={gold1} alt="gold1"/>
                <Button rounded="true" type="button" id="credit-purchase-button" onClick={()=>handleCreditSubmit("99 credits",99)}>
                    Buy Credits
                </Button>
            </Card>
        </Grid.Column>
      <Grid.Column
        mobile={16}
        tablet={8}
        computer={4}
        className="store-container"
      >
        <Card color="violet" className="card" id="credit-purchase-card">
          <Card.Header as="h2">249 credits</Card.Header>
          <Image src={gold2} alt="gold2" />
          <Button rounded="true" type="button" id="credit-purchase-button" onClick={()=>handleCreditSubmit("249 credits",249)}>
            Buy Credits
          </Button>
        </Card>
      </Grid.Column>
      <Grid.Column
        mobile={16}
        tablet={8}
        computer={4}
        className="store-container"
      >
        <Card color="violet" className="card" id="credit-purchase-card">
          <Card.Header as="h2">499 credits</Card.Header>
          <Image src={gold3} alt="gold3" />
          <Button rounded="true" type="button" id="credit-purchase-button" onClick={()=>handleCreditSubmit("499 credits",499)}>
            Buy Credits
          </Button>
        </Card>
      </Grid.Column>
      <Grid.Column
        mobile={16}
        tablet={8}
        computer={4}
        className="store-container"
      >
        <Card color="violet" className="card" id="credit-purchase-card">
          <Card.Header as="h2">999 credits</Card.Header>
          <Image src={gold4} alt="gold4" />
          <Button rounded="true" type="button" id="credit-purchase-button" onClick={()=>handleCreditSubmit("999 credits",999)}>
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
