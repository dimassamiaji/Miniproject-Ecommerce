// components/ReviewFormComponent.jsx

const ReviewFormComponent = ({ onReviewSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const review = formData.get('review');
    const rating = formData.get('rating');
    onReviewSubmit({ review, rating });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        name="review"
        className="w-full p-2 border rounded-lg"
        placeholder="Write your review here..."
        required
      ></textarea>
      <select
        name="rating"
        className="w-full p-2 border rounded-lg"
        required
      >
        <option value="">Rate the event</option>
        {[...Array(5)].map((_, i) => (
          <option key={i} value={i + 1}>{i + 1} Star{(i !== 0) ? 's' : ''}</option>
        ))}
      </select>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewFormComponent;
