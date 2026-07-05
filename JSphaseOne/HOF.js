// forEach 
let arr = [10, 20, 30, 40, 50]

// var sum = 0;
// arr.forEach((e, i)=>{
//     console.log(e, i);
//     // console.log(e)
//     sum+=e;
// })
// console.log(sum);

// MAP

// let arr2 = arr.map((e)=>{
    
//     return e.length
// })
// console.log(arr2);


let res= arr.reduce((acc, val)=>{
    
return acc + val
// console.log(acc)
    
},0)

// console.log(res);

// let userName = prompt('enter you name')

let obj = {
    name: 'apurv',
    age: 24,
    city: 'jsr',
    hello: function(a){
        console.log('good morning', a)
    }
}                      //read     3R

obj.lastName = "bkt"  //creaete   1C
// obj.name = 'Apurva Bkt' //update  2U
delete obj.lastName   //delete    4D   CURD

// console.log(obj.hello('ram'));

const cal = {
    add: (a,b)=>{
        return a + b
    },
    mul:(a, b)=>{
        return a * b;
    },
     div:(a, b)=>{
        return a / b;
    },
    cube:(a)=>{
        return a*a*a
    }
    
}
cal.name = 'ram'
    
console.log(cal)