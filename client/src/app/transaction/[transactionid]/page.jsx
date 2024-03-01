"use client";
import { NavbarAdminComponent } from "@/components/navbar";
import React, { useState } from "react";

const TransactionPage = () => {
  return (
    <>
      <NavbarAdminComponent />
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="w-full md:w-2/3 p-4">
            <EventDetails />
            <OrderForm />
            <PaymentMethods />
          </div>

          <div className="w-full md:w-1/3 p-4">
            <PriceDetails />
          </div>
        </div>
      </div>
    </>
  );
};

const EventDetails = () => {
  return (
    <div className="mb-4 p-4 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-2">Event Name </h2>
      <p className="text-gray-600 mb-2">Event Location | Event Date</p>
      <p className="text-gray-600">Price: IDR Price</p>
    </div>
  );
};

const OrderForm = () => {
  return (
    <div className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4">
      <h1 className="text-xl font-bold mb-2">Detail Order</h1>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="fullName"
        >
          Fullname *
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="fullName"
          type="text"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phoneNumber"
        >
          Phone Number *
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phoneNumber"
          type="tel"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email *
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="dateOfBirth"
        >
          Birthday *
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="dateOfBirth"
          type="date"
          defaultValue="1994-06-12"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="gender"
        >
          Gender *
        </label>
        <select
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="gender"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        {/* <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Make sure your data is correct.
        </button> */}
      </div>
    </div>
  );
};

const PriceDetails = () => {
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const ticketPrice = "";
  //   const platformFee = 0;

  const handleAgreeToTerms = () => {
    setAgreeToTerms(!agreeToTerms);
  };

  const handlePayment = () => {
    if (agreeToTerms) {
      console.log("Proceeding to payment...");
      // Proceed to payment logic
    } else {
      alert("Please agree to the terms and conditions.");
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {/* <div className="mr-2 p-2 bg-blue-100 rounded-full">
            Promo Icon
          </div> */}
          {/* <div>
            <p className="font-semibold text-sm">Save even more by using promos</p>
            <p className="text-xs text-gray-500">
            Choose a payment method first
            </p>
          </div> */}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-lg mb-1">Price Detail</h3>
        <div className="flex justify-between mb-1">
          <span>Total Ticket Price</span>
          <span>IDR {ticketPrice.toLocaleString("id-ID")}</span>
        </div>
        {/* <div className="flex justify-between">
          <span>Biaya Platform</span>
          <span>IDR {platformFee.toLocaleString("id-ID")}</span>
        </div> */}
        <hr className="my-4" />
        <div className="flex justify-between font-bold">
          <span>Total Pay</span>
          <span>IDR {ticketPrice.toLocaleString("id-ID")}</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={handleAgreeToTerms}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-sm">
            I agree with{" "}
            <a href="#" className="text-blue-600 underline">
              Terms and conditions
            </a>{" "}
            which applies at Gotix.com.
          </span>
        </label>
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
        disabled={!agreeToTerms}
      >
        Pay for Tickets
      </button>
    </div>
  );
};

const PaymentMethods = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">E Wallet</label>
        <div className="flex flex-col">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="wallet"
              checked={selectedPaymentMethod === "wallet"}
              onChange={handlePaymentMethodChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Wallet</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="gopay"
              checked={selectedPaymentMethod === "gopay"}
              onChange={handlePaymentMethodChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Gopay</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="shopeepay"
              checked={selectedPaymentMethod === "shopeepay"}
              onChange={handlePaymentMethodChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">ShopeePay QRIS</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
