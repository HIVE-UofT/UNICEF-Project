import imga from '@assets/Images/dashboard/lecture1/CHL5230-Lecture 2-KNN&Kmeans.jpg'
export const Python2 = () => {
	return (
		<iframe id="serviceFrameSend"
			style={{height: '95%'}}	src='Python BasicsII.html'
				frameBorder="0"></iframe>
	);
};

export const KNN = () => {
	return (
		<iframe id="serviceFrameSend"
				style={{height: '95%'}}	src='K-NN.html'
				frameBorder="0"></iframe>
	);
};
// export const SvU = () => {
// 	return (
// 		<iframe id="serviceFrameSend"
// 				style={{height: '100%',zIndex:'999'}}	src='l2/index.html'
// 				frameBorder="0"></iframe>
// 	);
// };
export const SvU = () => {
	return (
		<img src={imga} style={{height: '100%',zIndex:'999'}} />
	);
};


export const Kmeans = () => {
	return (
		<iframe id="serviceFrameSend"
				style={{height: '100%',zIndex:'999'}}	src='K-Means.html'
				frameBorder="0"></iframe>
	);
};

