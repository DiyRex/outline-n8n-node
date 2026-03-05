import { INodeProperties } from 'n8n-workflow';

export const commentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: { resource: ['comment'] },
		},
		options: [
			{ name: 'Create', value: 'create', action: 'Create a comment', description: 'Add a comment to a document' },
			{ name: 'Delete', value: 'delete', action: 'Delete a comment', description: 'Delete a comment' },
			{ name: 'Get Many', value: 'getMany', action: 'Get many comments', description: 'List comments' },
			{ name: 'Resolve', value: 'resolve', action: 'Resolve a comment', description: 'Mark a comment thread as resolved' },
		],
		default: 'getMany',
	},
];

export const commentFields: INodeProperties[] = [
	// ------ Create ------
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: ['comment'], operation: ['create'] },
		},
		description: 'The document to comment on',
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		typeOptions: { rows: 4 },
		required: true,
		default: '',
		displayOptions: {
			show: { resource: ['comment'], operation: ['create'] },
		},
		description: 'Comment text (markdown)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: { resource: ['comment'], operation: ['create'] },
		},
		options: [
			{
				displayName: 'Parent Comment ID',
				name: 'parentCommentId',
				type: 'string',
				default: '',
				description: 'ID of the parent comment (for replies)',
			},
		],
	},

	// ------ Delete / Resolve ------
	{
		displayName: 'Comment ID',
		name: 'commentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: ['comment'], operation: ['delete', 'resolve'] },
		},
		description: 'The ID of the comment',
	},

	// ------ Get Many ------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: { resource: ['comment'], operation: ['getMany'] },
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
			show: { resource: ['comment'], operation: ['getMany'], returnAll: [false] },
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
			show: { resource: ['comment'], operation: ['getMany'] },
		},
		options: [
			{
				displayName: 'Document ID',
				name: 'documentId',
				type: 'string',
				default: '',
				description: 'Filter comments by document',
			},
		],
	},
];
