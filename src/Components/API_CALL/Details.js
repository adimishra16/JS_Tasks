import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Details = () => {
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
      <div className="d-flex justify-content-between mb-3">
        <h2>User Details</h2>
        <Link to="/" className="btn btn-secondary">Home</Link>
      </div>

      {loading && <h3 className="text-center">Loading...</h3>}
      {error && <h4 className="text-danger text-center">{error}</h4>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark text-center">
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
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="border p-2">
                      <strong>Street:</strong> {user.address.street} <br />
                      <strong>Suite:</strong> {user.address.suite} <br />
                      <strong>City:</strong> {user.address.city} <br />
                      <strong>Zipcode:</strong> {user.address.zipcode} <br />
                      <strong>Geo:</strong> 
                      <div className="border p-2">
                        <strong>Lat:</strong> {user.address.geo.lat} <br />
                        <strong>Lng:</strong> {user.address.geo.lng}
                      </div>
                    </div>
                  </td>
                  <td>{user.phone}</td>
                  <td>
                    <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                      {user.website}
                    </a>
                  </td>
                  <td>
                    <div className="border p-2">
                      <strong>Name:</strong> {user.company.name} <br />
                      <strong>BS:</strong> {user.company.bs} <br />
                      <strong>Catchphrase:</strong> {user.company.catchPhrase}
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

export default Details;
