export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	R: [
		{
			line: '<p><span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Implementation in R—</span> To generate the Tile plot in R, we use the <code>geom-tile()</code> function. We use the <code>geom_text()</code> to add labels to each tile and add a <code>%</code> to the end of each label using the <code>sprintf()</code> function. This function stands for <b>string print</b> and is used to create strings that are formatted according to a set of specified rules. The function takes a character string as its first argument, which contains placeholders for values that will be replaced with actual values in the final string.<p>',
			code: `
library(tidyverse)
library(ggplot2)
library(plyr)
library(ggthemes)
require(data.table) # v1.9.0+
library(dplyr)
library(viridis)`,
		},
		{
			code: `
#set the theme
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
			line: `Then, we read the data and  function is used to filter a data frame based on a certain condition using the \`filter()\` function. `,
			code: `
#Read and prepare the data
data = read.csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture02/Underlying%20health%20condition/HealthConditions.csv") %>% filter(Sex == "Females" & Estimates == "Percentage of persons" & GEO != "Canada" & Characteristics != "Other background, cultural or racial background")`,
		},
		{
			line: `To generate the Tile plot in R, we use the \`geom-tile()\` function. We use the \`geom_text()\` to add labels to each tile and add a \`%\` to the end of each label using the \`sprintf()\` function. This function stands for **string print** and is used to create strings that are formatted according to a set of specified rules. The function takes a character string as its first argument, which contains placeholders for values that will be replaced with actual values in the final string. `,
			code: `
p<-ggplot(data, aes(x=GEO, y=fct_reorder(Characteristics, VALUE, .fun=sum), fill= VALUE)) +
    geom_tile() +
    geom_text(aes(label = sprintf("%.0f%%", VALUE)), color="white", size=3.5) +
    scale_fill_distiller(palette = "RdPu", na.value = 'white', direction=1, name ="Value (%)" ) +
    xlab("") +
    ylab("")
p`,
		},
		{
			line: `To save our plot object to a file, we can use the \`ggsave()\` function in the \`ggplot\` package. This function allows you to save a plot as an image file and accepts different arguments to define the width, height, and resolution of the image object.`,
			code: `
#Saving the file in SVG format. You can change this value to png or jpg or pdf
ggsave(file="Tile.svg", plot=p, width=12, height=7)`,
		},
	],
	PYTHON: [
		{
			line: '<p><span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Implementation in Python—</span> In this example, to generate the Tile  plot in Python, we use the following functions and configurations from the  <b>Altair</b> library. <a href="https://altair-viz.github.io/">Altair</a> is a Python library for creating declarative statistical visualizations. It allows users to create interactive visualizations using a simple and readable syntax, making it a popular choice for data exploration and analysis. The library also provides a wide range of options for customizing and fine-tuning the visualizations, as well as the ability to export visualizations in various formats such as HTML, JSON, and PNG.<p>',
		},
		{
			line: `
*‌ \`alt.Chart().mark_rect()\` to create the tiles. To position the tiles on the x- and y-axes, we us the alt.X and alt.Y encoding channels.

*‌ To set the color of the tiles based on the \`VALUE\` field, we use the \`alt.Color\` encoding channel.

*‌ To add labels to each tile, we use the \`makr_text()\` function. We can customize the label text using various parameters such as \`fontWeight\`, \`fontSize\`, and \`angle\`.

*‌ To hide the label for missing values, we use the \`alt.condition()\` function. This method takes three arguments: (1) the test condition; (2) the encoding to apply if the condition is true; and (3) the encoding to apply if otherwise.

*‌ To combine the text and rect layers, we use the \`alt.layer()\` function.
            `,
		},
		{
			line: `
<div class="warning" style='background-color:#f0ebf5; color: #69337A; border-left: solid #805AD5 4px; border-radius: 4px; padding:0.7em;'>
<span>
<p style='margin-top:1em; text-align:center'>
<h5>What does the encode() function do in Altair?</b></p>
<p style='margin-left:1em;'>
In Altair, <code>encode()</code> is a method of the <code>alt.Chart</code> class that is used to specify the encoding of a chart. Encoding maps data fields to the visual properties of the chart, such as position, color, size, and shape.
The <code>encode()</code> method takes one or more key-value pairs as arguments, where the key is the name of the encoding channel (e.g. "x", "y", "color", "size") and the value is an encoding definition.
</p>
</div>`,
		},
	],
};

export const source_codes = {
	PYTHON: `
import pandas as pd
import altair as alt
from altair.vegalite.v4.schema.core import Color

# read the data
data = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture02/Underlying%20health%20condition/HealthConditions.csv")
data = data.query('Sex == 'Females' and Characteristics!="Other background, cultural or racial background" and Estimates == "Percentage of persons" and GEO != "Canada"')

#to prepare the label column
data['Percent'] = data['VALUE'].fillna(0).round(0).astype(int).astype(str) + '%'

#make the plot
rect = alt.Chart().mark_rect().encode(
    alt.X('GEO:N', axis=alt.Axis(labelLimit=200)),
    alt.Y('Characteristics:N', axis=alt.Axis(labelLimit=500)),
    alt.Color('VALUE:Q',
        scale=alt.Scale(scheme='bluepurple'),
        legend=alt.Legend(title='% of population'))
).properties(
    width=1000,
    height=500)

# create the labels
text=alt.Chart().mark_text(align='center', baseline='middle', color='white', size=11).encode(
    y=alt.Y('Characteristics:N', title=None),
    x=alt.X('GEO:N', title=None),
    text=alt.condition(alt.datum.Percent!='0%', 'Percent', alt.value(' ' ))) #if the label is 0%, we remove the label (missing values)
    
#combine the tile plot and the labels
plot = alt.layer(rect, text, data=data)

plot
    `,
	R: `
library(tidyverse)
library(ggplot2)
library(plyr)
library(ggthemes)
require(data.table) # v1.9.0+
library(dplyr)
library(viridis)

#set the theme
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
)

#Read and prepare the data
data = read.csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture02/Underlying%20health%20condition/HealthConditions.csv") %>% filter(Sex == "Females" & Estimates == "Percentage of persons" & GEO != "Canada" & Characteristics != "Other background, cultural or racial background")

p<-ggplot(data, aes(x=GEO, y=fct_reorder(Characteristics, VALUE, .fun=sum), fill= VALUE)) +
  geom_tile() +
  geom_text(aes(label = sprintf("%.0f%%", VALUE)), color="white", size=3.5) +
  scale_fill_distiller(palette = "RdPu", na.value = 'white', direction=1, name ="Value (%)" ) +
  xlab("") +
  ylab("")
p

#Saving the file in SVG format. You can change this value to png or jpg or pdf
ggsave(file="Tile.svg", plot=p, width=12, height=7)
    `,
};
