const Button = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  return <button {...props}>{children}</button>;
};

export default Button;
