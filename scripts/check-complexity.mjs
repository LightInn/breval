import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const branches = new Set([
	ts.SyntaxKind.IfStatement,
	ts.SyntaxKind.ConditionalExpression,
	ts.SyntaxKind.ForStatement,
	ts.SyntaxKind.ForInStatement,
	ts.SyntaxKind.ForOfStatement,
	ts.SyntaxKind.WhileStatement,
	ts.SyntaxKind.DoStatement,
	ts.SyntaxKind.CaseClause,
	ts.SyntaxKind.CatchClause,
])
const logical = new Set([
	ts.SyntaxKind.AmpersandAmpersandToken,
	ts.SyntaxKind.BarBarToken,
	ts.SyntaxKind.QuestionQuestionToken,
])
const sourcePattern = /\.[cm]?[jt]sx?$/
const rows = []
function isFunction(node) {
	return ts.isFunctionLike(node) && Boolean(node.body)
}
function score(node) {
	let value = 1
	function visit(child) {
		if (child !== node && isFunction(child)) return
		if (branches.has(child.kind)) value++
		if (ts.isBinaryExpression(child) && logical.has(child.operatorToken.kind)) value++
		ts.forEachChild(child, visit)
	}
	visit(node)
	return value
}
function read(file) {
	const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)
	function visit(node) {
		if (isFunction(node)) {
			const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1
			const name =
				node.name?.getText(source) ||
				(ts.isVariableDeclaration(node.parent) ? node.parent.name.getText(source) : 'anonymous')
			rows.push({ file: file.replaceAll('\\', '/'), line, name, cyclomatic: score(node) })
		}
		ts.forEachChild(node, visit)
	}
	visit(source)
}
function walk(dir) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, entry.name)
		if (entry.isDirectory()) {
			if (entry.name !== 'migrations') walk(p)
		} else if (sourcePattern.test(p) && !p.endsWith('payload-types.ts')) read(p)
	}
}
walk('src')
rows.sort((a, b) => b.cyclomatic - a.cyclomatic)
fs.mkdirSync('.tmp', { recursive: true })
fs.writeFileSync(
	'.tmp/complexity-report.json',
	JSON.stringify(
		{
			definition:
				'McCabe: 1 + if, conditional, loops, case, catch, and short-circuit operators. Nested functions counted independently.',
			functions: rows.length,
			rows,
		},
		null,
		2
	)
)
console.table(rows.slice(0, 12))
console.log('Functions:', rows.length)

const maximum = rows[0]?.cyclomatic || 0
console.log('Maximum cyclomatic complexity:', maximum, '(limit: 20)')
if (maximum > 20) process.exitCode = 1
