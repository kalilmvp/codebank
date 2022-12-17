import type { AppProps } from 'next/app'
import { Box, Container, CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "../theme";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        jssStyles?.parentElement?.removeChild(jssStyles);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <CssBaseline/>
                <Navbar />
                <Container>
                    <Box marginTop={5}>
                        <Component {...pageProps} />
                    </Box>
                </Container>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default MyApp
