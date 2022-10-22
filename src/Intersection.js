
function Intersection(x1,y1,x2,y2,x3,y3,x4,y4){
// console.log('Intersection')
let k1
let k2
let b1
let b2
// console.log(`x1=${x1},y1=${y1},x2=${x2},y2=${y2},x3=${x3},y3=${y3},x4=${x4},y4=${y4}`)

if(x1>x2){
    let l = x1
    x1 = x2
    x2 = l
    let m = y1
    y1 = y2
    y2 = m
}

if(x3>x4){
    let l = x3
    x3 = x4
    x4 = l
    let m = y3
    y3 = y4
    y4 = m
}

if(y2===y1){
    k1 = 0
}
else{
    k1 = (y2-y1)/(x2-x1)
}

if(y4===y3){
    k2 = 0
}

else{
    k2 = (y4-y3)/(x4-x3)
}

if (k1===k2){
    console.log(`k1===k2=false`)
    return false
}
// console.log(`k1=${k1}`)
// console.log(`k2=${k2}`)

b1 = y1 - k1*x1
b2 = y3 - k2*x3

// console.log(`b1=${b1}`)
// console.log(`b2=${b2}`)
let o = solver(k1, b1, k2, b2)
//    console.log(examPoint(x1,y1,x2,y2,o)) 
//    console.log(examPoint(x3,y3,x4,y4,o))
   if(examPoint(x1,y1,x2,y2,o) && examPoint(x3,y3,x4,y4,o)){
    return o
   }
   else {
    return false
   }
    
}






function solver(k1, b1, k2, b2) {
    let o
    let y = ((k1 * b2 - b1 * k2) / (k1  - k2))
    let x = (-b2+y)/k2
    // console.log(`x=${x}, y=${y}`)
    return o=[x,y]
}

export function examPoint(xStart,yStart,xFinish,yFinish,o){
    let deltaStartToPoint = Math.sqrt(Math.pow((o[0]-xStart),2)+Math.pow((o[1]-yStart),2))
    let deltaFinishToPoint = Math.sqrt(Math.pow((o[0]-xFinish),2)+Math.pow((o[1]-yFinish),2))
    let summDelts = (deltaStartToPoint + deltaFinishToPoint).toFixed(2)
    let lineLength = (Math.sqrt(Math.pow((xFinish-xStart),2)+Math.pow((yFinish-yStart),2))).toFixed(2)
    // console.log(`summDelts=${summDelts}`)
    // console.log(`lineLength=${lineLength}`)
    if (summDelts==lineLength){
        return true
    }
    else {return false}
  
}



export default Intersection 