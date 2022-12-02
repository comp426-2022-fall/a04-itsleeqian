// exportable file for rolling dice

export function roll(sides, dice, rolls) {
	let results = [];
	for (let i = 0; i < rolls; i++) {
		let sum = 0;
		for (let j = 0; j < dice; j++) {
			sum += Math.floor(Math.random() * sides) + 1;
		}
		results[i] = sum;
	}
	var rollObject = {
		sides: sides,
		dice: dice,
		rolls: rolls,
		results: results
	}
	return JSON.stringify(rollObject);
}
