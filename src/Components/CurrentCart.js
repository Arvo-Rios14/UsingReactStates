import React, { Component } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";


class CurrentCart extends Component {
  constructor() {
    super();
    this.state = { orders: [], open: false };
  }
  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleClick = () => this.setState({ orders: [1], open: true });
  render() {
    const { open } = this.state;

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    var carrito = this.props.carrito;
    let total= 0;
    carrito.map(element=>total=element.importe+total);
    return (
      <TableContainer component={Paper} sx={{ width: "auto", height: "auto" }}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <h2 style={{ textAlign: "center" }}>Mi carrito</h2>
          <IconButton aria-label="delete" size="medium"   onClick={() => {
                      this.props.eliminarCarrito();
                    }}>
          <DeleteForeverIcon fontSize="inherit" />
        </IconButton>
        <h4>Total: {formatter.format(total)}</h4>

        </div>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ backgroundColor: "blue" }}>
            <TableRow>
              <TableCell>
                <strong>Cantidad</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Código</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Descripción</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Precio</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Importe</strong>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carrito.map((producto) => (
              <TableRow
                key={producto.codigo}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {producto.cantidad}
                </TableCell>
                <TableCell align="center">{producto.codigo}</TableCell>
                <TableCell align="center">{producto.descripcion}</TableCell>
                <TableCell align="center">{formatter.format(producto.precio)}</TableCell>
                <TableCell align="center">{formatter.format(producto.importe)}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => {
                      this.handleOpen();
                      this.props.eliminar(producto);
                    }}
                  >
                    Eliminar
                  </Button>
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
                severity="error"
                elevation={4}
                variant="filled"
              >
                Articulo eliminado del carrito!
              </Alert>
            </Snackbar>
      </TableContainer>
    );
  }
}
export default CurrentCart;
