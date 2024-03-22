import axios from "axios";
import React, { useState } from "react";

export default function AppFunctional(props) {
  const [index, setIndex] = useState(4);
  const [steps, setSteps] = useState(0);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  // Koordinatların hesaplanması
  const calculateCoordinates = () => {
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return `(${x}, ${y})`;
  };

  // reset
  const reset = () => {
    setIndex(4);
    setSteps(0);
    setMessage("");
    setEmail("");
  };

  //hareketler
  /*
  0 | 1 | 2
  ---------
  3 | 4 | 5
  ---------
  6 | 7 | 8
  */
  const move = (direction) => {
    let newIndex = index;
    switch (direction) {
      case "up":
        newIndex = index - 3 >= 0 ? index - 3 : index;
        break;
      case "down":
        newIndex = index + 3 < 9 ? index + 3 : index;
        break;
      case "left":
        newIndex = index % 3 !== 0 ? index - 1 : index;
        break;
      case "right":
        newIndex = index % 3 !== 2 ? index + 1 : index;
        break;
      default:
        break;
    }
    //gridde yeni pozisyon
    if (newIndex !== index) {
      setIndex(newIndex);
      setSteps(steps + 1);
      setMessage("");
    } else {
      setMessage(`You can't go ${direction}`);
    }
  };

  //e-mail input
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Ouch: email is required");
      return;
    }

    if (email === "foo@bar.baz") {
      setMessage("foo@bar.baz failure #71");
      return;
    }

    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    const payload = {
      x: x,
      y: y,
      steps: steps,
      email: email,
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/api/result",
        payload
      );
      console.log(payload);

      const emailName = email.split("@")[0];
      setMessage(`${emailName} win`);
    } catch (error) {
      console.warn("Unprocessable Entity", error);
    }
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar: {calculateCoordinates()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => move("left")}>
          SOL
        </button>
        <button id="up" onClick={() => move("up")}>
          YUKARI
        </button>
        <button id="right" onClick={() => move("right")}>
          SAĞ
        </button>
        <button id="down" onClick={() => move("down")}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          value={email}
          onChange={handleChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
