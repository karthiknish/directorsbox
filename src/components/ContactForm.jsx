import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { sendGTMEvent } from "@next/third-parties/google";
import { useRouter } from "next/navigation";

const ContactForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    business: "",
    position: "",
    interests: {
      artsAndEntertainment: false,
      automotive: false,
      businessAndPolitics: false,
      fashion: false,
      travel: false,
      sport: false,
      wellBeing: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.business.trim())
      newErrors.business = "Business/Website is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        interests: {
          ...prev.interests,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Track form submission event
      sendGTMEvent({ event: "enquire_form_submit" });

      // Track conversion event
      try {
        await fetch("/api/meta-conversion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventName: "Lead",
            value: 0.0,
          }),
        });
      } catch (error) {
        console.error("Failed to track enquiry:", error);
      }

      // Prepare the data in the format required by the API
      const apiData = {
        form_id: 10,
        form_data: {
          1.3: {
            field_name: "Name (First)",
            field_value: formData.firstName,
            field_type: "name",
          },
          1.6: {
            field_name: "Name (Last)",
            field_value: formData.lastName,
            field_type: "name",
          },
          4: {
            field_name: "Email",
            field_value: formData.email,
            field_type: "email",
          },
          3: {
            field_name: "Phone",
            field_value: formData.phone,
            field_type: "phone",
          },
          5: {
            field_name: "Business/Website",
            field_value: formData.business,
            field_type: "text",
          },
          6: {
            field_name: "Position Held",
            field_value: formData.position,
            field_type: "text",
          },
          9.1: {
            field_name: "Arts and Entertainment",
            field_value: formData.interests.artsAndEntertainment ? "1" : "",
            field_type: "checkbox",
          },
          9.2: {
            field_name: "Automotive",
            field_value: formData.interests.automotive ? "1" : "",
            field_type: "checkbox",
          },
          9.3: {
            field_name: "Business and Politics",
            field_value: formData.interests.businessAndPolitics ? "1" : "",
            field_type: "checkbox",
          },
          9.4: {
            field_name: "Fashion",
            field_value: formData.interests.fashion ? "1" : "",
            field_type: "checkbox",
          },
          9.5: {
            field_name: "Travel",
            field_value: formData.interests.travel ? "1" : "",
            field_type: "checkbox",
          },
          9.6: {
            field_name: "Sport",
            field_value: formData.interests.sport ? "1" : "",
            field_type: "checkbox",
          },
          9.7: {
            field_name: "Well-Being",
            field_value: formData.interests.wellBeing ? "1" : "",
            field_type: "checkbox",
          },
        },
      };

      // Send the data to the API
      const response = await fetch(
        "https://profici.co.uk/wp-json/weboforms/v1/directors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();

      // Redirect to thank you page on success
      router.push("/thankyou");

      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        business: "",
        position: "",
        interests: {
          artsAndEntertainment: false,
          automotive: false,
          businessAndPolitics: false,
          fashion: false,
          travel: false,
          sport: false,
          wellBeing: false,
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        success: false,
        message:
          "There was an error submitting your enquiry. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="bg-white text-black p-8 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {submitStatus?.success ? (
        <div className="text-center py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="mb-6 mx-auto"
          >
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </motion.div>
          <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
          <p className="text-gray-600 mb-6">{submitStatus.message}</p>
          <Button
            onClick={() => setSubmitStatus(null)}
            className="bg-black text-white hover:bg-gray-800"
          >
            Submit Another Enquiry
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-2xl font-bold mb-6">Enquire About Membership</h3>

          {submitStatus?.success === false && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {submitStatus.message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name*
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className={`w-full px-3 py-2 border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name*
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className={`w-full px-3 py-2 border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone*
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+44 7123 456789"
                className={`w-full px-3 py-2 border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business/Website*
              </label>
              <input
                type="text"
                name="business"
                value={formData.business}
                onChange={handleChange}
                placeholder="Your company or website"
                className={`w-full px-3 py-2 border ${
                  errors.business ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
              />
              {errors.business && (
                <p className="mt-1 text-sm text-red-600">{errors.business}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position Held*
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. CEO, Director, Manager"
                className={`w-full px-3 py-2 border ${
                  errors.position ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
              />
              {errors.position && (
                <p className="mt-1 text-sm text-red-600">{errors.position}</p>
              )}
            </div>
          </div>

          {/* Interests */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Areas of Interest (Select all that apply)
            </label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="artsAndEntertainment"
                  name="artsAndEntertainment"
                  checked={formData.interests.artsAndEntertainment}
                  onChange={handleChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label
                  htmlFor="artsAndEntertainment"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Arts and Entertainment
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="automotive"
                  name="automotive"
                  checked={formData.interests.automotive}
                  onChange={handleChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label
                  htmlFor="automotive"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Automotive
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="businessAndPolitics"
                  name="businessAndPolitics"
                  checked={formData.interests.businessAndPolitics}
                  onChange={handleChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label
                  htmlFor="businessAndPolitics"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Business and Politics
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="fashion"
                  name="fashion"
                  checked={formData.interests.fashion}
                  onChange={handleChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label
                  htmlFor="fashion"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Fashion
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="travel"
                  name="travel"
                  checked={formData.interests.travel}
                  onChange={handleChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label
                  htmlFor="travel"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Travel
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sport"
                  name="sport"
                  checked={formData.interests.sport}
                  onChange={handleChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label
                  htmlFor="sport"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Sport
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="wellBeing"
                  name="wellBeing"
                  checked={formData.interests.wellBeing}
                  onChange={handleChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label
                  htmlFor="wellBeing"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Well-Being
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Enquiry"}
            </Button>
            <p className="text-xs text-gray-500 mt-3 text-center">
              By submitting this form, you agree to our privacy policy and terms
              of service.
            </p>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default ContactForm;
