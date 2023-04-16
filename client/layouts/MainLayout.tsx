import React, {FC} from "react";
import NavBar from "@/components/NavBar";
import {Container} from "@mui/material";
import styles from '../styles/mainlayout.module.css'
import Player from "@/components/Player";
import Head from "next/head";
interface MainLayoutProps {
    title?: string,
    description?: string,
    keywords?: string,
    children: React.ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({children, title, description, keywords}) => {
    return (
        <>
            <Head>
                <title>{title || 'Spotiguy'}</title>
                <meta name="description" content={`Spotiguy - a music platform where anyone can leave a track they want. ` + description}/>
                <meta name="robots" content="index, follow"/>
                <meta name="keywords" content={keywords + 'Music, tracks, artists'}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <NavBar/>
            <Container className={styles.container}>
                {children}
            </Container>
            <Player/>
        </>
    );
};

export default MainLayout;