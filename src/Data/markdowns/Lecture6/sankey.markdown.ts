export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	PYTHON_PART1: [
		{
			line: '<span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Implementation in Python—</span>After reading and performing basic data cleaning tasks on the data, we must prepare it for the Sankey diagram. Suppose we have a series of columns, each representing one stage of the sequence (as shown in Figure 1). We use the following code snippet to convert the raw data iteratively into a two-column dataframe that presents the source and target nodes of the diagram (Step 1 in Figure 1). Then, we use the <code>size()</code> function to count each unique pair of **(source, target)**, which will determine the thickness of the flows. ',
			code: `import plotly.graph_objs as go
import pandas as pd
import numpy as np


df = pd.read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture06/treatment/Treatments_seq.csv")

# data preparation
df_sankey = pd.DataFrame()
for i in range(len(list(df.columns))-1):
    df_tmp = df.iloc[:,i:i+2]
    df_tmp.columns = ['source', 'target']
    df_tmp = df_tmp.append(df_tmp)
    df_tmp['target'].replace('', np.nan, inplace=True)
    df_tmp.dropna(subset=['target'], inplace=True)
    df_sankey = df_sankey.append(df_tmp)
df_sankey = df_sankey.groupby(['source','target']).size().reset_index().rename(columns={0:'value'})`,
		},
	],
	PYTHON_PART2: [
		{
			line: 'We utilize the <code>go.Sankey()</code> function from <code>Plotly</code> to create ourSankey diagram to demonstrate. To establish connections between the nodes in the diagram, we use the <code>link=dict()</code> argument. By using the <code>link</code> dictionary, we can specify the source and target nodes for each flow, as well as the value or weight of the flow. The <code>pad</code> parameter specifies the padding between the node and its label in pixels. The <code>thickness</code> parameter sets the thickness of each node in pixels.',
			code: `#filtering the nodes based on their frequency
df_sankey = df_sankey[df_sankey['value']>1000]
#-- Generate the labels
labels = df_sankey[['source','target']].values
labels = np.unique(labels).tolist()
df_sankey[['source','target']] =  df_sankey[['source','target']].applymap(lambda x: labels.index(str(x)))
# to define the number of columns
len_df = len(df_sankey.index)

#plot
fig = go.Figure(data=[go.Sankey(
    node = dict(
        pad = 15,
        thickness = 20,
        line = dict(color = "black", width = 0.5),
        label = labels,
        # The formula of defining the colors: 13: # of conditions. We want to make sure we have enought
        # colors in this array, otherwise plotly will use black. Also, the max function is there
        # to ensure when the filter is twords the end we have enough color in our array! If you remove the
        # color = [..] line, plotly will use its default colors.
        color = ["#8d0801", "#ee9b00", "#94d2bd", "#bf0603", "#f4d58d", "#708d81", "#0a9396",
        "#001427", "#892b64", "#6a994e", "#b7094c", "#a5a58d", "#f38375"]*max(int(len_df/10), 10)
    ),
    link = dict(
        source = list(df_sankey['source']),
        target = list(df_sankey['target']),
        value = list(df_sankey['value'])
    ))])

#updating the figure layout
fig.update_layout(title_text="",
font_size=11,
height = 800)
#show the output
fig.show()
#to export to HTML
fig.write_html("Sankey_interactive.html")`,
		},
	],
	R: [
		{
			line: `<span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Implementation in R—</span>For this example, we're using a dataset that provides estimates of interprovincial migrants by province or territory of origin and destination in Canada. The data source is from Statistics Canada and can be found at the following [Data Source](https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1710002201"). Our aim is to use the Sankey visualization technique to explore the impact of COVID-19 on interprovincial migration. By analyzing the flow of migrants between different provinces or territories before and after the onset of the pandemic, we can gain insights into the changes and trends in population movements. This information can be valuable in understanding the broader social and economic impacts of COVID-19, as well as informing policy decisions related to immigration and regional development.</br></br>
            After reading the data and filtering it to a specific year (before the COVID-19 era), we selected only the columns that are of interest and renamed them to make the purpose of the chart more apparent.`,
			code: `# read the data
data = read.csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture06/Canada%20immigration/17100022.csv")
# remove the below expressions from the province name
data <- data %>% mutate_all(~gsub(", province of origin|, province of destination", "", .)) %>%
    filter(REF_DATE=="2017/2018")
# select only columns of interest
data = data[c("REF_DATE", "GEO", "Geography..province.of.destination", "VALUE")]
colnames(data) = c("year", "source", "target", "value")`,
		},
		{
			line: `We then import the required libraries and prepare the data for this specific visualization. We first add a space after each target value using the <code>paste()</code> function. To create a visual representation of the flows, we first need to generate a node data frame that lists all the entities involved in the flow. To use the <code>networkD3</code> package, the connections between nodes must be provided using node ids rather than the actual names used in the links dataframe. Therefore, we need to reformat the data to include node ids instead of the names used in the links dataframe.</br></br>
            Once the data is prepared, we can create the visualization using the <code>sankeyNetwork()</code> function. If needed, we can define a custom color palette for the chart to ensure consistency with other colors used in our dashboard.`,
			code: `# Libraries
library(tidyverse)
library(viridis)
library(patchwork)
library(hrbrthemes)
library(circlize)
library(networkD3)
library(htmlwidgets)

data$target <- paste(data$target, " ", sep="")

# generate the node data
nodes <- data.frame(name=c(as.character(data$source), as.character(data$target)) %>% unique())

# create node IDs
data$IDsource=match(data$source, nodes$name)-1
data$IDtarget=match(data$target, nodes$name)-1

# prepare colour scale
ColourScal ='d3.scaleOrdinal() .range(["#a1bfae","#8e7cc3","#999999","#d5a6bd","#6aa84f","#ef2525","#129cc7","#f1c232","#124a7d","#a20f54"])'

# plot
p<- sankeyNetwork(Links = data, Nodes = nodes,
                        Source = "IDsource", Target = "IDtarget",
                        Value = "value", NodeID = "name",
                        sinksRight=FALSE, colourScale=ColourScal, nodeWidth=40, fontSize=13, nodePadding=20)
saveWidget(p, file="sankey_2017.html", selfcontained = TRUE)`,
		},
		{
			line: `From this Visualization, we can see a decrease in interprovincial migrations to Ontario during COVID-19. Some possible factors include travel restrictions and quarantine requirements, economic uncertainty, job loss, and changes in the housing market. Additionally, remote work arrangements may have led some people to reconsider living in densely populated urban areas, including Toronto, which could have impacted migration patterns. It's worth noting that without a detailed analysis of the data, it's difficult to determine the exact reasons behind the decrease in migration to Ontario during COVID-19.`,
		},
	],
};
