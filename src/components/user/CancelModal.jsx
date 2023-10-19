import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  
} from "@material-tailwind/react";


 
export function DialogCustomAnimation( {open,cancelBooking,handler,bookingId} ) {
  const handleOpen = () => setOpen(!open);

  const handleCancel=()=>{
    cancelBooking(bookingId);
    handler();
  }
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
          Are You sure you want to cancel the Booking?
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
          
          <Button variant="gradient" color="green" onClick={handleCancel}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}