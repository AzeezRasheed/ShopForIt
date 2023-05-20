import Ripple from "react-ripples";

const Button = (props) => {
  const allProps = { ...props };
  delete allProps.ripple;
  const button = (
    <button
      {...allProps}
      className={`border-0 outline-0  ${props.className}`}
      style={{ background: "unset" }}
    >
      {props.text || props.children}
    </button>
  );
  if (props.ripple) return <Ripple>{button}</Ripple>;
  return button;
};

export default Button;
