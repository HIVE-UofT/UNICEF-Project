export const instruction =
	'<span style="font-size: 15px;font-family: Arial;text-align: left;font-weight: 100;color: #255905;">In this treemap, you can navigate the levels of hierarchy by clicking on the inner rectangles. To return to a higher level, simply click on the parent name located at the top</span></p>';

export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	PYTHON: [
		{
			line: '<p><span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Implementation in Python— </span>In this example, we are incorporating three layers of hierarchy into our visualization to display data on Deaths, Age, and Health Conditions. However, to enhance the visual clarity of the treemap, we can simplify it by reducing the number of levels to two. As the number of hierarchy levels increases, some sections of the visualization can become more difficult to interpret and lose their legibility. To improve the readability of the treemap, it is recommended to keep the number of hierarchy levels to a minimum while still effectively communicating the necessary information.</br></br>To generate the visualization, we use the <code>px.treemap()</code> function from <code>Plotly Express</code>, a high-level data visualization library in Python. This function offers a convenient and straightforward approach to generating treemap visualizations, making it well-suited for presenting hierarchical data structures in a clear and comprehensible way. By employing <code>px.treemap()</code>, we are able to effectively communicate the intricate relationships between various health conditions and age groups in our data, leading to deeper understanding and improved decision making.<p>',
			code: `import plotly.express as px
import pandas as pd
import numpy as np

# read the data
data = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture02/US-COVID-Death/Death_causes_USA_COVID.csv")
data.rename(columns={'Condition Group': 'group', 'Age Group': 'age_group', 'COVID-19 Deaths': 'death_number', 'Start Date': 'start', 'End Date': 'end'}, inplace=True)
df = data.query('age_group not in ["Not stated", "All Ages"] and death_number>0 ')

fig = px.treemap(df, path=[px.Constant("Causes of Death"), 'group', 'Condition', 'age_group'], values='death_number',
                    color='age_group', hover_data=['death_number'],
                    color_discrete_sequence=['#d7263d', '#f46036', '#2e294e', '#1b998b', '#c5d86d', '#eec170', '#585123', '#8d99ae', '#81b29a', '#c19875'],
                    color_continuous_midpoint=np.average(df['death_number']))
fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))

fig.show()`,
		},
	],
	R: [
		{
			line: '<p><span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Implementation in R—</span>To generate the following Treemap in R, we first import the necessary libraries, set the current directory as the working directory, and import the data for analysis.<p>',
			code: `library(dplyr)
    library(plotly)
    library(treemap)
    #devtools::install_github("timelyportfolio/d3treeR")
    library(d3treeR)
    
    # set the working directory
    setwd(dirname(rstudioapi::getActiveDocumentContext()$path))
    df = read.csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture02/US-COVID-Death/Death_causes_USA_COVID.csv")
    
    # filter the data
    df<-df %>% filter(Group=='By Total' & State=='United States' & Age.Group != c("Not stated", "All Ages"))`,
		},
		{
			line: 'To preserve a static version of the chart that could be required for publication purposes, we utilize the `png()` function. After generating the chart, we then call the `dev.off()` function. This will effectively save the chart as a PNG file, allowing it to be easily shared and incorporated into various documents and presentations. By using this approach, we can ensure that the visualization is available in a static format that can be used for future reference and analysis. In R, the `dev.off()` function is used to close the current graphics device and save the graphics as a file. By calling dev.off() after generating a plot or chart, the current graphics device is closed and the plot is saved to a file in the specified format.',
			code: `#open the device here
png(filename="static_treemap.png",width=700, height=700)
p<- treemap(
    df,
    index = c("Condition", "Age.Group"),
    type = "index",
    vSize = "COVID.19.Deaths",
    palette = "RdPu",
    vColor = "Paired",
    fontsize.labels = 12,
    # customize the title
    title="Conditions Contributing to COVID-19 Deaths in the US by Age (2020-2022)",
    fontsize.title = 15,
    align.labels=list(
        c("center", "center"),
        c("left", "top")
    )
    )
#close the device here
dev.off()

#converting the visualization to an interactive chart
intereractive <- d3tree2(p, rootname = "Conditions")

# save the html format of the visualization
saveWidget(intereractive, file="interactive_treemap.html")`,
		},
	],
};

export const source_codes = {
	PYTHON: `library(ggplot2)
library(dplyr)
# devtools::install_github(1"jeromefroe/circlepackeR")
library(circlepackeR)
library(data.tree)
library(ggiraph)
library(htmlwidgets)

df = read.csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture02/US-COVID-Death/Death_causes_USA_COVID.csv")

# filter the data
df<-df %>% filter(Group=='By Total' & State=='United States' &
    Age.Group != c("Not stated", "All Ages"))

# subset of data
data = df[c("Condition.Group","Condition", "Age.Group","COVID.19.Deaths")]
# Reducing the length of long labels
data <- data %>% mutate(Condition = gsub("Intentional and unintentional injury, poisoning, and other adverse events",
    "Adverse Events", Condition))

# Creating the hierarchy path
data$pathString <- paste("Deaths", data$Condition.Group, data$Condition, data$Age.Group, sep = "/")
deaths <- as.Node(data)

#plot
p <- circlepackeR(deaths,
                    size = "COVID.19.Deaths",
                    color_min = "hsl(355, 92%, 91%)",
                    color_max = "hsl(315, 23%, 27%)")


# save the widget as an html file
saveWidget(p, file = "circlepacked.html")`,

	R: `library(dplyr)
library(plotly)
library(treemap)
#devtools::install_github("timelyportfolio/d3treeR")
library(d3treeR)

# set the working directory
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))
df = read.csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture02/US-COVID-Death/Death_causes_USA_COVID.csv")

# filter the data
df<-df %>% filter(Group=='By Total' & State=='United States' & Age.Group != c("Not stated", "All Ages"))

#open the device here
png(filename="static_treemap.png",width=700, height=700)
p<- treemap(
    df,
    index = c("Condition", "Age.Group"),
    type = "index",
    vSize = "COVID.19.Deaths",
    palette = "RdPu",
    vColor = "Paired",
    fontsize.labels = 12,
    # customize the title
    title="Conditions Contributing to COVID-19 Deaths in the US by Age (2020-2022)",
    fontsize.title = 15,
    align.labels=list(
        c("center", "center"),
        c("left", "top")
    )
    )
#close the device here
dev.off()

#converting the visualization to an interactive chart
intereractive <- d3tree2(p, rootname = "Conditions")

# save the html format of the visualization
saveWidget(intereractive, file="interactive_treemap.html")`,
};
