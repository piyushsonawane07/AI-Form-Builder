import React from "react";

function Hero() {
  return (
    <div>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[700]">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl text-primary font-extrabold sm:text-5xl">
            Next-Gen Form with AI
              <strong className="font-extrabold text-[#1DACE3] sm:block mt-2">
                {" "}
                Smarter & <span className="font-extrabold text-[#E9327C]">Faster.</span> {" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
            Design intelligent, user-friendly forms in minutes, and watch your conversions soar!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary-700 focus:outline-none focus:ring active:bg-primary-500 sm:w-auto"
                href="#"
              >
                + Create Form
              </a>

              <a
                className="block w-full rounded px-12 py-3 text-sm font-medium text-primary-600 shadow hover:text-primary-700 focus:outline-none focus:ring active:text-primary-500 sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
