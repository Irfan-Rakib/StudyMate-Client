import React from "react";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Aisha Rahman",
      review:
        "StudyMate helped me connect with amazing peers and stay motivated during exam prep!",
      image:
        "https://plus.unsplash.com/premium_photo-1661766386981-1140b7b37193?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Rafiul Islam",
      review:
        "I’ve improved my grades by working with study partners I found here!",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
      id: 3,
      name: "Mehjabin Khan",
      review: "Great community and platform for focused learners!",
      image:
        "https://cdn.pixabay.com/photo/2024/01/30/02/58/ai-generated-8541133_640.png",
    },
  ];

  return (
    <section className="py-20 ">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2
          className="text-3xl  font-bold text-[#4A7BA8] mb-10"
          data-aos="fade-down"
        >
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className="border  border-gray-200  p-6 rounded-md shadow-xl hover:shadow-lg transition"
              data-aos="fade-up"
              data-aos-delay={i * 200}
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 mb-3">“{review.review}”</p>
              <h4 className="font-semibold text-[#A88647]">{review.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
