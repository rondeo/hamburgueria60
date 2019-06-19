import autobind from 'autobind-decorator';
import { debounce } from 'lodash';
import { Component } from 'react';

export default class Resizer extends Component {
  constructor(props) {
    super(props);

    this.update = debounce(this.update, 250);
  }

  componentDidMount() {
    window.addEventListener('resize', this.update);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.update);
  }

  @autobind
  update() {
    this.forceUpdate();
  }

  render() {
    const { children } = this.props;
    return children();
  }
}
