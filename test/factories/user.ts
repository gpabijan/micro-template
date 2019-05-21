export class UserFactory {
    name: 'Janek';
    age: 23;

    public static build(opts: any = {}) {
        return new UserFactory(opts);
    }

    public static buildList(length: number, opts: any = {}) {
        return Array.apply(null, { length }).map(() => this.build(opts));
    }

    constructor(opts: any = {}) {
        Object.assign(this, opts);
    }
}
