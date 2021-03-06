export default function Counter(props) {
  const isMin = props.count === props.min;
  const isMax = props.count === props.max;
  
  const decrement = () => {
    if (props.count > props.min) {
      props.onChange(props.count - 1);
    }
  };

  const increment = () => {
    if (props.count < props.max) {
      props.onChange(props.count + 1);
    }
  };

  return (
    <div className="flex items-center">
      <button
        className={`bg-primary text-primary text-sm leading-none rounded-full p-3 material-icons ${
          isMin
            ? "bg-opacity-disable text-opacity-disabled"
            : "bg-opacity-15 text-opacity-high"
        }`}
        onClick={ decrement }
      >
        remove
      </button>
      <div className="mx-4 font-medium text-primary text-opacity-high text-base">{props.count}</div>
      <button
        className={`bg-primary text-primary text-sm leading-none rounded-full p-3 material-icons ${
          isMax
            ? "bg-opacity-disable text-opacity-disabled"
            : "bg-opacity-15 text-opacity-high"
        }`}
        onClick={ increment }
      >
        add
      </button>
    </div>
  );
}