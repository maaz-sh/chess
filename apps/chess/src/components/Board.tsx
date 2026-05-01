import React from 'react';
import { Chess } from 'chess.js';
import Square from './Square';

interface BoardProps {
  chess: Chess;
  selected: string | null;
  legalTargets: string[];
  onSquareClick: (square: string) => void;
}

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1]; // white at bottom

const Board: React.FC<BoardProps> = ({ chess, selected, legalTargets, onSquareClick }) => {
  return (
    <div className="board">
      {RANKS.map((rank) =>
        FILES.map((file) => {
          const square = `${file}${rank}` as Parameters<Chess['get']>[0];
          const piece = chess.get(square);
          const fileIdx = FILES.indexOf(file);
          const rankIdx = RANKS.indexOf(rank);
          const isLight = (fileIdx + rankIdx) % 2 === 0;
          return (
            <Square
              key={square}
              square={square}
              piece={piece || null}
              isLight={isLight}
              isSelected={selected === square}
              isLegalTarget={legalTargets.includes(square)}
              onClick={onSquareClick}
            />
          );
        })
      )}
    </div>
  );
};

export default Board;
