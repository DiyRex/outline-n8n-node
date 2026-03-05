import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class OutlineApi implements ICredentialType {
	name = 'outlineApi';
	displayName = 'Outline API';
	documentationUrl = 'https://www.getoutline.com/developers';

	properties: INodeProperties[] = [
		{
			displayName: 'Instance URL',
			name: 'url',
			type: 'string',
			default: '',
			placeholder: 'https://outline.example.com',
			required: true,
			description: 'The URL of your Outline instance (without trailing slash)',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'API key generated in Outline Settings → API',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.url}}',
			url: '/api/auth.info',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		},
	};
}
