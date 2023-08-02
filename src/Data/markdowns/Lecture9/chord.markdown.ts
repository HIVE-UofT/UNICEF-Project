export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	PART1: [
		{
			line: 'This R code creates a chord diagram using the <code>chorddiag</code> library, which is a wrapper for the <code>d3-chord JavaScript</code> library. Here is a step-by-step explanation of the code:</br></br><ul style="list-style:disc inside none;"><li>Convert the <i>Diagnosis_1</i> and <i>Diagnosis_2</i> columns in <i>df</i> to factors. This is important for proper handling of categorical variables in R.</li><li>Select only the <i>Diagnosis_1, Diagnosis_2</i>, and <i>freq</i> columns from df, and assign the filtered data frame back to df.</li><li>Create a copy of df called <code>df_filter</code>.</li><li>Convert <code>df_filter</code> to an <code>adjacency matrix</code>, which represents a graph where the rows and columns are diagnoses, and the cell values represent the frequency of co-occurrences between the diagnoses.</li><li>Define a vector of <b>custom colors</b> to be used in the chord diagram.</li><li>Create the chord diagram using the chorddiag function with the following custom settings:</br><ul style="list-style:circle inside none; margin-left:20px"><li><code>groupnamePadding</code>: Space between the group names and the outer edge of the diagram.</li><li><code>groupPadding</code>: Space between the groups in the diagram.</li><li><code>groupColors</code>: Custom color palette for the groups.</li><li><code>groupnameFontsize</code>: Font size for the group names.</li><li><code>showTicks</code>: Whether to show tick marks on the diagram (set to FALSE).</li><li><code>margin</code>: Margin around the diagram.</li><li><code>chordedgeColor</code>: Color for the edges of the chords in the diagram.</li></ul></li><li>Save the generated chord diagram as an HTML file named <i>chord_diagnosis.html</i>, which can be opened in a web browser for viewing.</li></ul>',
			code: `library(dplyr)
library(tidyverse)
library(tidygraph)
# devtools::install_github("mattflor/chorddiag", build_vignettes = TRUE)
library(chorddiag)
library(igraph)
library(widgetframe)

df <- read_csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture09/Disease%20Co-occurrence/treatments.csv")

df$Diagnosis_1 <- as.factor(df$Diagnosis_1)
df$Diagnosis_2 <- as.factor(df$Diagnosis_2)

df<-df %>% select(Diagnosis_1, Diagnosis_2, freq )
df_filter<-df

df_filter<-as.matrix(as_adjacency_matrix(as_tbl_graph(df_filter),attr = "freq"))
colors = c("#001219","#005f73","#fdf0d5","#c1121f","#669bbc","#003049","#ffbc42",
            "#bb3e03", "#a5668b", "#b5b682", "#06d6a0","#708d81", "#c89f9c","#d1b3c4","#a01a58")
#plot
chord<- chorddiag(data = df_filter,
                groupnamePadding = 11,
                groupPadding = 3,
                groupColors = colors,
                groupnameFontsize = 10 ,
                showTicks = FALSE,
                margin=80,
                # tooltipGroupConnector = ' &#x25B6; ',
                # type = 'directional',
                chordedgeColor = "#B3B6B7"
)

#export the chart
htmlwidgets::saveWidget(frameableWidget(chord),'chord_diagnosis.html', selfcontained = TRUE)`,
		},
	],
};
