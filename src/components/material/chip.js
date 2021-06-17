export default function Chip(props) {
  const handleClick = (event) => {
    props.handleClick(event);
  };
  return (
    <div
      className={`cursor-default leading-none border rounded-full px-3 py-2 mr-2 text-sm tracking-wider whitespace-nowrap ${
        props.isActive
          ? "text-primary text-opacity-100 border-primary border-opacity-100 bg-primary bg-opacity-10"
          : "border-dark-25 text-white text-opacity-60"
      }`}
      id={props.id}
      onClick={handleClick}
    >
      {props.title}
    </div>
  );
}