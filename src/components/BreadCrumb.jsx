import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const category = new URLSearchParams(location.search).get("category");

  console.log(pathSegments);
  return (
    <div>
      {/* Home Link */}
      <Link to="/">Home</Link>

      {/* Dynamic Links based on path segments */}
      {pathSegments.map((segment, index) => (
        <span key={segment}>
          {" / "}
          <Link
            className="capitalize"
            to={`/${pathSegments.slice(0, index + 1).join("/")}`}
          >
            {segment}
          </Link>
        </span>
      ))}
      
      {category && <>{" / "}</>}

      {/* Category Link */}
      {category && (
        <Link to={`${location.pathname}?category=${category}`}>{category}</Link>
      )}
    </div>
  );
};

export default Breadcrumb;
