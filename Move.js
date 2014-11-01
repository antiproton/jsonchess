define(function(require) {
	var PieceType = require("chess/PieceType");
	var Piece = require("chess/Piece");
	var Colour = require("chess/Colour");
	var Square = require("chess/Square");
	
	return {
		encodeAndPack: function(move) {
			move.generateLabels();
			
			var castlingRightsLost = "N";
			
			if(move.castlingRightsLost.length === 2) {
				castlingRightsLost = "A";
			}
			
			else if(move.castlingRightsLost.length === 1) {
				castlingRightsLost = move.castlingRightsLost[0].sanString;
			}
			
			var moveString = ""
				+ move.fullmove
				+ "," + move.index
				+ "," + move.label
				+ "," + move.time
				+ "," + move.from.algebraic
				+ "," + move.to.algebraic
				+ "," + castlingRightsLost;
			
			if(move.isCastling) {
				moveString += ""
					+ ",c,"
					+ move.castlingRookFrom.algebraic
					+ ","
					+ move.castlingRookTo.algebraic;
			}
			
			else if(move.isPromotion) {
				moveString += ",p," + move.promoteTo.type.sanString;
			}
			
			else if(move.isEnPassant) {
				moveString += ",ep," + move.epTarget.algebraic;
			}
			
			return moveString;
		},
		
		unpack: function(string) {
			var fields = string.split(",");
			
			var move = {
				fullmove: parseInt(fields[0]),
				index: parseInt(fields[1]),
				label: fields[2],
				time: parseInt(fields[3]),
				from: Square.byAlgebraic[fields[4]],
				to: Square.byAlgebraic[fields[5]],
				castlingRightsLost: fields[6],
				type: fields[7]
			};
			
			var castlingRightsLost = [];
			
			if(move.castlingRightsLost === "A") {
				castlingRightsLost = [PieceType.king, PieceType.queen];
			}
			
			else if(move.castlingRigtsLost === "K") {
				castlingRightsLost = [PieceType.king];
			}
			
			else if(move.castlingRigtsLost === "Q") {
				castlingRightsLost = [PieceType.queen];
			}
			
			move.castlingRightsLost = castlingRightsLost;
			
			if(move.type === "c") {
				move.castlingRookFrom = Square.byAlgebraic[fields[8]];
				move.castlingRookTo = Square.byAlgebraic[fields[9]];
			}
			
			else if(move.type === "ep") {
				move.epTarget = Square.byAlgebraic[fields[8]];
			}
			
			else if(move.type === "p") {
				move.promoteTo = PieceType.bySanString[fields[8]];
			}
			
			return move;
		},
		
		decode: function(move, position) {
			var positionAfter = position.getCopy();
			
			var colour = position.activeColour;
			var fullmoveDot = (colour === Colour.white ? "." : "...");
			var isPromotion = false;
			var promoteTo;
			var isEnPassant = false;
			var isCastling = false;
			var castlingRookFrom = null;
			var castlingRookTo = null;
			var castlingRightsLost = [];
			var capturedPiece = position.board[move.to.squareNo];
			
			positionAfter.setPiece(move.from, null);
			positionAfter.setPiece(move.to, position.board[move.from.squareNo]);
			
			for(var i = 0; i < move.castlingRightsLost.length; i++) {
				positionAfter.setCastlingRights(colour, move.castlingRightsLost[i], false);
			}
			
			if(move.type === "c") {
				isCastling = true;
				
				castlingRookFrom = move.castlingRookFrom;
				castlingRookTo = move.castlingRookTo;
				
				position.setPiece(castlingRookFrom, null);
				position.setPiece(castlingRookTo, Piece.pieces[PieceType.rook][colour]);
			}
			
			else if(move.type === "ep") {
				isEnPassant = true;
				capturedPiece = Piece.pieces[PieceType.pawn][colour.opposite];
				positionAfter.setPiece(move.epTarget, null);
			}
			
			else if(type === "p") {
				isPromotion = true;
				promoteTo = move.promoteTo;
				positionAfter.setPiece(to, Piece.pieces[promoteTo][colour]);
			}

			return {
				fullmove: parseInt(fullmove),
				index: index,
				label: label,
				fullLabel: move.fullmove + fullmoveDot + " " + move.label,
				uciLabel: from.algebraic + to.algebraic + (isPromotion ? promoteTo.sanString.toLowerCase() : ""),
				colour: colour,
				from: from,
				to: to,
				piece: position.board[from.squareNo],
				positionBefore: position,
				positionAfter: positionAfter,
				isCheck: isCheck,
				isMate: isMate,
				isLegal: true,
				isCastling: isCastling,
				castlingRookFrom: castlingRookFrom,
				castlingRookTo: castlingRookTo,
				castlingRightsLost: move.castlingRightsLost,
				isPromotion: isPromotion,
				promoteTo: promoteTo,
				isEnPassant: isEnPassant,
				capturedPiece: capturedPiece,
				time: time
			};
		}
	};
});