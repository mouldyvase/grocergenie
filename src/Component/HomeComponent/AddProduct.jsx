import React, { useState } from "react";
import axiosFetch from "../../Helper/Axios";
import "./AddProduct.css"

export const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState(null); // For storing the selected image file


  const handleAddProduct = async () => {
    // Validate inputs 
    if (!productName || !description || !price || !weight || !image) {
      alert("Please fill in all fields");
      return;
    }

    // Create a new FormData object to handle file uploads
    const formData = new FormData();
    formData.append("productname", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("weight", weight);
    formData.append("img", image);

    try {
      // Make a request to add the new product
      const response = await axiosFetch({
        url: "product/add",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data", // Set content type for file uploads
        },
      });

      // Handle success
      console.log(response.data);

      // Optionally, you can clear the form fields or perform other actions

    } catch (error) {
      // Handle error
      console.error("Error adding product:", error);
    }
  };

  const handleImageChange = (e) => {
    // Update the state with the selected image file
    setImage(e.target.files[0]);
  };

  return (
    <section className="section add-product">
      <div className="container">
        <h2 className="h2 section-title">Add New Product </h2>
        <br></br>
        <form className="product-form">
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight</label>
            <input
              type="text"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button type="button" onClick={handleAddProduct} className="add-product-btn">
            Add Product
          </button>
        </form>
      </div>
    </section>
  );
};
