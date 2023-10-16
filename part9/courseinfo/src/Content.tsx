interface CoursePart {
    name: string,
    exerciseCount: number,
}

export const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
    <>
        {
            courseParts.map((coursePart: CoursePart) => (
                <p key={coursePart.name}>{coursePart.name} {coursePart.exerciseCount}</p>
            ))
        }
    </>
);