import { DiaryEntry } from "../types";

export const Entry = ({ entry }: { entry: DiaryEntry }) => (
    <>
        <h3>{entry.date}</h3>
        <p>
            visibility: {entry.visibility}
            <br/>
            weather: {entry.weather}
        </p>
        <p>
            <i>{entry.comment}</i>
            <br/>
            <br/>
        </p>
    </>
)
