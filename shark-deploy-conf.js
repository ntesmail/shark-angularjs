module.exports = {
    comment: 'shark-angular',
    version: '0.1.0',
    product: 'shark-angular',
    contextPath: '/shark-angular',
    protocol: 'http',
    browserPort: 9003,
    port: 19003,
    hostname: 'localhost',
    openurl: 'http://localhost:9003/shark-angular/index.html',
    rootPath: __dirname,
    tmpDir: '.tmp',
    webapp: 'src/main/webapp',
    mock: 'src/test/mock',
    scssPath: 'style/scss',
    cssPath: 'style/css',
    imgPath: 'style/img',
    videoPath: 'style/video',
    jsPath: 'js',
    fontPath: 'font',
    htmlPath: 'examples',
    templatePath: 'WEB-INF/tmpl',
    staticVersion: '20160226',
    ajaxPrefix: '/xhr',
    mimgPathPrefix: '/hxm',
    ifwebpack: true,
    projectType: 'Angular',
    mimgURLPrefix: {
        develop: '', //the rootpath of static resource during develop phase
        online: '', //the rootpath of static resource at online phase
        test: '' //the rootpath of static resource at test phase
    },
};
