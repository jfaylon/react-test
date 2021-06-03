import React from "react";
import { withRouter } from "next/router";
import ProductFormStyle from "./ProductForm.module.scss";

export class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id || "",
      name: props.name || "",
      price: props.price || 0,
      description: props.description || "",
      image: props.image || "",
      tags: props.tags ? props.tags.join(",") : "",
      isEdit: props.isEdit || false,
      spiel: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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
          image: productData.image || "",
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
    const { id, name, price, description, image, tags } = this.state;
    const body = {
      name,
      price,
      description,
      image,
      tags
    };
    const url = `/api/products/${id || ""}`;
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
    this.props.router.replace(`/`, undefined);
    window.location.href = "/";
  };

  handleCancel() {
    this.props.router.replace(`/`, undefined);
    window.location.href = "/";
  }

  render() {
    const {
      id,
      name,
      price,
      description,
      image,
      tags,
      isEdit,
      spiel
    } = this.state;
    return (
      <div>
        <h3>Product Form</h3>
        <div className={ProductFormStyle["container"]}>
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
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            name="image"
            value={image}
            onChange={this.handleChange}
          />
          <label htmlFor="description">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={this.handleChange}
          />
          <button onClick={this.handleCancel}>Cancel</button>
          <button onClick={this.handleSubmit}>{isEdit ? "Edit" : "Add"}</button>
        </div>

        {spiel}
      </div>
    );
  }
}

export default withRouter(ProductForm);
