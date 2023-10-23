import { Typography } from "@mui/material";
import {  HospitalEntry } from "../../../types";
import DetailCard from "./DetailCard";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntryDetail = ({entry}: {entry: HospitalEntry}) => {

    const additionalDetails = (
        <Typography variant="body2">
            <br/>
            Discharged <b>{entry.discharge.date}</b> 
            <br/>
            <i>{entry.discharge.criteria}</i>
        </Typography>
    );

    return (
        <DetailCard
            icon={<LocalHospitalIcon htmlColor="red"/>}
            title={entry.date} 
            subtitle={entry.specialist? `Diagnosed by ${entry.specialist}`: undefined}
            body={entry.description}
            other={additionalDetails}
        />
    );
};

export default HospitalEntryDetail;