
export function jsonLoader(source) {
    this.addDependency('jsonLoader')
    return `export default ${JSON.stringify(source)}`;

}