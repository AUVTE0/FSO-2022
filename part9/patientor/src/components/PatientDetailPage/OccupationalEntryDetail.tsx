import { OccupationalHealthcareEntry } from "../../types";
import useDiagnoses from "../../hooks/useDiagnoses";
import DetailCard from "./DetailCard";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { Typography } from "@mui/material";

const OccupationalEntryDetail = ({entry}: {entry: OccupationalHealthcareEntry}) => {
    const { diagnoses } = useDiagnoses();

    const diagnosisName = (code: string) => (
        diagnoses?.find(item => item.code === code)?.name
    );

    const additionalDetails = (
        <div>
            {
                entry.sickLeave && (
                    <Typography variant="body2">
                        <br/>
                        Sick leave from <b>{entry.sickLeave?.startDate}</b> 
                        to <b>{entry.sickLeave?.endDate}</b>
                    </Typography>
                )
            }

            <ul>
                {entry.diagnosisCodes?.map(code => <li>{code} {diagnosisName(code)}</li>)}
            </ul>
        </div>
    );

    return (
        <DetailCard
            icon={<HealthAndSafetyIcon htmlColor="darkblue"/>}
            title={entry.date} 
            subtitle={entry.specialist? `Diagnosed by ${entry.specialist}`: undefined}
            body={entry.description}
            other={additionalDetails}
        />
    );
};

export default OccupationalEntryDetail;