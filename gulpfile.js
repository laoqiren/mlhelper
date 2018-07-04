const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

const PATHS = {
    scripts: ['./src/**/*.ts'],
    output: './lib'
}

gulp.task('copyFiles',()=>{
    return gulp.src([
        'src/**/*',
        '!src/**/*.ts'          
    ]).pipe(gulp.dest(PATHS.output));
});

gulp.task('watch-ts',['build-ts'],()=>{
    gulp.watch(PATHS.scripts,['build-ts']);
});

gulp.task('build-ts',()=>{
    return gulp.src(PATHS.scripts)
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(PATHS.output));
});

gulp.task('default',['watch-ts']);