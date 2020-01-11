#!/usr/bin/env node

require('dotenv').config()

const path = require('path')
const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
const helpers = require('./helpers')

const log = console.log
const error = console.error

program.version('0.0.1', '-v, --vers', 'Current CryptoDockRemoteCLI Version')

program
  .command('addvar <newKey> <newValue>')
  .description('Add credentials for CryptoDockRemote utilities')
  .action((newKey, newValue) => {
    helpers
      .readFile('.env', true)
      .then(fileArr => {
        helpers
          .readLine('.env', newKey)
          .then(value => helpers.replaceLine(fileArr, newKey, value, newValue))
          .then(newFileArr => helpers.writeFile('.env', null, newFileArr.join('\n'), null))
          .then(() => log(chalk.blue('New Environment Var Written: ' + newKey + '=' + newValue)))
          .catch(error)
      })
      .catch(error)
  })

program
  .command('migrate <action>')
  .description('Run migration file')
  .action(fileName => {
    const Conn = require('mysql-layer').Conn

    const Connection = new Conn({
      hostname: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true,
    })

    Connection.connection.connect()

    helpers
      .readFile(path.join('static/migrations', `${fileName}.sql`), false)
      .then(contents => contents.replace(/(\r\n|\n|\r)/gm, ' '))
      .then(contents => contents.replace(/\s+/g, ' '))
      .then(contents => contents.trim())
      .then(contents => Connection.asyncQuery(contents))
      .then(data => log(chalk.green('Migration Succesful', data)))
      .then(() => Connection.end())
      .catch(e => {
        Connection.end()
        error(chalk.red('Migration Failed', e))
      })
  })

program.parse(process.argv)
