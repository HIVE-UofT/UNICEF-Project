import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/chord.svg';
import Chart from './Chart';

const Chord = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<Chart />
		</Lecture>
	);
};

export default Chord;

const data = {
	title: 'Chord Diagram',
	subtitle: "Circular presentation of relationships' density and flow!",
	description: (
		<p>
			Chord diagrams are used to represent the relationships both within and between multiple entities or categories. Each
			category is depicted by a proportionally sized segment placed around the perimeter of a circle. The size of the
			connecting chords reflects the strength of the relationship between the entities, while the color of each chord
			indicates the dominant direction of flow in a bi-directional relationship and the first category in a bipartite
			relationship. It is important to note that the length of each chord is defined by the chart design and does not convey
			any additional information about the relationships.
		</p>
	),
	whenToUse: (
		<span>
			A chord diagram is used when you want to visualize relationships or connections between different entities in a
			circular layout. It is particularly useful when displaying relationships between different categories or items, such
			as the flow of treatments, services, or information. These diagrams can also help reveal patterns or trends in the
			connections, making it easier to identify areas of interest or concern. Another scenario where chord diagrams are
			beneficial is when comparing the strength of relationships between entities. By varying the width of the connecting
			arcs, the diagrams can illustrate the magnitude or intensity of connections, offering a clear visual representation of
			these differences. Chord diagrams are especially effective when working with a limited number of entities or
			categories, as they can become cluttered and difficult to read when too many elements are involved. In such cases,
			alternative visualization methods may be more appropriate.
		</span>
	),
	example: (
		<span>
			The following chord diagram presents presents consecutive diagnoses recorded for patients admitted to ICU, using the{' '}
			<a href='https://physionet.org/content/eicu-crd/2.0/' target='_blank' rel='noreferrer'>
				eICU Collaborative Research Database
			</a>{' '}
			[Diagnosis Table]. The bipartite diagram shows the frequency of diseases' co-occurrence, and the directional
			presentation shows the chronological relationship between different diagnoses categories.
		</span>
	),
};
