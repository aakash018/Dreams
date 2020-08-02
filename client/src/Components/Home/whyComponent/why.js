import React from "react";
import "./why.css";
import Heading from "../../ReusableComponents/Heading/heading";

function Why({ getPosition }) {
  return (
    <div className="whyContainer">
      <div className="why_dream_journal">
        <section className="why_title">
          <Heading title="Why You Should Keep a Dream Journal ?" />
        </section>
        <section className="why_journal_desc">
          <p>
            You might not have given as much thought to is keeping a dream
            journal. Sure, it might be fun to be able to recall your dreams in
            greater detail, but what other purposes does a dream journal really
            serve?
          </p>
          <br />
          <ul>
            <li>Process Your Emotions</li>
            <li>Fuel Your Creativity </li>
            <li>Learn to Overcome Anxiety</li>
            <li>Interpreting Your Dreams Is Fun</li>
          </ul>
        </section>
        <section className="why_title">
          <Heading title="What is Dreams ? " />
        </section>
        <section className="what_is_desc">
          <p>
            Dreams is a Web App that lets you make a journal and keep track of
            your dreams more effectively. SignUp today and start to explor
            wonderous worlds of your dreams.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Why;
