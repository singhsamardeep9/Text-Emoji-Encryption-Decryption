var clutter = ""

function encryption(){
    document.querySelector("#encrypt-btn").addEventListener("click",function(){

        //getting the value of input
        var input = document.getElementById("txtmsg").value
        console.log(input);
        
        //getting the value of password
        var password = document.getElementById("password").value
        console.log(password);

        //spliting the input
        var str = input.split("")
        //converting each value of split input into an emoji ascii code
        str.forEach(element => {
            clutter+= `&#128${element.charCodeAt()} `
        });
        // console.log(clutter)

        //storing the clutter in result div
        document.querySelector("#result").innerHTML = clutter;

        var dataArr = []
        
        if(JSON.parse(localStorage.getItem('data1'))){
            dataArr = JSON.parse(localStorage.getItem('data1'))
            // console.log(dataArr)
            dataArr.push({"pass":password,"input":input,"clutter":clutter})
        }else{
            dataArr = [{"pass":password,"input":input,"clutter":clutter}]
        }
        
        //storing the dataArr into local storage
        localStorage.setItem("data1",JSON.stringify(dataArr))
    })
}
encryption()

function decryption(){
    document.querySelector("#decrypt-btn").addEventListener("click",function(){
        var clutter2 = "";

        //getting  the emoji message
        var input2 = document.querySelector("#emojimsg").value
        //getting the given final password
        var password2 = document.querySelector("#finalPassword").value

        var user = JSON.parse(localStorage.getItem('data1'))
        console.log(user)

        var str2 = input2.split(" ")
        str2.forEach(element =>{
            clutter2+=`&#${element.codePointAt(0)} `
        })
        console.log(clutter2)
        var found
        for(let i of user){
            if(i.clutter == clutter2){
                found = i
                console.log(i);
            }
        }
        if(found.clutter === clutter2){
            document.querySelector("#result").style.display = "block"
            document.querySelector("#result").style.color = "#eee"

            document.querySelector("#result").innerHTML = found.input
        }else{
            document.querySelector("#result").style.display = "block"
            document.querySelector("#result").style.color = "red"
            document.querySelector("#result").innerHTML = "Wrong Password"
        }
    })
}
decryption()

function btnClicking(){
    document.querySelector("#dec-btn").addEventListener("click",function(){
        document.querySelector("#decryption").style.display = "block";
        document.querySelector("#encryption").style.display = "none";
        document.querySelector("#main>h1 span img").style.rotate = "180deg"
        document.querySelector("#dec-btn").style.backgroundColor = "#111"
        document.querySelector("#result").style.display = "none";
        document.querySelector("#enc-btn").style.backgroundColor = "#000"
    })
    document.querySelector("#enc-btn").addEventListener("click",function(){
        document.querySelector("#encryption").style.display = "block";
        document.querySelector("#decryption").style.display = "none";
        document.querySelector("#main>h1 span img").style.rotate = "0deg"
        document.querySelector("#enc-btn").style.backgroundColor = "#111"
        document.querySelector("#dec-btn").style.backgroundColor = "#000"
        document.querySelector("#result").style.display = "none";
    })
    document.querySelector("#encrypt-btn").addEventListener("click",function(){
        document.querySelector("#result").style.display = "block";
    })
    document.querySelector("#decrypt-btn").addEventListener("click",function(){
        document.querySelector("#result").style.display = "block";
    })
}
btnClicking()