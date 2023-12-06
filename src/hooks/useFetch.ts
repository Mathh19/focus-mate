'use client';

import { useCallback, useEffect, useReducer } from 'react';
import { api } from '../services/api';

type StateProps<T> = {
  data?: T;
  isLoading: boolean;
  error?: Error;
};

type ActionProps<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };

export const useFetch = <T = unknown>(url: string) => {
  const initialState: StateProps<T> = {
    data: undefined,
    isLoading: true,
    error: undefined,
  };

  const fetchReducer = (state: StateProps<T>, action: ActionProps<T>) => {
    switch (action.type) {
      case 'loading':
        return { ...initialState, isLoading: true };
      case 'fetched':
        return { ...initialState, data: action.payload, isLoading: false };
      case 'error':
        return { ...initialState, error: action.payload, isLoading: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const handleFetch = useCallback(async () => {
    dispatch({ type: 'loading' });
    try {
      const res = await api.get(url);

      dispatch({ type: 'fetched', payload: res.data });
    } catch (err) {
      dispatch({ type: 'error', payload: err as Error });
    }
  }, [url]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isLoading,
  };
};
