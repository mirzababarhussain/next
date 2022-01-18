import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRef, useState } from "react";
export default function Home() {
  const [feeditems, setFeedItems] = useState([]);
  const email = useRef();
  const feedback = useRef();
  function submitHandler(event) {
    event.preventDefault();
    const enteredemail = email.current.value;
    const enteredfeedback = feedback.current.value;
    const reqbody = { email: enteredemail, feedback: enteredfeedback };
    fetch("api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reqbody }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function getFeedBacks() {
    fetch("api/feedback")
      .then((response) => response.json())
      .then((data) => {
        setFeedItems(data.feedback);
      });
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>API Practices</h1>

        <form onSubmit={submitHandler}>
          <p>Enter Your Email</p>
          <input type="email" id="email" ref={email} />
          <p>Enter Feedback</p>
          <textarea id="feedback" ref={feedback}></textarea>
          <p>
            <button>Send Now</button>
          </p>
        </form>
        <button onClick={() => getFeedBacks()}>
          Load Feedback List from API
        </button>
        <ul>
          {feeditems.map((item) => (
            <li key={item.id}>
              {item.email}
              <br />
              {item.feedback}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
