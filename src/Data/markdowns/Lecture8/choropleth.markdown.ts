export const chart_description =
	'Geospatial visualization is a strong exploratory and explanatory tool in public health, as it helps us comprehend and study the distribution of diseases, health outcomes, and health-related behaviors in various geographical regions. When we visualize this information on maps, we can recognize areas with a high prevalence of diseases, find patterns and trends, and create targeted interventions to improve public health outcomes. In addition, geospatial visualization can aid in identifying disparities in health outcomes between different populations, leading to a more equitable distribution of resources and services. During the COVID-19 pandemic, geospatial visualization has become an indispensable tool that provides critical insights into the spread of the disease, allowing healthcare providers and researchers to understand its impact on communities better. By mapping case counts, resource allocation, vaccine distribution, and other crucial data, geospatial visualization has allowed healthcare providers to make more informed decisions regarding resource allocation and providing care to those who require it the most. In summary, this technique is a crucial tool for public health professionals to observe, analyze, and improve the health of populations.';

export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	PART1: [
		{
			line: 'In the code below, the <code>population_data()</code> function is defined to prepare the population data that will be used to normalize the number of COVID-19 cases and deaths. It retrieves a text file containing state abbreviations from a GitHub repository, converts it to a dictionary using the <code>json.loads()</code> method, and then reads in a CSV file containing population data for each state from a URL. The state abbreviations in the population data are converted to match those in the COVID-19 data using the dictionary of state abbreviations. The function returns the population data as a pandas dataframe.',
			code: `import requests
import json
import pandas as pd
import plotly.express as px

#This function prepares the population data tha will be used to normalize the number of COVID-19 cases and deaths
def population_data():
    response = requests.get('https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture08/US%20Data/US_State_Abv.txt')
    data = response.text
    us_state_abbrev = json.loads(data)

    #Population data downloaded from https://worldpopulationreview.com/states
    us_state_abbrev.items()
    us_state_abbrev = {state: abbrev for state, abbrev in us_state_abbrev.items()}
    us_population = pd.read_csv('https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture08/US%20Data/population.csv')
    us_population['state'] = us_population['state'].map(us_state_abbrev)
    return us_population`,
		},
		{
			line: 'The <code>us_population</code> variable is assigned the result of calling the <code>population_data()</code> function. Next, the COVID-19 data is retrieved from a CDC website as a CSV file using the <code>pd.read_csv()</code> method. Only the columns for <i>submission date</i>, <i>state</i>, <i>new cases</i>, and <i>new deaths</i> are selected using the square bracket notation. The <code>submission_date</code> column is converted to a <i>datetime</i> format using the <code>pd.to_datetime()</code> method. The population and COVID-19 datasets are merged on the state column using the <code>pd.merge()</code> method. As the last step, the <code>death_number</code> and <code>case_number</code> columns are added to the dataframe to <b>normalize</b> the number of deaths and cases per 100,000 people, respectively. The <code>df.query()</code> method is used to filter the data to only include submissions after February 29th, 2020.',
			code: `#Integrating the population data with our dataset
us_population = population_data()
df = pd.read_csv('https://data.cdc.gov/api/views/9mfq-cb36/rows.csv?accessType=DOWNLOAD')
df = df[['submission_date', 'state', 'new_case', 'new_death']] # only select these columns of the dataset
df['submission_date'] = pd.to_datetime(df['submission_date']) #convert the date column to a datetime format
df = pd.merge(df, us_population, on=['state']) #merge the population and covid datasets
df['death_number']=(df['new_death']/df['pop2023'])*100000 #normalize the number of feaths
df['case_number']=(df['new_case']/df['pop2023'])*100000
df = df[['submission_date', 'state', 'case_number', 'death_number', 'new_death']]
df = df.query('submission_date>"2020-02-29"')`,
		},
		{
			line: '<p>To prepare the data for the area map, the data is then grouped by state and submission date using the <code>df.groupby()</code> method. The <code>pd.Grouper()</code> method is used to group the data by month. The <code>df.groupby()</code> method is followed by the <code>[\'case_number\'].sum()</code> method to sum the number of cases per month for each state. The result of the <code>df.groupby()</code> method is converted back to a dataframe using the <code>reset_index()</code> method. The resulting dataframe, df_case, is then used to create a <b>Choropleth (area)</b> map using the <code>px.choropleth()</code> method.</br></br><ul style="list-style:disc inside none;"><li>The <code>locations</code> parameter is set to the <code>state</code> column of the dataframe.</li><li>The <code>color</code> parameter is set to the <code>case_number</code> column.</li><li>The <code>animation_frame</code> parameter is set to the <code>submission date</code> column to create an animation showing the progression of cases over time.</li><li>The <code>color_continuous_scale</code> parameter is set to <b>Magma_r</b> to use a color gradient from purple to yellow.</li><li>The <code>locationmode</code> parameter is set to <code>USA-states</code> to use US state abbreviations as the location.</li><li>The <code>scope</code> parameter is set to <b>usa</b> to show the map of the United States.</li><li>The <code>range_color</code> parameter is set to the minimum and maximum values of the <code>case_number</code> column to ensure the color scale is consistent across all frames.</br>The <code>title</code>, <code>height</code>, and <code>width</code> parameters are set to customize the appearance of the map.</li><li>Finally, the <code>fig.add_scattergeo()</code> method is used to add text labels for each state to the map, and the <code>fig.show()</code> method is used to display the map.</li></ul></p>',
			code: `plot
#reset_index() will transform the result of groupby to a dataframe again
df_case=df.groupby(['state', pd.Grouper(key='submission_date', freq='M')])['case_number'].sum().reset_index()
df_case['submission_date'] = df_case['submission_date'].astype(str)
fig = px.choropleth(df_case,
                locations = 'state',
                color="case_number",
                animation_frame="submission_date",
                color_continuous_scale="Magma_r", #Burgyl
                locationmode='USA-states',
                scope="usa",
                range_color=(min(df_case['case_number']), max(df_case['case_number'])),
                title='United States COVID-19 Cases and Deaths by State over Time',
                height=900,
                width=1000
                )

fig.add_scattergeo(
    locations=df_case['state'],
    locationmode='USA-states',
    text=df_case['state'],
    mode='text')
    
fig.show()`,
		},
	],
	PART2: [
		{
			line: '<span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">A Base Map for Canada—</span> We use the <a href="https://open.canada.ca/data/en/dataset/87a339dd-53d0-40dc-8e18-6d3d12fd1ad5"> Body Mass Index (BMI)</a> dataset, which includes data for the household population aged 18 and over in Canada, stratified by sex, and excludes pregnant females. This publicly available dataset is provided by the Government of Canada and allows us to show the distribution of BMI across the country by integrating and stratifying the data by sex. To generate the base map with Canada, we need to implement some additional steps that are detailed below.</br><p>First, wee import the required libraries:</br></br><ul style="list-style:disc inside none;"><li><code>requests</code> is a library for making HTTP requests in Python (reading the input files using URLs).</li><li><code>json</code> is a built-in Python library for working with JSON data.</li><li><code>urllib.request</code> is a library for opening URLs in Python.</li><li><code>pandas</code> is a library for working with data in Python, particularly for data manipulation and analysis.</li><li><code>plotly.express</code> is a high-level Python library for creating interactive visualizations.</li></ul></p></br>Next, we load a <code>geojson</code> file containing the <b>boundaries of Canadian provinces and territories:',
			code: `import requests
import json, urllib.request
import pandas as pd
import plotly.express as px

# Create the base map for Canada
# https://thomson.carto.com/tables/canada_provinces/public/map
with urllib.request.urlopen("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture08/Canada-Map/canada_provinces.geojson") as url:
    map = json.load(url)`,
		},
		{
			line: 'In this snippet, <code>urllib.request.urlopen</code> opens the URL specified in the argument and <code>json.load</code> loads the JSON data returned by the URL into a Python object. Next, the code reads in a CSV file containing data on BMI (body mass index) for the Canadian population, using <code>pd.read_csv</code>. to simplyfy the columns name, we use <code>data.rename</code> to rename the column specified in the first argument to the name specified in the second argument. <code>axis=1</code> specifies that we are renaming a column (as opposed to a row). We use <code>inplace=True</code> to specify that we want to modify the DataFrame in place (as opposed to creating a new one). To filter the data, we use <code>data.query</code> and use <code>Sex</code> and <code>BMI</code> columns to narrow down the scope of our dataset for more focused analysis and exploration.',
			code: `#read the data
data = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture08/BMI/13100488.csv")
#rename the BMI column
data.rename({'Body mass index (BMI)': 'BMI'}, axis=1, inplace=True)
data = data.query('GEO != "Canada" and Sex != ["Both sexes", "Males"] and Characteristics=="Percent" and BMI=="Overweight, body mass index 25.00 to 29.99"')
data.head()`,
		},
		{
			line: 'Finally, the code creates a choropleth map using <code>Plotly Express</code>:',
			code: `#plot
fig = px.choropleth(data,
                locations = 'GEO',
                geojson=map, #***
                featureidkey="properties.name", #***
                color="VALUE",
                animation_frame="REF_DATE",
                color_continuous_scale="matter", #more colors: https://plotly.com/python/builtin-colorscales/
                range_color=(min(data['VALUE']), max(data['VALUE'])),
                scope='north america',
                locationmode='geojson-id', ##***
                title='BMI data for the household population aged 18 and over in Canada, stratified by sex (1994-2007)',
                height=800,
                width=1000
                )

fig.update_geos(showcountries=False, showcoastlines=False,
                showland=False, fitbounds="locations",
                subunitcolor='white')
fig.show()`,
		},
	],
};

