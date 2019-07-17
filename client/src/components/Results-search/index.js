import React from "react";
import { Link } from "react-router-dom";

function resultsSeach(props) {
  return (
    <div className="text-center">
      <img alt={props.title} className="img-fluid" src={props.thumbnail} style={{ margin: "0 auto" }} />
      <h3>Title: {props.title}</h3>
      <h4>Auther(s): {props.auther}</h4>
      <p>Description: {props.description}</p>
      {/* <Link to={props.previewLink}>More Info</Link> */}
    </div>
  );
}

export default resultsSeach;