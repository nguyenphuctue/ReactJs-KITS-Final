// eslint-disable-next-line react/prop-types
function Button({value, onClick, styleColor}){
    const styleObj = {
        backgroundColor: styleColor
    }
    return (
        <button onClick={onClick} className="calc-button" style={styleObj}>{value}</button>
    );
}

export default Button;