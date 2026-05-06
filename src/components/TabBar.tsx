export type TabItem = {
  id: string;
  label: string;
  icon: any;
};

type TabBarProps = {
  items: TabItem[];
  activeTab: string;
  onTabChange?: (id: string) => void;
  className?: string;
};

const TabBar = ({
  items,
  activeTab,
  onTabChange,
  className = '',
}: TabBarProps) => {
  return (
    <div
      className={`flex flex-row p-2 pb-0 border-b border-gray-500 bg-slate-950 gap-1.5  ${className}`}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={`
            flex flex-row gap-1 p-1 px-2
            font-semibold text-lg sm:text-xl text-white 
            hover:bg-gray-100/50
            border-b-2 sm:border-b-3
            ${
              item.id === activeTab
                ? `border-green-400 `
                : 'border-transparent '
            }
            `}
          onClick={() => onTabChange && onTabChange(item.id)}
        >
          {item.icon}
          <div className={`hidden sm:block`}>{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default TabBar;
