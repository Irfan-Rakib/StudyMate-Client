import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      title: "1. Create Your Profile",
      desc: "Share your study interests, schedule, and experience level.",
    },
    {
      title: "2. Find Compatible Partners",
      desc: "Browse profiles and match with students who share your goals.",
    },
    {
      title: "3. Connect & Collaborate",
      desc: "Start studying together, exchange notes, and track progress.",
    },
  ];

  return (
    <section className="py-20 ">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2
          className="text-3xl  font-bold text-[#4A7BA8] mb-10"
          data-aos="fade-down"
        >
          How It Works
        </h2>
        <div className="grid  md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="p-6 border  border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
              data-aos="zoom-in"
              data-aos-delay={i * 200}
            >
              <h3 className="text-xl font-semibold text-[#A88647] mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
