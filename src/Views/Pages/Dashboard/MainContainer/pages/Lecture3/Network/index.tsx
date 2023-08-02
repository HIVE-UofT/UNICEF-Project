import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/network.svg';
import Chart from './Chart';

const Network = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<Chart />
		</Lecture>
	);
};

export default Network;

const data = {
	title: 'Network Graph',
	subtitle: 'Network visualization of co-occurred words',
	description: (
		<p>
			Co-occurrence networks are a powerful tool for text analysis and natural language processing, used to visualize the
			connections and relationships between different concepts, terms, and entities. They provide a graphical representation
			of the associations between words in unstructured texts, such as clinical notes, social media posts, and other forms
			of text. The networks are created by connecting nodes (words) with edges, where the thickness of each edge represents
			the frequency of the corresponding bi-grams, words that appear together. This visualization is also useful for a
			variety of tasks such as sentiment analysis, text summarization, and topic modeling.
		</p>
	),
	whenToUse: (
		<span>
			The meaning of a word can often be influenced by the context in which it is used. To understand this, network graphs
			can be used to visually present the lexical connections between the terms in a text corpus. To make sure that the
			nodes in the graph are meaningful in the context of data analysis, it is important to perform pre-processing and
			cleaning tasks on the raw data before creating the co-occurrence graph
		</span>
	),
	example: (
		<span>
			The network graph below illustrates the most common bi-grams (word pairs) found in two collections of free-text chief
			complaints from triage nurses, collected from 2019 to 2020 at an academic medical center in the Deep South. These
			complaints were limited to 282 characters in length.
		</span>
	),
};
