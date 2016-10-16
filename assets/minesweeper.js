//dec//declare or constants here
const EMPTY_CELL = "";

$().ready(function() {
		//so somthing here
    var newGame = Object.create(mineFieldPrototype);
    newGame.init();
    newGame.printBoard();
    //newGame.startGame();
});

var mineFieldPrototype = {
		//declare all variables

    init: function() {
    			this.board = this.createNewField();
          this.grid = this.createGrid(this.board);
          this.populateBoardWithMines();
          this.populateTouchingMines();
          //this.printBoard();
    },

    createNewField: function() {
    			var field = [];

          for (var i = 0;i<9; i++ ) {
          		var row = [];
              for (var j = 0; j<9; j++) {
              		var cell = Object.create(cellPrototype);
                  cell.init(i,j);
                  row.push(cell);
              }
              field.push(row);
          }

          return field;

   },

   printBoard: function() {

        that = this;
   			$(".cell").each(function(ind,obj) {
        				row = Math.floor(ind/9);
                col = Math.floor(ind-(row*9));
                console.log(row,col);
        				$(this).text(that.board[row][col].getSymbol());
                });

   },

   cellsAroundCell: function(cell) {
   				var cells = [];
          var row= cell.row-1;
          var col= cell.col-1;
          var positions = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
          positions.forEach(function(n) {
          					var newRow = n[0]+row;
                    var newCol = n[1]+col;
          					n[0] = newRow;
                    n[1] = newCol;
          });
          filtered = positions.filter(function(n) { return n[0]>=0 && n[1] >=0 && n[0] <9 && n[1] < 9});
          return filtered;

   },

   populateBoardWithMines: function() {
   			for (var i = 0; i < 10; i++) {
        		this.randomFreeCell().setSymbol("b");
        }

   },
   populateTouchingMines: function() {
   			that = this;
   			this.board.forEach(function(rowN) {
        			rowN.forEach(function(cell) {

              			if(cell.getSymbol() === EMPTY_CELL) {

                        var aroundCells = that.cellsAroundCell(cell);


                        var cellObjects = [];
                        aroundCells.forEach(function(n) {
                        		bRow = n[0];
                            bCol = n[1];
                            cellObjects.push(that.board[bRow][bCol]);
                        });

                        var bombCount = 0;

                        cellObjects.forEach(function(n) {
                        		if(n.getSymbol() === "b") {
                            		bombCount += 1;
                            }
                        });

                        if (bombCount > 0) {
                        	cell.setSymbol(bombCount);
                        };
                    }
              })
        })
   },

   randomFreeCell: function() {
          random1 = Math.floor( Math.random() * 9 );
          random2 = Math.floor( Math.random() * 9 );
          var cell = this.board[random1][random2];
          if (cell.getSymbol() === EMPTY_CELL) {
          		//console.log(random1, random2);
          		return cell;
          }
          else {
              cell = this.randomFreeCell();
              return cell;
          }

   },

   createGrid: function(board) {
   				for (var i = 1; i<board.length+1; i++  ) {

          		$("#board").append("<div class = 'row' id = "+ "r"+i +"></div>");

              for (var j=1; j	< board[i-1].length+1; j++) {
              		$(".row:last-child").append("<div class = 'cell'></div>");
              }
          }
   }
};

var cellPrototype = {
		//eachCell can contain either mine or nothing;
    init: function(row,col) {
    			this.symbol = EMPTY_CELL;
          this.row = row+1;
          this.col = col+1;
    },
    getSymbol: function() {
    			return this.symbol;
    },
    setSymbol: function(symbol) {
    			this.symbol = symbol;
    }
};
