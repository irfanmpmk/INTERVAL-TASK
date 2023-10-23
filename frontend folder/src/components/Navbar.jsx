import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bar">
      <Link className="link navyButton" to="/?prio=high">
        <h6>HIGH</h6>
      </Link>
      <Link className="link navyButton" to="/?prio=medium">
        <h6>MEDIUM</h6>
      </Link>
      <Link className="link navyButton" to="/?prio=low">
        <h6>LOW</h6>
      </Link>
      <Link className="link navyButton" to="/">
        <h6>ALL</h6>
      </Link>

      <Link className="link navyButton" to="/NewTask">
        <h5>NEW TASK</h5>
      </Link>
    </div>
  );
};

export default Navbar;
