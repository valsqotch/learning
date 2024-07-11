const tbtn = document.getElementById("tool"),
    zhi = document.getElementById("zhi"),
    list = document.getElementById("list"),
    opts = document.getElementsByClassName("option"),
    entry = document.getElementById("entry"),
    edit = document.getElementById("edit"),
    blocks = document.getElementById("blocks"),
    ipt = document.getElementById("ipt"),
    init = document.getElementById("initiate"),
    qcon = document.getElementById("q-contain"),
    mk=document.getElementById("making"),
    o1=document.getElementById("o1"),
    o2=document.getElementById("o2"),
    o3=document.getElementById("o3"),
    o4=document.getElementById("o4");
let bool1=false; //indicates if the menu is shown
let bool2=false; //indicates if the user's adding data
let bool3=false; //indicates if the user's playing
let bool4=false; //indicates if the user's making new questions
let total = 0;
let numb = 0;
let nums = 0;
let q_num=0;
let colstr="";
let mk_state=0;
var data=[
    gtest=[
        info=[
            id="test",
            quan=0,
        ]
    ]
];
/*var data = [ //data[group][word][qus/ans]
    g0=[
        info = [
            id="group0",
            quan=2,
        ],
        w1=[
            kj="怪しい",
            km="あやしい"
        ],
        w2=[
            kj="文化",
            km="ぶんか"
        ]
    ],
    g1=[
        info = [
            id="group1",
            quan=1
        ],
        w1 = [ 
            kj="自己",
            km="じこ"
        ]
    ]
]*/
/*let t=[
    info=[
        id="group1",
        quan=1
    ],
    w1 = [ 
        kj="自己",
        km="じこ"
    ]
]
data.push(t);*/
/*var data = {
    g0:{
        info:{
            id:"group0",
            quan:2
        },
        w1:{
            kj:"怪しい",
            km:"あやしい"
        },
        w2:{
            kj:"文化",
            km:"ぶんか"
        }
    }
}*/
//console.log();
if(data[2]==null){
    console.log("...");
}
tbtn.addEventListener("mousedown",function(){
    if(!bool1){     
        bool1=true;
        list.style.display = "block";
    }
    else{
        bool1=false;
        list.style.display="none";
    }
})
o1.addEventListener("mousedown",function(){
    bool3=false;
    console.log("signal");
    hide();
    entry.style.display="block";
    bool2=true;
    //console.log(ipt.value);
})
ipt.addEventListener("keydown",function(i){
    if(bool2&&i.key=="Enter"){ 
        //data.push("g" + data.length);
        //data.push("g2");
        let tarray = [];
        let state = 0; //0=>title, 1=>question, 2=>answer
        let str = ipt.value;
        let tstr = "";
        let taray=[];
        for(let i=0;i<str.length;i++){
            if(str[i]=='~'||str[i]=='*'){
                if(state==0){
                    let t=0;
                    taray.push(tstr);
                    for(let j=i;j<str.length;j++){
                        if(str[j]=='*'){
                            t++;
                        }
                    }
                    taray.push(t-1);
                    tarray.push(taray);
                    taray=[];
                    state=1;
                }
                else if(state==1){
                    taray.push(tstr);
                    state=2;
                }
                else{
                    taray.push(tstr);
                    state=1;
                    tarray.push(taray);
                    taray = [];
                }
                tstr="";
            }
            else{
                tstr +=str[i];
            }
        }
        data.push(tarray);
        //console.log(data[2][0][0]);
        ipt.value="";
    }
    if(bool3&&i.key=="Enter"){
        console.log("working here");
        if(ipt.value==data[numb][nums][1]){
            ipt.value="";
            let t=200;
            let time = setInterval(() => {
               qcon.style.borderColor = "rgb(" + 0 + "," + t + "," + 0 + ")" 
               t-=10;
               if(t<=5){
                qcon.style.borderColor = "rgb(0,0,0)";
                clearInterval(time);
               }
            }, 10);
            findqus();
        }
        else{
            ipt.value="";
            let t=200;
            let time = setInterval(() => {
                //zhi.style.color = "rgb(" + t + ",0,0)";
                t-=1;
                if(t<=100){
                    clearInterval(time);
                }
            },10);
            let time2 = setInterval(() => {
                zhi.style.color = "rgb(" + t + "," + t + "," + t + ")";
                qcon.style.backgroundColor = "rgb(" + 200 + "," + (200-t) + "," + (200-t) + ")";
                t-=2;
                if(t<=1){
                    clearInterval(time2);
                    zhi.style.color="rgb(0,0,0)";
                qcon.style.backgroundColor="rgb(200,200,200)";
                }
            }, 10);
        }
    }
    if(bool4&&i.key=="Enter"){
        if(mk_state==0){
            colstr+=ipt.value;
            mk_state=1;
            ipt.value="";
            mk.innerText="輸入題目";
        }
        else if(mk_state==1){
            if(ipt.value!=""){
                colstr+="~";
                colstr+=ipt.value;
                mk_state=2;
                ipt.value="";
                mk.innerText="輸入答案";
            }
            else{
                colstr+="*";
                ipt.value=colstr;
                mk.innerText="保存以下字串";
            }
        }
        else{
            console.log("tips");
            colstr+="*";
            colstr+=ipt.value;
            mk_state=1;
            ipt.value="";
            mk.innerText="輸入題目";
        }
    }
})
o2.addEventListener("mousedown",function(){
    bool3=false;
    bool2=false;
    hide();
    edit.style.display="block";
    blocks.innerHTML = ``;
    for(let i=0;i<data.length;i++){
        //blocks.innerHTML+=`<span class="ablock">${data[i][0][0]}<div style="font-size:30px>數量:${data[i][0][1]}</div></span>`
        if(data[i]!=null){
            blocks.innerHTML+=`<div id="group${i}" class="ablock">${data[i][0][0]},共${data[i][0][1]}個</div>`
        }
    }
    let gp = [];
    for(let i=0;i<data.length;i++){
        if(data[i]!=null){
            gp[i]=document.getElementById("group"+i);
            gp[i].addEventListener("mousedown",function(){
                //console.log("button "+ i +" clicked");
                gp[i].innerText="deleted";
                delete data[i];
            })
        }
    }
})
o3.addEventListener("mousedown",function(){
    bool3=false;
    bool2=false;
    init.innerText="Start";
    hide();
    init.style.display="block";
    total=0;
    for(let i=0;i<data.length;i++){
        if(data[i]!=null){
            total+=data[i][0][1];
        }
    } //to count how many words there are
    console.log("total words:" + total);
    //console.log(data[2][1][1]);
})
init.addEventListener("mousedown",function(){
    
    if(total!=0){
        hide();
        zhi.style.display="block";
        bool3=true;
        findqus();
        console.log("big:" + numb + " , small:" + nums + ", q_num:" + q_num + "," +data[numb][nums][0]);
        
    }
    else{
        init.innerText="沒有題目";
    }
    
    //zhi.innerText="working";
})
function findqus(){
    let t=0;
    q_num=total * Math.random();
    for(numb=0;numb<data.length;numb++){
        if(data[numb]!=null){
            for(nums=1;nums<data[numb].length;nums++){
                t++;
                //console.log(numb+","+nums+","+data[numb][nums][0]);
                if(t>=q_num){
                    break;
                }
            }
        }
        if(t>=q_num){
            break;
        }
    }
    zhi.innerText=data[numb][nums][0];
}
function hide(){
    mk.style.display="none";
    zhi.style.display="none";
    init.style.display="none"
    entry.style.display="none";
    edit.style.display="none";
    bool4=false;
}
o4.addEventListener("mousedown",function(){
    hide();
    mk.style.display="block";
    bool4=true;
    colstr="";
    mk.innerText="輸入標題";
    mk_state=0;
})