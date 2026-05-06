import { useState, useRef, type ChangeEvent, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type History = {
  command: string;
  output: string;
};

type Props = {
  user?: string;
  host?: string;
  pwd?: string;
  history?: History[];
  handleCommand?: (cmd: string) => string;
  className?: string;
};

const Terminal = ({
  user = 'root',
  host = 'chess-lens',
  pwd: initPwd,
  history: initialHistory = [],
  handleCommand,
  className = '',
}: Props) => {
  const [input, setInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<History[]>(initialHistory);
  const [historyIndex, setHistoryIndex] = useState<number>(
    initialHistory.length
  );
  const [pwd, setPwd] = useState<string>(
    initPwd ? initPwd : window.location.pathname
  );

  const navigate = useNavigate();

  const run = (cmd: string) => {
    if (cmd === 'pwd') {
      return pwd;
    } else if (cmd === 'clear') {
      setHistory([]);
      return '';
    } else if (cmd.startsWith('cd')) {
      const args = cmd.split(' ');
      if (args.length > 1) {
        navigate(args[1]);
        setPwd(window.location.pathname);
      }
      return 'Error: 404 - Page not found';
    }
    return handleCommand ? handleCommand(cmd) : '';
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = input.trim();
      if (!cmd) return;
      const output = run(cmd);

      const newIndex = history.length;
      setHistory((prev: History[]) => [
        ...prev,
        { command: cmd, output: output },
      ]);
      setHistoryIndex(newIndex);
      setInput('');
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = historyIndex - 1;
      if (next >= 0 && next <= history.length - 1) {
        setInput(history[next].command);
        setHistoryIndex(next);
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = historyIndex + 1;
      console.log('uop');
      if (next >= 0 && next <= history.length - 1) {
        setInput(history[next].command);
        setHistoryIndex(next);
      } else if (next === history.length) {
        setHistoryIndex(history.length);
        setInput('');
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div
      className={`rounded-md p-2 sm:p-4 font-mono text-base bg-slate-800 ${className}`}
      onClick={() => inputRef?.current?.focus()}
    >
      {history &&
        history.map((his, index) => (
          <div key={index}>
            <span className="text-green-400">{'❯ '}</span>
            <span>{his.command}</span>
            <br />
            {his.output && (
              <div>
                <span
                  className={`
                ${his.output.startsWith('Error') && 'text-red-500'}
                `}
                >
                  {his.output}
                </span>
                <br />
              </div>
            )}
          </div>
        ))}

      <span className="text-gray-400">{'$ '}</span>
      <span className="text-green-500 font-bold ">{`${user}@${host}`}</span>
      <span className="text-white font-bold ">{':'}</span>
      <span className="text-white font-bold ">{pwd}</span>
      <br />

      <div className="flex gap-2">
        <span className="text-green-500 font-bold">{'❯ '}</span>
        <input
          ref={inputRef}
          // placeholder={'type some command here...'}
          name="command"
          value={input}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          className="w-full focus:outline-none outline-none"
        />
      </div>
    </div>
  );
};

export default Terminal;
