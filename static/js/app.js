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
    // Slice the first 10 object for plotting 
    let sampleValues = sharedData.samples[0].sample_values.slice(0, 10); 
    let otuIds = sharedData.samples[0].otu_ids.slice(0, 10).map((otuId) => `OTU ${otuId}`);
    let otuLabels = sharedData.samples[0].otu_labels.slice(0, 10);
    // Reverse the data 
    let reverseSampleValues = sampleValues.reverse();
    let reversOtuOds = otuIds.reverse();
    let reverseOtuLabels = otuLabels.reverse();
    //consol log the data 
    console.log(reverseSampleValues);
    console.log(otuIds);
    console.log(reverseOtuLabels);

    // Trace for the first individual
    let trace1 = {
        x : reverseSampleValues,
        y : reversOtuOds,
        text: reverseOtuLabels, 
        type: "bar",
        orientation: "h"

    }
    // Data array
    let traceData = [trace1]
    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", traceData)
   // this is to generate the dropdown Menu
   const select = d3.select("#selDataset");
    select.selectAll("option")
      .data(sharedData.samples)
      .enter()
      .append("option")
      .attr("value", d => d.id)
      .text(d => d.id);

  } else {
    // Handle the case when data is not yet available
    console.log("Data is not yet available");
}
}


    
      
  
//This function is called when a dropdown menu is selected
const optionChanged = (value) => {
  if(sharedData){
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset"); 
    // Initialize x and y arrays 
    let x = [];
    let y = [];
    //loop through the data 
    for (let i =0; i < sharedData.samples.length; i ++){
      if(value === sharedData.samples[i].id ){
          console.log(value);
          console.log(sharedData.samples[i].id );
          let sampleValues = sharedData.samples[i].sample_values.slice(0, 10); 
          let otuIds = sharedData.samples[i].otu_ids.slice(0, 10).map((otuId) => `OTU ${otuId}`);
          let otuLabels = sharedData.samples[i].otu_labels.slice(0, 10);
          // Reverse the data 
          let reverseSampleValues = sampleValues.reverse();
          let reversOtuOds = otuIds.reverse();
          let reverseOtuLabels = otuLabels.reverse();
          //consol log the data 
          console.log(reverseSampleValues);
          console.log(otuIds);
          console.log(reverseOtuLabels);

          // Trace for the first individual
          let trace1 = {
              x : reverseSampleValues,
              y : reversOtuOds,
              text: reverseOtuLabels, 
              type: "bar",
              orientation: "h"

          }
          // Data array
          let traceData = [trace1]
          // Render the plot to the div tag with id "bar"
          Plotly.newPlot("bar", traceData)
          
         }
    }
 }

}

 





  