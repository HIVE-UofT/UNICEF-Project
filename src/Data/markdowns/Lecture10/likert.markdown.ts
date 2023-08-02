export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	PART1: [
		{
			line: 'We first import the necessary libraries, set the current directory as the working directory, and import the data for analysis. The provided code snippet is performing the following data manipulation steps:</br></br><ul style="list-style:disc inside none;"><li>Selecting specific columns from the dataset, which include `response` and a series of region names (e.g., BC, AB, SK, etc.).</li><li>Removing row names from the dataset and converting the <code>response</code> column into row names. This operation changes the data structure, making it more suitable for further manipulation.</li><li>Converting the values in the dataset from percentages to numeric values by removing the <code>%</code> sign and dividing the numbers by 100. This step is done using the <code>mutate_each</code> function, which applies the transformation to each element in the dataset.</li><li>Transposing the data, which swaps the rows and columns. This operation is useful for preparing the data for specific functions or visualizations that require a specific format.</li><li>Finally, the transposed data is converted back to a data frame, and the row names are turned into a new column called <b>Item</b>.</li></ul>',
			code: `library(ggplot2)
library(plotly)
library(dplyr)
library(tibble)
library(tidyverse)
#set the current directory as the working directory
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

data <- read.csv("https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture10/Infoway-Q40.csv")
data <- data %>% select(response, BC,AB,SK,MB,ON,QC,ATL, TERR) %>%
    remove_rownames %>% column_to_rownames(var="response") %>%
    mutate_each(funs(as.numeric(gsub("%", "", ., fixed = TRUE))))
#transpose the data to prepare it for the likert function
data <- as.data.frame(t(data)) %>%
    rownames_to_column("Item")`,
		},
		{
			line: 'Next, we create a Likert plot using the <code>likert()</code> function from the <code>HH</code> library. The plot shows responses to a survey question about <b>people\'s knowledge of artificial intelligence, using reversed data (lower numbers mean higher knowledge)</b>. The code sets various arguments to customize the plot, including the title, legend, and colors of the bars:</br></br>The <code>ReferenceZero</code> argument is set to 3, which means that a response of <code>3</code> on the Likert scale is considered <code>neutral</code> or neither agree nor disagree. The <code>ylab</code> argument is set to <code>NULL</code>, which means that no label will be displayed on the y-axis. The main argument specifies the title of the plot and the position of the title on the plot. The <code>auto.key</code> argument specifies the appearance of the legend, including the <code>number of columns</code> and whether the order of the legend should be reversed. The <code>as.percent</code> argument is set to <code>F</code>, which means that the values on the <code>y-axis</code> will not be displayed as percentages. Finally, the <code>col</code> argument specifies the colors to be used for the bars in the plot.</br></br>To save the plot, we use <code>png("likert_HH.png", width=12, height = 5, units = "in", res = 720)</code>. This line initiates a new PNG graphics device with the specified properties. The output image file will be named "likert_HH.png," with a width of <code>12</code> inches, a height of <code>5</code> inches, and a resolution of <code>720</code> pixels per inch.</br></br><ul style="list-style:disc inside none;"><li><code>print(plot)</code> prints the plot to the currently active graphics device, which in this case is the PNG file initiated in the previous line.</li><li><code>dev.off()</code> closes the currently active graphics device, effectively ending the process of saving the plot to the PNG file. After executing this line, the "likert_HH.png" file will be finalized and saved in your working directory.</li></ul>',
			code: `library(HH)

# ReferenceZero=2 # to define the refence sero location
plot <- likert(Item~., rev(data),
                ylab = NULL,
                xlab = NULL,
                main = list("How knowledgeable are you about what artificial intelligence is?", x=unit(.51, "npc")),
                auto.key = list(columns = 4, reverse.rows = F), as.percent = F,
                                col = c("#e63946","#ffddd2","#a8dadc","#1d3557"))

#save the plot
png("likert_HH.png", width=12, height = 5, units = "in", res = 720)
print(plot)
dev.off()`,
		},
	],
	PART2: [
		{
			line: '<span style="font-size: 20px;font-family: Gotham, sans-serif;text-align: left;font-weight: 100;color: #e29578;">Alternative Implementation—</span>The following code snippet provides an alternative implementation for this technique and performs a series of data preparation steps and creates a Likert chart using the \'likert\' package. Here\'s a breakdown of the code:</br></br><ul style="list-style:disc inside none;"><li>The <code>Item</code> column is extracted from the data and assigned to a new variable called <code>Item</code>.</li><li>The response categories (Very knowledgeable, Moderately knowledgeable, etc.) are extracted as vectors from the data.</li><li>A data frame called <code>df</code> is created by combining the extracted vectors along with a <code>neutral</code> column filled with zeros.</li><li>The column names in <code>df</code> are renamed to match the original response categories.</li><li>The <code>likert</code> function is used to create a summary of the data, which is then plotted using the \'plot\' function.</li><li>Several arguments are passed to the <code>plot</code> function to customize the appearance of the chart, such as disabling the percentage display for the neutral category, setting the legend position, and adjusting text size.</li><li>The <code>scale_fill_manual</code> function is used to define custom colors for the response categories.</li><li>The legend title is set to "Responses" using the \'guides\' function, and the legend order is left unchanged (not reversed).</li><li>The width of the bars in the Likert chart is adjusted by directly modifying the \'width\' parameter of the corresponding layers (layers 2 and 3) in the plot object <code>p</code>.</li></uL></br>After executing this code, a Likert chart will be created and stored in the \'p\' variable, ready for further customization or display.',
            code: `library(likert)
library(plyr)
library(ggplot2)
library(plotly)
library(dplyr)
library(tibble)
library(tidyverse)
library(ggplot2)

data <- read.csv("Q40.csv")
data <- data %>% select(response, BC,AB,SK,MB,ON,QC,ATL, TERR) %>%
    remove_rownames %>% column_to_rownames(var="response") %>%
    mutate_each(funs(as.numeric(gsub("%", "", ., fixed = TRUE))))
data <- as.data.frame(t(data)) %>%
    rownames_to_column("Item")

#data preparation
Item <- data$Item
vk = as.vector(data$\`Very knowledgeable\`)
mk = as.vector(data$\`Moderately knowledgeable\`)
ceutral = neutral <- c(0,0,0,0,0,0,0,0)
nvk = as.vector(data$\`Not very knowledgeable\`)
nk = as.vector(data$\`Not at all knowledgeable\`)

df <- data.frame(Item,nk,nvk,neutral,mk,vk)
df <- df  %>%
    rename("Very knowledgeable" = vk,
            "Moderately knowledgeable" = mk,
            "Not very knowledgeable" = nvk,
            "Not at all knowledgeable" = nk)

#plot
p<- plot(likert(summary = df),  plot.percent.neutral=FALSE,
            legend.position="right", text.size = 5) +
scale_fill_manual(values = c("#e63946","#ffddd2", "#edf2f4", "#f1faee", "#a8dadc"),
                    breaks = c("Not at all knowledgeable","Not very knowledgeable", "Neutral","Moderately knowledgeable","Very knowledgeable"))+
                    guides(fill = guide_legend(title="Responses", reverse = FALSE))

# modify the width of bars
p$layers[[2]]$geom_params$width = 0.75
p$layers[[3]]$geom_params$width = 0.75

#save the plot
ggsave("likert.png", width=12, height =3.75)`
		},
	],
};
