import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import styles from './MultyRangeSlider.module.scss';

type propsType = {
  max: number;
  callback: (selectedMin: number, selectedMax: number) => void;
};

export const MultiRangeSlider = (props: propsType) => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(100);

  const converter = useCallback(
    (percent: number) => {
      return (props.max / 100) * percent;
    },
    [props.max]
  );

  const changeHandlerMin = (event: ChangeEvent<HTMLInputElement>) => {
    if (maxVal - 0.1 <= Number(event.currentTarget.value)) {
      setMinVal(Number(maxVal - 0.1));
    } else {
      setMinVal(Number(event.currentTarget.value));
    }
  };

  const changeHandlerMax = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number(event.currentTarget.value) <= minVal + 0.1) {
      setMaxVal(Number(minVal + 0.1));
    } else {
      setMaxVal(Number(event.currentTarget.value));
    }
  };

  let leftRightStyle = { left: `${minVal}%`, right: `${100 - maxVal}%` };
  let badgeMinStyle = { left: `calc(${minVal}% + (${-40 - minVal * 0.2}px))` };
  let badgeMaxStyle = { left: `calc(${maxVal}% + (${-40 - maxVal * 0.2}px))` };

  useEffect(() => {
    props.callback(converter(minVal), converter(maxVal));
  }, [minVal, maxVal, props, converter]);

  return (
    <div className={styles.rangeSliderWrapper}>
      <div className={styles.badges}>
        <div className={styles.badgeMin} style={badgeMinStyle}>
          <div>{converter(minVal)}</div>
          <div className={styles.underline} />
        </div>
        <div className={styles.badgeMax} style={badgeMaxStyle}>
          <div>{converter(maxVal)}</div>
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
