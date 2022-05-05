import React from "react";
import Card from "../shared/Card";
import { Link } from "react-router-dom";
function About() {
  return (
    <Card>
      <div className="about">
        <h1>Abut this Project</h1>
        <p>this is a React app </p>
        <p>
          <Link to={{ pathname: "/" }}>Back To Home</Link>
        </p>
      </div>
    </Card>
  );
}

export default About;
