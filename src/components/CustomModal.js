import React from 'react';

const CustomModel = ({
  title = 'Error',
  message = '',
  onCancel = () => {},
  onConfirm = () => {},
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: '70%',
          padding: '30px',
          backgroundColor: '#fff',
          borderRadius: '5px',
        }}
      >
        <h1 className="text-center fs-3"> {title}</h1>
        <p className="text-center">{message} </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <button onClick={onConfirm} className="btn btn-primary w-25">
            Ok
          </button>
          <button onClick={onCancel} className="btn btn-danger w-25">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModel;
