import React from 'react';
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem"
import { Link } from "react-router-dom"

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();
    
    // const isEmpty = !cart.line_items.length;
    // const isEmpty = Object.keys(cart).length && !cart.line_items.length;

    const EmptyCart = () => (
        <Typography variant="subtitle1" >You have no items in your shopping cart, ☹️
            <Link to = "/" className={classes.link}> start adding some </Link>!
        </Typography>
    )

    if(!cart.total_items) return "Loading....";

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>

                {cart.line_items.map((lineItem) => (
                    <Grid item xs={12} sm={4} key={lineItem.id}>
                        <CartItem 
                        item={lineItem}
                        onUpdateCartQty = { handleUpdateCartQty }
                        onRemoveFromCart = { handleRemoveFromCart }
                        />
                    </Grid>
                ))}

                <div className={classes.cardDetails}>
                    <Typography variant="h4">
                        SubTotal: {cart.subtotal.formatted_with_symbol}
                    </Typography>

                    <div>
                        <Button 
                        className={classes.emptyButton} 
                        size="large" 
                        type="button" 
                        variant="contained" 
                        color="secondary"
                        onClick = { handleEmptyCart }>
                            Empty Cart
                        </Button>

                        <Button 
                        className={classes.checkoutButton} 
                        size="large" 
                        type="button" 
                        variant="contained" 
                        color="primary"
                        component = { Link }
                        to = "/checkout">
                            Checkout
                        </Button>
                    </div>

                </div>
            </Grid>
        </>
    )

    // console.log(cart.total_items === 0)

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant= "h3" gutterBottom >Your Shopping Cart</Typography>
            {/* {EmptyCart()} */}
            {cart.total_items === 0 ? EmptyCart() : FilledCart() }
        </Container>
    )
}

export default Cart
