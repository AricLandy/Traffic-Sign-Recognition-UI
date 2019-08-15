import React from 'react';
import './App.css';
import ImageUploader from 'react-images-upload';
// import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
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
            mageURL: '',
            pictures: []
          };
         this.onDrop = this.onDrop.bind(this);
         this.handleUploadImage = this.handleUploadImage.bind(this);
    }

  // When a picture is uploaded
  onDrop(picture) {
      // Set the picture
      this.setState({
          pictures: this.state.pictures.concat(picture),
      });

      console.log(picture);
  }

  handleUploadImage(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:8000/${body.file}` });
      });
    });
  }


  render(){
    console.log("Render app");
    return(
      <div>
        <h1>Traffic Sign Recognition</h1>
        <p> Currently Supports: Stop Sign, Rail Road Crossing, Yield, One Way, Handicapped Parking, Pedestrian Crossing, Wrong Way</p>
        <ImageUploader
            withIcon={true}
            buttonText='Choose images'
            onChange={this.onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
        />
        <form onSubmit={this.handleUploadImage}>
                <div>
                  <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                </div>
                <div>
                  <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
                </div>
                <br />
                <div>
                  <button>Upload</button>
                </div>
                <img src={this.state.imageURL} alt="img" />
              </form>
        </div>
    )
  }
}

export default App;
