$(document).ready(function () {
  $("#submit").click(function (e) {
    var validate = Validate();
    let cityId = $("#citySelect").val(); 
    $("#message").html(validate);
    if (validate.length == 0) {
      $.ajax({
        type: "GET",
        url:
          "http://api.openweathermap.org/data/2.5/weather?id=" +
          $("#citySelect").val() +
          "",
        data: {
          id: cityId,
        },
        dataType: "json",
        success: function (result, status, xhr) {
          console.log(result);
          var table = $("<table><tr><th>Weather Description</th></tr>");

          table.append(
            "<tr><td>City:</td><td>" + result["name"] + "</td></tr>"
          );
          table.append(
            "<tr><td>Country:</td><td>" +
              result["sys"]["country"] +
              "</td></tr>"
          );
          table.append(
            "<tr><td>Current Temperature:</td><td>" +
              result["main"]["temp"] +
              "°C</td></tr>"
          );
          table.append(
            "<tr><td>Humidity:</td><td>" +
              result["main"]["humidity"] +
              "</td></tr>"
          );
          table.append(
            "<tr><td>Weather:</td><td>" +
              result["weather"][0]["description"] +
              "</td></tr>"
          );

          $("#message").html(table);
        },
        error: function (xhr, status, error) {
          alert(
            "Result: " +
              status +
              " " +
              error +
              " " +
              xhr.status +
              " " +
              xhr.statusText
          );
        },
      });
    }
  });

  $(document).ajaxStart(function () {
    $("img").show();
  });

  $(document).ajaxStop(function () {
    $("img").hide();
  });

  function Validate() {
    var errorMessage = "";
    if ($("#citySelect").val() == "Select") {
      errorMessage += "► Select City";
    }
    return errorMessage;
  }
});
