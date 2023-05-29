---
layout: post
title: Very Basic Example Of Apex Charts And Covid19 API
---
# COVID-19 Data Retrieval and Visualization Tutorial

In this tutorial, we will learn how to retrieve data about COVID-19 deaths and infections in Brazil since the beginning of the pandemic using the Coronavirus COVID19 API. We will then visualize the data by plotting a curve graph using the ApexCharts library.

## Prerequisites
- Basic knowledge of HTML, CSS, and JavaScript.
- Access to the internet to make API requests.
- A text editor to write the code.
- Basic understanding of the Markdown syntax.

## Step 1: Set up the HTML file
1. Create a new HTML file and name it `index.html`.
2. Open the file in your preferred text editor.
3. Add the following code to set up the basic structure of the HTML file:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>COVID-19 Data Visualization</title>

  <!-- Add ApexCharts CSS and JavaScript files -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/apexcharts@latest/dist/apexcharts.min.css">
  <script src="https://cdn.jsdelivr.net/npm/apexcharts@latest/dist/apexcharts.min.js"></script>
</head>

<body>
  <div id="chart"></div>

  <!-- Add your JavaScript code here -->
  <script src="script.js"></script>
</body>

</html>
