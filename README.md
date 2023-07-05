# tcsketch frontend

### Dependencies:
1. Leaflet.js
2. d3.js
3. [d3-cloud](https://github.com/jasondavies/d3-cloud)
4. [NodeJS and npm](https://nodejs.org/en/download/)

### Setup:
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to update server whenever changes are made

### Running
open public/index.html file (double click it in the local file) or drag the file to the working browser

### Working Features
#### query selection
1. time range (slide on time bar - the y axis indicate the number of tweets per day)
2. geography selection
   2.1 zoom in/out for an area of interest for heat map
   2.2 draw a rectangle on the map (mouse over the book selection on the top right of the map, click "selection")
3. keyword selection: type in a word in the keyword box
4. time resolution for the time series plot accompanying the hot spot map
   
#### tag cloud
supports 1.time range, 2.2 drawing rectangle geography selection 

1. Show a tag cloud within the user drawn rectangle.
2. Only one rectangle can be drawn at one time.
3. Move the tag cloud _after_ user is done editing the rectangle.

#### hot spot map
supports 1.time range, 2.1 zoom in/out geography selection, 3.keyword selection (only supports one keyword) 4.time resolution

once the query is updated, the progress bar on the bottom left of the map will say "100%". If it sits at 0% it means the query is still in progress.

### References:
1. https://gist.github.com/azza-bazoo/9381206
2. http://bl.ocks.org/joews/9697914
3. https://medium.com/front-end-weekly/websocket-and-data-visualization-be3613c880db

