/*****************************************************************
File: app.js
Author: Michel Toutain
Description: Canvas Charts Assignment
Here is the sequence of logic for the app
    - Loading JSON through a dynamically created Script Tag.
    - Both Canvas 400px by 400px. 
    - The first Canvas element displays the data as a Pie Chart
    - Segments have the same radius, except largest(120% of the standard) and smallest (80% of the standard). 
    - The second Canvas elements displays the data as a BAR Chart 
   
Version: 1.0.0
Updated: March 16 2017
*****************************************************************/

document.addEventListener("DOMContentLoaded",function(){
var s = document.createElement("script")
s.addEventListener("load",getData);
s.src="./js/browsers.js";
document.body.appendChild(s);
   }); 
function getData(){
    makePie();
    makeBars();   
}
function makePie(){
    console.log(data);
  
    
    var chart = document.getElementById("chart");
    var context = chart.getContext("2d");
    var cx = chart.width/2;
    var cy = chart.height/2;
    var currentAngle =0;
    var radius = 100;
    var total = 0;
    //info
    var segments = data.segments;
    
    var min = 10000000000;
    var max = -1;
    for(var i = 0; i < segments.length; i++){
        if(segments[i].value < min){
            min = segments[i].value;
        }
        if(segments[i].value > max){
            max = segments[i].value;
        }
        total += segments[i].value;
    }
    
//set title for chart
    var title = data.label;
    //console.log(title);
    var topLabelx = chart.width/2;
    var topLabely = 15;
    context.textAlign = "center";
    context.beginPath()
    context.fillText(title, topLabelx, topLabely);
    
    for(var i = 0; i < segments.length; i++){
        
        var pct = segments[i].value/total;
        var value = segments[i].value;
        var label = segments[i].label;
        var color = segments[i].color;
        
         var endAngle = currentAngle + (pct*(Math.PI*2));
        //move to middle of circle
        context.moveTo(cx,cy);
        //start path
        context.beginPath();
        //set colors of pie chart
        context.fillStyle = color;
        //set min radius and max radius
        radius = 100;
        if(value == min){
            radius = 80;
        }
        if(value == max){
            radius = 120;
        }
        
        //draw the pie
        context.arc(cx,cy,radius,currentAngle,endAngle,false);
        //return to middle of circle
        context.lineTo(cx,cy);
        context.fill();
        context.closePath();
        context.save();
        context.translate(cx,cy);
        //context.stroke();
        
        //make lines for text
        context.strokeStyle = "#0CF";
        context.lineWidth = 1;
        context.beginPath();
        //angle for lines
         var midAngle = (currentAngle + endAngle)/2;
        var dx = Math.cos(midAngle) * (0.8 * radius);
        var dy = Math.sin(midAngle) * (0.8 * radius);
        context.moveTo(dx,dy);
        //ending points for the lines
        dx = Math.cos(midAngle) * (radius + 30);
        dy = Math.sin(midAngle) * (radius + 30);
        context.lineTo(dx, dy);
        context.stroke();
        
        //add text
        var Labelx = Math.cos(midAngle) * (radius + 50);
        var Labely = Math.sin(midAngle) * (radius + 50);
        context.textAlign ="center";
        context.fillText(label, Labelx, Labely);
        //put the canvas back to the original position
        context.restore();
        //update the currentAngle
        currentAngle = endAngle;
    }  
}
function makeBars(){
    var segment = data.segments;
    var chart2 = document.getElementById("chart2");
    var context = chart2.getContext("2d");
    var max = -1;
    var total = 0;
    var chartHeight = 400;
    var offSetX = 20;
    var barWidth = 30;
    var spaceBetweenPoints = 20;
    
    var x = offSetX + 20;
    
   for(var i = 0; i< segment.length; i++){
       if (segment[i].value > max){
           max = segment[i].value;
       }
       total += segment[i].value;
   }
    var title = data.label;
    //console.log(title);
    var topLabelx = chart.width/2;
    var topLabely = 15;
    context.textAlign = "center";
    context.beginPath()
    context.fillText(title, topLabelx, topLabely);
    context.textAlign = "start";
    
    for(var i=0; i < segment.length; i++){
        var pct = segment[i].value/ total;
        var barHeight = (chartHeight * pct);
        var label = segment[i].label;
        var color = segment[i].color;
        
        if (segment[i].value >= 50) {
            var barHeight = (segment[i].value * 3);
        }
        else {
            var barHeight = (segment[i].value * 5);
        }
    //(x, y) coordinates for a rectangle are the top, left values unless you do negative values for width, height
    context.fillStyle = color;
    context.beginPath();
    context.rect(x, chartHeight-1, barWidth, -1 * barHeight);
    //for the first point the moveTo and lineTo values are the same
    //All the labels for the bars are going above the bars
    //context.textAlign = "center";
    context.fillText(label, x, chartHeight - barHeight - 30-1);
    //move the x value for the next point
    x = x + barWidth + spaceBetweenPoints;	
    
  
  
  context.stroke();	//draw lines around bars
  context.fill(); 	//fill colours inside the bars
  
  //context.strokeStyle = "#999";
  //context.lineWidth = 1;
//  context.beginPath();
//  context.moveTo(offSetX, chart2.height-chartHeight);
//  context.lineTo(offSetX, chartHeight);
//  context.lineTo(chart2.width-offSetX, chartHeight);
//  context.stroke(); 
    }
    }