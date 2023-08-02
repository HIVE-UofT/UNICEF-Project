import { FC } from 'react';
import { If } from 'tsx-statements';
import ReactMarkdown from 'react-markdown';
import { classes } from '@src/Tools/Utils/React';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import rehypeRaw from 'rehype-raw';

type props = {
	data: {
		line?: string | undefined;
		code?: string | undefined;
	}[];
	language: 'r' | 'python';
};
const Tutorial: FC<props> = props => {
	return (
		<div className='tutorial'>
			{props?.data.map(({ line, code }, i) => (
				<>
					<If condition={!!line}>
						<ReactMarkdown children={line || ''} className='mb-4' rehypePlugins={[rehypeRaw]} />
					</If>
					<If condition={!!code}>
						<SyntaxHighlighter
							{...classes('mb-4')}
							language={props.language}
							style={atomOneLight}
							children={code || ''}
						/>
					</If>
				</>
			))}
		</div>
	);
};

export default Tutorial;
