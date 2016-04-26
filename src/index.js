import { spawn } from  'child_process';

class IntegratorBrowserStackTunnel {
    constructor(key) {
        this.key = key;
    }

    before() {
        return this.startLocalTunnel();
    }
    after() {
        return this.stopLocalTunnel();
    }

    startLocalTunnel() {
        return new Promise((resolve, reject) => {
            let startedMessage = 'Press Ctrl-C to exit';
            this.childProcess = spawn('../bin/BrowserStackLocal', [this.key], { cwd: __dirname });

            // Wait for startedMessage in stdout and resolve promise.
            this.childProcess.stdout.on('data', (data) => {
                if (data.indexOf(startedMessage) > -1) {
                    console.log('BrowserStackLocal started');
                    resolve();
                }
            });

            this.childProcess.stderr.on('data', (data) => {
                console.log('stderr:' + data);
                reject();
            });
        });
    }

    stopLocalTunnel() {
        return new Promise((resolve, reject) => {
            this.childProcess.on('exit', () => {
                console.log('BrowserStackLocal stopped');
                resolve();
            });
            this.childProcess.kill();
        });
    }
}

module.exports = IntegratorBrowserStackTunnel;
