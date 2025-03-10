import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const APICall7 = () =>{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      axios
        .get("https://gorest.co.in/public/v2/users")
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
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                    <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        <td className={user.status === 'active' ? 'text-success' : 'text-danger' }>{user.status}</td>

                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );

}

export default APICall7;