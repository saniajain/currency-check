import './App.css';
import React, {Component} from 'react';
import {ToWords} from 'to-words';
import {connect} from 'react-redux';
import * as saveHistoryAction from './actions/saveHistoryAction';

//for converting numerics to currency value
const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
  }
});

class App extends Component{

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.state = {
      numericValue: '',
      stringValue : ''
    }
  }

  //for validating the entered input and setting it in state
  handleChange(e){
    let value = e.target.value;
    let pattern = /^[0-9]+$/;
    if(value !== "" && !pattern.test(value)){
      document.getElementById("result").style.color = "red";
      document.getElementById("result").innerHTML = "Please enter valid numeric value."
      //document.getElementById("result").style.display = 'block';
      document.getElementById("button").disabled = true;
  }
  else{
    document.getElementById("button").disabled = false;
    document.getElementById("result").style.color = "black";
    this.setState({
      numericValue: e.target.value
    })
  }
  }

  //to convert numeric value to currency and saving it in state
  handleCheck(e){
    //code to change numeric to string
    let stringValue = toWords.convert(this.state.numericValue,{currency: true});
    this.setState({
      stringValue: stringValue
    })
    let history = {
      numericValue : this.state.numericValue,
      stringValue : stringValue
    }
    //saving it in props to be used later to display the recent searches
    this.props.saveCurrencyHistory(history);
    e.preventDefault();
  }

  render() {
    return(
      <div class = "container">
        <h1> Currency Checker</h1>       
        <div>
          <h3> Enter currency value here:</h3>
          <form onSubmit= {this.handleSubmit}>
            <input type = "text" onChange = {this.handleChange} maxLength = "10" /> <br/>
            <input type ="submit" id = "button" class = "button" onClick = {this.handleCheck}/>
            <div>
              <div id = "result">
                {this.state.stringValue}
              </div>
              <div>
                <h3>Recent Searches</h3>
                { 
                <ul>
                {
                this.props.history.map((history, i) => <li key={i}> {history.numericValue} </li> )}
                </ul> }
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    history: state.history
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    saveCurrencyHistory: (history) => dispatch(saveHistoryAction.saveCurrencyHistory(history))
  }
};

export default connect(mapStateToProps,mapDispatchToProps) (App);
