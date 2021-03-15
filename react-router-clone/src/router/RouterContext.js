import React from "react"

export const RouterContext = React.createContext({
    // string of the current location
    location: "",
    // function which can be called to change the current path
    push: () => {},
});