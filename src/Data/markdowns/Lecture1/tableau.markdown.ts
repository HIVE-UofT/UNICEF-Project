import f1 from '@assets/Images/dashboard/lecture1/L01-1.jpeg';
import f2 from '@assets/Images/dashboard/lecture1/L01-2.jpeg';
import f3 from '@assets/Images/dashboard/lecture1/L01-3.jpeg';
import f4 from '@assets/Images/dashboard/lecture1/L01-4.jpeg';
import f5 from '@assets/Images/dashboard/lecture1/L01-5.jpeg';
import f6 from '@assets/Images/dashboard/lecture1/L01-6.jpeg';
import f7 from '@assets/Images/dashboard/lecture1/L01-7.jpeg';
import f8 from '@assets/Images/dashboard/lecture1/L01-8.jpeg';
import f9 from '@assets/Images/dashboard/lecture1/L01-9.jpeg';
import f10 from '@assets/Images/dashboard/lecture1/L01-10.jpeg';

export const title = 'Tableau Tutorial';

export const first_mark = `Tableau is a data visualization software that allows users to create interactive dashboards, and user sotries to help them better explore and analyze their data. Users can use Tableau's drag-and-drop interface to build dashboards and charts. Tableau is widely used in a variety of industries, including business, finance, healthcare, and government, and is known for its ability to help users uncover insights and trends in their data.`;

