import fs from 'node:fs';
import path from 'node:path';
import parser from '@babel/parser';
import traverse from "@babel/traverse";
import { transformFromAst } from "@babel/core"
import ejs from 'ejs';
import { jsonLoader } from './jsonLoader.js';

let id = 0

const webpackConfig = {
    module: {
        rules: [
            {
                test: /\.json$/,
                use: [jsonLoader],
            },
        ],
    },
};

const loaderContext = {
    addDependency(dep) {
        console.log('dep :>> ', dep);
    }
}

function createAsset(filePath) {
    // 1. 获取文件内容
    let source = fs.readFileSync(filePath, { encoding: "utf-8" })

    // 1.1 加载loader
    webpackConfig.module.rules.forEach(({ test, use }) => {
        if (test.test(filePath)) {
            if (Array.isArray(use)) {
                use.reverse().forEach(fn => {
                    source = fn.call(loaderContext, source)
                })
            }
        }
    })

    // 2. 转化为ast抽象语法树
    const ast = parser.parse(source, { sourceType: "module" })

    const deps = []
    traverse.default(ast, {
        ImportDeclaration({ node }) {
            deps.push(node.source.value)
        }
    })

    const { code } = transformFromAst(ast, null, { presets: ['env'] });

    return { id: id++, deps, code, mapping: {} }
}

// 3. 生成graph依赖树
function createGraph(baseUrl) {
    const mainAsset = createAsset(`${baseUrl}/main.js`)
    const queue = [mainAsset]
    for (const assetItem of queue) {
        for (const assetPath of assetItem.deps) {
            const child = createAsset(path.resolve(baseUrl, assetPath))
            assetItem.mapping[assetPath] = child.id
            queue.push(child)
        }
    }
    return queue
}

const graph = createGraph("./example")

function build(graph) {
    const template = fs.readFileSync('./bundle.ejs', { encoding: "utf-8" })
    const data = graph.map(item => {
        const { id, code, mapping } = item
        return { id, code, mapping }
    })
    const code = ejs.render(template, { data })
    fs.writeFileSync('./dist/bundle.js', code)
}

build(graph)