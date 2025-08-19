import { ROUTES } from "@shared/lib/router";
import { NavLink } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <NavLink
        to={ROUTES.SUBMIT}
        className="text-xl font-medium hover:underline"
      >
        Submit
      </NavLink>
    </div>
  );
};

export default HomePage;
