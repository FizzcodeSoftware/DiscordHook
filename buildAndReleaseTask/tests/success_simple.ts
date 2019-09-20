import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');
import  fs = require('fs');

let taskPath = path.join(__dirname, '..', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

var data = fs.readFileSync('tests/secret.json', 'utf8');
var settings = JSON.parse(data);

tmr.setInput('DiscordChannelID', settings["DiscordChannelID"]);
tmr.setInput('DiscordToken', settings["DiscordToken"]);

tmr.setInput('UserName', 'Test User Name');
tmr.setInput('Title', 'Test Title');
tmr.setInput('Message', 'Test Message');

tmr.run();