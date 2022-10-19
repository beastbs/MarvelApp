import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: 24 }}>
        Page does not exist
      </p>
      <ErrorMessage />
      <Link
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
          fontWeight: "bold",
          fontSize: 24,
          marginTop: 10,
          color: "#9f0013",
        }}
        to="/"
      >
        &#187;Click here to go main page&#171;
      </Link>
    </div>
  );
};

export default Page404;
