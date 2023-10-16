import CoursePart from "./types";

export const Part = ({ coursePart }: { coursePart: CoursePart }) => {

    switch(coursePart.kind){
        case "basic":
            return (
                <p>
                    <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
                    <i>{coursePart.description}</i>
                </p>
            )
        case "background":
            return (
                <p>
                    <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
                    <i>{coursePart.description}</i>
                    {coursePart.backgroundMaterial}
                </p>
            )
        case "group":
            return (
                <p>
                    <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
                    project exercises {coursePart.groupProjectCount}
                </p>
            )
        default:
            return null;

    }
};