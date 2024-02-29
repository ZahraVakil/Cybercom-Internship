const URL = "https://cat-fact.herokuapp.com/facts";

//let promise = fetch(url, [options]);
//option - default is get request

const factPara = document.querySelector('#fact');
const btn = document.querySelector('#btn');

//using await async
// const getFacts = async ()=>{
//     console.log("Getting data...");

//     let response = await fetch(URL); // fetch returns a promise // objects form 
//     console.log(response); //json format
//     console.log(response.status); //obj key print

//     let data = await response.json();
//     // console.log(data); // array of 5
//     // console.log(data[0]);
//     // console.log(data[0].text);
//     factPara.innerText = data[0].text;
// };

//using promise chain 

function getFacts (){
    fetch(URL)
        .then((response) =>{
            return response.json();
        })

        .then((data) =>{
            console.log(data);
            factPara.innerText = data[2].text;
        })
}

btn.addEventListener("click", getFacts);