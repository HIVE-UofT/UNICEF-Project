export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	PYTHON: [
		{
			line: `<span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Implementation in Python—</span>After importing the essential libraries, we read in data from a CSV file provided by the CDC that contains information on COVID-19 deaths in the United States. We apply a filter to exclude data with negative COVID-19 death counts and only keep the data for monthly intervals. Additionally, we remove the data for the entire United States, since we only want to visualize the data for individual states. Next, we select only the columns we are interested in for visualization, and rename the columns with spaces to make them easier to work with. Specifically, we rename 'End Date' to 'Date', 'COVID-19 Deaths' to 'Deaths', and 'Total Deaths' to 'Total_Deaths'.
            </br>
            </br>
            Finally, we create an area chart using Altair, which shows the number of COVID-19 deaths for each state. The x-axis represents the date, while the y-axis shows the number of deaths. Each state is represented by a different color. We also configure the chart's tooltip to display the state, date, and number of deaths. The resulting chart is interactive and allows the user to zoom in and out of different time intervals.
            </br>
            </br>
            **How can we distinguish between the implementation of a Stream graph and a Stacked area chart, and what are the differences in their Altair implementations?** You may notice that they share an identical implementation, with the only difference being the value assigned to the <code>stack</code> parameter. Whereas a binary value is used for the Stacked area chart, for the Stream graph, we initialize this parameter to <code>center</code> to achieve the desired appearance.
            </br>
            </br>
            Looking at this output of this implementation, we note that the graph is evenly distributed around the x-axis. In general, wider or more prominent areas of the graph indicate higher values or greater influence, while narrower or lower areas indicate lower values or less influence. `,
			code: `import pandas as pd
import altair as alt

# read the data and filter it based on the time interval, and exclude negative numbers
data = pd.read_csv("https://data.cdc.gov/api/views/r8kw-7aab/rows.csv?accessType=DOWNLOAD")
data = data.query('Group=="By Month" and State !="United States" and \`COVID-19 Deaths\`>=0')

# only include the columns of interest
data = data[['End Date','Group','Year','Month','State','COVID-19 Deaths','Total Deaths']]

# rename the columns with space
data.rename(columns={'End Date': 'Date', 'COVID-19 Deaths': 'Deaths',
                        'Total Deaths': 'Total_Deaths'}, inplace=True)

#plot
stream = alt.Chart(data).mark_area().encode(
    alt.X('Date:T', axis=alt.Axis(format='%Y-%m', domain=False, tickSize=0, title=None)),
    alt.Y('Deaths:Q', stack='center', axis=None),
    alt.Color('State:N', scale=alt.Scale(scheme='magma'), legend=None),
    tooltip=[alt.Tooltip('State:N',title='State' ), alt.Tooltip('Date:T', title='Date'),
        alt.Tooltip('Deaths:Q', title='Number of Deaths per State')]
).interactive().properties(
width=800,
height=275
).configure_view(stroke='white')`,
		},
	],
	R: [
		{
			line: '<span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Implementation in R—</span>As always, we first install and load the necessary packages for creating streamgraphs in R. The <code>streamgraph</code> package in R offers a straightforward way for users to create streamgraphs. With this package, users can define a **dataset**, select **colors**, and modify the graph\'s appearance to their preferences. The package utilizes the <code>JavaScript library d3.js</code> to generate interactive streamgraphs, which can be integrated into web pages or viewed independently.',
			code: `# install.packages("remotes")
# remotes::install_github("davidsjoberg/ggstream")
# remotes::install_github("hrbrmstr/streamgraph")
library(streamgraph)
library(ggplot2)
library(plotly)
library(dplyr)
library(htmlwidgets)

# read the data
df = read.csv("https://data.cdc.gov/api/views/r8kw-7aab/rows.csv?accessType=DOWNLOAD")`,
		},
		{
			line: 'Now we are ready to create the first Stream graph to display changes in the number of COVID-19 Deaths over time in the USA using a flowing and smooth format. To accomplish this, we use the <code>streamgraph()</code> function in R. This function requires the categories to be grouped under the <code>key</code> variable, and only accepts a quantitative format for the temporal variable. To clarify, instead of providing the date, we need to provide the day number of the year or the number of weeks, or the number of the month (e.g., February 14<sup>th</sup> is the 45<sup>th</sup> day, or it is located in the 7<sup>th</sup> week of the year). The dataset we will be using for this visualization has a column named `MMWR.Week`, which represents the n<sup>th</sup> week of the year. To ensure each week is only shown once, we will only present one year of data in each view. The <code>sg_fill_tableau()</code> function is used to customize the color palette. This function allows us to specify a color palette from Tableau software, which can be used to customize the colors of the layers in the streamgraph. The function takes one argument, which is the name of the desired color palette to use. Some example palettes are: <code>tableau20</code>, <code>tableau10medium</code>, <code>gray5</code>, <code>colorblind10</code>, <code>trafficlight</code>, <code>purplegray12</code>, <code>bluered12</code>, <code>greenorange12</code>, <code>cyclic</code>.',
			code: `#plot
p<- df %>% filter(Group=='By Week' & State !='United States' & Year==2020) %>%
streamgraph(key="State", value="COVID.19.Deaths", date="MMWR.Week", height="300px", width="800px", scale = "continuous") %>%
    sg_fill_tableau(palette = "bluered12") %>%
    sg_legend(show=TRUE, label="State: ")%>%sg_axis_x(20)%>%sg_axis_y(0)

# export to an interactive HTML
# saveWidget(p, file="stream.html")`,
		},
		{
			line: 'This visualization shows that COVID-19 deaths in the US experienced a sharp increase from March 2020, peaking in January 2021. Subsequently, the rate of COVID-19 deaths began to decline, attributed to vaccination efforts, social distancing measures, and increased safety protocols. Overall, the death rate due to COVID-19 in the US has exhibited a fluctuating pattern, with periods of decline followed by resurgences. When examining individual state charts in comparison to the overall trend of the country, it becomes clear that the temporal patterns of death numbers can vary significantly. This demonstrates that the Stream graph is an effective tool for visualizing the overall trend of multiple categories, but is less suitable for exploring individual categories.',
		},
	],
	STATIC: [
		{
			line: '<span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Static Implementation in R—</span>You may find this visualization technique useful for creating charts in a publication or a report. After analyzing the data and preparing for the task, we set the theme for the static charts to avoid the need to repeat the code for each chart individually and to maintain consistency in the visual style across all charts. By setting a theme, we can define certain design elements, such as colors, fonts, and other visual attributes, that will apply to all of our charts. This not only saves time and reduces the risk of errors, but it also ensures that our visualizations are cohesive and easily recognizable as part of a set.',
			code: `#set the theme
theme_update(
    plot.background = element_rect(fill = "#FFFFFF", color = "#FFFFFF"),
    panel.background = element_rect(fill = "#FFFFFF", color = NA),
    axis.text.x = element_text(angle=0, face = "plain", color = "black", size = 10, hjust=1, vjust = 1, margin = margin(r = 0)),
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
    plot.title = element_text(face = "bold", color = "black", size = 11, hjust = 0, margin = margin(b = 15, l=0)),
    plot.subtitle = element_text(face = "plain", color = "#737c7d", size = 10, hjust = 0, margin = margin(b = 20, l=10)),
    legend.text=element_text(face = "plain", color = "black", size = 11),
    legend.title = element_text(face = "bold", color = "black", size = 12),
    legend.position = "bottom")`,
		},
		{
			line: '<br> To generate a static version of the chart, we utilize the <code>ggstream</code> and <code>ggplot2</code> libraries. The <code>geom_stream()</code> used in the following code is a geometric object in the <code>ggplot2</code> package in R that can be used to create stream graphs. In this function, the <code>x-axis</code> represents time, the <code>y-axis</code> represents the value of each data series, and the <code>fill</code> color is used to show each data series.',
			code: `# install.packages("remotes")
# remotes::install_github("davidsjoberg/ggstream")
library(ggstream)
library(ggplot2)

df = read.csv("https://data.cdc.gov/api/views/r8kw-7aab/rows.csv?accessType=DOWNLOAD")
states_of_interest = c("Florida", "New York", "Texas", "Massachusetts", "California")
colors <- c("#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c")

df %>% filter(Group=='By Week' & State %in% states_of_interest & Year==2021) %>%
    ggplot(aes(x = MMWR.Week, y = COVID.19.Deaths, fill = State)) +
    ylab("COVID-19 Deathsl") +
    xlab("Week Number") +
    geom_stream() +
    scale_fill_manual(values = colors)
ggsave("static_stream.png", width = 10, height = 5)`,
		},
	],
};
