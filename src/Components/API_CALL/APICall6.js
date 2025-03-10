import axios from "axios";
import { useEffect, useState, React } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Badge, ListGroup, Container, Row, Col } from "react-bootstrap";

export const ProductCard = ({ product }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Img variant="top" src={product.thumbnail} alt={product.title} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <h5>
          ${product.price}{" "}
          <Badge bg="success">-{product.discountPercentage}%</Badge>
        </h5>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Brand:</strong> {product.brand}
        </p>
        <p>
          <strong>Stock:</strong> {product.stock > 0 ? "Available" : "Out of stock"}
        </p>
        <p>
                  <strong>Tags:</strong> {
                      product.tags.map((v, i) => ( `${v},` )
                      )
                  }
        </p>
        <p>
          <strong>Weight:</strong> {product.weight} kg
        </p>
        <p>
          <strong>WarrantyInformation:</strong> {product.warrantyInformation}
        </p>
        <p>
          <strong>ShippingInformation:</strong> {product.shippingInformation} 
        </p>
        <p>
          <strong>AvailabilityStatus:</strong> {product.availabilityStatus} 
        </p>
        <p>
          <strong>ReturnPolicy:</strong> {product.returnPolicy} 
        </p>
        <p>
          <strong>MinimumOrderQuantity:</strong> {product.minimumOrderQuantity} 
        </p>
        <p>
          <strong>WarrantyInformation:</strong> {product.warrantyInformation} 
        </p>

        {/* <Button variant="primary">Buy Now</Button> */}
      </Card.Body>
      <Card.Footer>
        <h6 className="mb-2">Customer Reviews</h6>
        {product.reviews && product.reviews.length > 0 ? (
          <ListGroup variant="flush">
            {product.reviews.map((review, index) => (
              <ListGroup.Item key={index}>
                <strong>{review.reviewerName}</strong> ({review.rating} ★)
                <p className="mb-1">{review.comment}</p>
                <small className="text-muted">{new Date(review.date).toLocaleDateString()}</small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted">No reviews yet.</p>
        )}
      </Card.Footer>
    </Card>
  );
};


const APICall6 = () =>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("https://dummyjson.com/products")
            .then((res) => {
                setProducts(res.data.products);
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
               <Row>
               {products.map((product) => (
                 <Col key={product.id} md={4}>
                   <ProductCard product={product} />
                 </Col>
               ))}
             </Row>
            )}
        </div>
    );
}

export default APICall6;