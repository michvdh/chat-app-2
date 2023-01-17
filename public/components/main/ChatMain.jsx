import { Fragment, useState, useEffect } from "react";
import classes from "./ChatMain.module.scss";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import axios from "axios";
import { sendMessageRoute } from "@/pages/api/APIRoutes";
// import dynamic from 'next/dynamic';

const ChatMain = ({ currentUser, currentChat }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // const Picker = dynamic(
  //   () => {
  //     return import('emoji-picker-react');
  //   },
  //   { ssr: false }
  // );

  const emojiPickerDisplayHandler = () => {
    setShowEmojiPicker((prevState) => {return !prevState});
  } 

  const emojiClickHandler = (emojiData, event) => {
    let msg = message;
    console.log(emojiData);
    msg += emojiData.emoji;
    setMessage(msg);
  }

  const changeHandler = (e) => {
    setMessage(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (message.length > 0) {
      await sentMessageHandler(message);
      setMessage('');
    }
  };

  const sentMessageHandler = async (msg) => {
    console.log(msg);
    console.log(currentUser._id);
    console.log(currentChat._id);
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg
    });
  }



  return (
    <Fragment>
      <section className={classes["chat-main"]}>
        <div className={classes.container}>
          <div className={classes["chat-messages"]}></div>
        </div>
      </section>

      <section className={classes["chat-input"]}>
        <div className={classes.container}>
          <div className={classes['emoji-container']}>
            <BsEmojiSmileFill 
              className={`icon icon--yellow`}
              onClick={emojiPickerDisplayHandler}
            />
            {showEmojiPicker && <EmojiPicker onEmojiClick={emojiClickHandler} /> }
          </div>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              value={message}
              onChange={changeHandler}
              placeholder="Aa"
              className={`input`}
            />
            <button type="submit" className={`btn btn--dark`}>
              <IoMdSend className={`icon icon--white`} />
            </button>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

export default ChatMain;
