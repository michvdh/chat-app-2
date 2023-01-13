import classes from "./ChatMain.module.scss";

const ChatMain = () => {
  return (
    <section className={classes['chat-main']}>
      <div className={classes.container}>
        <div className={classes['chat-history']}></div>
      </div>
    </section>
  )
}

export default ChatMain;