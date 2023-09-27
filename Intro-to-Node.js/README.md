# Node Basics

In node, we can't use some of the browser(another runtime for JS) functions. To list a few:

We can't use `alert` in `node.js`, while using an error related to undefined Object is thrown. Similarly, if we console.log `window` same error is thrown.

For getting information on node.js internals, we can console.log `global`, an alternative to window for node.js.

```javascript
alert("Hello World!") // This willn not work in Node.js, beacuause it is a browser API
console.log(window)  // This will not work in Node.js, beacuause its browser specific variable
console.log(global) // This will print out a ton of information about the global object
```

# Creating a CLI

Using the `process` variable, and then console logging `process.env` and `process.argv` variables.

```javascript
console.log(process.argv)
console.log(process.argc)
console.log(process.env.NODE_ENV)
```

Creating a link between the `bin` and the current working directory using `node link` command. Here, we're created a symlink named `note`

```js
console.log(newNote)

(function() {
    console.log('IIFE')
})
// IIFE - Immediately Invoked Function Expression
```

# Modules 

Modules are everywhere, we're here using `ESM` modules instead of `commonJS` modules. We can share using modules by using `export` keyword. 

```js
export <function or variable to be exported>
```

```js
import {<variables and functions to be imported>} from '<location of the file>'
```

Also, if we can to set up default exports, we can using `default` flag

```js
export default {
    <variables or functions or key-value pairs>
}
```

To import the default modules, we can use:

```js
import <any> from '<location of the file>'
```

Importing as modules of files in other folders, but first we need to export the functions or variables needed to be passed by using the following piece of code:

```js
export <function or varaiables>
```

In order to import we can use this syntax:

```js
import {<contents>} from <files/folders location>
```

OR 

```js
import {<content>} as <object name> from <files/folders>
```

In order to readily export we can also use this kind of syntaxing:

```js
export {<content>} from <files/folders location>
```

### Internal Modules

There are some powerful packages installed by default in node.js. `fs` package can we used to work with files read, write and might be used in tool like `create react-app` or other tool to provide a basic template. Also, we have `http` module, and other useful packages.

### npm(Node Package Manager)

To install a package form npm, we use:

```js
npm install <package-name>
```

Simiarly, to unistall a package, we use:

```js
npm uninstall <package-namez>
```

### yargs

Now, for building up our CLI, instead of a traditional practice we can use a npm package `yargs`, here is the sample code for using yargs in our CLI:

```js
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command('new <note>', 'Create a new note', yargs => {
    return yargs.positional('note', {
      type: 'string',
      description: 'The content of the note to create', 
    })
  }, (argv) => {
    console.log(`Creating a new note with content: ${argv.note}`)
  })
  .option('tags',{
    alias: 't',
    type: 'string',
    description: 'tags to add to the note'
  })
  .command('all', 'get all notes', () => {}, async (argv) => {
    
  })
  .command('find <filter>', 'get matching notes', yargs => {
    return yargs.positional('filter', {
      describe: 'The search term to filter notes by, will be applied to note.content',
      type: 'string'
    })
  }, async (argv) => {
    
  })
  .command('remove <id>', 'remove a note by id', yargs => {
    return yargs.positional('id', {
      type: 'number',
      description: 'The id of the note you want to remove'
    })
  }, async (argv) => {
    
  })
  .command('web [port]', 'launch website to see notes', yargs => {
    return yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000,
        type: 'number'
      })
  }, async (argv) => {
    
  })
  .command('clean', 'remove all notes', () => {}, async (argv) => {
    
  })
  .demandCommand(1)
  .parse()
```

**Note**: `<>` means required and `[]` means its optional