import React, { useEffect, useCallback } from "react"
import { RouterContext } from "./RouterContext"



// will provide information about the current route and provide ways to manipulate it.
export default function Router({ children }) {

    // when we update the location our component will re-render
    const [location, setLocation] = React.useState(window.location.pathname);
  
    // update the browser location and update our location state
    const handlePush = useCallback(
      (newLocation) => {
        window.history.pushState({}, "", newLocation);
        setLocation(newLocation);
      },
      []
    );
  
    const handleHashChange = useCallback(() => {
      setLocation(window.location.pathname);
    }, []);
  
    // listen for the window 'popstate' event to update our location when using the browser navigation buttons
    useEffect(() => {
      window.addEventListener("popstate", handleHashChange);
      return () => window.removeEventListener("popstate", handleHashChange);
    }, [handleHashChange]);
  
    return (
      <RouterContext.Provider value={{ location, push: handlePush }}>
        {children}
      </RouterContext.Provider>
    );
}