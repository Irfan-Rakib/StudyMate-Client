import React from "react";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Aisha Rahman",
      review:
        "StudyMate helped me connect with amazing peers and stay motivated during exam prep!",
      image: "https://i.ibb.co/7V0k1qz/profile1.jpg",
    },
    {
      id: 2,
      name: "Rafiul Islam",
      review:
        "I’ve improved my grades by working with study partners I found here!",
      image: "https://i.ibb.co/0nFz9Ff/profile2.jpg",
    },
    {
      id: 3,
      name: "Mehjabin Khan",
      review: "Great community and platform for focused learners!",
      image: "https://i.ibb.co/5TjZfB2/profile3.jpg",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
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
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
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
