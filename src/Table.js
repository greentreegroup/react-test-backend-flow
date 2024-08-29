import React from 'react';

const Table = ({ userData, isAuthenticated, handleDelete }) => {
  return (
    <table className="table table-striped table-hover mt-4">
      <thead className="thead-dark">
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Phone Number</th>
          {isAuthenticated && <th scope="col">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {userData.map((user, index) => (
          <tr key={user.ID || index}>
            <td>{user.FirstName}</td>
            <td>{user.LastName}</td>
            <td>{user.Phonenumber}</td>
            {isAuthenticated && (
              <td>
                <button className="btn btn-secondary btn-sm" onClick={() => handleDelete(user.ID)}>
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
