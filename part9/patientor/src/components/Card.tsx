import { ReactNode } from "react";
import { Box, Card, CardContent } from '@mui/material';


const CardComponent = ({ children, minWidth }:{ children: ReactNode, minWidth: number }) => (
    <Box sx={{ minWidth: minWidth, marginBottom: 5 }}>
        <Card variant='elevation'>
            <CardContent>
                {children}
            </CardContent>
        </ Card>
    </Box>
);

export default CardComponent;