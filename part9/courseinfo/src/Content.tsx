import CoursePart from "./types";
import { Part } from "./Part";

export const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
    <>
        {
            courseParts.map((coursePart: CoursePart) => (
                <Part key={coursePart.name} coursePart={coursePart}/>
            ))
        }
    </>
);