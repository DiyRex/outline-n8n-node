import { INodeProperties } from 'n8n-workflow';

export const collectionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: { resource: ['collection'] },
		},
		options: [
			{ name: 'Create', value: 'create', action: 'Create a collection', description: 'Create a new collection' },
			{ name: 'Delete', value: 'delete', action: 'Delete a collection', description: 'Delete a collection' },
			{ name: 'Get', value: 'get', action: 'Get a collection', description: 'Retrieve a collection by ID' },
			{ name: 'Get Documents', value: 'getDocuments', action: 'Get document tree', description: 'Get the document tree of a collection' },
			{ name: 'Get Many', value: 'getMany', action: 'Get many collections', description: 'List collections' },
			{ name: 'Update', value: 'update', action: 'Update a collection', description: 'Update a collection' },
		],
		default: 'get',
	},
];

export const collectionFields: INodeProperties[] = [
	// ------ Get / Delete / Get Documents ------
	{
		displayName: 'Collection ID',
		name: 'collectionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: ['collection'], operation: ['get', 'update', 'delete', 'getDocuments'] },
		},
		description: 'The ID of the collection',
	},

	// ------ Create ------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: ['collection'], operation: ['create'] },
		},
		description: 'Name of the collection',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: { resource: ['collection'], operation: ['create'] },
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the collection',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '#4E5C6E',
				description: 'Collection color (hex)',
			},
		],
	},

	// ------ Update ------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: { resource: ['collection'], operation: ['update'] },
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'New name for the collection',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'New description',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '#4E5C6E',
				description: 'New color (hex)',
			},
		],
	},

	// ------ Get Many ------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: { resource: ['collection'], operation: ['getMany'] },
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
			show: { resource: ['collection'], operation: ['getMany'], returnAll: [false] },
		},
		description: 'Max number of results to return',
	},
];
