import { isEmpty, startCase } from "lodash"

const RenderTable = ({heads,bodies}) =>{

  return (
		<table>
			<thead>{!isEmpty(heads) && heads.map((head, i) => <th key={i}>{startCase(head)}</th>)}</thead>
			<tbody>
				{!isEmpty(bodies) ? (
					bodies.map((row, rowIndex) => (
						<tr key={rowIndex + 1}>
							{row.map((cell, cellIndex) => (
								<td key={cellIndex + 1}>{cell}</td>
							))}
						</tr>
					))
				) : (
					<tr>
						<td colSpan={heads.length} className='text-center  text-red-500 py-5'>
							No data available
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);


}

RenderTable.defaultProps = {
	heads: [],
	bodies: [],
};

export default RenderTable;