export const source_codes = {
	PART1: `import requests
import json
import pandas as pd
import plotly.express as px

#This function prepares the population data tha will be used to normalize the number of COVID-19 cases and deaths
def population_data():
    response = requests.get('https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture08/US%20Data/US_State_Abv.txt')
    data = response.text
    us_state_abbrev = json.loads(data)

    #Population data downloaded from https://worldpopulationreview.com/states
    us_state_abbrev.items()
    us_state_abbrev = {state: abbrev for state, abbrev in us_state_abbrev.items()}
    us_population = pd.read_csv('https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture08/US%20Data/population.csv')
    us_population['state'] = us_population['state'].map(us_state_abbrev)
    return us_population


#Integrating the population data with our dataset
us_population = population_data()
df = pd.read_csv('https://data.cdc.gov/api/views/9mfq-cb36/rows.csv?accessType=DOWNLOAD')
df = df[['submission_date', 'state', 'new_case', 'new_death']] # only select these columns of the dataset
df['submission_date'] = pd.to_datetime(df['submission_date']) #convert the date column to a datetime format
df = pd.merge(df, us_population, on=['state']) #merge the population and covid datasets
df['death_number']=(df['new_death']/df['pop2023'])*100000 #normalize the number of feaths
df['case_number']=(df['new_case']/df['pop2023'])*100000
df = df[['submission_date', 'state', 'case_number', 'death_number', 'new_death']]
df = df.query('submission_date>"2020-02-29"')

#plot
#reset_index() will transform the result of groupby to a dataframe again
df_case=df.groupby(['state', pd.Grouper(key='submission_date', freq='M')])['case_number'].sum().reset_index()
df_case['submission_date'] = df_case['submission_date'].astype(str)
fig = px.choropleth(df_case,
                locations = 'state',
                color="case_number",
                animation_frame="submission_date",
                color_continuous_scale="Magma_r", #Burgyl
                locationmode='USA-states',
                scope="usa",
                range_color=(min(df_case['case_number']), max(df_case['case_number'])),
                title='United States COVID-19 Cases and Deaths by State over Time',
                height=900,
                width=1000
                )

fig.add_scattergeo(
    locations=df_case['state'],
    locationmode='USA-states',
    text=df_case['state'],
    mode='text')

fig.show()
    `,
	PART2: `
import requests
import json, urllib.request
import pandas as pd
import plotly.express as px


# Create the base map for Canada
# https://thomson.carto.com/tables/canada_provinces/public/map
with urllib.request.urlopen("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture08/Canada-Map/canada_provinces.geojson") as url:
    map = json.load(url)

#read the data
data = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture08/BMI/13100488.csv")
#rename the BMI column
data.rename({'Body mass index (BMI)': 'BMI'}, axis=1, inplace=True)
data = data.query('GEO != "Canada" and Sex != ["Both sexes", "Males"] and Characteristics=="Percent" and BMI=="Overweight, body mass index 25.00 to 29.99"')
data.head()


#plot
fig = px.choropleth(data,
                locations = 'GEO',
                geojson=map, #***
                featureidkey="properties.name", #***
                color="VALUE",
                animation_frame="REF_DATE",
                color_continuous_scale="matter", #more colors: https://plotly.com/python/builtin-colorscales/
                range_color=(min(data['VALUE']), max(data['VALUE'])),
                scope='north america',
                locationmode='geojson-id', ##***
                title='BMI data for the household population aged 18 and over in Canada, stratified by sex (1994-2007)',
                height=800,
                width=1000
                )

fig.update_geos(showcountries=False, showcoastlines=False,
                showland=False, fitbounds="locations",
                subunitcolor='white')
fig.show()`,
};
