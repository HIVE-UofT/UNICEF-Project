import { FC } from 'react';
import FaIcon from '../FaIcon';
import { openGoogleColab } from '@src/Tools/Utils/Web';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { classes, copyToClipboard } from '@src/Tools/Utils/React';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type props = {
	code: string;
	language?: string;
	contentClass?: string;
};

const SourceCode: FC<props> = ({ code, language, contentClass }) => {
	return (
		<div className='source-code w-full'>
			<div className='header'>
				<h3>Source code</h3>
				<p>You can edit source code and see result.</p>
			</div>
			<div {...classes('content', !!contentClass ? contentClass : '')}>
				<SyntaxHighlighter language={language} style={atomOneLight} children={code} />
			</div>
			<div className='mt-2 flex'>
				<span
					className='flex cursor-pointer text-sm font-medium text-primary'
					onClick={async () => {
						await copyToClipboard(code);
						openGoogleColab('https://colab.research.google.com/');
					}}>
					Copy the code and open Colab <FaIcon className='w-4' fa='r-angle-right' />{' '}
				</span>
			</div>
		</div>
	);
};

export default SourceCode;
