import classes from "./ChatInput.module.scss";
import { useState } from "react";

const ChatInput = () => {
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setMessage(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setMessage("");
  };

  return (
    <section className={classes['chat-input']}>
      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
          <input type="text" value={message} onChange={handleChange} placeholder="Aa" className={`input`} />
          <button type="submit" className={`btn btn--dark`}>Send</button>
        </form>
      </div>
    </section>
  );
}

export default ChatInput;