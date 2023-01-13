import ContactEntry from "./ContactEntry";
import classes from "./ContactList.module.scss";

const ContactList = () => {
  return (
    <section className={`${classes['contact-list']}`}>
      <div className={classes.container}>

        <div className={classes['top-functions']}>
          <div className={classes.head}>
            <h1>Chats</h1>
            <button className={`btn btn--dark`}>New Chat</button>
          </div>
          <input type="text" placeholder="Search" className={`input`} />
        </div>

        <div className={classes['chat-contacts']}>
          <ul>
            <ContactEntry />
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ContactList;