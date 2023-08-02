export const markdowns = [
	{
		line: `
To create the following Pie (Donut) charts in Python, we use the **Altair** library. [Altair](https://altair-viz.github.io/) is a Python library for creating declarative statistical visualizations. Altair allows users to create interactive visualizations using a simple and readable syntax, making it a popular choice for data exploration and analysis. The library also provides a wide range of options for customizing and fine-tuning the visualizations and the ability to export visualizations in various formats such as HTML, JSON, and PNG.
</br>
</br>
<ul style="list-style:disc inside none;">
<li>We first need to upload the data and prepare the dataframe for analysis. Feel free to change the filters to explore the data for different categories/cohorts.</li>
<li>In pandas, the <code>query()</code> function is used to filter rows of a DataFrame based on a query or condition. The query is passed as a string and is evaluated using the DataFrame's columns. The function returns a new DataFrame containing only the rows that satisfy the query.</li>
<li>In pandas, the <code>groupby()</code> function is used to group rows of a DataFrame or a Series based on the values in one or more columns. The function returns an object, which is a special type of DataFrame that has been grouped by one or more columns.</li>
<li><code>alt.Chart()</code> is a function from the Altair library, a Python library for creating declarative statistical visualizations. It is typically the first step in creating visualization with Altair. The chart object can be modified and customized using various methods and properties, such as <code>mark_point()</code>, <code>encode()</code>, and <code>transform_filter()</code>. </li>
</ul>
            `,
		code: `
import pandas as pd
import altair as alt

data = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture02/US-COVID-Death/Death_causes_USA_COVID.csv")
data.rename(columns={'Condition Group': 'group', 'Age Group': 'age_group', 'COVID-19 Deaths': 'death_number', 'Start Date': 'start', 'End Date': 'end'}, inplace=True)

data.query('group not in ["All other conditions and causes (residual)", "COVID-19"] and age_group not in ["All Ages", "Not stated"]', inplace=True)

# To cacluate the death number for different age groups
data = data.groupby(['group', 'age_group'], as_index=False)['death_number'].sum()


# #Plot
base = alt.Chart(data).mark_arc(innerRadius=75).encode(
    theta=alt.Theta(field="death_number", type="quantitative"),
    color=alt.Color(field="group", type="nominal", scale=alt.Scale(scheme='magma'))
)`,
	},
	{
		line: `<div class="warning" style='background-color:#f0ebf5; color: #69337A; border-left: solid #805AD5 4px; border-radius: 4px; padding:0.7em;'>
            <span>
            <p style='margin-top:1em; text-align:center'>
            <h5>What does the encode() function do in Altair?</b></p>
            <p style='margin-left:1em;'>
            In Altair, <code>encode()</code> is a method of the <code>alt.Chart</code> class that is used to specify the encoding of a chart. Encoding maps data fields to the visual properties of the chart, such as position, color, size, and shape.
            The <code>encode()</code> method takes one or more key-value pairs as arguments, where the key is the name of the encoding channel (e.g. "x", "y", "color", "size") and the value is an encoding definition.
            <br>
            </p>
            </div>`,
	},
];

export const plots_markdown_code = [
	{
		line: 'To show the distribution of **Death numbers** across different consition groups, we `gtoupby()` the data by the `group` variable.',
		code: `
pie_data = data.groupby(['group'], as_index=False)['death_number'].sum()

#Selecting the top five conditions
pie_data = pie_data.sort_values(['death_number'], ascending=False).head(5)

#Plot
p = alt.Chart(pie_data).mark_arc(innerRadius=75).encode(
    theta=alt.Theta(field="death_number", type="quantitative"),
    color=alt.Color(field="group", type="nominal", scale=alt.Scale(scheme='magma'))
)`,
	},

	{
		line: 'We can make the chart interactive by adding a **tooltip** to each piece of the chart. ',
		code: `
#Plot
p = alt.Chart(pie_data).mark_arc(innerRadius=75).encode(
    theta=alt.Theta(field="death_number", type="quantitative"),
    color=alt.Color(field="group", type="nominal", scale=alt.Scale(scheme='purples')),
    # Add the tooltip
    tooltip = ['group', 'death_number']
)`,
	},
	{
		line: `We may want to add more filters or controls to the chart. We may want to add more filters to our visualization. One way is using the \`alt.binding_select()\` function. This function from the Altair library creates a selection, which is a way to interact with the data in a chart, such as by highlighting or filtering certain data points.

\`alt.binding_select()\` creates a selection for a chart. The selection can be used later to specify a selection rule, which will be used to determine which data points are selected.

To make a single selection menu for our chart, we use the \`alt.selection_single()\` function from the Altair library that creates a selection of a single data point. This selection is typically used to allow users to select one data point at a time and interact with it in some way, such as by showing more information about the point or highlighting it.

this function is used in combination with \`alt.Chart.add_selection()\` method to add the created selection to the chart. **in the following code snippet, we use 'base' instead of 'Chart', as we have already created the 'Chart' in the previous section and named it as 'base'**.
        `,
		code: `
Age = list(data['age_group'].unique())
#Running the above code will return: ['0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+']

#Adding the dropdown list
age_dropdown = alt.binding_select(options=Age)
age_select = alt.selection_single(fields=['age_group'], bind=age_dropdown, name="Age Group", init={'age_group':'25-34'})

filter_age = base.add_selection(
    age_select
).transform_filter(
    age_select
).properties(title="Conditions Contributing to COVID-19 Deaths in the US (2020-2023)",
width=450
).configure_view(strokeWidth=0)

# We will use this to import the chart into a website.
# print(filter_age.to_html())`,
	},
];
