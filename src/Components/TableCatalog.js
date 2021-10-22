import React, { Component } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";

class tableProducts extends Component {
  constructor() {
    super();
    this.state = { orders: [], open: false };
  }
  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleClick = () => this.setState({ orders: [1], open: true });

  render() {
    const { open } = this.state;
    const lista = this.props.Lista;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    return (
      <TableContainer
        component={Paper}
        sx={{width:"auto",height:"auto" }}
      >
        <h2 style={{textAlign:"center"}}>Productos</h2>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow>
              <TableCell>
                {" "}
                <strong>Código</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Descripción</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Imagen</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Precio</strong>
              </TableCell>
              <TableCell align="center">
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lista.map((producto) => (
              <TableRow
                key={producto.codigo}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {producto.codigo}
                </TableCell>
                <TableCell align="center">{producto.descripcion}</TableCell>
                <TableCell align="center">
                  {" "}
                  <img
                    id="image"
                    src={producto.url}
                    alt="imagen del producto"
                  />
                </TableCell>
                <TableCell align="center">{formatter.format(producto.precio)}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" size="small" onClick={()=>{this.handleOpen();this.props.Agregar(producto)}}>AGREGAR</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              open={open}
              onClose={this.handleClose}
              autoHideDuration={2000}
            >
              <Alert
                onClose={this.handleClose}
                severity="success"
                elevation={4}
                variant="filled"
              >
                Articulo agregado al carrito!
              </Alert>
            </Snackbar>
      </TableContainer>
    );
  }
}
export default tableProducts;

tableProducts.propTypes = {
  Lista: PropTypes.array,
  // Lista añadir props de lo que trae dentro
  Agregar:PropTypes.func
};
