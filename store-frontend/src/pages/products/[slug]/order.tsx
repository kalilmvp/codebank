import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import {
    Avatar, Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia, Grid,
    ListItem,
    ListItemAvatar, ListItemText, TextField,
    Typography
} from "@material-ui/core";
import { Product, products } from "../../../models";
import http from "../../../http";
import axios from "axios";

interface OrderDetailsPageProps {
    product: Product
}

const OrderPage: NextPage<OrderDetailsPageProps> = ({ product }) => {
    return (
        <div>
            <Head>
                <title>Payment</title>
                {/*<meta name="description" content="Generated by create next app" />*/}
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>
            <Typography component="h1" variant="h3" color="textPrimary" gutterBottom>
                Checkout
            </Typography>
            <ListItem>
                <ListItemAvatar>
                    <Avatar src={product.image_url}/>
                </ListItemAvatar>
                <ListItemText
                    primary={product.name}
                    secondary={`R$ ${product.price}`}
                />
            </ListItem>
            <Typography component="h2" variant="h6" gutterBottom>
                Pay with credit card
            </Typography>
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField required type="number" label="Name" fullWidth/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField required label="Card's Number" fullWidth inputProps={{ maxLength: 16 }}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField required type="number" label="CVV" fullWidth/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField required type="number" label="Expiration's Month" fullWidth/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField required type="number" label="Expiration's Year" fullWidth/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box marginTop={3}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Pay
                    </Button>
                </Box>
            </form>
        </div>
    )
}

export default OrderPage

export const getServerSideProps: GetServerSideProps<OrderDetailsPageProps, { slug: string }> = async (context) => {
    const { slug } = context.params!;
    try {
        const { data: product } = await http.get(`products/${slug}`)
        // console.log(product);
        return {
            props: {
                product
            }
        }
    } catch (e) {
        if (axios.isAxiosError(e) && e.response!.status === 404) {
            return {
                notFound: true
            }
        }
        throw e;
    }
}
