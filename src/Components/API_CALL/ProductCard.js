import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Badge, ListGroup, Container, Row, Col, Spinner } from "react-bootstrap";

const ProductCard = ({ product }) => {
  if (!product) return null; 

  return (
    <Card className="shadow-sm mb-4 border-0">
      <Card.Img
        variant="top"
        src={product.thumbnail || "https://via.placeholder.com/300"} 
        alt={product.title || "Product Image"}
        className="rounded-top"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text className="text-muted">{product.description}</Card.Text>
        <h5>
          <Badge bg="primary">${product.price}</Badge>{" "}
          {product.discountPercentage && (
            <Badge bg="success">-{product.discountPercentage}%</Badge>
          )}
        </h5>
        <p>
          <strong>Category:</strong> {product.category || "N/A"}
        </p>
        <p>
          <strong>Brand:</strong> {product.brand || "Unknown"}
        </p>
        <p>
          <strong>Stock:</strong>{" "}
          {product.stock > 0 ? (
            <Badge bg="success">In Stock</Badge>
          ) : (
            <Badge bg="danger">Out of Stock</Badge>
          )}
        </p>

        <Button variant="primary" className="w-100 mt-2">
          Buy Now
        </Button>
      </Card.Body>

      <Card.Footer className="bg-light">
        <h6 className="mb-2">Customer Reviews</h6>
        {product.reviews && product.reviews.length > 0 ? (
          <ListGroup variant="flush">
            {product.reviews.map((review, index) => (
              <ListGroup.Item key={index} className="small">
                <strong>{review.reviewerName}</strong> ({review.rating} ★)
                <p className="mb-1">{review.comment}</p>
                <small className="text-muted">
                  {new Date(review.date).toLocaleDateString()}
                </small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted small">No reviews yet.</p>
        )}
      </Card.Footer>
    </Card>
  );
};

const APICall6 = () => {
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
    <Container className="mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h2 className="text-center">Product List</h2>
        <Link to="/" className="btn btn-secondary">
          Home
        </Link>
      </div>

      {loading && <Spinner animation="border" className="d-block mx-auto" />}
      {error && <h4 className="text-danger text-center">{error}</h4>}

      {!loading && !error && (
        <Row xs={1} sm={2} md={3} lg={4}>
          {products.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default APICall6;
