import { Entry } from "../../types";

const EntryDetail = ({entry}: {entry: Entry}) => (
    <div>
        {entry.date}
        <i> {entry.description}</i>
        <ul>
            {entry.diagnosisCodes?.map(code => <li>{code}</li>)}
        </ul>
    </div>
);

export default EntryDetail;