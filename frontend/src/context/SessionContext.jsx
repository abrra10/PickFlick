import React, { createContext, useContext, useReducer, useEffect } from "react";
import { sessionAPI } from "../services/sessionAPI";
import {
  getStoredSessionCode,
  setStoredSessionCode,
  getStoredUsername,
  setStoredUsername,
} from "../utils/helpers";

// Initial state
const initialState = {
  sessionCode: "",
  session: null,
  username: "",
  isLoading: false,
  error: null,
  isConnected: false,
};

// Action types
const SESSION_ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  SET_SESSION_CODE: "SET_SESSION_CODE",
  SET_USERNAME: "SET_USERNAME",
  SET_SESSION: "SET_SESSION",
  SET_CONNECTED: "SET_CONNECTED",
  RESET_SESSION: "RESET_SESSION",
};

// Reducer
const sessionReducer = (state, action) => {
  switch (action.type) {
    case SESSION_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case SESSION_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };

    case SESSION_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };

    case SESSION_ACTIONS.SET_SESSION_CODE:
      return { ...state, sessionCode: action.payload };

    case SESSION_ACTIONS.SET_USERNAME:
      return { ...state, username: action.payload };

    case SESSION_ACTIONS.SET_SESSION:
      return {
        ...state,
        session: action.payload,
        isLoading: false,
        error: null,
      };

    case SESSION_ACTIONS.SET_CONNECTED:
      return { ...state, isConnected: action.payload };

    case SESSION_ACTIONS.RESET_SESSION:
      return { ...initialState, username: state.username };

    default:
      return state;
  }
};

// Create context
const SessionContext = createContext();

// Provider component
export const SessionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  // Load stored data on mount
  useEffect(() => {
    const storedSessionCode = getStoredSessionCode();
    const storedUsername = getStoredUsername();

    if (storedSessionCode) {
      dispatch({
        type: SESSION_ACTIONS.SET_SESSION_CODE,
        payload: storedSessionCode,
      });
    }

    if (storedUsername) {
      dispatch({ type: SESSION_ACTIONS.SET_USERNAME, payload: storedUsername });
    }
  }, []);

  // Actions
  const createSession = async () => {
    try {
      dispatch({ type: SESSION_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: SESSION_ACTIONS.CLEAR_ERROR });

      const response = await sessionAPI.createSession();
      const sessionCode = response.data.sessionCode;

      dispatch({
        type: SESSION_ACTIONS.SET_SESSION_CODE,
        payload: sessionCode,
      });
      dispatch({ type: SESSION_ACTIONS.SET_SESSION, payload: response.data });
      setStoredSessionCode(sessionCode);

      return sessionCode;
    } catch (error) {
      dispatch({ type: SESSION_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const joinSession = async (sessionCode) => {
    try {
      dispatch({ type: SESSION_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: SESSION_ACTIONS.CLEAR_ERROR });

      const response = await sessionAPI.getSession(sessionCode);

      dispatch({
        type: SESSION_ACTIONS.SET_SESSION_CODE,
        payload: sessionCode,
      });
      dispatch({ type: SESSION_ACTIONS.SET_SESSION, payload: response.data });
      setStoredSessionCode(sessionCode);

      return response.data;
    } catch (error) {
      dispatch({ type: SESSION_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const refreshSession = async () => {
    if (!state.sessionCode) return;

    try {
      const response = await sessionAPI.getSession(state.sessionCode);
      dispatch({ type: SESSION_ACTIONS.SET_SESSION, payload: response.data });
    } catch (error) {
      console.error("Failed to refresh session:", error);
    }
  };

  const addMovieToSession = async (movieData) => {
    if (!state.sessionCode) throw new Error("No session code available");

    try {
      dispatch({ type: SESSION_ACTIONS.SET_LOADING, payload: true });

      const movieWithUser = {
        ...movieData,
        addedBy: state.username || "Anonymous",
      };

      const response = await sessionAPI.addMovieToSession(
        state.sessionCode,
        movieWithUser
      );
      dispatch({ type: SESSION_ACTIONS.SET_SESSION, payload: response.data });

      return response.data;
    } catch (error) {
      dispatch({ type: SESSION_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const removeMovieFromSession = async (movieId) => {
    if (!state.sessionCode) throw new Error("No session code available");

    try {
      dispatch({ type: SESSION_ACTIONS.SET_LOADING, payload: true });

      const response = await sessionAPI.removeMovieFromSession(
        state.sessionCode,
        movieId
      );
      dispatch({
        type: SESSION_ACTIONS.SET_SESSION,
        payload: response.data.session,
      });

      return response.data;
    } catch (error) {
      dispatch({ type: SESSION_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const selectMovie = async () => {
    if (!state.sessionCode) throw new Error("No session code available");

    try {
      dispatch({ type: SESSION_ACTIONS.SET_LOADING, payload: true });

      const response = await sessionAPI.selectMovie(state.sessionCode);
      dispatch({ type: SESSION_ACTIONS.SET_SESSION, payload: response.data });

      return response.data;
    } catch (error) {
      dispatch({ type: SESSION_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const setUsername = (username) => {
    dispatch({ type: SESSION_ACTIONS.SET_USERNAME, payload: username });
    setStoredUsername(username);
  };

  const clearError = () => {
    dispatch({ type: SESSION_ACTIONS.CLEAR_ERROR });
  };

  const resetSession = () => {
    dispatch({ type: SESSION_ACTIONS.RESET_SESSION });
    setStoredSessionCode("");
  };

  const value = {
    // State
    ...state,

    // Actions
    createSession,
    joinSession,
    refreshSession,
    addMovieToSession,
    removeMovieFromSession,
    selectMovie,
    setUsername,
    clearError,
    resetSession,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

// Custom hook to use session context
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
