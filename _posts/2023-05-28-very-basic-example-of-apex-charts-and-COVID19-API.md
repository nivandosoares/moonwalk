---
layout: post
author: Nivando Soares
title: Very basic example of JavaScript HTTP Async functions
---



## Introduction

In this tutorial, we will fetch COVID-19 data on deaths and infections in Brazil from the Coronavirus COVID19 API. We will then use the ApexCharts library to display the data in a graph.

Asynchronous API calls are an essential concept in web development. Instead of waiting for a response before executing the next line of code, asynchronous calls allow the program to continue executing other tasks while waiting for the API response. This approach ensures that the application remains responsive, even when dealing with APIs that may have varying response times or performing computationally intensive tasks. By leveraging asynchronous calls, developers can create efficient and responsive applications that provide a smoother user experience.

Now, let's dive into the tutorial and explore the power of asynchronous programming and data visualization with COVID-19 data in Brazil!

## Prerequisites:

To follow along with this tutorial, you will need the following:

- Basic knowledge of HTML, JSON data and JavaScript
- A code editor
- Internet connection

## Step 1: setting the HTML file:

Create a new HTML file named `index.html` and open it in your code editor. Copy and paste the following code:

```html
<!DOCTYPE html>
<html>
<head>
  <title>COVID-19 Data Visualization</title>
    <!--importing the apex charts css-->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/apexcharts@3.28.0/dist/apexcharts.min.css">
</head>
<body>
    <!-- creating the div where the chart will be rendered -->
    <div id="chart"></div>

    <!-- import the apex charts javascript -->
  <script src="https://cdn.jsdelivr.net/npm/apexcharts@3.28.0/dist/apexcharts.min.js"></script>
    <!-- link to your script, if it exists -->
  <script src="script.js"></script>
</body>
</html>

```

This code sets up the basic structure of our HTML file and includes the necessary CSS and JavaScript files for ApexCharts lib.

## Step 2: Fetching the data

Create a new JavaScript file named `script.js` in the same directory as your HTML file. Copy and paste the following code:

```javascript
// Step 1: Fetching COVID-19 confirmed cases data for Brazil
fetch("https://api.covid19api.com/dayone/country/brazil/status/confirmed")
  .then(response => response.json())
  .then(data => {
    // Step 2: Extracting dates and infections from the data
    const dates = data.map(entry => entry.Date);
    const infections = data.map(entry => entry.Cases);

    // Step 3: Fetching COVID-19 deaths data for Brazil
    fetch("https://api.covid19api.com/dayone/country/brazil/status/deaths")
      .then(response => response.json())
      .then(data => {
        // Step 4: Extracting deaths from the data
        const deaths = data.map(entry => entry.Cases);

        // Step 5: Creating the chart with the extracted data
        createChart(dates, infections, deaths);
      })
    //if the function gets an unexpected behavior or error, this will be on console
      .catch(error => console.log(error));
  })
  .catch(error => console.log(error));

// Step 6: Function to create a chart
function createChart(dates, infections, deaths) {
  const options = {
    chart: {
      type: "line"
    },
    series: [
      {
        name: "Infections",
        data: infections
      },
      {
        name: "Deaths",
        data: deaths
      }
    ],
    xaxis: {
      categories: dates
    }
  };

  // Step 7: Creating and rendering the chart
  const chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}



```

1. Here's a step-by-step explanation of how it works:
   1. The code starts with an event listener for the "DOMContentLoaded" event, which fires when the HTML document has been completely loaded and parsed.
   2. Inside the event listener, the code makes a fetch request to the COVID-19 API's endpoint for retrieving confirmed cases in Brazil. The URL used is "https://api.covid19api.com/dayone/country/brazil/status/confirmed". This fetch request returns a Promise.
   3. The `then` method is chained to the fetch request, which takes a callback function that will be executed when the Promise is resolved. In this callback function, the response from the API is converted to JSON format using the `response.json()` method, which returns another Promise.
   4. Another `then` method is chained to the previous one, which takes a callback function that will be executed when the JSON Promise is resolved. In this callback function, the data received from the API is mapped to extract the dates and infections. The `map` function is used to create two separate arrays: `dates` array and `infections` array.
   5. After extracting the dates and infections, the code makes another fetch request to the COVID-19 API's endpoint for retrieving deaths in Brazil. The URL used is "https://api.covid19api.com/dayone/country/brazil/status/deaths". This fetch request also returns a Promise.
   6. Similar to step 3, the `then` method is chained to the second fetch request, which takes a callback function that will be executed when the Promise is resolved. In this callback function, the response from the API is converted to JSON format using the `response.json()` method, which returns another Promise.
   7. Another `then` method is chained to the previous one, which takes a callback function that will be executed when the JSON Promise is resolved. In this callback function, the data received from the API is mapped to extract the deaths. The `map` function is used to create an array of `deaths`.
   8. Once the deaths data is extracted, the code calls the `createChart` function and passes the `dates`, `infections`, and `deaths` arrays as arguments.
   9. The `createChart` function receives the `dates`, `infections`, and `deaths` arrays as parameters. Inside this function, an `options` object is created. This object defines the configuration for the chart, specifying its type as a line chart and setting the series data for "Infections" and "Deaths" using the corresponding arrays.
   10. The `options` object also sets the x-axis categories to be the `dates` array.
   11. After creating the `options` object, the code uses the ApexCharts library to create a new chart instance. The `ApexCharts` constructor takes two arguments: the DOM element where the chart will be rendered (in this case, it is selected using the CSS selector `document.querySelector("#chart")`), and the `options` object.
   12. Finally, the `render` method is called on the `chart` object to render the chart on the page.



## Step 3: Running the application

Save the HTML and JavaScript files, and open the HTML file in your web browser. You should see a graph displaying the COVID-19 infections and deaths data in Brazil.

Congratulations! You have successfully created a data visualization of COVID-19 infections and deaths in Brazil using the Coronavirus COVID19 API and ApexCharts.

I hope this tutorial helps! Let me know if you have any further questions.



----

