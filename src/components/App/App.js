

import React, { Component } from 'react';
import './App.css';
import ItemPage from '../ItemPage/ItemPage';
import {items} from '../../data/data';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        selectedTab: '',
        originCity: '',
        destCity: '',
        deptDate: '',
        retDate: '',
        items: items,
        filteredItems: [],
        options:[
          'Hyderabad', 'Delhi', 'Bengaluru', 'Pune'
        ]
      };

      this.handleChangeDestCity = this.handleChangeDestCity.bind(this);
      this.handleChangeOriginCity = this.handleChangeOriginCity.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleStartDateChange = this.handleStartDateChange.bind(this);
      this.handleEndDateChange = this.handleEndDateChange.bind(this);
      this.findByMatchingProperties = this.findByMatchingProperties.bind(this);
      // this.handleChange = this.handleChange.bind(this);


      moment.updateLocale('en', {
        calendar : {
            sameElse : 'Do MMM YYYY'
        }
      });



      
  }




  handleChangeOriginCity = selectedOption => {
    this.setState({ originCity: selectedOption.value });

    console.log(this.state, selectedOption);
  };

  handleChangeDestCity = selectedOption => {
    this.setState({ destCity: selectedOption.value });
  };

  // handleChangeDestCity(event) {
  //     const destCity = event.target.value;
  //     this.setState({destCity: destCity});

      
  // }

  handleSubmit(event) {
    console.log(this.state)
    event.preventDefault();
this.setState({filteredItems: []});
    const objToMatch = {
      originCity: this.state.originCity,
      destCity: this.state.destCity,

    };

    const filteredData = this.findByMatchingProperties(items, objToMatch);
    console.log(filteredData);
    if( filteredData.length !== 0 ) {
      this.setState({
        filteredItems: filteredData
      });
    }
  
    console.log(this.state);
  }



  handleStartDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  findByMatchingProperties(arrObj, matchingObj) {
    console.log(arrObj)
    console.log(matchingObj)

      return arrObj.filter(function (entry) {
          return Object.keys(matchingObj).every(function (key) {
              return (entry[key].toUpperCase().indexOf(matchingObj[key].toUpperCase()) === 0);
          });
      });
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date
    });
  }


  render() {

    var originCity = this.state.originCity ? this.state.originCity : "";
    var destCity = this.state.destCity ? this.state.destCity : "";
    var headerElem = "";
    var defaultOption = this.state.options[0];
    var startDate = 
    this.state.startDate ? "Depart: "+this.state.startDate.toString().slice(4, 15) : "";
    if(!!originCity && !!destCity) {
       headerElem =
       <div>
            <h5> {this.state.originCity} to {this.state.destCity} </h5>
          </div>
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Search for flights
          </h2>
        </div>
        <div className="container">
          <div className="one-third column">
          <div className="Item">
                    <form onSubmit={this.handleSubmit}>
                      

<Dropdown options={this.state.options} onChange={this.handleChangeOriginCity} 
                    value={defaultOption} 
                  placeholder="Select an option" />

                        
                        
                        <Dropdown options={this.state.options} onChange={this.handleChangeDestCity} 
                    value={defaultOption} 
                  placeholder="Select an option" />

                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleStartDateChange}
                            minDate={moment()}
                            maxDate={moment().add(90, "days")}
                                placeholderText="Departure Date" />
                        <DatePicker
                            selected={this.state.endDate}
                            onChange={this.handleEndDateChange}
                            minDate={moment()}
                            maxDate={moment().add(90, "days")}
                                placeholderText="Return Date" />
                
                      <input className="row" type="submit" value="Search"  />
                    </form>
                  </div>
             
            

          </div>
          <div className="two-thirds column">
            <div className="header">
                <div className="Item-left">
                  {headerElem}
                </div>
                <div className="Item-right">
                  {startDate}
                </div>
            </div>
            <main>
            <ItemPage
              items={this.state.filteredItems}
              onAddToCart={this.handleAddToCart} />
    	      </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
