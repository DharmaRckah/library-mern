import React, { useEffect, useState } from "react";
import "./LoaderHand.css";

const LoaderHand = () => {
	const [loading, setLoading] = useState(true);

	// This runs when the component mounts and waits for 3 seconds before showing the content
	useEffect(() => {
	  const timer = setTimeout(() => {
		setLoading(false);
	  }, 3000);
	  return () => clearTimeout(timer); // Clean up the timer when the component unmounts
	}, []);
  return (
	<div className="divbody" style={{ margin: 0 }}>
      {loading ? (
        <div id="loader"></div>
      ) : (
        <div id="myDiv" className="animate-bottom">
          <h1>Peekaboo!</h1>
          <p>I see you!</p>
        </div>
      )}
    </div>
  );
};

export default LoaderHand;
