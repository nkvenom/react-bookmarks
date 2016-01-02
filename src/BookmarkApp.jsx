import React, { Component } from 'react';
import FAKE_DATA from './fakedata';
import BookmarksRender from './BookmarksRender.jsx';
import {convertDates, preprocessTree, MONTHS, monthName} from './utils';
import moment from 'moment';

var MonthsNav = ({monthClick, currMonth}) => {
  var stCurrMonth = String(currMonth);
  return <ul className="nav nav-pills" role="tablist">
    {MONTHS.map(m => { return <li key={m.code} className={m.code == stCurrMonth? "active" : ""} role="presentation">
        <a onClick={monthClick}  data-month={m.code} href={m.code}>{m.name}</a>
      </li>
    })}
  </ul>  
};

var BookmarkApp = React.createClass({
  getInitialState() {
    var currDate =  new Date();   
    var currMonth = currDate.getMonth();
    var currYear = currDate.getFullYear();
    return {
      root: {},
      month: currMonth,
      year: currYear
    };
  },
  componentDidMount() {
    console.log("componentDidMount");
    
    window
      .fetch('bookmarks.json')
      .then(r => r.json())
      .then(r => {
        var bookmarksMark = r.roots.bookmark_bar;
        preprocessTree(bookmarksMark);
        this.setState({
          root: bookmarksMark
        });
      });
  },

  clickMonth(evt) {
    evt.preventDefault();
    var target = evt.target;
    var month = evt.target.getAttribute('data-month');
    this.setState({
      month: parseInt(month)
    });
  },
  
  calcNextMonth(delta) {
    var month = this.state.month;
    var year = this.state.year;

    month += delta;
    if(month > 11) {
      month = 0;
      year += 1;
    }
    else if(month < 0) {
      month = 11;
      year -= 1;
    }
    
    return [year, month];  
  },
  nextMonth(evt) {
    evt.preventDefault();
    
    var [year, month] = this.calcNextMonth(1);
    this.setState({
      year: year,
      month: month
    });
  },
  
  prevMonth(evt) {
    evt.preventDefault();
    var [year, month] = this.calcNextMonth(-1);
    this.setState({
      year: year,
      month: month
    });
  },
  
  render() {
    return (
      <div> 
        <h1> <a href="" onClick={this.prevMonth}>&lt;</a> {monthName(String(this.state.month))} {this.state.year} <a onClick={this.nextMonth} href="">&gt;</a></h1>
        
        <MonthsNav monthClick={this.clickMonth} currMonth={this.state.month} />
        <BookmarksRender root={this.state.root} year={this.state.year} month={this.state.month}  />
      </div>
    );
  }
});

export default BookmarkApp;