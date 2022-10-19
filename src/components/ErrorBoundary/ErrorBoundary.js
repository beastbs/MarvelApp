import { Component } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { children } = this.props;
    if (this.state.hasError) {
      return (
        <div>
          <ErrorMessage />
          <h2
            style={{
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Something went wrong, try again
          </h2>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
