import React from 'react';

const COLORS = ['#673ab7', '#2196f3', '#26a69a', '#e91e63'];

const Definition = (props) => {
	const styles = {
		color: '#fff',
		padding: '10px',
		backgroundColor: COLORS[props.index],
	}
	return (
		<div className="card text-center" style={styles}>
			{props.def}
		</div>
	)
};

export default Definition;
