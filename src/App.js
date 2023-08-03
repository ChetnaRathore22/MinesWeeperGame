// import logo from './logo.svg';
import Swal from 'sweetalert2';
import audio from "./bomb.mp3"
import opensound from "./opensound.mp3"
import './App.css';
import React, { useEffect, useState } from 'react';
import AudioPlayer, {images} from './functionality';
function App() {
  const [mines, setMines] = useState([]);
  const [flagcount, setFlagCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [minecount, setMinecount] = useState(10);
  const [wincount, setwincount] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
const changeBackground=()=>{

  let selectimage= Math.floor(Math.random() * 20);
  document.getElementById('removeBoard').style.backgroundImage=`url(${images[selectimage]})`;
}

  var revelcount = 0;

  const startTimer = () => {
    setGameInProgress(true);
  };

  const css=(element)=>{
    element.style.fontSize = '25px';
    element.style.color = 'white'
    element.style.textAlign='center';
}

  const random = () => {
    for (let i = 0; i < 10; i++) {
      let status = true;
      if (mines.length == 0) {
        let a = Math.floor(Math.random() * 64);
        while (a == 0) {
          a = Math.floor(Math.random() * 64);
        }
        mines.push(a);
      } else {
        while (status) {
          let status1 = true;
          let a = Math.floor(Math.random() * 64);
          while (a == 0) {
            a = Math.floor(Math.random() * 64);
          }
          for (let i = 0; i < mines.length; i++) {
            if (mines[i] == a) {
              status1 = false;
            }
          }
          if (status1) {
            mines.push(a);
            status = false;
          }
        }
      }
    }
    
  }

  const handleclick = (id) => {
    
    startTimer();
    revelcount++;
    setwincount(wincount+revelcount)   
    let element = document.getElementById("box" + id);
    element.style.transform = "rotateY(360deg)";
    element.style.transition = "transform 1.2s";
    let emojichange = document.getElementById("emoji");

    if (element.innerHTML === "🚩") {
      return 0
    }
    element.style.backgroundColor = 'rgba(0, 0, 0, 0.421)';
    var arr = [];
    let count = 0;
    let minesearch = 0;

    // -------------------------------------lose---------------------------------------
    for (let i = 0; i < 10; i++) {
      if (mines[i] == id) {
        for (let i = 0; i < mines.length; i++) {
           
          let bomb = document.getElementById("box" + mines[i]);
          document.getElementById("audio").play();
          bomb.innerHTML = '&#128163';
          bomb.style.backgroundColor = 'rgba(255, 0, 0, 0.447)';
          emojichange.innerHTML = '&#128542;';
          bomb.style.fontSize = '30px '

        }
        setGameInProgress(false);
        setTimeout(() => {
          losealert();
        }, 2000)
        return;
      }
    }
    document.getElementById("openaudio").play();
// ----------------------------------wincondition-------------------------------------------------
    if (wincount === 54) {
      setGameInProgress(false);
      afterwin();
      setTimeout(() => {
        winalert();  
        setwincount(0);
      }, 2000);
    }

// -----------------------------------calculation-------------------
    if (id > 9 && id < 56 && id % 8 != 0 && id != 17 && id != 25 && id != 33 && id != 41 && id != 49) {

      arr[0] = id + 1;
      arr[1] = id - 1;
      arr[2] = id + 7;
      arr[3] = id + 8;
      arr[4] = id + 9;
      arr[5] = id - 7;
      arr[6] = id - 8;
      arr[7] = id - 9;

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < arr.length; j++) {

          if (mines[i] == arr[j]) {
            count++;
          }
        }
      }
      if (count !== 0) { element.innerHTML = count; }
      css(element)
// ----------------revel---------------------
      if (count === 0) {
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < mines.length; j++) {
            if (mines[j] === arr[i])
              minesearch++
             }
          if (minesearch === 0) {
            let element = document.getElementById("box" + arr[i]);
            if (element.style.color !== "white") {
              handleclick(arr[i]);
            }

          }
        }
      }
    } else {
      if (id < 9) {
        if (id == 1) {
          arr[0] = id + 1;
          arr[1] = id + 8;
          arr[2] = id + 9;

          for (let i = 0; i < 10; i++) {
            for (let j = 0; j < arr.length; j++) {
              if (mines[i] == arr[j]) {
                count++;
              }
            }
          }
          if (count !== 0) { element.innerHTML = count; }
          css(element)
          if (count === 0) {
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < mines.length; j++) {
                if (mines[j] === arr[i])
                  minesearch++
              }
              if (minesearch === 0) {
                let element = document.getElementById("box" + arr[i]);
                if (element.style.color !== "white") {
                  handleclick(arr[i])
                }
              }
            }
          }
        } else {
          if (id == 8) {
            arr[0] = id - 1;
            arr[1] = id + 8;
            arr[2] = id + 7;

            for (let i = 0; i < 10; i++) {
              for (let j = 0; j < arr.length; j++) {
                if (mines[i] == arr[j]) {
                  count++;
                }
              }
            }
            if (count !== 0) { element.innerHTML = count; }
            css(element)

            if (count === 0) {
              for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < mines.length; j++) {
                  if (mines[j] === arr[i])
                    minesearch++
                }
                if (minesearch === 0) {
                  let element = document.getElementById("box" + arr[i]);
                  if (element.style.color !== "white") {
                    handleclick(arr[i])
                  }
                }
              }
            }
          } else {
            arr[0] = id - 1;
            arr[1] = id + 1;
            arr[2] = id + 7;
            arr[3] = id + 8;
            arr[4] = id + 9;

            for (let i = 0; i < 10; i++) {
              for (let j = 0; j < arr.length; j++) {
                if (mines[i] == arr[j]) {
                  count++;
                }
              }
            }
            if (count !== 0) { element.innerHTML = count; }
            css(element)

            if (count === 0) {
              for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < mines.length; j++) {
                  if (mines[j] === arr[i])
                    minesearch++
                }

                if (minesearch === 0) {
                  let element = document.getElementById("box" + arr[i]);
                  if (element.style.color !== "white") {
                    handleclick(arr[i])
                  }
                 }
              }
            }
          }
        }
      } else
        if ((id % 8 === 0) && id != 8 && id != 64) {
          arr[0] = id - 9;
          arr[1] = id - 8;
          arr[2] = id - 1;
          arr[3] = id + 7;
          arr[4] = id + 8;
          for (let i = 0; i < 10; i++) {
            for (let j = 0; j < arr.length; j++) {
              if (mines[i] == arr[j]) {
                count++;
              }
            }
          }
          if (count !== 0) { element.innerHTML = count; }
          css(element)

          if (count === 0) {
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < mines.length; j++) {
                if (mines[j] === arr[i])
                  minesearch++
              }

              if (minesearch === 0) {
                let element = document.getElementById("box" + arr[i]);
                if (element.style.color !== "white") {
                  handleclick(arr[i])
                }

              }
            }


          }
        } else if (id < 50) {

          arr[0] = id + 1;
          arr[1] = id + 8;
          arr[2] = id - 8;
          arr[3] = id - 7;
          arr[4] = id + 9;


          for (let i = 0; i < 10; i++) {
            for (let j = 0; j < arr.length; j++) {
              if (mines[i] == arr[j]) {
                count++;
              }
            }
          }
          if (count !== 0) { element.innerHTML = count; }
          css(element)

          if (count === 0) {
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < mines.length; j++) {
                if (mines[j] === arr[i])
                  minesearch++
              }
              if (minesearch === 0) {
                let element = document.getElementById("box" + arr[i]);
                if (element.style.color !== "white") {
                  handleclick(arr[i])
                }
              }
            }
          }
        } else if (id == 57) {
          arr[0] = id + 1;
          arr[1] = id - 7;
          arr[2] = id - 8;

          for (let i = 0; i < 10; i++) {
            for (let j = 0; j < arr.length; j++) {
              if (mines[i] == arr[j]) {
                count++;
              }
            }
          }
          if (count !== 0) { element.innerHTML = count; }
          css(element)

          if (count === 0) {
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < mines.length; j++) {
                if (mines[j] === arr[i])
                  minesearch++
              }

              if (minesearch === 0) {
                let element = document.getElementById("box" + arr[i]);
                if (element.style.color !== "white") {
                  handleclick(arr[i])
                }

              }
            }
          }
        }
        else if (id == 64) {
          arr[0] = id - 1;
          arr[1] = id - 8;
          arr[2] = id - 9;

          for (let i = 0; i < 10; i++) {
            for (let j = 0; j < arr.length; j++) {
              if (mines[i] == arr[j]) {
                count++;
              }
            }
          }
          if (count !== 0) { element.innerHTML = count; }
          css(element)

          if (count === 0) {
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < mines.length; j++) {
                if (mines[j] === arr[i])
                  minesearch++
              }

              if (minesearch === 0) {
                let element = document.getElementById("box" + arr[i]);
                if (element.style.color !== "white") {
                  handleclick(arr[i])
                }
              }
            }
          }
        }
        else {
          arr[0] = id - 1;
          arr[1] = id + 1;
          arr[2] = id - 7;
          arr[3] = id - 8;
          arr[4] = id - 9;

          for (let i = 0; i < 10; i++) {
            for (let j = 0; j < arr.length; j++) {
              if (mines[i] == arr[j]) {
                count++;
              }
            }
          }
          if (count !== 0) { element.innerHTML = count; }
          css(element)
          if (count === 0) {
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < mines.length; j++) {
                if (mines[j] === arr[i])
                  minesearch++
              }

              if (minesearch === 0) {
                let element = document.getElementById("box" + arr[i]);
                if (element.style.color !== "white") {
                  handleclick(arr[i])
                }

              }
            }
          }
        }
    }
  }
