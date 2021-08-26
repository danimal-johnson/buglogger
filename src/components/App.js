import React, { useState, useEffect } from 'react';
import { Container, Table, Alert } from 'react-bootstrap';
// import Table from 'react-bootstrap/Table';
import LogItem from './LogItem';
import AddLogItem from './AddLogItem';
import { ipcRenderer } from 'electron';

const App = () => {
	// const [logs, setLogs] = useState([
	// 	{
	// 		_id: 1,
	// 		text: 'This is log one',
	// 		priority: 'low',
	// 		user: 'Brad',
	// 		created: new Date().toString(),
	// 	},
	// 	{
	// 		_id: 2,
	// 		text: 'This is log two',
	// 		priority: 'moderate',
	// 		user: 'Brad',
	// 		created: new Date().toString(),
	// 	},
	// 	{
	// 		_id: 3,
	// 		text: 'This is log three',
	// 		priority: 'high',
	// 		user: 'Kate',
	// 		created: new Date().toString(),
	// 	},
	// ]);
	const [logs, setLogs] = useState([]);
	const [alert, setAlert] = useState({
		show: false,
		message: '',
		variant: 'success',
	});
	
	useEffect(() => {
		ipcRenderer.send('logs:load');
		ipcRenderer.on('logs:get', (event, data) => {
			setLogs(JSON.parse(data));
		});
	}, []);

	function addItem(item) {
		if (item.text === '' || item.user === '' || item.priority === '') {
			showAlert('Please fill in all fields.', 'danger');
			return;
		}

		item._id = Math.floor(Math.random() * 90000) + 10000;
		item.created = new Date().toString();
		console.log(item);
		setLogs([...logs,	item]);
		showAlert('Log added successfully');
	}

	function deleteItem(_id) {
		setLogs(logs.filter(log => log._id !== _id));
		showAlert('Log removed successfully');
	}

	function showAlert(message, variant = 'success', seconds = 3) {
		setAlert({
			show: true,
			message,
			variant,
		});
		setTimeout(() => {
			setAlert({
				show: false,
			});
		}, seconds * 1000);
	}

	return (
		<Container>
			<AddLogItem addItem={addItem} />
			{alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
			<Table>
				<thead>
					<tr>
						<th>Priority</th>
						<th>Log Text</th>
						<th>User</th>
						<th>Created</th>
					</tr>
				</thead>
				<tbody>
					{logs.map(log => (
						<LogItem key={log._id} log={log} deleteItem={deleteItem} />
					))}
				</tbody>
			</Table>
			
		</Container>
	)
}

export default App
