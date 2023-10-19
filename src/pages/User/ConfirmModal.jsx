import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  
} from "@material-tailwind/react";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Paypal from "./Paypal";

 
export function DialogCustomAnimation( {open, handler, handlePayment,totalCost,totalDays,grandTotal,showPayPalButton,initialOptions,handleCheckout} ) {

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Continue with the booking</DialogHeader>
        <DialogBody divider>
          Are you sure you want to continue and place the order.
          This is the details as follows  <hr />
          Number of Days : {totalDays} <hr />
          Bare Cost  : {totalCost} <hr />
          Grand Total : {grandTotal}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handler}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          {showPayPalButton ? (
    <PayPalScriptProvider options={initialOptions} >
      <Paypal grandTotal={grandTotal} />
    </PayPalScriptProvider>
  ) :(
          <Button variant="gradient" color="green" onClick={() => {handleCheckout() ; handler(); }}>
            <span>Confirm</span>
          </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}