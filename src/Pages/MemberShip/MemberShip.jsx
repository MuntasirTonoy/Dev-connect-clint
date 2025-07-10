import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Firebase/AuthContext";
import { IoMdDoneAll } from "react-icons/io";

const Membership = () => {
  const { user } = useContext(AuthContext);
  const [method, setMethod] = useState("visa");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Payment Data:", data);
  };

  const avatar = user?.photoURL || "https://shorturl.at/WUkZ2";

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
      {/* Left Column: User Info + Price */}
      <div
        data-aos="fade-right"
        className="md:col-span-1 bg-base-200 rounded-xl shadow p-6 flex flex-col gap-6"
      >
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="900"
          className="flex flex-col items-center text-center gap-4"
        >
          <img
            src={avatar}
            alt="User"
            className="w-24 h-24 rounded-full border-4 border-white shadow"
          />
          <div>
            <h2 className="text-xl font-bold text-base-content">
              {user?.displayName || "Muntasir Tonoy"}
            </h2>
            <p className="text-sm text-base-content">{user?.email}</p>
          </div>
          <div className="text-sm text-base-content space-y-1">
            <p> +880 1234-567890</p>
            <p> Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Price Card */}
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="1000"
          className="bg-base-300 p-4 rounded-xl shadow border"
        >
          <h3 className="text-2xl font-bold text-base-content mb-2">
            ৳499 / $5
          </h3>
          <p className="text-base-content text-sm mb-4">
            One-time membership fee
          </p>
          <ul className="space-y-2 text-sm text-base-content">
            <li className="flex items-center gap-2">
              <IoMdDoneAll className="text-green-500" /> Premium Access
            </li>
            <li className="flex items-center gap-2">
              <IoMdDoneAll className="text-green-500" /> Member-only Content
            </li>
            <li className="flex items-center gap-2">
              <IoMdDoneAll className="text-green-500" /> Priority Support
            </li>
          </ul>
        </div>
      </div>

      {/* Right Column: Payment Form */}
      <div
        data-aos="fade-left"
        className="md:col-span-2 bg-base-200 rounded-xl shadow p-8"
      >
        <h2 className="text-2xl font-bold text-base-content mb-6">
          Complete Your Payment
        </h2>

        {/* Payment Method Selection */}
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
                className={`flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer ${
                  method === item.value
                    ? "bg-base-content text-base-100"
                    : "bg-base-100"
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

        {/* Payment Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {method === "bkash" ? (
            <div>
              <label className="block text-sm font-medium mb-1">
                bKash Number
              </label>
              <input
                {...register("bkash", {
                  required: "bKash number is required",
                })}
                type="text"
                placeholder="01XXXXXXXXX"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  Card Number
                </label>
                <input
                  {...register("cardNumber", {
                    required: "Card number is required",
                  })}
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full  rounded-md px-4 py-2 focus:outline-none bg-base-300 focus:ring-1 focus:ring-base-content"
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">
                    Expiry Date
                  </label>
                  <input
                    {...register("expiry", {
                      required: "Expiry date is required",
                    })}
                    type="text"
                    placeholder="MM/YY"
                    className="w-full rounded-md px-4 py-2 focus:outline-none bg-base-300 focus:ring-1 focus:ring-base-content"
                  />
                  {errors.expiry && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.expiry.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <input
                    {...register("cvv", { required: "CVV is required" })}
                    type="password"
                    placeholder="•••"
                    className="w-full  rounded-md px-4 py-2 focus:outline-none bg-base-300 focus:ring-1 focus:ring-base-content"
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.cvv.message}
                    </p>
                  )}
                </div>
              </div>

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
                  className="w-full  rounded-md px-4 py-2 focus:outline-none bg-base-300 focus:ring-1 focus:ring-base-content"
                />
                {errors.cardName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cardName.message}
                  </p>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-base-content hover:opacity-90 text-base-100 font-semibold py-3 rounded-md transition duration-200 mt-2"
          >
            Pay
          </button>
        </form>
      </div>
    </section>
  );
};

export default Membership;
