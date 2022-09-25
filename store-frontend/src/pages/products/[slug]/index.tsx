import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@material-ui/core";
import axios from "axios";
import { Product, products } from "../../../models";
import http from "../../../http";
import Link from "next/link";

interface ProductDetailsPageProps {
    product: Product
}

const ProductDetailPage: NextPage<ProductDetailsPageProps> = ({ product }) => {
    return (
        <div>
            <Head>
                <title>{`${product.name} - Details`}</title>
                {/*<meta name="description" content="Generated by create next app" />*/}
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>

            <Card>
                <CardHeader
                    title={product.name.toUpperCase()}
                    subheader={`R$ ${product.price}`}
                />
                <CardActions>
                    <Link href="/products/[slug]/order"
                          as={`/products/${product.slug}/order`}
                          passHref
                    >
                        <Button size="small" color="primary" component="a">Buy</Button>
                    </Link>
                </CardActions>

                <CardMedia style={{ paddingTop: '56%' }} image={product.image_url}/>
                <CardContent>
                    <Typography component="p" variant="body2" color="textSecondary">
                        {product.description}
                    </Typography>
                </CardContent>
            </Card>

        </div>
    )
}

export default ProductDetailPage

export const getStaticProps: GetStaticProps<ProductDetailsPageProps, { slug: string }> = async (context) => {
    const { slug } = context.params!;
    try {
        const { data: product } = await http.get(`products/${slug}`)
        // console.log(product);
        return {
            props: {
                product
            },
            revalidate: 1 * 60 * 2
        }
    } catch (e) {
        if (axios.isAxiosError(e) && e.response?.status === 404) {
            return {
                notFound: true
            }
        }
        throw e;
    }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
    const { data: product } = await http.get(`products`)
    const paths = products.map((p: Product) => {
        return { params: { slug: p.slug } }
    })

    return { paths, fallback: 'blocking' }
}
