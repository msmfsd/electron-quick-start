// our custom request module
import React from 'react';
import Events from './events';
//The remote module provides a simple way to do inter-process communication
// (IPC) between the renderer process (web page) and the main process.
// In Electron, GUI-related modules (such as dialog, menu etc.) are only
// available in the main process, not in the renderer process. In order to use
// them from the renderer process, the ipc module is necessary to send
// inter-process messages to the main process.
const request = remote.require('request');
class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: null, method: 'GET' };
  }
  handleChange = (e) => {
    const state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  makeRequest = () => {
    // now we can use npm request module
    request(this.state, (err, res, body) => {
      const statusCode = res ? res.statusCode : 'No response';
      const result = {
        response: `(${statusCode})`,
        raw: body ? body : '',
        headers: res ? res.headers : [],
        error: err ? JSON.stringify(err, null, 2) : ''
      };
      Events.emit('result', result);
      new Notification(`HTTP response finished: ${statusCode}`)
    });
  }
  render() {
    return (
      <div className="request">
        <h1>Request</h1>
        <div className="request-options">
          <div className="form-row">
            <label>URL</label>
            <input
              name="url"
              type="url"
              value={this.state.url}
              onChange={this.handleChange} />
          </div>
          <div className="form-row">
            <label>Method</label>
            <input
              name="method"
              type="text"
              value={this.state.method}
              placeholder="GET, POST, PATCH, PUT, DELETE"
              onChange={this.handleChange} />
          </div>
          <div className="form-row">
            <a className="btn" onClick={this.makeRequest}>Make request</a>
          </div>
        </div>
      </div>
    );
  }
}
export default Request;
