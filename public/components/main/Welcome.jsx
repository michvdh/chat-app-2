import classes from "./Welcome.module.scss";

const Welcome = ({currentUser}) => {
  return (
    <div className={classes["welcome"]}>
      <p>
        Welcome, <span>{currentUser.username}</span>
      </p>
      <p>{`Select a friend to start messaging :)`}</p>
    </div>
  );
};

export default Welcome;
