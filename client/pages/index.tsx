import styles from '../styles/index.module.css'
import MainLayout from "@/layouts/MainLayout";
import {Button} from "@mui/material";
import {useRouter} from "next/router";
const Index = () => {
    const router = useRouter();
    return (
        <MainLayout>
            <div className={styles.center}>
                <h1>Welcome to Spotiguy!</h1>
                <h3>Listen and upload your music!</h3>
                <Button variant={"outlined"} onClick={() => router.push('/tracks')}>START</Button>
            </div>
        </MainLayout>
    );
};

export default Index;