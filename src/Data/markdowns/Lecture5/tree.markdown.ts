export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	PYTHON: [
		{
			line: '<p>After analyzing the data and selecting appropriate variables, we use the logarithmic function (<code>log()</code>) to normalize the size of the nodes in our visualization. We add this normalized size as a new variable to our data frame, which we named <code>size</code> in our example. This is necessary due to the substantial variance in the number of deaths among subcategories, as normalizing the node size helps to create a more aesthetically pleasing and balanced visual representation. Using the R <code>collapsibleTreeSummary()</code> function, we create an interactive tree structure in the <code>d3tree</code> package, where each node represents a category with a specified numeric variable (e.g. number of deaths), and can be expanded or collapsed to reveal more or less detail.</br></br>The <code>maxpercent</code> parameter in this function shows the maximum percentage value used for the color scale mapping. Nodes with values higher than this maximum value will be colored the same as the maximum value, although their order will still be preserved. If the maximum value is set too high, it may be hard to distinguish between nodes with many children.<p>',
			code: `library(dplyr)
#devtools::install_github("AdeelK93/collapsibleTree")
library(collapsibleTree)
library(htmlwidgets)
library(widgetframe)
library(d3tree)
library(pandoc)
#read the data
df = read.csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture02/US-COVID-Death/Death_causes_USA_COVID.csv")

# filter the data
df<-df %>% filter(Group=='By Total' & State=='United States' & Age.Group != c("Not stated", "All Ages") &
                    Condition.Group == c('Circulatory diseases', 'Sepsis', 'Malignant neoplasms', 'Diabetes', 'Obesity', 'Alzheimer disease', 'Vascular and unspecified dementia', 'Renal failure', 'Intentional and unintentional injury, poisoning, and other adverse events'))

#to adjust the size of the nodes
df$size = log(df$COVID.19.Deaths)
# plot
p<- collapsibleTreeSummary(df,
        hierarchy = c("Condition.Group", "Condition", "Age.Group"),
        height  = 800,
        width = 600,
        nodeSize = "size",
        attribute = "COVID.19.Deaths",
        root = "Deaths",
        fontSize = 12,
        maxPercent = 80,
        percentOfParent= FALSE, # Change the display of the attribute tooltip from showing the
                                #actual value of the attribute to showing the attribute as a
                                #percentage of its parent value.
        zoomable = TRUE #if changed to false, the size of the tree is not adjustable anymore
                                
    )
# save the plot as a standalone html file
saveWidget(frameableWidget(p),'collapsibleTree.html', selfcontained = TRUE)`,
		},
	],
};
