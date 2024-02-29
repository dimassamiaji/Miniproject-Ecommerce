import React from "react";

export const metadata = {
  title: "Gotix - Event Detail",
  description: "tempat jualan tiket",
};

const TransactionPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap md:flex-nowrap">
        {/* Event & Order Details Column */}
        <div className="w-full md:w-2/3 p-4">
          <EventDetails />
          <OrderForm />
        </div>

        {/* Price Details & Payment Column */}
        <div className="w-full md:w-1/3 p-4">
          <PriceDetails />
          <PaymentMethods />
        </div>
      </div>
    </div>
  );
};

const EventDetails = () => {
  return (
    <div className="mb-4 p-4 shadow-lg rounded-lg">{/* Event details*/}</div>
  );
};

const OrderForm = () => {
  return (
    <form className="mb-4 p-4 shadow-lg rounded-lg">{/* Order form */}</form>
  );
};

const PriceDetails = () => {
  return (
    <div className="mb-4 p-4 shadow-lg rounded-lg">{/* Price details */}</div>
  );
};

const PaymentMethods = () => {
  return (
    <div className="mb-4 p-4 shadow-lg rounded-lg">{/* Payment methods */}</div>
  );
};

export default TransactionPage;
