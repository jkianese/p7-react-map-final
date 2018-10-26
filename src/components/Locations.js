import React, { Component } from "react";

class Locations extends Component {
  state = {
    sidebarClicked: false
  };

  handleClick = () => {
    this.setState({
      sidebarClicked: !this.state.sidebarClicked
    });
  };

  onClickLocation = (venue, title) => {
    this.props.allMarkers.forEach(marker => {
      if (marker.id === venue.venue.id) {
        this.props.sidebarList(marker, title);
      }
    });
  };

  render() {
    const { myVenues } = this.props;

    return (
      <div className="sidebar">
        <input
          type="button"
          value={this.state.sidebarClicked ? "Show" : "Hide"}
          className="show"
          onClick={() => this.handleClick()}
        />
        <div
          style={{ display: this.state.sidebarClicked ? "none" : "block" }}
          className="sidebar-boxes">
          <input
            className="text-input"
            aria-label="search field"
            type="text"
            placeholder="Search Places"
            value={this.props.query}
            onChange={e => this.props.updateQuery(e.target.value)}
          />
          <ul className="locations-list">
            {myVenues
              .filter(
                venue =>
                  venue.venue.name
                    .toLowerCase()
                    .indexOf(this.props.query.toLowerCase()) > -1
              )
              .map((venue, idx) => (
                <li
                  tabIndex="0"
                  className="locations-names"
                  key={idx}
                  onClick={() => this.onClickLocation(venue, venue.venue.name)}>
                  {" "}
                  {venue.venue.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default Locations;
