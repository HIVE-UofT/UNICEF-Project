export const part1_title = `Student response to question: Are you on a diet to lose weight, by sex, age group and selected countries`;

export const markdowns = {
	PART1: [
		{
			line: "<p><span style=\"font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;\">Implementation in Python—</span> In Python, to create an interactive violin plot, we utilize the <code>px.violin()</code> function from the <code>Plotly Express</code> library. This function generates violin plots by taking in data and plot specifications and producing an interactive plot that showcases a combination of box plot and kernel density plot elements. If desired, a box plot can also be added to the violin plot by setting the <b>box</b> argument to <code>True</code>. The source code below generates a violin plot with pre-set parameters such as <b>Sex=Females</b> and <code>GEO = ['Canada', 'France', 'Germany', 'Denmark', 'United States']</code>. However, you have the flexibility to alter these parameters and regenerate the plot to investigate the behavior of your data for different variable values within your dataset.",
			code: `
import plotly.express as px
import pandas as pd

data = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture05/Diet/13100239.csv")
list_of_interest = ['Canada', 'France', 'Germany', 'Denmark', 'United States']
df_v = data.query('GEO in @list_of_interest and \`Student response\`=="Yes"  and Sex=="Females"')
fig = px.violin(df_v, y="VALUE", x="GEO", color="GEO", box=True, points="all",
            title = "Student response to question: Are you on a diet to lose weight?",
            hover_data=df_v.columns,
            color_discrete_sequence=['#d7263d', '#f46036', '#2e294e', '#1b998b', '#c5d86d', '#eec170', '#585123', '#8d99ae', '#81b29a', '#c19875'])
fig.show()`,
		},
	],
	PART2: [
		{
			line: "In order to include an additional variable in our visualization and present data for both values of the 'Sex' variable, we need to consider how to effectively display the information. Using full violin plots for each value of 'Sex' could result in overlap, making it difficult to distinguish trends and patterns between the two groups when they share similar values. This would negatively impact the clarity of our visualization and cause confusion due to clutter in the plot. The following illustration effectively demonstrates this scenario.",
			code: `
data = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture05/Diet/13100239.csv")

list_of_interest = ['Canada', 'France', 'Germany', 'Denmark', 'United States']
df_s = data.query('GEO in @list_of_interest and \`Student response\`=="Yes"')
fig = px.violin(df_s, y="VALUE", x="GEO", color="Sex", box=True, points="all",
            title = "Student response to question: Are you on a diet to lose weight?",
            violinmode='overlay', hover_data=df_s.columns,
            color_discrete_sequence=['#003049', '#c1121f'])

fig.show()`,
		},
		{
			line: "To resolve this issue, we will segment each violin plot into two sections, one for each value of 'Sex', and utilize the 'Color' variable to enhance the clarity of the visualization. This approach will clearly differentiate the trends and patterns between the two groups and make the information easier to interpret.",
		},
	],
	PART3: [
		{
			line: "To create this variation of the violin plot, we utilize the `go.Figure()` function from the Plotly library. This function provides a flexible and intuitive method for generating a custom violin plot that separates the data by the values of 'Sex' and uses the 'Color' variable to improve the clarity of the visualization. `fig.add_trace()` is a function in the Plotly library that allows you to add a new trace, or layer, to a Plotly figure. This function is commonly used in combination with the `go.Figure()` function to create a multi-layered visualization. The `fig.add_trace()` function enables you to add additional data sets to a Plotly figure, each represented as a separate trace. This makes it possible to create complex and informative visualizations that combine multiple layers of data. ",
			code: `
import plotly.graph_objects as go
import pandas as pd

data = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture05/Diet/13100239.csv")

list_of_interest = ['Canada', 'France', 'Germany', 'Denmark', 'United States']
df_s = data.query('GEO in @list_of_interest and \`Student response\`=="Yes"')
fig = go.Figure()
fig.add_trace(go.Violin(x=df_s['GEO'][ df_s['Sex'] == 'Females' ],
                        y=df_s['VALUE'][ df_s['Sex'] == 'Females' ],
                        legendgroup='Females', scalegroup='Females', name='Females',
                        side='negative',
                        line_color='#c1121f')
                )
fig.add_trace(go.Violin(x=df_s['GEO'][ df_s['Sex'] == 'Males' ],
                        y=df_s['VALUE'][ df_s['Sex'] == 'Males' ],
                        legendgroup='Males', scalegroup='Males', name='Males',
                        side='positive',
                        line_color='#003049')
                )
fig.update_traces(meanline_visible=True)
fig.update_layout(violingap=0, violinmode='overlay')
fig.show()`,
		},
	],
	PART4: [
		{
			line: '<p><span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Implementation in R—</span>To generate a violin plot in R, we first need to import the necessary libraries. In this example, we will be using the <b>ggplot</b> and introdataviz libraries. Next, we specify the theme for the chart. The `legend.position` argument is used to determine the placement of the legend in a plot. This argument can take a variety of values, such as "left," "right," "top," "bottom," "none," or a numeric position.<p>',
			code: `
library(ggplot2)
library(dplyr)
# devtools::install_github("psyteachr/introdataviz")
library(introdataviz)

#set the theme
theme_update(
    plot.background = element_rect(fill = "#FFFFFF", color = "#FFFFFF"),
    panel.background = element_rect(fill = "#f5f5fa", color = NA),
    axis.text.x = element_text(angle=45, face = "plain", color = "black", size = 11, hjust=1, vjust = 1, margin = margin(r = 0)),
    axis.text.y = element_text(face = "plain", color = "black", size = 10, hjust = 1, margin = margin(r = 5)),
    axis.line.x = element_line(color="black", size = .5),
    axis.line.y = element_line(color="black", size = .5),
    axis.ticks = element_blank(),
    axis.title.x = element_blank(),
    axis.title.y = element_blank(),
    strip.background = element_rect(fill = "#eee2df", color = "#FFF9FF"),
    strip.text = element_text(face = "bold", color = "black", size = 11),
    panel.spacing.x=unit(1.5, "lines"), #space between the facet components
    panel.spacing.y=unit(2.5, "lines"),
    plot.title = element_text(face = "bold", color = "black", size = 13, hjust = 0, margin = margin(b = 15, l=0)),
    plot.subtitle = element_text(face = "plain", color = "#737c7d", size = 10, hjust = 0, margin = margin(b = 20, l=10)),
    legend.text=element_text(face = "plain", color = "black", size = 11),
    legend.title = element_text(face = "bold", color = "black", size = 12),
    legend.position = "bottom")
)`,
		},
		{
			line: 'In R, we use the <code>geom_split_violin()</code> function in ggplot2 to generate split violin plots, effectively displaying the distribution of data across different levels of a categorical variable ("Sex" in this example). The <code>fill</code> parameter is used to assign colors to the plot based on the categorical variable, while the <code>alpha</code> parameter controls the transparency of the fill color. This is particularly useful when there is a high degree of overlap between data points in a dataset.</br></br>The <code>trim</code> argument in the <code>geom_split_violin()</code> function of ggplot2 is used to manage the extent of the violin plot. It specifies the amount of the plot to be trimmed or removed from both ends, with a numeric value ranging from 0 to 1 representing the proportion of the plot to be trimmed. For example, a trim value of 0.0 (or <code>FALSE</code>) keeps the entire plot, while a value of 1.0 removes the entire plot and only shows the central part. By utilizing the <code>trim</code> argument, the appearance of the split violin plot can be customized to better showcase the distribution of data in the visualization.',
			code: `
#Read and prepare the data
data = read.csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture05/Diet/13100239.csv")
data<- data %>% filter(GEO %in% c('Canada', 'France', 'Germany', 'Denmark', 'United States') & REF_DATE==1998)
data$VALUE <- as.numeric(data$VALUE)
ggplot(data, aes(x = GEO, y = VALUE, fill=Sex)) +
  geom_split_violin(nudge = 0.07, alpha = .8, trim = FALSE) +
  facet_wrap(.~Student.response, ncol = 2) +
  scale_y_continuous(labels = function(x) paste0(x, "%")) +
  ggtitle("Student response to question: Are you on a diet to lose weight?") +
  scale_fill_manual(values = c('#d7263d', '#8d99ae'))

#set the working directory to the directory that includes the dataset and the source code
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

# to adjust the width of the figure
l = length(unique(unlist(data[c("GEO")])))
# save the figure
ggsave("violin_static.png", width=l*1.5, height = l*1.1)`,
		},
	],
};

