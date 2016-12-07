
var $table = $('<table>');
var $container = $('.area--fridge');
$container.append($table);
function times(n,action){
    for(var i=0;i<n;i++){
        action(i);
    }
}
times(6,function(x){
    var $tr = $('<tr>');
    $table.append($tr);
    times(6,function(y) {
        var $td = $('<td>');
        $tr.append($td);
        $td.addClass('cell').addClass('skladnik');
    });
});
// ********--------------------------Assigning icons into board--------------------------------------************



var tablicaSkladnikow = ['bread','cheese','tomato','bun','burger','ketchup','pasta','meatball','salmon','egg','milk','flour','salad'];
function assigning2(){
    var $emptyCells = 36;
    while($emptyCells>0) {
        for (var j = 0; j < tablicaSkladnikow.length; j++) {
            var $Cells = $('td:empty');
            var random = Math.round(Math.random() * $Cells.length);
            var foodFromTable = tablicaSkladnikow[j];
            var $randomCell = $($Cells[random]);
            var $foodItem = $('<div>').addClass('food-icon').addClass(foodFromTable).attr('foodType', foodFromTable);
            $randomCell.append($foodItem);
            $emptyCells = $Cells.length;
        }
    }

}
assigning2();

// **********---------------------------On icon click function definition--------------------------*********
// ------------------------------------zmienne globalne-------------------------
var emptyPlateCounter = [];
var pointCounter = 0;

$('.food-icon').click(function () {
    var $firstEmptyPlate = $('.plate:empty:visible').first();
    if ($firstEmptyPlate.hasClass($(this).attr('foodType'))) {
        emptyPlateCounting($firstEmptyPlate);
        $firstEmptyPlate.append(this).css("opacity","1");
        console.log(pointCounter);
    }else{
        $(this).fadeTo("fast", 0);
        $(this).fadeTo("slow", 1);
    }
    checkPlate();
});
function pointCounting(){
    if(pointCounter<3) {
        pointCounter+=1;
        $('.points:not(".winner"):first').html(pointCounter);
        console.log("adding points" , pointCounter);
    }else {
        $('.points:not(".winner"):first').addClass('winner');
        pointCounter=0;
        pointCounting();


    }
}
function emptyPlateCounting(firstPlate){
    emptyPlateCounter.push(firstPlate);
    console.log("z counting" , firstPlate);
    if(emptyPlateCounter.length === 1) {
        $('.face:not(".faceWon"):first').removeClass('sadFace').addClass('smileFace');
        pointCounting();
    }else if (emptyPlateCounter.length === 2){
        $('.face:not(".faceWon"):first').removeClass('smileFace').addClass('happyFace');
        pointCounting();
    }else if (emptyPlateCounter.length === 3){
        $('.face:not(".faceWon"):first').removeClass('happyFace').addClass('winFace').addClass('faceWon');
        pointCounting();
        emptyPlateCounter = [];


    }
}
//***----------------------------------Checking Plate function ------------------------------***************
function checkPlate() {
    $('.table--plate').each(function () {
        if ($(this).find('.plate').length === $(this).find('.food-icon').length) {
            emptyPlateCounter = [];
            $(this).fadeOut(300);
            $('.skladnik:empty:first').append(
                $(this).find('.food-icon:first')
            );
            $('.skladnik:empty:first').append(
                $(this).find('.food-icon:first')
            );
            $('.skladnik:empty:first').append(
                $(this).find('.food-icon:first')
            )

        }
    });
}
