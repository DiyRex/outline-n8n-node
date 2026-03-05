import { INodeProperties } from 'n8n-workflow';

export const shareOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: { resource: ['share'] },
		},
		options: [
			{ name: 'Create', value: 'create', action: 'Create a share link', description: 'Create a public share link for a document' },
			{ name: 'Get Many', value: 'getMany', action: 'Get many shares', description: 'List share links' },
			{ name: 'Revoke', value: 'revoke', action: 'Revoke a share link', description: 'Revoke a public share link' },
		],
		default: 'getMany',
	},
];

export const shareFields: INodeProperties[] = [
	// ------ Create ------
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: ['share'], operation: ['create'] },
		},
		description: 'The document to create a share link for',
	},

	// ------ Revoke ------
	{
		displayName: 'Share ID',
		name: 'shareId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: ['share'], operation: ['revoke'] },
		},
		description: 'The ID of the share link to revoke',
	},

	// ------ Get Many ------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: { resource: ['share'], operation: ['getMany'] },
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
			show: { resource: ['share'], operation: ['getMany'], returnAll: [false] },
		},
		description: 'Max number of results to return',
	},
];
