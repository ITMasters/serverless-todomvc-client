// Compiled using typings@0.6.10
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/5c3e47967affa3c4128a3875d1664ba206ae1b0f/glob/glob.d.ts
// Type definitions for Glob 5.0.10
// Project: https://github.com/isaacs/node-glob
// Definitions by: vvakame <https://github.com/vvakame/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare module "glob" {

	import events = require("events");
	import fs = require('fs');
	import minimatch = require("minimatch");

	function G(pattern: string, cb: (err: Error, matches: string[]) => void): void;
	function G(pattern: string, options: G.IOptions, cb: (err: Error, matches: string[]) => void): void;

	module G {
		function sync(pattern: string, options?: IOptions): string[];

		function hasMagic(pattern: string, options?: IOptions): boolean;

		var Glob: IGlobStatic;
		var GlobSync: IGlobSyncStatic;

		interface IOptions extends minimatch.IOptions {
			cwd?: string;
			root?: string;
			dot?: boolean;
			nomount?: boolean;
			mark?: boolean;
			nosort?: boolean;
			stat?: boolean;
			silent?: boolean;
			strict?: boolean;
			cache?: { [path: string]: any /* boolean | string | string[] */ };
			statCache?: { [path: string]: fs.Stats };
			symlinks?: any;
			sync?: boolean;
			nounique?: boolean;
			nonull?: boolean;
			debug?: boolean;
			nobrace?: boolean;
			noglobstar?: boolean;
			noext?: boolean;
			nocase?: boolean;
			matchBase?: any;
			nodir?: boolean;
			ignore?: any; /* string | string[] */
			follow?: boolean;
			realpath?: boolean;
			nonegate?: boolean;
			nocomment?: boolean;

			/** Deprecated. */
			globDebug?: boolean;
		}

		interface IGlobStatic extends events.EventEmitter {
			new (pattern: string, cb?: (err: Error, matches: string[]) => void): IGlob;
			new (pattern: string, options: IOptions, cb?: (err: Error, matches: string[]) => void): IGlob;
			prototype: IGlob;
		}

		interface IGlobSyncStatic {
			new (pattern: string, options?: IOptions): IGlobBase
			prototype: IGlobBase;
		}

		interface IGlobBase {
			minimatch: minimatch.IMinimatch;
			options: IOptions;
			aborted: boolean;
			cache: { [path: string]: any /* boolean | string | string[] */ };
			statCache: { [path: string]: fs.Stats };
			symlinks: { [path: string]: boolean };
			realpathCache: { [path: string]: string };
			found: string[];
		}

		interface IGlob extends IGlobBase, events.EventEmitter {
			pause(): void;
			resume(): void;
			abort(): void;

			/** Deprecated. */
			EOF: any;
			/** Deprecated. */
			paused: boolean;
			/** Deprecated. */
			maxDepth: number;
			/** Deprecated. */
			maxLength: number;
			/** Deprecated. */
			changedCwd: boolean;
			/** Deprecated. */
			cwd: string;
			/** Deprecated. */
			root: string;
			/** Deprecated. */
			error: any;
			/** Deprecated. */
			matches: string[];
			/** Deprecated. */
			log(...args: any[]): void;
			/** Deprecated. */
			emitMatch(m: any): void;
		}
	}

	export = G;
}