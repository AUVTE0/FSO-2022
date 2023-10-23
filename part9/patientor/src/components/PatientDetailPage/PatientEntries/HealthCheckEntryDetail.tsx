import {  HealthCheckEntry } from "../../../types";
import useDiagnoses from "../../../hooks/useDiagnoses";
import HealthRatingBar from '../../HealthRatingBar';
import DetailCard from "./DetailCard";
import FactCheckIcon from '@mui/icons-material/FactCheck';

const HealthCheckEntryDetail = ({entry}: {entry: HealthCheckEntry}) => {
    const { diagnoses } = useDiagnoses();

    const diagnosisName = (code: string) => (
        diagnoses?.find(item => item.code === code)?.name
    );

    const additionalDetails = (
        <div>
            <HealthRatingBar rating={entry.healthCheckRating} showText={false}/>
            <ul>
                {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnosisName(code)}</li>)}
            </ul>
        </div>
    );

    return (
        <DetailCard
            icon={<FactCheckIcon />}
            title={entry.date} 
            body={entry.description}
            other={additionalDetails}
        />
    );
};

export default HealthCheckEntryDetail;