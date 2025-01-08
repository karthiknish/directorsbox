"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CancelSubscription() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to cancel subscription");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Cancellation Successful
          </h2>
          <p className="text-gray-600 mb-4">
            Your subscription has been scheduled for cancellation at the end of
            your current billing period.
          </p>
          <p className="text-gray-600">
            Redirecting you to the homepage in 5 seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center mb-8">
          Cancel Subscription
        </h2>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              placeholder="Enter your email address"
            />
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Please note that cancelling your subscription will:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>Take effect at the end of your current billing period</li>
              <li>Stop all future charges</li>
              <li>
                Remove your access to member benefits when the period ends
              </li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Cancel Subscription"}
          </button>
        </form>
      </div>
    </div>
  );
}
