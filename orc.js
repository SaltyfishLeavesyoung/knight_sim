let orc_pow=25
let orc_e=20
let orc_m=40
function orc(){
	ev["orc"]={
		ev:function(){
			var ans=check("dex",orc_pow)
			show("兽人在战斗中不顾一切地向你扑了过来。")
			if(ans>=0){
				show("你冷静地攻击了兽人的要害。兽人冲了几步就栽倒在地。")
				gain({money:orc_m,exp:orc_e})
			}else{
				show("你在慌乱中攻击了兽人，但是没有什么效果。你被兽人扑倒了。",true)
				if(status.v_lv>=3){
					show("兽人的巨根顺畅地进入了你早已湿润的小穴。")
					gain({v_exp:5,p_exp:1,s_exp:1},"兽人")
					gainbuff("服从兽人",1)
				}else{
					show("兽人的巨根强行侵入了你的小穴。你痛得几乎晕了过去。")
					gain({v_exp:3,p_exp:3,s_exp:1,u_exp:1},"兽人")
				}
				if(rand(10)<=getbuff("服从兽人")+1){
					show("你被兽人带走了。")
					gainbuff("监禁：兽人",1)
				}
			}
		},
		town:false,
		chance:function(){
			return 1
		},
		start:3,
		end:3
	}


	ev["orc2"]={
		ev:function(){
			var ans=check("str",orc_pow)
			show("兽人抓住了你的肩膀。")
			if(ans>=0){
				show("你奋力挣扎，摆脱了兽人的控制，随后反杀了兽人。")
				gain({money:orc_m,exp:orc_e,p_exp:2})
			}else{
				show("兽人的力量压制了你。你被迫跪在地上，兽人狰狞的肉棒近在眼前。",true)
				if(status.o_lv>=3){
					show("你吞下了半根兽人肉棒。兽人对此并不满意，按着你的头大力抽送起来。")
					gain({o_exp:3,p_exp:2,s_exp:1},"兽人")
					gainbuff("服从兽人",1)
				}else{
					show("你勉强将兽人的龟头含进嘴里。兽人对此并不满意，按着你的头大力抽送起来。")
					gain({o_exp:3,p_exp:3,s_exp:1},"兽人")
				}
				if(rand(10)<=getbuff("服从兽人")+1){
					show("你被兽人带走了。")
					gainbuff("监禁：兽人",1)
				}
			}
		},
		town:false,
		chance:function(){
			return 1
		},
		start:3,
		end:3
	}

	ev["orc3"]={
		ev:function(){
			var ans=check("dex",orc_pow)
			show("你遇到了一个正在侵犯村娘的兽人。",true)
			if(ans>=0){
				show("你悄无声息地接近，一刀结果了兽人的性命。")
				gain({money:orc_m,exp:orc_e})
				pause()
				show("事后，你收到了来自村民的谢礼。")
				gain({money:20})
			}else if(rand(2)==0){
				show("兽人发现了你。")
				show("你且战且退地引开了兽人，村娘乘机逃脱了。",true)
				pause()
				show("事后，你收到了来自村民的谢礼。")
				gain({money:20})
			}else{
				show("兽人发现了你。")
				show("你且战且退地引开了兽人，村娘乘机逃脱了。",true)
				pause()
				show("但你没能逃掉。兽人将被打断的欲火发泄在你的身上。")
				gain({v_exp:5,p_exp:5,b_exp:3,s_exp:1,u_exp:1},"兽人")
				if(rand(10)<=getbuff("服从兽人")+1){
					show("你被兽人带走了。")
					gainbuff("监禁：兽人",1)
				}else{
					show("事后，你收到了来自村民的谢礼。")
					gain({money:20})
				}
			}
		},
		town:false,
		chance:function(){
			if(week-chapter_startweek<=3)return 0
			return 1
		},
		start:3,
		end:3
	}

	ev["orc4"]={
		ev:function(){
			var ans=check("wis",orc_pow)
			show("兽人萨满朝着你挥动手杖。")
			if(ans>=5){
				show("你避开了他的法术，然后回敬以强力的一击。")
				gain({money:orc_m*2,exp:orc_e})
			}else if(ans>=0){
				show("你感觉到下腹部产生了一股热流。",true)
				show("你凭借着残存的理智逃跑了。")
				gain({lust:5})
			}else{
				show("你感觉到下腹部产生了一股热流。",true)
				show("你张开双腿，向兽人展示你湿透的小穴。")
				show("当你被兽人萨满插入时，你发出了舒服的声音。")
				gain({v_exp:5,p_exp:1,s_exp:1},"兽人萨满")
				gainbuff("服从兽人",1)
				if(rand(10)<=getbuff("服从兽人")+2){
					show("你被兽人带走了。")
					gainbuff("监禁：兽人",1)
				}
			}
		},
		town:false,
		chance:function(){
			if(week-chapter_startweek<=3)return 0
			return 1
		},
		start:3,
		end:3
	}


	ev["orc_boss"]={
		ev:function(){
			var hostage="暗精灵"
			if(getop("魔法师")<=-100) hostage="魔法师"
			show("当你杀进兽人族长的房间时，他正在侵犯"+hostage+"。")
			show("见你进来，他丝毫没有停下的意思。")
			show("他站起身，维持着插入的状态向你走了过来。")
			show(hostage+"全身的重量都压在了族长的肉棒上。她发出了分不清是痛苦还是快乐的叫声。")
			pause()
			var ans=check("wis",orc_pow)
			if(past_event.includes("magic3")&&rand(2)==1&&hostage=="魔法师"){
				show("你不忍心看魔法师被侵犯的凄惨场面，提出用自己和人质交换。")
				show("魔法师试图阻止你，兽人猛地一顶，打断了她的话语。",true)
				show("魔法师被释放了，你在兽人的身旁勉强挤出一个坚强的微笑，向她告别。")
				op["魔法师"].val+=10000
				gainop("魔法师")
				pause()
				show("兽人族长突然将他的手指伸进你的小穴，打断了这感人的一幕。")
				show("你强忍着快感向魔法师承诺，自己一定会回来。")
				gain({v_exp:2})
				gainbuff("监禁：兽人",1)
				return
			}
			if(ans<0){
				if(status.lewd<20){
					show("你不忍心看"+hostage+"被侵犯的凄惨场面，移开了视线。")
					if(rand(2)==1){
						show("在战斗中不好好看着对手可不是个好习惯。兽人族长这么说着打倒了你。")
						gainbuff("监禁：兽人",1)
						return
					}
				}else if(getbuff("服从兽人")>=2){
					show("你紧盯着他们结合的部位，想着如果自己输了会被怎么对待的事情。")
					if(rand(2)==1){
						show("在战斗中盯着对手的肉棒看可不是个好习惯。兽人族长这么说着打倒了你。")
						gainbuff("监禁：兽人",1)
						return
					}
				}
			}
			show("兽人族长看起来只是在侵犯"+hostage+"，但她身体的起伏却总是挡在你攻击的轨迹上，令你找不到任何机会。")
			var ans=check("dex",orc_pow)
			if(ans>=0){
				show("你巧妙地绕到了兽人族长的身后发起攻击。")
				if(check("str",orc_pow)>=0){
					show("他被你击中了要害，壮硕的身体摔倒在地上。")
					//gainbuff("讨伐证明：兽人族长")
					chapter=4
					chapter_startweek=week
					gain({money:orc_m*5,exp:orc_e*5})
					pause()
					show("你解开了"+hostage+"的束缚。")
					if(hostage=="暗精灵"){
						show("暗精灵却说你多管闲事，她好不容易才找到的顶级肉棒就这么被你毁了。")
						show("你无语地看着暗精灵骂骂咧咧地走了。")
					}else{
						show("你带着身上布满凌辱痕迹的魔法师逃出了兽人部落。")
						show("魔法师哭着问你是否会讨厌她。")
						if(op["魔法师"].prison>=week){
							show("你用舌头封住了她的哭声。")
							show("很快，她陶醉在接吻当中，暂时忘却了痛苦。")
							op["魔法师"].val+=10000
							gain({o_exp:5,les_exp:5},"魔法师")
							gainop("魔法师")
						}else if(status.s_lv>=3  && op["魔法师"].prison<week){
							show("你舔着她的小穴中流出的兽人精液，以此证明你并不觉得她污秽。")
							op["魔法师"].val+=10000
							gain({o_exp:3,les_exp:3,s_exp:1})
							gainop("魔法师")
						}else{
							show("你试图安慰她，但你的言语相比于兽人暴行的痕迹是如此无力。")
							show("",true)
							show("魔法师退出了冒险者公会。")
							if("魔法师的恋人" in buff)
								gainbuff("魔法师的恋人",-10000)
						}
						pause()
						show("你的冒险者等级提升了。")
					}
					return
				}else{
					show("你击中了兽人族长，但他看起来并不在乎这点小伤。")
				}
			}
			pause()
			show("兽人族长步步紧逼，你一再后退。")
			show("最终，你被逼到了墙角。")
			show("兽人族长托住"+hostage+"的大腿，将她的阴户举到你的面前。",true)
			if(hostage=="暗精灵"){
				show("你近距离看着兽人狰狞的肉棒在暗精灵淫靡的小穴中进进出出，却无能为力。")
				pause()
				show("突然，兽人族长用力一顶。")
				show("暗精灵猛烈地潮吹了！")
				show("你猝不及防地被迷住了眼睛，被兽人制服了。")
			}else{
				show("你近距离看着兽人狰狞的肉棒在魔法师光洁的小穴中进进出出，却无能为力。")
				pause()
				show("突然，兽人族长用力一顶。")
				show("魔法师尿了出来！")
				show("你猝不及防地被迷住了眼睛，被兽人制服了。")
			}
			pause()
			show("你抗议着对方的卑鄙行为。")
			show("兽人族长表示兽人是一个重视荣誉的种族，而在战斗中侵犯女人是一种夸耀自身武勇的方式。")
			show("你还能说些什么？")
			gainbuff("监禁：兽人",1)
		},
		town:false,
		chance:function(){
			if(week-chapter_startweek<=7)return 0
			if(getop("魔法师")<=-100)return 2
			return 1
		},
		start:3,
		end:3
	}

	ev["orc_prison"]={
		ev:function(){
			show("你被兽人监禁了。")
			if(getbuff("监禁：兽人")==1){
				if(past_event.includes("orc_prison")){
					show("“老规矩，一个月。”兽人将你带进了牢房。")
				}else{
					show("你要求兽人杀死自己。")
					show("但兽人表示他很欣赏你，所以要给你一个机会——如果你能忍受住一个月的调教，就放你出去。")
					show("你不确定这是不是一个陷阱，但这至少给了你一些希望。")
				}
				return
			}
			randomorcev()

		},
		town:true,
		chance:function(){
			if("监禁：兽人" in buff)return 10000
		}
	}
	ev["orc_prison2"]={
		ev:function(){
			show("你被兽人监禁了。")
			if(getbuff("监禁：兽人")==4){
				show("今天是调教的最后一天。")
				show("你等待着兽人调教的到来——却什么都没有发生。",true)
				ans=rand()
				if(status.lewd>=rand(30)){
					show("你感到欲求不满，开始自慰。但手指并不能代替兽人的巨根。")
					gain({v_exp:5,m_exp:5})
					gainbuff("服从兽人",1)
					if(getbuff("服从兽人")>=rand(8)+4){
						show("当兽人进入你的牢房时，你并没有停止自慰。")
						show("你表示自己不想离开。",true)
						show("兽人和你在先祖的雕像前举办了结合的仪式。")
						show("你亲吻兽人的肉棒，而他为你带上了项圈。")
						show("你们接受了萨满的祝福，在众多兽人的注视下交合。")
						show("这一刻，你感到无上的幸福。")
						pause()
						show("结局：兽人的新娘")
						gameover=true
						return
					}else{
						show("当兽人进入你的牢房时，你连忙停下了手上的动作。")
					}
				}
				show("兽人按照约定释放了你。")
				show("你意外地发现他没有耍任何花样。")
				gainbuff("监禁：兽人",-10000)
				gainbuff("服从兽人",1)
				return
			}
			randomorcev()
			if(chapter!=3)return
			gainbuff("监禁：兽人",1)
		},
		town:false,
		chance:function(){
			if("监禁：兽人" in buff)return 10000
		}
	}
}

