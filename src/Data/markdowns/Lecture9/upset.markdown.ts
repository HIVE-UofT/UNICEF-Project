export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	PART1: [
		{
			line: "We first import the necessary libraries, set the current directory as the working directory, and import the data for analysis. After reading and preprocessing the data:</br></br><ul style=\"list-style:disc inside none;\"><li>The code first adds a new column to the dataset called <code>b_value</code>. This column contains boolean values (<b>TRUE</b> or <b>FALSE</b>) based on whether the value in the <code>VALUE</code> column is greater than 50 (feel free to change this value).</li><li>It then filters the dataset based on several conditions, keeping only rows that satisfy all of the following criteria:<ul style=\"list-style:circle inside none; margin-left:20px;\"><li>The <code>REF_DATE</code> column contains the value <i>2015</i>.</li><li>The <code>UOM</code> column contains the value <i>Percent</i>.</li><li>The <code>Characteristics</code> column contains the value <i>Percent</i>.</li><li>The <code>Sex</code> column contains the value <i>Females</i>.</li><li>The <code>Age</code> group column contains the value <i>50 to 64 years</i>.</li><li>The <code>GEO</code> column contains one of the following values: <i>'Alberta', 'Ontario', 'British Columbia', 'Manitoba'</i>, or <i>'Saskatchewan'</i>.</li><li>The <code>Age</code> group column does not contain the value <i>Total, 12 years and over</i>.</li><li>The <code>GEO</code> column does not contain the value <i>Canada (excluding territories)</i>.</li></ul></li></ul>",
		},
		{
			line: 'After these operations, the updated dataset is assigned back to the variable <code>data</code>. Then the code filters the data to keep only rows that have non-missing values for <code>Age group</code>, <code>Sex</code>, and <code>Indicators</code> columns. It then selects the <code>Indicators</code>, <code>b_value</code>, and <code>GEO</code> columns from the filtered data. Next, the code reshapes the data using the <code>pivot_wider()</code> function, which spreads the <code>GEO</code> column into multiple columns, with the values from the <code>b_value</code> column filling in the cells. The reshaped data is then converted into a data frame. Afterward, the code removes row names and assigns the <code>Indicators</code> column as the row names for the data frame. Finally, any remaining missing values (NA) in the processed data frame are replaced with <code>FALSE</code>.',

			code: `#this script is only necessary if local files are being read.
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

library(upsetjs)
library(readr)
library(dplyr)
library(tidyr)
library(tidyverse)
library(widgetframe)

#read the data
data <- read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture09/Health%20Charcteristics/13100096.csv")

data <- data %>%
    mutate(b_value = ifelse(VALUE>75, TRUE, FALSE)) %>% #define the threshold
    filter(UOM == "Percent" & Characteristics=="Percent" & Sex == "Females"
            & REF_DATE== 2015 & \`Age group\`!="Total, 12 years   and over" & GEO!="Canada (excluding territories)"
            & \`Age group\`=="50 to 64 years" & GEO %in% c('Alberta', 'Ontario', 'British Columbia', 'Manitoba', 'Saskatchewan'))

# Pre-process the data: Extract age group, gender, and self-perceived health
data_processed <- data %>%
    filter(!is.na(\`Age group\`) & !is.na(Sex) & !is.na(Indicators)) %>%
    select(Indicators, b_value, GEO) %>% pivot_wider(names_from = GEO, values_from = b_value)
#convert the processed data to a dataframe
data_processed <- as.data.frame(data_processed)
data_processed<- data_processed %>%
        remove_rownames() %>%
        column_to_rownames(var = 'Indicators')
#convert missing values to 'FALSE' to indicate their absence in the set
data_processed[is.na(data_processed)] <- FALSE`,
		},
		{
			line: '>Our dataset displays the percentage of Canadians who chose specific health characteristics mentioned in the survey, focusing on characteristics selected by more than 75% of participants. The data is stratified by provinces and age groups. We aim to examine the intersections between provinces based on the number of health characteristics chosen by their citizens, taking into account the selected threshold.</br></br>To achieve this, we employ the <code>UpSet.js</code> library, which is an <b>R</b> wrapper for the <code>UpSet.js</code> JavaScript library. This library specializes in creating Venn diagrams and UpSet plots to visualize the intersections of multiple sets. Here is a step-by-step explanation of the code:</br></br><ul style="list-style:disc inside none;"><li><code>upsetjsVennDiagram()</code>: This function initializes an <code>UpSet.js</code> Venn diagram object.</br><code>%>%</code>: The pipe operator is used to chain multiple operations together in a clean and readable way. The output from the previous operation becomes the input for the next operation.</li><li><code>fromDataFrame(data_processed)</code>: This function takes the input Venn diagram object and populates it with data from a processed data frame named <code>data_processed</code>. The <code>UpSet.js</code> Venn diagram object now contains the data needed to generate the Venn diagram.</li><li><code>interactiveChart()</code>: This function adds interactivity to the Venn diagram, allowing users to interact with the chart, such as clicking and hovering over the diagram elements.</li><li><code>chartTheme(selection.color="#b54766", has.selection.opacity=0.3)</code>: This function customizes the appearance of the Venn diagram by setting the selection color to a specific shade of red (<code>"#b54766"</code>) and setting the opacity of selected elements to <b>0.3</b>.</li></ul>',
			code: `upsetjsVennDiagram() %>%
    fromDataFrame(data_processed) %>%
    interactiveChart() %>%
    chartTheme(selection.color="#b54766", has.selection.opacity=0.3)`,
		},
		{
			line: 'Examining this Venn diagram, we observe that aside from the central section, which illustrates the overlap among all provinces, it is challenging to discern paired comparisons or comparisons involving three or four provinces. To address this issue, we employ UpSet plots. An UpSet plot is preferred over a Venn diagram in the following situations:</br></br><ul style="list-style:disc inside none;"><li><b>Large number of sets</b>: When there are multiple sets to compare, Venn diagrams become cluttered and difficult to interpret, while UpSet plots maintain readability by using a matrix-based approach.</li><li><b>Complex intersections</b>: UpSet plots efficiently represent and visualize the intersections of various sets, even when the overlaps are numerous and intricate, whereas Venn diagrams struggle to display complex relationships clearly.</li><li><b>Quantitative comparison</b> UpSet plots provide a more accurate representation of the size of the sets and their intersections using bar charts, making it easier to perform quantitative comparisons.</li></ul>',
		},
		{
			line: 'In contrast, Venn diagrams are more suitable for visualizing the relationships among a small number of sets (usually up to 4 or 5) with relatively simple intersections, when the primary focus is on understanding the overlaps rather than quantitative comparisons.',
		},
	],
	PART2: [
		{
			line: 'The Upset plot generated from the data illustrates the intersecting sets. The bar charts on the left indicate the size of each set, which represents the number of health indicators selected by a portion of the population greater than the threshold. The top bars indicate the size of the intersecting sets, with intersections being displayed by the connected dots. To observe the effects of a modified function, consider changing <code>generateDistinctIntersections()</code> to <code>generateIntersections()</code> and examining the resulting plot. In the following code snippet, <code>chartLayout(height.ratios=c(0.35, 0.65), width.ratios = c(.3,.2,.5))</code> configures the layout of the UpSet plot by setting the height ratios for the different sections of the plot <code>(0.35 and 0.65)</code> and the width ratios <code>(0.3, 0.2, and 0.5)</code>. Function <code>chartStyleFlags(export.buttons=TRUE)</code> adds export buttons to the UpSet plot, allowing users to export the plot in different formats. Also, <code>generateDistinctIntersections(min = 2, max = NULL, empty = F, order.by = "cardinality", limit = NULL)</code> generates the intersections of sets to be displayed in the UpSet plot. It includes intersections with a <b>minimum of 2 sets</b>, excludes empty intersections, and orders them by the number of elements (cardinality).',

			code: `upset<- upsetjs() %>% fromDataFrame(data_processed)%>%
chartTheme(selection.color="#a4133c", has.selection.opacity=0.3)%>%
chartLayout(height.ratios=c(0.35, 0.65), width.ratios = c(.3,.2,.5))%>% chartStyleFlags(export.buttons=TRUE)%>%
chartLabels(title = "Statistics Canada", description = "Health characteristics, annual estimates")%>%
# setSelection(c("Ontario")) %>% #selecting sets by default
# sort set combinations either by cardinality (number of elements) or by degree (number of sets)
# min = minimum number of sets in a set combination
generateDistinctIntersections(min = 2, max = NULL, empty = F, order.by = "cardinality", limit = NULL) %>%
interactiveChart()

#export to html
htmlwidgets::saveWidget(frameableWidget(upset),'upset_healthsurvey.html', selfcontained = TRUE)`,
		},
		{
			line: 'However, the contributing indicators to the intersections remain unclear. To address this, we have included the <code>addCategoricalAttribute()</code> function in the code, which displays the members of the intersections using colored squares. Hovering over each square reveals the details of the corresponding element, allowing for a more comprehensive understanding of the data.',
		},
	],
	PART3: [
		{
			code: ` #plot
upset<- upsetjs() %>% fromDataFrame(data_processed)%>%
    chartTheme(selection.color="#a4133c", has.selection.opacity=0.3)%>%
    chartLayout(height.ratios=c(0.5, 0.5), width.ratios = c(.3,.2,.5))%>% chartStyleFlags(export.buttons=TRUE)%>%
    addCategoricalAttribute("Variables", as.factor(rownames(data_processed)), categories =rownames(data_processed)) %>%
    chartLabels(title = "Statistics Canada", description = "Health characteristics, annual estimates")%>%
    # setSelection(c("Ontario")) %>%
    generateDistinctIntersections(min = 2, max = NULL, empty = F, order.by = "cardinality", limit = NULL) %>%
    interactiveChart()

htmlwidgets::saveWidget(frameableWidget(upset),'upset_healthsurvey_categories.html', selfcontained = TRUE)`,
		},
	],
};
