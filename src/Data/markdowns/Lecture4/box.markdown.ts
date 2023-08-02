export const title = 'Student response to question: Are you on a diet to lose weight?';

export const markdowns = {
	PYTHON: [
		{
			line: "To produce an interactive box plot in Python, we have the option of utilizing Plotly's <code>px.box()</code> function, which allows us to tailor the plot's appearance by incorporating titles, labels, and modifying the color and layout. Plotly's interactive features facilitate hovering over the data points to view specific values, zooming in or out, and navigating through the plot. In case certain categories need to be excluded from the visualization, clicking on the category in the legend will do the job. Moreover, we can focus on specific areas by drawing on them with the mouse. To restore the chart to its original state, double-clicking on any location on the plot will suffice. By default, only <code>outliers</code> data points are displayed, but if you set <code>points='all'</code>, all individual data points will be shown on the chart. This can provide a clearer picture of the overall distribution of the data and help identify patterns or anomalies.",
			code: `
import plotly.express as px
import pandas as pd

data = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture05/Diet/13100239.csv")
hover_columns = ['Sex', 'Age groups', 'GEO']
list_of_interest = ['Canada', 'France', 'Germany', 'Denmark', 'United States']
df_b = data.query('GEO in @list_of_interest and \`Student response\`=="Yes" and Sex=="Females"')
fig = px.box(df_b, y="VALUE", x="GEO", color="GEO", points="all",
            title = "Student response to question: Are you on a diet to lose weight?",
            hover_data=hover_columns,
            color_discrete_sequence=['#d7263d', '#f46036', '#2e294e', '#1b998b', '#c5d86d', '#eec170', '#585123', '#8d99ae', '#81b29a', '#c19875'])
fig.show()`,
		},
	],
	R: [
		{
			line: '<p><span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Implementation in R—</span>To generate a box plot, we first need to import the necessary libraries. In this example, we will be using the <b>ggplot</b> library. Next, we specify the theme for the chart. As we are using a grid structure to display all of the age ranges in a static manner, we utilize the <b>strip</b> parameter in the theme code to define the spacing between the blocks, the background color of the blocks, and the attributes of their titles.<p>',
			code: `
library(ggplot2)
library(dplyr)

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
    plot.title = element_text(face = "bold", color = "black", size = 15, hjust = 0, margin = margin(b = 5, l=0)),
    plot.subtitle = element_text(face = "plain", color = "#737c7d", size = 10, hjust = 0, margin = margin(b = 20, l=10)),
    legend.text=element_text(face = "plain", color = "black", size = 11),
    legend.title = element_text(face = "bold", color = "black", size = 12)
)`,
		},
		{
			line: 'We use the <code>geom_boxplot()</code> function to produce the final chart. To include the percentage symbol (%) in the labels on the y-axis, we utilize the <code>paste0()</code> function. This function allows us to concatenate the percentage symbol to the y-axis labels, resulting in a clear and concise representation of the data.',
			code: `
#Read and prepare the data
data = read.csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture05/Diet/13100239.csv")
data<- data %>% filter(GEO %in% c('Canada', 'France', 'Germany', 'Denmark', 'United States') & REF_DATE==1998 &
                       Student.response == 'Yes')
data$VALUE <- as.numeric(data$VALUE)
ggplot(data, aes(x = GEO, y = VALUE)) +
  geom_boxplot(aes(fill = GEO)) +
  facet_wrap(.~Age.groups) +
  scale_y_continuous(labels = function(x) paste0(x, "%")) +
  ggtitle("Student response to question: Are you on a diet to lose weight?") +
  scale_fill_manual(values = c('#d7263d', '#f46036', '#2e294e', '#1b998b', '#c5d86d', '#eec170', '#585123', '#8d99ae', '#81b29a', '#c19875'))

#set the working directory to the directory that includes the dataset and the source code
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

# save the figure
ggsave("box_static.png", width=9, height = 5)`,
		},
	],
};

export const source_codes = {
	R: `
library(ggplot2)
library(dplyr)

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
    plot.title = element_text(face = "bold", color = "black", size = 15, hjust = 0, margin = margin(b = 5, l=0)),
    plot.subtitle = element_text(face = "plain", color = "#737c7d", size = 10, hjust = 0, margin = margin(b = 20, l=10)),
    legend.text=element_text(face = "plain", color = "black", size = 11),
    legend.title = element_text(face = "bold", color = "black", size = 12)
)

#Read and prepare the data
data = read.csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture05/Diet/13100239.csv")
data<- data %>% filter(GEO %in% c('Canada', 'France', 'Germany', 'Denmark', 'United States') & REF_DATE==1998 &
                       Student.response == 'Yes')
data$VALUE <- as.numeric(data$VALUE)
ggplot(data, aes(x = GEO, y = VALUE)) +
  geom_boxplot(aes(fill = GEO)) +
  facet_wrap(.~Age.groups) +
  scale_y_continuous(labels = function(x) paste0(x, "%")) +
  ggtitle("Student response to question: Are you on a diet to lose weight?") +
  scale_fill_manual(values = c('#d7263d', '#f46036', '#2e294e', '#1b998b', '#c5d86d', '#eec170', '#585123', '#8d99ae', '#81b29a', '#c19875'))

#set the working directory to the directory that includes the dataset and the source code
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

# save the figure
ggsave("box_static.png", width=9, height = 5)

`,
};
