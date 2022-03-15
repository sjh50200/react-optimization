import React, { useEffect, useReducer } from "react";

// state를 useReducer를 통해 객체 값으로 관리함으로써 의존성 배열을 없앤다.
// 객체 자체를 useState로 관리하는 방법도 존재하지만,
// useReducer를 사용함으로써 다양한 액션과 상태값을 관리하기가 용이하고
// 상태값 변경 로직을 여러 곳에서 재사용 하기에도 좋다.

const Timer = ({ initialTotalSeconds }) => {
  const [state, dispatch] = useReducer(reducer, {
    hour: Math.floor(initialTotalSeconds / 3600),
    minute: Math.floor(initialTotalSeconds / 3600 / 60),
    second: initialTotalSeconds % 60,
  });
  const { hour, minute, second } = state;

  useEffect(() => {
    // 시점 관리가 되어 있지 않기 때문에 빈 배열 추가
    // 시점 관리 시 id의 block 변경 해주는 작업이 필요
    console.log(state);
    const id = setInterval(dispatch, 1000);
    return () => clearInterval(id);
  }, []);

  return <div>{hour + ":" + minute + ":" + second}</div>;
};

const reducer = (state) => {
  const { hour, minute, second } = state;
  if (second) {
    return { ...state, second: second - 1 };
  } else if (minute) {
    return { ...state, minute: minute - 1, second: 59 };
  } else if (hour) {
    return { hour: hour - 1, minute: 59, second: 59 };
  } else {
    return state;
  }
};

export default Timer;
