export default class Model {
    static getData(): Promise<any> {
        throw new Error('Function should be overridden');
    }
}
