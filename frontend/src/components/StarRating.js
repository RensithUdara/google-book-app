import React from "react";

const StarRating = ({ rating }) => {
    const stars = Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? "star filled" : "star"}>
            ★
        </span>
    ));
    return <div className="star-rating">{stars}</div>;
};

export default StarRating;
