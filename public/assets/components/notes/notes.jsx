// tutorial1.js
var NoteBox = React.createClass({
  getInitialState: function(){
    return{
      notes: []
    };
  },
  componentDidMount: function() {
    var folders = {};
    axios.get('/').then(function(res){
      this.setState({
        notes: res.data
      });
      console.log(this.state);
    }.bind(this));
  },
  render: function() {
    return (
      <div className="note-box">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
