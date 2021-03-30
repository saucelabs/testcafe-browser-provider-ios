var childProcess = require('child_process');
var process = require('process');

export default {
    boot (udid) {
        var { rc, } = this._exec(['--boot', udid]);

        if (rc !== 0)
            process.exit(rc);
    },
    shutdown (udid) {
        this._exec(['--shutdown', udid]);
    },
    list () {
        var { rc, stdout } = this._exec(['--list 1']);

        if (rc === 0)
            return stdout.toString().split('\n');
        return [];
    },
    _exec (args) {
        try {
            var stdout = childProcess.execSync(`idb_companion ${args.join(' ')}`);

            return { rc: 0, stdout: stdout };
        }
        catch (e) {
            if (e.errno === 'ETIMEDOUT')
                return { rc: 65, stdout: '' };
            if (e.status === 127)
                return { rc: 64, stdout: e.stdout };
            return { rc: 1, stdout: e.stdout };
        }
    },
};