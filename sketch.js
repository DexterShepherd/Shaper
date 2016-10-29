
var shape;
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  shape = new Shape(90, 300, 90, 40);
}

function draw() {
  background(230);
  rotateY(frameCount * 0.01)
  shape.display();
}

var Shape = function(w, h, d, num_points){
  this.width = w;
  this.height = h;
  this.num_points = num_points;
  this.center = createVector(this.width/2, this.height/2, this.depth/2);
  this.depth = d;
  this.points = [];

  for(var i = 0; i < this.num_points; i++){
    this.points[i] = createVector(random(-1, 1) * this.width,
                                  random(-1, 1) * this.height,
                                  random(-1, 1) * this.depth);
  }

  this.vertices = this.points.map( (point, i, arr) => { 
    this.sorted = arr.filter( j => point.y > j.y ).sort( (a, b) => {
      return point.dist(a)  - point.dist(b);
    });

    return [point, this.sorted[0], this.sorted[1]];
  });

  this.display = function(){
    this.vertices.forEach( vert => {
      beginShape();
      vert.forEach( v => {
        if(v != null){
          vertex(v.x, v.y, v.z)
        }
      });
      endShape();
    });
  }
}

function mouseClicked(){
  setup();
}
