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
buildPlot("953")


//  function for demographic info
function demographicData(selection) {
  // view data again
  d3.json('samples.json').then((data)=> {
    console.log(data)
  var metaData= data.metadata
  console.log(metaData)
  })

};
demographicData("953")