import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

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
      this.render();
    }


  handleUploadImage(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://traffic-stage.herokuapp.com/upload';
    // const url = 'http://0.0.0.0:5000/upload'
    fetch(proxyurl + url, {
      method: 'PUT',
      body: data
    }).then((response) => {
      response.json().then((data) => {
        this.setState({
          results: data
        });
      });
    });
  }


  render(){
    let first, confidence;
    if (this.state.results){

      if (this.state.results[0][1] <= 20000){
        confidence = "Very confident"
      }
      else if (this.state.results[0][1] <= 40000){
        confidence = "Somewhat confident"
      }
      else if (this.state.results[0][1] <= 60000){
        confidence = "Not that confident (does your image have a white background?) \n Taking a picture directy from mobile is also less accurate"
      }
      else {
        confidence = "Not confident at all (does your image have a white background?) \n Taking a picture directy from mobile is also less accurate"
      }


      first = <div>
          <div className='heading capitalize'>Prediction...</div>
          <div className='result'>
            <div className='result-text'>{this.state.results[0][0].split('_')
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' ')}

            <img className='result-image' src={ require(`./Images/${this.state.results[0][0]}.png`) } alt='Prediction'/>
            </div>
          </div>
          Confidence: {confidence}
        </div>

    }
    else{
      first = <p></p>
    }

    return(
      <div className='wrapper'>

        <h1>Traffic Sign Recognition</h1>

        <div className='heading'>About</div>
        <div className='paragraph'>
        The original version of this project was written as a final project for Math 214 (Linear Algebra) at University of Michigan.
        The purpose of this project was to show the power of simple linear algebra calculations.
        </div>

        <div className='heading'>Currently Supports</div>
        <div>
          <img src={ require('./Images/Stop_Sign.png') } alt='Stop' className='example-image'/>
          <img src={ require('./Images/One_Way.png') } alt='One Way' className='example-image'/>
          <img src={ require('./Images/do_not_enter.png') } alt='Do Not Enter' className='example-image'/>
          <img src={ require('./Images/pedestrian_crossing.png') } alt='Pedestrian' className='example-image'/>
          <img src={ require('./Images/Handicap_Parking.png') } alt='Handicap Parking' className='example-image'/>
          <img src={ require('./Images/Rail_Road.png') } alt='Rail Road' className='example-image'/>
          <img src={ require('./Images/Road_Work_Ahead.png') } alt='Road Work' className='example-image'/>
          <img src={ require('./Images/yield.png') } alt='Yield' className='example-image'/>
        </div>

        <div className='heading'>What types of images work?</div>
        <div className='paragraph'>
          The image must be one of the eight signs above.
          The image must also be on a white background, other backgrounds are likely to interfere with the process.
          PNG images are also more likely to classify correctly, other formats may work, but less likely.
        </div>

        <div className='heading'>Upload an image to classify it</div>
        <input onChange={this.change} ref={(ref) => { this.uploadInput = ref; }} type="file" className='upload'/>
        <p></p>
        <Button className='classify-button' onClick={this.handleUploadImage} variant="outlined" size="medium" >Classify</Button>

        <div>
          {first}
        </div>

        <div className='heading'>Learn more about this project</div>
        <div>
          <a href='https://github.com/AricLandy/Traffic-Sign-Recognition-API' style={{ textDecoration: 'none' }}>
            <Button className='button' variant="outlined" size="medium" >View back end code on Github</Button>
          </a>
          &nbsp;
          <a href='https://github.com/AricLandy/Traffic-Sign-Recognition-UI' style={{ textDecoration: 'none' }}>
            <Button className='button' variant="outlined" size="medium" >View front end code on Github</Button>
          </a>
        </div>

      </div>
    )
  }
}

export default App;
