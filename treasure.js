function treasure(){
	ev["treasure"]={
		ev:function(){
			show("你发现了一个宝箱。")
			gain_treasure(20)
		},
		town:false,
		chance:function(){
			if("鹰眼术"in buff)return 1
			return 0.5
		}
	}
	ev["treasure_slime"]={
		ev:function(){
			show("你注意到在粘液池的深处藏着一个宝箱。")
			if(status.lust==0){
				show("你忍着媚药的刺激将宝箱捞了出来。")
				gain({lust:5})
				gain_treasure(20)
			}else{
				show("中途你就被媚药刺激得神志不清，然后被史莱姆淹没了。")
				gain({v_exp:5,a_exp:3,s_exp:3},"史莱姆")
				gainbuff("怀孕：史莱姆",1)
			}
		},
		town:false,
		once:true,
		chance:function(){
			return 0.5
		},
		start:2,
		end:2
	}
	ev["treasure_tentacle"]={
		ev:function(){
			show("你在触手洞窟的深处发现了一个宝箱。")
			if(check("wis",20)>=0){
				show("你觉得这个宝箱似乎有些蠢蠢欲动，或许还是不要碰它比较好。")
			}else{
				gain_treasure(18,18)
			}
		},
		town:false,
		once:true,
		chance:function(){
			if(!("触手服"in flag))return 0.5
		},
		start:4,
		end:4
	}

	ev["treasure_goblin"]={
		ev:function(){
			show("你注意到墙上有一个洞。")
			if(check("dex",15)>=0){
				show("你钻进去之后，发现了一个宝箱。")
				gain_treasure(20)
			}else{
				show("你试图钻进去，却被卡在墙里。")
				show("哥布林小队发现了你卡在墙里的屁股。")
				show("他们轮流侵犯了你。")
				gain({v_exp:6,a_exp:3,s_exp:3},"哥布林")
			}
		},
		town:false,
		once:true,
		chance:function(){
			if(week-chapter_startweek<=3)return 0
			return 0.5
		},
		start:1,
		end:1
	}
	ev["trader"]={
		ev:function(){
			var cost=getflag("trade")
			show("你买下了商人推销的装备。")
			gain({money:-cost})
			gain_treasure(9)
			gainflag("trade",20)
		},
		town:true,
		chance:function(){
			if(status.money>=getflag("trade")+status.pay)return 1
			if(status.money>=getflag("trade"))return 0.5
		}
	}
	ev["trader2"]={
		ev:function(){
			var cost=getflag("trade")
			show("商人向你推销了一件装备，但你身上的钱不够。")
			show("你用身体支付了一半价钱。")
			gain({money:-cost/2,b_exp:3,o_exp:3,s_exp:1,e_exp:3})
			gain_treasure(9)
			gainflag("trade",20)
		},
		town:true,
		chance:function(){
			if(status.money>=getflag("trade")/2 && status.money<getflag("trade")/2 && status.lewd>=20)return 0.5
		}
	}
	ev["trader3"]={
		ev:function(){
			show("商人提出要购买你的母乳。")
			if(status.e_lv>=3){
				show("你问他如果当场现挤能不能加钱。")
				gain({money:80,e_exp:2,b_exp:3})
				gainflag("trade2",1)
			}else{
				show("你勉为其难地答应了。")
				gain({money:60,b_exp:3})
				gainflag("trade2",1)
			}
		},
		town:true,
		once:true,
		chance:function(){
			if("母乳体质" in buff && status.money<0) return 0.5
		}
	}
	ev["trader4"]={
		ev:function(){
			show("商人提出要购买你身上的内裤。")
			if(no_pant()){
				show("你掀起裙子，指出自己身上没穿内裤。")
				gain({e_exp:2})
			}else{
				if(status.e_lv>=3){
					show("你毫不迟疑地答应了，当场就脱下你的内裤。")
					gain({money:30,e_exp:2})
					gainflag("trade2",1)
				}else{
					show("你勉为其难地答应了，找了个无人的角落脱下你的内裤。")
					gain({money:30,e_exp:1})
					gainflag("trade2",1)
				}
			}
		},
		town:true,
		chance:function(){
			if(status.money<0)return 0.2
		}
	}

}

