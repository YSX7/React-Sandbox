import { Button } from "@chakra-ui/react";
import React from "react";
import MyButton from "./UI/button/MyButton";

interface ClassCounterProp {
  count: number;
}

class ClassCounter extends React.Component<{}, ClassCounterProp> {
  constructor(props = {}) {
    super(props);
    this.state = { count: 0 };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <MyButton onClick={this.increment}>+</MyButton>
        <MyButton onClick={this.decrement}>-</MyButton>
      </div>
    );
  }
}

export default ClassCounter;
