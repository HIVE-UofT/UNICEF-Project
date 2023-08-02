import './index.scss';
import ReactMarkdown from 'react-markdown';
import { title, first_mark, markdowns, figures } from '@src/Data/markdowns/Lecture1/tableau.markdown';
import rehypeRaw from 'rehype-raw';

const Tableau = () => {
	return (
		<div className='l1-tableau'>
			<h1>{title}</h1>
			<ReactMarkdown children={first_mark} className='mb-4' />
			{markdowns.map((markdown, i) => (
				<>
					<ReactMarkdown children={markdown} className='mb-4' rehypePlugins={[rehypeRaw]} />
					<ReactMarkdown children={figures[i]} className='mb-4' />
				</>
			))}
		</div>
	);
};

export default Tableau;
