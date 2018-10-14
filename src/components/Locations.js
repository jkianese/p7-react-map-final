import React, { Component } from "react";
// import "./style.css";

class List extends Component {
  state = {};

  handleClick = (id, title) => {
    this.props.showMarkerBox(this.props.allMarkers[id], title)
}

  render() {
   
    const { myVenues } = this.props;
    
    return (
      <div className="sidebar"> 
        <input
          aria-label="search field"
          type="text"
          placeholder="Search Venues"
          value={this.props.query}
          onChange={e => this.props.updateQuery(e.target.value)}
          
        />
        <ul className="venue-list-parent">
          {myVenues
            .filter(filtered =>
                filtered.venue.name
            .toLowerCase()
            .indexOf(this.props.query.toLowerCase()) > -1
            )
            .map((item, idx) => {
              return (
                <li tabIndex="0" className="venue-list-item" key={idx} onClick={()=> 
                    this.handleClick(idx,item.venue.name)}>
                    {item.venue.name}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
export default List;