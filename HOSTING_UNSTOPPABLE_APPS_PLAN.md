# Hosting Unstoppable Apps - Guide Series Implementation Plan

**Status:** In Progress - Guide 3 Complete (with Custom wagmi UI + Ethereum Wallet)
**Created:** 2025-10-29
**Last Updated:** 2025-10-30 (Guide 3: Hosting EVM dApp completed with custom wagmi UI, zero external dependencies)

---

## Executive Summary

This document tracks the implementation of a comprehensive guide series for hosting unstoppable applications on Arweave using ArNS. The series consists of 6 documents covering deployment of blogs, Arweave/AO dApps, EVM dApps, versioning with undernames, and using Arlink.

**Location:** `content/build/guides/hosting-unstoppable-apps/`

**Primary Tool:** `permaweb-deploy` CLI (guides 1-4)
**Alternative Tool:** Arlink web interface (guide 5)

---

## Directory Structure

```
content/build/guides/hosting-unstoppable-apps/
├── index.mdx                                  # Overview/introduction
├── hosting-a-blog.mdx                         # Guide 1: Blog deployment
├── hosting-arweave-ao-dapp.mdx               # Guide 2: Arweave/AO dApp
├── hosting-evm-dapp.mdx                      # Guide 3: EVM dApp
├── using-undernames-for-versioning.mdx       # Guide 4: Versioning
├── deploying-with-arlink.mdx                 # Guide 5: Arlink deployment
└── meta.json                                  # Navigation config
```

---

## Implementation Progress

### Phase 1: Setup ✅ COMPLETE
- [x] Create directory structure
- [x] Update parent `meta.json` to include new guide section (replaced `hosting-decentralized-websites`)
- [x] Create section `meta.json`

### Phase 2: Content Creation (IN PROGRESS)
- [x] **Index Page** - Overview and introduction ✅ COMPLETE
- [x] **Guide 1** - Hosting a Blog ✅ COMPLETE
- [x] **Guide 2** - Hosting Arweave/AO dApp ✅ COMPLETE
- [x] **Guide 3** - Hosting EVM dApp ✅ COMPLETE
- [ ] **Guide 4** - Using Undernames for Versioning (NEXT)
- [ ] **Guide 5** - Deploying with Arlink

### Phase 3: Review & Testing
- [ ] Review all guides for consistency
- [ ] Test all code examples
- [ ] Verify all internal links
- [ ] Test navigation flow
- [ ] Check Fumadocs UI components render correctly
- [ ] Verify icons display properly (lucide-react)

### Phase 4: Integration
- [ ] Update cross-references in related docs
- [ ] Move/archive `hosting-decentralized-websites.mdx`
- [ ] Move `working-with-arns/arns-undernames-versioning.mdx`
- [ ] Update any external links to moved content

### Phase 5: Final Review
- [ ] User review and approval
- [ ] Address feedback
- [ ] Delete this plan document

---

## Implementation Notes & Learnings

### Index Page Implementation (2025-10-29)

**What Was Built:**
- Created streamlined index page at `content/build/guides/hosting-unstoppable-apps/index.mdx`
- Total length: 129 lines (much more concise than originally planned)

**Key Decisions & Changes:**

1. **Simplified Structure**
   - REMOVED: Prerequisites section (moved to individual guides)
   - REMOVED: Tools Overview section (moved to individual guides)
   - REMOVED: Getting Started section (redundant with guide cards)
   - REMOVED: "Why Host on Arweave" section (kept benefits in intro bullets)
   - REMOVED: Additional Resources section (links can be in individual guides)
   - KEPT: Introduction, AR.IO Network explanation, Guide cards

2. **Added Gateway Redundancy Section**
   - New section: "How AR.IO Network Makes Apps Unstoppable"
   - Explains 100+ independent gateways and multi-domain access
   - Provides concrete examples: `myapp.arweave.net`, `myapp.g8way.io`, etc.
   - Emphasizes NO single point of failure
   - This was critical messaging that wasn't in original plan

3. **Enhanced Introduction**
   - Added context about full-stack dApp goals
   - Explained how frontend hosting was the missing piece
   - Positioned AR.IO Network + ArNS as the solution
   - Line: "This has always been the goal of full stack decentralised apps (dapps) but until now that has not been possible due to single points of failure for hosting frontends. AR.IO Network and Arweave Name System (ArNS) has solved this problem."

4. **Design Patterns Used**
   - Fumadocs Cards with JSX descriptions (matching upload/index.mdx pattern)
   - Lucide-react icons: BookOpen, Code, Rocket, GitBranch, Zap
   - Structured card descriptions with bullet points
   - Clean, focused navigation

