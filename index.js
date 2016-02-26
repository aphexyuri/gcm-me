var program = require('commander');
var gcmTest = require('gcm-test');

function enforceRequiredArgument(name) {
	if (!program[name]) {
		console.error("You must specify <%s>", name);
		program.outputHelp();
		process.exit(1);
	}
}

program
  .version('1.0')
  .option('-k, --key <key>', 'API Key')
  .option('-r, --regId <regId>', 'Device registration Id')
  .parse(process.argv);

enforceRequiredArgument("key");
enforceRequiredArgument("regId");

function sendGcm() {
	console.log("Using API key: " + program.key);
	console.log("Sending to divice with registration id: " + program.regId);

	gcmTest({
		message: 'Message to used',
		title: 'Test GCM'
	}, [program.regId], {
		apiKey: program.key
	}, function(err, response){
		console.log(err, response);
	});
}

sendGcm();