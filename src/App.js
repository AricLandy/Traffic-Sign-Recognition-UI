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
    console.log("fetching...", data);
    fetch(proxyurl + url, {
      method: 'PUT',
      body: data
    }).then((response) => {
      console.log("got response");
      response.json().then((data) => {
        this.setState({
          results: data
        });
      });
    });
  }


  render(){
    console.log("Render app", this.state.results);
    let first, confidence, second;
    if (this.state.results){

      if (this.state.results[0][1] <= 20000){
        confidence = "Very confident"
      }
      else if (this.state.results[0][1] <= 40000){
        confidence = "Somewhat confident"
      }
      else if (this.state.results[0][1] <= 60000){
        confidence = "Not that confident (does your image have a white background?)"
      }
      else {
        confidence = "Not confident at all (does your image have a white background?)"
      }


      first = <div>
          <div className='heading capitalize'>Prediction...</div>
          <div className='result'>
            <div className='result-text'>1.&nbsp;{this.state.results[0][0].split('_')
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' ')}&nbsp;

            <img className='result-image' src={ require(`./Images/${this.state.results[0][0]}.png`) } alt='Prediction'/>
            </div>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;Confidence: {confidence}
        </div>

      second = <div className='result'>
          <div className='result-text'>2.&nbsp;{this.state.results[1][0].split('_')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')}&nbsp;

          <img className='result-image' src={ require(`./Images/${this.state.results[1][0]}.png`) } alt='Prediction'/>
          </div>
        </div>

    }
    else{
      first = <p></p>
    }

    return(
      <div className='wrapper'>

        <h1>Traffic Sign Recognition</h1>

        <div className='heading'>About</div>
        <div>
        The original version of this project was written as a final project for Math 214 (Linear Algebra) at University of Michigan.
        The purpose of this project was to show the power of simple linear algebra calculations. 
        </div>

        <div className='heading'>Currently Supports</div>
        <div>
          <img src={ require('./Images/Stop_Sign.png') } alt='Stop' width='50' height='50'/>
          <img src={ require('./Images/One_Way.png') } alt='One Way'width='50' height='50'/>
          <img src={ require('./Images/do_not_enter.png') } alt='Do Not Enter'width='50' height='50'/>
          <img src={ require('./Images/pedestrian_crossing.png') } alt='Pedestrian'width='50' height='50'/>
          <img src={ require('./Images/Handicap_Parking.png') } alt='Handicap Parking'width='50' height='50'/>
          <img src={ require('./Images/Rail_Road.png') } alt='Rail Road'width='50' height='50'/>
          <img src={ require('./Images/Road_Work_Ahead.png') } alt='Road Work'width='50' height='50'/>
          <img src={ require('./Images/yield.png') } alt='Yield'width='50' height='50'/>
        </div>
        <br />
        <div className='heading'>What types of images work?</div>
        <div>
          The image must be one of the eight signs above.
          The image must also be on a white background, other backgrounds are likely to interfere witht he process.
          PNG images are also more likely to classify correctly, other formats may work, but less likely.
        </div>
        <br />
        <div className='heading'>Upload an image to classify it</div>
        <input onChange={this.change} ref={(ref) => { this.uploadInput = ref; }} type="file" className='upload'/>
        <p></p>
        <Button onClick={this.handleUploadImage} variant="outlined" size="medium" >Classify</Button>

        <br /><br />
        <div>
          {first}
          <br />
          {second}
        </div>
        <br /><br /><br /><br />
        <div className='heading'>Learn more about this project</div>
        <div>
          <a href='https://github.com/AricLandy/Traffic-Sign-Recognition-API' style={{ textDecoration: 'none' }}>
            <Button variant="outlined" size="medium" >View back end code on Github</Button>
          </a>
          &nbsp;
          <a href='https://github.com/AricLandy/Traffic-Sign-Recognition-UI' style={{ textDecoration: 'none' }}>
            <Button variant="outlined" size="medium" >View front end code on Github</Button>
          </a>
        </div>

      </div>
    )
  }
}

export default App;
