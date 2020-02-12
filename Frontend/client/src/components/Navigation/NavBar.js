import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

function NavBar({ history }) {
  return (
    <div>
      <p onClick={() => history.goBack()}>Back</p>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default withRouter(NavBar);
