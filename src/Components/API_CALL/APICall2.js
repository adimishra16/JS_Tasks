import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const APICall2 = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Fetch Error:", err);
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5">
      {/* Home Button */}
      <div className="mb-3">
        <Link to="/" className="btn btn-secondary">
          Home
        </Link>
      </div>

      {/* Loading & Error Handling */}
      {loading && <h3 className="text-center">Loading...</h3>}
      {error && <h4 className="text-danger text-center">{error}</h4>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover border">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Id</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                  <div className="border p-2">
                    <strong>street:</strong> {user.address.street} <br />
                    <strong>suite:</strong> {user.address.suite} <br />
                    <strong>city:</strong> {user.address.city}<br />
                    <strong>zipcode:</strong> <br/> {user.address.zipcode}<br />
                    <strong>geo:</strong>
                    <div className="border p-2">
                    <strong>lat:</strong>{user.address.geo.lat}<br />
                    <strong>lng:</strong>{user.address.geo.lat}
                    </div>
                     
                    </div>
                  </td>
                  <td>{user.phone}</td>
                  <td><a href={user.website} target="_blank">{user.website}</a></td>
                  <td>
                    <div className="border p-2">
                      <strong>Name:</strong> {user.company.name} <br />
                      <strong>Bs:</strong> {user.company.bs} <br />
                      <strong>CatchPhrase:</strong> {user.company.catchPhrase}
                    </div>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default APICall2;
