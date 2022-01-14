console.log("Welcome to Spotify");
let songindex =1;

let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('progressbar')
let mygif = document.getElementById('gif')
let songitem = Array.from(document.getElementsByClassName('songItem'));
let songs =[
        {songname: "Let Me Love You" , filepath: "songs/1.mp3" , coverpath:"covers/cover1.jpeg"},
        {songname: "Mai Tan Vi Pyar" , filepath: "songs/2.mp3" , coverpath:"covers/cover2.jpg"},
        {songname: "Khali salam dua" , filepath: "songs/3.mp3" , coverpath:"covers/cover3.jpg"},
        {songname: "No Lie" , filepath: "songs/4.mp3" , coverpath:"covers/cover4.jpg"},
        {songname: "Sukoon" , filepath: "songs/5.mp3" , coverpath:"covers/cover5.jpg"},
        {songname: "Badfella" , filepath: "songs/6.mp3" , coverpath:"covers/cover6.jpg"}
]
let audioelement = new Audio(songs[0].filepath);
songitem.forEach((element,i) => {
        // console.log(element,i);
        element.getElementsByTagName('img')[0].src = songs[i].coverpath;
        element.getElementsByClassName('Songname')[0].innerHTML = songs[i].songname;
        // element.getElementsByClassName('timestamp')[0].innerHTML = songs[i].duration;
});
// audioelement.play();
//handle play pause click
masterplay.addEventListener('click',()=>{
        if(audioelement.paused || audioelement.currentTime<=0){
                audioelement.play();
                // console.log(audioelement.duration);
                document.getElementById(songindex).classList.remove('fa-play-circle');
                document.getElementById(songindex).classList.add('fa-pause-circle');
                masterplay.classList.remove('fa-play-circle');
                masterplay.classList.add('fa-pause-circle');
                mygif.style.opacity=1;
        }else{
                audioelement.pause();
                makeAllplays();
                masterplay.classList.remove('fa-pause-circle');
                masterplay.classList.add('fa-play-circle');
                mygif.style.opacity=0;
               
        }
})
//listen to events
audioelement.addEventListener('timeupdate',()=>{
        progress = parseInt((audioelement.currentTime/audioelement.duration)*100);
        myprogressbar.value = progress;
        
})
myprogressbar.addEventListener("change",()=>{
        audioelement.currentTime =  myprogressbar.value * audioelement.duration/100;
})
const makeAllplays= ()=>{
        Array.from(document.getElementsByClassName('songitemplay')).forEach((element,i)=>{
                element.classList.remove('fa-pause-circle');
                element.classList.add('fa-play-circle');
       })

}
Array.from(document.getElementsByClassName('songitemplay')).forEach((element,i)=>{
         element.addEventListener('click',(e)=>{
                 console.log(e.target.id);
                 songindex = parseInt(e.target.id);
                 makeAllplays();
                 e.target.classList.remove('fa-play-circle');
                 e.target.classList.add('fa-pause-circle');
                 
                 audioelement.src = 'songs/'+songindex+'.mp3';
                 audioelement.currentTime =0;
                 masterplay.classList.remove('fa-play-circle');
                 masterplay.classList.add('fa-pause-circle');
                 audioelement.play();
                 mygif.style.opacity=1;
         })
})
document.getElementById('next').addEventListener('click',()=>{
        if(songindex>=6){
                songindex =1;
                
        }else {
                songindex += 1;
        }
        makeAllplays();
        document.getElementById(songindex).classList.remove('fa-play-circle');
        document.getElementById(songindex).classList.add('fa-pause-circle');
        audioelement.src = 'songs/'+songindex+'.mp3';
                 audioelement.currentTime =0;
                 masterplay.classList.remove('fa-play-circle');
                 masterplay.classList.add('fa-pause-circle');
                 audioelement.play();
                 mygif.style.opacity=1;
})
document.getElementById('previous').addEventListener('click',()=>{
        if(songindex<=1){
                songindex = 6;

                
        }else {
                songindex -= 1;
        }
        makeAllplays();
        document.getElementById(songindex).classList.remove('fa-play-circle');
        document.getElementById(songindex).classList.add('fa-pause-circle');
        audioelement.src = 'songs/'+songindex+'.mp3';
                 audioelement.currentTime =0;
                 masterplay.classList.remove('fa-play-circle');
                 masterplay.classList.add('fa-pause-circle');
                 audioelement.play();
                 mygif.style.opacity=1;
})
Array.from(document.getElementsByClassName('timestamp')).forEach((element,i)=>{
        let k = new Audio(songs[i].filepath);
        k.onloadedmetadata= function(){
                let m = Math.floor(this.duration);
                element.innerHTML= ("0" + Math.floor(m/60)).slice(-2) + ':' + ("0"+m%60).slice(-2);
                console.log((m%60));
        }
})