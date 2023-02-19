import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from './redux/actions/actionTypes';
import api from './api/api';
import urls from './api/urls';
import NameDetail from './pages/NameDetail';
import AddName from './pages/AddName';

function App() {
  const dispatch = useDispatch();
  const { namesState, categoriesState } = useSelector((state) => state);
  useEffect(() => {
    /* fetch names */
    dispatch({ type: actionTypes.nameActions.GET_NAMES_START });
    api
      .get(urls.names)
      .then((res) => {
        dispatch({
          type: actionTypes.nameActions.GET_NAMES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.nameActions.GET_NAMES_FAIL,
          payload: 'An Error is occured in Server',
        });
      });
    /* fetch phoneNumbers */
    dispatch({ type: actionTypes.categoryActions.GET_CATEGORIES_START });
    api
      .get(urls.categories)
      .then((res) => {
        dispatch({
          type: actionTypes.categoryActions.GET_CATEGORIES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.categoryActions.GET_CATEGORIES_FAIL,
          payload: ' there is an error in server',
        });
      });
  }, []);
  if (namesState.success === false || categoriesState.success === false)
    return null;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/name-detail/:nameId" element={<NameDetail />} />
        <Route path="/add-name" element={<AddName />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
