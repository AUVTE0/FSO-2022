import { Entry } from "../../../types";
import HealthCheckEntryDetail from "./HealthCheckEntryDetail";
import HospitalEntryDetail from "./HospitalEntryDetail";
import OccupationalEntryDetail from "./OccupationalEntryDetail";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled entry type: ${JSON.stringify(value)}`
    );
};

const EntryDetail = ({entry}: {entry: Entry}) => {
    switch(entry.type){
        case "HealthCheck":
            return <HealthCheckEntryDetail entry={entry} />;
        case "Hospital":
            return <HospitalEntryDetail entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalEntryDetail entry={entry} />;
        default:
            assertNever(entry);
            return null;
    }

};

export default EntryDetail;