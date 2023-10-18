import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Gender, Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import EntryDetail from "./EntryDetail";

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

const PatientDetailPage = () => {
    const id = useParams().id;
    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {
        const fetchPatient = async () => {
          const patient = await patientService.getOne(id ?? '');
          setPatient(patient);
        };
        void fetchPatient();
      }, [id]);

    return patient? (
        <>
            <div>
                <h1>{patient.name} {GenderIcon(patient.gender)}</h1>
                <p>
                    ssn: {patient.ssn} 
                    <br/>
                    occupation: {patient.occupation}
                </p>
            </div>
            <div>
                <h3>entries</h3>
                {patient.entries.map(entry => <EntryDetail entry={entry}/>)}
            </div>

        </>

    )
    : null;
};

export default PatientDetailPage;