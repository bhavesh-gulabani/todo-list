import React from 'react';
import { iconDark, iconLight } from '../../constants/images';

import styles from './CheckBox.module.css';

const CheckBox: React.FC<{ checked: boolean; onClick: () => void }> = ({
  checked,
  onClick: toggleHandler,
}) => {
  return (
    <img
      src={checked ? iconDark : iconLight}
      alt="Click Icon"
      onClick={toggleHandler}
      className={styles.checkmark}
    />
  );
};

export default CheckBox;
