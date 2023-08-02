export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	MATPLOTLIB: [
		{
			line: 'We first need to upload the data and prepare the dataframe for analysis. Feel free to change the filters to explore the data for different ctaegories/cohorts. To generate Lollipop chart in `Python`, we use the `matplotlib.pyplot` library and import it the first thing in our code.',
			code: `import pandas as pd
import matplotlib.pyplot as plt

# Read the data using pd.read_csv()
data = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture01/Canadian-Community-Health-Survey/cchs.csv")
indicators_of_interest=['Perceived health (fair/poor)', 'Perceived mental health (fair/poor)', 'Perceived life stress (quite a bit/extremely stressful)', 'Overweight (>=18 years)', 'Obese (>=18 years)', 'Arthritis (>=15)', 'Diabetes', 'Asthma', 'Chronic obstructive pulmonary disease (>=35 years)', 'High blood pressure', 'Mood disorder', 'Smoker (daily/occasional)', 'Smoker (daily)', 'Heavy drinking', 'Has a regular healthcare provider', 'Cannabis use–(almost) daily']
data = data.query('Geo=="Canada (excluding territories)" and Characteristics=="Percent" and Indicators in @indicators_of_interest and Age_group != "12-17 years" and Sex=="Both" and Age_group=="Total (>=12 years)" and Indicators=="Diabetes"')
maximum = max(data.VALUE, default=0) # this value will be used for the position of labels`,
		},
		{
			line: 'Now our dataframe is ready to be used for the visualization. In the next step, we define the theme of the chart, including the borders (`ax.spines`), figure size(`figsize`), and background color of plot (`set_facecolor()`). ',
			code: `fig, ax = plt.subplots(figsize=(5,5), dpi= 300)
plt.tick_params(left = False, bottom = False)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

# Setting the background color of the plot
ax.set_facecolor("#fff9f0")`,
		},
		{
			line: `To make the Lollipop chart using matplotlib, we need to plot lines (or bar) and circles separately and connect them. In this example, we create vertical lines starting from **y=0** and ending at the percentage value for each year.`,
			code: `# Plot
ax.vlines(x=data.Year, ymin=0, ymax=data.VALUE, color='#de955d', alpha=0.7, linewidth=3)
ax.scatter(x=data.Year, y=data.VALUE, s=75, color='#de955d', alpha=0.9)

# Title, Label, Ticks and Ylim
ax.set_title('Canadian Community Health Survey', fontdict={'size':11, 'weight':"bold", 'fontname':'Arial'})
ax.set_ylabel('Percentage', fontdict={'size':11, 'weight':"bold", 'fontname':'Arial'})

# default=0 in case we pass an empty sequence to the max() function (in our example, no answer to the survey questions)
maximum = max(data.VALUE, default=0)
ax.set_ylim(0, maximum + maximum/3)`,
		},
		{
			line: `As the values might be very close for some indicators, we annotate each lollipop with its exact value.`,
			code: `# Adding annotations (i.e. VALUE) to each Year
for row in data.itertuples():
	ax.text(row.Year, row.VALUE+maximum/30, s=str(round(row.VALUE))+'%', horizontalalignment= 'center', verticalalignment='bottom', fontsize=9, color="black")`,
		},
		{
			line: 'To see the chart, use `plt.show()` and run you code.',
			code: `import pandas as pd
import matplotlib.pyplot as plt

# Read the data using pd.read_csv()
data = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture01/Canadian-Community-Health-Survey/cchs.csv")
indicators_of_interest=['Perceived health (fair/poor)', 'Perceived mental health (fair/poor)', 'Perceived life stress (quite a bit/extremely stressful)', 'Overweight (>=18 years)', 'Obese (>=18 years)', 'Arthritis (>=15)', 'Diabetes', 'Asthma', 'Chronic obstructive pulmonary disease (>=35 years)', 'High blood pressure', 'Mood disorder', 'Smoker (daily/occasional)', 'Smoker (daily)', 'Heavy drinking', 'Has a regular healthcare provider', 'Cannabis use–(almost) daily']
data = data.query('Geo=="Canada (excluding territories)" and Characteristics=="Percent" and Indicators in @indicators_of_interest and Age_group != "12-17 years" and Sex=="Both" and Age_group=="Total (>=12 years)" and Indicators=="Diabetes"')
maximum = max(data.VALUE, default=0) # this value will be used for the position of labels


# Theme
fig, ax = plt.subplots(figsize=(5,5), dpi= 300)
plt.tick_params(left = False, bottom = False)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

# Setting the background color of the plot
ax.set_facecolor("#fff9f0")


# Plot
ax.vlines(x=data.Year, ymin=0, ymax=data.VALUE, color='#de955d', alpha=0.7, linewidth=3)
ax.scatter(x=data.Year, y=data.VALUE, s=75, color='#de955d', alpha=0.9)

# Title, Label, Ticks and Ylim
ax.set_title('Canadian Community Health Survey', fontdict={'size':11, 'weight':"bold", 'fontname':'Arial'})
ax.set_ylabel('Percentage', fontdict={'size':11, 'weight':"bold", 'fontname':'Arial'})

# default=0 in case we pass an empty sequence to the max() function (in our example, no answer to the survey questions)
maximum = max(data.VALUE, default=0)
ax.set_ylim(0, maximum + maximum/3)

# Adding annotations (i.e. VALUE) to each Year
for row in data.itertuples():
	ax.text(row.Year, row.VALUE+maximum/30, s=str(round(row.VALUE))+'%', horizontalalignment= 'center', verticalalignment='bottom', fontsize=9, color="black")

plt.show()`,
		},
	],

	PLOTLY: [
		{
			line: 'To create a lollipop plot in Plotly, you can use the `Scatter` trace type and set the mode parameter to `markers` to display the data points as circles, and use the line shape to draw the stems of the lollipops.',
		},
		{
			line: '[Plotly](https://plotly.com/) is a data visualization and exploration platform that provides tools for creating a wide range of static, animated, and interactive visualizations in various formats, such as graphs, charts, maps, and 3D scenes. It is available in several programming languages, including Python, R, and JavaScript, and can be used to create visualizations for the web and standalone applications. Unlike `matplotlib`, which produces static plots, Plotly creates interactive plots that can be easily embedded in websites and dashboards. Matplotlib and Plotly are useful tools for data visualization in Python, and your choice will depend on your specific needs. For example, if you need to create static plots and do not need interactive capabilities, Matplotlib might be the better choice. On the other hand, if you want to create interactive plots or need to create complex, multi-layered visualizations, Plotly might be the better choice.As Plotly generates plots in the browser using JavaScript, which can be slower than generating plots on the server using Python, it can be slower than Matplotlib, especially for very large datasets or plots with multiple layers. Moreover, Plotly is not as customizable as Matplotlib. While Matplotlib allows users to customize every aspect of their plots, Plotly has a more opinionated design and does not provide as much control over the appearance of the plots. Overall, the main trade-off between Plotly and Matplotlib is between simplicity and interactivity. Matplotlib is easier to use and customize but lacks the interactive capabilities of Plotly. On the other hand, plotly is more powerful and flexible but requires more code and can be slower.',
		},
		{
			line: 'The following example creates a Lollipop chart for the CCHS dataset using Ployly. The first step is installing librarie, if they are not already installed. After importing the required librarries, we read the dataset from its source and filter it to a specific scope using `query()` function.',
		},
		{
			code: `#Lollipop chart using Ployly
import pandas as pd
#!pip3 install plotly
import plotly.offline as pyo
import plotly.graph_objs as go

#import data
data = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture01/Canadian-Community-Health-Survey/cchs.csv")

#Data preparation
indicators_of_interest=['Perceived health (fair/poor)', 'Perceived mental health (fair/poor)', 'Perceived life stress (quite a bit/extremely stressful)', 'Overweight (>=18 years)', 'Obese (>=18 years)', 'Arthritis (>=15)', 'Diabetes', 'Asthma', 'Chronic obstructive pulmonary disease (>=35 years)', 'High blood pressure', 'Mood disorder', 'Smoker (daily/occasional)', 'Smoker (daily)', 'Heavy drinking', 'Has a regular healthcare provider', 'Cannabis use–(almost) daily']

#Filter the data to a specific category
data = data.query('Geo=="Canada (excluding territories)" and Characteristics=="Percent" and Indicators in @indicators_of_interest and Age_group != "12-17 years" and Sex=="Both" and Age_group=="Total (>=12 years)" and Indicators=="Diabetes"')
maximum = max(data.VALUE, default=0) # this value will be used for the position of labels`,
		},
		{
			line: 'You can quickly inspect the filtered data using `data.head()`. The `head()` function is a method of the `DataFrame` class in the `pandas` library. It is used to retrieve the first *n* rows of a DataFrame, where *n* is a user-specified number. By default, the `head()` function returns the first `5` rows of the DataFrame. To generate the plot, we start with the `go.scatter()` function. The "go" in "go.Scatter" refers to the **graph objects** namespace in the Plotly library, which contains a set of functions and classes for creating and manipulating visualizations.To define the layout of the plot, we use the `go.Layout` class. A layout specifies the overall visual appearance of a plot, including the plot title, axis labels, and other visual elements.',
		},
		{
			code: `#Plot
config = {'displayModeBar': False} # To remove ployly floating toolbar

#Preparing the input data for the chart
year = list(data['Year'])
perc = list(data['VALUE'])

data = [
	go.Scatter(
		x=year,
		y=perc,
		mode='markers',
		marker=dict(color='#ef233c', size=10)
	)
]

# Use the 'shapes' attribute from the layout to draw the vertical lines
layout = go.Layout(
	shapes=[dict(
		type='line',
		xref='x',
		yref='y',
		x0=year[i],
		y0=0,
		x1=year[i],
		y1=perc[i],
		line=dict(color='#ef233c',width=3)
	) for i in range(len(perc))]
)

# Plot the chart
#tickmode='linear': To avoid dropping some of the labels

fig = go.Figure(data, layout)
fig.update_xaxes(tickangle=0, tickfont=dict(family='Rockwell', color='black', size=11), tickmode='linear', mirror=False, showline=True)
fig.update_yaxes(tickangle=0, tickfont=dict(family='Rockwell', color='black', size=11), mirror=False, showline=True, range=[0,maximum+maximum/3], title="Percentage")
fig.update_layout(
	autosize=True,
	width = 500,
	height = 530,
	plot_bgcolor="#edf2f4",
	margin=dict(l=0, r=0, t=50, b=0))
)`,
		},
	],

	R: [
		{
			line: "R is a popular programming language that is widely used for data visualization. It has a large number of packages and functions specifically designed for creating charts, plots, and other types of visualizations. One of the most widely used packages for data visualization in R is `ggplot2`. It provides a powerful and flexible toolkit for creating a wide variety of plots, including scatter plots, line plots, bar plots, box plots, and many others. It also allows you to easily customize the plots' appearance in great detail and combine multiple plots into a single figure.Other popular packages for data visualization in R include `plotly` and `shiny`, which provide additional capabilities such as interactive plots, 3D plots, and web-based visualizations.",
		},
		{
			line: 'To create a lollipop chart in R, you can use the `ggplot2` package and the `geom_segment()` function. This function It is used to add a line segment between two points of a plot. The points are specified by their `x` and `y` coordinates, which are given as arguments to the function. In our example, `x` presents the *Health Indicators* variable and `y` presents the *Value* variable. You can customize the appearance of the line segment by specifying additional arguments, such as the `color`, line width (`lwd`), and line type. The following code snippet uses the **Canadian Community Health Survey** dataset to create a lollipop chart with a line segment and a circle at the end of each segment, representing the percentage value mapped to each indicator.To generate the circles, we use `geom_point()`. You can customize the appearance of the circles by specifying additional arguments, such as the color, size, and shape of the points. Moreover, to add text labels to our plot, we use the `geom_text()` function. The text in this function is specified by the `label` argument, and the position of the text is defined by the `x` and `y` coordinates, which are given as arguments to the function or can be inheritted from the main `ggplot()` function.',
		},
		{
			line: 'Before implementing the chart, we first need to import the required libraries and modify the overall appearance of our plots using the `theme_update()` function. This function allows you to customize various aspects of the appearance of a plot, such as background color, fonts, axes titles, and gridlines.',
		},
		{
			code: `library(ggpubr)
library(ggplot2)
library(ggthemes)
library(svglite)
library(dplyr)

#set the theme
theme_update(
	plot.background = element_rect(fill = "#FFFFFF", color = "#FFFFFF"),
	panel.background = element_rect(fill = "#FFFFFF", color = NA),
	axis.text.x = element_text(face = "plain", color = "black", size = 10, margin = margin(t = 3)),
	axis.text.y = element_text(face = "plain", color = "black", size = 10, hjust = 1, margin = margin(r = 5)),
	axis.line.x = element_line(color="black", size = .5),
	axis.line.y = element_line(color="black", size = .5),
	axis.ticks = element_blank(),
	axis.title.x = element_blank(),
	axis.title.y = element_blank(),
	plot.title = element_text(face = "plain", color = "black", size = 12),
	strip.text.x = element_text(face = "bold", color = "black", size = 10, margin = margin(b = 5, t=5)),
	strip.text.y = element_text(face = "plain", color = "black", size = 12),
	strip.background = element_rect(fill = "#eee2df", color = "#FFF9FF"),
	panel.spacing.x=unit(1.5, "lines"),
	panel.spacing.y=unit(1.5, "lines"),
	legend.text=element_text(face = "plain", color = "black", size = 12),
	legend.title = element_text(face = "bold", color = "black", size = 12),
	plot.caption = element_text(
	family = "Arial",
	size = 12,
	color = "grey70",
	face = "bold",
	hjust = .5,
	margin = margin(5, 0, 20, 0)),
	plot.margin = margin(rep(15, 4))
)`,
		},
		{
			line: 'In the next step, we need to set the working directory using the `setwd` function, read the data, prepare/filter the data, and create the plot. To add sub-plots that show a different subset of the data but share the same `x` and `y` axes, we use the `facet_wrap` function. You can customize the appearance of the sub-plots by using additional arguments to facet_wrap, such as the number of rows and columns to use in the grid, the scales to use for each plot, and the strip labels. Check the `theme` section for our input to the `strip.text` and `strip.background` parameters.',
		},
		{
			code: `#set the working directiry to the directory that includes the dataset and the source code
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))


indicators_of_interest = indicators_of_interest=c('Perceived health (fair/poor)', 'Perceived mental health (fair/poor)', 'Perceived life stress (quite a bit/extremely stressful)',
													'Overweight (>=18 years)', 'Obese (>=18 years)', 'Arthritis (>=15)', 'Diabetes', 'Asthma', 'Chronic obstructive pulmonary disease (>=35 years)',
													'High blood pressure', 'Mood disorder', 'Smoker (daily/occasional)', 'Smoker (daily)', 'Heavy drinking', 'Has a regular healthcare provider',
													'Cannabis use–(almost) daily')



df = read.csv("cchs.csv") %>% filter(Year == 2015 & Indicators %in% indicators_of_interest &
										Characteristics=="Percent" & Sex == "Both" & Geo == "Ontario")





p<- ggplot(df, aes(x = Indicators, y = VALUE), color=Age_grou) +
	facet_wrap(~Age_group, ncol = 3)+
	
	# To keep the axis line for each facet
	geom_hline(aes(yintercept=-Inf)) +
	geom_vline(aes(xintercept=-Inf)) +
	coord_cartesian(clip="off")+
	
	# The plot segments
	geom_segment(aes(x = Indicators, xend = Indicators, y = 0, yend = VALUE),
				color = "gray", lwd = 1) +
	
	# The plot circles
	geom_point(size = 7.5, pch = 21, bg = "#a31a5a", col="#a31a5a") +
	
	# The plot labels
	geom_text(aes(label = round(VALUE)), color = "white", size = 3) +
	
	# Adding % to the axis labels
	scale_y_continuous(labels = function(x) paste0(x, "%")) +
	
	# Flipping the coordinates for better presentation
	coord_flip()`,
		},
		{
			line: 'To save our plot object to a file, we can use the `ggsave()` function in the `ggplot` package. This function allows you to save a plot as an image file and accepts different arguments to define the width, height, and resolution of the image object.',
		},
		{
			code: `#Saving the file in SVG format. You can change this palue to png or jpg or pdf
ggsave(file="lollipop.svg", plot=p, width=12, height=10)`,
		},
	],
};

