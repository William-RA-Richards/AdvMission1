// Define a functional component named UploadAndDisplayImage
const UploadAndDisplayImage = ({
  selectedImage,
  setSelectedImage,
  uploadImage,
}) => {
  // Return the JSX for rendering
  return (
    <div>
      {/* Conditionally render the selected image if it exists */}
      {selectedImage && (
        <div>
          {/* Display the selected image */}
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br /> <br />
          {/* Button to remove the selected image */}
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}

      <br />

      {/* Input element to select an image file */}
      <input
        type="file"
        name="myImage"
        // Event handler to capture file selection and update the state
        onChange={uploadImage}
      />
    </div>
  );
};

// Export the UploadAndDisplayImage component as default
export default UploadAndDisplayImage;