//-----------------wincondition-------------
  if (flagcount == 10 && minecount===0){
    setTimeout(() => {
      setGameInProgress(false);
      winalert();
      setFlagCount(0);
    }, 2000);
  }
// ----------------flagCondtion---------
  const rightClickFlag = (event, id) => {
    event.preventDefault();
    let bomb = document.getElementById("box" + id);
    bomb.style.transform = "rotateY(360deg)";
    bomb.style.transition = "transform 1.2s";

    if (bomb.style.backgroundColor !== 'rgba(0, 0, 0, 0.42)') {

      if (bomb.innerHTML === "" || bomb.backgroundColor === "#f1f1f127") {
        
        bomb.style.backgroundColor = 'rgba(218, 165, 32, 0.285)';
        bomb.innerHTML = "🚩";
        setMinecount(minecount - 1)
        bomb.style.fontSize = '30px '
        for (let i = 0; i < mines.length; i++) {
          if (mines[i] == id) {
            setFlagCount(flagcount + 1);
          }
        }
      } else {
        setMinecount(minecount + 1)
        bomb.style.backgroundColor = '#f1f1f127'
        bomb.innerHTML = '';
      }
    }
  }


  
// -----------------Timer------------------
const formatTime = (timeInSeconds) => {
    const minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, '0');
    const seconds = String(timeInSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
};

