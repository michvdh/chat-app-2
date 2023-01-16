import classes from "./SideNav.module.scss";
import { useRouter } from "next/router";

const SideNav = () => {
  const router = useRouter();

  const logoutHandler = () => {
    localStorage.removeItem("chat-app-user");
    router.push('/login');
  }

  return (
    <section className={`${classes['side-nav']}`}>
      <div className={`${classes.container}`}>
        {/* <button className={`btn btn--dark`}>Account</button> */}
        <button className={`btn btn--dark`} onClick={logoutHandler}>Logout</button>
      </div>
    </section>
  )
}

export default SideNav;