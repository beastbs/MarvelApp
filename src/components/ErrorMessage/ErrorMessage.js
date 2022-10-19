import "./ErrorMessage.scss";

const ErrorMessage = () => {
  return (
    <img
      className="error"
      alt="Error"
      src={process.env.PUBLIC_URL + "/error.gif"}
    />
  );
};

export default ErrorMessage;