const minteCalc=(elapsedTime)=>{
  return((Math.floor(elapsedTime/60))+" : "+(elapsedTime-(Math.floor(elapsedTime/60))*60))
}

// -----------Alert for Game Over--------------


const afterwin = () => {
  for (let i = 0; i < mines.length; i++) {
    let bomb = document.getElementById("box" + mines[i]);
    bomb.style.backgroundColor = 'rgba(218, 165, 32, 0.285)';
    bomb.innerHTML = "🚩";
    bomb.style.fontSize = '30px '
  }

}

  const losealert = () => {
    Swal.fire({
      title: '"Oops, You Lost"',
      textAlign:"Sorry,Better Luck Next Time!",
      icon: 'warning',
      iconHtml: '😔',
      text:'Timer :- '+minteCalc(elapsedTime)+'seconds',
      confirmButtonText: "Play Again", 
      confirmButtonColor: '#3085d6',

    }).then((result) => {
      if (result.isConfirmed) {

        window.location.reload()

      }
    })
  }

 const winalert = () => {
  Swal.fire({
    title: 'You Won',
    icon: 'success',
    iconHtml: '🤩',
    text:'Timer :- '+minteCalc(elapsedTime)+'seconds',
    confirmButtonText: "Play Again", 
    confirmButtonColor: '#ffcc00 ',

    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload()
      }
    })
}


  useEffect(() => {
    let timer;
    if (gameInProgress) {
      timer = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [gameInProgress])

  useEffect(() => {
    random(); 
    changeBackground();
  }, [])

  const blockRow = [];
  for (let i = 0; i < 8; i++) {
    blockRow.push(i);
  }
  return <>
  <AudioPlayer/>
    <div className='container'>
      <div className='text-align-center p-auto' id='boxsss'>
        <h2 className='text createnew1 mt-5 pt-3'>MinesWeeper Game</h2>
      </div>
      <div className='grid col-7 m-auto' id='removeBoard'>
        <div className='main row m-auto'>
          <div className='col-2 inmain'>
            <h6 className='icon'>&#128681;</h6>
          </div>
          <div className='col-2 inmain'>
            <h6 className='icon'>{minecount} </h6>
          </div>
          <div className='col-3 inmain'>
            <div className='result mt-1' id='emoji'>
              &#128525;
            </div>

          </div>
          <div className='col-1 watch'>
            &#9201;
          </div>
          <div className='col-2 mt-1'>
            <div className='timerdiv'>
              <span>{formatTime(elapsedTime)}</span>
            </div>
          </div>
        </div>
        <audio id='openaudio' src={opensound} />
        <audio id='audio' src={audio } />
        {blockRow.map((j) => {
          return (<div className='gridbox d-flex'>{blockRow.map((i) => {
            return (<div onClick={() => { handleclick(((i + 8 * j) + 1)) }} onContextMenu={(event) => rightClickFlag(event, ((i + 8 * j) + 1))} className='innergridbox inner' id={"box" + ((i + 8 * j) + 1)}></div>);
          })}</div>);
        })}
      </div>
    </div>
  </>
}

export default App;
