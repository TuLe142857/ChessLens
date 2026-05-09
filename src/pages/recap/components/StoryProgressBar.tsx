type Props = {
  n: number;
  current: number;
  onChange?: (index: number) => void;
  className?: string;
};
const StoryProgressBar = ({ n, current, onChange, className }: Props) => {
  const indexes = [];
  for (let i = 0; i < n; i++) {
    indexes.push(i);
  }

  return (
    <div className={`flex flex-row gap-1 ${className}`}>
      {indexes.map((i) => (
        <div
          className={`
            flex-1 h-1 rounded-full
            ${current >= i ? 'bg-white' : 'bg-gray-500'}
            `}
          onClick={() => onChange && onChange(i)}
        />
      ))}
    </div>
  );
};

export default StoryProgressBar;
