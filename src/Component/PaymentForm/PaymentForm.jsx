import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { createPaymentIntent } from "../../Hoocks/Api";

const CARD_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
    },
  },
};

const PaymentForm = ({ userInfo }) => {
  const [method, setMethod] = useState("visa");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
      confirmButtonColor: "#3b82f6",
    });
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
      confirmButtonColor: "#10b981",
    });
  };

  const validateCard = async () => {
    if (method !== "bkash") {
      const cardElement = elements.getElement(CardElement);
      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        showErrorAlert(error.message || "Invalid card details");
        return false;
      }
    }
    return true;
  };

  const handlePayment = async (data) => {
    if (!stripe || !elements) return;
    setProcessing(true);

    try {
      // Validate form and card
      const isValid = await trigger();
      if (!isValid) {
        setProcessing(false);
        return;
      }

      const isCardValid = await validateCard();
      if (!isCardValid) {
        setProcessing(false);
        return;
      }

      const clientSecret = await createPaymentIntent(500);

      if (method === "bkash") {
        // Simulate bKash payment success
        setTimeout(() => {
          showSuccessAlert("bKash payment successful!");
          console.log("bKash payment:", data.bkash);
          setProcessing(false);
        }, 1500);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: data.cardName,
              email: userInfo?.email || "anonymous@example.com",
            },
          },
        }
      );

      if (error) {
        showErrorAlert(error.message);
      } else if (paymentIntent.status === "succeeded") {
        showSuccessAlert("Payment successful!");
        console.log("PaymentIntent:", paymentIntent);
      }
    } catch (err) {
      console.error("Payment error:", err);
      showErrorAlert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="md:col-span-2 bg-base-200 rounded-xl shadow p-8">
      <h2 className="text-xl md:text-3xl font-bold text-base-content mb-10">
        Complete Your Payment
      </h2>

      {/* Method Selector */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3">Choose Payment Method:</p>
        <div className="flex flex-wrap gap-6">
          {[
            {
              value: "visa",
              src: "https://img.icons8.com/color/48/000000/visa.png",
            },
            {
              value: "mastercard",
              src: "https://img.icons8.com/color/48/000000/mastercard.png",
            },
            {
              value: "bkash",
              src: "https://download.logo.wine/logo/BKash/BKash-Logo.wine.png",
            },
          ].map((item) => (
            <label
              key={item.value}
              className={`flex items-center gap-2 px-3 py-2  rounded-md cursor-pointer transition ${
                method === item.value
                  ? "bg-base-content text-base-100 ring-2 ring-offset-2 ring-secondary"
                  : "bg-base-300 hover:border-base-content opacity-70"
              }`}
            >
              <input
                type="radio"
                name="method"
                value={item.value}
                checked={method === item.value}
                onChange={(e) => setMethod(e.target.value)}
                className="hidden"
              />
              <img
                src={item.src}
                alt={item.value}
                className="w-10 h-8 object-contain"
              />
              <span className="capitalize text-sm font-medium">
                {item.value}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handlePayment)} className="space-y-4">
        {method === "bkash" ? (
          <div>
            <label className="block text-sm font-medium mb-1">
              bKash Number
            </label>
            <input
              {...register("bkash", {
                required: "bKash number is required",
                pattern: {
                  value: /^01[3-9]\d{8}$/,
                  message: "Please enter a valid bKash number",
                },
              })}
              type="text"
              placeholder="01XXXXXXXXX"
              className="w-full bg-base-300  rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.bkash && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bkash.message}
              </p>
            )}
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">
                Name on Card
              </label>
              <input
                {...register("cardName", {
                  required: "Cardholder name is required",
                })}
                type="text"
                placeholder="Muntasir Tonoy"
                className="w-full rounded-md px-4 py-2 bg-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.cardName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cardName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Card Info
              </label>
              <div className="p-3 rounded-md   bg-base-300 focus-within:ring-2 focus-within:ring-primary">
                <CardElement options={CARD_OPTIONS} />
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={!stripe || processing}
          className={`w-full bg-black hover:bg-primary-dark text-white font-semibold py-3 rounded-md transition duration-200 mt-2 ${
            processing ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {processing ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            `Pay`
          )}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