function randomorcev(){
	var r=rand(5)
	if(r==1){
		show("兽人喂你吃下了一些催乳的药物，然后尝试榨出你的乳汁。")
		if("母乳体质"in buff){
			show("很快，你的身体就对兽人的刺激做出了回应。")
			gain({b_exp:5,p_exp:1})
			gainbuff("服从兽人",1)
			return
		}
		show("不管他怎么粗暴地挤压你的乳头，都没有任何反应。")
		gain({b_exp:3,p_exp:3})
		show("他生气地后入了你。")
		gain({v_exp:5,p_exp:3,s_exp:1},"兽人")
		if(status.b_lv>=2+rand(3)){
			pause()
			show("在被侵犯的过程中，母乳流了出来。")
			gain({b_exp:3})
			gainbuff("母乳体质")
		}
		return
	}
	if(r==2){
		show("兽人对你的菊花进行了调教。")
		if(status.a_lv<=0){
			show("他勉强塞进来一根手指。")
			gain({a_exp:2,p_exp:3})
		}else if(status.a_lv<=1){
			show("他塞进来两根手指，在你的肛门内搅动起来。")
			gain({a_exp:4,p_exp:3})
		}else{
			show("他用手指玩弄了一番后，掏出差不多有你手腕粗细的肉棒对准了你的菊穴。")
			show("你感到了强烈的痛苦，和……一些异样的感觉。")
			gain({a_exp:5,p_exp:5,s_exp:1,u_exp:1},"兽人")
			gainbuff("服从兽人",1)
		}
		return
	}
	if(r==3){
		show("兽人带你去看了一个做工粗糙的雕像。")
		show("你隐约能看出雕的是某个女性跪在兽人面前，脸朝着兽人胯下的凸起物。")
		show("兽人告诉你，这是兽人先祖和精灵女王。")
		if(rand(2)==1){
			show("他一边向你讲述先祖建立包括所有异种族的后宫的壮举，一边玩弄着你的身体。")
			show("眼前的这位兽人似乎也有着同样的理想。")
			gain({v_exp:3})
		}else{
			show("他一边向你讲述精灵女王沉迷于兽人巨根的过程，一边玩弄着你的身体。")
			show("你不知道自己是否会不会变得和故事中的精灵一样。")
			gain({v_exp:3})
			gainbuff("服从兽人",1)
		}
	}
	if(r==4){
		if(getop("刺客")>=0 && rand(2)==0 && past_event.includes("orc_boss") && !("assassin_vs_orc"in flag)){
			show("当刺客杀进兽人族长的房间时，他正在侵犯你。")
			show("见到刺客进来，他丝毫没有停下的意思。")
			show("他站起身，维持着插入的状态向刺客走了过去。")
			show("你全身的重量都压在了族长的肉棒上，发出了分不清是痛苦还是快乐的叫声。")
			gain({v_exp:2,p_exp:2,e_exp:2})
			gainflag("assassin_vs_orc")
			pause()
			show("兽人族长一边侵犯着你一边和刺客战斗。")
			if(rand(8)+1<getbuff("服从兽人")){
				show("你配合着兽人的动作扭动腰肢。")
				gain({v_exp:5,s_exp:1},"兽人")
				show("刺客面红耳赤盯着你们结合的部位，呼吸变得渐渐粗重。")
				show("她丢出烟雾弹逃跑了。")
			}else{
				show("你配合着兽人的动作扭动腰肢，寻找着机会。")
				show("当你感到体内的兽人阴茎进一步膨胀时，你大叫起来。")
				gain({v_exp:8,s_exp:2},"兽人")
				pause()
				show("刺客明白了你的意图，在兽人族长因为射精而松懈的瞬间绕到了他的背后。")
				show("兽人族长被刺客击中了要害，壮硕的身体摔倒在地上。")
				if(getop("魔法师")<-100){
					show("",true)
					show("你们救出了被囚禁的魔法师。")
					if(op["魔法师"].prison<=week){
						show("你抱住魔法师，她在你怀里大哭起来。")
						op["魔法师"].val+=10000
					}else{
						show("魔法师缩起身子，避开了你的拥抱。")
						show("",true)
						show("魔法师退出了冒险者公会。")
						if("魔法师的恋人" in buff)
							gainbuff("魔法师的恋人",-10000)
					}
				}
				show("",true)
				show("几天之后的一个早上，你发现床头多了一袋金币。")
				show("刺客留下的便条上说，击杀兽人首领的赏金应该有你一份。")
				gain({money:orc_m/2*5,exp:orc_e/2*5})
				gainop("刺客")
				pause()
				show("你的冒险者等级提升了。")
				chapter=4
				chapter_startweek=week
			}
			gainbuff("监禁：兽人",-10000)
			return
		}
		show("兽人将你绑在他的身上，保持着插入的状态和冒险者战斗。")
		gain({e_exp:5,v_exp:5,p_exp:3,s_exp:1},"兽人")
	}
	if(r==0){
		show("你的食物中加入了大量的兽人精液。")
		if(status.o_lv>=2&&status.s_lv>=2){
			show("你适应了这种特殊的调味。")
			gain({o_exp:3,s_exp:3})
			gainbuff("服从兽人",1)
		}else{
			show("你勉强吃了几口就无法下咽。")
			gain({o_exp:2,s_exp:2})
		}
	}
}