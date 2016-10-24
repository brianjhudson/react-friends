import React from "react";
export default class Friend extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state = {

    //     }

    // }

    render() {
        return (
            <li className='friend'>
                <img className="profile-pic" src={this.props.pictureUrl} />

                <h3>{this.props.name}</h3>

                <div className="location">
                    Location: {this.props.currentLocation.city}, {this.props.currentLocation.state}, {this.props.currentLocation.country}
                </div>

                <div className="status">
                    Status: {this.props.status} <span className="hashtag">#ihateprovo</span>
                </div>

                <div className="num-friends">
                    Friends: {this.props.friendCount}
                </div>
            </li>
        )
    }
}