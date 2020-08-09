import * as vscode from 'vscode';

const nodeModulesPaths = '**/node_modules'

let config = vscode.workspace.getConfiguration()
let excluded = config.get('files.exclude', {} as Record<string, boolean>)

function removeNodeModulesFolder() {
	excluded[nodeModulesPaths] = true
	config.update('files.exclude', excluded)
}

function addNodeModulesFolder() {
	excluded[nodeModulesPaths] = false
	config.update('files.exclude', excluded)
}

async function collapse() {
	await removeNodeModulesFolder()
	await addNodeModulesFolder()
}


export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('collapse-node-modules.collapse', () => {
		collapse()
	});

	context.subscriptions.push(disposable);
}
