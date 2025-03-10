import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const APICall5 = () => {

    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        axios.get("https://dummyjson.com/quotes")
        .then(res=>{
            setQuotes(res.data.quotes)
            setLoading(false);

        })
        .catch((err) => {
          console.error("API Fetch Error:", err);
          setError("Failed to fetch data. Please try again.");
          setLoading(false);
        });
    },[])


    return (
        <div className="container mt-4">

            {/* Home Button */}
            <div className="mb-3">
                <Link to="/" className="btn btn-secondary">
                    Home
                </Link>
            </div>



            <h2 className="text-center mb-4">Inspirational Quotes</h2>
            {/* Loading & Error Handling */}
            {loading && <h3 className="text-center">Loading...</h3>}
            {error && <h4 className="text-danger text-center">{error}</h4>}

            {!loading && !error && (

                <div className="row">
                    {
                        quotes.map((quote, index) => (
                            < div className="col-md-6 mb-4" key={quote.id}>
                                <div className="card shadow">
                                    <div className="card-body">
                                        <blockquote className="blockquote mb-0">
                                            <p>"{quote.quote}"</p>
                                            <footer className="blockquote-footer">{quote.author}</footer>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    );
};

export default APICall5;
