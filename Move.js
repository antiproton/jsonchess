define(function(require) {
	var PieceType = require("chess/PieceType");
	var Piece = require("chess/Piece");
	var Colour = require("chess/Colour");
	var Square = require("chess/Square");
	
	return {
		encode: function(move) {
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
				+ "," + move.getLabel()
				+ "," + move.time
				+ "," + move.from.algebraic
				+ "," + move.to.algebraic
				+ "," + castlingRightsLost;
				
			
			if(move.isCastling) {
				moveString += ""
					+ ",c,"
					+ move.castlingRookOrigin.algebraic
					+ ","
					+ move.castlingRookDestination.algebraic;
			}
			
			else if(move.isPromotion) {
				moveString += ",p," + move.promoteTo.type.sanString;
			}
			
			else if(move.isEnPassant) {
				moveString += ",ep," + move.epTarget.algebraic;
			}
			
			return moveString;
		},
		
		decode: function(position, moveString) {
			var positionAfter = position.getCopy();
			var fields = quickMove.split(",");
			
			var fullmove = fields[0];
			var index = parseInt(fields[1]);
			var label = fields[2];
			var time = parseInt(fields[3]);
			var from = Square.byAlgebraic[fields[4]];
			var to = Square.byAlgebraic[fields[5]];
			var castlingRightsLost = fields[6];
			var type = fields[7];
			
			var colour = position.activeColour;
			var fullmoveDot = (colour === Colour.white ? "." : "...");
			var isPromotion = false;
			var promoteTo;
			var isEnPassant = false;
			var isCastling = false;
			var capturedPiece = position.board[to.squareNo];
			
			positionAfter.setPiece(from, null);
			positionAfter.setPiece(to, position.board[from.squareNo]);
			
			if(castlingRightsLost !== "N") {
				if(castlingRightsLost === "K" || castlingRightsLost === "A") {
					positionAfter.setCastlingRights(colour, "K", false);
				}
				
				if(castlingRightsLost === "Q" || castlingRightsLost === "A") {
					positionAfter.setCastlingRights(colour, "Q", false);
				}
			}
			
			if(type === "c") {
				isCastling = true;
				
				var rookFrom = Square.byAlgebraic(fields[8]);
				var rookTo = Square.byAlgebraic(fields[9]);
				
				position.setPiece(rookFrom, null);
				position.setPiece(rookTo, Piece.pieces[PieceType.rook][colour]);
			}
			
			else if(type === "ep") {
				isEnPassant = true;
				capturedPiece = Piece.pieces[PieceType.pawn][colour.opposite];
				positionAfter.setPiece(Square.byAlgebraic[fields[9]], null);
			}
			
			else if(type === "p") {
				isPromotion = true;
				promoteTo = PieceType.fromSanString(fields[9]);
				positionAfter.setPiece(to, Piece.pieces[promoteTo][colour]);
			}
			
			return {
				fullmove: parseInt(fullmove),
				label: label,
				fullLabel: fullmove + fullmoveDot + " " + label,
				colour: colour,
				from: from,
				to: to,
				isCheck: isCheck,
				isMate: isMate,
				isCastling: isCastling,
				isPromotion: isPromotion,
				promoteTo: promoteTo,
				resultingFen: positionAfter.getFen(),
				capturedPiece: capturedPiece,
				time: time
			};
		}
	};
});