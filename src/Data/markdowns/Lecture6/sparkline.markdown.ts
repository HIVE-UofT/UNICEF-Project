export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	R: [
		{
			line: '<br><span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Implementation in R—</span>To prepare the data for our visualization, we begin by reading the data and filtering it to only include specific states, as we do not want to show data for all 50 states in our visualization. Next, we need to convert the data for each state into a list of values in the form of [death number 1, death number 2, ...]. To do this, we use the script <code>summarize(COVID.19.Deaths = paste(COVID.19.Deaths,collapse=","))</code> to concatenate all the sequential values for each group (state in our example) and separate them with commas. Then, we use <code>lapply(df$COVID.19.Deaths, function(x) (as.numeric(unlist(strsplit(x, ",")))) )</code> to convert the resulting string from the previous code to a list of integers that shows a sequential list of the number of deaths for each state. This same code can be used for other datasets to prepare the data for this visualization. ',
			code: `# Load packages
library(reactablefmtr)
library(tidyverse)
# remotes::install_github("timelyportfolio/dataui")
library(dataui)
library(htmlwidgets)

df = read.csv("https://data.cdc.gov/api/views/r8kw-7aab/rows.csv?accessType=DOWNLOAD")
states_of_interest = c("Florida", "New York", "Texas", "Alabama", "California", "Massachusetts", "Utah", "Washington")
df<-df %>% filter(Group=='By Week' & State %in% states_of_interest & Year==2021)

# prepare the data for this visualization
df<- df %>% group_by(State) %>%
summarize(COVID.19.Deaths = paste(COVID.19.Deaths,collapse=","))
df$COVID.19.Deaths <- lapply(df$COVID.19.Deaths, function(x) (as.numeric(unlist(strsplit(x, ",")))) )`,
		},
		{
			line: 'Now that we have prepared the data for visualization, we can use the <code>reactable()</code> function to create the interactive chart. We provide the categories and quantitative variables under the <code>columns</code> field and specify the characteristics of each variable using the <code>colDef()</code> function. The sparkline chart has several customizable parameters, including the <code>tooltip type</code>, <code>line width</code>, <code>line color</code>, <code>area opacity</code>, <code>statline</code>, <code>statline color</code>, <code>statline label size</code>, <code>bandline</code>, and <code>highlight points</code>. These parameters control the appearance and behavior of the sparkline chart.</br></br><ul style="list-style:disc inside none;"><li>If you want to include the interactive chart in your dashboard, you can save it as an HTML file using the <code>saveWidget()</code> function.</li><li>If you set the value of the <code>area_parameter</code> to a value greater than zero (with a maximum of 1), the lines in the chart will be converted into an area chart.</li><li>The <code>statline</code> parameter will let you insert a dotted line for the mean, median, min, or max.</li><li>You can use the <code>highlight_points</code> parameter to annotate the minimum and maximum value for each category.</li><li>You can highlight the inner-quartile or full range of your data using the <code>bandline</code> parameter. </li></ul>',
			code: `p <- reactable(
df,
columns = list(
    State = colDef(maxWidth = 120),
    COVID.19.Deaths = colDef(
    cell = react_sparkline(df, height = 50, tooltip_type = 2,
                            line_width = 1.25, line_color = "#000000",
                            show_area = TRUE,  area_opacity = 0.01,
                            statline = "mean", statline_color = "#806676",
                            statline_label_size = "1em", bandline = "innerquartiles",
                            highlight_points = highlight_points(min = "#0f7c8c", max = "#b50d74")),
    maxWidth = 150
    )
)
)

saveWidget(p, file="sparkline_r.html")`,
		},
	],
};

export const source_codes = {
	R: `
# Load packages
library(reactablefmtr)
library(tidyverse)
# remotes::install_github("timelyportfolio/dataui")
library(dataui)
library(htmlwidgets)

df = read.csv("https://data.cdc.gov/api/views/r8kw-7aab/rows.csv?accessType=DOWNLOAD")
states_of_interest = c("Florida", "New York", "Texas", "Alabama", "California", "Massachusetts", "Utah", "Washington")
df<-df %>% filter(Group=='By Week' & State %in% states_of_interest & Year==2021)

# prepare the data for this visualization
df<- df %>% group_by(State) %>%
summarize(COVID.19.Deaths = paste(COVID.19.Deaths,collapse=","))
df$COVID.19.Deaths <- lapply(df$COVID.19.Deaths, function(x) (as.numeric(unlist(strsplit(x, ",")))) )

p <- reactable(
df,
columns = list(
    State = colDef(maxWidth = 120),
    COVID.19.Deaths = colDef(
    cell = react_sparkline(df, height = 50, tooltip_type = 2,
                            line_width = 1.25, line_color = "#000000",
                            show_area = TRUE,  area_opacity = 0.01,
                            statline = "mean", statline_color = "#806676",
                            statline_label_size = "1em", bandline = "innerquartiles",
                            highlight_points = highlight_points(min = "#0f7c8c", max = "#b50d74")),
    maxWidth = 150
    )
)
)

saveWidget(p, file="sparkline_r.html")

    `,
};
