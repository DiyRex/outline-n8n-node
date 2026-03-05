import { INodeProperties } from 'n8n-workflow';

export const eventOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: { resource: ['event'] },
		},
		options: [
			{ name: 'Get Many', value: 'getMany', action: 'Get many events', description: 'List activity and audit events' },
		],
		default: 'getMany',
	},
];

export const eventFields: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: { resource: ['event'], operation: ['getMany'] },
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
			show: { resource: ['event'], operation: ['getMany'], returnAll: [false] },
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: { resource: ['event'], operation: ['getMany'] },
		},
		options: [
			{
				displayName: 'Document ID',
				name: 'documentId',
				type: 'string',
				default: '',
				description: 'Filter events by document',
			},
			{
				displayName: 'Collection ID',
				name: 'collectionId',
				type: 'string',
				default: '',
				description: 'Filter events by collection',
			},
			{
				displayName: 'Audit Log',
				name: 'auditLog',
				type: 'boolean',
				default: false,
				description: 'Whether to return audit log entries only',
			},
		],
	},
];
