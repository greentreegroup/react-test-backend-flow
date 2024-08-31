import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  BACKEND_DELETE_URL,
  BACKEND_SHOW_DATA_URL,
  BACKEND_UPDATE_URL,
} from "./urls";
import Table from "./Table";
import ConfirmDeleteModal from "./modal";

const ProtectedPage = () => {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [userIdToDelete, setUserIdToDelete] = useState(null); // Track which user is to be deleted

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      setFetchLoading(true);

      const response = await fetch(BACKEND_SHOW_DATA_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const results = data.d.results;
      setUserData(results);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setUserIdToDelete(id);
    setShowModal(true); // Show modal when delete button is clicked
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const token = await getAccessTokenSilently();
      const url = BACKEND_DELETE_URL(userIdToDelete);
      //console.log(`url: ${url}`)

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });

      if (response.ok) {
        fetchData();
      } else {
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      setDeleteLoading(false);
      setShowModal(false); // Close modal after delete
      setUserIdToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setUserIdToDelete(null); // Reset user ID
  };

  const updateEmail = async () => {
    try {
      setFetchLoading(true);
      const token = await getAccessTokenSilently();
      console.log(`token: ${token}`);

      //const jwtValidationResponse = await fetch('http://localhost:5000/api/private', {
      //    method: 'GET',
      //    headers: {
      //	'Authorization': `Bearer ${token}`  // Pass the token in the Authorization header
      //    }
      //});
      //
      //if (!jwtValidationResponse.ok) {
      //    throw new Error('Failed JWT Validation');
      //}

      //const jwtValidationData = await jwtValidationResponse.json();
      //console.log('JWT Validation Response:', jwtValidationData);

      const response = await fetch(BACKEND_UPDATE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserName: userName, Email: email, token }),
      });
      const data = await response.json();
      console.log("Data:", data);
      console.log("Success!");
      setFetchLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  if (isLoading || fetchLoading || deleteLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <div className="container">
            <div className="row">
              {/* Username input */}
              <div className="col-12 col-md-3 mb-3">
                <div className="input-group">
                  <input
                    className="input-group mb-3"
                    type="text"
                    placeholder="UserName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email input */}
              <div className="col-12 col-md-3 mb-3">
                <div className="input-group">
                  <input
                    className="input-group mb-3"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-12 col-md-3 mb-3">
                <div className="input-group">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={updateEmail}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Table
            userData={userData}
            isAuthenticated={isAuthenticated}
            handleDelete={handleDeleteClick}
          />
          <ConfirmDeleteModal
            showModal={showModal}
            confirmDelete={handleDelete}
            cancelDelete={cancelDelete}
          />
        </div>
      ) : (
        <button className="btn btn-primary" onClick={() => loginWithRedirect()}>
          Log In
        </button>
      )}
    </div>
  );
};

export default ProtectedPage;
