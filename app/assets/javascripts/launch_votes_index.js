$(function () {
  $.ajax({
    method: "GET",
    url: "/launch_votes",
    dataType: "json"
  })

  .done(function(launchVotes) {
    var talliedVotes = votesPerPerson(launchVotes);
    var people = uniquePeople(talliedVotes);
    var votes = votesFor(talliedVotes);
    var graph =
      {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'LaunchVotes breakdown'
      },
      xAxis: {
        categories: people
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      series: [{
        name: 'Votes',
        data: votes
      }]
    };
    // $('#container').highcharts(graph);
  });
});

$(function () {
  $.ajax({
    method: "GET",
    url: "/launch_votes",
    dataType: "json"
  })

  .done(function(launchVotes) {
    var talliedVotes = votesPerPerson(launchVotes);
    var reformattedVotes = votesPerPersonReformatted(talliedVotes, launchVotes.length);
    var graph = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Launch Votes Breakdown'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: "People",
        colorByPoint: true,
        data: reformattedVotes
      }]
    }


    $('#container').highcharts(graph);
  });
});

function votesPerPersonReformatted(votesObject, totalVotes) {
  var reformattedVotes = [];
  for(person in votesObject) {
    var vote = {
      name: person,
      y: votesObject[person] / totalVotes * 100
    }
    reformattedVotes.push(vote);
  }
  return reformattedVotes;
}

function votesFor(votesObject) {
  var votes = [];
  for(person in votesObject) {
    votes.push(votesObject[person]);
  }
  return votes;
}

function uniquePeople(votesObject) {
  var people = [];
  for(person in votesObject) {
    people.push(person);
  }
  return people;
}

function votesPerPerson(launchVoteObjects) {
  var votesFor = {};
  for(var i = 0; i < launchVoteObjects.length; i++) {
    var launch_vote = launchVoteObjects[i];
    votesFor[launch_vote.name] = votesFor[launch_vote.name] || 0;
    votesFor[launch_vote.name]++;
  }
  return votesFor;
}