export const source_codes = {
	R: `
library(ggplot2)
library(dplyr)
# devtools::install_github("psyteachr/introdataviz")
library(introdataviz)

#set the theme
theme_update(
    plot.background = element_rect(fill = "#FFFFFF", color = "#FFFFFF"),
    panel.background = element_rect(fill = "#f5f5fa", color = NA),
    axis.text.x = element_text(angle=45, face = "plain", color = "black", size = 11, hjust=1, vjust = 1, margin = margin(r = 0)),
    axis.text.y = element_text(face = "plain", color = "black", size = 10, hjust = 1, margin = margin(r = 5)),
    axis.line.x = element_line(color="black", size = .5),
    axis.line.y = element_line(color="black", size = .5),
    axis.ticks = element_blank(),
    axis.title.x = element_blank(),
    axis.title.y = element_blank(),
    strip.background = element_rect(fill = "#eee2df", color = "#FFF9FF"),
    strip.text = element_text(face = "bold", color = "black", size = 11),
    panel.spacing.x=unit(1.5, "lines"), #space between the facet components
    panel.spacing.y=unit(2.5, "lines"),
    plot.title = element_text(face = "bold", color = "black", size = 13, hjust = 0, margin = margin(b = 15, l=0)),
    plot.subtitle = element_text(face = "plain", color = "#737c7d", size = 10, hjust = 0, margin = margin(b = 20, l=10)),
    legend.text=element_text(face = "plain", color = "black", size = 11),
    legend.title = element_text(face = "bold", color = "black", size = 12),
    legend.position = "bottom")
)

#Read and prepare the data
data = read.csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture05/Diet/13100239.csv")
data<- data %>% filter(GEO %in% c('Canada', 'France', 'Germany', 'Denmark', 'United States') & REF_DATE==1998)
data$VALUE <- as.numeric(data$VALUE)
ggplot(data, aes(x = GEO, y = VALUE, fill=Sex)) +
  geom_split_violin(nudge = 0.07, alpha = .8, trim = FALSE) +
  facet_wrap(.~Student.response, ncol = 2) +
  scale_y_continuous(labels = function(x) paste0(x, "%")) +
  ggtitle("Student response to question: Are you on a diet to lose weight?") +
  scale_fill_manual(values = c('#d7263d', '#8d99ae'))

#set the working directory to the directory that includes the dataset and the source code
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

# to adjust the width of the figure
l = length(unique(unlist(data[c("GEO")])))
# save the figure
ggsave("violin_static.png", width=l*1.5, height = l*1.1)

`,
};
