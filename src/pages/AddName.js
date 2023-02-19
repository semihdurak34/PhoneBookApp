import React, { useState } from 'react';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import actionTypes from '../redux/actions/actionTypes';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import urls from '../api/urls';

const AddName = () => {
  const dispatch = useDispatch;
  const navigate = useNavigate;
  const { categoriesState } = useSelector((state) => state);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    work: '',
    sex: '',
    categoryId: categoriesState.categories[0].id,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);

    if (
      form.firstName === '' ||
      form.lastName === '' ||
      form.phoneNumber === ''
    ) {
      alert('Please enter a phone number, a name and a last name');
      return;
    }
    const newName = {
      ...form,
      id: String(new Date().getTime()),
    };
    api
      .post(urls.names, newName)
      .then((res) => {
        dispatch({
          type: actionTypes.nameActions.ADD_NAME,
          payload: newName,
        });
        navigate('/');
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Header />
      <div className="container my-5 w-25">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Add First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Henry"
              value={form.firstName}
              onChange={(event) =>
                setForm({ ...form, firstName: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Add Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Thedeor"
              value={form.lastName}
              onChange={(event) =>
                setForm({ ...form, lastName: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Add Phone Number
            </label>
            <input
              type="number"
              className="form-control"
              id="phoneNumber"
              placeholder="+905555555"
              value={form.phoneNumber}
              onChange={(event) =>
                setForm({ ...form, phoneNumber: Number(event.target.value) })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="work" className="form-label">
              Add Work
            </label>
            <input
              type="text"
              className="form-control"
              id="work"
              placeholder="Teacher, Engineer"
              value={form.work}
              onChange={(event) =>
                setForm({ ...form, work: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sex" className="form-label">
              Add Sex
            </label>
            <input
              type="text"
              className="form-control"
              id="sex"
              placeholder="Male, Female or O"
              value={form.sex}
              onChange={(event) =>
                setForm({ ...form, sex: event.target.value })
              }
            />
          </div>
          <select
            className="form-select"
            defaultValue={categoriesState.categories[0].id}
            aria-label="Default select example"
            value={form.categoryId}
            onChange={(event) =>
              setForm({ ...form, categoryId: event.target.value })
            }
          >
            {categoriesState.categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.categoryName}
              </option>
            ))}
          </select>
          <div className="d-flex justify-content-center my-5">
            <button className="btn btn-primary w-50">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddName;
