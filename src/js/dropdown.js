import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
const DropDown = (props) => {

    const optionsArray = props.options;
    const [dropDownValue, setDropDownValue] = useState()
    const navigate = useNavigate();
    return (
        <>
            <label htmlFor={props.name}>{props.name}</label>
            <select className="dropDown" style={{ width: 5 }}
                id={props.name}
                onClick={(event) => event.stopPropagation()}
                value={null}
                onChange={(event) => { navigate("/player", { state: { sub: event.target.value } }) }}>
                {optionsArray.map((optionsElement) => <option key={optionsElement} value={optionsElement}>{optionsElement}</option>)}
            </select>
        </>
    )
}

export default DropDown;