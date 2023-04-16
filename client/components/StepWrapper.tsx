import React, {FC} from "react";
import {Card, Container, Grid, Step, StepLabel, Stepper} from "@mui/material";
import styles from '../styles/StepWrapper.module.scss'
interface StepWrapperProps {
    activeStep: number;
    children: React.ReactNode;
    steps: string[]
}

const StepWrapper: FC<StepWrapperProps> = ({activeStep, children, steps}) => {
    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) =>
                    <Step
                        key={index}
                        completed={activeStep > index}
                    >
                        <StepLabel>
                            {step}
                        </StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid container justifyContent="center" className={styles.container}>
                <Card className={styles.card}>
                    {children}
                </Card>
            </Grid>
        </Container>
    );
};

export default StepWrapper;