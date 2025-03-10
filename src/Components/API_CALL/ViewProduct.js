import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("https://api.escuelajs.co/api/v1/products")
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
        <div className="container mt-4">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-primary">Product List</h2>
                <Link to="/" className="btn btn-outline-dark">🏠 Home</Link>
            </div>

            {/* Loading & Error Messages */}
            {loading && (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <h4 className="mt-3">Loading products...</h4>
                </div>
            )}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            {/* Product Table */}
            {!loading && !error && (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover shadow-sm">
                        <thead className="table-dark text-center">
                            <tr>
                                <th>#</th>
                                <th className="text-nowrap">ID</th>
                                <th>Title</th>
                                <th>Slug</th>
                                <th>Price ($)</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Images</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id} className="align-middle text-center">
                                    <th scope="row">{index + 1}</th>
                                    <td className="text-nowrap">{product.id}</td>
                                    <td className="fw-bold text-primary">{product.title}</td>
                                    <td>{product.slug}</td>
                                    <td className="fw-bold text-success">${product.price.toFixed(2)}</td>

                                    {/* Description with Tooltip */}
                                    <td className="text-start" style={{ maxWidth: "250px" }}>
                                        <span className="d-inline-block text-truncate" style={{ maxWidth: "200px" }}
                                              title={product.description}>
                                            {product.description}
                                        </span>
                                    </td>

                                    {/* Category Info */}
                                    <td className="text-start">
                                        <div className="border p-2 bg-light rounded">
                                            <strong>{product.category.name}</strong>
                                            <br />
                                            <img src={product.category.image} 
                                                 alt="Category" 
                                                 className="img-fluid rounded shadow-sm" 
                                                 width="50" />
                                        </div>
                                    </td>

                                    {/* Product Images */}
                                    <td>
                                        <div className="d-flex flex-wrap justify-content-center">
                                            {product.images.map((img, i) => (
                                                <img key={i} src={img} 
                                                     alt="Product" 
                                                     className="img-thumbnail mx-1 border shadow-sm"
                                                     width="50" height="50" />
                                            ))}
                                        </div>
                                    </td>

                                    {/* View Details Button */}
                                    <td>
                                        <Link to={`/product/${product.id}`} className="btn btn-sm btn-outline-primary">
                                            View Details
                                        </Link>
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

export default ViewProduct;
