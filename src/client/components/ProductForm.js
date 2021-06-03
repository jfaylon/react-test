import React from "react";

import ProductFormStyle from "./ProductForm.module.scss";

export class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id || "",
      name: props.name || "",
      price: props.price || 0,
      description: props.description || "",
      imageUrl: props.imageUrl || "",
      tags: props.tags ? props.tags.join(",") : "",
      isEdit: props.isEdit || false,
      spiel: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidUpdate(prevProps) {
    const { props } = this;
    if (prevProps.id !== props.id) {
      const response = await fetch(`/api/products/${props.id}`);
      const product = await response.json();
      if (product.data) {
        const productData = product.data;
        this.setState({
          id: productData.id || "",
          name: productData.name || "",
          price: productData.price || 0,
          description: productData.description || "",
          imageUrl: productData.imageUrl || "",
          tags: productData.tags ? productData.tags.join(",") : "",
          isEdit: props.id ? true : false
        });
      }
    }
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async e => {
    const { id, name, price, description, imageUrl, tags } = this.state;
    const body = {
      name,
      price,
      description,
      imageUrl,
      tags
    };
    const url = `/api/products/${id || ""}`;
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status >= 200 && response.status <= 299) {
      this.setState({
        spiel: "Success"
      });
    } else {
      this.setState({
        spiel: "Fail"
      });
    }
  };

  render() {
    const {
      id,
      name,
      price,
      description,
      imageUrl,
      tags,
      isEdit,
      spiel
    } = this.state;
    return (
      <div>
        <h3>Product Form</h3>
        <form className={ProductFormStyle["container"]}>
          {id && (
            <>
              <label htmlFor="id">ID</label>
              <input
                type="text"
                name="id"
                value={id}
                readOnly
                disabled="disabled"
              />
            </>
          )}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={this.handleChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={imageUrl}
            onChange={this.handleChange}
          />
          <label htmlFor="description">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>{isEdit ? "Edit" : "Add"}</button>
        </form>
        {spiel}
      </div>
    );
  }
}

export default ProductForm;
