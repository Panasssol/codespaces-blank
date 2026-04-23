module.exports = function(grunt) {

    // Configuração das tarefas
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Tarefa 1: Compilação do LESS para CSS
        less: {
            development: {
                options: {
                    compress: false,
                    sourceMap: true
                },
                files: {
                    'dist/css/main.css': 'src/less/main.less'
                }
            },
            production: {
                options: {
                    compress: true,
                    sourceMap: false
                },
                files: {
                    'dist/css/main.min.css': 'src/less/main.less'
                }
            }
        },

        // Tarefa 2: Compressão (minificação) de código JavaScript
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("dd-mm-yyyy") %> */\n',
                mangle: true,
                compress: {
                    drop_console: true
                }
            },
            build: {
                files: {
                    'dist/js/app.min.js': ['src/js/*.js']
                }
            }
        },

        // Tarefa de observação - recompila automaticamente ao salvar
        watch: {
            less: {
                files: ['src/less/**/*.less'],
                tasks: ['less']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['uglify']
            }
        }
    });

    // Carregando os plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Registrando as tarefas
    grunt.registerTask('default', ['less', 'uglify']);
    grunt.registerTask('build', ['less:production', 'uglify']);
    grunt.registerTask('dev', ['less:development', 'uglify', 'watch']);

};
