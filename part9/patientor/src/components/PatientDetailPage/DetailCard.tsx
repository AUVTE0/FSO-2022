import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface Props {
    icon: JSX.Element;
    title: string;
    subtitle?: string;
    body: string;
    other: JSX.Element;
}

const DetailCard = ({icon, title, subtitle, body, other}: Props) => (
    <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6">
                    {icon}  {title}
                </Typography>
                {
                    subtitle && (
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {subtitle}
                        </Typography>
                    )
                }
                <Typography variant="body2">
                    {body}
                </Typography>
                {other}
            </CardContent>
        </Card>
    </Box>
);

export default DetailCard;