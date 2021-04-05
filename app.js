// view data
// d3.json('samples.json').then(function(data) {
//     console.log(data);
//   });


function buildPlot(id) {
  d3.json('samples.json').then(function (data) {
    console.log(data);
    //  var for plotting
    // filter sample values by id 
    var samples = data.samples.filter(s => s.id.toString() === id)[0];
    // top 10 data
    // var sampleValues = samples.sample_values.slice(0,10).reverse()
    var otuTop = (samples.otu_ids.slice(0,10)).reverse()
    var otuID = otuTop.map( d=> "OTU " + d)
    console.log(otuID)

  });









}
buildPlot();