
export class ChangeOutputPath {
    apply(hooks){
        hooks.emitPath.tap('changeOutputPath', (context) => {
            console.log('__________changeOutputPath');
            context.changeOutputPath('./dist/index.js')
        })
    }
}