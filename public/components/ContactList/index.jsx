import ContactEntry from "./ContactEntry";
import classes from "./ContactList.module.scss";
import React, {useState, useEffect} from "react";

const ContactList = ({contacts, currentUser, changeChat}) => {
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  

  // console.log(contacts);

  useEffect(() => {
    if (currentUser) {
      setCurrentUsername(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (contact, index) => {
    setCurrentSelected(index);
    changeChat(contact);
  }

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
            {currentUsername &&
              contacts.map((contact, index) => (
                <ContactEntry 
                  key={index} 
                  className={index === currentSelected ? `${classes.selected}` : ''} 
                  username={contact.username}
                  onClick={() => changeCurrentChat(contact, index)}
                />
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ContactList;