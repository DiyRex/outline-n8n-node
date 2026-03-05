<p align="center">
  <img src="nodes/Outline/outline.svg" width="80" alt="Outline" />
</p>

<h1 align="center">@diyrex/n8n-nodes-outline</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@diyrex/n8n-nodes-outline"><img src="https://img.shields.io/npm/v/@diyrex/n8n-nodes-outline.svg?style=flat-square" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@diyrex/n8n-nodes-outline"><img src="https://img.shields.io/npm/dm/@diyrex/n8n-nodes-outline.svg?style=flat-square" alt="npm downloads" /></a>
  <a href="https://github.com/DiyRex/outline-n8n-node/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@diyrex/n8n-nodes-outline.svg?style=flat-square" alt="license" /></a>
</p>

<p align="center">
  <strong>n8n community node for <a href="https://www.getoutline.com/">Outline</a> wiki API</strong><br/>
  Manage documents, collections, users, groups, comments, shares, search &amp; events in your n8n workflows.
</p>

---

## 📦 Installation

### Self-Hosted n8n (GUI)

1. Go to **Settings → Community Nodes**
2. Enter: `@diyrex/n8n-nodes-outline`
3. Click **Install**
4. Restart n8n

### Self-Hosted n8n (CLI)

```bash
mkdir -p ~/.n8n/nodes && cd ~/.n8n/nodes
npm init -y
npm install @diyrex/n8n-nodes-outline
# Restart n8n
```

### Docker

```dockerfile
FROM n8nio/n8n:latest
RUN mkdir -p /home/node/.n8n/nodes && \
    cd /home/node/.n8n/nodes && \
    npm init -y && \
    npm install @diyrex/n8n-nodes-outline
```

Or with docker-compose:

```yaml
services:
  n8n:
    image: n8nio/n8n:latest
    volumes:
      - n8n_data:/home/node/.n8n
    environment:
      - N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/nodes/node_modules/@diyrex/n8n-nodes-outline
```

### Development (Local Testing)

```bash
git clone https://github.com/DiyRex/outline-n8n-node.git
cd outline-n8n-node
npm install
npm run build
npm link

# In your n8n data directory
mkdir -p ~/.n8n/nodes && cd ~/.n8n/nodes
npm link @diyrex/n8n-nodes-outline
# Restart n8n
```

---

## 🔧 Credentials Setup

1. In your Outline instance, go to **Settings → API**
2. Create a new API key with `read` and `write` scopes
3. In n8n, create new **Outline API** credentials:
   - **Instance URL**: `https://your-outline-instance.com`
   - **API Key**: `ol_api_your_key_here`

---

## ✦ Supported Resources & Operations

### Document
| Operation | Description |
|-----------|-------------|
| Create | Create a new document in a collection |
| Get | Retrieve a document by ID |
| Get Many | List documents (with pagination) |
| Update | Update title and/or content |
| Delete | Soft-delete or permanently delete |
| Search | Full-text search across documents |
| Archive | Archive a document |
| Restore | Restore an archived document |
| Export | Export document content as markdown |

### Collection
| Operation | Description |
|-----------|-------------|
| Create | Create a new collection |
| Get | Retrieve a collection by ID |
| Get Many | List all collections |
| Update | Update name, description, or color |
| Delete | Delete a collection |
| Get Documents | Get the document tree of a collection |

### User
| Operation | Description |
|-----------|-------------|
| Get | Get user info (current user if no ID) |
| Get Many | List users with optional search |

### Group
| Operation | Description |
|-----------|-------------|
| Create | Create a new group |
| Get Many | List all groups |
| Delete | Delete a group |
| Get Members | List members of a group |
| Add User | Add a user to a group |
| Remove User | Remove a user from a group |

### Comment
| Operation | Description |
|-----------|-------------|
| Create | Add a comment to a document |
| Get Many | List comments (filter by document) |
| Delete | Delete a comment |
| Resolve | Mark a comment thread as resolved |

### Share
| Operation | Description |
|-----------|-------------|
| Create | Create a public share link |
| Get Many | List all share links |
| Revoke | Revoke a share link |

### Search
| Operation | Description |
|-----------|-------------|
| Documents | Full-text search across documents |
| Titles | Search document titles only (faster) |

### Event
| Operation | Description |
|-----------|-------------|
| Get Many | List activity/audit events |

---

## 🔄 Example Workflows

### Publish Release Notes
```
GitHub Trigger → Generate Changelog → Outline (Create Document)
```

### Sync Documentation
```
Schedule Trigger → Read Files → Outline (Create/Update Document)
```

### Backup Wiki
```
Schedule Trigger → Outline (Get Many Collections) → Outline (Get Documents) → Write to Disk
```

### Notify on Document Changes
```
Schedule Trigger → Outline (Get Many Events) → Filter → Slack (Send Message)
```

---

## 🛠️ Development

```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript
npm run dev          # Watch mode
npm run lint         # Lint code
npm run lint:fix     # Fix lint issues
```

---

## 📄 License

MIT

---

## 🔗 Links

- [Outline Wiki](https://www.getoutline.com/)
- [Outline API Documentation](https://www.getoutline.com/developers)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)
- [Outline CLI](https://github.com/DiyRex/outline-cli) — companion CLI tool
- [npm Package](https://www.npmjs.com/package/@diyrex/n8n-nodes-outline)
