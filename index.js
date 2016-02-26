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
  .option('-t, --title <title>', 'Push title')
  .option('-m, --message <message>', 'Message body')
  .parse(process.argv);

enforceRequiredArgument("key");
enforceRequiredArgument("regId");

function sendGcm() {
	console.log("Using API key: " + program.key);
	console.log("Sending to divice with registration id: " + program.regId);
	console.log("Push title: " + program.title);
	console.log("Push message body: " + program.message);

	gcmTest({
		message: program.message,
		title: program.title
	}, [program.regId], {
		apiKey: program.key
	}, function(err, response){
		console.log(err, response);
	});
}

sendGcm();