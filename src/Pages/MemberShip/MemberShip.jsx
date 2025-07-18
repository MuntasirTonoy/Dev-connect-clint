import React, { useContext } from "react";
import { AuthContext } from "../../Firebase/AuthContext";
import { IoMdDoneAll } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { fetchUserByEmail } from "../../Hoocks/Api";
import PaymentForm from "../../Component/PaymentForm/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const Membership = () => {
  const { user } = useContext(AuthContext);
  const { data: userInfo } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () => fetchUserByEmail(user?.email),
    enabled: !!user?.email,
  });

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
            src={user?.photoURL || "https://shorturl.at/WUkZ2"}
            alt="User"
            className="w-24 h-24 rounded-full  ring-3 ring-offset-2  shadow-sm"
          />
          <div>
            <h2 className="text-xl font-bold text-base-content">
              {userInfo?.displayName || "Muntasir Tonoy"}
            </h2>
            <p className="text-sm text-base-content">{userInfo?.email}</p>
          </div>
          <div className="text-sm text-base-content space-y-1">
            <p className="bg-primary text-white p-2 rounded-full">
              {" "}
              {userInfo?.paymentStatus}
            </p>
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
            ৳499 / $5.00
          </h3>
          <p className="text-base-content text-sm mb-4">
            Life-time membership fee
          </p>
          <ul className="space-y-2 text-sm text-base-content">
            <li className="flex items-center gap-2">
              <IoMdDoneAll className="text-green-500" /> Premium Access
            </li>
            <li className="flex items-center gap-2">
              <IoMdDoneAll className="text-green-500" /> Get Golden Badge
            </li>
            <li className="flex items-center gap-2">
              <IoMdDoneAll className="text-green-500" /> 5 Extra Posts
            </li>
          </ul>
        </div>
      </div>

      {/* Right Column: Payment Form */}
      <Elements stripe={stripePromise}>
        <PaymentForm userInfo={userInfo} />
      </Elements>
    </section>
  );
};

export default Membership;
