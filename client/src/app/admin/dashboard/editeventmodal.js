
// EditEventModal component (could be in a separate file)
function EditEventModal({ isOpen, event, onClose, onSubmit }) {
  // useFormik hook for form management
  const formik = useFormik({
    initialValues: {
      eventName: event ? event.eventName : "",
      price: event ? event.price : "",
      // ... other event fields
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg">
        <form onSubmit={formik.handleSubmit}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-0 right-0 mt-2 mr-2 text-2xl font-bold"
          >
            &times;
          </button>

          {/* Event Name Field */}
          <label htmlFor="eventName">Event Name</label>
          <input
            id="eventName"
            name="eventName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.eventName}
          />

          {/* Price Field */}
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.price}
          />

          {/* ... other fields for editing the event */}

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
