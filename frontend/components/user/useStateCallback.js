import { useState, useCallback } from "react";

export function useStateCallback(initialState) {
  const [state, setState] = useState(initialState);

  const setStateCallback = useCallback((newState) => {
    setState((prevState) =>
      typeof newState === "function" ? newState(prevState) : newState
    );
  }, []);

  return [state, setStateCallback];
}
