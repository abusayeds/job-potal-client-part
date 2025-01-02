import React from "react";
import Container from "../Container";

const TheirWords = () => {
  const messages = [
    {
      text: "I had the best pilates instructor ever thanks to R8 my trainers! It's incredible how much of a difference the right trainer can make.",
      name: "Mollira",
    },
    {
      text: "I love how easy it is to find top-notch boxing coaches through R8 my trainers. The reviews are so helpful!",
      name: "Jenni",
    },
    {
      text: "R8 my trainers helped me discover the most amazing yoga studio. I'm grateful for this platform!",
      name: "Willium",
    },
  ];
  return (
    <Container className="">
      <h3 className=" text-2xl md:text-3xl lg:text-5xl font-semibold font-syne text-center text-primary">
        In Their Words
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center mt-8 lg:mt-10">
        {messages.map((message, index) => (
          <div
            key={index}
            className="bg-foreground h-full flex flex-col justify-between px-14 py-12 space-y-6 rounded-lg max-w-[420px] drop-shadow-md"
          >
            <div className="relative px-2">
              <p className="leading-7"> {message.text} </p>
              <svg className="absolute top-0 -left-5"
                width="24"
                height="18"
                viewBox="0 0 24 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.8191 13.2473C23.7691 8.71689 20.7642 7.39036 18.7574 7.52078C18.5585 7.5337 18.3966 7.34136 18.4704 7.14666C18.8461 6.15642 19.7729 4.61898 21.4023 4.05968C23.2915 3.41114 22.3469 1.98796 21.6384 1.35744C20.4239 0.276543 16.0872 1.42932 13.8452 7.84284C10.5389 17.3005 21.4025 20.003 22.8191 13.2473Z"
                  stroke="black"
                  strokeLinecap="round"
                />
                <path
                  d="M10.5969 13.2473C11.5469 8.71689 8.54202 7.39036 6.53514 7.52078C6.33624 7.5337 6.17434 7.34136 6.24821 7.14666C6.62389 6.15642 7.55069 4.61898 9.18003 4.05968C11.0693 3.41114 10.1247 1.98796 9.41619 1.35744C8.20166 0.276543 3.86498 1.42932 1.62294 7.84284C-1.68329 17.3005 9.18024 20.003 10.5969 13.2473Z"
                  stroke="black"
                  strokeLinecap="round"
                />
              </svg>
              <svg
              className="absolute bottom-0 right-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.18088 7.75268C0.230859 12.2831 3.23576 13.6096 5.24264 13.4792C5.44154 13.4663 5.60343 13.6586 5.52957 13.8533C5.15388 14.8436 4.22708 16.381 2.59775 16.9403C0.708474 17.5889 1.65311 19.012 2.36159 19.6426C3.57612 20.7235 7.9128 19.5707 10.1548 13.1572C13.4611 3.69945 2.59754 0.997004 1.18088 7.75268Z"
                  stroke="black"
                  strokeLinecap="round"
                />
                <path
                  d="M13.4031 7.75268C12.4531 12.2831 15.458 13.6096 17.4649 13.4792C17.6638 13.4663 17.8257 13.6586 17.7518 13.8533C17.3761 14.8436 16.4493 16.381 14.82 16.9403C12.9307 17.5889 13.8753 19.012 14.5838 19.6426C15.7983 20.7235 20.135 19.5707 22.3771 13.1572C25.6833 3.69945 14.8198 0.997004 13.4031 7.75268Z"
                  stroke="black"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h5 className="text-xl font-medium text-primary">
              -{message.name}
            </h5>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TheirWords;
