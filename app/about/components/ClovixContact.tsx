"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { useState } from "react";

import { Form, Input, message } from "antd";

const { TextArea } = Input;

const ClovixContact = () => {
  const pathname = usePathname();
  const locationPath = pathname === "/contact";

  const [form] = Form.useForm();
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleToggleSuccessModal = () => {
    setOpenSuccess(!openSuccess);
  };

  //   const onFinish = (values: any) => {
  //     createLead(values, {
  //       onSuccess: () => {
  //         handleToggleSuccessModal();
  //         form.resetFields();
  //       },
  //       onError: () => {
  //         message.error("Something went wrong");
  //       },
  //     });
  //   };

  return (
    <section className="bg-white mx-auto py-8 px-4">
      <div className="container max-w-5xl mx-auto">
        {!locationPath && (
          <div className="w-full mx-auto h-0 outline-1 outline-offset-[-0.50px] outline-stone-300" />
        )}

        <div className={`${!locationPath ? "pt-16" : ""}`}>
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium text-primary">
            Get In Touch with us
          </h2>
          <p className="mt-1 lg:mt-2 text-neutral-700 text-base font-normal">
            Reach out and let us help you plan a seamless and memorable trip.
          </p>
        </div>

        <div className="mx-auto flex gap-32 items-center">
          <div className="w-full">
            <Form
              form={form}
              layout="vertical"
              //   onFinish={onFinish}
              requiredMark={false}
              className="mt-5 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Form.Item
                  label={
                    <span className="text-neutral-700 text-base font-normal font-poppins">
                      Full Name
                    </span>
                  }
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your full name" },
                    {
                      pattern: /^[A-Za-z\s]+$/,
                      message: "Name should only contain alphabets and spaces",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    className="border-gray-300 rounded-md"
                    placeholder="Enter your name"
                    onKeyPress={(e) => {
                      if (!/[A-Za-z\s]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-neutral-700 text-base font-medium">
                      Email Address
                    </span>
                  }
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email address",
                    },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    size="large"
                    className="border-gray-300 rounded-md"
                    placeholder="Enter your email"
                  />
                </Form.Item>
              </div>

              <Form.Item
                label={
                  <span className="text-neutral-700 text-base font-medium">
                    Message
                  </span>
                }
                name="message"
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}
              >
                <TextArea
                  rows={4}
                  className="border-gray-300 rounded-md px-3 py-3 mt-2"
                  placeholder="Write your message..."
                />
              </Form.Item>

              <button
                // disabled={isPending}
                type="submit"
                className="bg-primary rounded-xl text-sm text-white font-medium md:px-8 px-6 py-3 h-auto sm:w-auto w-full"
              >
                {/* {isPending ? "Sending..." : "Send Message"} */}
                Send Message
              </button>
            </Form>
          </div>

          <div className="hidden md:flex relative">
            <Image
              src="/images/contact-bg.svg"
              alt="Contact"
              width={80}
              height={120}
              className="min-w-[280px] rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClovixContact;
