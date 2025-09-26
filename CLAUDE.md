# CLAUDE.md - Repository Assistant Guide

## Repository Overview
This is the ar-io/docs-v2 repository, which manages the documentation for the AR.IO Developer Platform. It references various services, SDKs and tools for building on and with the AR.IO Network. It also includes documentation for interacting with ArDrive - a flagship consumer dApp that stores data on Arweave.

## Architecture
This repository is built with [Fumadocs](https://fumadocs.dev/), a documentation framework. The general architecture is as follows:

### UI Components
All UI should use Fumadocs available UI components by default. This ensures consistency with the framework's design system and maintains a cohesive user experience throughout the documentation.

All icons should use lucide-react for consistency across the documentation site.

## Key Commands
- **Linting**: `npm run lint` - Run ESLint to check code quality
- **Type checking**: `npm run typecheck` - Run TypeScript type checking
- **Development server**: `npm run dev` - Start the development server
- **Build**: `npm run build` - Build the documentation site

## Repository Structure
- `/content/` - Main documentation content
  - `/content/docs/` - Core documentation pages
  - `/content/api/` - API documentation
  - `/content/guides/` - User guides and tutorials
- `/public/` - Static assets
- `/src/` - Source code for documentation site
- `/scripts/` - Build and utility scripts

## Documentation Guidelines
- Documentation is written in MDX format (Markdown with JSX)
- Use semantic headings (H1 for page title, H2 for main sections, etc.)
- Include code examples with proper syntax highlighting
- Add metadata frontmatter to all documentation pages
- Follow existing documentation patterns and structure

### Documentation Philosophy
These docs intend to model documentation sites of well-established platforms like Stripe, Coinbase, and ChatGPT - where users can natively find things logically, and patterns are consistent throughout. Key principles:
- Logical information architecture
- Consistent navigation patterns
- Clear categorization of content
- Predictable documentation structure
- User-friendly search and discovery

## Working with OpenAPI
The repository supports OpenAPI documentation import (see recent commit 33af22f2e). When working with API documentation:
- OpenAPI specs should be properly formatted YAML or JSON
- Use the import scripts to convert OpenAPI to documentation format
- Maintain consistency with existing API documentation structure

## Git Workflow
- Main branch: `main`
- Create feature branches for new work
- Use descriptive commit messages
- Run linting and type checking before committing

## Community Resources
- **Discord**: https://discord.gg/cuCqBb5v - Join the AR.IO community for updates and discussions

## Important Notes
- This is a documentation repository - focus on content clarity and accuracy
- Always verify technical details match the actual AR.IO implementation
- Maintain consistent terminology throughout documentation
- Test all code examples before including them in documentation