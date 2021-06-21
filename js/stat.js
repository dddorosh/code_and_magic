/* eslint-disable no-var */
window.renderStatistics = function(ctx, names, times) {
  var CLOUD_COLOR = 'white';
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var SHADOW_X = CLOUD_X + 10;
  var SHADOW_Y = CLOUD_Y + 10;
  var TEXT_X = CLOUD_X + 60;
  var TEXT_Y = CLOUD_Y + 30;
  var TEXT_LINEHEIGHT = 24;
  var TEXT_COLOR = 'black';
  var TEXT_FONT = '16px "PT Mono"';
  var HISTOGRAM_COLOR_MAIN = 'rgba(255, 0, 0, 1)';
  var HISTOGRAM_COLOR = 'rgba(0, 0, 255, ';
  var HISTOGRAM_X = CLOUD_X + 70;
  var HISTOGRAM_Y = CLOUD_Y + 80;
  var HISTOGRAM_WIDTH = 40;
  var HISTOGRAM_MAX_HEIGHT = 150;
  var HISTOGRAM_NAME_X = HISTOGRAM_X;
  var HISTOGRAM_NAME_Y = HISTOGRAM_Y + HISTOGRAM_MAX_HEIGHT + 16;
  var HISTOGRAM_SCORE_X = HISTOGRAM_X;
  var HISTOGRAM_GAP = 40;
  var gap = 0;
  var randomOpacity;

  var findMaxScore = function(arr) {
    var max = 0;

    for(var i = 0; i < arr.length; i++) {
      if (Math.round(arr[i]) > max) {
        max = Math.round(arr[i]);
      }
    }

    return max;
  };

  var findHistogramHeight = function(column) {
    var  columnHeight = HISTOGRAM_MAX_HEIGHT * Math.round(column) / findMaxScore(times);

    return Math.round(columnHeight);
  };

  ctx.fillStyle = SHADOW_COLOR;
  ctx.fillRect(SHADOW_X, SHADOW_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = CLOUD_COLOR;
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.fillText('Ура, вы победили!', TEXT_X, TEXT_Y);
  ctx.fillText('Список рузультатов:', TEXT_X, TEXT_Y + TEXT_LINEHEIGHT);

  for(var j = 0; j < names.length; j++) {
    var histogramHeight = findHistogramHeight(times[j]);
    var histogramY = HISTOGRAM_Y + (HISTOGRAM_MAX_HEIGHT - histogramHeight);
    var histogramScoreY = histogramY - 6;

    if(names[j] === 'Вы') {
      ctx.fillStyle = HISTOGRAM_COLOR_MAIN;
    } else {
      randomOpacity = (Math.round(Math.random() * 100)) / 100;

      ctx.fillStyle = HISTOGRAM_COLOR + randomOpacity;
    }

    ctx.fillRect(HISTOGRAM_X + gap, histogramY, HISTOGRAM_WIDTH, histogramHeight);
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[j], HISTOGRAM_NAME_X + gap, HISTOGRAM_NAME_Y);
    ctx.fillText(Math.round(times[j]), HISTOGRAM_SCORE_X + gap, histogramScoreY);

    gap += HISTOGRAM_WIDTH + HISTOGRAM_GAP;
  }
};
