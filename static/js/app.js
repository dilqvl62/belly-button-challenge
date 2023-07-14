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

//-----------------------------------------------------------//

// Function to display each key-value pair from the metadata 
let metadataPanel = (metadatasample) =>{

      let Panel = d3.select("#sample-metadata");
      // Remove existing content
      Panel.html(""); 
      Panel.selectAll("div")
            .data([metadatasample])
            .enter()
            .append("div")
            .html(d => {
              return Object.entries(d).forEach(([key, value]) => {
                      Panel.append("h6").text(`${key}: ${value}`)
              });
        });

}

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
  // Select the first sample
  metadataPanel(sharedData.metadata[0])
}

// Function to restyle the plots 
let restyle = (plot, prop, values ) => {
  prop.forEach((prop, index) => {
    Plotly.restyle(plot, prop, [values[index]]);
  
  });
} 

//-----------------------------------------------------------//

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

          // assigning the data to x and y
          x = sharedData.samples[i].sample_values.slice(0, 10).reverse() ;
          y = sharedData.samples[i].otu_ids.map((otuId) =>  `OTU ${otuId}`).slice(0, 10).reverse();
          labels = sharedData.samples[i].otu_labels.slice(0, 10).reverse();
           //restyle the bar plot
           const properties = ["x", "y", "text"];
           const values = [x, y, labels];
           restyle("bar", properties, values);
                
          //assigning the data to x_bubble and y_bubble
          x_bubble = sharedData.samples[i].otu_ids;
          y_bubble = sharedData.samples[i].sample_values;
          text = sharedData.samples[i].otu_labels;
          size = sharedData.samples[i].sample_values;
          color = sharedData.samples[i].otu_ids;
         //restyle the bubble chart 
         const props = ["x", "y", "text", "size", "color"];
         const valueProps = [x_bubble, y_bubble, text, size, color];
         restyle("bubble", props, valueProps);
         //displaying the metadata as the option changes
         console.log(sharedData.metadata[i]);
         metadataPanel(sharedData.metadata[i]);
         
         }
         
    }
 } else {
  // Handle the case when data is not yet available
  console.log("Data is not yet available");
  }
  

}





  