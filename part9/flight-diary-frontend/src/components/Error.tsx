const style = {
    color: 'red'
};

export const Error = ({ text }: { text: string|undefined }) => (
    text? <b style={style}>{text}</b> : null
);