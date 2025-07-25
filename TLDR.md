# Pulumi Notes

## Install

- [Pulumi Download](https://www.pulumi.com/docs/iac/download-install/)
- Requires Node.js (>= 14) and AWS credentials configured

## Starting a New Project

1. Create a new empty folder
2. `cd` inside it and run:
   - `pulumi new aws-typescript` (for AWS TypeScript template)
   - Follow Pulumi instructions (creates a dev stack by default)
3. You will find:
   - `Pulumi.yaml` - Project configuration
   - `Pulumi.dev.yaml` - Development stack configuration
   - `index.ts` - Main Pulumi program
   - `package.json` - Dependencies

## Basic Commands

- **Preview changes**: `pulumi preview`
- **Deploy infrastructure**: `pulumi up`
- **Destroy infrastructure**: `pulumi destroy`
- **Check current state**: `pulumi stack`

## Stacks

### What is a Stack

A stack in Pulumi is an isolated, independently configurable instance of a Pulumi program.
Think of it as a deployment target or environment where your infrastructure code gets executed.

The stack concept allows you to use the same infrastructure code to manage multiple deployments safely, with each stack being completely independent.
You can experiment in dev, test in staging, and deploy to production, all while keeping the environments isolated from each other.

### Basic Commands

- **Create new stack**: `pulumi stack init <stack-name>`
- **Switch to different stack**: `pulumi stack select <stack-name>`
- **List available stacks**: `pulumi stack ls`
- **Remove stack**: `pulumi stack rm <stack-name>` (removes from backend)
- **Delete stack file**: Remove the `Pulumi.<stack-name>.yaml` file

### Example of stack usage

```bash

# Create different stacks
pulumi stack init dev
pulumi stack init staging
pulumi stack init prod

# Deploy to specific stack
pulumi stack select dev
pulumi up

# Each stack maintains separate resources
```

## Configuration & Secrets

- **Add config variable**: `pulumi config set <key> <value>`
- **Add secret**: `pulumi config set --secret <key> <value>`
- **List config**: `pulumi config`
- **Get config value**: `pulumi config get <key>`
- **Remove config**: `pulumi config rm <key>`
