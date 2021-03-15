import React from "react"
import { RouterContext } from "./RouterContext"

// simply call the push function from the router context when clicked
export default function Link({ to, children }) {
    const { push } = React.useContext(RouterContext);
  
    function handleClick(e) {
      e.preventDefault();
      push(to);
    }
  
    return (
      <a href={to} onClick={handleClick}>
        {children}
      </a>
    );
  }