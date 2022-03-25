import { useState } from 'react';

/*Dropdown to choose subreddit timeframe (i.e hot/top/week/etc)
  Only displays when the active li is 'top'*/
const DisplayDropDown = (props) => {

    const active = props.active;
    let setSelector = props.setSelector;

    const [dropDownValue, setDropDownValue] = useState()

    if (active) {
        return (
            <select className="dropDown"
                onClick={(event) => event.stopPropagation()}
                value={dropDownValue}
                onChange={(event) => { setDropDownValue(event.target.value); setSelector({ type: "top", time: event.target.value }) }}>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="year">This Year</option>
                <option value="all">All Time</option>
            </select>
        )
    }
    return null;
}

export default DisplayDropDown;