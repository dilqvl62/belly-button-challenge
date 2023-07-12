// Reading the data from the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// declare a shared vatiable to store the data 
let sharedData;
//Promise pending
const dataPromise = d3.json(url);
// Fetch the JSON 
dataPromise.then((data) => {
  sharedData = data;
  init();
}).catch((error) => {
  console.log('Error fetching data:', error);
});

//Initialize the div with a default
function init() {
  //checking if the sharedData is avalaible 
  if(sharedData){
    // this is to generate the dropdown Menu
   const select = d3.select("#selDataset");
   select.selectAll("option")
     .data(sharedData.samples)
     .enter()
     .append("option")
     .attr("value", d => d.id)
     .text(d => d.id);
    // Getting the top 10 OTU`s for only first individual with id= 940.  
    let sampleValues = sharedData.samples[0].sample_values.slice(0, 10); 
    let otuIds = sharedData.samples[0].otu_ids.slice(0, 10).map((otuId) => `OTU ${otuId}`);
    let otuLabels = sharedData.samples[0].otu_labels.slice(0, 10);
    // Reverse the data 
    let reverseSampleValues = sampleValues.reverse();
    let reversOtuIds = otuIds.reverse();
    let reverseOtuLabels = otuLabels.reverse();
    //consol log the data 
    console.log(reverseSampleValues);
    console.log(otuIds);
    console.log(reverseOtuLabels);

    // Trace for the first individual
    // Bar chart
    let trace1 = {
        x : reverseSampleValues,
        y : reversOtuIds,
        text: reverseOtuLabels, 
        type: "bar",
        orientation: "h"

    }
    let traceBar_chart = [trace1];
     // Render the plot to the div tag with id "bar"
     Plotly.newPlot("bar", traceBar_chart);
     
     // Create a bubble chart that displays first sample.
     let trace2 = {
      x : sharedData.samples[0].otu_ids,
      y : sharedData.samples[0].sample_values,
      text: sharedData.samples[0].otu_labels , 
      mode: 'markers', 
      marker: {
        size:sharedData.samples[0].sample_values,
        color: sharedData.samples[0].otu_ids,
        colorscale: 'Earth',
        sizemode: 'diameter'
      }
    }
    let traceBubble_chart = [trace2];
    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bubble", traceBubble_chart);
  } else {
    // Handle the case when data is not yet available
    console.log("Data is not yet available");
}
}

//This function is called when a dropdown menu is selected
const optionChanged = (value) => {
  if(sharedData){
    // Initialize x and y arrays 
    let x = [];
    let y = [];
    let x_bubble = [];
    let y_bubble = [];
    //loop through the data 
    for (let i =0; i < sharedData.samples.length; i ++){
      if(value === sharedData.samples[i].id ){
          //console log the value and the id
          console.log(value);
          console.log(sharedData.samples[i].id );
          // getting the top 10 OTU`s for each individual
          let sampleValues = sharedData.samples[i].sample_values.slice(0, 10); 
          let otuIds = sharedData.samples[i].otu_ids.slice(0, 10).map((otuId) => `OTU ${otuId}`);
          let otu_Labels = sharedData.samples[i].otu_labels.slice(0, 10);
          // Reverse the data 
          let reverseSampleValues = sampleValues.reverse();
          let reversOtuOds = otuIds.reverse();
          let reversed_otu_labels = otu_Labels.reverse();
          //consol log the data 
          console.log(reverseSampleValues);
          console.log(otuIds);
          // assigning the data to x and y
          x = reverseSampleValues;
          y = reversOtuOds;
          lables = reversed_otu_labels;
          //assigning the data to x_bubble and y_bubble
          x_bubble = sharedData.samples[i].otu_ids;
          y_bubble = sharedData.samples[i].sample_values;
          text = sharedData.samples[i].otu_labels;
          size = sharedData.samples[i].sample_values;
          color = sharedData.samples[i].otu_ids;
         //restyle the bar plot
         Plotly.restyle("bar", "x", [x]);
         Plotly.restyle("bar", "y", [y]);
         Plotly.restyle("bar", "text", [lables]);
         //restyle the bubble chart 
         Plotly.restyle("bubble", "x", [x_bubble]);
         Plotly.restyle("bubble", "y", [y_bubble]);
         Plotly.restyle("bubble", "text", [text]);
         Plotly.restyle("bubble", "size", [size]);
         Plotly.restyle("bubble", "color", [color]);
 
         }
    }
 } else {
  // Handle the case when data is not yet available
  console.log("Data is not yet available");
}

}





  