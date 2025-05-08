"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@headlessui/react";
import { Img } from "react-image";
import { Globe, Timer } from "phosphor-react";
import { Card, CardContent } from "@mui/material";

// Define Zod validation schema
const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .regex(/^[A-Za-zÀ-ÿ' -]+(?:[A-Za-zÀ-ÿ' -]*[A-Za-zÀ-ÿ])?$/, {
      message:
        "Name must contain only alphabets, spaces, apostrophes, or hyphens, and cannot start or end with a space.",
    }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{10,}$/.test(val), {
      message:
        "Phone number must be at least 10 digits long and contain only numbers.",
    }),
  message: z.string().min(1, { message: "Message is required" }),
  inquiryType: z.string().min(1, { message: "Please select an inquiry type" }),
});

type FormData = z.infer<typeof formSchema>;

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const res = await fetch(`${backendUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsSuccess(true);
        console.log("Email sent successfully!");
      } else {
        console.error("Error sending email");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white ">
      <main className="flex-1">
        {/* About FinanceHub Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 ">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <span className="inline-block rounded-lg bg-blue-200 px-3 py-1 text-sm font-semibold text-blue-600  dark:text-blue-400">
                    About FinanceHub
                  </span>
                  <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
                    Your Trusted Financial Partner
                  </h1>
                  <p className="max-w-lg text-gray-600 md:text-xl dark:text-gray-300">
                    Since 2010, we've been helping individuals and businesses
                    achieve financial success through innovative solutions and
                    personalized guidance.
                  </p>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square">
                <Img
                  src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="FinanceHub headquarters"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section
          id="our-story"
          className="w-full py-12 md:py-24 lg:py-32 bg-white "
        >
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <article className="space-y-6">
                <header>
                  <div className="inline-flex items-center rounded-lg bg-blue-200 px-3 py-1 text-sm font-semibold text-blue-600  dark:text-blue-400">
                    <Timer className="mr-1 h-4 w-4" aria-hidden="true" />
                    <span>Our Story</span>
                  </div>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
                    From Vision to Reality
                  </h2>
                </header>
                <p className="text-gray-600 dark:text-gray-300">
                  FinanceHub was founded in 2010 by a team of financial experts
                  who recognized a gap in the market for accessible, transparent
                  financial services. Led by our CEO, Sarah Johnson, a former
                  Wall Street executive with over 20 years of experience, our
                  founding team set out to democratize financial planning and
                  wealth management.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  What began as a small startup with just five employees has
                  grown into a global financial services company with offices in
                  major cities across the United States and over 500 dedicated
                  professionals. Throughout our journey, we've remained
                  committed to our core values of integrity, innovation, and
                  client-centered service.
                </p>
              </article>
              <aside className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-lg overflow-hidden shadow-md dark:shadow-none"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt={`FinanceHub image ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Mission, Vision & Values Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 ">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div>
                <div className="inline-flex items-center rounded-lg bg-blue-200 px-3 py-1 text-sm font-semibold text-blue-600  dark:text-blue-400">
                  <Globe className="mr-1 h-4 w-4" aria-hidden="true" />
                  <span>Our Mission &amp; Values</span>
                </div>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
                  What Drives Us Forward
                </h2>
                <p className="mx-auto max-w-xl text-gray-600 md:text-xl dark:text-gray-300">
                  Our mission and values guide everything we do at FinanceHub.
                </p>
              </div>
            </div>
            <div className="grid gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 dark:bg-blue-800/30">
                      <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold">Our Mission</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      To empower individuals and businesses to achieve financial
                      freedom through innovative solutions, education, and
                      personalized guidance.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 dark:bg-blue-800/30">
                      <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold">Our Vision</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      To be the most trusted financial partner for our clients,
                      known for our integrity, innovation, and exceptional
                      service.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-center mb-8">
                Our Core Values
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {["Integrity", "Innovation", "Excellence", "Empowerment"].map(
                  (value, i) => (
                    <Card key={i}>
                      <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 dark:bg-blue-800/30">
                          <span className="text-lg font-bold text-blue-600">
                            {i + 1}
                          </span>
                        </div>
                        <h4 className="font-bold">{value}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {
                            {
                              Integrity:
                                "We act with honesty and transparency in all our interactions.",
                              Innovation:
                                "We continuously seek new ways to improve our services and solutions.",
                              Excellence:
                                "We strive for excellence in everything we do.",
                              Empowerment:
                                "We empower our clients with knowledge and tools.",
                            }[value]
                          }
                        </p>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Send Us a Message Section */}
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-50'>
      <div className='container px-4 md:px-6 max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold mb-6'>Send Us a Message</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid gap-4 sm:grid-cols-2'>
            {/* Name Field */}
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Name
              </label>
              <input
                id='name'
                {...register('name', { required: 'Name is required' })}
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className='text-sm text-red-500'>{errors.name.message}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              id='email'
              type='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor='phone'
              className='block text-sm font-medium text-gray-700'
            >
              Phone
            </label>
            <input
              id='phone'
              type='tel'
              {...register('phone')}
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone && (
              <p className='text-sm text-red-500'>{errors.phone.message}</p>
            )}
          </div>

          {/* Inquiry Type (Radio Group) */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              What can we help you with?
            </label>
            <div className='grid gap-2 sm:grid-cols-3'>
              {[
                'investment',
                'retirement',
                'tax',
                'estate',
                'business',
                'other',
              ].map((value) => (
                <div key={value} className='flex items-center space-x-2'>
                  <input
                    type='radio'
                    id={value}
                    {...register('inquiryType')}
                    value={value}
                    className='focus:ring-2 focus:ring-blue-500'
                  />
                  <label
                    htmlFor={value}
                    className='text-sm font-medium text-gray-700'
                  >
                    {value[0].toUpperCase() + value.slice(1)}
                  </label>
                </div>
              ))}
            </div>
            {errors.inquiryType && (
              <p className='text-sm text-red-500'>
                {errors.inquiryType.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor='message'
              className='block text-sm font-medium text-gray-700'
            >
              Message
            </label>
            <textarea
              id='message'
              className='min-h-[120px] w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              {...register('message', { required: 'Message is required' })}
            />
            {errors.message && (
              <p className='text-sm text-red-500'>{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className='text-center'>
            <Button
              type='submit'
              className='w-full sm:w-auto h-11 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-lg hover:from-indigo-700 hover:to-purple-700'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <p className='text-blue-600 text-sm mt-2'>
              Message sent successfully! Check your email.
            </p>
          )}
        </form>
      </div>
    </section>
      </main>
    </div>
  );
};

export default Contact;
