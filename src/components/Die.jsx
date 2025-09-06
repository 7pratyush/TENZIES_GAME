export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    };

    return (
        <button 
            style={styles}
            onClick={props.hold}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
        >{props.value}</button>
    )
}