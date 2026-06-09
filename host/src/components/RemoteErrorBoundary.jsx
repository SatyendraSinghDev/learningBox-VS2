import React from "react";
import ErrorFallback from "./ErrorFallback";

export default class RemoteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          name={this.props.name}
          onRetry={() => this.setState({ hasError: false })}
        />
      );
    }

    return this.props.children;
  }
}
