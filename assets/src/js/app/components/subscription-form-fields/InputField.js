import React from 'react'

const InputField = ({
    value,
    inputType,
    inputName,
    changeHandler,
    placeholder
}) => (
    <input type={inputType}
           name={inputName}
           value={value}
           placeholder={placeholder}
           onChange={changeHandler} />
);

export default InputField;