// Reading the data from the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Promise pending
const dataPromise = d3.json(url);

// Fetch the JSON 
dataPromise.then((data) => {


// Slice the first 10 object for plotting 
let sampleValues = data.samples[0].sample_values.slice(0, 10); 
let otuIds = data.samples[0].otu_ids.slice(0, 10).map((otuId) => `OTU ${otuId}`);
let otuLabels = data.samples[0].otu_labels.slice(0, 10);
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
// Apply a title to the layout
let layout = {
    title : "sample values for the first individual"
}
// Data array
let traceData = [trace1]
// Render the plot to the div tag with id "bar"
Plotly.newPlot("bar", traceData, layout)
})



  