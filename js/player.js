/**
 * Created by Administrator on 2017/3/21.
 */
window.onload=function () {
    let database=[
        {id:'s1',song:'牵丝戏',author:'银临,Aki阿杰',src:'song/银临,Aki阿杰%20-%20牵丝戏.mp3',bigimg:'bigimg/big1.jpg',smallimg:'img/1.jpg',zhuanji:'牵丝戏'},
        {id:'s2',song:'红玫瑰',author:'陈奕迅',src:'song/陈奕迅 - 红玫瑰.mp3',bigimg:'bigimg/big2.jpg',smallimg:'img/2.jpg',zhuanji:'红玫瑰'},
        {id:'s3',song:'战争世界',author:'陈姿彤',src:'song/陈姿彤 - 战争世界.mp3',bigimg:'bigimg/big3.jpg',smallimg:'img/3.jpg',zhuanji:'战争世界'},
        {id:'s4',song:'苍山负雪',author:'慕寒',src:'song/慕寒 - 苍山负雪.mp3',bigimg:'bigimg/big4.jpg',smallimg:'img/4.jpg',zhuanji:'老作品'},
        {id:'s5',song:'古龙群侠传',author:'小魂',src:'song/小魂 - 古龙群侠传.mp3',bigimg:'bigimg/big5.jpg',smallimg:'img/5.jpg',zhuanji:'古龙群侠传'},
    ];

    let box=document.querySelector('.box');
    let list=document.querySelector('.list .playlist');
    let audio=document.querySelector('audio');
    database.forEach((obj,index)=>{
        //创建li
        let li=document.createElement('li');
        li.innerHTML=`
                    <span class="iconfont"></span>
                    <span>${obj.song}</span>
                    <span>${obj.author}</span>
                    <span>${obj.zhuanji}</span>
                    <span class="del iconfont icon-delete"></span>`;
        list.appendChild(li);
        //如果是第一个li就加上类名加样式
        if(index==0){
            li.classList.add('active');
        }
        li.id=obj.id;
    });

    // audio.oncanplay=function () {
        let load=document.querySelector('.load');
        load.style.width='100%';
    // }



    //    获取播放按钮
    let play=document.querySelector('.play');
    let current=0;   //当前播放0个
    //播放按钮的点击事件
    //获取当前播放列表的所有li
    let listlis=list.querySelectorAll('li');

    play.onclick=function(){
        let span=listlis[current].children[0];
        // 找到当前li下的第一个span并给其添加类名来增加播放状态
        if (audio.paused){
            //如果是暂停的 点击后播放 并且换成播放图标并且给列表的span加上类名来加上图标
            // list.children[current].children.[0].classList.add('')
            audio.play();
            this.classList.remove('icon-bofang1');
            this.classList.add('icon-zanting');
            span.classList.add('icon-yinle');
        }else{
            //否则 点击后暂停 并且换成暂停图标并且给列表的span去除类名来去除图标
            audio.pause();
            this.classList.remove('icon-zanting');
            this.classList.add('icon-bofang1');
            span.classList.remove('icon-yinle');
        }
    };


    //进度条
    let circle=document.querySelector('.circle');
    let row=document.querySelector('.row');
    let jindu=document.querySelector('.jindu');
    let tiao=document.querySelector('.tiao');

    audio.ontimeupdate=function(){
        let nowtime=getTime(audio.currentTime);     //现在的时间
        let totaltime=getTime(audio.duration);      //总共的时间
        let time=document.querySelector('.time');
        let alltime=document.querySelector('.alltime');
        time.innerHTML=nowtime;            //把现在的时间和总共的时间添加到页面的span里
        alltime.innerHTML=totaltime;
        circle.style.left=audio.currentTime/audio.duration*jindu.offsetWidth-5+'px';     //circle的位置
        row.style.width=audio.currentTime/audio.duration*jindu.offsetWidth+'px';   //row的宽度

    };
    // audio.oncanplaythrogh=function () {
    jindu.onclick=function (e) {            //进度条的点击事件
        audio.currentTime = e.offsetX / jindu.offsetWidth * audio.duration;     //点击后的时间位置
        audio.play();                       //点击后开始播放，并进行播放的一系列操作
        play.classList.remove('icon-bofang1');
        play.classList.add('icon-zanting');
        list.querySelectorAll('li')[current].children[0].classList.add('icon-yinle')
    };
    // }
    //获取时间函数
    function getTime(time){
        //分
        let m=Math.trunc(time/60)>=10? Math.trunc(time/60):'0'+Math.trunc(time/60);
        // 秒
        let s=Math.trunc(time)%60>=10? Math.trunc(time)%60:'0'+Math.trunc(time)%60;
        return m+':'+s;
    }

    //获取音量
    let volumeicon=document.querySelector('.volume span');
    let currentvolume=1;
    volumeicon.onclick=function () {
        if (audio.volume){
            //把当前的音量保存在currentvolume中
            currentvolume=audio.volume;
            audio.volume=0;
            this.classList.remove('icon-shengyin');
            this.classList.add('icon-jingyin-copy');
        }else{
            audio.volume=currentvolume;
            this.classList.remove('icon-jingyin-copy');
            this.classList.add('icon-shengyin');
        }
    };
    let volumerow=document.querySelector('.volumerow .row');
    let volumecircle=document.querySelector('.volumerow .circle');
    let volumejindu=document.querySelector('.volumerow .jindu');
    //当音量改变的时候让circle的位置也改变，并且row的宽度改变
    volumejindu.onclick=function (e) {
        audio.volume=e.offsetX/volumejindu.offsetWidth
    };
    audio.onvolumechange=function () {     //在音量改变时间里
        let curvolume=audio.volume;
        volumerow.style.width=curvolume*volumejindu.offsetWidth+'px';
        volumecircle.style.left=curvolume*volumejindu.offsetWidth-10+'px';

    };
    let smallimg=document.querySelector('.smallimg');
    let song=document.querySelector('.song');
    let author=document.querySelector('.author');

    list.ondblclick=function (e) {
        let obj=e.target;
        if(obj.nodeName=='SPAN'&&obj.className!='del'){
            let id=obj.parentNode.id;
            let num=database.findIndex((obj)=>{
                return obj.id==id;
            });
            smallimg.style.backgroundImage=`url(${database[num].smallimg})`;
            box.style.backgroundImage=`url(${database[num].bigimg})`;
            audio.src=database[num].src;
            song.innerHTML=database[num].song;
            author.innerHTML=database[num].author;
            current=num;
            audio.play();
            [...obj.parentNode.parentNode.children].forEach((val)=> {
                val.classList.remove('active');
                val.children[0].classList.remove('icon-yinle');
                play.classList.remove('icon-bofang1');
                play.classList.add('icon-zanting')
            });
            obj.parentNode.classList.add('active');
            obj.parentNode.children[0].classList.add('icon-yinle')
        }
    };

    let span=document.querySelectorAll('.del');
    span.forEach((val)=>{
        val.onclick=function (){
            if (this.parentNode.className=='active') {
                return;
            }
            let id=val.parentNode.id;
            database.forEach((val,index,arr)=>{
                if (val.id===id){
                    arr.splice(index,1);
                    console.log(arr)
                }
                if(current>index){
                    current--;
                }
                console.log(current)

            });
            list.removeChild(this.parentNode)
        }

    });



    // 上一首下一首
    let next=document.querySelector('.btn  .next');
    let previous=document.querySelector('.btn  .previouse');
    next.onclick=function () {
        list.children[current].classList.remove('active');
        list.children[current].children[0].classList.remove('icon-yinle');
        current++;
        if (current>=database.length){
            current=0;
        }
        smallimg.style.backgroundImage=`url(${database[current].smallimg})`;
        box.style.backgroundImage=`url(${database[current].bigimg})`;
        audio.src=database[current].src;
        song.innerHTML=database[current].song;
        author.innerHTML=database[current].author;

        play.classList.remove('icon-bofang1');
        play.classList.add('icon-zanting');
        list.children[current].classList.add('active');
        list.children[current].children[0].classList.add('icon-yinle');
        audio.play();
    };
    previous.onclick=function () {
        list.children[current].classList.remove('active');
        list.children[current].children[0].classList.remove('icon-yinle');
        //
        current--;
        if(current<=0){
            current=database.length-1;
        }
        smallimg.style.backgroundImage=`url(${database[current].smallimg})`;
        box.style.backgroundImage=`url(${database[current].bigimg})`;
        audio.src=database[current].src;
        song.innerHTML=database[current].song;
        author.innerHTML=database[current].author;

        play.classList.remove('icon-bofang1');
        play.classList.add('icon-zanting');
        list.children[current].classList.add('active');
        list.children[current].children[0].classList.add('icon-yinle');
        audio.play();
    };
    //当一首歌完成的时候运行next.onclick()
    audio.onended=function () {
        next.onclick();
    };
    let menu=document.querySelector('.menu');
    let l=document.querySelector('.list');
    menu.onclick=function () {
        l.classList.toggle('hidden')
    }
};