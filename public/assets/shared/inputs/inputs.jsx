var InputBox = React.createClass({
  inputHandler: function(){
    this.props.onChange(this.refs.input.value);
  },
  componentDidMount: function(){
    this.refs.input.value = this.props.initialValue || '';
  },
  render: function(){
    return (
      <input
        ref="input" type={this.props.type || 'text'}
        placeholder={this.props.placeholder}
        onChange={this.inputHandler}
        style={this.props.style}
      />
    );
  }
});

var InputToggleBox = React.createClass({
  getInitialState: function(){
    return {
      checked: false
    };
  },
  inputHandler: function(){
    this.props.onChange(!this.state.checked);
    this.setState({
      checked: !this.state.checked
    });
  },
  render: function(){
    return (
      <div
        className="input-toggle"
        onClick={this.inputHandler}
        style={this.props.style}
      >
        <span className="label">{this.props.label}</span>
        <span className={'status' + ((this.state.checked)? ' on' : '')}>{(this.state.checked)? 'On' : 'Off'}</span>
      </div>
    );
  }
});

var InputButtonBox = React.createClass({
  render: function(){
    return (
      <div
        className="input-button"
        onClick={this.props.onChange}
        style={this.props.style}
      >
        {this.props.label}
      </div>
    );
  }
});
