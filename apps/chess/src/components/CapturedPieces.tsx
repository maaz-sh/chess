import React from 'react';

const GLYPHS: Record<string, { w: string; b: string }> = {
  p: { w: '♙', b: '♟' },
  r: { w: '♖', b: '♜' },
  n: { w: '♘', b: '♞' },
  b: { w: '♗', b: '♝' },
  q: { w: '♕', b: '♛' },
  k: { w: '♔', b: '♚' },
};

// Piece order for sorting (most valuable last so display reads pawn → queen)
const ORDER = ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'n', 'n', 'b', 'b', 'r', 'r', 'q'];

interface CapturedPiecesProps {
  /** The side that did the capturing; pieces shown are the opponent's */
  capturedBy: 'w' | 'b';
  pieces: string[];
}

const CapturedPieces: React.FC<CapturedPiecesProps> = ({ capturedBy, pieces }) => {
  const pieceColor = capturedBy === 'w' ? 'b' : 'w';
  const label = capturedBy === 'w' ? 'White' : 'Black';

  const sorted = [...pieces].sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b));

  return (
    <div className="captured-panel">
      <span className="captured-label">{label}</span>
      <div className="captured-pieces">
        {sorted.map((type, i) => (
          <span key={i} className={`captured-piece piece-${pieceColor === 'w' ? 'white' : 'black'}`}>
            {GLYPHS[type]?.[pieceColor] ?? ''}
          </span>
        ))}
        {pieces.length === 0 && <span className="captured-empty">—</span>}
      </div>
    </div>
  );
};

export default CapturedPieces;
