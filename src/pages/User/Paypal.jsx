import React, { useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";




function Paypal({ grandTotal }) {
  const navi = useNavigate()
  const [{ isPending }] = usePayPalScriptReducer();
  // const [paymentCompleted, setPaymentCompleted] = useState(false);
  // const navigate = useNavigate();

  const handlePaymentSuccess = async (details) => {
    console.log("Payment completed successfully:", details);

    if (details) {
        console.log(details,'detaaaaaails');
      try {
       console.log('h');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                Amount: {
                  value: grandTotal,
                  currency_code: "USD",
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(handlePaymentSuccess);
        }}
        style={{ layout: "horizontal" }}
        disabled={isPending}
      />
    </div>
  );
}

export default Paypal;
