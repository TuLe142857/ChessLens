type Props = {
  win: number;
  draw: number;
  loss: number;
  className?: string;
};

const WDLBadge = ({ win, draw, loss, className = '' }: Props) => {
  const total = win + draw + loss;

  const pWin = total > 0 ? win / total : 1 / 3;
  const pDraw = total > 0 ? draw / total : 1 / 3;
  const pLoss = total > 0 ? loss / total : 1 / 3;

  const winRate = (total > 0 ? (win / total) * 100 : 0).toFixed(2);
  const drawRate = (total > 0 ? (draw / total) * 100 : 0).toFixed(2);
  const lossRate = (total > 0 ? (loss / total) * 100 : 0).toFixed(2);

  return (
    <div className={`flex flex-col gap-1 font-bold ${className}`}>
      <div className="flex flex-row">
        <div className="text-left text-green-500" style={{ flex: pWin }}>
          {winRate}%
        </div>
        <div className="text-center text-white" style={{ flex: pDraw }}>
          {drawRate}%
        </div>
        <div className="text-right text-red-500" style={{ flex: pLoss }}>
          {lossRate}%
        </div>
      </div>

      <div className="flex flex-row h-1 md:h-2  rounded-full overflow-hidden bg-white ">
        <div className="bg-green-500" style={{ flex: pWin }} />
        <div className="bg-white" style={{ flex: pDraw }} />
        <div className="bg-red-500" style={{ flex: pLoss }} />
      </div>

      <div className="flex flex-row">
        <div className="text-left text-green-500" style={{ flex: pWin }}>
          won
        </div>
        <div className="text-center text-white" style={{ flex: pLoss }}>
          draw
        </div>
        <div className="text-right text-red-500" style={{ flex: pLoss }}>
          loss
        </div>
      </div>

      <div className="flex flex-row">
        <div className="text-left text-green-500" style={{ flex: pWin }}>
          {win}
        </div>
        <div className="text-center text-white" style={{ flex: pLoss }}>
          {draw}
        </div>
        <div className="text-right text-red-500" style={{ flex: pLoss }}>
          {loss}
        </div>
      </div>
    </div>
  );
};

export default WDLBadge;
