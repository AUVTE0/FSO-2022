import Typography from '@mui/material/Typography';
import CardComponent from '../../Card';

interface Props {
    icon: JSX.Element;
    title: string;
    subtitle?: string;
    body: string;
    other: JSX.Element;
}

const DetailCard = ({icon, title, subtitle, body, other}: Props) => (
    <CardComponent minWidth={275}>
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
    </CardComponent>

);

export default DetailCard;