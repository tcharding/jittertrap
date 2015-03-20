var chartData = {};

chartData.txDelta = {
  data:[],  // raw samples
  filteredData:[], // filtered & decimated to chartingPeriod
  histData:[],
  title:"Tx Bytes per sample period",
  ylabel:"Tx Bytes per sample",
  xlabel:"Time",
  minY: {x: 0, y: 0},
  maxY: {x: 0, y: 0},
  basicStats:[]
};

chartData.rxDelta = {
  data:[],
  filteredData:[], // filtered & decimated to chartingPeriod
  histData:[],
  title:"Rx Bytes per sample period",
  ylabel:"Rx Bytes per sample",
  xlabel:"Time",
  minY: {x: 0, y: 0},
  maxY: {x: 0, y: 0},
  basicStats:[]
};

chartData.rxRate = {
  data:[],
  filteredData:[], // filtered & decimated to chartingPeriod
  histData:[],
  title: "Ingress throughput in kbps",
  ylabel:"kbps, mean",
  xlabel:"sample number",
  minY: {x: 0, y: 0},
  maxY: {x: 0, y: 0},
  basicStats:[]
};

chartData.txRate = {
  data:[],
  filteredData:[], // filtered & decimated to chartingPeriod
  histData:[],
  title: "Egress throughput in kbps",
  ylabel:"kbps, mean",
  xlabel:"sample number",
  minY: {x: 0, y: 0},
  maxY: {x: 0, y: 0},
  basicStats:[]
};

chartData.txPacketRate = {
  data:[],
  filteredData:[], // filtered & decimated to chartingPeriod
  histData:[],
  title: "Egress packet rate",
  ylabel:"pkts per sec, mean",
  xlabel:"time",
  minY: {x: 0, y: 0},
  maxY: {x: 0, y: 0},
  basicStats:[]
};

chartData.rxPacketRate = {
  data:[],
  filteredData:[], // filtered & decimated to chartingPeriod
  histData:[],
  title: "Ingress packet rate",
  ylabel:"pkts per sec, mean",
  xlabel:"time",
  minY: {x: 0, y: 0},
  maxY: {x: 0, y: 0},
  basicStats:[]
};

chartData.txPacketDelta = {
  data:[],
  filteredData:[], // filtered & decimated to chartingPeriod
  histData:[],
  title: "Egress packets per sample",
  ylabel:"packets sent",
  xlabel:"sample number",
  minY: {x: 0, y: 0},
  maxY: {x: 0, y: 0},
  basicStats:[]
};

chartData.rxPacketDelta = {
  data:[],
  filteredData:[], // filtered & decimated to chartingPeriod
  histData:[],
  title: "Ingress packets per sample",
  ylabel:"packets received",
  xlabel:"sample number",
  minY: {x: 0, y: 0},
  maxY: {x: 0, y: 0},
  basicStats:[]
};

/* CanvasJS is fussy about how arrays are cleared (?!) and holds on to the
 * objects if you create a new array without removing the old elements. */
var clearArray = function(arr) {
  while (arr.length > 0) {
    arr.shift();
  }
};

var resetChart = function() {
  var s = $("#chopts_series option:selected").val();
  clearArray(chartData[s].filteredData);
  chart = new CanvasJS.Chart("chartContainer", {
    axisY:{
      includeZero: "false",
    },
    zoomEnabled: "true",
    panEnabled: "true",
    title: { text: chartData[s].title },
    axisY: { title: chartData[s].ylabel },
    axisX: { title: chartData[s].xlabel },
    data: [{
      name: s,
      type: "line",
      dataPoints: chartData[s].filteredData
    }]
  });
  chart.render();

  histogram = new CanvasJS.Chart("histogramContainer", {
    title: {text: "Distribution" },
    axisY: {
      title: "Count",
      includeZero: "false",
    },
    axisX: {
      title: "Bin",
      includeZero: "false",
    },
    data: [{
      name: s + "_hist",
      type: "column",
      dataPoints: chartData[s].histData
    }]
  });
  histogram.render();

  basicStatsGraph = new CanvasJS.Chart("basicStatsContainer", {
    title: { text: "Basic Stats" },
    axisY: {
      includeZero: "false",
      title: chartData[s].ylabel
    },
    data: [{
      name: s + "_stats",
      type: "column",
      dataPoints: chartData[s].basicStats
    }]
  });
  basicStatsGraph.render();

};


var clearChart = function() {
  chartData.txDelta.data = [];
  chartData.txDelta.filteredData = [];
  chartData.txDelta.histData = [];

  chartData.rxDelta.data = [];
  chartData.rxDelta.filteredData = [];
  chartData.rxDelta.histData = [];

  chartData.rxRate.data = [];
  chartData.rxRate.filteredData = [];
  chartData.rxRate.histData = [];

  chartData.txRate.data = [];
  chartData.txRate.filteredData = [];
  chartData.txRate.histData = [];

  chartData.txPacketRate.data = [];
  chartData.txPacketRate.filteredData = [];
  chartData.txPacketRate.histData = [];

  chartData.rxPacketRate.data = [];
  chartData.rxPacketRate.filteredData = [];
  chartData.rxPacketRate.histData = [];

  chartData.rxPacketDelta.data = [];
  chartData.rxPacketDelta.filteredData = [];
  chartData.rxPacketDelta.histData = [];

  chartData.txPacketDelta.data = [];
  chartData.txPacketDelta.filteredData = [];
  chartData.txPacketDelta.histData = [];
  resetChart();
  xVal = 0;
};


var renderGraphs = function() {
  histogram.render();
  basicStatsGraph.render();
  chart.render();
};

var toggleStopStartGraph = function() {
  var maxUpdatePeriod = 9999999999;
  if (updatePeriod != maxUpdatePeriod) {
    old_updatePeriod = updatePeriod;
    updatePeriod = maxUpdatePeriod;
  } else {
    updatePeriod = old_updatePeriod;
  }
  setUpdatePeriod();
  return false;
};        

var drawIntervalID = setInterval(renderGraphs, updatePeriod);

var setUpdatePeriod = function() {
  var updateRate = 1000.0 / updatePeriod; /* Hz */
  clearInterval(drawIntervalID);
  drawIntervalID = setInterval(renderGraphs, updatePeriod);
  console.log("chart updateRate: " + updateRate + "Hz. period: "+ updatePeriod + "ms");
};