**Rationale:**
The original plan included many sections that would duplicate content in individual guides. By simplifying the index to be purely a navigation hub with key context, users can:
- Quickly understand what unstoppable apps are
- Grasp the unique value of AR.IO's gateway network
- Navigate directly to relevant guides

Detailed setup instructions, tool comparisons, and prerequisites are better placed in the individual guides where they're contextually relevant.

**Files Modified:**
- Created: `/content/build/guides/hosting-unstoppable-apps/index.mdx`
- Created: `/content/build/guides/hosting-unstoppable-apps/meta.json`
- Modified: `/content/build/guides/meta.json` (replaced `hosting-decentralized-websites` with `hosting-unstoppable-apps`)

---

## Detailed Guide Outlines

### Index Page: `index.mdx` ✅ COMPLETE

**Purpose:** Streamlined navigation hub explaining unstoppable apps and AR.IO's gateway redundancy

**Actual Structure Built:**
```markdown
---
title: "Hosting Unstoppable Apps on ArNS"
description: "Learn how to deploy permanent, censorship-resistant websites and applications to Arweave with ArNS domain integration"
---

## Introduction
- What are unstoppable apps
- Benefits (permanent, censorship-resistant, decentralized, cost-effective, human-readable)
- Context: solving full-stack dApp frontend hosting problem

## How AR.IO Network Makes Apps Unstoppable
- 100+ independent gateways explanation
- Multi-domain access examples (myapp.arweave.net, myapp.g8way.io, etc.)
- No single point of failure messaging

## Guides
<Cards>
  <!-- 5 guide cards with icons and structured descriptions -->
</Cards>
```

**Key Components:**
- ✅ Fumadocs Cards with JSX descriptions
- ✅ Lucide-react icons (BookOpen, Code, Rocket, GitBranch, Zap)
- ✅ Gateway redundancy explanation (new addition)
- ✅ Clean, focused navigation

**Changes from Plan:**
- Removed: Prerequisites, Tools Overview, Getting Started, Why Host on Arweave, Additional Resources
- Added: Gateway redundancy section
- Added: Full-stack dApp context in introduction

---

### Guide 1 Implementation (2025-10-29)

**What Was Built:**
- Created comprehensive blog deployment guide at `content/build/guides/hosting-unstoppable-apps/hosting-a-blog.mdx`
- Total length: 956 lines
- Covers both Next.js and Astro frameworks

**Key Decisions & Changes:**

1. **Removed Sections (per user request)**
   - REMOVED: "Why Deploy a Blog to Arweave" section (duplicated intro page content)
   - REMOVED: Best Practices section
   - REMOVED: Troubleshooting section
   - KEPT: Introduction with link to series intro, complete setup workflow, automation sections

