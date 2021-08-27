import React, { useState, useEffect } from 'react';
import { Container, Table, Alert } from 'react-bootstrap';
// import Table from 'react-bootstrap/Table';
import LogItem from './LogItem';
import AddLogItem from './AddLogItem';
import { ipcRenderer } from 'electron';

const App = () => {
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
		ipcRenderer.on('logs:clear', () => {
			setLogs([]);
			showAlert('Logs cleared', 'success');
			});
	}, []);

	function addItem(item) {
		if (item.text === '' || item.user === '' || item.priority === '') {
			showAlert('Please fill in all fields.', 'danger');
			return;
		}

		ipcRenderer.send('logs:add', {
			text: item.text,
			priority: item.priority,
			user: item.user,
			created: new Date()
		});

		item._id = Math.floor(Math.random() * 90000) + 10000;
		item.created = new Date().toString();
		console.log(item);
		setLogs([...logs,	item]);
		showAlert('Log added successfully'); // How do we know if we have a success or failure?
	}

	function deleteItem(_id) {
		ipcRenderer.send('logs:delete', _id);
		showAlert('Log removed successfully'); // How do we know if we have a success or failure?
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
