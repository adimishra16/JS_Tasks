import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StoreApi = () => {
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
            <div className="d-flex justify-content-between mb-3">
                <h2>Store Products</h2>
                <Link to="/" className="btn btn-secondary">
                    Home
                </Link>
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
                                <th>Title</th>
                                <th>Price ($)</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Image</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{product.id}</td>
                                    <td>{product.title}</td>
                                    <td className="text-center">${product.price.toFixed(2)}</td>
                                    <td style={{ maxWidth: "250px", whiteSpace: "normal" }}>
                                        {product.description}
                                    </td>
                                    <td className="text-center">{product.category}</td>
                                    <td className="text-center">
                                        <img
                                            src={product.image}
                                            alt="Product"
                                            className="img-fluid rounded"
                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                        />
                                    </td>
                                    <td className="text-center">
                                        <strong>{product.rating.rate} ★</strong>
                                        <br />
                                        <small>{product.rating.count} reviews</small>
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

export default StoreApi;
