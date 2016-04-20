// our custom response module
import React from 'react';
import Events from './events';
import Headers from './headers';
class Response extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: {}, tab: 'body' };
  }
  // NOTE: React lifecycle:
  /*
  initial
  GetDefaultProps
  GetInitialState - this.state
  componentWillMount
  render
  componentDidMount
  -----------------
  UpdatingState
  ..
  -----------------
  UpdatingProps
  ..
  -----------------
  Unmounting
  componentWillUnmount
  */
  componentWillUnmount() {
     Events.removeListener('result', this.handleResult.bind(this));
  }
  componentDidMount() {
    Events.addListener('result', this.handleResult.bind(this));
  }
  handleResult(result) {
    this.setState({ result: result });
  }
  handleSelectTab = (e) => {
    const tab = e.target.dataset.tab;
    this.setState({ tab: tab });
  }
  render() {
    const result = this.state.result;
    const tabClasses = {
      body: this.state.tab === 'body' ? 'active' : null,
      errors: this.state.tab === 'errors' ? 'active' : null,
    };
    return (
      <div className="response">
        <h1>Response <span id="response">{result.response}</span></h1>
        <div className="content-container">
          <div className="content">
            <div id="headers">
              <table className="headers">
                <thead>
                  <tr>
                    <th className="name">Header Name</th>
                    <th className="value">Header Value</th>
                  </tr>
                </thead>
                <Headers headers={result.headers} />
              </table>
            </div>
            <div className="results">
              <ul className="nav">
                <li className={tabClasses.body}>
                  <a data-tab='body' onClick={this.handleSelectTab}>Body</a>
                </li>
                <li className={tabClasses.errors}>
                  <a data-tab='errors' href="#"
      onClick={this.handleSelectTab}>Errors</a>
                </li>
              </ul>
              <div className="raw" id="raw" style={this.state.tab === 'body' ? null :
      {display: 'none'}}>{result.raw}</div>
              <div className="raw" id="error" style={this.state.tab === 'errors' ?
      null : {display: 'none'}}>{result.error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Response;