export const source_codes = {
	MATPLOTLIB: `import pandas as pd
import matplotlib.pyplot as plt

# Read the data using pd.read_csv()
data = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture01/Canadian-Community-Health-Survey/cchs.csv")
indicators_of_interest=['Perceived health (fair/poor)', 'Perceived mental health (fair/poor)', 'Perceived life stress (quite a bit/extremely stressful)', 'Overweight (>=18 years)', 'Obese (>=18 years)', 'Arthritis (>=15)', 'Diabetes', 'Asthma', 'Chronic obstructive pulmonary disease (>=35 years)', 'High blood pressure', 'Mood disorder', 'Smoker (daily/occasional)', 'Smoker (daily)', 'Heavy drinking', 'Has a regular healthcare provider', 'Cannabis use–(almost) daily']
data = data.query('Geo=="Canada (excluding territories)" and Characteristics=="Percent" and Indicators in @indicators_of_interest and Age_group != "12-17 years" and Sex=="Both" and Age_group=="Total (>=12 years)" and Indicators=="Diabetes"')
maximum = max(data.VALUE, default=0) # this value will be used for the position of labels


# Theme
fig, ax = plt.subplots(figsize=(5,5), dpi= 300)
plt.tick_params(left = False, bottom = False)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

# Setting the background color of the plot
ax.set_facecolor("#fff9f0")


# Plot
ax.vlines(x=data.Year, ymin=0, ymax=data.VALUE, color='#de955d', alpha=0.7, linewidth=3)
ax.scatter(x=data.Year, y=data.VALUE, s=75, color='#de955d', alpha=0.9)

# Title, Label, Ticks and Ylim
ax.set_title('Canadian Community Health Survey', fontdict={'size':11, 'weight':"bold", 'fontname':'Arial'})
ax.set_ylabel('Percentage', fontdict={'size':11, 'weight':"bold", 'fontname':'Arial'})

# default=0 in case we pass an empty sequence to the max() function (in our example, no answer to the survey questions)
maximum = max(data.VALUE, default=0)
ax.set_ylim(0, maximum + maximum/3)

# Adding annotations (i.e. VALUE) to each Year
for row in data.itertuples():
	ax.text(row.Year, row.VALUE+maximum/30, s=str(round(row.VALUE))+'%', horizontalalignment= 'center', verticalalignment='bottom', fontsize=9, color="black")

plt.show()`,
	PLOTLY: `#Lollipop chart using Ployly
import pandas as pd
#!pip3 install plotly
import plotly.offline as pyo
import plotly.graph_objs as go

#import data
data = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture01/Canadian-Community-Health-Survey/cchs.csv")

#Data preparation
indicators_of_interest=['Perceived health (fair/poor)', 'Perceived mental health (fair/poor)', 'Perceived life stress (quite a bit/extremely stressful)', 'Overweight (>=18 years)', 'Obese (>=18 years)', 'Arthritis (>=15)', 'Diabetes', 'Asthma', 'Chronic obstructive pulmonary disease (>=35 years)', 'High blood pressure', 'Mood disorder', 'Smoker (daily/occasional)', 'Smoker (daily)', 'Heavy drinking', 'Has a regular healthcare provider', 'Cannabis use–(almost) daily']

#Filter the data to a specific category
data = data.query('Geo=="Canada (excluding territories)" and Characteristics=="Percent" and Indicators in @indicators_of_interest and Age_group != "12-17 years" and Sex=="Both" and Age_group=="Total (>=12 years)" and Indicators=="Diabetes"')
maximum = max(data.VALUE, default=0) # this value will be used for the position of labels

#Plot
config = {'displayModeBar': False} # To remove ployly floating toolbar

#Preparing the input data for the chart
year = list(data['Year'])
perc = list(data['VALUE'])

data = [
	go.Scatter(
		x=year,
		y=perc,
		mode='markers',
		marker=dict(color='#ef233c', size=10)
	)
]

# Use the 'shapes' attribute from the layout to draw the vertical lines
layout = go.Layout(
	shapes=[dict(
		type='line',
		xref='x',
		yref='y',
		x0=year[i],
		y0=0,
		x1=year[i],
		y1=perc[i],
		line=dict(color='#ef233c',width=3)
	) for i in range(len(perc))]
)

# Plot the chart
#tickmode='linear': To avoid dropping some of the labels

fig = go.Figure(data, layout)
fig.update_xaxes(tickangle=0, tickfont=dict(family='Rockwell', color='black', size=11), tickmode='linear', mirror=False, showline=True)
fig.update_yaxes(tickangle=0, tickfont=dict(family='Rockwell', color='black', size=11), mirror=False, showline=True, range=[0,maximum+maximum/3], title="Percentage")
fig.update_layout(
	autosize=True,
	width = 500,
	height = 530,
	plot_bgcolor="#edf2f4",
	margin=dict(l=0, r=0, t=50, b=0))
)`,

	R: `
library(ggpubr)
library(ggplot2)
library(ggthemes)
library(svglite)
library(dplyr)

#set the theme
theme_update(
	plot.background = element_rect(fill = "#FFFFFF", color = "#FFFFFF"),
	panel.background = element_rect(fill = "#FFFFFF", color = NA),
	axis.text.x = element_text(face = "plain", color = "black", size = 10, margin = margin(t = 3)),
	axis.text.y = element_text(face = "plain", color = "black", size = 10, hjust = 1, margin = margin(r = 5)),
	axis.line.x = element_line(color="black", size = .5),
	axis.line.y = element_line(color="black", size = .5),
	axis.ticks = element_blank(),
	axis.title.x = element_blank(),
	axis.title.y = element_blank(),
	plot.title = element_text(face = "plain", color = "black", size = 12),
	strip.text.x = element_text(face = "bold", color = "black", size = 10, margin = margin(b = 5, t=5)),
	strip.text.y = element_text(face = "plain", color = "black", size = 12),
	strip.background = element_rect(fill = "#eee2df", color = "#FFF9FF"),
	panel.spacing.x=unit(1.5, "lines"),
	panel.spacing.y=unit(1.5, "lines"),
	legend.text=element_text(face = "plain", color = "black", size = 12),
	legend.title = element_text(face = "bold", color = "black", size = 12),
	plot.caption = element_text(
	family = "Arial",
	size = 12,
	color = "grey70",
	face = "bold",
	hjust = .5,
	margin = margin(5, 0, 20, 0)),
	plot.margin = margin(rep(15, 4))
)
	
#set the working directiry to the directory that includes the dataset and the source code
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))


indicators_of_interest = indicators_of_interest=c('Perceived health (fair/poor)', 'Perceived mental health (fair/poor)', 'Perceived life stress (quite a bit/extremely stressful)',
													'Overweight (>=18 years)', 'Obese (>=18 years)', 'Arthritis (>=15)', 'Diabetes', 'Asthma', 'Chronic obstructive pulmonary disease (>=35 years)',
													'High blood pressure', 'Mood disorder', 'Smoker (daily/occasional)', 'Smoker (daily)', 'Heavy drinking', 'Has a regular healthcare provider',
													'Cannabis use–(almost) daily')



df = read.csv("cchs.csv") %>% filter(Year == 2015 & Indicators %in% indicators_of_interest &
										Characteristics=="Percent" & Sex == "Both" & Geo == "Ontario")





p<- ggplot(df, aes(x = Indicators, y = VALUE), color=Age_grou) +
	facet_wrap(~Age_group, ncol = 3)+
	
	# To keep the axis line for each facet
	geom_hline(aes(yintercept=-Inf)) +
	geom_vline(aes(xintercept=-Inf)) +
	coord_cartesian(clip="off")+
	
	# The plot segments
	geom_segment(aes(x = Indicators, xend = Indicators, y = 0, yend = VALUE),
				color = "gray", lwd = 1) +
	
	# The plot circles
	geom_point(size = 7.5, pch = 21, bg = "#a31a5a", col="#a31a5a") +
	
	# The plot labels
	geom_text(aes(label = round(VALUE)), color = "white", size = 3) +
	
	# Adding % to the axis labels
	scale_y_continuous(labels = function(x) paste0(x, "%")) +
	
	# Flipping the coordinates for better presentation
	coord_flip()

#Saving the file in SVG format. You can change this palue to png or jpg or pdf
ggsave(file="lollipop.svg", plot=p, width=12, height=10)
`,
};
