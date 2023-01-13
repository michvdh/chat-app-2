import classes from "./SideNav.module.scss";

const SideNav = () => {
  return (
    <section className={`${classes['side-nav']}`}>
      <div className={`${classes.container}`}>
        <button className={`btn btn--dark`}>Account</button>
        <button className={`btn btn--dark`}>Logout</button>
      </div>
    </section>
  )
}

export default SideNav;