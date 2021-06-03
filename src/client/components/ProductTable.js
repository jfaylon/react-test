import React from "react";
import { withRouter } from "next/router";
export class ProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      redirectId: "",
      spiel: ""
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    const response = await fetch(`/api/products/`);
    const products = await response.json();
    this.setState({
      data: products.data
    });
  }

  async handleDelete(e) {
    const id = e.target.value;
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    window.location.href = window.location.href;
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <h3>Product List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <button
                      onClick={() => this.props.router.push(`/?id=${item.id}`)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={this.handleDelete} value={item.id}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default withRouter(ProductTable);
