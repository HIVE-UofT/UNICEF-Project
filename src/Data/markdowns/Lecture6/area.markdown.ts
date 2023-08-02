export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	PYTHON: [
		{
			line: "<p><span style=\"font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;\">Implementation in Python—</span>After importing the data and completing the necessary data cleaning and filtering steps, we utilize the <code>mark_area()</code> function, which is a feature available in the Altair library, to create a Stacked Area chart that shows the distribution of COVID-19 deaths over time for a list of states in the US. The x-axis represents dates, the y-axis represents the number of deaths, and each state is represented by a different color. The chart is stacked to show the cumulative total of deaths over time, and the opacity parameter is used to make the chart semi-transparent.</br></br><ul style=\"list-style:disc inside none;\"><li>The <code>alt.Chart()</code> function is called with the data argument, which is a variable containing the dataset to be used for the chart.</li><li>The mark_area() function is called to specify that the chart should be a stacked area chart. The opacity parameter is set to .7, which controls the transparency of the chart.</li><li>The <code>encode()</code> function is called to specify how the data should be mapped to visual properties of the chart. The <code>x</code> parameter is set to <code>Date:T</code>, which specifies that the <code>Date</code> field in the dataset should be used as the <code>x-axis</code>. The <code>y</code> parameter is set to <code>alt.Y(\"Deaths:Q\", stack=True)</code>, which specifies that the <code>Deaths</code> field in the dataset should be used as the <code>y-axis</code>, and that the chart should be stacked. If you change the value of <code>stack</code> to <code>False</code> the categories will overlap.</li><li>The <code>color</code> parameter is set to <code>alt.Color('State:N', scale=alt.Scale(scheme='magma'))</code>, which specifies that the <code>State</code> field in the dataset should be used to determine the color of each area in the chart, with the magma color scheme used to map values to colors.</li><li>The <code>color</code> parameter is set to <code>alt.Color('State:N', scale=alt.Scale(scheme='magma'))</code>, which specifies that the <code>State</code> field in the dataset should be used to determine the color of each area in the chart, with the magma color scheme used to map values to colors.</li><li>The <code>properties()</code> function is called to set the height and width of the chart.</li><li>The <code>configure_view()</code> function is called to customize the appearance of the chart. The <code>stroke</code> parameter is set to <code>white</code>, which sets the color of the chart border to white.</li></ul></p>",
			code: `import pandas as pd
import altair as alt

data = pd.read_csv("https://data.cdc.gov/api/views/r8kw-7aab/rows.csv?accessType=DOWNLOAD")

# states of interest [change the list to your list of interest]
states = ['Alabama','Arizona','California','Texas', 'Florida', 'Massachusetts', 'New York']

data = data.query('Group=="By Month" and State in @states and \`COVID-19 Deaths\`>=0')

# only include the columns of interest
data = data[['End Date','Group','Year','Month','State','COVID-19 Deaths','Total Deaths']]

# rename the columns with space
data.rename(columns={'End Date': 'Date', 'COVID-19 Deaths': 'Deaths', 'Total Deaths': 'Total_Deaths'}, inplace=True)
fig.show()`,
		},
	],
	NORMALIZED: [
		{
			line: '<span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Normalized Area Chart—</span> A normalized area chart is often utilized to exhibit the distribution of different categories over time or to compare the relative contribution of various factors to a whole. For example, it can be used to visualize the relative proportions of deaths over time, highlighting changes in the proportions of each state while comparing the overall trend. Another application is to display the percentage contribution of each state to the total number of deaths for a selected list of states, enabling the identification of states with higher COVID-19 death rates and comparison of their relative contributions. To convert a normal **Stacked Area Chart** to a **Normalized Area Chart**, you will only need to replace `stack=True` with `stack="normalize"`.',
		},
	],
	PRESENTATION: [
		{
			line: '<span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Row Presentation—</span> In data visualization, it is often necessary to compare different categories to each other. Stacked area charts are a common way to visualize this type of data. However, sometimes it can be difficult to compare categories when they are presented together in a single chart. In such scenarios where we need to have a clear comparison of each category, we can present the categories individually on the stacked area chart. This can be achieved by using the row parameter in the <code>alt.Chart()</code> function. To do this, we need to first define the identifier for each row. This can be done by adding the variable to the <code>alt.Row()</code> function. Once we have defined the identifier, we can use it as the row parameter in the <code>alt.Chart()</code> function.',
		},
	],
};

export const source_codes = {
	PYTHON: `
import pandas as pd
import altair as alt

data = pd.read_csv("https://data.cdc.gov/api/views/r8kw-7aab/rows.csv?accessType=DOWNLOAD")

# states of interest [change the list to your list of interest]
states = ['Alabama','Arizona','California','Texas', 'Florida', 'Massachusetts', 'New York']

data = data.query('Group=="By Month" and State in @states and \`COVID-19 Deaths\`>=0')

# only include the columns of interest
data = data[['End Date','Group','Year','Month','State','COVID-19 Deaths','Total Deaths']]

# rename the columns with space
data.rename(columns={'End Date': 'Date', 'COVID-19 Deaths': 'Deaths', 'Total Deaths': 'Total_Deaths'}, inplace=True)
fig.show()

# plot
alt.Chart(data).mark_area(opacity=.7).encode(
x="Date:T",
y=alt.Y("Deaths:Q", stack=True),
color=alt.Color('State:N', scale=alt.Scale(scheme='magma')),
).properties(
height=350,
width = 700
).configure_view(stroke='white')

    `,
	PRESENTATION: `
#plot
alt.Chart(data).mark_area(opacity=1).encode(
x=alt.X("Date:T",axis=alt.Axis(format='%Y-%m', domain=False, tickSize=0, title=None)),
y=alt.Y("Deaths:Q", stack=None),
color=alt.Color('State:N', scale=alt.Scale(scheme='magma')),
row=alt.Row("State:N")
).properties(
height=100
).configure_view(stroke='white')

    `,
};
