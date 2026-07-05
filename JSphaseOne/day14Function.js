// 1. Funtion Declaration 
function funName(){
    console.log("I am function declaration");
    
}
// funName()


// 2. function Expression
let funName2 = function(){
    console.log('i am function Expression')
}
// funName2()


// 3. Arrow function
let funName3 = ()=>{
    console.log("I am arrow funtion");
    
}
// funName3()


// 4. Anonymous Funtion
// setTimeout(function(){
    // console.log("I am annonymous Funtion");
    
// }, 1000)



// 5.IIFE
// (function(){
//     console.log('i am IIFE')
// })() 

function greet(name = 'Sir'){
    if(name == undefined){
        console.log('Write the name')
    }else{
        
        console.log("hello", name);
    }
    
}
// greet('apurv')
// greet()


let arr = [1, 2 ,3 ,4 ,5 ]
let arr2 =[99, 22, 1, 35 ,45 ,8,  0 , 1, 4]
// console.log(arr[arr.length-1]);

// arr.push(6)
// console.log(arr);
// arr.pop()
// console.log(arr);

// arr.unshift()
// arr.unshift(70)
// console.log(arr)
arr.shift(45)
// console.log(arr)

arr.splice(2, 0, 77)
// console.log(arr);
arr2.sort((a,b)=>a -b)
// console.log(arr2);

arr3 = []

for(i = 0; i < 10; i++){
    arr3.push(i+1)
}
console.log(arr3);
