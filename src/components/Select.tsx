type SelectProps = {
  id: string;
  name: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
};

export function Select(props: SelectProps) {
  return (
    <div>
      <select
        id={props.id}
        name={props.name}
        className="mt-1 block w-full rounded-md border-gray-500 bg-gray-700 py-1.5 pl-3 pr-10 text-base focus:border-teal-500 focus:outline-none focus:ring-teal-500 disabled:border-gray-600 disabled:bg-gray-800 sm:text-sm"
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
