import * as tl from "azure-pipelines-task-lib/task";
import request = require('request');

async function run() {
    try {
        var discordMessage: any = {};

        if (tl.getInput('UserName'))
            discordMessage["username"] = tl.getInput('UserName');

        var title = escapeSpecialChars(tl.getInput('Title'));
        var message = escapeSpecialChars(tl.getInput('Message'));

        discordMessage["embeds"] = JSON.parse(`[{"title": "${title}",
        "description" : "${message}"}]`);

        request({
            url: `https://discordapp.com/api/webhooks/${tl.getInput('DiscordChannelID', true)}/${tl.getInput('DiscordToken', true)}`,
            method: "POST",
            json: true,
            body: discordMessage
        }, function (error:any, response:any, body:any){
            if (response.statusCode !== 204)
                tl.setResult(tl.TaskResult.Failed, `${response.statusCode} ${body.message}`);
            else
                tl.setResult(tl.TaskResult.Succeeded, 'Discord message successfully sent.');
        });

    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

function escapeSpecialChars(value: string ): string {
    return value.replace(/\\/g, "\\\\")
                .replace(/\n/g, "\\n")
               .replace(/\"/g, '\\"')
               .replace(/\r/g, "\\r")
               .replace(/\t/g, "\\t")
               .replace(/\f/g, "\\f");
}

run();