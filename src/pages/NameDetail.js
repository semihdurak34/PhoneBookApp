import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';
import urls from '../api/urls';
import blank from '../images/blank.png';

const NameDetail = () => {
  const params = useParams();
  console.log(params);
  const [myName, setMyName] = useState(null);
  const [nameCategory, setNameCategory] = useState(null);
  useEffect(() => {
    api
      .get(`${urls.names}/${params.namId}`)
      .then((resName) => {
        console.log(resName.data);
        setMyName(resName.data);
        api
          .get(`${urls.categories}/${resName.data.categoryId}`)
          .then((resCategory) => {
            setNameCategory(resCategory.data);
          });
      })

      .catch((err) => {});
  }, []);
  if (myName === null || nameCategory === null) return null;

  return (
    <div>
      <Header />
      <div className="container d-flex justify-content-center my-5 ">
        <div
          className="card"
          style={{ width: '18rem', display: 'flex', justifyContent: 'center' }}
        >
          <img src={blank} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              <Link
                to=""
                className="btn btn-warning d-flex justify-content-center"
              >
                Call
              </Link>
            </h5>
            <div className="card-text">
              <div>
                <h3 className="text-center mb-3">
                  {myName.firstName} {myName.lastName}
                </h3>

                <h5>Mobile: {myName.phoneNumber}</h5>
                <h5>Work: {myName.work}</h5>
                <h5>Sex: {myName.sex}</h5>
                <h5>Category: {nameCategory.categoryName}</h5>
                <Link className="btn btn-secondary btn-sm" to={'/'}>
                  {' '}
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NameDetail;
