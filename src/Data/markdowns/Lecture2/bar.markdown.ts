export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	R: [
		{
			line: '<p><span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Implementation in R—</span> We first import the required libraries and set the main configurations of our charts\' theme (the aesthetic options that control the appearance of the plot, such as the font size and color, the background color, and the axis labels).<p>',
		},
		{
			code: `library(tidyverse)
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
library(cowplot)`,
		},
		{
			code: `
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
)`,
		},
		{
			line: 'Then, we read the data and  function is used to filter a data frame based on a certain condition using the `filter()` function.',
		},
		{
			code: `
#Read and prepare the data
data = read.csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture02/Underlying%20health%20condition/HealthConditions.csv") %>% filter(Estimates == "Percentage of persons" & Sex != "Both sexes" & GEO == "Canada" & Characteristics != "Other background, cultural or racial background")`,
		},
		{
			line: `We are ready to visualize the data! In ggplot2, the \`geom_col()\` function is used to create a column or bar chart. It creates a bar for each value of a categorical variable and the height of the bar represents the corresponding value of a numeric variable. You can also use the \`fill\` aesthetic to map a categorical variable to the color of the bars (e.g., in this example **Sex**), and you can use other aesthetics such as \`width\`, \`alpha\`, and \`color\` to customize the appearance of the bars.
            Also, to update the \`theme\` we defined earlier in our code, we use the \`theme_update()\` function. This allows you to change specific elements of an existing theme, rather than creating a new theme from scratch. You can use it to update one or more elements of the theme, such as the font size or the axis labels, while keeping the other elements of the main theme the same.`,
		},
		{
			code: `
p <- ggplot(data, aes(x = VALUE, y = Characteristics)) +
geom_col(aes(color = Sex, fill = Sex), position = position_dodge(0.6), width = 0.55) +
scale_color_manual(values = c("#a1083b", "#c4bcbf"))+
scale_fill_manual(values = c("#a1083b", "#c4bcbf")) +
theme_update(axis.text.x = element_text(angle = 45, face = "bold", color = "black", size = 12, hjust=1, vjust = 1, margin = margin(r = 0))) +
labs(title = "Canadian populations with one or more underlying health conditions",
    subtitle = "The conditions are believed to increase the risk of negative outcomes following COVID-19 infection" ) +
scale_x_continuous(expand = c(0, 0)) # to start the bars from the zero line. Remove this to see the difference `,
		},
		{
			line: "In ggplot2, `position_dodge()` is a position adjustment function that can be used to adjust the position of bars in a bar chart (or other geoms) when they have the same x-axis value. When creating a bar chart, it is common to have multiple bars for the **same** `x-axis` value (e.g., in our example, two bars per characteristic). By default, `ggplot2` will stack these bars on top of each other, but with the `position_dodge()` function, you can adjust the bars' position so that they are **side-by-side**. Finally, we save the visualization on our local system using the `ggsave()` function.",
		},
		{
			code: `
#Saving the file in SVG format. You can change this value to png or jpg or pdf
ggsave(file="Bar.SVG", plot=p, width=15, height=8)`,
		},
	],
};

export const source_codes = {
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
