import React from 'react';
import withSelect from '../../hoc/withSelect';
import ContentLoader from 'react-content-loader';

const SelectField = ({ values = {}, defaultValue = '', inputType, inputName, changeHandler, selectLib }) => {
  // selectLib comes from HOC and loads async
  const Select = selectLib && selectLib.default;

  const handleChange = e => {
    changeHandler(e, inputName);
  };

  return Select ? (
    <Select
      className="react-select-container"
      classNamePrefix="react-select"
      options={values}
      onChange={handleChange}
      type={inputType}
      defaultValue={values[values.findIndex(el => el.value === defaultValue)]}
    />
  ) : (
    <ContentLoader height={40}>
      <rect x="0" y="0" rx="0" ry="0" width="520" height="50" />
    </ContentLoader>
  );
};

export default withSelect(SelectField);
