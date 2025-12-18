// components/BlogDetailsPage.jsx
"use client";
import Image from "next/image";
import React from "react";

export default function BlogDetailsPage() {
  // Mock blog data (replace with real data from API later)
  const blog = {
    id: 1,
    title: "The Art of Wine Pairing: How to Elevate Every Meal",
    author: "Martin Frank",
    date: "1888", // In your example, this seems symbolic — you can replace with actual date
    image: "/images/tradition.png", // Replace with your actual image path
    excerpt:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    content: [
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.",
      "The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32. Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.",
    ],
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Image */}
        <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            fill
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-abhaya font-extrabold text-[#000000] mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-sm md:text-base text-[#968F8F] font-normal">
            <span className="items-center  flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="12"
                viewBox="0 0 11 12"
                fill="none"
              >
                <path
                  d="M0 9.78535C0 9.51459 0.00893997 9.25022 0.0268199 8.99224C0.0446999 8.73426 0.0804598 8.45584 0.1341 8.15699C0.187739 7.85814 0.255428 7.581 0.337165 7.32558C0.418902 7.07015 0.528736 6.82111 0.666667 6.57845C0.804598 6.33579 0.962963 6.1289 1.14176 5.95776C1.32056 5.78662 1.53895 5.64997 1.79693 5.5478C2.05492 5.44563 2.33972 5.39454 2.65134 5.39454C2.69732 5.39454 2.8046 5.44946 2.97318 5.55929C3.14176 5.66913 3.33206 5.79173 3.54406 5.92711C3.75607 6.06248 4.03193 6.18509 4.37165 6.29492C4.71137 6.40476 5.05236 6.45967 5.39464 6.45967C5.73691 6.45967 6.07791 6.40476 6.41762 6.29492C6.75734 6.18509 7.03321 6.06248 7.24521 5.92711C7.45722 5.79173 7.64751 5.66913 7.81609 5.55929C7.98467 5.44946 8.09195 5.39454 8.13793 5.39454C8.44955 5.39454 8.73435 5.44563 8.99234 5.5478C9.25032 5.64997 9.46871 5.78662 9.64751 5.95776C9.82631 6.1289 9.98467 6.33579 10.1226 6.57845C10.2605 6.82111 10.3704 7.07015 10.4521 7.32558C10.5338 7.581 10.6015 7.85814 10.6552 8.15699C10.7088 8.45584 10.7446 8.73426 10.7625 8.99224C10.7803 9.25022 10.7893 9.51459 10.7893 9.78535C10.7893 10.3984 10.6028 10.8824 10.2299 11.2375C9.85696 11.5925 9.36143 11.77 8.74329 11.77H2.04598C1.42784 11.77 0.932312 11.5925 0.559387 11.2375C0.186462 10.8824 0 10.3984 0 9.78535ZM3.31418 5.02289C3.31418 5.02289 3.1705 4.87922 2.88314 4.59186C2.59579 4.3045 2.45211 3.75469 2.45211 2.94243C2.45211 2.13017 2.73946 1.43669 3.31418 0.861974C3.88889 0.287261 4.58238 -9.53674e-05 5.39464 -9.53674e-05C6.2069 -9.53674e-05 6.90038 0.287261 7.4751 0.861974C8.04981 1.43669 8.33716 2.13017 8.33716 2.94243C8.33716 3.75469 8.04981 4.44818 7.4751 5.02289C6.90038 5.59761 6.2069 5.88496 5.39464 5.88496C4.58238 5.88496 3.88889 5.59761 3.31418 5.02289Z"
                  fill="#968F8F"
                />
              </svg>{" "}
              {blog.author}
            </span>
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M0.286069 7.88545C0.183898 7.70665 0.132812 7.53041 0.132812 7.35671C0.132812 7.18302 0.183898 7.00678 0.286069 6.82798C1.00127 5.65812 1.96295 4.71815 3.17113 4.00806C4.3793 3.29797 5.65516 2.94292 6.99871 2.94292C8.34226 2.94292 9.61812 3.29797 10.8263 4.00806C12.0345 4.71815 12.9962 5.65812 13.7114 6.82798C13.8135 7.00678 13.8646 7.18302 13.8646 7.35671C13.8646 7.53041 13.8135 7.70665 13.7114 7.88545C12.9962 9.06042 12.0345 10.0017 10.8263 10.7092C9.61812 11.4167 8.34226 11.7705 6.99871 11.7705C5.65516 11.7705 4.3793 11.4155 3.17113 10.7054C1.96295 9.99528 1.00127 9.05531 0.286069 7.88545ZM1.11366 7.35671C1.79309 8.40397 2.64495 9.23794 3.66921 9.85863C4.69348 10.4793 5.80331 10.7897 6.99871 10.7897C8.19411 10.7897 9.30395 10.4793 10.3282 9.85863C11.3525 9.23794 12.2043 8.40397 12.8838 7.35671C12.1073 6.1511 11.1341 5.24943 9.96423 4.65173C10.2759 5.18302 10.4317 5.75774 10.4317 6.37587C10.4317 7.32095 10.0958 8.12938 9.424 8.80116C8.75222 9.47293 7.9438 9.80882 6.99871 9.80882C6.05363 9.80882 5.2452 9.47293 4.57343 8.80116C3.90165 8.12938 3.56576 7.32095 3.56576 6.37587C3.56576 5.75774 3.72157 5.18302 4.0332 4.65173C2.86334 5.24943 1.89016 6.1511 1.11366 7.35671ZM4.66921 6.37587C4.66921 6.47804 4.70497 6.56489 4.77649 6.63641C4.84801 6.70793 4.93486 6.74369 5.03703 6.74369C5.1392 6.74369 5.22604 6.70793 5.29756 6.63641C5.36908 6.56489 5.40484 6.47804 5.40484 6.37587C5.40484 5.93654 5.56065 5.56106 5.87228 5.24943C6.1839 4.93781 6.55938 4.782 6.99871 4.782C7.10088 4.782 7.18773 4.74624 7.25925 4.67472C7.33077 4.6032 7.36653 4.51636 7.36653 4.41419C7.36653 4.31202 7.33077 4.22517 7.25925 4.15365C7.18773 4.08213 7.10088 4.04637 6.99871 4.04637C6.36014 4.04637 5.81225 4.27498 5.35503 4.73219C4.89782 5.18941 4.66921 5.7373 4.66921 6.37587Z"
                  fill="#968F8F"
                />
              </svg>
            </span>
            <span>{blog.date}</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none text-[#968F8F] font-normal leading-relaxed space-y-6">
          {/* Excerpt */}
          <p className="italic text-base md:text-lg">{blog.excerpt}</p>

          {/* Full Content */}
          {blog.content.map((paragraph, index) => (
            <p key={index} className="text-base md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