function gain_treasure(n,m){
	var ans=rand(n)
	if(m!=null) ans=m
	if(ans==0){
		show("你获得了一件比基尼铠甲。真正的勇士都应该无所畏惧地暴露身体，你这么劝说着自己换上了新的装备。")
		gain({str:2,e_exp:10})
		return
	}
	if(ans==1){
		show("你获得了一件拘束衣。传说中的女战士就时常穿着这样的衣服来磨炼自己的意志，另外还有一些传说指出她有受虐倾向。")
		gain({str:2,p_exp:10})
		return
	}
	if(ans==2){
		show("你获得了一件紧身衣。穿上之后你的身体变得更加迅捷了，但做出剧烈动作时，这件衣服就会勒紧你的下体。")
		gain({dex:2,v_exp:10})
		return
	}
	if(ans==3){
		show("你获得了一件兔女郎装。比起为什么兔女郎装能够提高敏捷这样的问题，你更加在意为什么这件衣服的尾巴设计成了肛塞的形式。")
		gain({dex:2,a_exp:10})
		return
	}
	if(ans==4){
		show("你获得了一件魔女制服。你感觉胸口处有些紧，时刻摩擦着你的乳头。")
		if(getop("魔法师")>=0)show("你想起了你的魔法师朋友，或许魔女的胸围都像她那样？")
		gain({wis:2,b_exp:10})
		return
	}
	if(ans==5){
		show("你获得了一件法师斗篷。穿上之后你获得了静默施法的能力，但每当你这么做时，舌头就会产生一些微妙的感觉。")
		gain({wis:2,o_exp:10})
		return
	}
	if(ans==6){
		show("你获得了一柄战锤。战锤的重量并不适合你拿上战场，但挥舞它确实可以锻炼你的力量。")
		gain({str:1})
		return
	}
	if(ans==7){
		show("你获得了一把匕首。你觉得这把新匕首用起来比原先那把更趁手。")
		gain({dex:1})
		return
	}
	if(ans==8){
		show("你获得了一根法杖。握住法杖时，你感觉到自己的魔力和它发生了感应。")
		gain({wis:1})
		return
	}
	if(ans==9 && !("胸甲"in flag)){
		show("你获得了一件胸甲。你认出它属于一位数年前失踪的公主骑士。穿上之后，原主的力量和凌辱记忆都涌入了你的身体。")
		gain({str:1,wis:1,dex:1,lewd:1})
		gainflag("胸甲")
		return
	}
	if(ans==10 && !("裙甲"in flag)){
		show("你获得了一件裙甲。你认出它属于一位数年前失踪的公主骑士。穿上之后，原主的力量和凌辱记忆都涌入了你的身体。")
		gain({str:1,wis:1,dex:1,lewd:1})
		gainflag("裙甲")
		return
	}
	if(ans==11){
		show("你获得了一条沾满精液的内裤。从某些意义上来说，这确实是某人的宝藏。")
		if(getflag("lost_underwear")>rand(4)) {
			show("你认出这条内裤曾经属于自己。")
			gain({lust:5})
		}else{
			gain({lust:2})
		}
		return
	}
	if(ans==12 || ans==13){
		show("是宝箱怪！")
		if(rand(2)==1){
			show("你躲开了宝箱怪的触手。")
		}else{
			show("你被宝箱怪拖进体内，凌辱一直持续到你失去意识。")
			gain({v_exp:5,a_exp:5,o_exp:5,b_exp:5,p_exp:2,s_exp:3},"宝箱怪")
		}
		return
	}
	if(ans==14){
		show("宝箱里空无一物。",true)
		show("却充满了催情气体。")
		gain({lust:4})
	}
	if(ans==15||ans==16){
		show("你在宝箱里发现了一些金币。")
		gain({money:50})
		return
	}
	if(ans==17){
		show("你在宝箱里发现了大量金币。")
		gain({money:100})
		return
	}
	if(ans==18 && !("触手服"in buff)  && !("触手服"in flag)){
		var r=rand(6)
		if(r==0)flag["触手服"]="比基尼铠甲"
		if(r==1)flag["触手服"]="拘束衣"
		if(r==2)flag["触手服"]="紧身衣"
		if(r==3)flag["触手服"]="兔女郎装"
		if(r==4)flag["触手服"]="魔女制服"
		if(r==5)flag["触手服"]="法师斗篷"
		show("你获得了一件"+flag["触手服"]+"。")
		show("在穿上新获得的装备后，你发现它在动。")
		show("你试图将这件衣服脱下。触手服立刻做出了反应——它同时贯穿了你的前后两穴，强烈的刺激令你失去了意识。")
		gain({v_exp:5,a_exp:5,b_exp:5,p_exp:2,s_exp:2},"触手服")
		gainbuff("触手服")
		pause()
		show("当你恢复意识时，触手服变回了"+flag["触手服"]+"的样子。仿佛什么都没有发生过。")
		show("但你体内的精液却在提醒你，刚才发生的事情并非幻觉。")
	}
	show("宝箱里空无一物。")
}