export const markdowns = [
	`**START PAGE–** The start page is the first thing you see after you open Tableau Desktop **(Figure 1)**. The \`Connect\` pane on the left side of the screen shows the available data type/sources and allows you to select your dataset. Under the \`Connect\` pane, you can connect to data stored in a file, such as Microsoft Excel, text files, or local databases, or connect to data stored on a server, such as Tableau Server, Microsoft SQL Server, or Google Analytics. Under the \`Open\` tab, you can open workbooks that you have already created. Under the \`Discover\` pane on the light side of the window, you can find additional resources like video tutorials, forums, or the “Viz of the week” to get more ideas about what you can build. The \`Sample\` section shows sample dashboards and worksheets that come with Tableau Desktop. Also, you can click on the \`Tableau\` icon in the top-left corner to toggle between the start page and the authoring workspace.

To import the [Canadian Community Health Survey](https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture01/Canadian-Community-Health-Survey/cchs.csv) dataset into Tableau workspace, first, download the data and store it on your computer. Then, click on \`...More\` under the \`Connect/To a File\` and locate the file on your machine.`,
	`
**WORKSJEET COMPONENTS–** In Tableau, a worksheet is a single page and the primary building block for creating dashboards and storyboards. You can create a worksheet by dragging \`dimensions\` and \`measures\` from your data source onto the \`View\` canvas and then adjusting them to create different visualization types. You can create multiple worksheets in a Tableau workbook and then use them to provide a high-level overview of your data in the form of dashboards or storyboards. You can also combine worksheets to create more complex and sophisticated visualizations. Figure 2 below highlights the major components of a worksheet. However, you will become more familiar with this environment once we work with actual data.


**What are the dimensions and measures?** \`Dimensions\` are categorical fields. These are fields that we want to slice and dice our numerical data by. Dimensions are often discrete. Discrete fields create labels in the chart and are color-coded blue in the data pane and in the view. Dimensions are often contrasted with \`Measures\`, which are numeric values that can be aggregated or calculated in some way. There are different types of measures in Tableau, including sum, average, minimum, maximum, and count. Using mathematical formulas or functions, you can also create calculated fields, which are measures derived from other measures or dimensions. Calculated fields can be used to create more complex and sophisticated visualizations and are a powerful feature of Tableau. Measures are often continuous and their pills are color-coded green.`,
	`**LOLLIPOP IN TABLEAU–** The lollipop chart in Tableau is a composite chart with bars and circles. Like a bar chart, a lollipop chart is used to compare categorical data.
<p>1. We start with a bar chart:</p><ul style="list-style:disc inside none; margin-left: 1.5rem;"></br><li>Drag "Indicators" into Rows Shelf.</li><li>Drag "Value" into Columns Shelf.</li><li>Drag "Value" to the top side of view, Tableau will show you a dashed line. Now it is time to release the left mouse key. A dual-axis is created automatically (See Green Circle in Figure 3).</li></ul>`,
	`
<p>2. We need to synchronize the double y-axes and hide the label for one of these axes:</p></br><ul style="list-style:disc inside none; margin-left: 1.5rem;"><li>Check Synchronize Axis to synchronize two axes.</li><li>Since the two y-axes are synchronized, we can hide the right axis by unchecking Show Header.</li></ul>
</br>
<p>3. Tableau may automatically convert these two views into Circle, so we need to convert the first axis back to Bar:</p></br><ul style="list-style:disc inside none; margin-left: 1.5rem;"><li>Open the first Marks card and change the marker to Bar.</li><li>Expand the Size shelf and adjust the size of the bars and circles to make them more like lollipops.</li></ul>`,
	`
<p>4. To better compare the value indicators for differen age ranges and sex categories over different years, we use the Color variable and add each of the mentioned categorical variables to the Filter Shelf:</p></br><ul style="list-style:disc inside none; margin-left: 1.5rem;"><li>Drag "Value"" into Color under the Circle mark (Value2).</li><li>Drag the highlighted Dimensions in the below Figure to the Drag Shelf and select only one value per variable. Make sure you choose "Percent" for UOM.</li><li>For all instances on the Value variable in the current worksheet, change the Measure setting to Average or Sum.</li></ul>`,
	`
<p>5. To modify the color variable for both Bar and Circle marks, click on Color on the Marks Card to modify the palette/opacity/effects.</p>`,
	`
<p>6. Add well-formatted percentage vluaes on the lollipops:</p></br><ul style="list-style:disc inside none; margin-left: 1.5rem;"><li>Drag "Value" into Label on the Marks Cards ubder the Circle mark.</li><li>Expand Label option to edit the text configuration.</li><li>click on ... next to Text and add a % sign to the right side of the Value parameter.</li><li>To change the format of the labels, click on Label mark/Format/Number (Custom) and change Decimal places to 0.</li><li>Customize the text alignments/font size based on the size of circles in your visualization.</li></ul>`,
	`
<p>7. Final touch ups– In the last step, we add the Filters to our exploration process and sort the lollipops based on the Value parameter:</p></br><ul style="list-style:disc inside none; margin-left: 1.5rem;"><li>Select each of the Sex, Year, Age Group and Geo Filters and select Show Filter.</li><li>Select the Indicator label on the y-axis and sort the bars/circles based on the Value metric.</li><li>Select To ensure a single selection for each filter, expand each filter on the right side of the worksheet and select a Single Value option.</li></ul>`,
	`
<p>8. Edit the Title by double clicking on the text. To make the title dynamic and sunced with the defined filters, select the parameters that you want to include in the title by clicking on Insert on the toolbar. </p>`,
	`If all goes well, we should have the following view:  `,
];

export const figures = [
	`![](${f1})
*Figure 1. Start Page in Tableau*`,
	`![](${f2})
*Figure 2. Worksheet Components*`,
	`![](${f3})
*Lollipop Chart in Tableau– Step 1*`,
	`![](${f4})
*Lollipop Chart in Tableau– Steps 2-3.*`,
	`![](${f5})
*Lollipop Chart in Tableau– Step 4*`,
	`![](${f6})
*Lollipop Chart in Tableau– Step 5.*`,
	`![](${f7})
*Lollipop Chart in Tableau– Step 6*`,
	`![](${f8})
*Lollipop Chart in Tableau– Step 7*`,
	`![](${f9})
*Lollipop Chart in Tableau– Step 8*`,
	`![](${f10})
*Lollipop Chart in Tableau*`,
];
