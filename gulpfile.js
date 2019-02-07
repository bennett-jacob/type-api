const fs = require('fs')
const gulp = require('gulp')
const hb = require('gulp-hb')
const rename = require('gulp-rename')
const shell = require('gulp-shell')
const minimist = require('minimist')
const validator = require('validator')

// unnamed args will be stored in args._[]
const args = minimist(process.argv.slice(2))

gulp.task('entity', () => {
  args.name = args.name + ''
  console.log(args.name)
  const entityName = args.name[0].toLowerCase() + args.name.slice(1) // make first letter lowercase
  const entityPath = './src/api/data'

  // argument --name is required
  if (!entityName) {
    console.error(" >  You didn't provide a name for your entity. Please try again.")
    console.log(" >  Run the task with a --name flag:")
    console.log(" >  ")
    console.log(" >  gulp entity --name newEntity")
    console.log(" >  ")
    console.log(" >  Best of luck!")
    return
  }

  // argument --name must be alpha
  if (!validator.isAlpha(entityName)) {
    console.error(' >  Please use an entity name with only letters.')
    return
  }

  // try to prevent using plural entity names
  if (entityName.slice(-1) === 's' && args.force !== 'yes') {
    console.error(' > That name ends with an "s" which looks funky.')
    console.error(' > In order to use that name, please add "--force yes" to your command.')
    return
  }

  // prevent writing over existing entity
  if (fs.existsSync(`${entityPath}/${entityName}`)) {
    console.error(" >  That entity (or a directory named the same thing) already exists.")
    console.error(" >  Please don't make me kill it.")
    return
  }

  return gulp.src('.gulp/entity/*')
  .pipe(hb()
    .helpers({
      capitalize: (input) => { return input[0].toUpperCase() + input.slice(1) },
      uppercase: (input) => { return input.toUpperCase() },
    })
    .data({ entityName })
  )
  .pipe(rename((file) => {
    const protectedFileNames = [
      'index',
      'index.spec',
    ]

    file.basename = protectedFileNames.indexOf(file.basename) === -1
      ? `${entityName}.${file.basename}` : file.basename

    console.log(` > Creating ${file.basename}`)
  }))
  .pipe(gulp.dest(`${entityPath}/${entityName}`))
})

gulp.task('seed', () => {
  return gulp.src('src/api/data/**/*.seed.ts')
  .pipe(shell([
    'npm run ts-node <%= file.path %>',
  ]))
})