import { INodeProperties } from 'n8n-workflow';

export const documentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: { resource: ['document'] },
		},
		options: [
			{ name: 'Archive', value: 'archive', action: 'Archive a document', description: 'Archive a document' },
			{ name: 'Create', value: 'create', action: 'Create a document', description: 'Create a new document' },
			{ name: 'Delete', value: 'delete', action: 'Delete a document', description: 'Delete a document' },
			{ name: 'Drafts', value: 'drafts', action: 'Get draft documents', description: 'List draft documents' },
			{ name: 'Export', value: 'export', action: 'Export a document', description: 'Export document content' },
			{ name: 'Get', value: 'get', action: 'Get a document', description: 'Retrieve a document by ID' },
			{ name: 'Get Many', value: 'getMany', action: 'Get many documents', description: 'List documents' },
			{ name: 'Restore', value: 'restore', action: 'Restore a document', description: 'Restore an archived document' },
			{ name: 'Search', value: 'search', action: 'Search documents', description: 'Full-text search across documents' },
			{ name: 'Update', value: 'update', action: 'Update a document', description: 'Update an existing document' },
			{ name: 'Viewed', value: 'viewed', action: 'Get viewed documents', description: 'List recently viewed documents' },
		],
		default: 'get',
	},
];

export const documentFields: INodeProperties[] = [
	// ------ Get ------
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: ['document'], operation: ['get', 'update', 'delete', 'archive', 'restore', 'export'] },
		},
		description: 'The ID of the document',
	},

	// ------ Create ------
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: ['document'], operation: ['create'] },
		},
		description: 'Title of the document',
	},
	{
		displayName: 'Collection ID',
		name: 'collectionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: ['document'], operation: ['create'] },
		},
		description: 'ID of the collection to create the document in',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: { resource: ['document'], operation: ['create'] },
		},
		options: [
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				typeOptions: { rows: 10 },
				default: '',
				description: 'Markdown content of the document',
			},
			{
				displayName: 'Parent Document ID',
				name: 'parentDocumentId',
				type: 'string',
				default: '',
				description: 'ID of the parent document (for nesting)',
			},
			{
				displayName: 'Template ID',
				name: 'templateId',
				type: 'string',
				default: '',
				description: 'ID of a template to use',
			},
			{
				displayName: 'Publish',
				name: 'publish',
				type: 'boolean',
				default: true,
				description: 'Whether to publish the document immediately',
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
			show: { resource: ['document'], operation: ['update'] },
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'New title for the document',
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				typeOptions: { rows: 10 },
				default: '',
				description: 'New markdown content',
			},
			{
				displayName: 'Publish',
				name: 'publish',
				type: 'boolean',
				default: false,
				description: 'Whether to publish the document (set to true to publish a draft)',
			},
		],
	},

	// ------ Delete ------
	{
		displayName: 'Permanent',
		name: 'permanent',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: { resource: ['document'], operation: ['delete'] },
		},
		description: 'Whether to permanently delete (true) or move to trash (false)',
	},

	// ------ Search ------
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: ['document'], operation: ['search'] },
		},
		description: 'Search query string',
	},
	{
		displayName: 'Additional Fields',
		name: 'searchOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: { resource: ['document'], operation: ['search'] },
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

	// ------ Get Many / Drafts / Viewed ------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: { resource: ['document'], operation: ['getMany', 'drafts', 'viewed'] },
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
			show: { resource: ['document'], operation: ['getMany', 'drafts', 'viewed'], returnAll: [false] },
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
			show: { resource: ['document'], operation: ['getMany'] },
		},
		options: [
			{
				displayName: 'Collection ID',
				name: 'collectionId',
				type: 'string',
				default: '',
				description: 'Filter by collection',
			},
		],
	},
];
