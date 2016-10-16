//declare or constants here
const EMPTY_CELL = "";

$().ready(function() {
		//so somthing here
    var newGame = Object.create(mineFieldPrototype);
    newGame.init();
    //newGame.startGame();
});

var mineFieldPrototype = {
		//declare all variables

    init: function() {
    			this.board = this.createNewField();
          this.grid = this.createGrid(this.board);
          //
    },

    createNewField: function() {
    			var field = [];

          for (var i = 0;i<9; i++ ) {
          		var row = [];
              for (var j = 0; j<9; j++) {
              		var cell = Object.create(cellPrototype);
                  cell.init();
                  row.push(cell);
              }
              field.push(row);
          }

          return field;

   },

   createGrid: function(board) {
   				for (var i = 1; i<board.length+1; i++  ) {

          		$(".board").append("<div class = 'row' id = "+ i +"></div>");

              for (var j=1; j	< board[i-1].length+1; j++) {
              		$(".row:last-child").append("<div class = 'cell' id="+ j + "></div>");
              }
          }
   }
};

var cellPrototype = {
		//eachCell can contain either mine or nothing;
    init: function() {
    			this.symbol = EMPTY_CELL;
    }
};
