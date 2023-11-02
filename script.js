const hour = document.getElementById("hours")
const minute = document.getElementById("minutes")
const second = document.getElementById("seconds")
const ampm = document.getElementById("ampm")

const hourSelect = document.getElementById("hourSelector")
const minuteSelect = document.getElementById("minuteSelector")
const ampmSelect = document.getElementById("ampmSelector")
const setAlarmButton = document.getElementById("setAlarm")
const message = document.getElementById("alarm")
const content = document.getElementById("set-alarm-container")

let alarmTime;
let currTime;
let isAlarmSet = false

let alarmTone = new Audio("./files/808alarm.mp3")

function currentTime() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        ampm.innerHTML = "AM"


        console.log(`${hours}:${minutes} ${ampm.innerHTML}`)
        if(alarmTime == `${hours}:${minutes} ${ampm.innerHTML}`){
            // alert("Alarm is ringing")
            alarmTone.play();
            alarmTone.loop = true;
        }
        // console.log(`${hours} : ${minutes} : ${seconds}`)
        currTime = `${hours} : ${minutes}`
       if(hours >= 12){
            if(hours>12){
                hours = hours - 12;
            }
            ampm.innerHTML = "PM"
        }else if(hours == 0){
            ampm.innerHTML = "AM"
        }

        hours = (hours < 10)?
             "0" + hours :
            hours
        minutes = (minutes < 10)?
             "0" + minutes :
            minutes
        seconds = (seconds < 10)?
             "0" + seconds :
             seconds
        hour.innerHTML = hours
        minute.innerHTML = minutes
        second.innerHTML = seconds
        
}
function displayTime(){
     setInterval(currentTime , 1000)
}

function generateOption(){
    //Generate all the options for hour selector
    for(let i = 0 ; i <= 12 ; i++){
        if(i<10){
            let temp = '0'+i
            hourSelect.options[i] = new Option(temp, i)
        }else{
            hourSelect.options[i] = new Option(i, i)
        }
    }

    //Generate all the options for Minute selector
    for(let i = 0 ; i < 60 ; i++){
        if(i<10){
            let temp = '0'+i
            minuteSelect.options[i] = new Option(temp, i)
        }else{
            minuteSelect.options[i] = new Option(i, i)
        }
    }


}

function setAlarm(){

    if(isAlarmSet){
        alarmTime =""
        alarmTone.pause()

        setAlarmButton.innerHTML = "Set Alarm";
        setAlarmButton.classList.remove("cancel-button")
        setAlarmButton.classList.add("set-button")
        content.classList.remove('disable')

        return isAlarmSet = false
    }

    isAlarmSet = true;
    //if the selected parameters are correct
    if(hourSelect.selectedIndex >=0 && minuteSelect.selectedIndex >=0 && ampmSelect.selectedIndex !=0 ){
        let time = `${hourSelect.value}:${minuteSelect.value} ${ampmSelect.value}`
        console.log(time)

        content.classList.add('disable') //disable the section to add the alarm

        //Set Alarm button is updated to cancel Alarm button
        setAlarmButton.innerHTML = "Cancel Alarm";
        setAlarmButton.classList.remove("set-button")
        setAlarmButton.classList.add("cancel-button")
        alarmTime = time;
    }else{
        message.innerHTML = "Invalid Parameters."
        message.style.visibility = "visible"
    }
}

setAlarmButton.addEventListener('click', setAlarm);


displayTime();
generateOption();