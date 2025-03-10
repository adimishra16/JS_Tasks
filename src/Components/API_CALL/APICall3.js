import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const APICall3 = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("https://fakestoreapi.com/products")
            .then((res) => {
                setProducts(res.data);
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
                                <th>Title</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Image</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.id}</td>
                                    <td>{product.title}</td>
                                    <td>${product.price}</td>
                                    <td className="text-truncate" style={{ maxWidth: "200px" }}>
                                        {product.description}
                                    </td>
                                    <td>{product.category}</td>
                                    <td>
                                        <div className="border p-2">
                                            <img
                                                src={product.image}
                                                alt="Category"
                                                className="img-fluid"
                                                width="50"
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="border p-2">
                                            <strong>rate:</strong> {product.rating.rate} <br />
                                            <strong>count:</strong> {product.rating.count} <br />
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

export default APICall3;