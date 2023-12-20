import { join } from 'path';
import { readdirSync, statSync, PathLike  } from 'node:fs';

/**
 * credit where credit goes
 * Credit to: Conaticus
 * on: https://github.com/conaticus/boolean
 */

const walk = (
	pathLike: PathLike,
	options?:
		| {
				encoding: BufferEncoding | null;
		  }
		| BufferEncoding
		| null
		| undefined
): string[] => {
	let results: string[] = [];
	const fileList = readdirSync(pathLike, options);
	for (const file of fileList) {
		const stat = statSync(join(pathLike.toString(), file));
		results = [
			...results,
			...(stat && stat.isDirectory()
				? walk(join(pathLike.toString(), file))
				: [file]),
		];
	}
	return results.map((filename) => join(pathLike.toString(), filename));
};

export const commandFiles = walk(
	join(__dirname, '../commands')
).filter((file) => ['.ts', '.js'].some((ext) => file.endsWith(ext)));