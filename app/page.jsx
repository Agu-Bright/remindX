import React from "react";
import Feed from "@components/Feeds";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Stay on Schedule with Personalized
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> SMS Reminders!</span>
      </h1>
      <p className="desc text-center">
        Our application, powered by the novu API, revolutionizes the way you
        manage appointments and events. With customizable scheduling options,
        personalized SMS reminders, and seamless two-way communication, it
        ensures you stay organized and never miss a beat. Experience the ease
        and efficiency of our SMS notification system and stay on top of your
        schedule effortlessly.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
