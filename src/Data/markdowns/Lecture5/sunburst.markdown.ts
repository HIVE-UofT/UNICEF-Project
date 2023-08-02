export const plots_markdown_code = [
	{
		line: '<p><span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Implementation in R—</span>To create Sunburst visualizations in R, we can utilize the plotme package, which offers a user-friendly interface for generating complex plots that are typically challenging to create in R. At present, the package only includes two functions for generating sunburst and treemap plots using the plotly library. The <code>count_to_sunburst()</code> function from this package is a powerful tool for rapidly generating interactive hierarchical {plotly} sunburst visualizations from categorical data. To use this function, the data must be formatted into a summary table, which can be created with ease using the <code>dplyr::count()</code> function. This function takes the categorical data and condenses it into a table that displays the count of occurrences for each unique category. By providing this summary table as input to <code>count_to_sunburst()</code>, you can generate an interactive visualization quickly and easily, allowing for detailed exploration of the underlying data structure.',
		code: `
library(dplyr)
# devtools::install_github("yogevherz/plotme")
library(plotme)

data <- read.csv("https://data.cdc.gov/api/views/9bhg-hcku/rows.csv?accessType=DOWNLOAD")
data_sun <- data %>% filter(Group =="By Total" & State=="United States" & Sex!="All Sexes" & Age.Group!="All Ages")
p<-data_sun %>%
    count(State, Age.Group, Sex, wt = COVID.19.Deaths) %>%
    count_to_sunburst(fill_by_n = TRUE)
saveWidget(frameableWidget(p),'sunburst.html', selfcontained = TRUE)`,
	},

	{
		line: 'The <code>sunburst</code> package in R provides a variation of the traditional sunburst visualization technique, enabling users to present their data in a new and intuitive way. This variation displays the distribution of each sub-category relative to the entire dataset, rather than just its parent category. This approach is particularly useful when analyzing complex, multi-level data structures, as it enables users to identify relationships and patterns across the entire dataset, rather than just at the parent level. ',
		code: `
library(sunburstR)
library(dplyr)

data <- read.csv("https://data.cdc.gov/api/views/9bhg-hcku/rows.csv?accessType=DOWNLOAD")
data_sun <- data %>% filter(Group =="By Total" & State=="United States" & Sex!="All Sexes" & Age.Group!="All Ages")

# as '-' is used in the visualization technique, we need to replace all instances of '-' in our code with another character.
data_sun$Age.Group<-gsub("-", "_", data_sun$Age.Group)

# Reformat data for the sunburstR package
data <- data_sun %>%
    mutate(path = paste(Sex, Age.Group,  sep="-")) %>%
    dplyr::select(path, COVID.19.Deaths)

#plot
colors <- c("#c994c7","#486596", "#d1194d", "#bcbddc","#74c476","#c7e9c0","#fcbba1","#fc9272",
            "#ef3b2c","#cb181d","#99000d", "#b9cf3e", "#f5d62a", "#a89219")
p <- sunburst(data, legend=FALSE, colors = list(range = colors))
saveWidget(frameableWidget(p),'sunburst_total.html', selfcontained = TRUE)`,
	},
];
