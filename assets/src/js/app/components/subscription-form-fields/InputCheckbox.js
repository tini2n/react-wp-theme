import React from 'react'

const InputCheckbox = ({
    children,
    checked,
    checkboxName,
    changeHandler
}) => (
    <label>
        {children}
        <input type="checkbox"
               name={checkboxName}
               checked={checked}
               onChange={changeHandler} />
        <span></span>
    </label>
);

export default InputCheckbox;