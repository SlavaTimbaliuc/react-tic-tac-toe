export function Square(props) {
    if (props.bold) {
        return (
            <button className="square" onClick={props.onClick}>
                <b>{props.value}</b>
            </button>
        );
    }
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}