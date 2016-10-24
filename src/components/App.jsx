import React from "react";
import FriendList from "./FriendList/FriendList";

export default class App extends React.Component{
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            // Insert jsx here
            <div>
                <h1>The <strong>facebook</strong> Friend Machine</h1>
                <div className="friends"></div>
                <FriendList />
                <h2>Test</h2>
            </div>
        );
    }
}