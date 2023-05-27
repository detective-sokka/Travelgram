import React, { useState, useEffect } from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";
import { userDetails } from "../screens/Services";

class CheckoutForm extends React.Component {

  constructor() {

    super();

    this.state = {
      premuim : false,
      update: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  
  componentDidUpdate() {
    if (this.state.update == false) {
      return;
    }

    console.log("premium", this.state.premuim);
    console.log ("user2", userDetails);
    fetch('/updatePremium', {
      method: "put",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
          user: userDetails
      })
    }).then(res => res.json())
      .then(result => {
          
        console.log(result);
        userDetails.premium = true;
          
      }).catch(err => {

          console.log(err)

      }).catch (err => {
        console.log(err)
      })

  }

  handleSubmit = async event => {

    event.preventDefault();
    console.log ("user2", userDetails);
    const { stripe, elements } = this.props;        

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {

      console.log("card incorrect", result.error.message);

    } else {

      console.log("card correct", result.token);
      this.setState({premuim : true , update: true})      
    }

  };

  render() {        

    return (
      <div>
        <div className="product-info">
          <h3 className="product-title">Premium</h3>
          <h4 className="product-price">$99</h4>
        </div>
        {  this.state.premuim &&
                       <div class="alert alert-success" role="alert">
              You are a premium user
            </div>
            }      
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          <button disabled={!this.props.stripe} className="btn-pay">
            Buy Now
          </button>
        </form>
      </div>
    );
  }
}

export default function InjectedCheckoutForm(...props) {  

  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm user={props.user} stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}