const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Promise pending
const dataPromise = d3.json(url);
// Fetch the JSON and consol log it
dataPromise.then((data) => console.log(data))