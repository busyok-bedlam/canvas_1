const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
//border
const w = window.innerWidth;
const h = window.innerHeight;
canvas.width = w;
canvas.height = h;
let mouse = {
	x:undefined,
	y:undefined
}
let colours = [
	"#FC6262","#57CC70","#F22A8B","#2A4EF2","#8E2AF2",
	"#2AF2F0","#2AF232","#F2372A","#F2DF2A","#F27D2A"
]
window.addEventListener('mousemove',(event)=>{
	mouse.x = event.x;
	mouse.y = event.y;
	
},false);
window.addEventListener('resize',(event)=>{
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

},false);

class Circle{
	constructor(r){
		this.x = Math.random()*(w-2*r)+r;
		this.y = Math.random()*(h-2*r)+r;
		this.r = Math.random()*3+1;
		this.dx = Math.random()+0.5;
		this.dy = Math.random()+0.5;
		this.colour = colours[Math.floor(Math.random()*colours.length)];
	}
	draw(){
		
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
		ctx.fillStyle =  this.colour;
		ctx.fill();


	}
	update(){
		if(mouse.x - this.x <60 && mouse.x-this.x>-60 
			&& mouse.y-this.y <60&& mouse.y-this.y>-60){
			if(this.r<60){
				this.r += 1;	
			//	this.color = "#ccc";
			}
			
	
		}else if (this.r>5) {
			this.r-=1;
			// this.color = "#000";
		}



		if(this.x+this.r>w || this.x-this.r<0){
			this.dx = -this.dx
		}
		if(this.y+this.r>h || this.y-this.r<0){
			this.dy = -this.dy;
		}
		this.x+=this.dx;
		this.y+=this.dy;
	}
	move(){
		this.update();
		this.draw();	
	}
}




let circleArray = [];
for(let i=0;i<4000;i++){
	circleArray.push(new Circle(5));	
}

function animate(){
	ctx.beginPath();
	ctx.fillStyle = "#9CAD9E";
	ctx.fillRect(0,0,w,h);
	for(let i=0;i<4000;i++){
		circleArray[i].move();	
	}
requestAnimationFrame(animate);
}
animate();