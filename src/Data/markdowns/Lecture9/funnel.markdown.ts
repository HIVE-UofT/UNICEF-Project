export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	PART1: [
		{
			line: "To generate the Funnel chart for our dataset, we first import the necessary modules and libraries, such as <code>Funnel</code> from <code>pyecharts.charts</code> and <code>ThemeType</code> from <code>pyecharts.globals</code>. Next, we reads the CSV file from a URL into a pandas DataFrame called df. The CSV file contains data from the CDC regarding various health conditions and COVID-19 deaths. Then, we rename the columns in the DataFrame to have more concise names, such as 'group', 'age_group', 'death_number', 'start', and 'end'. After that, we exclude specific age groups (<b>All Ages</b> and <b>Not stated</b>) and filter the data by setting several conditions.",

			code: `from pyecharts.charts import Funnel
from pyecharts.globals import ThemeType

df = pd.read_csv('https://data.cdc.gov/api/views/hk9y-quqm/rows.csv?accessType=DOWNLOAD')
#renaming column names
df.rename(columns={'Condition Group': 'group', 'Age Group': 'age_group', 'COVID-19 Deaths': 'death_number',
    'Start Date': 'start', 'End Date': 'end'}, inplace=True)
    
age_exclude = ["All Ages","Not stated"]
df = df.query('State == "United States" and age_group not in @age_exclude and Group== "By Total" and
    age_group== "25-34" and death_number>=0 and group!="COVID-19"')

# shorten and rename category labels for better readability
df = df.replace({'group' : { 'Respiratory diseases' : 'Respiratory', 'Circulatory diseases': 'Circulatory',
    'Alzheimer disease':'Alzheimer', 'Vascular and unspecified dementia': 'Vascular/dementia', 'Renal failure':'Renal',
    'Intentional and unintentional injury, poisoning, and other adverse events':'Adverse events',
    'All other conditions and causes (residual)':'Other'}})`,
		},
		{
			line: "As the next step, the following code creates a funnel chart using the Pyecharts library. The chart is initialized with the <code>ROMA</code> theme and specified dimensions. The chart is then populated with the data from the <code>cause_freq</code> DataFrame, which contains the number of deaths and their respective causes. The data is sorted in descending order, and the labels are positioned outside the chart with specific formatting options. Here is how <code>[list(z) for z in zip(cause_freq['group'].values, cause_freq['death_number'])]</code> works:</br></br><ul style=\"list-style:disc inside none;\"><li>The <code>zip()</code> function is used to create an iterator that aggregates the values of two lists: cause_freq['group'].values and cause_freq['death_number'].</li><li>The <code>cause_freq['group'].values</code> list contains strings that represent different groups of causes of death.</li><li>The <code>cause_freq['death_number']</code> list contains integers that represent the number of deaths for each cause of death group.</li><li>For each pair of values from the two lists, the <code>list()</code> function creates a new list containing the pair of values as a tuple.</li><li>The resulting list contains one tuple for each pair of values from the two original lists.</li></ul>",
			code: `# 1. Groups the data by the 'age_group' and 'group' columns.
# 2. Aggregates the 'death_number' column by calculating the sum for each group.
# 3. Converts the aggregated data into a new DataFrame.
# 4. Resets the index of the new DataFrame.
cause_freq = df.groupby(['age_group', 'group'])['death_number'].agg('sum').to_frame().reset_index()

# plot
c = (
    Funnel(init_opts=opts.InitOpts(theme=ThemeType.ROMA, width="390px", height="550px"))
    .add(
        "Death Cause",
        [list(z) for z in zip(cause_freq['group'].values, cause_freq['death_number'])],
        sort_="descending",
        label_opts=opts.LabelOpts(position="outside", formatter="{b}", font_size=11, color="black"),
    )
    .set_global_opts(title_opts=opts.TitleOpts(subtitle="Conditions Contributing to COVID-19 Deaths",
    title=f"25-34 Years", pos_right="center"),
    legend_opts=opts.LegendOpts(is_show=False))
    .render("funnel_interactive.html")
)`,
		},
	],
};
