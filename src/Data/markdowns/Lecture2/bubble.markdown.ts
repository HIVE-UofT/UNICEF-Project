export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	PYTHON: [
		{
			line: '<p><span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Implementation in Python— Example—</span> To generate the following Tile plot, we use a dataset presenting the <a href="https://catalog.data.gov/dataset/conditions-contributing-to-deaths-involving-coronavirus-disease-2019-covid-19-by-age-group"> Conditions Contributing to COVID-19 Deaths, by State and Age, Provisional 2020-2023</a>. This dataset displays the various health issues and factors associated with deaths resulting from coronavirus disease 2019 (COVID-19) in the US, broken down by age group and location where the death occurred. To generate the Bubble chart in Python, we use the following functions and configurations from the  <b>Altair</b> library. <a href="https://altair-viz.github.io/">Altair</a> is a Python library for creating declarative statistical visualizations. It allows users to create interactive visualizations using a simple and readable syntax, making it a popular choice for data exploration and analysis. The library also provides a wide range of options for customizing and fine-tuning the visualizations, as well as the ability to export visualizations in various formats such as HTML, JSON, and PNG.<p>',
		},
		{
			line: `
*‌‌‌ To show the number of deaths for each pair of (group, age_group), we use the mark_circle() function. This is a method of the\` alt.Chart\` class in the Altair library that is used to specify the mark type of a chart as a circle.

*‌ To provide additional information about each circle (mapping), we use the \`Tooltip\` parameter and initialize it with the variables of interest. We can use the \`alt.tooltip()\` function to customize the tooltips.

*‌ To set properties for a chart or mark, we use the \`properties()\` function. For example, in the following chart, we use this function to set the width and height of the chart and add a title to our visualization.
            `,
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
			code: `
import pandas as pd
import altair as alt
from altair.vegalite.v4.schema.core import Color

#Reading the data
data = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture02/US-COVID-Death/Death_causes_USA_COVID.csv")
data.rename(columns={'Condition Group': 'group', 'Age Group': 'age_group', 'COVID-19 Deaths': 'death_number', 'Start Date': 'start', 'End Date': 'end'}, inplace=True)

#Filtering the data
data.query('group not in ["All other conditions and causes (residual)", "COVID-19"] and age_group not in ["All Ages", "Not stated"]', inplace=True)

# To cacluate the death number for different age groups
data = data.groupby(['group', 'age_group'], as_index=False)['death_number'].sum()


# Plot
plot = alt.Chart(data).mark_circle().encode(
    x= alt.X('age_group:N', title="Age Geoup"),
    y= alt.Y('group:N', axis=alt.Axis(labelLimit=300), title=None),
    size = alt.Size('death_number:Q', scale=alt.Scale(range=[10, 1000])),
    tooltip = [alt.Tooltip('group', title="Group"), alt.Tooltip('death_number', title="Death Number")],
    color = alt.Color("death_number:Q", scale=alt.Scale(scheme='redblue', reverse=True)),
).properties(
    width=800,
    height=390,
    title = "Conditions Contributing to COVID-19 Deaths in the US (2020-2023)"
).configure_axis(
    labelFontSize=15,
    titleFontSize=18,
    labelColor='black'
).configure_view(
    strokeWidth=1
).configure_title(
    anchor='middle'
)`,
		},
	],
	R: [
		{
			line: '<p><span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Implementation in R—</span> After reading and filtering the data, we need to create a contingency table to prepare our data for the <code>ggballoonplot()</code> function. To do this, we use the <code>xtabs()</code> function. This function converts the data to a cross-tabulation or a frequency table, from two or more categorical variables. The function is part of the `stats` package.<p>',
		},
		{
			code: `library(tidyverse)
library(ggplot2)
library(plyr)
library(ggthemes)
require(data.table) # v1.9.0+
library(dplyr)
library(ggpubr)`,
		},
		{
			code: `
theme_update(
    axis.text.x = element_text(angle = 45, face = "bold", color = "black", size = 10, hjust=1, vjust = 1, margin = margin(r = 0)),
    axis.text.y = element_text(face = "plain", color = "black", size = 11, hjust = 1, margin = margin(r = 5)),
    axis.line.x = element_line(color="black", size = .5),
    axis.line.y = element_line(color="black", size = .5),
    axis.ticks = element_blank(),
    axis.title.x = element_blank(),
    axis.title.y = element_blank(),
    plot.title = element_text(face = "bold", color = "black", size = 15, hjust = 0, margin = margin(b = 5, l=0)),
    plot.subtitle = element_text(face = "plain", color = "#737c7d", size = 10, hjust = 0, margin = margin(b = 20, l=10)),
    legend.text=element_text(face = "plain", color = "black", size = 10),
    legend.title = element_text(face = "bold", color = "black", size = 10)
)`,
		},
		{
			line: 'After importing the libraries and defining the theme, we read and prepare the dataset. To filter our data based on certain conditions we use the `filter()` function. ',
		},
		{
			code: `
#Read and prepare the data
data = read.csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture02/Underlying%20health%20condition/HealthConditions.csv") %>%
filter(Sex == "Females" & Estimates == "Percentage of persons" & GEO != "Canada" & Characteristics != "Other background, cultural or racial background")

#Select the columns required for this visualization
data = data[c("Characteristics","GEO","VALUE")]

tab<-xtabs(VALUE~Characteristics+GEO, data=data)
df<-as.data.frame.matrix(tab)`,
		},
		{
			line: `The basic syntax of the \`xtabs()\` function is: \`xtabs(formula, data)\`, where the formula is a symbolic representation of the variables to be cross-tabulated (in our example, \`VALUE~Characteristics+GEO\`), and data is the data frame containing the variables. Then, we use the \`as.data.frame.matrix()\` function to convert a matrix to a data frame. `,
		},
		{
			line: `To create the bubble chart, we use the \`ggballoonplot()\` function. To scale the circles, we use \`size.range\` argument. This argument can be used when creating a plot that uses the **size** of the points to represent a variable. The \`size.range\` argument specifies the range of sizes that the points will take on.
            For example, if you specify \`size.range = c(1,15)\`, the smallest point in the plot will have a size of \`1\` and the largest point will have a size of \`15\`. The points in between will have sizes that are proportionally scaled based on the variable being represented by the size of the point.`,
		},
		{
			code: `
p<-ggballoonplot(df, fill = "value", size.range = c(1, 15), color = "#9A9784")+scale_fill_viridis_c(option="A", direction = -1)+theme(
    legend.position="right",
    panel.spacing = unit(.11, "lines"),
    axis.text.x = element_text(size =11),
    axis.text.y = element_text(size = 11)
    ) +
    xlab("") +
    ylab("")`,
		},
		{
			line: 'To save our plot object to a file, we can use the `ggsave()` function in the `ggplot` package. This function allows you to save a plot as an image file and accepts different arguments to define the width, height, and resolution of the image object.',
		},
		{
			code: `
#Saving the file in SVG format. You can change this value to png or jpg or pdf
ggsave(file="bubble_fig.svg", plot=p, width=12, height=7)`,
		},
	],
};

