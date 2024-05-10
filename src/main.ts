import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
    try {
        const token = core.getInput('github_token', { required: true })
        const patterns = core.getInput('patterns', { required: true }).split(',').map(s => s.trim());

        const octokit = github.getOctokit(token);

        const ref = github.context.ref
        const branchName = ref.replace('refs/heads/', '');
        console.log(`El nombre de la rama es: ${branchName}`);

        const isValid = patterns.some(pattern => new RegExp(`^${pattern}`).test(branchName));
        if (!isValid) {
            core.setFailed(`El nombre de la rama "${branchName}" no coincide con los patrones permitidos: ${patterns.join(', ')}.`);
        } else {
            console.log('El nombre de la rama es válido.');
        }

    }
    catch (err: any) {
        core.setFailed(err.message)
    }
}

run()