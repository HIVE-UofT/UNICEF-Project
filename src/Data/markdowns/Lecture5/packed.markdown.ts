export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	R: [
		{
			line: '<p><span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Implementation in R—</span>The given example utilizes the <code>circlepackeR()</code> library in R to produce a circular packing display, which is ideal for presenting data that has several levels of categories. This function enables you to personalize the circles\' size, color, and labeling, as well as the design of the complete visualization. Through adjusting various settings and experimenting with different setups, you can design an evident and insightful exhibition of your data. Moreover, the <code>circlepackeR()</code> package facilitates interactive and animated exhibits, which can be an interactive and dynamic approach to illustrate intricate data. ',
		},
		{
			code: `library(ggplot2)
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
		},
	],
};
