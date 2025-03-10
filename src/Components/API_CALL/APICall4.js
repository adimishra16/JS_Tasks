import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const APICall4 = () =>{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      axios
        .get("https://reqres.in/api/users")
        .then((res) => {
          setUsers(res.data.data);
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
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Avatar</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                    <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td width={80}>
                            <div className="border p-2">
                                <img
                                    src={user.avatar}
                                    alt="Avatar"
                                    className="img-fluid"
                                    width="50"
                                />
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

}

export default APICall4;