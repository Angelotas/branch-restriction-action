import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
    try {
        const token = core.getInput('github_token', { required: true })
        const patterns = core.getInput('patterns', { required: true }).split(',').map(s => s.trim());

        // Crea una instancia del cliente de GitHub con el token proporcionado
        const octokit = github.getOctokit(token);

        const ref = github.context.ref
        console.log(ref);

        core.setFailed(`Invalid branch name`);

    }
    catch (err: any) {
        core.setFailed(err.message)
    }
}

run()