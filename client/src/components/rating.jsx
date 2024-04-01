// components/RatingDisplayComponent.jsx

const RatingDisplayComponent = ({ rating }) => {
    // Logic to display the filled stars based on the rating
    const filledStars = Math.round(rating);
    const emptyStars = 5 - filledStars;
  
    return (
      <div className="flex">
        {[...Array(filledStars)].map((_, i) => (
          <span key={i} className="text-yellow-500">★</span>
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="text-gray-300">★</span>
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };
  
  export default RatingDisplayComponent;
  