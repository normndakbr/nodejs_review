class MasterData{
    constructor(id, idParent, code, name, type, status, createdAt, updatedAt){
        this.id = id;
        this.idParent = idParent;
        this.code = code;
        this.name = name;
        this.status = status;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

class Departement extends MasterData {
    constructor(id, code, name, status, createdAt, updatedAt){
        super(id, code, name, "departement", status, createdAt, updatedAt);
    }
}

class Section extends MasterData {
    constructor(id, code, name, status, createdAt, updatedAt){
        super(id, code, name, "section", status, createdAt, updatedAt);
    }
}

class Position extends MasterData {
    constructor(id, code, name, status, createdAt, updatedAt){
        super(id, code, name, "position", status, createdAt, updatedAt);
    }
}

class FactoryMasterData{
    static create(obj){

    }
}