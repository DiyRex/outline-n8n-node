import {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IRequestOptions,
	NodeApiError,
} from 'n8n-workflow';

export async function outlineApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	endpoint: string,
	body: Record<string, any> = {},
): Promise<any> {
	const credentials = await this.getCredentials('outlineApi');
	const baseUrl = (credentials.url as string).replace(/\/$/, '');

	const options: IRequestOptions = {
		method: 'POST' as IHttpRequestMethods,
		uri: `${baseUrl}/api/${endpoint}`,
		body,
		json: true,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${credentials.apiKey}`,
		},
	};

	try {
		const response = await this.helpers.request(options);
		if (response.ok === false) {
			throw new Error(response.message || response.error || 'Unknown API error');
		}
		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as Record<string, any>);
	}
}

export async function outlineApiRequestAllItems(
	this: IExecuteFunctions,
	endpoint: string,
	body: Record<string, any> = {},
	dataKey = 'data',
): Promise<any[]> {
	const allItems: any[] = [];
	let offset = 0;
	const limit = 25;

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const response = await outlineApiRequest.call(this, endpoint, {
			...body,
			offset,
			limit,
		});

		const items = response[dataKey] || [];
		allItems.push(...items);

		if (items.length < limit) {
			break;
		}
		offset += limit;
	}

	return allItems;
}
