import { Gender, Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const GenderIcon = (gender: Gender) => {
    switch(gender){
        case Gender.Female:
            return < FemaleIcon />;
        case Gender.Male:
            return < MaleIcon />;
        default:
            return < AcUnitIcon />;
    }
};

const PatientSummary = ({patient} : {patient: Patient}) => (
    <div>
        <h1>{patient.name} {GenderIcon(patient.gender)}</h1>
        <p>
            ssn: {patient.ssn} 
            <br/>
            occupation: {patient.occupation}
        </p>
    </div>
);

export default PatientSummary;