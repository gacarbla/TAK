#!/usr/bin/env node

import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import yargs from 'yargs';

const createProject = () => {
    const projectName = 'newxrjproject';
    const projectPath = path.join(process.cwd(), projectName);

    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath);
    }

    process.chdir(projectPath);

    exec('npm init -y', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error initializing npm: ${error}`);
            return;
        }
        console.log(stdout);

        exec('npm install typescript --save-dev', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error installing TypeScript: ${error}`);
                return;
            }
            console.log(stdout);

            exec('npx tsc --init', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error initializing TypeScript: ${error}`);
                    return;
                }
                console.log(stdout);
            });
        });
    });
};

yargs.command("xrj init", 'Initialize a new xrj project', {}, createProject).argv;
