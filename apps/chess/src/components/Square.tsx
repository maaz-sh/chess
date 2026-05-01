import React from 'react';

const PIECE_GLYPHS: Record<string, string> = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
};

interface SquareProps {
  square: string;
  piece: { type: string; color: string } | null;
  isLight: boolean;
  isSelected: boolean;
  isLegalTarget: boolean;
  onClick: (square: string) => void;
}

const Square: React.FC<SquareProps> = ({
  square,
  piece,
  isLight,
  isSelected,
  isLegalTarget,
  onClick,
}) => {
  const glyph = piece ? PIECE_GLYPHS[`${piece.color}${piece.type.toUpperCase()}`] : null;

  let bg = isLight ? '#f0d9b5' : '#b58863';
  if (isSelected) bg = '#f6f669';
  else if (isLegalTarget) bg = isLight ? '#cdd16e' : '#aaa23a';

  return (
    <div
      className="square"
      style={{ background: bg }}
      onClick={() => onClick(square)}
    >
      {isLegalTarget && !piece && <div className="dot" />}
      {glyph && (
        <span className={`piece ${piece!.color === 'w' ? 'piece-white' : 'piece-black'}`}>
          {glyph}
        </span>
      )}
    </div>
  );
};

export default Square;
