import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styles from './MultiRangeSlider.module.scss';

type propsType = {

  max: number;
  callback: (selectedMin: number, selectedMax: number) => void;
};

export const MultiRangeSlider: React.FC<propsType> = ({ max, callback }) => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(max);

  const changeHandlerMin = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('min', event.currentTarget.value);
    if (maxVal - 0.1 <= Number(event.currentTarget.value)) {
      setMinVal(Number(maxVal - 0.1));
    } else {
      setMinVal(Number(event.currentTarget.value));
    }
  };

  const changeHandlerMax = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('max', event.currentTarget.value);
    if (Number(event.currentTarget.value) <= minVal + 0.1) {
      setMaxVal(Number(minVal + 0.1));
    } else {
      setMaxVal(Number(event.currentTarget.value));
    }
  };

  useEffect(() => {
    callback(minVal, maxVal);
  }, [callback, minVal, maxVal]);

  let leftRightStyle = { left: `${minVal}%`, right: `${(max - maxVal)/max*100}%` };
  let badgeMinStyle = { left: `calc(${minVal}% + (${0 - minVal * 0.20}px))` };
  let badgeMaxStyle = { left: `calc(${maxVal}% + (${0 - maxVal * 0.55}px))` };

  return (
    <div className={styles.rangeSliderWrapper}>
      <div className={styles.badges}>
        <div className={styles.badgeMin} style={badgeMinStyle}>
          <div>{minVal}</div>
          <div className={styles.underline} />
        </div>
        <div className={styles.badgeMax} style={badgeMaxStyle}>
          <div>{maxVal}</div>
          <div className={styles.underline} />
        </div>
      </div>
      <div className={styles.slider}>
        <div className={styles.progress} style={leftRightStyle} />
      </div>
      <div className={styles.rangeInput}>
        <input
          type="range"
          min={'0'}
          max={String(max)}
          onChange={changeHandlerMin}
          value={minVal}
          name={'setMinVal'}
          className={styles.rangeMin}
        />
        <input
          type="range"
          min={'0'}
          max={String(max)}
          onChange={changeHandlerMax}
          value={maxVal}
          name={'setMaxVal'}
          className={styles.rangeMax}
        />
      </div>
    </div>
  );
};
