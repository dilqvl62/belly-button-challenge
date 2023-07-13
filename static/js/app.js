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
    
    // Trace for the first individual
    // Bar chart
    let trace1 = {
        x : sharedData.samples[0].sample_values.slice(0, 10).reverse(),
        y : sharedData.samples[0].otu_ids.slice(0, 10).map((otuId) => `OTU ${otuId}`).reverse(),
        text: sharedData.samples[0].otu_labels.slice(0, 10).reverse(), 
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
  // Select the panel div
  let metadataPanel = d3.select("#sample-metadata")
  //Bind the data to the panel div
   metadataPanel.selectAll("div")
  .data([sharedData.metadata[0]])
  .enter()
  .append("div")
  .html(d => {
    return Object.entries(d).forEach(([key, value]) => {
      metadataPanel.append("h6").text(`${key}: ${value}`);
    });
      
  })
  
}

//This function is called when a dropdown menu is selected
const optionChanged = (value) => {
  if(sharedData){
    // Initialize x and y arrays 
    let x = [];
    let y = [];
    let x_bubble = [];
    let y_bubble = [];
    let Panel = d3.select("#sample-metadata");
    //loop through the data 
    for (let i =0; i < sharedData.samples.length; i ++){
      if(value === sharedData.samples[i].id ){
          //console log the value and the id
          console.log(value);
          console.log(sharedData.samples[i].id );

          // assigning the data to x and y
          x = sharedData.samples[i].sample_values.slice(0, 10); ;
          y = sharedData.samples[i].otu_ids.slice(0, 10).map((otuId) => `OTU ${otuId}`);
          lables = sharedData.samples[i].otu_labels.slice(0, 10);
           //restyle the bar plot
          Plotly.restyle("bar", "x", [x]);
          Plotly.restyle("bar", "y", [y]);
          Plotly.restyle("bar", "text", [lables]);
         
          //assigning the data to x_bubble and y_bubble
          x_bubble = sharedData.samples[i].otu_ids;
          y_bubble = sharedData.samples[i].sample_values;
          text = sharedData.samples[i].otu_labels;
          size = sharedData.samples[i].sample_values;
          color = sharedData.samples[i].otu_ids;
         //restyle the bubble chart 
         Plotly.restyle("bubble", "x", [x_bubble]);
         Plotly.restyle("bubble", "y", [y_bubble]);
         Plotly.restyle("bubble", "text", [text]);
         Plotly.restyle("bubble", "size", [size]);
         Plotly.restyle("bubble", "color", [color]);

         Panel.selectAll("div")
        .data(sharedData.metadata[i])
        .enter()
        .append("div")
        .html(d => {
          return d.forEach(([key, value]) => {
                   Panel.append("h6").text(`${key}: ${value}`)
          });
    });
         }
    }
     
 } else {
  // Handle the case when data is not yet available
  console.log("Data is not yet available");
  }
  

}





  