module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'common': '@/common',
                'views': '@/views',
                'network': '@/network'
            }
        }
    },
    devServer: {
        disableHostCheck: true
    },
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    indexPath: 'index.html',
    outputDir: process.env.outputDir || 'dist',
    assetsDir: 'static'
}