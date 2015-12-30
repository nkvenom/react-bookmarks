import React, { Component } from 'react';
import moment from 'moment';

var BookmarksRender = React.createClass({

  getDefaultProps() {
    return {
       month: 2
    };
  },
  renderLink(leafNode) {
    return (
    <span>  
      <a href={leafNode.url} target="_blank">{leafNode.name}</a>
       &nbsp;|&nbsp; 
       {(leafNode.date_added?moment(leafNode.date_added).fromNow() : -1)}
    </span>
      );
  },
  renderBookmarks(elRoot, month=0) {    
    if (elRoot.children) {
      return (
        <div>
          <span className="glyphicon glyphicon-folder-open" aria-hidden="true"></span>
          &nbsp;&nbsp;
          <strong>{elRoot.name}</strong>
          <ul className="bk-folder"> 
            {elRoot.children
                .filter(c => {
                    if(c.hasOwnProperty('children') || !c.hasOwnProperty('date_added')) {
                        return true;
                    } 
                    
                    return c.date_added.getMonth() === month;
                  })            
                .map(c => (<li key={c.id}>
                {!c.children?
                  <span className="glyphicon glyphicon-file" aria-hidden="true"></span>
                : null}   
                {this.renderBookmarks(c, month)}  
                </li>))
              }
          </ul>
        </div>
      );
    } 
    else {
      return this.renderLink(elRoot);  
    }
  },
  render() {    
    return this.renderBookmarks(this.props.root, this.props.month);
  }
});

export default BookmarksRender;