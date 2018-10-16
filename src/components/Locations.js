import React, { Component } from 'react';

class Locations extends Component {
    
  onClickLocation = (id, title) => {
    this.props.sidebarList(this.props.allMarkers[id], title)
  } 
  
  render() {
   
    const { myVenues } = this.props;
    
    return (
      <div className="sidebar-boxes"> 
        <input className="text-input"
          aria-label="search field"
          type="text"
          placeholder="Search Places"
          value={this.props.query}
          onChange={e => this.props.updateQuery(e.target.value)}
          
        />
        <ul className="locations-list">
          {myVenues
            .filter(filtered =>
                filtered.venue.name
            .toLowerCase()
            .indexOf(this.props.query.toLowerCase()) > -1
            )
            .map((item, idx) => {
              return (
                <li tabIndex="0" className="locations-names" key={idx} onClick={()=> 
                    this.onClickLocation(idx, item.venue.name)}>
                      {item.venue.name}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
export default Locations;