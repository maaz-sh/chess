import { useRef, useState, useCallback } from 'react';
import { Chess } from 'chess.js';
import type { Square as ChessSquare } from 'chess.js';
import Board from './components/Board';
import StatusBar from './components/StatusBar';
import ResetButton from './components/ResetButton';
import CapturedPieces from './components/CapturedPieces';
import './App.css';

function computeStatus(chess: Chess): string {
  if (chess.isCheckmate()) {
    return chess.turn() === 'w' ? 'Checkmate — Black wins!' : 'Checkmate — White wins!';
  }
  if (chess.isStalemate()) return 'Stalemate — Draw!';
  if (chess.isDraw()) return 'Draw!';
  const turn = chess.turn() === 'w' ? 'White' : 'Black';
  const inCheck = chess.isCheck() ? ' (in check)' : '';
  return `${turn} to move${inCheck}`;
}

function App() {
  const chess = useRef(new Chess());
  const [fen, setFen] = useState(chess.current.fen());
  const [selected, setSelected] = useState<string | null>(null);
  const [legalTargets, setLegalTargets] = useState<string[]>([]);
  const [status, setStatus] = useState<string>(computeStatus(chess.current));
  const [captured, setCaptured] = useState<{ w: string[]; b: string[] }>({ w: [], b: [] });

  const refresh = useCallback(() => {
    setFen(chess.current.fen());
    setStatus(computeStatus(chess.current));
    const caps: { w: string[]; b: string[] } = { w: [], b: [] };
    for (const move of chess.current.history({ verbose: true })) {
      if (move.captured) caps[move.color].push(move.captured);
    }
    setCaptured(caps);
  }, []);

  const handleSquareClick = useCallback(
    (square: string) => {
      const game = chess.current;
      if (game.isGameOver()) return;

      const piece = game.get(square as ChessSquare);

      if (selected) {
        if (legalTargets.includes(square)) {
          game.move({ from: selected as ChessSquare, to: square as ChessSquare, promotion: 'q' });
          setSelected(null);
          setLegalTargets([]);
          refresh();
          return;
        }

        if (piece && piece.color === game.turn()) {
          const moves = game.moves({ square: square as ChessSquare, verbose: true });
          setSelected(square);
          setLegalTargets(moves.map((m) => m.to));
          return;
        }

        setSelected(null);
        setLegalTargets([]);
        return;
      }

      if (piece && piece.color === game.turn()) {
        const moves = game.moves({ square: square as ChessSquare, verbose: true });
        setSelected(square);
        setLegalTargets(moves.map((m) => m.to));
      }
    },
    [selected, legalTargets, refresh]
  );

  const handleReset = useCallback(() => {
    chess.current.reset();
    setSelected(null);
    setLegalTargets([]);
    setCaptured({ w: [], b: [] });
    refresh();
  }, [refresh]);

  void fen;

  return (
    <div className="app">
      <h1 className="title">Chess</h1>
      <StatusBar status={status} />
      <div className="board-area">
        <CapturedPieces capturedBy="b" pieces={captured.b} />
        <Board
          chess={chess.current}
          selected={selected}
          legalTargets={legalTargets}
          onSquareClick={handleSquareClick}
        />
        <CapturedPieces capturedBy="w" pieces={captured.w} />
      </div>
      <ResetButton onReset={handleReset} />
    </div>
  );
}

export default App;
