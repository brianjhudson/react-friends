import React from "react";
import Friend from "../Friend/Friend"
import friends from "../../../friends"

export default class FriendList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
            , searchProperty: ""
            , orderBy: ""
            , order: "ascending"
        };
    }

    handleChange(field, event) {
        this.setState({
            [field]: event.target.value
        })
    }

    filterFriends(list, searchProperty="name", searchText="") {
        if (!searchText) return list;
        if (searchProperty.indexOf(".") !== -1) {
            let searchProps = searchProperty.split(".");
            return list.filter(friend => friend[searchProps[0]] && friend[searchProps[0]][searchProps[1]] && friend[searchProps[0]][searchProps[1]].toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
        } 
        return list.filter( friend => friend[searchProperty] && friend[searchProperty].toLowerCase().indexOf( searchText.toLowerCase()) !== -1 );

    }

    sortFriends(list, orderBy="name", order) {
        for (let i = 0; i < list.length - 1; i++) {
            let min = list[i]; 
            let minIdx = i;
            for (let j = i; j < list.length; j++) {
                if (list[j][orderBy] < min[orderBy]) {
                    min = list[j];
                    minIdx = j;
                }                
            }
            list[minIdx] = list[i];
            list[i] = min;            
        }
        if (order === "descending") list = list.reverse();        
        return list;
    }

    render() {
        let friendsList = this.filterFriends(friends, this.state.searchProperty, this.state.searchText);
     
        friendsList = this.sortFriends(friendsList, this.state.orderBy, this.state.order)

        friendsList = friendsList.map( friend => (
                <Friend
                    currentLocation={ friend.current_location || {} }
                    friendCount={ friend.friend_count }
                    key={ friend.$$hashKey }
                    name={ friend.name }
                    pictureUrl={ friend.pic_square }
                    status={ friend.status ? friend.status.message : "" }
                />
            ) );

        const displayFriends = this.state.order === "ascending" ? friendsList : friendsList.slice().reverse();
        return (
            <div>
                <form className="form-inline searchForm" role="form">
                    <div className="form-group">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Search for Friends"
                            value={this.state.searchText}
                            onChange={this.handleChange.bind(this, "searchText")}
                        />
                        <select 
                            className="input-medium"
                            value={this.state.searchProperty}
                            onChange={this.handleChange.bind(this, "searchProperty")}
                        >
                            <option default value="">--Search By--</option>
                            <option value="name">Name</option>
                            <option value="current_location.city">City</option>
                            <option value="current_location.state">State</option>
                            <option value="current_location.country">Country</option>
                            <option value="friend_count">#Friends</option>

                        </select>
                        <select 
                            className="input-medium"
                            value={this.state.orderBy}
                            onChange={this.handleChange.bind(this, "orderBy")}
                        >
                            <option default value="">--Sort By--</option>
                            <option value="name">Name</option>
                            <option value="current_location.city">City</option>
                            <option value="current_location.state">State</option>
                            <option value="current_location.country">Country</option>
                            <option value="friend_count">#Friends</option>


                        </select>
                        <select 
                            className="input-medium"
                            value={this.state.order}
                            onChange={this.handleChange.bind(this, "order")}
                        >
                            <option value="descending">Descending</option>
                            <option value="ascending">Ascending</option>
                        </select>
                    </div>
                </form>
                <ul>
                    {friendsList}
                </ul>
            </div>
        )
    } 
}
    
