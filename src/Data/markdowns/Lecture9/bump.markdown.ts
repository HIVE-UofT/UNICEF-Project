export const markdowns: Record<string, { line?: string; code?: string }[]> = {
	PART1: [
		{
			line: 'Visualizing comparisons in the <b>public health domain</b> is particularly important for emphasizing differences and similarities between various datasets or groups. By facilitating the side-by-side examination of different populations, interventions, or health outcomes, comparative visualizations help decision-makers identify disparities and prioritize actions accordingly. This process enables the development of targeted strategies and the effective allocation of resources to address the most pressing public health issues. Moreover, comparative visualizations can reveal the effectiveness of different interventions or policies, allowing for the replication of successful approaches and the modification of less effective ones. Overall, utilizing these visualization techniques in public health enhances understanding, fosters informed decision-making, and contributes to more effective public health initiatives.',
		},
		{
			line: 'To prepare the data for bump (rank) chart, we will need to processe our dataset (df) to calculate the ranking of states based on their monthly averages (<code>monthly_avg</code>) and perform some additional transformations:</br></br><ul style="list-style:disc inside none;"><li>Select the <b>month</b>, <b>state</b>, and <b>monthly_avg</b> columns from the dataset (df).</li><li>Convert the <b>month</b> column into a factor variable.</li><li>Group the data by <b>month</b> and <b>state</b>.</li><li>Calculate the sum of unique <b>monthly_avg</b> values for each group and store it in a new column called <b>points</b>.</li><li>Regroup the data by <b>state</b> and arrange it by <b>state</b> and <b>month</b></li><li>Calculate the total sum of <b>points</b> for each state and store it in a new column called <b>points_sum</b>.</li><li>Calculate the cumulative sum of <b>points</b> within each state and store it in a new column called <b>points_cum</b>.</li><li>Regroup the data by <b>month</b> and arrange it in descending order of <b>points_cum</b> and <b>points_sum</b>.</li><li>Assign a rank based on the order of the rows within each group, storing it in a new column called <b>rank</b>.</li><li>Convert the <b>month</b> factor variable back into a numeric value and store it in a new column called <b>month_num</b>.</li><li>Reorder the levels of the \'state\' factor variable based on the total points in descending order and store the result in a new column called <b>state_name</b>.</li></ul>',
			code: `month = unique(c(df$month))
state_n = length(unique(c(df$state)))
month = sort(factor(month, levels = month.name)) #sorting the months

length = length(levels(month)) #--this value defines the number of intervals and margins

df_rank <-
    df %>%
    dplyr::select(month, state, monthly_avg) %>%
    mutate(month = factor(month))%>%
    group_by(month, state) %>%
    summarize(points = unique(monthly_avg)) %>%
    group_by(state) %>%
    arrange(state, month) %>%
    mutate(
    points_sum = sum(points),
    points_cum = cumsum(points)
    ) %>%
    group_by(month) %>%
    arrange(-points_cum, points_sum) %>%
    mutate(rank = row_number()) %>%
    ungroup() %>%
    mutate(
    month_num = as.numeric(month),
    state_name = fct_reorder(factor(state), -points_sum)
    )

cols <- c(
    "#450920", "#0081a7", "#a53860", "#d90429", "#da627d", "#ffa5ab",
    "#455e89", "#2e6f95",  "#cb997e", "#FFCB69", "#f9dbbd","#2ec4b6",
    "#6b705c", "#0a9396", "#577590", "#8a5a44", "#354f52", "#bee3db",
    "#4d194d", "#b21e35", "#f4845f", "#f79d65", "#87bba2",
    "#fec89a", "#bfa89e", "#736f72", "#d5c7bc", "#6f2231",
    "#02c39a", "#63647e", "#b69121", "#856a5d", "#608460",
    "#455e89", "#2e6f95", "#1780a1", "#0091ad", "#B34525",
    "#FCD306", "#9AD1E8", "#D44F4C", "#BB1A4E", "#A5C254",
    "#882B1A", "#676564", "#E8751C", "#FFFFFF", "#646E3F",
    "#9D49B9", "#C09F2F", "#65955B", "#284D95", "#B34525"
)`,
		},
		{
			line: 'The following code snippet creates the bump chart using the <code>ggplot2</code> package in R, which visualizes the ranking of US states based on the number of COVID-19 cases in 2021. The variable <code>df_rank</code> represents the dataset containing the necessary information for plotting. Here is a breakdown of what each part of the code does:</br></br><ul style="list-style:disc inside none;"><li><code>ggplot(aes(x = month_num, y = rank, color = state_name, group = state_name))</code>: Initializes the ggplot object and sets the aesthetics for the plot. The x-axis represents the month, the y-axis represents the rank, and the colors are determined by the state names.</li><li><code>geom_segment()</code>: Creates horizontal white gridlines for each state.</li><li><code>geom_segment(aes( x = 1, xend = 1, y = 1, yend = state_n ), color = "grey", size = .05)</code>: Creates a vertical grey line at the starting point of the bump chart.</li><li><code>geom_bump(smooth = 20, size = 2)</code>: Draws the bump chart lines with a smoothness of 20 and a line size of 2.</li><li><code>geom_point()</code>: Adds points to the plot. The first two <code>geom_point()</code> functions add points at the beginning and end of the bump chart with larger size and stroke, while the third <code>geom_point()</code> function adds points to the chart with specified shape, fill, and stroke.</li><li><code>geom_text()</code>: Adds text labels to the plot. The first two <code>geom_text()</code> functions add state abbreviations and rankings at the beginning of the bump chart, and the next two <code>geom_text()</code> functions add state abbreviations and rankings in bold at the end of the bump chart.</li><li><code>coord_cartesian(clip = "off")</code>: Adjusts the plot limits to ensure that all data points and labels are visible, even if they fall outside the data range.</li><li><code>scale_x_continuous(), scale_y_reverse(), and scale_color_manual()</code>: Customize the x and y axis scales and the color scheme of the plot.</li><li><code>labs()</code>: Adds a title to the x-axis and a caption for the data source.</li></ul></p>',
			code: `bc<- df_rank %>%
ggplot(aes(x = month_num, y = rank, color = state_name, group = state_name)) +
geom_segment(data = tibble( x = 1, xend = length, y = 1:state_n), #--number of states
    aes(x = x, xend = xend, y = y, yend = y ),
    color = "white", size = .15, inherit.aes = FALSE ) +
geom_segment(aes( x = 1, xend = 1, y = 1, yend = state_n ),
    color = "grey", size = .05) +
geom_bump(smooth = 20, size = 2) +
geom_point(data = df_rank %>% filter(month_num == 1), size = 3.5, stroke = 1.5) +
geom_point(data = df_rank %>% filter(month_num == length), size = 3.5, stroke = 1.5) +
geom_point(data = df_rank, size = 3.5, shape = 21, fill = "#f5f3f4", stroke = 1) +
geom_text( data = df_rank %>% filter(month_num == 1), aes(x =0.27, label = state),
    family = "Arial", size = 13.75, inherit.aes = TRUE, hjust=0) +
geom_text( data = df_rank %>% filter(month_num == 1), aes(x =0.82, label = rank),
            family = "Arial", size = 13.75, inherit.aes = TRUE,   hjust=1 ) +
geom_text(data = df_rank %>% filter(month_num == length),
    aes( x = length + 0.15, label = state ),
    family = "arial", size = 13.75, hjust = 0)+
geom_text(data = df_rank %>% filter(month_num == length),
    aes(x = length + 0.63, label = rank),
    family = "Arial", face = "bold",size = 13.75,hjust = 1) +
# coord_cartesian(clip = "off") is used to adjust the limits of a Cartesian plot so that all data points are visible,
#even those outside the   range of the data.
coord_cartesian(clip = "off") +
scale_x_continuous(expand = c(.001, .001), limits = c(0.2, length+.7), breaks = 1:length, labels = levels(month), sec.axis = dup_axis()) +
scale_y_reverse(expand = c(.03, .03),breaks = 1:length) +
scale_color_manual(values = cols,guide = F) +
labs(x = "Ranking of US States based on the Number of COVID Cases in 2021", caption = "Data by https://www.cdc.gov/")
#save the plot
ggsave("rank.jpeg", width = length, height = max(state_n-(state_n/2)-.5, 2.25))`,
		},
	],
};
