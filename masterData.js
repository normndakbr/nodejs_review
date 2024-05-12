class MasterData {
    constructor(id, parentId, code, name, type, status, createdAt, updatedAt) {
        this.id = id;
        this.parentId = parentId;
        this.code = code;
        this.name = name;
        this.status = status;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

class Departement extends MasterData {
    constructor(id, parentId, code, name, status, createdAt, updatedAt) {
        super(id, parentId, code, name, "departement", status, createdAt, updatedAt);
    }
}

class Section extends MasterData {
    constructor(id, parentId, code, name, status, createdAt, updatedAt) {
        super(id, parentId, code, name, "section", status, createdAt, updatedAt);
    }
}

class Position extends MasterData {
    constructor(id, parentId, code, name, status, createdAt, updatedAt) {
        super(id, parentId, code, name, "position", status, createdAt, updatedAt);
    }
}

class FactoryMasterData {
    static create(obj) {
        if (obj.type === "departement") {
            return new Departement(obj.id, obj.parentId, obj.code, obj.name, obj.status, obj.createdAt, obj.updatedAt);
        } else if (obj.type === "section") {
            return new Section(obj.id, obj.parentId, obj.code, obj.name, obj.status, obj.createdAt, obj.updatedAt);
        } else if (obj.type === "position") {
            return new Position(obj.id, obj.parentId, obj.code, obj.name, obj.status, obj.createdAt, obj.updatedAt);
        } else {
            return new MasterData(obj.id, obj.parentId, obj.code, obj.name, obj.type, obj.status, obj.createdAt, obj.updatedAt);
        }
    }
}

module.exports = FactoryMasterData;