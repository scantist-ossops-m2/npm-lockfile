'use strict';

const { execSync } = require('child_process');
const { readFileSync, unlinkSync } = require('fs');

const test = require('tape');

test('simple test', t => {
	execSync('./bin.js -o package-lock.json --date=now');
	const lockPackage = readFileSync('./package-lock.json', { encoding: 'utf-8' });
	execSync('npm install --package-lock-only', { encoding: 'utf-8' });
	const lockActual = readFileSync('./package-lock.json', { encoding: 'utf-8' });
	unlinkSync('./package-lock.json');
	t.equal(lockActual, lockPackage, 'actual === package');
	t.end();
});
