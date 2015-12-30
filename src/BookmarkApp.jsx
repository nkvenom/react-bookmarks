import React, { Component } from 'react';
import FAKE_DATA from './fakedata';
import BookmarksRender from './BookmarksRender.jsx';
import {convertDates, preprocessTree, MONTHS, monthName} from './utils';
import moment from 'moment';

var MonthsNav = ({monthClick, currMonth}) => {
  var stCurrMonth = String(currMonth);
  return <ul className="nav nav-pills" role="tablist">
    {MONTHS.map(m => { return <li key={m.code} className={m.code == stCurrMonth? "active" : ""} role="presentation">
        <a  onClick={monthClick}  data-month={m.code} href={m.code}>{m.name}</a>
      </li>
    })}
  </ul>  
};

var BookmarkApp = React.createClass({
  getInitialState() {
    var currMonth = new Date().getMonth();
    return {
      root: {},
      month: currMonth
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
  
  nextMonth(evt) {
    evt.preventDefault();
    this.setState({
      month: (this.state.month < 10? this.state.month + 1: 0)
    });
  },
  
  prevMonth(evt) {
    evt.preventDefault();
    this.setState({
      month: (this.state.month > 0? this.state.month - 1: 11)
    });
  },
  
  render() {
    return (
      <div> 
        <h1> <a href="" onClick={this.prevMonth}>&lt;</a> {monthName(String(this.state.month))} <a onClick={this.nextMonth} href="">&gt;</a></h1>
        
        <MonthsNav monthClick={this.clickMonth} currMonth={this.state.month} />
        <BookmarksRender root={this.state.root} month={this.state.month} />
      </div>
    );
  }
});

export default BookmarkApp;