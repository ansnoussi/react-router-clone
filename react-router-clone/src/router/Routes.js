import React, { useContext, useMemo } from "react"
import { RouteContext } from "./RouteContext"
import { RouterContext } from "./RouterContext"

// takes the path prop on a route and converts it into a regex that we can use to match against the current location
function compilePath(path) {
    const keys = [];
  
    path = path.replace(/:(\w+)/g, (_, key) => {
      // give us an array of any keys that represet any params in the path pattern
      keys.push(key);
      return "([^\\/]+)";
    });
  
    const source = `^(${path})`;
  
    const regex = new RegExp(source, "i");
    return { regex, keys };
}

// iterate through each child route and use the compilePath function to test if it matches the current location
function matchRoutes(children, location) {
    const matches = [];
  
    React.Children.forEach(children, (route) => {
      const { regex, keys } = compilePath(route.props.path);
      const match = location.match(regex);
  
      if (match) {
        const params = match.slice(2);
        matches.push({
          route: route.props.children,
          params: keys.reduce((collection, param, index) => {
            collection[param] = params[index];
            return collection;
          }, {}),
        });
      }
    });
  
    return matches[0];
}

  
export default function Routes({ children }) {
    const { location } = useContext(RouterContext);
    const match = useMemo(() => matchRoutes(children, location), [
      children,
      location,
    ]);
  
    // if no routes matched then render null
    if (!match) return null;
  
    return (
      <RouteContext.Provider value={{ params: match.params }}>
        {match.route}
      </RouteContext.Provider>
    );
  }