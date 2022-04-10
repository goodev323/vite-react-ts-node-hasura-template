import { Component, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  error?: Error;
};

export class ErrorBoundary extends Component<Props> {
  state: State = {};

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    console.log(error);
    return this.props.children;
  }
}
