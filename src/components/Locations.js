import React, { Component } from "react";

class Locations extends Component {
  state = {
    sidebarClicked: false
  };
  handleClick = () => {
    console.log("click");
    this.setState({
      sidebarClicked: !this.state.sidebarClicked
    });
  };
  onClickLocation = (venue, title) => {
    // this method now performs a simple association between the passed venue and the allMarkers
    // array passed from App.js --> when a match is found, App's `sidebarList` method is passed the matching
    // marker and title arguments. Logs below were simply for testing
    console.log(this.props.allMarkers);
    console.log(this.props.myVenues);
    this.props.allMarkers.forEach(marker => {
      if (marker.id === venue.venue.id) {
        this.props.sidebarList(marker, title);
      }
    });
    /* problem:
        - when sidebar list is full, index positions align 
            --> you *could* do this, but it's perhaps not easy. Since you can't say what 
                any particular search will be, you're essentially saying you'd like for X combinations
        - when filtered, sidebar list shrinks but allMarkers doesn't
            --> confirmed it does; must have fixed this in the interim?
        - content string is accurate, but the marker the info window appears over
          is based on the index position (faulty) rather than an always-matching marker
            --> see above
    */
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
            {/* modified syntax below to ensure clear identification of parameters/variables */}
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
                  {/* modified this so that the idx isn't passed, but rather the venue */}
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
