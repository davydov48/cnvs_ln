import React, {createRef}from 'react'

import './App.css';
import Intersection, {examPoint} from './Intersection';

class App extends React.Component{
  constructor(){
    super()
    this.main = React.createRef()
    this.getSecond = React.createRef()
    this.start = null
    this.finish = null
    this.ctxAll = [] 
    this.dotsIntersection = []
    
  }
  
  

  drawDot = (xo,yo, id) => {
    let ctx = id.current.getContext('2d')
        ctx.beginPath()
        ctx.arc(xo, yo, 5, 0, 2*Math.PI, false)
        ctx.fillStyle = 'red'
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'red';
        ctx.stroke();
  }

  drawAnimation = () => {
    let ctx = this.main.current.getContext('2d')
    ctx.beginPath()
    ctx.clearRect(0,0,800,400)
  this.ctxAll.map(item=>{
    ctx.beginPath()
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.moveTo(item.a[0]+item.deltaCadr[0],item.a[1]+item.deltaCadr[1]);
    ctx.lineTo(item.b[0]-item.deltaCadr[0],item.b[1]+item.deltaCadr[1]); 
    item.a[0] = item.a[0]+item.deltaCadr[0];
    item.a[1] = item.a[1]+item.deltaCadr[1];
    item.b[0] = item.b[0]-item.deltaCadr[0];
    item.b[1] = item.b[1]-item.deltaCadr[1];
    ctx.stroke();
    
    
    this.dotsIntersection.map(i=>{
      
      if(examPoint(item.a[0],item.a[1],item.b[0], item.b[1],i)){
        
         this.drawDot (i[0],i[1],this.main)  
         
      }
    })
    
   
    })

  ctx.stroke();
   
  
  
  
  }
 
  drawLine = () => {
    let ctx = this.main.current.getContext('2d')
      ctx.beginPath()
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.moveTo(this.start[0],this.start[1]);
      ctx.lineTo(this.finish[0], this.finish[1]); 
      ctx.stroke();
      console.log(this.ctxAll)
      if(this.ctxAll.length>=1){
        this.ctxAll.map(item=>{
         let point = Intersection(item.a[0],item.a[1],item.b[0],item.b[1],this.start[0],this.start[1],this.finish[0],this.finish[1])
        //  console.log(`point=${point}`)
         if(point!==false){
          this.drawDot (point[0],point[1],this.main)
          this.dotsIntersection.push(point)
          console.log(this.dotsIntersection)
            }
         }) 
      }

      let o = [(this.finish[0]-this.start[0])/2, (this.finish[1]-this.start[1])/2]
      let deltaCadr = o.map(item=>item=item/90)

      this.ctxAll.push({a:this.start, b:this.finish, o:o, deltaCadr})
      console.log(this.ctxAll)
  }

  visibleLine = (event) => {
    if (this.start!==null && this.finish===null){
      let ctx2 = this.getSecond.current.getContext('2d')
      ctx2.beginPath()
      ctx2.clearRect(0,0,800,400)
      ctx2.beginPath()
      ctx2.lineWidth = 1;
      ctx2.strokeStyle = 'black';
      ctx2.moveTo(this.start[0],this.start[1]);
      ctx2.lineTo(event.clientX, event.clientY); 
      ctx2.stroke();
      if(this.ctxAll.length>=1){
        this.ctxAll.map(item=>{
         let point = Intersection(item.a[0],item.a[1],item.b[0],item.b[1],this.start[0],this.start[1],event.clientX,event.clientY)
        //  console.log(`point=${point}`)
         if(point!==false){
          this.drawDot (point[0],point[1],this.getSecond)

         
            }
         }) 
      }
      ctx2.stroke();
    }
  }

  canvasLine = (event) => {
  // console.log(event.target)
 if(this.start===null){
  this.start=[event.clientX, event.clientY]

    }
  else if(this.start!==null){
  this.finish=[event.clientX, event.clientY]
    }

  // console.log(`start= ${start}`)
  // console.log(`finish= ${finish}`)
  
  if(this.start!==null && this.finish !== null){
    let ctx2 = this.getSecond.current.getContext('2d')
    ctx2.beginPath()
    ctx2.clearRect(0,0,800,400)
    this.drawLine()
    this.start = null
    this.finish = null
    }
  }
  clear = () => {
    let ctx = this.main.current.getContext('2d')
    ctx.beginPath()
    ctx.clearRect(0,0,800,400)
    this.start = null
    this.finish = null
    this.ctxAll = [] 
    this.dotsIntersection = []
  }
 colapsLines = () =>{

    for (let i = 0; i<90; i++){
      setTimeout(this.drawAnimation,i*33)
      }
      setTimeout(this.clear,3000)
    
  }
    

  render() {
    return (
      <>
    <div className='container' onClick={this.canvasLine} >
      <canvas id='main'  width='800px' height='400px' ref={this.main}></canvas>
      <canvas id='second'  onMouseMove={this.visibleLine} width='800px' height='400px' ref={this.getSecond}></canvas>
    </div>
    <button onClick={this.colapsLines}>Colaps lines</button>
      </>
    )
  }

}

export default App;