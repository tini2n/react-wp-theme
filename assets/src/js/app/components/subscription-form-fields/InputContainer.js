import React  from 'react'

const InputContainer = ({
    error,
    isCheckboxContainer,
    children
}) => (
    <div className={`${isCheckboxContainer ? 'checkbox-item' : 'input-item'} ${error ? 'error' : ''}`}>
        {children}
        {error && <p className="error-msg">{error}</p>}
    </div>
);

export default InputContainer;