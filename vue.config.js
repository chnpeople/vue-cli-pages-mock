const fs = require('fs');
// eslint-disable-next-line no-unused-vars
const path = require('path');
const glob = require('glob');
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

function entryConfig(entry) {
    let entries = {}

    glob.sync(entry).forEach(item => {
        const entryTemplate = item.split('/').splice(-3);

        entries[entryTemplate[1]] = {
            entry: 'src/' + entryTemplate[0] + '/' + entryTemplate[1] + '/main.js',
            template: 'src/' + entryTemplate[0] + '/' + entryTemplate[1] + '/' + entryTemplate[2],
            title: entryTemplate[1],
            filename:  entryTemplate[1] + '.html'
        }
        

    })
    return entries;
}


const pages = entryConfig('./src/app/**?/*.html');
console.log(pages);

console.log(process.env.NODE_ENV)
console.log(process.env.VUE_APP_MOCK);
let env = process.env.NODE_ENV;
module.exports = {
    pages,
    // pages: {
    //     home: {
    //         entry: 'src/home/main.js',
    //         template: 'src/home/index.html',
    //     },
    //     home2: {
    //         entry: 'src/home2/main.js',
    //         template: 'src/home2/index.html',
    //     },

    // },
    publicPath: env === 'development'? '/' : './',
    devServer: {
        //before方法：能够在其他所以的中间件之前执行自定义的中间件
        before: app => {
            // eslint-disable-next-line no-unused-vars
            app.get('/', (req, res, next) => {
                for(let i in pages){
                    res.write(`<a target="_self" href="/${i}">/${i}</a></br>`)
                }
                res.end()
            });


            if(!process.env.VUE_APP_MOCK) return false;
            app.use(bodyParser.urlencoded({
                extended: true
            }))
            // eslint-disable-next-line no-unused-vars
            app.post('/*',function (req, res, next) {
                // const existsJson = fs.existsSync(`./mock${req.url}.json`);
                // if(existsJson) {
                //     const data = require(`./mock${req.url}.json`);
                //     res.json(data);
                //     return false;
                // }
                const existsJson = fs.existsSync(`./mock${req.url}.post.js`);
                if(existsJson) {
                    const text = fs.readFileSync(`./mock${req.url}.post.js`, 'utf-8');
                    const data = eval('(function(req){'+ text + '})('+req.body.v+')');
                    res.json(data);
                    return false;
                }
                res.json({
                    code: 0,
                    data: {
                        data: []
                    },
                    msg: 'No Mock File'
                })
            })
        }
    
    },
}


