import { Entry } from "./Entry";
import { DiaryEntry } from "../types";

export const Content = ({ entries }: { entries: DiaryEntry[] }) => (
    <>
        {
            entries.map((entry: DiaryEntry) => (
                <Entry key={entry.date} entry={entry}/>
            ))
        }
    </>
);