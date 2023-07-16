var degrees = 115, radius = .6;
    var radians = degrees * Math.PI / 180;
    var x = -1 * radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    
    var layout = {
        title: '<b>Belly Button Washing Frequency</b><br>Scrubs per Week',
        xaxis: { visible: false, range: [-1, 1]},
        yaxis: { visible: false, range: [-1, 1]}
    };
    
    var traceA = {
        type: "pie",
        showlegend: false,
        hole: 0.5,
        rotation: 90,
        values: [100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100],
        text: ["0-1", "1-2", "2-3", "3-4", "4-5","5-6", "6-7", "7-8", "8-9", ""],
        direction: "clockwise",
        textinfo: "text",
        textposition: "inside",
        marker: {
            colors: ["#F2FDE4", 
                    "#DEFABB", 
                    "#D7ED8D", 
                    "#CCE580",
                    "#C8E362",  
                    "#C7D691",
                    "#61D800", 
                    "#41C300",
                    "#09AF00",
                    "white"]
        },
        //labels: ["0-10", "10-50", "50-200", "200-500", "500-2000", ""],
        hoverinfo: "label"
    };

    var data = [traceA];
    
    Plotly.plot('gauge', data, layout);
