import { INodeProperties } from 'n8n-workflow';

export const groupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: { resource: ['group'] },
		},
		options: [
			{ name: 'Add User', value: 'addUser', action: 'Add user to group', description: 'Add a user to a group' },
			{ name: 'Create', value: 'create', action: 'Create a group', description: 'Create a new group' },
			{ name: 'Delete', value: 'delete', action: 'Delete a group', description: 'Delete a group' },
			{ name: 'Get Many', value: 'getMany', action: 'Get many groups', description: 'List groups' },
			{ name: 'Get Members', value: 'getMembers', action: 'Get group members', description: 'List members of a group' },
			{ name: 'Remove User', value: 'removeUser', action: 'Remove user from group', description: 'Remove a user from a group' },
		],
		default: 'getMany',
	},
];

export const groupFields: INodeProperties[] = [
	// ------ Group ID (for most operations) ------
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: ['group'], operation: ['delete', 'getMembers', 'addUser', 'removeUser'] },
		},
		description: 'The ID of the group',
	},

	// ------ Create ------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: ['group'], operation: ['create'] },
		},
		description: 'Name of the group',
	},

	// ------ Add/Remove User ------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: ['group'], operation: ['addUser', 'removeUser'] },
		},
		description: 'The ID of the user to add/remove',
	},

	// ------ Get Many ------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: { resource: ['group'], operation: ['getMany'] },
		},
		description: 'Whether to return all results or only up to a limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 100 },
		default: 25,
		displayOptions: {
			show: { resource: ['group'], operation: ['getMany'], returnAll: [false] },
		},
		description: 'Max number of results to return',
	},
];
