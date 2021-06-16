// props.variant: primary, danger, disabled
// props.type: default, outlined, text
// props.noPadding: true, false
// props.icon: {material-icons}
// props.title: string

export default function Button(props) {
  const makeStyle = () => {
    let textColor;
    let bgColor;
    let borderColor;
    let padding;
    switch(props.variant) {
      case 'primary': bgColor="#89CAFF"; textColor="black"; borderColor=bgColor; break;
      case 'danger': bgColor="#FF8989"; textColor="black"; borderColor=bgColor; break;
      case 'disabled': bgColor="#2F2F2F"; textColor="#7E7E7E"; borderColor=bgColor; break;
    }
    switch(props.type) {
      case 'default': break;
      case 'outlined': textColor=bgColor; bgColor="transparent"; borderColor="#383838"; break;
      case 'text': textColor=bgColor; bgColor="transparent"; borderColor="transparent"; break;
    }
    switch(Boolean(props.icon)) {
      case true: padding = { padding: '8px 16px 8px 10px'}; break;
      default: padding = { padding: '8px 16px'}; break;
    }
    switch(props.noPadding) {
      case true: padding = { padding: '0' }; break;
      default: break;
    }
    return {
      color: textColor,
      backgroundColor: bgColor,
      border: `1px solid ${borderColor}`,
      borderRadius: "4px",
      fontSize: '14px',
      ...padding
    };
  }

  return (
    <button className="flex items-center" style={makeStyle()} onClick={props.onClick}>
      {props.icon ? <span className="material-icons mr-2 text-lg leading-none">{props.icon}</span> : null}
      {props.children}
    </button>
  );
}