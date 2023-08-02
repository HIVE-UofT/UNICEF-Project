export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	PYTHON: [
		{
			line: '<p><span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Implementation in Python—</span>After importing the data and completing the necessary data cleaning and filtering steps:</br></br><ul style="list-style:disc inside none;"><li>We use the <code>transform_pivot()</code> method to pivot the table on the column "REF_DATE", with the values in the <code>VALUE</code> column, grouped by the <code>GEO</code> and <code>age_group</code> columns. <strong>Pivoting in a dataframe is the process of reshaping the data by transforming rows into columns and columns into rows to make analysis and visualization easier.</strong></li><li>Next, a fold operation is performed using the <code>transform_fold()</code> function to transform the columns "2015" and "2019" into two new columns "REF_DATE" and "VALUE".</li><li>Then, a calculation is performed to calculate the difference between the "2019" and "2015" values for each row. The result of this calculation is stored in a new column called "delta".</li><li>The chart is then created using mark_trail() to create a trail chart, which is a type of line plot consisting of individual marks, like circles or squares, connected in the order of the data. The <code>x-axis</code> is labeled with the "REF_DATE" column values, the <code>y-axis</code> is labeled with the "GEO" column values, and the size of the marks is proportional to the "VALUE" column values. <strong>The mark_trail() method takes no arguments.</strong></li><li>The color of the marks is determined by the "delta" column values, with a red to blue color scheme indicating the direction and magnitude of the difference. The tooltip displays the "REF_DATE" and "VALUE" column values.</li><li>Finally, the view and legend configurations are set using <code>configure_view()</code> and <code>configure_legend()</code>, and the chart is given a title and dimensions using <code>properties()</code>.</li></ul></p>',
			code: `import pandas as pd
import requests #to read the URLs
import numpy as np
import altair as alt #visualziation package


df = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture07/13100098.csv")
geo_exclude = ['Canada (excluding territories)', 'Quebec']
df = df.rename(columns={'Age group': 'age_group'})
df['age_group'] = df['age_group'].replace({'18 to 34 years':'18-34 yrs', '35 to 49 years':'35-49 yrs', '50 to 64 years':'50-64 yrs', 'Total, 12 years and over': 'Total', '65 years and over':'>=65 yrs'})
df = df.query(' GEO not in @geo_exclude and Characteristics=="Percent" and Sex=="Both sexes" and Indicators == "Suicidal thoughts (15 years and over)" and age_group!="12 to 17 years" and VALUE>0')
df = df[['REF_DATE', 'GEO', 'Indicators', 'VALUE', 'Sex','age_group']]
df = df[df['VALUE'].notna()]

#plot
fig = (
    alt.Chart(df)
    .transform_pivot("REF_DATE", value="VALUE", groupby=["GEO", "age_group"])
    .transform_fold(["2015", "2019"], as_=["REF_DATE", "VALUE"])
    .transform_calculate(calculate="datum['2019'] - datum['2015']", as_="delta")
    .mark_trail()
    .encode(
        x=alt.X('REF_DATE:O', title=None),
        y=alt.Y('GEO:N', title=''),
        size=alt.Size('VALUE:Q', scale=alt.Scale(range=[0, 12]), legend=alt.Legend( title='% of People')),
        color=alt.Color('delta:Q', scale=alt.Scale(domainMid=0, scheme='redblue', reverse=True), legend=alt.Legend(title='Delta')),
        tooltip=alt.Tooltip(['REF_DATE:O', 'VALUE:Q']),
        column=alt.Column('age_group:N', title='')

    )
    .configure_view(stroke=None)
    .configure_legend(orient='top', direction='horizontal')
    .properties(title='', width=70, height=150)
)
fig

#to export the figure
# print(fig.to_html())`,
		},
		{
			line: 'The conversion of full province names to abbreviations can be achieved through the use of the `replace()` function in Python, wherein a dictionary containing the names and corresponding abbreviations of provinces is passed as an argument to the function.',
		},
	],
};

export const expandable_code = {
	code: `#convert the full names to their abbreviation
replacement = {
"Newfoundland and Labrador": "NL",
"Prince Edward Island": "PE",
"Alberta": "AB",
"Ontario": "ON",
"Nova Scotia": "NS",
"New Brunswick": "NB",
"Manitoba": "MB",
"Saskatchewan": "SK",
"British Columbia": "BC"
}

#replace the names in the GEO column
df['GEO'].replace(replacement, regex=True, inplace=True)`,
};
