import Header from "./Components/Header";
import React, { Component } from "react";
import Table from "./Components/TableCatalog";
import "./App.css";
import CurrentCart from "./Components/CurrentCart";

class App extends Component {
  constructor() {
    super();
    this.state = {
      carrito: [],
      total: 0,
      productosLista: [
        {
          codigo: 1,
          descripcion: "Huawei Matebook D 15",
          precio: 15899,
          url: "https://m.media-amazon.com/images/I/61zKGsIdoPL._AC_SY355_.jpg",
        },
        {
          codigo: 2,
          descripcion: "Samsung Galaxy S10",
          precio: 13999,
          url: "https://cdn-files.kimovil.com/phone_front/0002/92/thumb_191056_phone_front_big.jpeg",
        },
        {
          codigo: 3,
          descripcion: "Samsung Galaxy A01",
          precio: 1850,
          url: "https://http2.mlstatic.com/D_NQ_NP_926246-MLA44282592285_122020-O.jpg",
        },
        {
          codigo: 4,
          descripcion: "Xiaomi Redmi Note 9s",
          precio: 5949,
          url: "https://m.media-amazon.com/images/I/61ShPQu-u0L._AC_SX522_.jpg",
        },
        {
          codigo: 5,
          descripcion: "Mochila Xiaomi",
          precio: 699,
          url: "https://m.media-amazon.com/images/I/51wu2dpWapL._AC_SX569_.jpg",
        },
        {
          codigo: 6,
          descripcion: "Teclado Primus Gaming Ballista",
          precio: 1999,
          url: "https://www.primusgaming.com/media/PKS-301_620.jpg",
        },
      ],
    };
  }
  agregar = (producto) => {
    let carritoTemporal = [];
    carritoTemporal = this.state.carrito;
    if (this.state.carrito.includes(producto)) {
      let index = this.state.carrito.indexOf(producto);
      producto.cantidad = this.state.carrito[index].cantidad + 1;
      producto.importe = this.state.carrito[index].precio * producto.cantidad;
      carritoTemporal.splice(index, 1, producto);
      this.setState({
        ...this.state,
        carrito: carritoTemporal,
      });
    } else {
      producto.cantidad = 1;
      producto.importe = producto.precio;
      carritoTemporal.push(producto);
      this.setState({
        ...this.state,
        carrito: carritoTemporal
      });
    }
  };

  eliminarCarrito=()=>{
    let carritoTemporal = [];
    this.setState({
      ...this.state,
      carrito: carritoTemporal
    });
  }

  eliminar = (producto) => {
    let carritoTemporal = [];
    carritoTemporal = this.state.carrito;
    if (this.state.carrito.includes(producto)) {
      let index = this.state.carrito.indexOf(producto);
      if (producto.cantidad > 1) {
        producto.cantidad = this.state.carrito[index].cantidad - 1;
        producto.importe = this.state.carrito[index].precio * producto.cantidad;
        carritoTemporal.splice(index, 1, producto);
        this.setState({
          ...this.state,
          carrito: carritoTemporal,
        });
      } else {
        carritoTemporal.splice(index, 1);
        this.setState({
          ...this.state,
          carrito: carritoTemporal,
        });
      }
    } else {
      alert("Algo salio mal");
    }
  };

  render() {
    return (
      <div className="App">
        <Header></Header>
        <br />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Table
            id="tablaizquierda"
            Lista={this.state.productosLista}
            Agregar={this.agregar}
          >
            {" "}
          </Table>
          <CurrentCart carrito={this.state.carrito} eliminar={this.eliminar} eliminarCarrito={this.eliminarCarrito}></CurrentCart>
        </div>
      </div>
    );
  }
}

export default App;
