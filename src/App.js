import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
// import InputBase from '@material-ui/core/InputBase';
// import SearchIcon from '@material-ui/icons/Search';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { css } from 'glamor';
// import IconButton from '@material-ui/core/IconButton';


class App extends React.Component{

  constructor(props) {
        super(props);
          this.state = {
            imageURL: '',
            picture: {},
            uploadInput: null,
            results: null
          };
         // this.onDrop = this.onDrop.bind(this);
         this.change = this.change.bind(this);
         this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    change(e){
      console.log("Change", e);
      // var file = this.refs.file.files[0];
      var reader = new FileReader();
      this.render();
      // var url = reader.readAsDataURL(file);
    }

  // // When a picture is uploaded
  // onDrop(new_picture) {
  //     // Set the picture
  //     this.setState({
  //         picture: new_picture,
  //     });
  //
  //     console.log(new_picture);

  // }

  handleUploadImage(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    // data.append('filename', this.fileName.value);

    fetch('https://traffic-stage.herokuapp.com/upload', {
      method: 'PUT',
      body: data
    }).then((response) => {
      response.json().then((data) => {
        this.setState({
          results: data
        });
      });
      // response.json().then((body) => {
      //   this.setState({ imageURL: `http://localhost:8000/${body.file}` });
      // });
    });
  }


  render(){
    console.log("Render app", this.state.results);
    let results;
    if (this.state.results){
      results = <div>
          <h3>Prediction...</h3>
          {this.state.results[0][0].replace('_', ' ')}
          </div>
    }
    else{
      results = <p></p>
    }

    return(
      <div>
        <h1>Traffic Sign Recognition</h1>
        <h3> Currently Supports... </h3>
        <div>
            <img src={ require('./Images/stop.png') } alt='Stop' width='50' height='50'/>
            <img src={ require('./Images/oneway.png') } alt='One Way'width='50' height='50'/>
            <img src={ require('./Images/park.png') } alt='Handicap Parking'width='50' height='50'/>
            <img src={ require('./Images/do_not_enter.png') } alt='Do Not Enter'width='50' height='50'/>
            <img src={ require('./Images/pedestrian_crossing.png') } alt='Pedestrian'width='50' height='50'/>
            <img src={ require('./Images/RR2.png') } alt='Rail Road'width='50' height='50'/>
            <img src={ require('./Images/rw.png') } alt='Road Work'width='50' height='50'/>
            <img src={ require('./Images/yield.png') } alt='Yield'width='50' height='50'/>
        </div>

        <br />
        <br />

        <div>
          <h3>Upload an image to classify it</h3>
          <input onChange={this.change} ref={(ref) => { this.uploadInput = ref; }} type="file" />
          <Button onClick={this.handleUploadImage} variant="contained" size="medium" >Classify</Button>
        </div>

        <br />
        <br />

        <div>
          {results}
        </div>

      </div>
    )
  }
}
// <img src={ require('stop_sign_copy.png') } />
//           <img src='./stop_sign_copy.png' alt="img" />


// <img src={this.state.imageURL} alt="img" />
// App.configure(() => {
//   var cors = require('cors');
//   App.use(cors());
// })
export default App;
