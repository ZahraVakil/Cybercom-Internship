//async Functions-- returns promise

// async function hello(){
//     console.log('hello');
// }

// function api(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() =>{
//             console.log("weather app");
//             resolve(200);
//         },2000)
//     })
// }

// //cant use:----
// // await api();

// async function getWeather(){
//     await api(); //1st
//     await api(); //2nd
// }

function getData(dataId){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            console.log("data", dataId);
            resolve("success");
        }, 2000);
    });
}

//Aysnc-await
//iife
(async function(){
    console.log('getting data 1 ...');
    await  getData(1);
    console.log('getting data 2 ...');
    await getData(2);
    await getData(3);
})();
//Promises

//---self creted promise, in general api creates a new promise and we have to handle it
// let promise = new Promise((resolve, reject) => {
//     console.log("I am a promise");
//     // resolve("success");
//     reject("some error");
// });

// promises handle in apis
// function getData(dataId){
//     return new Promise((resolve, reject) =>{
//         setTimeout(()=>{
//             console.log("data", dataId);
//             resolve("success");
//         }, 5000);
//     })
// }

//promise chain 

// getData(1).then((res)=>{
//     console.log(res);
//     getData(2).then(()=>{

//     })
// })


// getData(1)
//  .then((res)=>{
//         return getData(2);
// })
// .then((res)=>{
//     return getData(3);
// })
// .then((res)=>{
//     console.log(res);
// })
// //promise then and catch (handling)

// const getPromise = () =>{
//     return new Promise((resolve, reject) =>{
//         console.log("I am a promise");
//         // resolve("success");
//         reject("error");
//     })
// }

// let promise = getPromise();

// promise.then(()=>{
//     console.log("promise fulfilled");
// })

// promise.catch((err)=>{
//     console.log("rejected", err)
// })

// //promise chain

// function asyncFunction (){
//     return new Promise ((resolve, reject)=>{
//         setTimeout(()=> {
//             console.log("some data1");
//             resolve("success");
//         }, 4000)
//     })
// }


// function asyncFunction2(){
//     return new Promise ((resolve, reject)=>{
//         setTimeout(()=> {
//             console.log("some data2");
//             resolve("success");
//         }, 6000)
//     })
// }

// console.log('fetching data1....')
// let p1 = asyncFunction();
// p1.then((res) =>{
//     console.log(res);

//     console.log('fetching data2....')
//     let p2 = asyncFunction2();
//     p2.then((res) =>{});
// })



//callback, callbackHell, promises, aync await

//one type of callback function
// console.log('first');
// console.log('second');

// setTimeout(()=>{
//     console.log("Hello");
// }, 2000);

// console.log('third');
// console.log('fourth');

// //callback

// function sum(a, b){
//     console.log(a+b);
// }
// function calculate(a, b, sumCallback){
//     sumCallback(a,b)
// }

// calculate(3,4, sum)


// //callback Hell Concept - complexion 
// function getData(dataId, getNextData){
//     //2s

//     setTimeout(()=>{
//         console.log("data",dataId);

//         if(getNextData){
//             getNextData();
//         }
//     }, 2000);
// }


// getData(1, ()=>{
//     getData(2, ()=>{
//         getData(3, ()=>{
//             getData(4);
//         })
//     });
// })
