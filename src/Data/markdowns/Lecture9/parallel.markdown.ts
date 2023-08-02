export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	PART1: [
		{
			line: "To generate this parallel coordinate, we use the pandas library to read and process a CSV file containing US mobility data. The code performs the following operations:</br></br><ul style=\"list-style:disc inside none;\"><li>Filter the DataFrame df to keep only the rows where the 'iso_3166_2_code' column has the value <code>US-{state}</code>, where {state} is a variable representing the abbreviation of a US state (e.g., \"CA\" for California</li><li>Remove the <b>_percent_change_from_baseline</b> substring from the column names in the DataFrame to shorten them.</li><li>Keep only the last 7 columns of the DataFrame, as they are the columns of interest.</li><li>Convert the <i>date</i> column to datetime format, then extract the quarter (1-4) for each date. Map the quarter numbers to their respective seasons <b>('Winter', 'Spring', 'Summer', 'Fall')</b> using the seasons dictionary.</li><li>Reorder the columns in the DataFrame.</li><li>Create separate lists for each season (Winter, Spring, Fall, and Summer) by filtering the DataFrame based on the `date` column, which now contains the season names. The resulting lists <b>(data_winter, data_spring, data_fall, and data_summer)</b> contain the mobility data for each season.</li></ul>",

			code: `import pandas as pd
# !pip3 install pyecharts
from pyecharts.charts import Parallel
import pyecharts.options as opts
from pyecharts.globals import ThemeType
import IPython

#--Change this to a function-repeated two times!
seasons = {
    1: 'Winter',
    2: 'Spring',
    3: 'Summer',
    4: 'Fall'
}
state = 'CA'
df = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture09/US%20Mobility/2020_US_Region_Mobility_Report_filtered.csv")
df = df[df['iso_3166_2_code']==f"US-{state}"]

#--To shorten the name of columns!
df.columns=df.columns.str.replace('_percent_change_from_baseline','')
df  = df.iloc[: , -7:] # The last 7 columns are of our interest

#--Converting 'date' column to seasons
df['date'] = pd.to_datetime(df['date']).dt.quarter
df['date'] = df['date'].map(seasons)

df = df[['retail_and_recreation', 'grocery_and_pharmacy',
'parks', 'transit_stations', 'workplaces', 'residential', 'date']]
#--Prepare the data for this specific chart
data_winter = df[df['date']=="Winter"].values.tolist()
data_spring = df[df['date']=="Spring"].values.tolist()
data_fall = df[df['date']=="Fall"].values.tolist()
data_summer = df[df['date']=="Summer"].values.tolist()`,
		},
		{
			line: 'To create the Parallel Coordinates plot, we use the <code>Pyecharts</code> library, a Python wrapper for the Echarts JavaScript library. Here is a step-by-step explanation of the code:</br></br><ul style="list-style:disc inside none;"><li>Create a <code>Parallel</code> chart with a specific theme, width, and height.</li><li>Add the parallel <code>axes schema</code> to the chart, including the <code>min</code> and <code>max</code> values for each axis (columns from the DataFrame) and a <code>categorical axis</code> for the seasons.</li><li>Add the data series for each season <b>("Winter", "Spring", "Summer", and "Fall")</b> using the lists created earlier (data_winter, data_spring, data_summer, data_fall).</li><li>Set <code>global chart options</code>, including the title for the chart.</li><li>Render the chart and save it as an HTML file called <i>parallel.html</i>, which can be opened in a web browser for viewing.</li></ul>',
			code: `c = (
    Parallel(init_opts=opts.InitOpts(theme=ThemeType.ROMA,  width="1000px", height="450px"))
    .add_schema(
        [
            opts.ParallelAxisOpts(dim=0, name="retail/recreation", min_= min(df['retail_and_recreation']), max_=max(df['retail_and_recreation'])),
            opts.ParallelAxisOpts(dim=1, name="grocery/pharmacy", min_= min(df['grocery_and_pharmacy']), max_=max(df['grocery_and_pharmacy'])),
            opts.ParallelAxisOpts(dim=2, name="parks", min_= min(df['parks']), max_=max(df['parks'])),
            opts.ParallelAxisOpts(dim=3, name="transit stations", min_= min(df['transit_stations']), max_=max(df['transit_stations'])),
            opts.ParallelAxisOpts(dim=4, name="workplaces", min_= min(df['workplaces']), max_=max(df['workplaces'])),
            opts.ParallelAxisOpts(dim=5, name="residential", min_= min(df['residential']), max_=max(df['residential'])),
            opts.ParallelAxisOpts(
                dim=6,
                name="Seasons",
                type_="category",
                data=["Winter", "Spring", "Summer", "Fall"],
            ),
        ]
    )
    .add("Winter", data_winter)
    .add("Spring", data_spring)
    .add("Summer", data_summer)
    .add("Fall", data_fall)
    .set_global_opts(title_opts=opts.TitleOpts(title="2020 Mobility Data–USA")
    )
    .render("parallel.html") #to save the file in HTML
)`,
		},
	],
};
