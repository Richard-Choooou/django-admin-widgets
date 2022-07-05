import { Component, Prop, h, State } from '@stencil/core';

@Component({
  tag: 'my-component-1',
  shadow: true,
})
export class Uploader {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  @State() count = 1

  timer: number;

  connectedCallback() {
    this.timer = window.setInterval(() => {            
        // the assignment to `this.currentTime`
        // will trigger a re-render
        // console.log(111111)
        this.count = Date.now();
    }, 1000);
}

  private getText(): string {
    return this.count + ""
  }

  addCount = () => {
    this.count += 1
  }

  render() {
    return <div onClick={this.addCount}>Hello, World! I'm component1 {this.count}, {this.first}</div>;
  }
}