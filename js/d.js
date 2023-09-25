// Sample data for the chart
const data = [10, 25, 15, 30, 20];

// SVG container element
const svg = document.getElementById('chart');

// Define chart dimensions and margins
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = svg.clientWidth - margin.left - margin.right;
const height = svg.clientHeight - margin.top - margin.bottom;

// Create an SVG group (g) for the chart
const chart = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Create scales for x and y axes
const x = d3.scaleBand()
    .domain(data.map((d, i) => i))
    .range([0, width])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .nice()
    .range([height, 0]);

// Create bars
chart.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => x(i))
    .attr('y', d => y(d))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d));

// Create x-axis
chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x));

// Create y-axis
chart.append('g')
    .call(d3.axisLeft(y));
