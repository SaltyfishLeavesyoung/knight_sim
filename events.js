function event_init(){
	ev={}
	guild()
	goblin()
	town_basic()
	friendship()
	slime()
	orc()
	bar()
	tentacle()
	finalboss()
	treasure()
	loan()
	prostitute()
	status_ev()
}

function getbuff(str){
	if(buff[str]==null)return -1
	return buff[str]
}

function getop(str){
	if(op[str]==null)return -1
	return op[str].val
}

function getflag(str){
	if(flag[str]==null)return -1
	return flag[str]
}
