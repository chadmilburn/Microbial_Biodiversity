// view data
function buildPlot(selection) {

  d3.json('samples.json').then(function (data) {
    // console.log(data);
    // get to samples to get needed data-to line 10 gets dict to get indivdaul points
    var filteredData = data.samples;
    // console.log(filteredData)
    // create dict for sample data
    var sampleDict = filteredData.filter(item => item.id == selection)[0];
    // console.log("Sample Dict")
    // console.log(sampleDict)

    // creating plt points
    // * Use `sample_values` as the values for the bar chart.
    var sampleValues = sampleDict.sample_values;
    // console.log("sampleValues")
    // console.log(sampleValues)
    // otu values x axis bar/ y axis bubble
    var otuValues = sampleDict.sample_values.slice(0, 10).reverse();
    // console.log("outValues")
    // console.log(otuValues)
    // otu names y axis bar/ x axis bubble
    var idValues = sampleDict.otu_ids;
    // console.log("idValues")
    // console.log(idValues)
    var otuIDS = idValues.slice(0, 10).reverse();
    // console.log("otuIDS")
    // console.log(otuIDS)
    var chartreadyIDS = [];
    otuIDS.forEach((id) => {
      chartreadyIDS.push("OTU " + id);
    })
    // console.log("chartreadyIDS")
    // console.log(chartreadyIDS)
    var hoverText = sampleDict.otu_labels
    // console.log("hoverText")
    // console.log(hoverText)
    var barHoverText = hoverText.slice(0, 10).reverse();
    // console.log("barHoverText")
    // console.log(barHoverText)




    // create bar chart
    var barTrace = {
      type: 'bar',
      x: otuValues,
      y: chartreadyIDS,
      orientation: 'h',
      text: barHoverText
    };
    var barData = [barTrace];
    Plotly.newPlot('bar', barData);
    // create bubble chart
    var bubbleTrace = {
      x: idValues,
      y: sampleValues,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: idValues
      }
    }
    var bubbleData = [bubbleTrace]

    var bubbleLayout = {
      xaxis: {
        title: "OTU ID"
      }
    }

    Plotly.newPlot('bubble', bubbleData, bubbleLayout)

  });

}
// buildPlot("953")


//  function for demographic info
function demographicData(selection) {
  // view data again
  d3.json('samples.json').then((data) => {
    // console.log(data)
    // all metadata
    var metaData = data.metadata
    // console.log(metaData);
    // selection metadata
    var selectionMD = metaData.filter(meta => meta.id.toString() === selection)[0];
    // console.log(selectionMD)
    // select demographic info from HTML-line31
    var demographicInfo = d3.select("#sample-metadata")
    // add to html
    Object.entries(selectionMD).forEach((key)=> {
      demographicInfo.append("h6").text(key[0].toUpperCase() + ": " +key[1]+ "\n");
    });
  });

};
// demographicData("953")

function init(){
  // html line 25 drop down 
  var dropdown = d3.select("#selDataset");
  // view json again
  d3.json('samples.json').then((data)=>{
    // console.log(data)
    // add names to drop down 
    data.names.forEach(function(name){
      dropdown.append("option").text(name).property("value");
    });
    buildPlot(data.names[0]);
    demographicData(data.names[0]);
  });
};

init();