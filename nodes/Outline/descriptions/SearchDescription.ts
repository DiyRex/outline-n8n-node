import { INodeProperties } from 'n8n-workflow';

export const searchOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: { resource: ['search'] },
		},
		options: [
			{ name: 'Documents', value: 'documents', action: 'Search documents', description: 'Full-text search across documents' },
			{ name: 'Titles', value: 'titles', action: 'Search titles', description: 'Search document titles only (faster)' },
		],
		default: 'documents',
	},
];

export const searchFields: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: ['search'] },
		},
		description: 'Search query string',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: { resource: ['search'] },
		},
		options: [
			{
				displayName: 'Collection ID',
				name: 'collectionId',
				type: 'string',
				default: '',
				description: 'Limit search to a specific collection',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 100 },
				default: 25,
				description: 'Max number of results to return',
			},
		],
	},
];
