import { Entry } from "../../../types";
import EntryDetail from "./EntryDetail";

const PatientEntries = ({entries}: {entries: Entry[]}) => (
    <div>
        <h3>Entries</h3>
        {entries.map(entry => <EntryDetail key={entry.id} entry={entry}/>)}
    </div>
);

export default PatientEntries;