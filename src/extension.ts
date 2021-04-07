import * as vscode from 'vscode';

const nodeModulesPaths = '**/node_modules'

let config = vscode.workspace.getConfiguration()
let excluded: Record<string, boolean> | undefined

async function removeNodeModulesFolder() {
	await config.update('files.exclude', {
		...excluded,
		[nodeModulesPaths]: true
	}, vscode.ConfigurationTarget.Global)
}

async function addNodeModulesFolder() {
	await config.update('files.exclude', excluded, vscode.ConfigurationTarget.Global)
}

async function collapse() {
	excluded = config.inspect<Record<string, boolean> | undefined>('files.exclude')?.globalValue;
	await removeNodeModulesFolder()
	await addNodeModulesFolder()
}


export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('collapse-node-modules.collapse', () => {
		collapse()
	});

	context.subscriptions.push(disposable);
}