2. **Wallet Management Updates**
   - Updated from arweave.app to [Wander](https://www.wander.app/) for wallet creation
   - Changed from faucet to [turbo.ar.io](https://turbo.ar.io/topup) for storage credits
   - Used `DEPLOY_KEY` instead of `ARWEAVE_WALLET` for GitHub Secrets (matches permaweb-deploy docs)
   - Consistent wallet path: `~/wallets/arweave-wallet.json` throughout
   - Added .gitignore as "safety precaution" with clear explanation it's not strictly needed

3. **Deployment Parameters**
   - Added `--ttl 60` flag to all deployment commands (fast updates within 1 minute)
   - Changed from `--ant-process` to `--arns-name` parameter (user correction)
   - Fixed interactive prompts to ask for "ArNS name" not "ANT process ID"

4. **Framework Coverage**
   - Complete dual-framework approach: Next.js and Astro
   - Tabbed sections for all setup, configuration, and deployment steps
   - Framework-specific examples: blog listing, post pages, RSS feeds

5. **Automation Sections**
   - Package.json scripts with environment variables
   - Complete GitHub Actions workflows for both frameworks
   - Proper secret management with DEPLOY_KEY

6. **Design Patterns Used**
   - Fumadocs: Callout, Tabs, Steps, Cards components
   - Lucide-react icons: BookOpen, Code, GitBranch, Zap
   - Interactive vs CLI deployment modes
   - Blog-specific sections: images, SEO, RSS

**Rationale:**
The guide focuses purely on practical implementation after Best Practices and Troubleshooting removal. This makes it more action-oriented and less overwhelming. User links to the intro page for "why" context, keeping this guide focused on "how". The .gitignore section needed clarification since wallets are stored outside the project - resolved with explanatory callout that it's a safety precaution.

**Files Modified:**
- Created: `/content/build/guides/hosting-unstoppable-apps/hosting-a-blog.mdx`

**Technical Standards Applied:**
- ✅ Wander for wallet creation
- ✅ Turbo for storage credits (not AR.IO faucet)
- ✅ DEPLOY_KEY for GitHub Secrets
- ✅ --ttl 60 for fast updates
- ✅ --arns-name parameter (not --ant-process)
- ✅ Fumadocs components throughout
- ✅ Lucide-react icons
- ✅ Complete, runnable code examples

---

### Guide 2 Implementation (2025-10-30)

**What Was Built:**
- Created comprehensive AO dApp deployment guide at `content/build/guides/hosting-unstoppable-apps/hosting-arweave-ao-dapp.mdx`
- Total length: 1,080 lines
- Complete working example: AO Token Dashboard with wallet integration, AO process interaction, and GraphQL queries

**Key Decisions & Changes:**

1. **Maintained Guide 1 Structure**
   - REMOVED: Best Practices and Troubleshooting sections (per Guide 1 learnings)
   - KEPT: Introduction with link to series intro, complete implementation workflow, automation sections
   - Added: "What You'll Build" section for clarity

2. **Complete Project Structure**
   - Organized code into logical directories: components/, lib/, types/
   - Separated concerns: wallet utilities, AO interactions, Arweave queries
   - TypeScript throughout with proper type definitions

3. **Practical Example: ARIO Token Dashboard**
   - Real-world use case showing common patterns with ARIO token
   - Four main components:
     - `WalletConnect` - Wander wallet integration
     - `TokenBalance` - Display ARIO token balance
     - `SendTokens` - Transfer ARIO tokens via AO messages
     - `TransactionList` - Query and display Arweave transactions
   - Complete, runnable code for each component

4. **Technical Stack Covered**
   - **Wallet**: Wander integration with proper permission handling
   - **AO**: `@permaweb/aoconnect` for message passing and results
   - **GraphQL**: `graphql-request` for querying Arweave data
   - **Framework**: React + Vite + TypeScript (recommended for AO dApps)
   - **UI**: Custom CSS with dark theme matching AR.IO aesthetic

5. **Code Organization**
   - `lib/wallet.ts` - Wallet connection, disconnection, address retrieval
   - `lib/ao.ts` - AO message sending, token operations, process queries
   - `lib/arweave.ts` - GraphQL queries for transactions and data
   - `types/index.ts` - TypeScript definitions for all data structures

6. **Deployment Integration**
   - Vite configuration for SPA routing (`base: './'`)
   - Interactive and CLI deployment commands
   - Package.json scripts with environment variables
   - Complete GitHub Actions workflow with multi-environment support
   - Followed same patterns as Guide 1: DEPLOY_KEY, --arns-name, --ttl 60

7. **Educational Approach**
   - Step-by-step component building
   - Inline code comments explaining key concepts
   - Callouts for important information and prerequisites
   - Links to external resources (AO docs, Wander wallet docs, etc.)
   - Next Steps section with cards linking to related guides

8. **Design Patterns Used**
   - Fumadocs: Callout, Tabs, Steps, Cards components
   - Lucide-react icons: Code, Wallet, Database, GitBranch, Zap, Terminal, FileCode, Globe
   - Error handling and loading states throughout
   - React hooks for state management
   - Async/await patterns for blockchain operations

**Rationale:**
Guide 2 builds on Guide 1's foundations while introducing AO-specific concepts. The token dashboard provides a concrete example that developers can adapt for their own AO dApps. By showing wallet integration, AO process interaction, and GraphQL queries together, developers get a complete picture of building on the Arweave/AO stack. The guide avoids overwhelming users by focusing on practical implementation over theoretical best practices.

**Files Modified:**
- Created: `/content/build/guides/hosting-unstoppable-apps/hosting-arweave-ao-dapp.mdx`

**Technical Standards Applied:**
- ✅ `fetch` API for HTTP requests (GraphQL client uses fetch internally)
- ✅ `@permaweb/aoconnect` for AO interactions
- ✅ Wander for wallet integration (formerly ArConnect, standard for AO dApps)
- ✅ DEPLOY_KEY for GitHub Secrets
- ✅ --ttl 60 for fast updates
- ✅ --arns-name parameter
- ✅ Fumadocs components throughout
- ✅ Lucide-react icons
- ✅ Complete, runnable code examples
- ✅ Proper error handling and loading states
- ✅ TypeScript type safety
- ✅ Modern React patterns (hooks, functional components)
- ✅ Real ARIO token process ID for practical, testable example

**Code Examples Included:**
- ✅ Complete wallet integration with Wander (formerly ArConnect)
- ✅ AO message sending and receiving
- ✅ Token balance queries
- ✅ Token transfer functionality
- ✅ GraphQL queries for transaction data
- ✅ React components with state management
- ✅ Vite configuration for SPA
- ✅ GitHub Actions multi-environment workflow
- ✅ Package.json deployment scripts

**Post-Implementation Updates (2025-10-30):**

1. **ArConnect → Wander Rebrand Update**
   - Updated all references from "ArConnect" to "Wander" throughout the guide
   - Changed installation link from `arconnect.io` to `wander.app/download`
   - Updated function names: `isArConnectInstalled()` → `isWanderInstalled()`
   - Updated error messages and UI text to reference Wander
   - Added clarifying comments about API compatibility and TypeScript types
   - **Important**: No functional code changes required - API remains `window.arweaveWallet`
   - **TypeScript**: Still uses `arconnect` npm package for backward compatibility (documented in guide)
   - Total: 11 text replacements, 3 URL updates, 3 function renames, 2 clarifying comments

2. **ARIO Token Specific Implementation**
   - Changed from generic "AO Token Dashboard" to "ARIO Token Dashboard"
   - Updated process ID: `ARIO_PROCESS_ID = 'qNvAoz0TgcH7DMg8BCVn8jF32QH5L6T29VjHxhHqqGE'`
   - Replaced placeholder `YOUR_TOKEN_PROCESS_ID` with actual ARIO process ID
   - Updated all token references to be ARIO-specific where appropriate:
     - "Fetches ARIO token balances from the ARIO process"
     - "Sends ARIO tokens to other addresses"
     - "Connect your wallet to view your ARIO token balance"
     - "Verify your ARIO balance loads correctly"
   - Added informational callout explaining ARIO is used as a practical example
   - Updated conclusion: "You've built and deployed an ARIO token dashboard on Arweave. You can adapt this pattern to work with any AO token by changing the process ID."
   - **Rationale**: Using a real, working token (ARIO) provides developers with a testable example while clearly explaining the pattern works for any AO token

**Final Guide Status:**
- Total length: 1,519 lines (expanded from initial 1,080 due to updates)
- Status: Complete and ready for user review
- Uses Wander wallet (current brand)
- Uses ARIO token as concrete, working example
- All code is functional and testable with real ARIO process

---

### Guide 3 Implementation (2025-10-30)

**What Was Built:**
- Created comprehensive EVM dApp guide at `content/build/guides/hosting-unstoppable-apps/hosting-evm-dapp.mdx`
- Total length: 1,900 lines
- Complete working example: ETH Wallet Dashboard with balance checking, sending, and multi-chain support
- Both React + Vite AND Next.js implementations (in tabs throughout)

**Key Decisions & Changes:**

1. **Zero External Dependencies Approach**
   - REMOVED: RainbowKit dependency
   - REMOVED: WalletConnect project ID requirement
   - KEPT: wagmi v2 for React hooks
   - ADDED: Custom wallet connection UI components
   - **Rationale**: Eliminates friction of creating external accounts, reduces bundle size, increases educational value

2. **Custom Wallet UI Implementation**
   - Created ~80-line custom `WalletConnect` component
   - Features:
     - Lists all detected wallet connectors (MetaMask, Coinbase Wallet, Brave, etc.)
     - One-click wallet connection
     - Connected state with address display (formatted)
     - Network switcher between Ethereum and Base
     - Disconnect functionality
     - Error handling and display
   - Uses wagmi hooks: `useConnect`, `useAccount`, `useDisconnect`, `useChainId`, `useSwitchChain`
   - Added ~170 lines of custom CSS for wallet UI

3. **Ethereum Wallet for Everything**
   - Users use single Ethereum wallet (MetaMask, etc.) for:
     - Testing the dApp (connecting, viewing balance, sending ETH)
     - Deploying to Arweave (using private key)
   - Updated Prerequisites section to reflect unified wallet approach
   - Added step-by-step MetaMask private key export instructions
   - Security warnings about private key handling

4. **Deployment with Ethereum Wallet**
   - Changed from Arweave wallet to Ethereum wallet with `--sig-type ethereum`
   - Added `--on-demand base-eth` payment option (pay with ETH on Base network)
   - Deployment command example:
     ```bash
     permaweb-deploy \
       --arns-name my-eth-dashboard \
       --sig-type ethereum \
       --private-key "0x..." \
       --on-demand base-eth \
       --max-token-amount 0.01 \
       --ttl 60
     ```
   - Alternative: Turbo credits still supported

5. **Cost Calculation**
   - REMOVED: Inaccurate static cost estimates
   - ADDED: Reference to Turbo Calculator (https://turbo.ar.io/calculator)
   - Provided build size estimate: ~300 KB (0.3 MB)
   - Guidance: Users calculate exact cost based on their actual build size

6. **Example dApp: ETH Dashboard**
   - Native ETH (not ERC20) for simplicity
   - No smart contract complexity required
   - Components:
     - `WalletConnect` - Custom multi-wallet connection UI
     - `EthBalance` - Display ETH balance using `useBalance`
     - `SendEth` - Transfer ETH with `useSendTransaction`
   - Multi-chain: Ethereum Mainnet and Base
   - ~350 lines of code total

7. **Framework Coverage**
   - Both React + Vite AND Next.js shown in tabs
   - Vite recommended for faster builds
   - All sections include both framework examples
   - Consistent wagmi configuration across both

8. **GitHub Actions Updates**
   - Changed from writing wallet.json file to using PRIVATE_KEY env var
   - Added `--sig-type ethereum` to all workflows
   - Added `--on-demand base-eth` payment method
   - Simpler workflow (no file creation/deletion needed)
   - Multi-environment setup maintained (main → production, develop → staging)

9. **Wagmi Configuration**
   - Uses built-in connectors only:
     - `injected()` - Auto-detects MetaMask, Brave, etc.
     - `metaMask()` - Explicitly for MetaMask
     - `coinbaseWallet()` - For Coinbase Wallet extension
   - No WalletConnect connector needed
   - Clean, simple config (~20 lines)

10. **Design Patterns Used**
   - Fumadocs: Callout, Tabs, Steps, Cards components
   - Lucide-react icons: Code, Wallet, Coins, Network, GitBranch, Terminal, FileCode, Globe
   - Custom CSS with purple gradient theme
   - Responsive design with mobile considerations
   - Smooth transitions and hover effects

**Rationale:**
Guide 3 prioritizes developer experience by eliminating external dependencies while maintaining full functionality. The custom wagmi UI approach provides:
- **Zero setup friction** - No accounts, no API keys
- **Educational value** - Developers see exactly how wallet connection works
- **EVM-native workflow** - Same wallet for dApp AND deployment, pay with Base-ETH
- **Smaller bundle** - No RainbowKit (~100KB saved)
- **Full customization** - Complete control over UI and UX

The Ethereum wallet integration creates a cohesive EVM developer experience where they use familiar tools (MetaMask) for everything. Mobile users can still access via MetaMask/Coinbase mobile browsers.

**Files Modified:**
- Created: `/content/build/guides/hosting-unstoppable-apps/hosting-evm-dapp.mdx`

**Technical Standards Applied:**
- ✅ Custom wagmi UI with built-in connectors only
- ✅ No RainbowKit, no WalletConnect project ID
- ✅ Ethereum wallet for deployment (`--sig-type ethereum`)
- ✅ Base-ETH on-demand payment option
- ✅ Private key handling with security warnings
- ✅ Turbo Calculator reference for cost estimation
- ✅ --ttl 60 for fast updates
- ✅ --arns-name parameter
- ✅ Fumadocs components throughout
- ✅ Lucide-react icons
- ✅ Complete, runnable code examples
- ✅ Both Vite and Next.js coverage
- ✅ Proper error handling and loading states
- ✅ TypeScript type safety
- ✅ Modern React patterns (hooks, functional components)

**Code Examples Included:**
- ✅ Wagmi configuration with injected connectors
- ✅ Custom wallet connection component (~80 lines)
- ✅ ETH balance display with `useBalance`
- ✅ ETH transfer with `useSendTransaction`
- ✅ Network switching between Ethereum and Base
- ✅ Complete app assembly with routing
- ✅ Custom wallet UI CSS (~170 lines)
- ✅ Vite and Next.js build configurations
- ✅ Ethereum wallet private key export steps
- ✅ Deployment commands with `--sig-type ethereum`
- ✅ GitHub Actions workflows (single and multi-environment)
- ✅ Package.json deployment scripts

**Benefits Over Original Plan:**
- **Simpler**: Removed RainbowKit dependency and WalletConnect account requirement
- **Faster**: Smaller bundle size, faster builds
- **Cheaper**: Direct Base-ETH payments, no intermediary services
- **Educational**: Developers learn wallet connection internals
- **Cohesive**: Single Ethereum wallet for everything
- **Flexible**: Full UI customization control

**Final Guide Status:**
- Total length: ~1,900 lines
- Status: Complete and ready for user review
- Zero external account dependencies
- Custom wagmi UI fully implemented
- Ethereum wallet deployment integrated
- Both Vite and Next.js examples complete
- All code functional and testable

---

### Guide 1: `hosting-a-blog.mdx`

**Purpose:** Foundational guide teaching permanent blog deployment

**Key Topics:**
1. Introduction to permanent blogs
2. Static site generator setup (Next.js, Astro examples)
3. Building for deployment
4. Installing and using permaweb-deploy
5. First deployment walkthrough
6. Package.json scripts
7. GitHub Actions integration
8. Blog-specific features (images, SEO, RSS)
9. Best practices and security
10. Troubleshooting

**Code Examples:**
- Next.js blog setup
- Astro blog setup
- Deployment commands
- GitHub Actions workflow
- Package.json scripts

**Important Details:**
- Use `fetch` not `axios`
- Show both interactive and CLI deployment modes
- Emphasize wallet security
- Explain permanence implications
- Include complete working examples

**Links to:**
- Guide 2 (Arweave/AO dApp)
- Guide 4 (Undernames for versioning)
- Guide 5 (Arlink alternative)

---

### Guide 2: `hosting-arweave-ao-dapp.mdx`

**Purpose:** Deploy dApps built for Arweave ecosystem

**Key Topics:**
1. Arweave/AO tech stack overview
2. dApp requirements for Arweave
3. Framework setup (React/Vite recommended)
4. Wallet integration (ArConnect)
5. AO process interaction (aoconnect)
6. GraphQL queries for Arweave data
7. Project structure and organization
8. Build optimization
9. SPA routing configuration
10. Deployment with permaweb-deploy
11. Complete example: AO Token Dashboard
12. CI/CD setup
13. Best practices for AO dApps

**Code Examples:**
- Wallet connection component
- AO message sending/receiving
- GraphQL queries
- Complete token dashboard
- GitHub Actions workflow

**Important Details:**
- Use `@permaweb/aoconnect` for AO interactions
- Show proper error handling
- Explain loading states for blockchain ops
- Include real-world example structure
- Testing checklist

**Links to:**
- Guide 3 (EVM dApp comparison)
- Guide 4 (Multi-environment with undernames)
- AO documentation
- ArConnect docs

---

### Guide 3: `hosting-evm-dapp.mdx`

**Purpose:** Deploy Ethereum/EVM dApp frontends on Arweave

**Key Topics:**
1. Hybrid architecture explanation (EVM contracts + Arweave frontend)
2. Why combine Ethereum and Arweave
3. Framework setup (React/Vite, Next.js)
4. Web3 wallet integration (wagmi + RainbowKit)
5. Smart contract interaction
6. Multi-chain support
7. Project structure
8. Build configuration (Vite and Next.js examples)
9. SPA routing
10. Deployment optimization
11. Complete example: ERC20 Dashboard
12. CI/CD pipeline
13. Best practices for EVM dApps
14. Testing strategy

**Code Examples:**
- Wagmi configuration
- RainbowKit setup
- Contract read/write hooks
- Multi-chain configuration
- Complete ERC20 dashboard
- GitHub Actions workflow

**Important Details:**
- Show wagmi/viem (modern approach)
- Include multi-chain support
- Explain gas estimation
- Security considerations
- Error handling for common Web3 errors
- Testing on testnets

**Links to:**
- Guide 2 (Arweave/AO alternative)
- Guide 4 (Staging/prod with undernames)
- Guide 5 (Arlink for quick iterations)
- Web3 wallet docs

---

### Guide 4: `using-undernames-for-versioning.mdx`

**Purpose:** Teach version and environment management with undernames

**Key Topics:**
1. What are undernames
2. Why use undernames for versioning
3. Use cases (versioning, environments, components)
4. Real-world example (ArDrive structure)
5. Deploying to undernames with permaweb-deploy
6. Multi-environment workflow (dev/staging/prod)
7. Package.json scripts for environments
8. GitHub Actions for branch-based deployment
9. Managing undernames programmatically (SDK)
10. Version management strategies
11. Advanced deployment patterns
12. Best practices

**Code Examples:**
- Undername deployment commands
- Multi-environment scripts
- GitHub Actions multi-environment workflow
- SDK code for managing undernames
- Blue-green deployment example

**Important Details:**
- Use `--undername` parameter correctly
- Show `@` for root vs named undernames
- Explain undername naming (underscores in URLs)
- Complete SDK integration example
- ANT record updates

**Source Material:**
- Move from `working-with-arns/arns-undernames-versioning.mdx`
- Update all cross-references
- Add more permaweb-deploy examples
- Expand CI/CD section

**Links to:**
- Guide 1, 2, 3 (for practical application)
- Guide 5 (Arlink alternative)
- Set ArNS Records Programmatically
- Managing ArNS through UI

---

### Guide 5: `deploying-with-arlink.mdx`

**Purpose:** Show one-click deployment alternative using Arlink

**Key Topics:**
1. What is Arlink
2. When to use Arlink vs CLI
3. Prerequisites
4. Repository preparation
5. Step-by-step deployment walkthrough
   - Connect wallet
   - Import repository
   - Configure build
   - Choose domain
   - Deploy
6. Understanding deployment process
7. Beta limitations
8. Redeploying and updates
9. ArNS integration
10. Project configuration
11. Troubleshooting
12. Arlink vs CLI comparison
13. Best practices

**Source Material:**
- Arlink docs: https://arlink.gitbook.io/arlink-docs/getting-started/quickstart

**Important Details:**
- Emphasize visual/web interface
- Explain auto-detection of build settings
- Note 10MB limit and 10-minute timeout
- Show both Arlink subdomain and custom ArNS
- When to graduate to CLI tools

**Links to:**
- Guide 1 (CLI alternative for blogs)
- Guide 2, 3 (CLI for complex dApps)
- Arlink documentation
- ArNS management

---

## Navigation Structure

### meta.json Configuration

```json
{
  "title": "Hosting Unstoppable Apps",
  "defaultOpen": false,
  "pages": [
    "hosting-a-blog",
    "hosting-arweave-ao-dapp",
    "hosting-evm-dapp",
    "using-undernames-for-versioning",
    "deploying-with-arlink"
  ]
}
```

### Parent meta.json Update

Update `content/build/guides/meta.json` to include new section:

```json
{
  "title": "Guides",
  "icon": "Book",
  "defaultOpen": false,
  "pages": [
    "depin",
    "hosting-unstoppable-apps",  // NEW SECTION
    "deploy-dapp-with-ardrive-web",
    "crossmint-nft-minting-app",
    "working-with-arns",
    "using-turbo-in-a-browser"
  ]
}
```

Note: Remove `"hosting-decentralized-websites"` as content moves to new section.

---

## Code Standards Checklist

All guides must adhere to these standards:

### HTTP Requests
- ✅ Use `fetch` API
- ❌ NO `axios`

### ArNS Operations
- ✅ Use `ARIO.mainnet()` from '@ar.io/sdk'
- ✅ Call `setRecord` on ANT instances
- ❌ NO calling `setRecord` on ARIO instances

### Undername Naming
- ✅ Use underscores: `api_myapp.arweave.net`
- ❌ NO periods: `api.myapp.arweave.net`

### UI Components
- ✅ Use Fumadocs components (Cards, Callouts, Steps, etc.)
- ✅ Use lucide-react for icons
- ✅ Follow existing documentation patterns

### Code Examples
- ✅ Complete, runnable examples
- ✅ Proper error handling
- ✅ Clear comments
- ✅ Modern JavaScript/TypeScript
- ✅ Environment variable usage shown

### Formatting
- ✅ Use code blocks with language specifiers
- ✅ Use bash for terminal commands
- ✅ Use javascript/typescript for code
- ✅ Use json for configuration files

---

## Testing Checklist

### Per-Guide Testing

For each guide, verify:

#### Content Quality
- [ ] All headings follow proper hierarchy (H1 → H2 → H3)
- [ ] Introduction clearly states purpose
- [ ] Prerequisites listed
- [ ] Learning objectives clear
- [ ] Conclusion/next steps included

#### Code Examples
- [ ] All code blocks have language specifiers
- [ ] Code is syntactically correct
- [ ] Examples are complete and runnable
- [ ] No placeholder values without explanation
- [ ] Error handling included where appropriate

#### Links
- [ ] All internal links work
- [ ] All external links work
- [ ] Card components link correctly
- [ ] Cross-references accurate

#### Fumadocs Components
- [ ] Cards render correctly
- [ ] Icons display properly
- [ ] Steps component works (if used)
- [ ] Callouts formatted correctly (if used)
- [ ] Code blocks syntax highlighted

#### Technical Accuracy
- [ ] Commands are correct
- [ ] File paths are accurate
- [ ] Configuration examples valid
- [ ] Tool usage matches official docs
- [ ] SDK usage follows best practices

### Build Testing
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] `npm run dev` works locally
- [ ] All pages accessible in dev mode
- [ ] Navigation works correctly

---

## Migration Tasks

### Content to Move/Archive

1. **hosting-decentralized-websites.mdx**
   - Current location: `content/build/guides/hosting-decentralized-websites.mdx`
   - Content incorporated into: `hosting-a-blog.mdx` and `index.mdx`
   - Action: Remove from `guides/meta.json`, delete or archive file

2. **arns-undernames-versioning.mdx**
   - Current location: `content/build/guides/working-with-arns/arns-undernames-versioning.mdx`
   - New location: `content/build/guides/hosting-unstoppable-apps/using-undernames-for-versioning.mdx`
   - Action: Move file, update content, remove from `working-with-arns/meta.json`

### Links to Update

Search for and update links to moved content:
- References to `/build/guides/hosting-decentralized-websites`
- References to `/build/guides/working-with-arns/arns-undernames-versioning`

Update to new paths in new section.

---

## Cross-Linking Strategy

### From Other Docs to New Guides

Update these existing docs to link to new guide series:

1. **ArNS Overview** (`/learn/arns`)
   - Add link to "Hosting Unstoppable Apps" series

2. **Upload Data** (`/build/upload/index.mdx`)
   - Link to hosting guides after explaining upload

3. **Deploy dApp with ArDrive Web** (`/build/guides/deploy-dapp-with-ardrive-web.mdx`)
   - Cross-reference with permaweb-deploy guides

4. **Working with ArNS guides** (`/build/guides/working-with-arns/`)
   - Link from "Set ArNS Records Programmatically" to undername versioning
   - Link from "Purchase ArNS UI" to deployment guides

### Within Guide Series

Each guide should link to:
- **Previous guide** (if applicable) - for sequential reading
- **Next guide** (if applicable) - for continuation
- **Related guides** - via Cards at bottom
- **Index page** - for navigation back to overview

---

## Quality Assurance

### Style Consistency
- [ ] Tone matches existing AR.IO docs
- [ ] Terminology consistent across guides
- [ ] Code style consistent
- [ ] Formatting consistent

### Completeness
- [ ] All outlined topics covered
- [ ] No placeholder text (TODO, TBD, etc.)
- [ ] All code examples complete
- [ ] All images/diagrams included (if needed)

### Accessibility
- [ ] Alt text for images (if any)
- [ ] Code blocks have descriptions
- [ ] Clear heading structure
- [ ] Links have descriptive text

---

## Resources

### Official Documentation
- **Permaweb Deploy:** https://github.com/permaweb/permaweb-deploy
- **Arlink Docs:** https://arlink.gitbook.io/arlink-docs/getting-started/quickstart
- **ArIO SDK:** https://github.com/ar-io/ar-io-sdk
- **Fumadocs:** https://fumadocs.dev/
- **AO Connect:** https://github.com/permaweb/ao/tree/main/connect
- **Wagmi:** https://wagmi.sh/
- **RainbowKit:** https://www.rainbowkit.com/

### Example Repositories
- Look for example dApp repos to reference
- Create example repositories if needed

---

## Timeline & Progress Tracking

### Completed
- [x] Plan creation and approval
- [x] Plan documentation created
- [x] Directory structure creation (2025-10-29)
- [x] Section meta.json created (2025-10-29)
- [x] Parent meta.json updated (2025-10-29)
- [x] Index page created and reviewed (2025-10-29)
- [x] Guide 1: Hosting a Blog created and reviewed (2025-10-29)
- [x] Guide 2: Hosting Arweave/AO dApp created (2025-10-30)
- [x] Guide 3: Hosting EVM dApp created and reviewed (2025-10-30)

### In Progress
- [ ] Guide 4: Using Undernames for Versioning (NEXT)

### Upcoming
- [ ] Guide 5: Deploying with Arlink
- [ ] Testing all guides
- [ ] Review for consistency
- [ ] Integration (move/archive old content)
- [ ] Final user review
- [ ] Finalization

---

## Notes & Considerations

### Design Decisions

1. **Order of Guides**
   - Starts simple (blog) and increases complexity (dApps)
   - Separates Arweave/AO from EVM to avoid confusion
   - Versioning comes after deployment understanding
   - Arlink last as alternative/simplified method

2. **Tool Focus**
   - Primary focus on permaweb-deploy for developer audience
   - Arlink for non-technical users or quick prototyping
   - SDK mentioned for advanced use cases

3. **Framework Examples**
   - Next.js and Vite/React most common
   - Astro for static content sites
   - Covers both modern approaches

### Open Questions
- Include example repositories? (Could be helpful)
- Screenshots needed for Arlink guide? (Yes, likely)
- Video tutorials? (Out of scope for now)

### Future Enhancements
- Advanced topics (custom domains, etc.)
- Framework-specific deep dives
- Performance optimization guide
- Security best practices guide

---

## Completion Criteria

This plan is complete when:
1. ✅ All 6 files created and reviewed
2. ✅ All code examples tested
3. ✅ All links verified
4. ✅ Build succeeds without errors
5. ✅ User review and approval received
6. ✅ All migration tasks completed
7. ✅ This plan document deleted

---

**Last Updated:** 2025-10-30
**Status:** Guide 3 (Hosting EVM dApp) completed with custom wagmi UI and Ethereum wallet integration, Guide 4 (Undernames) next
