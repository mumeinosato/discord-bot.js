export async function cmd (cmdname : string) : Promise<[string, {embed: Record<string, any> }]> {
    if(cmdname === 'help'){
        console.log('help')
        const tpy = "embed"
        const emobj = {
            embed: {
                color: 16757683,
                description: 'You need help?'
            }
        };
        return [tpy, emobj]
    }
    return ["embed", {embed: {color: 16757683, description: 'This is a test'}}]
}