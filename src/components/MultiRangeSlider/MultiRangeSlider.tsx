import React, { ChangeEvent, useCallback, useState } from 'react';
import styles from './MultyRangeSlider.module.scss';

type propsType = {
  min: number;
  max: number;
  callback: (selectedMin: number, selectedMax: number) => void;
};

export const MultiRangeSlider: React.FC<propsType> = ({ min, max, callback }) => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(100);

  const converter = useCallback(
    (percent: number) => {
      return Math.floor((max / 100) * percent);
    },
    [max]
  );

  const changeHandlerMin = (event: ChangeEvent<HTMLInputElement>) => {
    if (maxVal - 0.1 <= Number(event.currentTarget.value)) {
      setMinVal(Number(maxVal - 0.1));
    } else {
      setMinVal(Number(event.currentTarget.value));
    }
    callback(converter(minVal), converter(maxVal));
  };

  const changeHandlerMax = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number(event.currentTarget.value) <= minVal + 0.1) {
      setMaxVal(Number(minVal + 0.1));
    } else {
      setMaxVal(Number(event.currentTarget.value));
    }
    callback(converter(minVal), converter(maxVal));
  };

  let leftRightStyle = { left: `${minVal}%`, right: `${100 - maxVal}%` };
  let badgeMinStyle = { left: `calc(${minVal}% + (${0 - minVal * 0.2}px))` };
  let badgeMaxStyle = { left: `calc(${maxVal}% + (${0 - maxVal * 0.2}px))` };

  return (
    <div className={styles.rangeSliderWrapper}>
      <div className={styles.badges}>
        <div className={styles.badgeMin} style={badgeMinStyle}>
          <div>{min}</div>
          <div className={styles.underline} />
        </div>
        <div className={styles.badgeMax} style={badgeMaxStyle}>
          <div>{max}</div>
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
          max={'100'}
          onChange={changeHandlerMin}
          value={minVal}
          name={'setMinVal'}
          className={styles.rangeMin}
        />
        <input
          type="range"
          min={'0'}
          max={'100'}
          onChange={changeHandlerMax}
          value={maxVal}
          name={'setMaxVal'}
          className={styles.rangeMax}
        />
      </div>
    </div>
  );
};
