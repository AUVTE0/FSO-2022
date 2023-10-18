import { useEffect, useState } from "react";
import { Entry, Diagnosis } from "../../types";
import diagnosisService from "../../services/diagnoses";


const EntryDetail = ({entry}: {entry: Entry}) => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
    useEffect(() => {
        const fetchDiagnoses = async () => {
          const diagnoses = await diagnosisService.getAll();
          setDiagnoses(diagnoses);
        };
        void fetchDiagnoses();
      }, []);

    const diagnosisName = (code: string) => (
        diagnoses?.find(item => item.code === code)?.name
    );
      
    return (
        <div>
            {entry.date}
            <i> {entry.description}</i>
            <ul>
                {entry.diagnosisCodes?.map(code => <li>{code} {diagnosisName(code)}</li>)}
            </ul>
        </div>
    );
};


export default EntryDetail;