export const source_codes = {
	PYTHON: `
import pandas as pd
import altair as alt
from altair.vegalite.v4.schema.core import Color

#Reading the data
data = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture02/US-COVID-Death/Death_causes_USA_COVID.csv")
data.rename(columns={'Condition Group': 'group', 'Age Group': 'age_group', 'COVID-19 Deaths': 'death_number', 'Start Date': 'start', 'End Date': 'end'}, inplace=True)

#Filtering the data
data.query('group not in ["All other conditions and causes (residual)", "COVID-19"] and age_group not in ["All Ages", "Not stated"]', inplace=True)

# To cacluate the death number for different age groups
data = data.groupby(['group', 'age_group'], as_index=False)['death_number'].sum()


# Plot
plot = alt.Chart(data).mark_circle().encode(
    x= alt.X('age_group:N', title="Age Geoup"),
    y= alt.Y('group:N', axis=alt.Axis(labelLimit=300), title=None),
    size = alt.Size('death_number:Q', scale=alt.Scale(range=[10, 1000])),
    tooltip = [alt.Tooltip('group', title="Group"), alt.Tooltip('death_number', title="Death Number")],
    color = alt.Color("death_number:Q", scale=alt.Scale(scheme='redblue', reverse=True)),
).properties(
    width=800,
    height=390,
    title = "Conditions Contributing to COVID-19 Deaths in the US (2020-2023)"
).configure_axis(
    labelFontSize=15,
    titleFontSize=18,
    labelColor='black'
).configure_view(
    strokeWidth=1
).configure_title(
    anchor='middle'
)
    `,
	R: `
library(tidyverse)
library(tidygraph)
library(reshape2)
library(ggplot2)
library(plyr)
library(ggthemes)
require(data.table) # v1.9.0+
library(ggpubr)
library(dplyr)

#color libraries
library(colorblindr) # devtools::install_github("clauswilke/colorblindr", force= TRUE)
library(colorspace)
library(cowplot)

#set the theme
theme_update(
    plot.background = element_rect(fill = "#FFFFFF", color = "#FFFFFF"),
    panel.background = element_rect(fill = "#FFFFFF", color = NA),
    axis.text.x = element_text(angle=45, face = "plain", color = "black", size = 10, hjust=1, vjust = 1, margin = margin(r = 0)),
    axis.text.y = element_text(face = "plain", color = "black", size = 11, hjust = 1, margin = margin(r = 5)),
    axis.line.x = element_line(color="black", size = .5),
    axis.line.y = element_line(color="black", size = .5),
    axis.ticks = element_blank(),
    axis.title.x = element_blank(),
    axis.title.y = element_blank(),
    plot.title = element_text(face = "bold", color = "black", size = 15, hjust = 0, margin = margin(b = 5, l=0)),
    plot.subtitle = element_text(face = "plain", color = "#737c7d", size = 10, hjust = 0, margin = margin(b = 20, l=10)),
    legend.text=element_text(face = "plain", color = "black", size = 12),
    legend.title = element_text(face = "bold", color = "black", size = 12)
)

#Read and prepare the data
data = read.csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture02/Underlying%20health%20condition/HealthConditions.csv") %>% filter(Estimates == "Percentage of persons" & Sex != "Both sexes" & GEO == "Canada" & Characteristics != "Other background, cultural or racial background")


p <- ggplot(data, aes(x = VALUE, y = Characteristics)) +
    geom_col(aes(color = Sex, fill = Sex), position = position_dodge(0.6), width = 0.55) +
    scale_color_manual(values = c("#a1083b", "#c4bcbf"))+
    scale_fill_manual(values = c("#a1083b", "#c4bcbf")) +
    theme_update(axis.text.x = element_text(angle = 45, face = "bold", color = "black", size = 12, hjust=1, vjust = 1, margin = margin(r = 0))) +
    labs(title = "Canadian populations with one or more underlying health conditions",
        subtitle = "The conditions are believed to increase the risk of negative outcomes following COVID-19 infection" ) +
    scale_x_continuous(expand = c(0, 0)) # to start the bars from the zero line. Remove this to see the difference 


#Saving the file in SVG format. You can change this value to png or jpg or pdf
ggsave(file="Bar.SVG", plot=p, width=15, height=8)
    `,
};
