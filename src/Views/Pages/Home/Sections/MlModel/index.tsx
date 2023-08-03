import './index.scss';
import {instructor} from "@data/home.data";

const MlModel = () => {



	return (
		<div className='contact-us' id='contact-us' >
			<h2 className='mb-1' >Machine Learning Models</h2>
				<iframe id="serviceFrameSend"
						style={{height: '600px', width:'100%'}}	src="http://178.128.236.200:8501/"
						frameBorder="0"></iframe>

		</div>
	);
};

export default MlModel;
