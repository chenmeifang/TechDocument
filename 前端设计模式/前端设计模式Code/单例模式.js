class Singleton {
    public instance22 = new Singleton();
    private constructor(name){
        this.name = name;
    }
    getInstance() {
        return instance22;
    }
}

let a = new Singleton('cmf');
let b = new Singleton('ln');
a.getInstance() === b.getInstance();
