import { Fragment, useState, useEffect, useRef } from "react";
import classes from "./ChatMain.module.scss";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import axios from "axios";
import { getMessagesRoute, sendMessageRoute } from "@/pages/api/APIRoutes";
import {v4 as uuidv4} from "uuid";
// import dynamic from 'next/dynamic';

const ChatMain = ({ currentUser, currentChat, socket }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messagesFromDB, setMessagesFromDB] = useState([]);
  const [initialRender, setInitialRender] = useState(true);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  // const Picker = dynamic(
  //   () => {
  //     return import('emoji-picker-react');
  //   },
  //   { ssr: false }
  // );

  const emojiPickerDisplayHandler = () => {
    setShowEmojiPicker((prevState) => {
      return !prevState;
    });
  };

  const emojiClickHandler = (emojiData, event) => {
    let msg = message;
    msg += emojiData.emoji;
    setMessage(msg);
  };

  const changeHandler = (e) => {
    setMessage(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (message.length > 0) {
      await sentMessageHandler(message);
      setMessage("");
    }
  };

  const sentMessageHandler = async (msg) => {

    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg
    });

    const msgs = [...messagesFromDB];
    msgs.push({
      fromSelf:true,
      message: msg
    });
    setMessagesFromDB(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-received", (msg) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg
        });
      });
    }
  }, []);


  useEffect(() => {
    arrivalMessage && setMessagesFromDB((prev) => ( [...prev, arrivalMessage] ));
  }, [arrivalMessage]);


  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behaviour: "smooth"
    })
  }, [messagesFromDB])


  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    }

    if (!initialRender && currentChat) {
      const getMessages = async () => {
        const res = await axios.post(getMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });

        setMessagesFromDB(res.data);
      };

      getMessages();
    }
  }, [currentChat]);


  return (
    <Fragment>
      <section className={classes["chat-main"]}>
        <div className={classes.container}>
          <div className={classes["chat-messages"]}>
            {messagesFromDB.map((msg, index) => {
              return (
                <div ref={scrollRef} key={uuidv4()} className={`${classes['msg--row']} ${
                  msg.fromSelf
                    ? classes["sent-by-you"]
                    : classes["received-by-you"]
                }`}>
                  <div
                    className={`${classes.msg}`}
                  >
                    <p className={classes.content}>
                      {msg.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={classes["chat-input"]}>
        <div className={classes.container}>
          <div className={classes["emoji-container"]}>
            <BsEmojiSmileFill
              className={`icon icon--yellow`}
              onClick={emojiPickerDisplayHandler}
            />
            {showEmojiPicker && (
              <EmojiPicker onEmojiClick={emojiClickHandler} />
            )}
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
