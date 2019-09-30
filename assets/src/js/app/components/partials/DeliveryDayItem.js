import React from 'react';

const DeliveryDayItem = ({
  title,
  value,
  checked,
  product_option_id,
  product_option_code,
  handleDeliveryDayChange
}) => {
  return (
    <div className={`subscription-item delivery ${checked ? 'active' : ''}`} onClick={handleDeliveryDayChange}>
      <div className="text-container">
        <p>{title}</p>
      </div>
      <div className="radio">
        <input
          type="radio"
          data-product_option_id={product_option_id}
          data-product_option_code={product_option_code}
          value={value}
          checked={checked}
          readOnly
          name="delivery-day"
        />
        <span />
      </div>
    </div>
  );
};

export default DeliveryDayItem;
