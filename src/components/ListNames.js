import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../assests/buttons.css';
import api from '../api/api';
import urls from '../api/urls';
import actionTypes from '../redux/actions/actionTypes';
import CustomModel from './CustomModal';
import Header from '../components/Header';

import { Link } from 'react-router-dom';

const ListNames = () => {
  const dispatch = useDispatch();
  const { namesState, categoriesState } = useSelector((state) => state);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [willDeleteName, setWillDeleteName] = useState('');
  const deleteName = (id) => {
    if (window.confirm('Are you sure you want to delete') === true) {
      dispatch({ type: actionTypes.nameActions.DELETE_NAME_START });
      api
        .delete(`${urls.names}/${id}`)
        .then((res) => {
          dispatch({
            type: actionTypes.nameActions.DELETE_NAME_SUCCESS,
            payload: id,
          });
        })
        .catch((err) => {
          dispatch({
            type: actionTypes.nameActions.DELETE_NAME_FAIL,
            payload: 'Error',
          });
        });
    }
  };

  return (
    <div className="my-5">
      <Header />
      <div className="d-flex justify-content-center my-5">
        <Link className="btn btn-info " to="/add-name">
          Add A New Contact
        </Link>
      </div>
      <table className="table table-striped container">
        <thead>
          <tr>
            <th scope="col">Nu.</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Category</th>
            <th scope="col">Transection</th>
          </tr>
        </thead>
        <tbody>
          {namesState.names.map((name, index) => {
            const myCategory = categoriesState.categories.find(
              (item) => item.id === name.categoryId
            );
            return (
              <tr key={name.id}>
                <th scope="row">{index + 1}</th>
                <td>{name.firstName}</td>
                <td>{name.lastName}</td>
                <td>{name.phoneNumber}</td>
                <td>{myCategory.categoryName}</td>
                <td>
                  <button
                    onClick={() => {
                      setShowDeleteModal(true);
                      setWillDeleteName(name.id);
                    }}
                    className="generalBtn deleteBtn"
                  >
                    Delete
                  </button>
                  <button className="generalBtn updateBtn">Update</button>
                  <Link
                    to={`/name-detail/${name.id}`}
                    className="generalBtn detailBtn text-decoration-none"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showDeleteModal === true && (
        <CustomModel
          title="ACHTUNG !"
          message="Wollen Sie löschen ?"
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            deleteName(willDeleteName);
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
};
export default ListNames;
