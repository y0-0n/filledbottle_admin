export function handleState(e) {
    let {data} = this.state;
    data[e.target.name] = e.target.value
    this.setState({data});
  }