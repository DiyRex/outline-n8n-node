import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from 'n8n-workflow';

import { outlineApiRequest, outlineApiRequestAllItems } from './OutlineApi';

import { documentOperations, documentFields } from './descriptions/DocumentDescription';
import { collectionOperations, collectionFields } from './descriptions/CollectionDescription';
import { userOperations, userFields } from './descriptions/UserDescription';
import { groupOperations, groupFields } from './descriptions/GroupDescription';
import { commentOperations, commentFields } from './descriptions/CommentDescription';
import { shareOperations, shareFields } from './descriptions/ShareDescription';
import { searchOperations, searchFields } from './descriptions/SearchDescription';
import { eventOperations, eventFields } from './descriptions/EventDescription';

export class Outline implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Outline',
		name: 'outline',
		icon: 'file:outline.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Outline wiki API — manage documents, collections, users, groups, and more',
		defaults: {
			name: 'Outline',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'outlineApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Collection', value: 'collection' },
					{ name: 'Comment', value: 'comment' },
					{ name: 'Document', value: 'document' },
					{ name: 'Event', value: 'event' },
					{ name: 'Group', value: 'group' },
					{ name: 'Search', value: 'search' },
					{ name: 'Share', value: 'share' },
					{ name: 'User', value: 'user' },
				],
				default: 'document',
			},
			// Operations
			...documentOperations,
			...collectionOperations,
			...userOperations,
			...groupOperations,
			...commentOperations,
			...shareOperations,
			...searchOperations,
			...eventOperations,
			// Fields
			...documentFields,
			...collectionFields,
			...userFields,
			...groupFields,
			...commentFields,
			...shareFields,
			...searchFields,
			...eventFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				// ==================== DOCUMENT ====================
				if (resource === 'document') {
					if (operation === 'get') {
						const documentId = this.getNodeParameter('documentId', i) as string;
						const response = await outlineApiRequest.call(this, 'documents.info', { id: documentId });
						responseData = response.data;
					}

					if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as Record<string, any>;
						const body: Record<string, any> = {};
						if (filters.collectionId) body.collectionId = filters.collectionId;

						if (returnAll) {
							responseData = await outlineApiRequestAllItems.call(this, 'documents.list', body);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							body.limit = limit;
							body.offset = 0;
							const response = await outlineApiRequest.call(this, 'documents.list', body);
							responseData = response.data;
						}
					}

					if (operation === 'create') {
						const title = this.getNodeParameter('title', i) as string;
						const collectionId = this.getNodeParameter('collectionId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as Record<string, any>;
						const body: Record<string, any> = { title, collectionId, ...additionalFields };
						const response = await outlineApiRequest.call(this, 'documents.create', body);
						responseData = response.data;
					}

					if (operation === 'update') {
						const documentId = this.getNodeParameter('documentId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as Record<string, any>;
						const body: Record<string, any> = { id: documentId, ...updateFields };
						const response = await outlineApiRequest.call(this, 'documents.update', body);
						responseData = response.data;
					}

					if (operation === 'delete') {
						const documentId = this.getNodeParameter('documentId', i) as string;
						const permanent = this.getNodeParameter('permanent', i) as boolean;
						await outlineApiRequest.call(this, 'documents.delete', { id: documentId, permanent });
						responseData = { success: true };
					}

					if (operation === 'search') {
						const query = this.getNodeParameter('query', i) as string;
						const searchOptions = this.getNodeParameter('searchOptions', i, {}) as Record<string, any>;
						const body: Record<string, any> = { query };
						if (searchOptions.collectionId) body.collectionId = searchOptions.collectionId;
						if (searchOptions.limit) body.limit = searchOptions.limit;
						const response = await outlineApiRequest.call(this, 'documents.search', body);
						responseData = response.data;
					}

					if (operation === 'archive') {
						const documentId = this.getNodeParameter('documentId', i) as string;
						const response = await outlineApiRequest.call(this, 'documents.archive', { id: documentId });
						responseData = response.data;
					}

					if (operation === 'restore') {
						const documentId = this.getNodeParameter('documentId', i) as string;
						const response = await outlineApiRequest.call(this, 'documents.restore', { id: documentId });
						responseData = response.data;
					}

					if (operation === 'export') {
						const documentId = this.getNodeParameter('documentId', i) as string;
						const response = await outlineApiRequest.call(this, 'documents.info', { id: documentId });
						responseData = { title: response.data.title, text: response.data.text };
					}
				}

				// ==================== COLLECTION ====================
				if (resource === 'collection') {
					if (operation === 'get') {
						const collectionId = this.getNodeParameter('collectionId', i) as string;
						const response = await outlineApiRequest.call(this, 'collections.info', { id: collectionId });
						responseData = response.data;
					}

					if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await outlineApiRequestAllItems.call(this, 'collections.list', {});
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await outlineApiRequest.call(this, 'collections.list', { limit, offset: 0 });
							responseData = response.data;
						}
					}

					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as Record<string, any>;
						const body: Record<string, any> = { name, ...additionalFields };
						const response = await outlineApiRequest.call(this, 'collections.create', body);
						responseData = response.data;
					}

					if (operation === 'update') {
						const collectionId = this.getNodeParameter('collectionId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as Record<string, any>;
						const body: Record<string, any> = { id: collectionId, ...updateFields };
						const response = await outlineApiRequest.call(this, 'collections.update', body);
						responseData = response.data;
					}

					if (operation === 'delete') {
						const collectionId = this.getNodeParameter('collectionId', i) as string;
						await outlineApiRequest.call(this, 'collections.delete', { id: collectionId });
						responseData = { success: true };
					}

					if (operation === 'getDocuments') {
						const collectionId = this.getNodeParameter('collectionId', i) as string;
						const response = await outlineApiRequest.call(this, 'collections.documents', { id: collectionId });
						responseData = response.data;
					}
				}

				// ==================== USER ====================
				if (resource === 'user') {
					if (operation === 'get') {
						const userId = this.getNodeParameter('userId', i) as string;
						const body: Record<string, any> = {};
						if (userId) body.id = userId;
						const response = await outlineApiRequest.call(this, 'users.info', body);
						responseData = response.data;
					}

					if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as Record<string, any>;
						const body: Record<string, any> = {};
						if (filters.query) body.query = filters.query;

						if (returnAll) {
							responseData = await outlineApiRequestAllItems.call(this, 'users.list', body);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							body.limit = limit;
							body.offset = 0;
							const response = await outlineApiRequest.call(this, 'users.list', body);
							responseData = response.data;
						}
					}
				}

				// ==================== GROUP ====================
				if (resource === 'group') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const response = await outlineApiRequest.call(this, 'groups.create', { name });
						responseData = response.data;
					}

					if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await outlineApiRequestAllItems.call(this, 'groups.list', {});
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await outlineApiRequest.call(this, 'groups.list', { limit, offset: 0 });
							responseData = response.data;
						}
					}

					if (operation === 'delete') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						await outlineApiRequest.call(this, 'groups.delete', { id: groupId });
						responseData = { success: true };
					}

					if (operation === 'getMembers') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const response = await outlineApiRequest.call(this, 'groups.memberships', { id: groupId, limit: 100 });
						responseData = response.data;
					}

					if (operation === 'addUser') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const userId = this.getNodeParameter('userId', i) as string;
						await outlineApiRequest.call(this, 'groups.add_user', { id: groupId, userId });
						responseData = { success: true };
					}

					if (operation === 'removeUser') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const userId = this.getNodeParameter('userId', i) as string;
						await outlineApiRequest.call(this, 'groups.remove_user', { id: groupId, userId });
						responseData = { success: true };
					}
				}

				// ==================== COMMENT ====================
				if (resource === 'comment') {
					if (operation === 'create') {
						const documentId = this.getNodeParameter('documentId', i) as string;
						const text = this.getNodeParameter('text', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as Record<string, any>;
						const body: Record<string, any> = { documentId, data: { text }, ...additionalFields };
						const response = await outlineApiRequest.call(this, 'comments.create', body);
						responseData = response.data;
					}

					if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as Record<string, any>;
						const body: Record<string, any> = {};
						if (filters.documentId) body.documentId = filters.documentId;

						if (returnAll) {
							responseData = await outlineApiRequestAllItems.call(this, 'comments.list', body);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							body.limit = limit;
							body.offset = 0;
							const response = await outlineApiRequest.call(this, 'comments.list', body);
							responseData = response.data;
						}
					}

					if (operation === 'delete') {
						const commentId = this.getNodeParameter('commentId', i) as string;
						await outlineApiRequest.call(this, 'comments.delete', { id: commentId });
						responseData = { success: true };
					}

					if (operation === 'resolve') {
						const commentId = this.getNodeParameter('commentId', i) as string;
						const response = await outlineApiRequest.call(this, 'comments.resolve', { id: commentId });
						responseData = response.data;
					}
				}

				// ==================== SHARE ====================
				if (resource === 'share') {
					if (operation === 'create') {
						const documentId = this.getNodeParameter('documentId', i) as string;
						const response = await outlineApiRequest.call(this, 'shares.create', { documentId });
						responseData = response.data;
					}

					if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await outlineApiRequestAllItems.call(this, 'shares.list', {});
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await outlineApiRequest.call(this, 'shares.list', { limit, offset: 0 });
							responseData = response.data;
						}
					}

					if (operation === 'revoke') {
						const shareId = this.getNodeParameter('shareId', i) as string;
						await outlineApiRequest.call(this, 'shares.revoke', { id: shareId });
						responseData = { success: true };
					}
				}

				// ==================== SEARCH ====================
				if (resource === 'search') {
					const query = this.getNodeParameter('query', i) as string;
					const options = this.getNodeParameter('options', i, {}) as Record<string, any>;
					const body: Record<string, any> = { query };
					if (options.collectionId) body.collectionId = options.collectionId;
					if (options.limit) body.limit = options.limit;

					if (operation === 'documents') {
						const response = await outlineApiRequest.call(this, 'documents.search', body);
						responseData = response.data;
					}

					if (operation === 'titles') {
						const response = await outlineApiRequest.call(this, 'documents.search_titles', body);
						responseData = response.data;
					}
				}

				// ==================== EVENT ====================
				if (resource === 'event') {
					if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as Record<string, any>;
						const body: Record<string, any> = {};
						if (filters.documentId) body.documentId = filters.documentId;
						if (filters.collectionId) body.collectionId = filters.collectionId;
						if (filters.auditLog) body.auditLog = filters.auditLog;

						if (returnAll) {
							responseData = await outlineApiRequestAllItems.call(this, 'events.list', body);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							body.limit = limit;
							body.offset = 0;
							const response = await outlineApiRequest.call(this, 'events.list', body);
							responseData = response.data;
						}
					}
				}

				// ==================== Return data ====================
				if (Array.isArray(responseData)) {
					returnData.push(...responseData.map((item: any) => ({ json: item })));
				} else if (responseData) {
					returnData.push({ json: responseData });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message } });
					continue;
				}
				throw new NodeApiError(this.getNode(), error as Record<string, any>);
			}
		}

		return [returnData];
	}
}
