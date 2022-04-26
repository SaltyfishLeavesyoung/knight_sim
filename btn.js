function newgame(){
	refresh();
	if(my_int!=null)clearInterval(my_int)
	my_int=setInterval(mainLoop,1000);
	gamestate="auto"
}

let my_int=null

function pause_btn(){
	if(gameover==true)return
	if(my_int!=null)clearInterval(my_int)
	gamestate="stop"
}
function step_btn(){
	if(gameover==true)return
	if(my_int!=null)clearInterval(my_int)
	my_int=setInterval(mainLoop,200);
	gamestate="step"
}
function auto_btn(){
	if(gameover==true){
		refresh();
		if(my_int!=null)clearInterval(my_int)
		my_int=setInterval(mainLoop,1000);
		gamestate="auto"
	}
	if(my_int!=null)clearInterval(my_int)
	my_int=setInterval(mainLoop,1000);
	gamestate="auto"
}
function fast_btn(){
	if(gameover==true){
		refresh();
		if(my_int!=null)clearInterval(my_int)
		my_int=setInterval(mainLoop,200);
		gamestate="auto"
	}
	if(my_int!=null)clearInterval(my_int)
	my_int=setInterval(mainLoop,200);
	gamestate="auto"
}
